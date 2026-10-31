import { Router, type Request, type Response, type NextFunction } from 'express';
import rateLimit from 'express-rate-limit';
import mongoose from 'mongoose';
import { createHash, createHmac, timingSafeEqual } from 'node:crypto';
import { readFile, mkdir, writeFile, rename } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { z } from 'zod';
import Inquiry from '../models/Inquiry';

const router=Router();
const COOKIE='vistar_admin_session';
const SESSION_SECONDS=8*60*60;
const loginLimit=rateLimit({windowMs:15*60*1000,limit:10,standardHeaders:'draft-7',legacyHeaders:false,message:{ok:false,message:'Too many sign-in attempts. Please wait and try again.'}});
const loginSchema=z.object({username:z.string().trim().min(1).max(80),password:z.string().min(1).max(256)});
const statusSchema=z.object({status:z.enum(['new','contacted','closed'])});

function devMode(){return process.env.NODE_ENV!=='production'}
function credentials(){return {username:process.env.ADMIN_USERNAME||(devMode()?'vistar-admin':''),password:process.env.ADMIN_PASSWORD||(devMode()?'VistarDemo!2026':''),secret:process.env.ADMIN_SESSION_SECRET||(devMode()?'Vistar Cabs-local-preview-secret-change-before-launch':'' )}}
function same(a:string,b:string){const x=Buffer.from(a);const y=Buffer.from(b);return x.length===y.length&&timingSafeEqual(x,y)}
function makeToken(exp:string,secret:string){return `${exp}.${createHmac('sha256',secret).update(exp).digest('hex')}`}
function cookieToken(req:Request){const raw=req.headers.cookie||'';for(const part of raw.split(';')){const [name,...rest]=part.trim().split('=');if(name===COOKIE)return decodeURIComponent(rest.join('='));}return ''}
function isAuthenticated(req:Request){const {secret}=credentials();if(!secret)return false;const token=cookieToken(req);const [exp,signature]=token.split('.');if(!exp||!signature||!/^\d+$/.test(exp)||Number(exp)<Date.now())return false;const expected=makeToken(exp,secret).split('.')[1];return same(signature,expected)}
function requireAdmin(req:Request,res:Response,next:NextFunction){if(!isAuthenticated(req)){res.status(401).json({ok:false,message:'Please sign in to view enquiries.'});return;}next()}
function localStore(){return process.env.INQUIRY_STORE_PATH||resolve(__dirname,'../../data/inquiries.jsonl')}
function recordId(raw:string){return createHash('sha256').update(raw).digest('hex').slice(0,20)}
async function localRecords(){try{const raw=await readFile(localStore(),'utf8');return raw.split(/\r?\n/).filter(Boolean).map(line=>({id:recordId(line),...JSON.parse(line)}));}catch(error){if((error as NodeJS.ErrnoException).code==='ENOENT')return [];throw error}}
function publicRecord(value:any){return {id:String(value._id||value.id||''),name:value.name,phone:value.phone,tripType:value.tripType,from:value.from,to:value.to||'',pickupDate:value.pickupDate,pickupTime:value.pickupTime,returnDate:value.returnDate||'',duration:value.duration||'',airportDirection:value.airportDirection||'',passengers:value.passengers||null,notes:value.notes||'',status:value.status||'new',createdAt:value.createdAt||value.created_at||null}}

router.post('/login',loginLimit,async(req,res)=>{const parsed=loginSchema.safeParse(req.body);if(!parsed.success){res.status(400).json({ok:false,message:'Enter both username and password.'});return;}const {username,password,secret}=credentials();if(!username||!password||!secret){res.status(503).json({ok:false,message:'Admin login is not configured on this server.'});return;}if(!same(parsed.data.username,username)||!same(parsed.data.password,password)){res.status(401).json({ok:false,message:'Username or password is incorrect.'});return;}const exp=String(Date.now()+SESSION_SECONDS*1000);res.cookie(COOKIE,makeToken(exp,secret),{httpOnly:true,secure:process.env.NODE_ENV==='production',sameSite:'lax',path:'/api/admin',maxAge:SESSION_SECONDS*1000});res.json({ok:true,message:'Signed in.'});});
router.post('/logout',(req,res)=>{res.clearCookie(COOKIE,{httpOnly:true,secure:process.env.NODE_ENV==='production',sameSite:'lax',path:'/api/admin'});res.json({ok:true});});
router.get('/session',requireAdmin,(_req,res)=>res.json({ok:true,authenticated:true}));

router.get('/inquiries',requireAdmin,async(req,res,next)=>{try{const state=typeof req.query.status==='string'?req.query.status:'';if(state&&!['new','contacted','closed'].includes(state)){res.status(400).json({ok:false,message:'Unknown status filter.'});return;}if(mongoose.connection.readyState===1){const query=state?{status:state}:{};const [rows,total]=await Promise.all([Inquiry.find(query).sort({createdAt:-1}).limit(200).lean(),Inquiry.countDocuments(query)]);res.json({ok:true,storage:'mongodb',total,items:rows.map(publicRecord)});return;}if(devMode()){let rows=await localRecords();if(state)rows=rows.filter(x=>x.status===state);rows.sort((a,b)=>String(b.createdAt||'').localeCompare(String(a.createdAt||'')));res.json({ok:true,storage:'local-development-file',total:rows.length,items:rows.slice(0,200).map(publicRecord)});return;}res.status(503).json({ok:false,message:'Admin storage is unavailable. Configure MongoDB before production.'});}catch(error){next(error)}});

router.patch('/inquiries/:id',requireAdmin,async(req,res,next)=>{try{const parsed=statusSchema.safeParse(req.body);if(!parsed.success){res.status(400).json({ok:false,message:'Choose a valid enquiry status.'});return;}const {status}=parsed.data;if(mongoose.connection.readyState===1){if(!mongoose.isValidObjectId(req.params.id)){res.status(404).json({ok:false,message:'Enquiry not found.'});return;}const row=await Inquiry.findByIdAndUpdate(req.params.id,{status},{new:true,runValidators:true}).lean();if(!row){res.status(404).json({ok:false,message:'Enquiry not found.'});return;}res.json({ok:true,item:publicRecord(row)});return;}if(devMode()){const file=localStore();let raw='';try{raw=await readFile(file,'utf8')}catch(error){if((error as NodeJS.ErrnoException).code!=='ENOENT')throw error;}let found=false;const lines=raw.split(/\r?\n/).filter(Boolean).map(line=>{if(recordId(line)!==req.params.id)return line;const value=JSON.parse(line);value.status=status;found=true;return JSON.stringify(value)});if(!found){res.status(404).json({ok:false,message:'Enquiry not found.'});return;}await mkdir(dirname(file),{recursive:true});const temp=`${file}.${process.pid}.tmp`;await writeFile(temp,`${lines.join('\n')}\n`,{encoding:'utf8',mode:0o600});await rename(temp,file);res.json({ok:true});return;}res.status(503).json({ok:false,message:'Admin storage is unavailable. Configure MongoDB before production.'});}catch(error){next(error)}});

export default router;

