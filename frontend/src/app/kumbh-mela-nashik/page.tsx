import type { Metadata } from 'next';
import Link from 'next/link';
import { Bus, CalendarDays, Check, Footprints, HeartPulse, MapPin, PhoneCall, Plane, ShieldAlert, TrainFront, Car, ArrowRight } from 'lucide-react';
import PageHero from '@/components/PageHero';
import SiteFooter from '@/components/SiteFooter';
import InquiryForm from '@/components/InquiryForm';
import FaqList from '@/components/Faq';
import WhatsAppIcon from '@/components/WhatsAppIcon';
import { kumbhFaqs } from '@/lib/faqs';
import { formatPhone, site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Nashik Kumbh Mela 2026-2028 Cab Service | Vistar Cabs',
  description: 'Plan cab travel for the Nashik-Trimbakeshwar Simhastha Kumbh Mela 2026-2028: key dates, how to reach, local transport tips and a quick enquiry form from Vistar Cabs.',
  alternates: { canonical: '/kumbh-mela-nashik' },
};

// Dates announced by the Maharashtra government and reported by PTI and other news outlets. Always confirm with the authorities.
const timetable = [
  { date: '31 October 2026', event: 'Dhwajarohan: flag hoisting, start of the Simhastha', place: 'Trimbakeshwar, Ramkund and Panchavati', type: 'Ceremony' },
  { date: '29 July 2027', event: 'Nagar Pradakshina (city procession)', place: 'Nashik', type: 'Procession' },
  { date: '2 August 2027', event: 'First Amrit Snan (Ashadh Somvati Amavasya)', place: 'Ramkund, Nashik and Trimbakeshwar', type: 'Amrit Snan' },
  { date: '31 August 2027', event: 'Second Amrit Snan (Shravan Amavasya)', place: 'Ramkund, Nashik and Trimbakeshwar', type: 'Amrit Snan' },
  { date: '11 September 2027', event: 'Third Amrit Snan (Bhadrapada Shuddha Ekadashi)', place: 'Nashik', type: 'Amrit Snan' },
  { date: '12 September 2027', event: 'Third Amrit Snan', place: 'Trimbakeshwar', type: 'Amrit Snan' },
  { date: '24 July 2028', event: 'Flag lowering, conclusion of the Simhastha', place: 'Nashik and Trimbakeshwar', type: 'Ceremony' },
];
const bathing = timetable.filter(t => t.type === 'Amrit Snan');

const transport = [
  { icon: Bus, title: 'City buses', text: 'Special services are usually added during large events. Check the latest routes with the local transport authority.' },
  { icon: Car, title: 'Auto-rickshaws', text: 'Handy for short rides, but entry to some areas may be limited on peak days.' },
  { icon: Footprints, title: 'Walking', text: 'Near the ghats, walking is often the only way. Wear comfortable footwear and expect barricaded lanes.' },
  { icon: MapPin, title: 'Parking and restrictions', text: 'Private vehicles, including cabs, may be stopped at parking zones outside the core area on the busiest dates.' },
];

