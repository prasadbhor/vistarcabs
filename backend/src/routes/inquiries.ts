import { Router } from 'express';
import { z } from 'zod';
import { appendFile, mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import mongoose from 'mongoose';
import Inquiry from '../models/Inquiry';
const router=Router();
const inquirySchema=z.object({
 name:z.string().trim().min(2).max(80),
 phone:z.string().trim().min(8).max(20).regex(/^[0-9+()\-\s]+$/).refine(value=>value.replace(/\D/g,'').length>=8,{message:'Enter a valid callback number.'}),
 tripType:z.enum(['One Way','Round Trip','Local Trip','Airport Trip']),
 from:z.string().trim().min(2).max(160),
 to:z.string().trim().max(160).optional().default(''),
 pickupDate:z.string().trim().regex(/^\d{4}-\d{2}-\d{2}$/).refine(value=>!Number.isNaN(Date.parse(value)),{message:'Enter a valid pickup date.'}),
 pickupTime:z.string().trim().regex(/^(?:[01]\d|2[0-3]):[0-5]\d$/),
 returnDate:z.string().trim().regex(/^(?:|\d{4}-\d{2}-\d{2})$/).refine(value=>value===''||!Number.isNaN(Date.parse(value)),{message:'Enter a valid return date.'}).optional().default(''),
 duration:z.string().trim().max(32).optional().default(''),
 airportDirection:z.string().trim().max(32).optional().default(''),
 passengers:z.coerce.number().int().min(1).max(12).optional(),
 notes:z.string().trim().max(350).optional().default(''),
});
router.post('/',async(req,res,next)=>{try{
 const parsed=inquirySchema.safeParse(req.body);
 if(!parsed.success){res.status(400).json({ok:false,message:'Please check the enquiry details.',errors:parsed.error.flatten().fieldErrors});return;}
 const data=parsed.data;
 if(data.tripType!=='Local Trip'&&data.to.length<2){res.status(400).json({ok:false,message:'Please enter a destination.'});return;}
 if(data.tripType==='Round Trip'&&!data.returnDate){res.status(400).json({ok:false,message:'Please select a return date.'});return;}
 if(data.tripType==='Round Trip'&&data.returnDate<data.pickupDate){res.status(400).json({ok:false,message:'Return date must be on or after the pickup date.'});return;}
 if(mongoose.connection.readyState===1){const inquiry=await Inquiry.create(data);res.status(201).json({ok:true,storage:'mongodb',message:'Enquiry saved.',id:inquiry.id});return;}
 if(process.env.NODE_ENV!=='production'){
  const file=process.env.INQUIRY_STORE_PATH||resolve(__dirname,'../../data/inquiries.jsonl');
  await mkdir(dirname(file),{recursive:true});
  await appendFile(file,`${JSON.stringify({ ...data,createdAt:new Date().toISOString(),status:'new' })}\n`,{encoding:'utf8',mode:0o600});
  res.status(201).json({ok:true,storage:'local-development-file',message:'Enquiry saved for local development.'});return;
 }
 res.status(503).json({ok:false,message:'Enquiry storage is unavailable. Please continue through WhatsApp.'});
}catch(error){next(error);}});
export default router;
