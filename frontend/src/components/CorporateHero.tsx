import Image from 'next/image';
import { Building2, CarFront, Clock3, Handshake, Sparkles } from 'lucide-react';
import { pickImage } from '@/lib/images';
import CorporateEnquiryButton from '@/components/CorporateEnquiry';

const features = [
  { icon: Clock3, label: 'Punctual pickups' },
  { icon: CarFront, label: 'Clean, well-maintained cars' },
  { icon: Handshake, label: 'Courteous drivers' },
  { icon: Building2, label: 'Plans for regular usage' },
];

/** Corporate mobility card used on the homepage and at the top of the corporate cabs page. */
export default function CorporateHero({ asHeading = false }: { asHeading?: boolean }) {
  const Title = asHeading ? 'h1' : 'h2';
  return (
    <div className="grid items-center gap-6 rounded-[28px] border border-blue-100 bg-[#eef5ff] p-4 sm:gap-8 sm:p-8 lg:grid-cols-2">
      <div className="relative min-h-[240px] overflow-hidden rounded-2xl shadow-lg sm:min-h-[340px]">
        <Image src={pickImage('services/corporate-cab-service', '/images/airport-pickup.webp')} alt="Vistar Cabs car ready for a corporate pickup" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
        <span className="absolute bottom-4 left-4 rounded-full bg-white/90 px-3.5 py-1.5 text-xs font-bold text-slate-700 shadow">Corporate Travel Experts</span>
      </div>
      <div>
        <span className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3.5 py-1.5 text-xs font-bold text-blue-700"><Building2 size={14} aria-hidden="true" /> Corporate Mobility Solution</span>
        <Title className="mt-4 text-2xl font-black leading-tight tracking-tight text-slate-900 sm:text-4xl">Smarter Corporate Mobility Starts with <span className="text-blue-600">Vistar Cabs</span></Title>
        <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">Vistar Cabs for business offers reliable cabs for employee travel, airport transfers, client visits and outstation business trips, planned around your schedule and backed by a team you can call.</p>
        <ul className="mt-5 grid grid-cols-1 gap-3 text-sm font-semibold text-slate-700 sm:grid-cols-2">
          {features.map(({ icon: Icon, label }) => <li key={label} className="flex items-center gap-2.5"><Icon size={18} className="shrink-0 text-blue-600" aria-hidden="true" />{label}</li>)}
        </ul>
        <div className="mt-6"><CorporateEnquiryButton /></div>
      </div>
    </div>
  );
}
