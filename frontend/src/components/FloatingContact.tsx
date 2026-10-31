import { MessageCircle, Phone } from 'lucide-react';
import { site } from '@/lib/site';

export default function FloatingContact(){return <nav aria-label="Contact Vistar Cabs" className="fixed inset-x-3 bottom-3 z-40 flex items-end justify-between pb-[env(safe-area-inset-bottom)] sm:inset-x-5 sm:bottom-5">{site.whatsapp?<a aria-label="WhatsApp Vistar Cabs" title="Chat on WhatsApp" href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noreferrer" className="floating-contact-link grid h-14 w-14 place-items-center rounded-full bg-[#20b86a] text-white shadow-xl sm:h-16 sm:w-16"><MessageCircle size={25}/></a>:<span/>}{site.phone&&<a aria-label="Call Vistar Cabs" title="Call Vistar Cabs" href={`tel:${site.phone}`} className="floating-contact-link grid h-14 w-14 place-items-center rounded-full bg-[#ff7a00] text-white shadow-xl sm:h-16 sm:w-16"><Phone size={23}/></a>}</nav>}

