'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Quote, Star } from 'lucide-react';
import { reviews, reviewSummary } from '@/lib/reviews';

/** Sliding customer feedback, using the real Google reviews in lib/reviews.ts. */
export default function CustomerFeedback() {
  const track = useRef<HTMLDivElement>(null);
  const [pages, setPages] = useState(1);
  const [page, setPage] = useState(0);
  const [paused, setPaused] = useState(false);

  const measure = useCallback(() => {
    const el = track.current;
    if (!el) return;
    setPages(Math.max(1, Math.round(el.scrollWidth / el.clientWidth)));
    setPage(Math.round(el.scrollLeft / el.clientWidth));
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [measure]);

  const go = useCallback((dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;
    const smooth = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
    if (dir === 1 && atEnd) el.scrollTo({ left: 0, behavior: smooth });
    else if (dir === -1 && el.scrollLeft <= 4) el.scrollTo({ left: el.scrollWidth, behavior: smooth });
    else el.scrollBy({ left: dir * el.clientWidth, behavior: smooth });
  }, []);

  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = window.setInterval(() => go(1), 5500);
    return () => window.clearInterval(id);
  }, [paused, go]);

  return (
    <section id="feedback" className="bg-[#f4f7fb] py-14 sm:py-20" aria-labelledby="feedback-title">
      <div className="container-wide">
        <div className="mx-auto max-w-2xl text-center">
          <h2 id="feedback-title" className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">Our Valuable Customer Feedback</h2>
          <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">See why thousands of travelers trust VistarCabs for their journeys across Maharashtra.</p>
          <div className="mt-5 inline-flex items-center gap-3 rounded-full border border-slate-200 bg-white px-4 py-2 shadow-sm">
            <span className="flex text-amber-400" aria-hidden="true">{[0, 1, 2, 3, 4].map(i => <Star key={i} size={16} fill="currentColor" />)}</span>
            <span className="text-sm font-black text-slate-900">{reviewSummary.rating}</span>
            <span className="text-xs font-semibold text-slate-500">{reviewSummary.count} {reviewSummary.source}</span>
          </div>
        </div>

        <div className="relative mt-9" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)} onTouchStart={() => setPaused(true)}>
          <div ref={track} onScroll={measure} tabIndex={0} role="region" aria-roledescription="carousel" aria-label="Customer reviews"
            className="no-scrollbar -mx-1 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-1 pb-2">
            {reviews.map(r => (
              <figure key={r.name} className="flex w-[86%] shrink-0 snap-start flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:w-[calc(50%-.5rem)] xl:w-[calc(33.333%-.7rem)] sm:p-6">
                <Quote size={26} className="text-[#0758c9]/25" aria-hidden="true" />
                <blockquote className="mt-3 flex-1 text-sm leading-7 text-slate-700">{r.text}</blockquote>
                <figcaption className="mt-5 flex items-center gap-3 border-t border-slate-100 pt-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#e7f5ff] text-sm font-black text-[#0758c9]" aria-hidden="true">{r.name.trim().charAt(0).toUpperCase()}</span>
                  <span className="min-w-0"><span className="block truncate text-sm font-extrabold text-slate-900">{r.name}</span><span className="block text-[11px] font-semibold text-slate-500">Google review</span></span>
                </figcaption>
              </figure>
            ))}
          </div>
          <div className="mt-6 flex items-center justify-center gap-4">
            <button type="button" onClick={() => go(-1)} aria-label="Previous reviews" className="grid h-11 w-11 place-items-center rounded-full border border-slate-300 bg-white text-slate-700 transition hover:border-[#0758c9] hover:text-[#0758c9]"><ArrowLeft size={18} /></button>
            <div className="flex items-center gap-1.5" aria-hidden="true">{Array.from({ length: Math.min(pages, 8) }, (_, i) => <span key={i} className={`h-2 rounded-full transition-all ${i === Math.min(page, 7) ? 'w-6 bg-[#0758c9]' : 'w-2 bg-slate-300'}`} />)}</div>
            <button type="button" onClick={() => go(1)} aria-label="Next reviews" className="grid h-11 w-11 place-items-center rounded-full border border-slate-300 bg-white text-slate-700 transition hover:border-[#0758c9] hover:text-[#0758c9]"><ArrowRight size={18} /></button>
          </div>
        </div>
      </div>
    </section>
  );
}
