import mongoose from 'mongoose';
export async function connectDatabase(){
  const uri=process.env.MONGODB_URI;
  if(!uri){console.warn('MONGODB_URI not set; API starts without database persistence.');return;}
  await mongoose.connect(uri);
  console.log('MongoDB connected');
}
