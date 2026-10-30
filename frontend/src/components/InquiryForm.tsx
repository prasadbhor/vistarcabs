'use client';
import { useState } from 'react';
import { ArrowUpRight, CalendarDays, CheckCircle2, Clock3, MapPin, Send, Users } from 'lucide-react';
import { site } from '@/lib/site';

type Trip = 'One Way' | 'Round Trip' | 'Local Trip' | 'Airport Trip';
type Values = { name:string; phone:string; from:string; to:string; date:string; time:string; returnDate:string; duration:string; airportDirection:string; passengers:string; notes:string };
const initial:Values={name:'',phone:'',from:'',to:'',date:'',time:'',returnDate:'',duration:'4 hours',airportDirection:'Airport pickup',passengers:'',notes:''};
const control='mt-1.5 w-full min-w-0 rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#0758c9] focus:ring-2 focus:ring-blue-100';
const tripTypes:Trip[]=['One Way','Round Trip','Local Trip','Airport Trip'];

export default function InquiryForm(){
 const [trip,setTrip]=useState<Trip>('One Way'); const [v,setV]=useState<Values>(initial); const [error,setError]=useState(''); const [notice,setNotice]=useState(''); const [waHref,setWaHref]=useState(''); const [sending,setSending]=useState(false);
 const update=(key:keyof Values,value:string)=>setV(old=>({...old,[key]:value}));
 async function submit(e:React.FormEvent<HTMLFormElement>){
  e.preventDefault();setError('');setNotice('');setWaHref('');setSending(true);
  const lines=['Hello Vista Cabs, please connect with me about this cab enquiry.',`Customer name: ${v.name.trim()}`,`Callback number: ${v.phone.trim()}`,`Trip type: ${trip}`,`From: ${v.from.trim()}`,...(trip!=='Local Trip'?[`To: ${v.to.trim()}`]:[]),`Pickup date: ${v.date}`,`Pickup time: ${v.time}`,...(trip==='Round Trip'?[`Return date: ${v.returnDate}`]:[]),...(trip==='Local Trip'?[`Preferred duration: ${v.duration}`]:[]),...(trip==='Airport Trip'?[`Airport journey: ${v.airportDirection}`]:[]),...(v.passengers?[`Passengers: ${v.passengers}`]:[]),...(v.notes.trim()?[`Additional details: ${v.notes.trim()}`]:[])];
  const text=lines.join('\n');
  if(site.whatsapp)setWaHref(`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`);
  const payload={name:v.name.trim(),phone:v.phone.trim(),tripType:trip,from:v.from.trim(),to:trip==='Local Trip'?'':v.to.trim(),pickupDate:v.date,pickupTime:v.time,returnDate:trip==='Round Trip'?v.returnDate:'',duration:trip==='Local Trip'?v.duration:'',airportDirection:trip==='Airport Trip'?v.airportDirection:'',...(v.passengers?{passengers:Number(v.passengers)}:{}),notes:v.notes.trim()};
  try{
   const response=await fetch(`${site.apiUrl}/api/inquiries`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});
   const result=await response.json().catch(()=>null);
   if(!response.ok)throw new Error(result?.message||'The enquiry could not be saved right now.');
   setNotice('Your enquiry has been recorded. Continue to WhatsApp to send the details so Vista Cabs can call you.');
  }catch{
   setError('The enquiry service could not save this request. You can still continue through WhatsApp, or call Vista Cabs.');
  }finally{setSending(false);}
 }
 const today=new Date().toLocaleDateString('en-CA');
 return <form onSubmit={submit} className="enquiry-card relative rounded-[24px] border border-slate-200/80 bg-white p-4 text-slate-900 shadow-[0_24px_70px_rgba(12,32,60,.18)] sm:p-5">
  <div className="mb-4 flex items-center gap-2 rounded-xl bg-[#e7f5ff] p-1.5" role="tablist" aria-label="Trip type">{tripTypes.map(t=><button type="button" key={t} role="tab" aria-selected={trip===t} onClick={()=>{setTrip(t);setError('');setNotice('');setWaHref('')}} className={`trip-tab flex min-h-11 flex-1 items-center justify-center gap-1.5 rounded-lg px-2 py-2 text-[11px] font-extrabold transition sm:text-xs ${trip===t?'bg-[#0758c9] text-white shadow-sm':'text-slate-700 hover:bg-white'}`}><span className="hidden sm:inline"><MapPin size={15}/></span>{t}</button>)}</div>
  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-12 lg:items-end">
   <label className="text-xs font-bold text-slate-600 sm:col-span-1 lg:col-span-2">Your name<input required minLength={2} maxLength={80} autoComplete="name" value={v.name} onChange={e=>update('name',e.target.value)} className={control} placeholder="Name"/></label>
   <label className="text-xs font-bold text-slate-600 sm:col-span-1 lg:col-span-2">Callback mobile<input required type="tel" inputMode="tel" minLength={8} maxLength={20} autoComplete="tel" value={v.phone} onChange={e=>update('phone',e.target.value)} className={control} placeholder="Your phone number"/></label>
   <label className="text-xs font-bold text-slate-600 lg:col-span-3">From location<div className="relative"><MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16}/><input required minLength={2} maxLength={160} autoComplete="street-address" value={v.from} onChange={e=>update('from',e.target.value)} className={`${control} pl-9`} placeholder="City or pickup area"/></div></label>
   {trip!=='Local Trip'&&<label className="text-xs font-bold text-slate-600 lg:col-span-3">To location<div className="relative"><MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16}/><input required minLength={2} maxLength={160} value={v.to} onChange={e=>update('to',e.target.value)} className={`${control} pl-9`} placeholder="City, place or airport"/></div></label>}
   <div className="grid grid-cols-2 gap-3 sm:col-span-2 lg:col-span-4"><label className="text-xs font-bold text-slate-600">Pickup date<div className="relative"><CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16}/><input required type="date" min={today} value={v.date} onChange={e=>update('date',e.target.value)} className={`${control} pl-9`}/></div></label><label className="text-xs font-bold text-slate-600">Time<div className="relative"><Clock3 className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16}/><input required type="time" value={v.time} onChange={e=>update('time',e.target.value)} className={`${control} pl-9`}/></div></label></div>
   {trip==='Round Trip'&&<label className="text-xs font-bold text-slate-600 sm:col-span-2 lg:col-span-3">Return date<input required type="date" min={v.date||today} value={v.returnDate} onChange={e=>update('returnDate',e.target.value)} className={control}/></label>}
   {trip==='Local Trip'&&<label className="text-xs font-bold text-slate-600 lg:col-span-3">Preferred duration<select value={v.duration} onChange={e=>update('duration',e.target.value)} className={control}>{['2 hours','4 hours','6 hours','8 hours','Full day','To be discussed'].map(x=><option key={x}>{x}</option>)}</select></label>}
   {trip==='Airport Trip'&&<label className="text-xs font-bold text-slate-600 lg:col-span-3">Airport journey<select value={v.airportDirection} onChange={e=>update('airportDirection',e.target.value)} className={control}>{['Airport pickup','Airport drop','Airport round trip'].map(x=><option key={x}>{x}</option>)}</select></label>}
   <button type="submit" disabled={sending} className="flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-[#ff9f16] px-4 text-sm font-black text-[#182536] transition hover:bg-[#ffc12f] focus:outline-none focus:ring-2 focus:ring-[#ff9f16] focus:ring-offset-2 disabled:cursor-wait disabled:opacity-70 sm:col-span-2 lg:col-span-2">{sending?'Saving…':<>Send enquiry <Send size={16}/></>}</button>
  </div>
  <details className="mt-3 border-t border-slate-100 pt-3"><summary className="cursor-pointer text-xs font-bold text-slate-600">Add passenger count or trip notes <span className="font-normal text-slate-400">(optional)</span></summary><div className="mt-3 grid gap-3 sm:grid-cols-2"><label className="text-xs font-bold text-slate-600">Passengers<div className="relative"><Users className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16}/><select value={v.passengers} onChange={e=>update('passengers',e.target.value)} className={`${control} pl-9`}><option value="">Not specified</option>{Array.from({length:12},(_,i)=>String(i+1)).map(n=><option key={n} value={n}>{n}</option>)}</select></div></label><label className="text-xs font-bold text-slate-600">Trip notes<input maxLength={350} value={v.notes} onChange={e=>update('notes',e.target.value)} className={control} placeholder={trip==='Airport Trip'?'Flight number, terminal, luggage…':'Stops, luggage or other requirements…'}/></label></div></details>
  {error&&<p role="alert" className="mt-3 rounded-lg bg-amber-50 p-3 text-xs leading-5 text-amber-950">{error}</p>}
  {notice&&<p role="status" className="mt-3 flex items-start gap-2 rounded-lg bg-emerald-50 p-3 text-xs leading-5 text-emerald-900"><CheckCircle2 size={16} className="mt-0.5 shrink-0"/>{notice}</p>}
  {waHref&&<a href={waHref} target="_blank" rel="noreferrer" className="mt-3 flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#159d61] px-4 py-3 text-sm font-extrabold text-white hover:bg-[#128452]">Continue on WhatsApp <ArrowUpRight size={16}/></a>}
  <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-[10px] text-slate-500">Enquiry is saved by the website first · Tap WhatsApp to send details to Vista Cabs · No online payment</p>
 </form>
}
