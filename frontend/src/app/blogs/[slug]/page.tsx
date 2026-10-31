import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, Clock3 } from 'lucide-react';
import PageHero from '@/components/PageHero';
import SiteFooter from '@/components/SiteFooter';
import { getPost, posts } from '@/lib/blogs';
import { pickImage } from '@/lib/images';

export function generateStaticParams() { return posts.map(p => ({ slug: p.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return {};
  return { title: `${post.title} | Vistar Cabs`, description: post.excerpt, alternates: { canonical: `/blogs/${post.slug}` } };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const post = getPost((await params).slug);
  if (!post) notFound();
  const more = posts.filter(p => p.slug !== post.slug).slice(0, 3);
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <PageHero title={post.title} eyebrow={post.category} image={`blogs/${post.slug}`} fallback={pickImage(post.image, '/images/sahyadri-journey.webp')}>
        <p className="mt-4 flex items-center gap-4 text-xs font-semibold text-white/80"><span>{post.date}</span><span className="inline-flex items-center gap-1"><Clock3 size={13} aria-hidden="true" />{post.readMinutes} min read</span></p>
      </PageHero>
      <article className="container-wide max-w-3xl py-12 sm:py-16">
        <p className="text-base leading-8 text-slate-600">{post.excerpt}</p>
        {post.sections.map(s => (
          <section key={s.heading} className="mt-9">
            <h2 className="text-2xl font-black tracking-tight">{s.heading}</h2>
            {s.paragraphs.map((t, i) => <p key={i} className="mt-4 text-[15px] leading-8 text-slate-700">{t}</p>)}
          </section>
        ))}
        <div className="mt-12 rounded-2xl bg-[#e7f5ff] p-6"><h2 className="text-xl font-black">Plan your trip with Vistar Cabs</h2><p className="mt-2 text-sm leading-6 text-slate-600">Send your route, date and time. The team will call you to confirm the vehicle and fare.</p><Link href="/#book" className="mt-4 inline-flex min-h-12 items-center gap-2 rounded-xl bg-[#ff7a00] px-5 text-sm font-extrabold text-white hover:bg-[#e66e00]">Send an enquiry <ArrowRight size={16} aria-hidden="true" /></Link></div>
        <Link href="/blogs" className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-[#0758c9]"><ArrowLeft size={16} aria-hidden="true" /> All articles</Link>
      </article>
      <section className="bg-[#f4f7fb] py-12"><div className="container-wide"><h2 className="text-xl font-black">More to read</h2><div className="mt-5 grid gap-4 md:grid-cols-3">{more.map(p => <Link key={p.slug} href={`/blogs/${p.slug}`} className="rounded-2xl bg-white p-5 shadow-sm transition hover:shadow-md"><span className="text-[11px] font-bold text-blue-700">{p.category}</span><h3 className="mt-2 text-base font-black leading-snug">{p.title}</h3></Link>)}</div></div></section>
      <SiteFooter />
    </main>
  );
}
