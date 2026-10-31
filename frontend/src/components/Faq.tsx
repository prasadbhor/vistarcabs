import { Plus } from 'lucide-react';
import type { Faq } from '@/lib/faqs';

/** Accordion built on <details>, so it works without JavaScript and is keyboard accessible. */
export default function FaqList({ items }: { items: Faq[] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      {items.map((item, i) => (
        <details key={item.q} className="faq-item group border-b border-slate-200 last:border-b-0" open={i === 0}>
          <summary className="flex cursor-pointer list-none items-start justify-between gap-4 px-4 py-4 text-left text-[15px] font-bold text-[#1d4ed8] sm:px-6 sm:text-base">
            <span>{item.q}</span>
            <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full border border-blue-200 text-blue-600 transition group-open:rotate-45 group-open:bg-blue-50" aria-hidden="true"><Plus size={15} /></span>
          </summary>
          <p className="px-4 pb-5 text-sm leading-7 text-slate-600 sm:px-6">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