export default function KumbhPage() {
  const wa = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent('Hello Vistar Cabs, I would like to enquire about a cab for the Nashik Kumbh Mela.')}`;
  return (
    <main className="min-h-screen bg-[#f4f7fb] text-slate-900">
      <PageHero
        image="kumbh-mela-nashik" fallback="/images/sahyadri-journey.webp"
        eyebrow="Simhastha Kumbh Mela · 2026-2028"
        title="Kumbh Mela Cab Service in Nashik & Trimbakeshwar"
        intro="The Nashik-Trimbakeshwar Simhastha Kumbh Mela begins on 31 October 2026. Vistar Cabs arranges pickups and drops for Ramkund, Kushavarta Kund, Trimbakeshwar, Nashik Airport, the railway station and your hotel. Send an enquiry and our team will call you back."
      >
        <ul className="mt-6 grid gap-2.5 text-sm font-semibold text-white/95 sm:grid-cols-3">
          {['Airport, railway, local and outstation pickups', 'Team calls you to confirm vehicle and fare', 'No online payment on the website'].map(t => <li key={t} className="flex items-start gap-2"><Check size={17} className="mt-0.5 shrink-0 text-amber-300" aria-hidden="true" />{t}</li>)}
        </ul>
      </PageHero>

      <section id="book" className="container-wide relative z-10 -mt-6 scroll-mt-24 pb-4 sm:-mt-10"><InquiryForm /></section>

      <section className="container-wide py-12 sm:py-16">
        <h2 className="text-3xl font-black tracking-tight sm:text-4xl">Nashik Kumbh Mela: a short guide</h2>
        <div className="mt-5 grid gap-5 text-sm leading-7 text-slate-600 sm:text-base lg:grid-cols-2">
          <p>The Nashik Kumbh Mela is also called the <strong>Simhastha Kumbh</strong>. It is held once every twelve years, when Jupiter is in Leo (Simha Rashi). Devotees take a holy dip in the Godavari, the river that flows through Nashik and rises near Trimbakeshwar.</p>
          <p>The Mela is spread over two pilgrimage centres. Nashik, with Ramkund and the Panchavati ghats, and Trimbakeshwar, about 30 km away, home to the Trimbakeshwar Jyotirlinga and Kushavarta Kund. Many families visit both, so planning your road transfers early makes the trip easier.</p>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16"><div className="container-wide">
        <p className="eyebrow text-amber-700">Timetable and important dates</p>
        <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">Simhastha Kumbh Mela 2026-2028</h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">These are the key dates announced by the Maharashtra government. Authorities may change schedules, traffic rules and entry arrangements, so please confirm on official channels before you travel.</p>
        <div className="mt-8 grid gap-4 md:grid-cols-4">
          {bathing.map(b => <article key={b.date} className="rounded-2xl border border-amber-200 bg-amber-50 p-5"><CalendarDays size={22} className="text-amber-600" aria-hidden="true" /><h3 className="mt-3 text-lg font-black">{b.date}</h3><p className="mt-1 text-sm font-bold text-slate-800">{b.event}</p><p className="mt-1 text-xs text-slate-600">{b.place}</p></article>)}
        </div>
        <div className="mt-8 overflow-x-auto rounded-2xl border border-slate-200">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="bg-slate-50 text-xs font-extrabold uppercase tracking-wide text-slate-500"><tr><th className="px-4 py-3">Date</th><th className="px-4 py-3">Event</th><th className="px-4 py-3">Location</th><th className="px-4 py-3">Type</th></tr></thead>
            <tbody className="divide-y divide-slate-100">{timetable.map(t => <tr key={t.date + t.event}><td className="whitespace-nowrap px-4 py-3 font-bold">{t.date}</td><td className="px-4 py-3">{t.event}</td><td className="px-4 py-3 text-slate-600">{t.place}</td><td className="px-4 py-3 text-slate-600">{t.type}</td></tr>)}</tbody>
          </table>
        </div>
      </div></section>

      <section className="container-wide py-12 sm:py-16">
        <h2 className="text-3xl font-black tracking-tight sm:text-4xl">Local transport in Nashik during the Mela</h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">Authorities focus on traffic and crowd control during the Kumbh, so private vehicles may be limited near the main venues. Plan around walking routes, shuttles and a pre-arranged cab for the rest of the journey.</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {transport.map(({ icon: Icon, title, text }) => <article key={title} className="rounded-2xl bg-white p-5 shadow-sm"><span className="grid h-11 w-11 place-items-center rounded-xl bg-blue-50 text-blue-600"><Icon size={22} aria-hidden="true" /></span><h3 className="mt-4 text-base font-black">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{text}</p></article>)}
        </div>
        <p className="mt-5 text-sm leading-7 text-slate-600">A local cab from Vistar Cabs can take you between your hotel, the station and a convenient drop point near restricted zones. Tell us your plan when you enquire.</p>
      </section>

      <section className="bg-white py-12 sm:py-16"><div className="container-wide grid gap-6 lg:grid-cols-2">
        <article className="rounded-2xl border border-slate-200 p-6"><h2 className="flex items-center gap-2 text-xl font-black"><ShieldAlert size={22} className="text-orange-500" aria-hidden="true" />Crowd and travel safety</h2><ul className="mt-4 grid gap-3 text-sm leading-6 text-slate-600">{['Agree a meeting point with your group in case you get separated.', 'Avoid the busiest Amrit Snan days if you prefer a calmer visit.', 'Follow instructions from police and volunteers.', 'Keep a copy of your ID and emergency contacts.', 'Fix your pickup near a recognisable landmark, not deep inside a crowded area.'].map(t => <li key={t} className="flex gap-2"><Check size={16} className="mt-1 shrink-0 text-emerald-600" aria-hidden="true" />{t}</li>)}</ul></article>
        <article className="rounded-2xl border border-slate-200 p-6"><h2 className="flex items-center gap-2 text-xl font-black"><HeartPulse size={22} className="text-orange-500" aria-hidden="true" />Health and comfort</h2><ul className="mt-4 grid gap-3 text-sm leading-6 text-slate-600">{['Carry drinking water and any regular medicines.', 'Use sun protection and wear comfortable footwear.', 'Be careful with street food and keep hand sanitiser handy.', 'Note the nearest medical camps near the ghats.', 'Travelling with elders or children? Tell us so we can plan the vehicle and stops.'].map(t => <li key={t} className="flex gap-2"><Check size={16} className="mt-1 shrink-0 text-emerald-600" aria-hidden="true" />{t}</li>)}</ul></article>
      </div></section>

      <section className="container-wide py-12 sm:py-16">
        <h2 className="text-3xl font-black tracking-tight sm:text-4xl">How to reach Nashik for the Kumbh Mela</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <article className="rounded-2xl bg-white p-6 shadow-sm"><Plane size={24} className="text-blue-600" aria-hidden="true" /><h3 className="mt-3 text-lg font-black">By air</h3><p className="mt-2 text-sm leading-6 text-slate-600">Nashik Airport at Ozar is the closest, roughly 20 km from the city. Mumbai Airport is a longer drive away, and Shirdi Airport suits pilgrims combining a Shirdi visit with the Mela.</p></article>
          <article className="rounded-2xl bg-white p-6 shadow-sm"><TrainFront size={24} className="text-blue-600" aria-hidden="true" /><h3 className="mt-3 text-lg font-black">By train</h3><p className="mt-2 text-sm leading-6 text-slate-600">Nashik Road is the main railway station. Manmad is another major junction on the route. Arrange a pickup in advance so you are not searching for transport in a crowd.</p></article>
          <article className="rounded-2xl bg-white p-6 shadow-sm"><Car size={24} className="text-blue-600" aria-hidden="true" /><h3 className="mt-3 text-lg font-black">By road</h3><p className="mt-2 text-sm leading-6 text-slate-600">Roads connect Nashik to Mumbai, Pune, Shirdi and Chhatrapati Sambhajinagar. Expect heavy traffic and plan extra time, especially around the Amrit Snan dates.</p></article>
        </div>
        <p className="mt-5 text-sm leading-7 text-slate-600">However you arrive, a pre-arranged pickup means a driver is already waiting. <Link href="/airport-taxi" className="font-bold text-blue-700 underline">Airport transfers</Link> and <Link href="/outstation-cab-service" className="font-bold text-blue-700 underline">outstation cabs</Link> can be planned in the same enquiry.</p>
      </section>

      <section className="bg-[#0b1a33] py-12 text-white sm:py-16"><div className="container-wide">
        <h2 className="text-3xl font-black tracking-tight sm:text-4xl">Why enquire with Vistar Cabs for the Kumbh</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[{ t: 'Nashik-based team', d: 'We know the roads, ghats and temples around Nashik and Trimbakeshwar.' }, { t: 'Clean cars, punctual pickups', d: 'Our Google reviews regularly mention neat cars and on-time service.' }, { t: 'Every kind of trip', d: 'Airport, railway, local sightseeing and outstation journeys from one enquiry.' }, { t: 'A person to talk to', d: 'We call you back to plan timings, pickup points and the fare.' }].map(x => <article key={x.t} className="rounded-2xl bg-white/5 p-5 ring-1 ring-white/10"><h3 className="text-base font-black">{x.t}</h3><p className="mt-2 text-sm leading-6 text-slate-300">{x.d}</p></article>)}
        </div>
      </div></section>

      <section className="container-wide py-12 sm:py-16">
        <h2 className="text-3xl font-black tracking-tight sm:text-4xl">How to enquire for the Kumbh Mela</h2>
        <ol className="mt-8 grid gap-4 md:grid-cols-4">
          {['Enter your pickup, drop, date and time in the form above.', 'Add your name and mobile number so we can call you.', 'Our team confirms vehicle, timings and fare with you.', 'Your driver meets you at the agreed pickup point.'].map((t, i) => <li key={t} className="rounded-2xl bg-white p-5 shadow-sm"><span className="text-3xl font-black text-amber-400">0{i + 1}</span><p className="mt-2 text-sm leading-6 text-slate-700">{t}</p></li>)}
        </ol>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href={`tel:${site.phone}`} className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-[#ff7a00] px-5 text-sm font-extrabold text-white hover:bg-[#e66e00]"><PhoneCall size={17} aria-hidden="true" />Call {formatPhone(site.phone)}</a>
          <a href={wa} target="_blank" rel="noreferrer" className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-[#25d366] px-5 text-sm font-extrabold text-white hover:bg-[#1fb857]"><WhatsAppIcon size={20} />WhatsApp us</a>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16"><div className="container-wide grid gap-8 lg:grid-cols-[.7fr_1.3fr]">
        <div><h2 className="text-3xl font-black tracking-tight">Frequently Asked Questions</h2><p className="mt-3 text-sm leading-7 text-slate-600">Quick answers about the Kumbh Mela and travelling with VistarCabs.</p></div>
        <FaqList items={kumbhFaqs} />
      </div></section>

      <section className="container-wide py-12 sm:py-16"><div className="flex flex-col items-start justify-between gap-5 rounded-3xl bg-[#eef5ff] p-6 sm:p-8 md:flex-row md:items-center"><div><h2 className="text-2xl font-black">Corporate and group travel</h2><p className="mt-2 max-w-xl text-sm leading-6 text-slate-600">Bringing a team, delegation or large group to Nashik? Tell us your requirements for a customised quote.</p></div><Link href="/corporate-cabs#corporate-enquiry" className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-[#2563eb] px-6 text-sm font-extrabold text-white hover:bg-[#1d4ed8]">Get a corporate quote <ArrowRight size={16} aria-hidden="true" /></Link></div></section>
      <SiteFooter />
    </main>
  );
}
