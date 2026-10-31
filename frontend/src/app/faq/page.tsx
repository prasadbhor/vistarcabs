import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import SiteFooter from '@/components/SiteFooter';
import FaqList from '@/components/Faq';
import { generalFaqs, kumbhFaqs } from '@/lib/faqs';

export const metadata: Metadata = { title: 'FAQs | Vistar Cabs', description: 'Answers to common questions about booking cabs with Vistar Cabs in Nashik, including airport transfers, fares and Kumbh Mela travel.', alternates: { canonical: '/faq' } };

export default function FaqPage() {
  return (
    <main className="min-h-screen bg-[#f4f7fb] text-slate-900">
      <PageHero title="Frequently Asked Questions" intro="Answers about bookings, fares, cancellations and safety, so your journey with VistarCabs is simple and stress-free." image="faq" />
      <section className="container-wide py-12 sm:py-16"><FaqList items={generalFaqs} />
        <h2 className="mt-12 text-2xl font-black tracking-tight">Kumbh Mela travel</h2><div className="mt-5"><FaqList items={kumbhFaqs} /></div>
      </section>
      <SiteFooter />
    </main>
  );
}
