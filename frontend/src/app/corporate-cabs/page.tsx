import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Briefcase, CalendarClock, MessageSquareText, PhoneCall, Plane, Users } from 'lucide-react';
import Header from '@/components/Header';
import SiteFooter from '@/components/SiteFooter';
import CorporateHero from '@/components/CorporateHero';
import CorporateEnquiryButton from '@/components/CorporateEnquiry';
import FaqList from '@/components/Faq';
import { corporateFaqs } from '@/lib/faqs';
import { formatPhone, site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Corporate Cabs in Nashik | Vistar Cabs',
  description: 'Corporate cab services in Nashik for employee travel, airport transfers, client visits and business trips. Get a customised quote from Vistar Cabs.',
  alternates: { canonical: '/corporate-cabs' },
};

const uses = [
  { icon: Users, title: 'Employee travel', text: 'Regular pickups and drops for teams, planned around shifts and routes.' },
  { icon: Plane, title: 'Airport transfers', text: 'Pickups and drops for staff, clients and visiting executives.' },
  { icon: Briefcase, title: 'Client visits', text: 'Presentable cars and courteous drivers for meetings and site visits.' },
  { icon: CalendarClock, title: 'Outstation business trips', text: 'One-way or round trips to Mumbai, Pune and across Maharashtra.' },
];
const steps = [
  { icon: MessageSquareText, title: 'Tell us your need', text: 'Click Get Started and share your city, contact details and requirements.' },
  { icon: PhoneCall, title: 'We call you back', text: 'The team discusses usage, timings and routes with you.' },
  { icon: Briefcase, title: 'Get your plan', text: 'Receive a customised quote and start travelling.' },
];

export default function CorporateCabsPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <div className="bg-[#071a2f]"><Header /><div className="h-24 sm:h-28" /></div>
      <section className="container-wide -mt-4 pb-12 sm:pb-16"><CorporateHero asHeading /></section>

      <section className="bg-[#f4f7fb] py-12 sm:py-16"><div className="container-wide">
        <h2 className="text-2xl font-black tracking-tight sm:text-3xl">What we can arrange for your business</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {uses.map(({ icon: Icon, title, text }) => <article key={title} className="rounded-2xl bg-white p-5 shadow-sm"><span className="grid h-11 w-11 place-items-center rounded-xl bg-blue-50 text-blue-600"><Icon size={22} aria-hidden="true" /></span><h3 className="mt-4 text-base font-black">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{text}</p></article>)}
        </div>
      </div></section>

      <section className="py-12 sm:py-16"><div className="container-wide">
        <h2 className="text-2xl font-black tracking-tight sm:text-3xl">How it works</h2>
        <ol className="mt-8 grid gap-4 md:grid-cols-3">
          {steps.map(({ icon: Icon, title, text }, i) => <li key={title} className="relative rounded-2xl border border-slate-200 p-6"><span className="absolute right-5 top-4 text-4xl font-black text-slate-100">0{i + 1}</span><Icon size={24} className="text-orange-500" aria-hidden="true" /><h3 className="mt-4 text-lg font-black">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{text}</p></li>)}
        </ol>
      </div></section>

      <section id="faqs" className="bg-[#f4f7fb] py-12 sm:py-16"><div className="container-wide grid gap-8 lg:grid-cols-[.7fr_1.3fr]">
        <div><h2 className="text-3xl font-black tracking-tight">Frequently Asked Questions</h2><p className="mt-3 text-sm leading-7 text-slate-600">Questions about corporate travel with VistarCabs. Need something else? Call us on <a className="font-bold text-blue-700" href={`tel:${site.phone}`}>{formatPhone(site.phone)}</a>.</p></div>
        <FaqList items={corporateFaqs} />
      </div></section>

      <section className="bg-[#0b1a33] py-12 text-white"><div className="container-wide flex flex-col items-start justify-between gap-5 md:flex-row md:items-center">
        <div><h2 className="text-2xl font-black sm:text-3xl">Ready for smarter business travel?</h2><p className="mt-2 text-sm text-slate-300">Share your requirements and we will call you with a customised quote.</p></div>
        <div className="flex flex-wrap gap-3"><CorporateEnquiryButton label="Get a Quote" className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-[#ff7a00] px-6 text-sm font-extrabold text-white hover:bg-[#e66e00]" /><Link href="/contact-us" className="inline-flex min-h-12 items-center gap-2 rounded-xl border border-white/30 px-6 text-sm font-extrabold hover:bg-white/10">Contact us <ArrowRight size={16} /></Link></div>
      </div></section>
      <SiteFooter />
    </main>
  );
}
