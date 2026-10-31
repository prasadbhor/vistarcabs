import type { Metadata } from 'next';
import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import PageHero from '@/components/PageHero';
import SiteFooter from '@/components/SiteFooter';
import ContactForm from '@/components/ContactForm';
import WhatsAppIcon from '@/components/WhatsAppIcon';
import { InstagramIcon } from '@/components/SocialIcons';
import { formatPhone, site } from '@/lib/site';

export const metadata: Metadata = { title: 'Contact Us | Vistar Cabs', description: 'Contact Vistar Cabs in Nashik Road, Nashik. Call, WhatsApp or send a message to plan your cab trip.', alternates: { canonical: '/contact-us' } };

export default function ContactPage() {
  const maps = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.address)}`;
  const tiles = [
    { icon: <Phone size={22} />, title: 'Call us', text: 'Talk to the team directly.', href: `tel:${site.phone}` },
    { icon: <WhatsAppIcon size={22} />, title: 'Chat on WhatsApp', text: 'Ask away, we are here to help.', href: `https://wa.me/${site.whatsapp}?text=${encodeURIComponent('Hello Vistar Cabs, I would like to enquire about a cab.')}` },
    { icon: <MessageCircle size={22} />, title: 'FAQs', text: 'Common questions answered in one place.', href: '/faq' },
    { icon: <InstagramIcon size={22} />, title: 'Follow on Instagram', text: 'See our latest journeys.', href: site.instagram },
  ];
  return (
    <main className="min-h-screen bg-[#f4f7fb] text-slate-900">
      <PageHero title="Contact Us" intro="Planning a trip or have a question? Call, WhatsApp or send us a message and the VistarCabs team will get back to you." image="contact-us" />
      <section className="container-wide grid gap-8 py-12 sm:py-16 lg:grid-cols-[.9fr_1.1fr]">
        <div className="rounded-3xl bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-2xl font-black">Get in touch</h2>
          <ul className="mt-6 grid gap-6 text-sm">
            <li className="flex gap-4"><span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-blue-50 text-blue-600"><MapPin size={20} aria-hidden="true" /></span><div><p className="font-extrabold">Address</p><a href={maps} target="_blank" rel="noreferrer" className="mt-1 block leading-6 text-slate-600 hover:text-blue-700">{site.address}</a><a href={maps} target="_blank" rel="noreferrer" className="mt-1 inline-block text-xs font-bold text-blue-700 underline">Get directions</a></div></li>
            <li className="flex gap-4"><span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-blue-50 text-blue-600"><Phone size={20} aria-hidden="true" /></span><div><p className="font-extrabold">Phone</p><p className="mt-1 grid gap-1">{site.phones.map(p => <a key={p} href={`tel:${p}`} className="text-slate-600 hover:text-blue-700">{formatPhone(p)}</a>)}</p></div></li>
            <li className="flex gap-4"><span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-blue-50 text-blue-600"><Mail size={20} aria-hidden="true" /></span><div><p className="font-extrabold">Email</p><a href={`mailto:${site.email}`} className="mt-1 block text-slate-600 hover:text-blue-700">{site.email}</a></div></li>
          </ul>
        </div>
        <div className="rounded-3xl bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-2xl font-black">Help &amp; Support</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">Have a query, a service request or feedback? Fill in the form below and we will respond as soon as we can.</p>
          <div className="mt-6"><ContactForm /></div>
        </div>
      </section>
      <section className="container-wide pb-12 sm:pb-16"><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {tiles.map(t => <a key={t.title} href={t.href} target={t.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-amber-300 hover:shadow-md"><span className="grid h-11 w-11 place-items-center rounded-xl bg-orange-50 text-orange-600">{t.icon}</span><h3 className="mt-4 text-base font-black">{t.title}</h3><p className="mt-1 text-xs leading-5 text-slate-500">{t.text}</p></a>)}
      </div></section>
      <SiteFooter />
    </main>
  );
}
