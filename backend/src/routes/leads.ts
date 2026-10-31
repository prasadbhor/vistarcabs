import { Router } from 'express';
import { z } from 'zod';
import { appendFile, mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import mongoose from 'mongoose';
import Lead from '../models/Lead';
import { buildContactMessage, buildCorporateMessage, notifyOwnerText } from '../services/notify';

const router = Router();
const phone = z.string().trim().min(8).max(20).regex(/^[0-9+()\-\s]+$/).refine(v => v.replace(/\D/g, '').length >= 8, { message: 'Enter a valid phone number.' });
// Hidden "website" field: real visitors never fill it, many bots do.
const honeypot = z.string().max(200).optional().default('');

const corporateSchema = z.object({
  contactPerson: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(120),
  phone,
  city: z.string().trim().min(2).max(80),
  requirements: z.string().trim().max(800).optional().default(''),
  website: honeypot,
});
const contactSchema = z.object({
  name: z.string().trim().min(2).max(80),
  phone,
  email: z.union([z.literal(''), z.string().trim().email().max(120)]).optional().default(''),
  message: z.string().trim().min(5).max(800),
  website: honeypot,
});

async function store(kind: 'corporate' | 'contact', data: Record<string, unknown>): Promise<string | null> {
  if (mongoose.connection.readyState === 1) { await Lead.create({ kind, data }); return 'mongodb'; }
  if (process.env.NODE_ENV !== 'production') {
    const file = process.env.LEAD_STORE_PATH || resolve(__dirname, '../../data/leads.jsonl');
    await mkdir(dirname(file), { recursive: true });
    await appendFile(file, `${JSON.stringify({ kind, ...data, createdAt: new Date().toISOString(), status: 'new' })}\n`, { encoding: 'utf8', mode: 0o600 });
    return 'local-development-file';
  }
  return null;
}

function handler<T extends { website: string }>(kind: 'corporate' | 'contact', schema: z.ZodType<T, z.ZodTypeDef, unknown>, text: (d: T) => string) {
  return router.post(kind === 'corporate' ? '/corporate-inquiries' : '/contact-messages', async (req, res, next) => {
    try {
      const parsed = schema.safeParse(req.body);
      if (!parsed.success) { res.status(400).json({ ok: false, message: 'Please check the details you entered.', errors: (parsed.error as z.ZodError).flatten().fieldErrors }); return; }
      const { website, ...data } = parsed.data;
      if (website) { res.status(201).json({ ok: true, notified: false, message: 'Received.' }); return; }
      const storage = await store(kind, data as Record<string, unknown>);
      const sent = await notifyOwnerText(text(parsed.data));
      if (!storage && !sent.any) { res.status(503).json({ ok: false, message: 'We could not save this right now. Please call or WhatsApp us.' }); return; }
      res.status(201).json({ ok: true, storage, notified: sent.any, message: 'Received.' });
    } catch (error) { next(error); }
  });
}

handler('corporate', corporateSchema, d => buildCorporateMessage(d as never));
handler('contact', contactSchema, d => buildContactMessage(d as never));

export default router;
