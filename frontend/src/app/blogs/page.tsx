import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Clock3 } from 'lucide-react';
import PageHero from '@/components/PageHero';
import SiteFooter from '@/components/SiteFooter';
import { pickImage } from '@/lib/images';
import { blogCategories, posts } from '@/lib/blogs';

export const metadata: Metadata = {
  title: 'Travel & Cab Blog | Vistar Cabs',
  description: 'Travel guides, route information and cab tips for Nashik, Trimbakeshwar, Mumbai, Pune and the Kumbh Mela, from Vistar Cabs.',
  alternates: { canonical: '/blogs' },
};

export default function BlogsPage() {
  return (
    <main className="min-h-screen bg-[#f4f7fb] text-slate-900">
      <PageHero title="Travel & Cab Blog" eyebrow="Travel · Cab · Insights" intro="Helpful travel guides, route information, Kumbh Mela planning and cab tips for journeys from Nashik." image="blogs" />
      <section className="container-wide grid gap-10 py-12 sm:py-16 lg:grid-cols-[1fr_280px]">
        <div>
          <h2 className="text-2xl font-black">All Articles</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {posts.map(p => (
              <Link key={p.slug} href={`/blogs/${p.slug}`} className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
                <div className="relative aspect-[16/9] bg-[#0758c9]"><Image src={pickImage(`blogs/${p.slug}`, pickImage(p.image, '/images/sahyadri-journey.webp'))} alt="" fill sizes="(min-width: 768px) 40vw, 100vw" className="object-cover transition duration-500 group-hover:scale-105" /></div>
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-center gap-3 text-[11px] font-bold text-slate-500"><span className="rounded-full bg-blue-50 px-2.5 py-1 text-blue-700">{p.category}</span><span>{p.date}</span><span className="inline-flex items-center gap-1"><Clock3 size={12} aria-hidden="true" />{p.readMinutes} min read</span></div>
                  <h3 className="mt-3 text-lg font-black leading-snug group-hover:text-[#0758c9]">{p.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-6 text-slate-600">{p.excerpt}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-extrabold text-[#0758c9]">Read Article <ArrowRight size={14} aria-hidden="true" /></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <aside className="grid content-start gap-6">
          <div className="rounded-2xl bg-white p-5 shadow-sm"><h3 className="text-base font-black">Categories</h3><ul className="mt-3 grid gap-2 text-sm text-slate-600">{blogCategories.map(c => <li key={c} className="rounded-lg bg-slate-50 px-3 py-2 font-semibold">{c}</li>)}</ul></div>
          <div className="rounded-2xl bg-[#0b1a33] p-5 text-white"><h3 className="text-base font-black">Planning a trip?</h3><p className="mt-2 text-sm leading-6 text-slate-300">Send your route and the team will call you back to confirm.</p><Link href="/#book" className="mt-4 inline-flex min-h-11 items-center rounded-xl bg-[#ff7a00] px-4 text-sm font-extrabold">Enquire now</Link></div>
        </aside>
      </section>
      <SiteFooter />
    </main>
  );
}
