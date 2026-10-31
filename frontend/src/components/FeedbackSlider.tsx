'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Quote, Sparkles } from 'lucide-react';

const previewCards = [
  { label: 'Sample passenger 01', trip: 'Nashik city trip', text: 'The enquiry was easy to fill in, and I could share the pickup point and stops I had in mind.' },
  { label: 'Sample passenger 02', trip: 'Airport transfer', text: 'It was helpful to include my flight time and destination in one place before requesting a callback.' },
  { label: 'Sample passenger 03', trip: 'Intercity journey', text: 'I could explain the route and return plan clearly, then discuss the details with the team.' },
  { label: 'Sample passenger 04', trip: 'Destination visit', text: 'The trip enquiry made it simple to describe our planned Nashik area stops.' },
];

export default function FeedbackSlider() {
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const preview = process.env.NODE_ENV !== 'production';

  const moveTo = useCallback((next: number) => {
    const row = track.current;
    if (!row) return;
    const visible = window.matchMedia('(min-width: 1280px)').matches ? 3 : window.matchMedia('(min-width: 768px)').matches ? 2 : 1;
    const max = Math.max(0, previewCards.length - visible);
    const index = (next + max + 1) % (max + 1);
    const card = row.children.item(index) as HTMLElement | null;
    if (!card) return;
    row.scrollTo({ left: card.offsetLeft - row.offsetLeft, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
    setActive(index);
  }, []);

  useEffect(() => {
    if (paused || !preview || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = window.setInterval(() => moveTo(active + 1), 6000);
    return () => window.clearInterval(timer);
  }, [active, moveTo, paused, preview]);

  return <section id="feedback" aria-labelledby="feedback-title" className="relative overflow-hidden bg-[#071a2f] py-14 text-white sm:py-18">
    <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-28 h-80 w-80 rounded-full bg-blue-500/15 blur-3xl" />
    <div className="container-wide relative">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div className="max-w-2xl">
          <p className="eyebrow text-amber-300">Stories from the road</p>
          <h2 id="feedback-title" className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">Customer feedback, with care.</h2>
          <p className="mt-3 max-w-xl text-sm leading-6 text-slate-300">We’ll share genuine experiences here once customers approve them for publication.</p>
        </div>
        <div className="flex items-center gap-2" aria-label="Feedback slider controls">
          <button type="button" onClick={() => moveTo(active - 1)} onFocus={() => setPaused(true)} aria-label="Previous feedback card" className="grid h-11 w-11 place-items-center rounded-full border border-white/20 text-white transition hover:border-amber-300 hover:bg-white/10"><ArrowLeft size={18}/></button>
          <button type="button" onClick={() => moveTo(active + 1)} onFocus={() => setPaused(true)} aria-label="Next feedback card" className="grid h-11 w-11 place-items-center rounded-full bg-amber-300 text-slate-950 transition hover:bg-amber-200"><ArrowRight size={18}/></button>
        </div>
      </div>

      {preview ? <>
        <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-amber-200/30 bg-amber-300/10 px-3 py-2 text-[10px] font-black uppercase tracking-[.12em] text-amber-200"><Sparkles size={13}/> Design preview · sample text · not real reviews</div>
        <div ref={track} role="region" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocusCapture={() => setPaused(true)} onBlurCapture={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setPaused(false); }} className="mt-5 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" aria-roledescription="carousel" aria-label="Sample feedback card layout">
          {previewCards.map((card) => <article key={card.label} className="flex min-h-[245px] w-full shrink-0 snap-start flex-col rounded-3xl border border-white/10 bg-white/[.07] p-5 backdrop-blur-sm sm:p-6 md:w-[calc(50%-0.5rem)] xl:w-[calc(33.333%-0.667rem)]">
            <div className="flex items-center justify-between"><span className="grid h-10 w-10 place-items-center rounded-xl bg-amber-300 text-slate-950"><Quote size={19}/></span><span className="rounded-full border border-white/15 px-3 py-1 text-[10px] font-bold text-slate-300">{card.label}</span></div>
            <p className="mt-5 flex-1 text-sm leading-6 text-white/90">“{card.text}”</p>
            <div className="mt-5 border-t border-white/10 pt-4"><p className="text-xs font-black text-white">Sample content — replace before launch</p><p className="mt-1 text-[10px] text-slate-400">{card.trip} · no customer identity or rating shown</p></div>
          </article>)}
        </div>
        <p className="mt-2 text-[11px] leading-5 text-amber-100/75">These cards are layout samples only, not customer statements. Replace or remove them before publishing the production site.</p>
      </> : <div className="mt-7 rounded-3xl border border-white/10 bg-white/[.06] p-6 sm:p-8"><p className="max-w-2xl text-sm leading-7 text-slate-200">Approved customer feedback will appear here. We only publish real feedback after the customer has approved the text and any name or photo used.</p></div>}
    </div>
  </section>;
}
