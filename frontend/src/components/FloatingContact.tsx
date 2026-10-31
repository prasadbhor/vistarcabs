import { Phone } from 'lucide-react';
import { site } from '@/lib/site';
import WhatsAppIcon from '@/components/WhatsAppIcon';

/** WhatsApp bottom-left, Call bottom-right, on every page. */
export default function FloatingContact() {
  const wa = site.whatsapp
    ? `https://wa.me/${site.whatsapp}?text=${encodeURIComponent('Hello Vistar Cabs, I would like to enquire about a cab.')}`
    : '';
  return (
    <nav aria-label="Contact Vistar Cabs" className="pointer-events-none fixed inset-x-3 bottom-3 z-40 flex items-end justify-between pb-[env(safe-area-inset-bottom)] sm:inset-x-5 sm:bottom-5">
      {wa ? (
        <a aria-label="Chat with Vistar Cabs on WhatsApp" title="Chat on WhatsApp" href={wa} target="_blank" rel="noreferrer"
          className="floating-contact-link pointer-events-auto grid h-14 w-14 place-items-center rounded-full bg-[#25d366] text-white shadow-xl sm:h-16 sm:w-16">
          <WhatsAppIcon size={30} />
        </a>
      ) : <span />}
      {site.phone && (
        <a aria-label={`Call Vistar Cabs on ${site.phone}`} title="Call Vistar Cabs" href={`tel:${site.phone}`}
          className="floating-contact-link pointer-events-auto grid h-14 w-14 place-items-center rounded-full bg-[#ff7a00] text-white shadow-xl sm:h-16 sm:w-16">
          <Phone size={26} aria-hidden="true" />
        </a>
      )}
    </nav>
  );
}
