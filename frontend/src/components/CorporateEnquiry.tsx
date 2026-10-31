'use client';
import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Car, CheckCircle2, Clock3, Headset, ShieldCheck, Wallet, X } from 'lucide-react';
import { site } from '@/lib/site';
import WhatsAppIcon from '@/components/WhatsAppIcon';

const points = [
  { icon: Car, title: 'Clean, well-maintained cars', text: 'Customers regularly mention neat, comfortable cabs.' },
  { icon: Clock3, title: 'Punctual pickups', text: 'On-time pickups and drops are what our customers notice most.' },
  { icon: Wallet, title: 'Flexible plans', text: 'We discuss pricing around your expected monthly usage.' },
  { icon: ShieldCheck, title: 'Courteous drivers', text: 'Polite, professional drivers for your staff and guests.' },
  { icon: Headset, title: 'A person to talk to', text: 'The team calls you back to plan the details.' },
];

type State = 'idle' | 'sending' | 'sent' | 'saved' | 'failed';

/** "Get Started" button plus the corporate enquiry pop-up. Opens automatically for /…#corporate-enquiry. */
export default function CorporateEnquiryButton({ label = 'Get Started', className = '' }: { label?: string; className?: string }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [state, setState] = useState<State>('idle');
  const [v, setV] = useState({ contactPerson: '', email: '', phone: '', city: '', requirements: '', website: '' });
  const set = (k: keyof typeof v, value: string) => setV(o => ({ ...o, [k]: value }));

  const open = () => dialog.current?.showModal();
  const close = () => dialog.current?.close();

  useEffect(() => {
    if (window.location.hash === '#corporate-enquiry') open();
    const onHash = () => { if (window.location.hash === '#corporate-enquiry') open(); };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const waLink = () => {
    const text = ['Hello Vistar Cabs, I would like a corporate cab quote.', `Contact person: ${v.contactPerson}`, `Phone: ${v.phone}`, `Email: ${v.email}`, `City: ${v.city}`, ...(v.requirements ? [`Requirements: ${v.requirements}`] : [])].join('\n');
    return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
  };

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState('sending');
    try {
      const res = await fetch(`${site.apiUrl}/api/corporate-inquiries`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(v) });
      const body = await res.json().catch(() => null);
      if (!res.ok) throw new Error(body?.message || 'failed');
      setState(body?.notified ? 'sent' : 'saved');
    } catch { setState('failed'); }
  }

  const reset = () => { setState('idle'); setV({ contactPerson: '', email: '', phone: '', city: '', requirements: '', website: '' }); };

  return (
    <>
      <button type="button" onClick={open} className={className || 'inline-flex min-h-12 items-center gap-2 rounded-xl bg-[#2563eb] px-6 text-sm font-extrabold text-white transition hover:bg-[#1d4ed8]'}>
        {label} <ArrowRight size={16} aria-hidden="true" />
      </button>

      <dialog ref={dialog} className="corp-dialog m-auto w-full max-w-[920px] p-3 sm:p-6" aria-labelledby="corp-title" onClick={e => { if (e.target === dialog.current) close(); }} onClose={() => { if (window.location.hash === '#corporate-enquiry') history.replaceState(null, '', window.location.pathname); }}>
        <div className="relative grid max-h-[92dvh] overflow-hidden rounded-2xl bg-white shadow-2xl md:grid-cols-[.9fr_1.1fr]">
          <aside className="hidden bg-[#0b1a33] p-7 text-white md:block">
            <h2 className="text-xl font-black leading-snug">Why choose our corporate cab services?</h2>
            <p className="mt-2 text-xs leading-5 text-slate-300">Cabs for employee travel, airport transfers and business trips, planned around your needs.</p>
            <ul className="mt-6 grid gap-5">
              {points.map(({ icon: Icon, title, text }) => (
                <li key={title} className="flex gap-3"><Icon size={20} className="mt-0.5 shrink-0 text-orange-400" aria-hidden="true" /><div><p className="text-sm font-bold">{title}</p><p className="mt-0.5 text-xs leading-5 text-slate-400">{text}</p></div></li>
              ))}
            </ul>
          </aside>

          <div className="max-h-[92dvh] overflow-y-auto p-5 sm:p-7">
            <button type="button" onClick={close} aria-label="Close corporate enquiry form" className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full text-slate-500 hover:bg-slate-100"><X size={20} /></button>
            <h2 id="corp-title" className="pr-10 text-2xl font-black text-slate-900">Inquire Now</h2>
            <p className="mt-1 text-sm text-slate-500">Fill in the details to get a customised quote.</p>

            {state === 'sent' || state === 'saved' || state === 'failed' ? (
              <div role="status" aria-live="polite" className="mt-6 rounded-xl bg-emerald-50 p-4 text-sm leading-6 text-emerald-900">
                <p className="flex items-center gap-2 font-extrabold"><CheckCircle2 size={18} aria-hidden="true" />{state === 'failed' ? 'Send it on WhatsApp instead' : state === 'sent' ? 'Enquiry sent' : 'Enquiry received'}</p>
                <p className="mt-1">{state === 'sent' ? 'Thank you. The VistarCabs team will call you shortly to discuss your requirements.' : state === 'saved' ? 'Thank you. To reach the team faster, you can also send these details on WhatsApp.' : 'We could not reach the enquiry service just now. Your details are ready as a WhatsApp message, or call us.'}</p>
                {state !== 'sent' && <a href={waLink()} target="_blank" rel="noreferrer" className="mt-3 inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#25d366] px-4 text-sm font-extrabold text-white"><WhatsAppIcon size={20} /> Send on WhatsApp</a>}
                <button type="button" onClick={() => { reset(); close(); }} className="mt-3 block text-xs font-bold text-emerald-800 underline">Close</button>
              </div>
            ) : (
              <form onSubmit={submit} className="mt-5 grid gap-3 sm:grid-cols-2">
                <label className="block text-[11px] font-extrabold uppercase tracking-wide text-slate-500">Contact person
                  <input required minLength={2} maxLength={80} autoComplete="name" value={v.contactPerson} onChange={e => set('contactPerson', e.target.value)} placeholder="Full name" className="field-input" />
                </label>
                <label className="block text-[11px] font-extrabold uppercase tracking-wide text-slate-500">Work email
                  <input required type="email" inputMode="email" maxLength={120} autoComplete="email" value={v.email} onChange={e => set('email', e.target.value)} placeholder="name@company.com" className="field-input" />
                </label>
                <label className="block text-[11px] font-extrabold uppercase tracking-wide text-slate-500">Contact number
                  <input required type="tel" inputMode="tel" minLength={8} maxLength={20} pattern="[0-9+()\- ]{8,20}" title="Enter a valid mobile number" autoComplete="tel" value={v.phone} onChange={e => set('phone', e.target.value)} placeholder="10-digit mobile number" className="field-input" />
                </label>
                <label className="block text-[11px] font-extrabold uppercase tracking-wide text-slate-500">City
                  <input required minLength={2} maxLength={80} autoComplete="address-level2" value={v.city} onChange={e => set('city', e.target.value)} placeholder="e.g. Nashik" className="field-input" />
                </label>
                <label className="block text-[11px] font-extrabold uppercase tracking-wide text-slate-500 sm:col-span-2">Requirements
                  <textarea rows={4} maxLength={800} value={v.requirements} onChange={e => set('requirements', e.target.value)} placeholder="Tell us about your expected monthly usage or specific fleet needs…" className="field-input resize-y py-3" />
                </label>
                <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden"><label>Website<input tabIndex={-1} autoComplete="off" value={v.website} onChange={e => set('website', e.target.value)} /></label></div>
                <button type="submit" disabled={state === 'sending'} className="mt-1 flex min-h-[52px] items-center justify-center rounded-xl bg-[#f04e00] px-5 text-base font-black text-white transition hover:bg-[#d84500] disabled:cursor-wait disabled:opacity-70 sm:col-span-2">
                  {state === 'sending' ? 'Sending…' : 'Get a Customised Quote'}
                </button>
              </form>
            )}
          </div>
        </div>
      </dialog>
    </>
  );
}
