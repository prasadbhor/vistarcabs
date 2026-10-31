'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { ArrowUpRight, Menu, Phone, X } from 'lucide-react';
import { site } from '@/lib/site';

const nav = [
  { label: 'Services', href: '/#services' },
  { label: 'Cities', href: '/#cities' },
  { label: 'Airport transfers', href: '/#airports' },
  { label: 'Routes', href: '/#routes' },
  { label: 'Feedback', href: '/#feedback' },
  { label: 'Contact', href: '/#contact' },
];
export default function Header() {
  const [open, setOpen] = useState(false);
  const waHref = site.whatsapp ? `https://wa.me/${site.whatsapp}?text=${encodeURIComponent('Hello Vistar Cabs, I would like to enquire about a cab booking.')}` : '/#contact';
  return <header className="absolute inset-x-0 top-0 z-30 border-b border-white/15 text-white">
    <div className="container-wide flex min-h-[82px] items-center justify-between gap-4 py-3">
      <Link href="/" aria-label="Vistar Cabs home" className="flex shrink-0 items-center rounded-lg bg-white px-2 py-1.5 shadow-sm">
        <Image src="/brand/vistar-cabs-logo.png" alt="Vistar Cabs" width={170} height={58} priority className="h-9 w-auto object-contain sm:h-10" />
      </Link>
      <nav aria-label="Main navigation" className="hidden items-center gap-5 xl:flex">
        {nav.map(item => <Link key={item.href} className="text-[13px] font-semibold text-white/85 transition hover:text-amber-300" href={item.href}>{item.label}</Link>)}
      </nav>
      <div className="flex items-center gap-2">
        {site.phone && <a href={`tel:${site.phone}`} aria-label="Call Vistar Cabs" className="hidden items-center gap-2 rounded-full border border-white/25 px-3 py-2 text-xs font-bold lg:flex"><Phone size={14}/>{site.phone}</a>}
        <a href={waHref} className="inline-flex items-center gap-2 rounded-full bg-amber-400 px-4 py-3 text-xs font-extrabold text-slate-950 transition hover:bg-amber-300">Quick Enquiry <ArrowUpRight size={15}/></a>
        <button type="button" aria-label={open ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={open} onClick={() => setOpen(!open)} className="grid h-10 w-10 place-items-center rounded-full border border-white/25 xl:hidden">{open ? <X size={20}/> : <Menu size={20}/>}</button>
      </div>
    </div>
    {open && <nav aria-label="Mobile navigation" className="border-t border-white/15 bg-[#0b68e8] px-5 py-4 shadow-xl xl:hidden"><div className="container-wide grid gap-1">{nav.map(item=><Link key={item.href} href={item.href} onClick={()=>setOpen(false)} className="rounded-lg px-3 py-3 text-sm font-semibold text-white hover:bg-white/10">{item.label}</Link>)}{site.phone && <a href={`tel:${site.phone}`} className="rounded-lg px-3 py-3 text-sm font-semibold text-white">Call {site.phone}</a>}</div></nav>}
  </header>;
}



