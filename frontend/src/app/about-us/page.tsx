import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Briefcase, MapPinned, Plane, Route } from 'lucide-react';
import PageHero from '@/components/PageHero';
import SiteFooter from '@/components/SiteFooter';
import { pickImage } from '@/lib/images';
import { reviewSummary } from '@/lib/reviews';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'About Us | Vistar Cabs',
  description: 'Vistar Cabs is a Nashik-based cab service for local trips, airport transfers, outstation journeys and corporate travel across Maharashtra.',
  alternates: { canonical: '/about-us' },
};

const stats = [
  { value: reviewSummary.rating, label: 'Google rating', text: `Average from ${reviewSummary.count} customer reviews on Google.` },
  { value: String(reviewSummary.count), label: 'Google reviews', text: 'Real feedback from travellers who rode with us.' },
  { value: String(site.phones.length), label: 'Phone lines', text: 'Reach the team on any of our three numbers.' },
  { value: '6', label: 'City pages', text: 'Nashik, Mumbai, Pune, Chhatrapati Sambhajinagar, Ahilyanagar and Shirdi.' },
];
const services = [
  { icon: MapPinned, title: 'Local cabs', text: 'Temple visits, sightseeing and city trips in Nashik.', href: '/local-cab-service' },
  { icon: Plane, title: 'Airport transfers', text: 'Pickups and drops for Nashik, Mumbai, Pune and Shirdi airports.', href: '/airport-taxi' },
  { icon: Route, title: 'Outstation trips', text: 'One-way and round trips across Maharashtra.', href: '/outstation-cab-service' },
  { icon: Briefcase, title: 'Corporate cabs', text: 'Travel plans for teams, clients and visitors.', href: '/corporate-cabs' },
];

export default function AboutUsPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <PageHero title="About Us" intro="Less hassle, more travel. A Nashik-based cab service built around clear communication and comfortable journeys." image="about-us" />

      <section className="container-wide grid items-center gap-10 py-14 sm:py-20 lg:grid-cols-2">
        <div className="relative min-h-[280px] overflow-hidden rounded-3xl shadow-lg sm:min-h-[400px]">
          <Image src={pickImage('about-us-story', '/images/sahyadri-journey.webp')} alt="A Vistar Cabs journey through the Nashik region" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
        </div>
        <div>
          <h2 className="text-3xl font-black tracking-tight sm:text-4xl">Less Hassle, More Travel</h2>
          <div className="mt-5 grid gap-4 text-sm leading-7 text-slate-600 sm:text-base">
            <p>Vistar Cabs is a cab and travel service based in Nashik Road, Nashik. We help people get to where they need to go, whether that is a temple visit in the city, an airport pickup, a family trip to Mumbai or Pune, or regular travel for a business.</p>
            <p>Our approach is simple. You tell us your route, date and time, and a member of our team calls you to confirm the vehicle and fare. There is no automated checkout and no guesswork, just a conversation with the people who will actually arrange your ride.</p>
            <p>Our customers often mention clean cars, punctual pickups and polite, helpful drivers. Some even say the driver showed them around Nashik. That kind of local knowledge is what we want every passenger to experience.</p>
            <p>From Nashik we travel across Maharashtra, including Mumbai, Pune, Chhatrapati Sambhajinagar, Ahilyanagar and Shirdi. As the Nashik Kumbh Mela approaches, we are also ready to help pilgrims plan their journeys.</p>
          </div>
          <p className="mt-6 text-base font-extrabold">Send your next trip enquiry and enjoy less hassle, more travel.</p>
          <Link href="/#book" className="mt-5 inline-flex min-h-12 items-center gap-2 rounded-xl bg-[#ff7a00] px-6 text-sm font-extrabold text-white hover:bg-[#e66e00]">Book your cab <ArrowRight size={16} aria-hidden="true" /></Link>
        </div>
      </section>

      <section className="bg-[#f4f7fb] py-12 sm:py-16"><div className="container-wide grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(s => <article key={s.label} className="rounded-2xl bg-white p-6 shadow-sm"><p className="text-4xl font-black text-[#0758c9]">{s.value}</p><h3 className="mt-2 text-base font-black">{s.label}</h3><p className="mt-2 text-xs leading-5 text-slate-500">{s.text}</p></article>)}
      </div></section>

      <section className="py-14 sm:py-20"><div className="container-wide">
        <h2 className="text-3xl font-black tracking-tight">What we do</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map(({ icon: Icon, title, text, href }) => <Link key={title} href={href} className="group rounded-2xl border border-slate-200 p-5 transition hover:-translate-y-0.5 hover:border-amber-300 hover:shadow-md"><span className="grid h-11 w-11 place-items-center rounded-xl bg-blue-50 text-blue-600"><Icon size={22} aria-hidden="true" /></span><h3 className="mt-4 text-base font-black">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{text}</p><span className="mt-3 inline-flex items-center gap-1 text-xs font-extrabold text-[#0758c9]">Learn more <ArrowRight size={13} aria-hidden="true" /></span></Link>)}
        </div>
      </div></section>
      <SiteFooter />
    </main>
  );
}
