import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import mongoose from 'mongoose';
import { connectDatabase } from './config/db';
import inquiriesRouter from './routes/inquiries';
import leadsRouter from './routes/leads';
import adminRouter from './routes/admin';
const app=express();
const port=Number(process.env.PORT||5000);
const allowedOrigin=(process.env.FRONTEND_ORIGIN||'http://localhost:3000').split(',').map(s=>s.trim());
app.disable('x-powered-by');
app.use(helmet());
app.use(cors({origin(origin,callback){if(!origin||allowedOrigin.includes(origin))return callback(null,true);return callback(new Error('Origin not allowed by CORS'));},credentials:true,methods:['GET','POST','PATCH'],allowedHeaders:['Content-Type','Authorization']}));
app.use(express.json({limit:'20kb'}));
app.use('/api/',rateLimit({windowMs:15*60*1000,limit:100,standardHeaders:'draft-7',legacyHeaders:false}));
app.get('/api/health',(_req,res)=>res.json({ok:true,service:'vistar-cabs-api',storage:mongoose.connection.readyState===1?'mongodb':process.env.NODE_ENV==='production'?'database-required':'local-development-file',time:new Date().toISOString()}));
app.use('/api/inquiries',inquiriesRouter);
app.use('/api',leadsRouter);
app.use('/api/admin',adminRouter);
app.use((err:unknown,_req:express.Request,res:express.Response,_next:express.NextFunction)=>{console.error(err);res.status(500).json({ok:false,message:'Something went wrong. Please try again or contact Vistar Cabs directly.'});});
connectDatabase().then(()=>app.listen(port,()=>console.log(`Vistar Cabs API listening on ${port}`))).catch(error=>{console.error('Database connection failed:',error);process.exit(1);});


