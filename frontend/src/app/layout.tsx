import type { Metadata } from 'next';
import './globals.css';
import { site } from '@/lib/site';
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: 'Vista Cabs | Cab Service in Nashik & Maharashtra', template: '%s | Vista Cabs' },
  description: site.description,
  applicationName: site.name,
  alternates: { canonical: '/' },
  openGraph: { type: 'website', siteName: site.name, title: 'Vista Cabs | Your journey, our priority', description: site.description, url: site.url },
  robots: { index: true, follow: true },
};
export default function RootLayout({ children }: Readonly<{children: React.ReactNode}>) { return <html lang="en"><body>{children}</body></html>; }
