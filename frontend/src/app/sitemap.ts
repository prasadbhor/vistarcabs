import type { MetadataRoute } from 'next';
import { airports, cities, destinationGuides, places, routes, site } from '@/lib/site';
import { posts } from '@/lib/blogs';
export default function sitemap(): MetadataRoute.Sitemap {
 const base = site.url.replace(/\/$/, '');
 const staticPaths = ['', '/about-us', '/about-nashik', '/outstation-cab-service', '/airport-taxi', '/local-cab-service', '/corporate-cabs', '/contact-us', '/blogs', '/faq', '/kumbh-mela-nashik'];
 const cityPaths = cities.map(c => `/cities/${c.slug}`);
 const placePaths = places.map(p=>`/cities/nashik/${p.slug}`);
 const destinationPaths = destinationGuides.map(p=>`/cities/${p.citySlug}/${p.slug}`);
 const routePaths = routes.map(r=>`/${r.slug}`);
 const airportPaths = airports.map(a=>`/airports/${a.slug}`);
 const blogPaths = posts.map(p=>`/blogs/${p.slug}`);
 return [...new Set([...staticPaths,...cityPaths,...placePaths,...destinationPaths,...routePaths,...airportPaths,...blogPaths])].map(path=>({url:`${base}${path || '/'}`,lastModified:new Date(),changeFrequency:path===''?'weekly':'monthly',priority:path===''?1:path.includes('to-')||path.startsWith('/airports/')?0.8:0.65}));
}
