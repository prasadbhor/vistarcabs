import { existsSync } from 'node:fs';
import path from 'node:path';

const EXTENSIONS = ['webp', 'jpg', 'jpeg', 'png', 'avif'];

/**
 * Returns /images/<name>.<ext> if that photo has been added to public/images,
 * otherwise the fallback. Checked when the site is built, so rebuild after adding photos.
 */
export function pickImage(name: string, fallback: string): string {
  if (!name) return fallback;
  for (const ext of EXTENSIONS) {
    if (existsSync(path.join(process.cwd(), 'public', 'images', `${name}.${ext}`))) return `/images/${name}.${ext}`;
  }
  return fallback;
}

/** "Chhatrapati Sambhajinagar" -> "sambhajinagar", "Pune" -> "pune". */
export function citySlugFor(name: string): string {
  const n = name.toLowerCase();
  return n.includes('sambhajinagar') ? 'sambhajinagar' : n.split(/[ ,]/)[0];
}
