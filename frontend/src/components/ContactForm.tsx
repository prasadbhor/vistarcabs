'use client';
import { useState } from 'react';
import { CheckCircle2, Send } from 'lucide-react';
import { site } from '@/lib/site';
import WhatsAppIcon from '@/components/WhatsAppIcon';

type State = 'idle' | 'sending' | 'sent' | 'saved' | 'failed';

export default function ContactForm() {
  const [v, setV] = useState({ name: '', phone: '', email: '', message: '', website: '' });
  const [state, setState] = useState<State>('idle');
  const set = (k: keyof typeof v, value: string) => setV(o => ({ ...o, [k]: value }));
  const wa = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(`Hello Vistar Cabs, this is ${v.name}. ${v.message}\nMy number: ${v.phone}`)}`;

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState('sending');
    try {
      const res = await fetch(`${site.apiUrl}/api/contact-messages`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(v) });
      const body = await res.json().catch(() => null);
      if (!res.ok) throw new Error(body?.message || 'failed');
      setState(body?.notified ? 'sent' : 'saved');
    } catch { setState('failed'); }
  }

  if (state !== 'idle' && state !== 'sending') {
    return (
      <div role="status" aria-live="polite" className="rounded-2xl bg-emerald-50 p-5 text-sm leading-6 text-emerald-900">
        <p className="flex items-center gap-2 font-extrabold"><CheckCircle2 size={18} aria-hidden="true" />{state === 'failed' ? 'Message not sent' : 'Thank you, we have your message'}</p>
        <p className="mt-1">{state === 'sent' ? 'The VistarCabs team will get back to you shortly.' : state === 'saved' ? 'We have saved your message. For a faster reply you can also message us on WhatsApp.' : 'We could not reach the message service. Please send it on WhatsApp or call us.'}</p>
        {state !== 'sent' && <a href={wa} target="_blank" rel="noreferrer" className="mt-3 inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#25d366] px-4 text-sm font-extrabold text-white"><WhatsAppIcon size={20} /> Message on WhatsApp</a>}
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="grid gap-4">
      <label className="block text-xs font-extrabold text-slate-600">Full name *
        <input required minLength={2} maxLength={80} autoComplete="name" value={v.name} onChange={e => set('name', e.target.value)} className="field-input" />
      </label>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-xs font-extrabold text-slate-600">Mobile number *
          <input required type="tel" inputMode="tel" minLength={8} maxLength={20} pattern="[0-9+()\- ]{8,20}" title="Enter a valid mobile number" autoComplete="tel" value={v.phone} onChange={e => set('phone', e.target.value)} className="field-input" />
        </label>
        <label className="block text-xs font-extrabold text-slate-600">Email <span className="font-medium text-slate-400">(optional)</span>
          <input type="email" inputMode="email" maxLength={120} autoComplete="email" value={v.email} onChange={e => set('email', e.target.value)} className="field-input" />
        </label>
      </div>
      <label className="block text-xs font-extrabold text-slate-600">How can we help? *
        <textarea required minLength={5} maxLength={800} rows={5} value={v.message} onChange={e => set('message', e.target.value)} className="field-input resize-y py-3" />
      </label>
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden"><label>Website<input tabIndex={-1} autoComplete="off" value={v.website} onChange={e => set('website', e.target.value)} /></label></div>
      <button type="submit" disabled={state === 'sending'} className="flex min-h-[52px] items-center justify-center gap-2 rounded-xl bg-[#ff7a00] px-5 text-base font-black text-white transition hover:bg-[#e66e00] disabled:cursor-wait disabled:opacity-70">
        {state === 'sending' ? 'Sending…' : <>Submit <Send size={16} aria-hidden="true" /></>}
      </button>
    </form>
  );
}
