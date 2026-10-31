'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ChevronDown, Menu, Phone, X } from 'lucide-react';
import { formatPhone, site } from '@/lib/site';

const links = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about-us' },
  { label: 'Contact Us', href: '/contact-us' },
  { label: 'Blogs', href: '/blogs' },
];
const services = [
  { label: 'Corporate Cabs', href: '/corporate-cabs' },
  { label: 'Outstation Cabs', href: '/outstation-cab-service' },
  { label: 'Airport Taxi', href: '/airport-taxi' },
  { label: 'Local Cabs', href: '/local-cab-service' },
];

export default function Header() {
  const path = usePathname();
  const [menu, setMenu] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [mobileServices, setMobileServices] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  const active = (href: string) => (href === '/' ? path === '/' : path === href || path.startsWith(href + '/'));
  const servicesActive = services.some(s => active(s.href));

  useEffect(() => { setMenu(false); setDropdown(false); }, [path]);
  useEffect(() => {
    const out = (e: PointerEvent) => { if (!box.current?.contains(e.target as Node)) setDropdown(false); };
    const esc = (e: KeyboardEvent) => { if (e.key === 'Escape') { setDropdown(false); setMenu(false); } };
    document.addEventListener('pointerdown', out);
    document.addEventListener('keydown', esc);
    return () => { document.removeEventListener('pointerdown', out); document.removeEventListener('keydown', esc); };
  }, []);

  const cls = (on: boolean) => `rounded-lg px-3 py-2 text-[13px] font-semibold transition hover:text-amber-300 ${on ? 'text-amber-300' : 'text-white/90'}`;

  return (
    <header className="absolute inset-x-0 top-0 z-30 border-b border-white/15 text-white">
      <div className="container-wide flex min-h-[70px] items-center justify-between gap-3 py-2.5 sm:min-h-[82px] sm:py-3">
        <Link href="/" aria-label="Vistar Cabs home" className="shrink-0 rounded-xl bg-white px-2.5 py-1.5 shadow-sm">
          <Image src="/brand/vistar-cabs-logo.webp" alt="Vistar Cabs" width={170} height={36} priority className="h-7 w-auto object-contain sm:h-9" />
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center gap-1 lg:flex">
          {links.map(l => <Link key={l.href} href={l.href} aria-current={active(l.href) ? 'page' : undefined} className={cls(active(l.href))}>{l.label}</Link>)}
          <div ref={box} className="relative" onMouseEnter={() => setDropdown(true)} onMouseLeave={() => setDropdown(false)}>
            <button type="button" aria-haspopup="menu" aria-expanded={dropdown} onClick={() => setDropdown(o => !o)} className={`${cls(servicesActive)} inline-flex items-center gap-1`}>
              Services <ChevronDown size={14} className={`transition ${dropdown ? 'rotate-180' : ''}`} aria-hidden="true" />
            </button>
            {dropdown && (
              <div role="menu" className="absolute left-0 top-full z-40 w-56 pt-2">
                <div className="overflow-hidden rounded-xl bg-white py-1.5 text-slate-800 shadow-2xl ring-1 ring-black/5">
                  {services.map(s => <Link key={s.href} role="menuitem" href={s.href} className="block px-4 py-2.5 text-sm font-semibold hover:bg-[#e7f5ff] hover:text-[#0758c9]">{s.label}</Link>)}
                </div>
              </div>
            )}
          </div>
        </nav>

        <div className="flex items-center gap-2">
          {site.phone && (
            <a href={`tel:${site.phone}`} aria-label={`Call Vistar Cabs on ${site.phone}`} className="hidden items-center gap-2 rounded-full border border-white/30 px-3.5 py-2.5 text-xs font-bold hover:bg-white/10 xl:flex">
              <Phone size={14} aria-hidden="true" />{formatPhone(site.phone)}
            </a>
          )}
          <Link href="/#book" className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-amber-400 px-3.5 py-3 text-xs font-extrabold text-slate-950 transition hover:bg-amber-300 sm:px-4">Quick Enquiry <ArrowUpRight size={15} aria-hidden="true" /></Link>
          <button type="button" aria-label={menu ? 'Close menu' : 'Open menu'} aria-expanded={menu} onClick={() => setMenu(o => !o)} className="grid h-11 w-11 place-items-center rounded-full border border-white/30 lg:hidden">{menu ? <X size={20} /> : <Menu size={20} />}</button>
        </div>
      </div>

      {menu && (
        <nav aria-label="Mobile navigation" className="max-h-[80dvh] overflow-y-auto border-t border-white/15 bg-[#06377f] px-4 py-3 shadow-xl lg:hidden">
          <div className="container-wide grid gap-1">
            {links.map(l => <Link key={l.href} href={l.href} className={`rounded-lg px-3 py-3.5 text-base font-semibold hover:bg-white/10 ${active(l.href) ? 'text-amber-300' : 'text-white'}`}>{l.label}</Link>)}
            <button type="button" aria-expanded={mobileServices} onClick={() => setMobileServices(o => !o)} className="flex items-center justify-between rounded-lg px-3 py-3.5 text-left text-base font-semibold text-white hover:bg-white/10">
              Services <ChevronDown size={18} className={`transition ${mobileServices ? 'rotate-180' : ''}`} aria-hidden="true" />
            </button>
            {mobileServices && <div className="mb-1 grid gap-1 border-l border-white/20 pl-3">{services.map(s => <Link key={s.href} href={s.href} className="rounded-lg px-3 py-3 text-[15px] font-medium text-white/90 hover:bg-white/10">{s.label}</Link>)}</div>}
            {site.phone && <a href={`tel:${site.phone}`} className="mt-1 rounded-lg px-3 py-3.5 text-base font-semibold text-amber-200">Call {formatPhone(site.phone)}</a>}
          </div>
        </nav>
      )}
    </header>
  );
}
