import Link from 'next/link';
import Image from 'next/image';
import { Mail, MapPin, Phone } from 'lucide-react';
import { formatPhone, site } from '@/lib/site';
import { InstagramIcon, LinkedInIcon } from '@/components/SocialIcons';

const serviceChips = [
  { label: 'Airport', href: '/airport-taxi' },
  { label: 'Local', href: '/local-cab-service' },
  { label: 'One Way Cab', href: '/outstation-cab-service' },
  { label: 'Round Trip Cab', href: '/outstation-cab-service' },
  { label: 'Outstation', href: '/outstation-cab-service' },
  { label: 'Corporate Cabs', href: '/corporate-cabs' },
  { label: 'Kumbh Mela 2026-2028', href: '/kumbh-mela-nashik' },
];
const company = [{ label: 'About Us', href: '/about-us' }, { label: 'Contact Us', href: '/contact-us' }, { label: 'Blogs', href: '/blogs' }, { label: 'Corporate Cabs', href: '/corporate-cabs' }];
const useful = [{ label: 'Home', href: '/' }, { label: 'Book a cab', href: '/#book' }, { label: 'Cities', href: '/#cities' }, { label: 'Airports', href: '/#airports' }, { label: 'FAQs', href: '/faq' }, { label: 'Kumbh Mela', href: '/kumbh-mela-nashik' }];

export default function SiteFooter() {
  const socials = [
    { label: 'Follow Vistar Cabs on Instagram', href: site.instagram, icon: <InstagramIcon /> },
    { label: 'Vistar Cabs on LinkedIn', href: site.linkedin, icon: <LinkedInIcon /> },
  ].filter(s => s.href);

  return (
    <footer id="contact" className="bg-[#0b1a33] pb-28 pt-12 text-white sm:pb-24">
      <div className="container-wide">
        <div className="grid gap-8 border-b border-white/10 pb-8 lg:grid-cols-2">
          <div>
            <h2 className="flex items-center gap-4 text-[11px] font-black uppercase tracking-[.2em] text-slate-300"><span>Available in states</span><span className="h-px flex-1 bg-white/10" /></h2>
            <div className="mt-3 flex flex-wrap gap-2"><span className="rounded-md border border-white/20 px-2.5 py-1 text-[11px] text-slate-200">Maharashtra</span></div>
          </div>
          <div>
            <h2 className="flex items-center gap-4 text-[11px] font-black uppercase tracking-[.2em] text-slate-300"><span>Available services</span><span className="h-px flex-1 bg-white/10" /></h2>
            <div className="mt-3 flex flex-wrap gap-2">{serviceChips.map(c => <Link key={c.label} href={c.href} className="rounded-md border border-white/20 px-2.5 py-1 text-[11px] text-slate-200 transition hover:border-amber-300 hover:text-amber-300">{c.label}</Link>)}</div>
          </div>
        </div>

        <div className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_.8fr_.8fr_1fr]">
          <div>
            <Link href="/" aria-label="Vistar Cabs home" className="inline-block rounded-xl bg-white px-3 py-2"><Image src="/brand/vistar-cabs-logo.webp" alt="Vistar Cabs" width={176} height={37} className="h-9 w-auto object-contain" /></Link>
            <ul className="mt-5 grid gap-3 text-sm text-slate-300">
              {site.phones.map(p => <li key={p}><a href={`tel:${p}`} className="flex items-center gap-2.5 hover:text-white"><Phone size={15} className="text-orange-400" aria-hidden="true" />{formatPhone(p)}</a></li>)}
              <li><a href={`mailto:${site.email}`} className="flex items-center gap-2.5 hover:text-white"><Mail size={15} className="text-orange-400" aria-hidden="true" />{site.email}</a></li>
              <li className="flex items-start gap-2.5"><MapPin size={15} className="mt-0.5 shrink-0 text-orange-400" aria-hidden="true" /><span className="leading-6">{site.address}</span></li>
            </ul>
          </div>
          <nav aria-label="Company"><h2 className="text-base font-extrabold">Company</h2><ul className="mt-4 grid gap-3 text-sm text-slate-300">{company.map(l => <li key={l.label}><Link href={l.href} className="hover:text-white">{l.label}</Link></li>)}</ul></nav>
          <nav aria-label="Useful links"><h2 className="text-base font-extrabold">Useful Links</h2><ul className="mt-4 grid gap-3 text-sm text-slate-300">{useful.map(l => <li key={l.label}><Link href={l.href} className="hover:text-white">{l.label}</Link></li>)}</ul></nav>
          <div>
            <h2 className="text-base font-extrabold">Follow us</h2>
            <div className="mt-4 flex gap-3">{socials.map(s => <a key={s.href} href={s.href} target="_blank" rel="noreferrer noopener" aria-label={s.label} className="grid h-11 w-11 place-items-center rounded-full bg-white text-[#0b1a33] transition hover:bg-amber-300">{s.icon}</a>)}</div>
            <p className="mt-4 text-xs leading-5 text-slate-400">Send your trip details and the team will call you back to confirm the vehicle and fare.</p>
          </div>
        </div>

        <p className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-slate-400">© {new Date().getFullYear()} Vistar Cabs. All rights reserved.</p>
      </div>
    </footer>
  );
}
