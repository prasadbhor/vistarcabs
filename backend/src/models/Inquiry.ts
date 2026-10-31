import { Schema, model, models } from 'mongoose';
const InquirySchema=new Schema({
  name:{type:String,required:true,trim:true,maxlength:100},
  phone:{type:String,required:true,trim:true,maxlength:24},
  tripType:{type:String,required:true,enum:['One Way','Round Trip','Local Trip','Airport Trip']},
  from:{type:String,required:true,trim:true,maxlength:160},
  to:{type:String,default:'',trim:true,maxlength:160},
  pickupDate:{type:String,required:true,maxlength:20},
  pickupTime:{type:String,required:true,maxlength:10},
  returnDate:{type:String,default:'',maxlength:20},
  duration:{type:String,default:'',maxlength:32},
  airportDirection:{type:String,default:'',maxlength:32},
  passengers:{type:Number,min:1,max:12},
  notes:{type:String,default:'',trim:true,maxlength:350},
  status:{type:String,enum:['new','contacted','closed'],default:'new'},
},{timestamps:true,versionKey:false});
InquirySchema.index({createdAt:-1});
export default models.Inquiry || model('Inquiry',InquirySchema);
