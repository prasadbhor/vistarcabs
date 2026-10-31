import Image from 'next/image';
import Header from '@/components/Header';
import { pickImage } from '@/lib/images';

/** Shared banner for inner pages. Swap the photo by adding public/images/<image>.jpg. */
export default function PageHero({ title, intro, image, fallback = '/images/scenic-hero.webp', eyebrow, children }: { title: string; intro?: string; image: string; fallback?: string; eyebrow?: string; children?: React.ReactNode }) {
  return (
    <section className="relative isolate overflow-hidden bg-[#071a2f] text-white">
      <Image src={pickImage(image, fallback)} alt="" fill priority sizes="100vw" className="-z-20 object-cover" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#071a2f]/95 via-[#0758c9]/75 to-[#0758c9]/45" />
      <Header />
      <div className="container-wide pb-12 pt-32 sm:pb-16 sm:pt-40">
        {eyebrow && <p className="eyebrow text-amber-300">{eyebrow}</p>}
        <h1 className="mt-2 max-w-3xl text-[clamp(2rem,5vw,3.4rem)] font-black leading-[1.05] tracking-tight">{title}</h1>
        {intro && <p className="mt-4 max-w-2xl text-sm leading-7 text-white/85 sm:text-base">{intro}</p>}
        {children}
      </div>
    </section>
  );
}
