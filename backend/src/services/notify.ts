/**
 * Sends a new enquiry to the owner by SMS and WhatsApp.
 *
 * Uses Twilio's REST API (one account covers both channels). Nothing is sent
 * until the credentials below are set in backend/.env, and a failure here never
 * blocks the visitor's enquiry from being saved.
 */
export type EnquiryData = {
  name: string; phone: string; tripType: string; from: string; to: string;
  pickupDate: string; pickupTime: string; returnDate: string; duration: string;
  airportDirection: string; passengers?: number; notes: string;
};

export type NotifyResult = { sms: boolean; whatsapp: boolean; any: boolean };

const clean = (s: string) => s.replace(/[\r\n]+/g, ' ').trim();

export function buildMessage(d: EnquiryData, compact = false): string {
  const route = d.tripType === 'Local Trip' ? clean(d.from) : `${clean(d.from)} to ${clean(d.to)}`;
  const lines = [
    'New Vistar Cabs enquiry',
    `Name: ${clean(d.name)}`,
    `Phone: ${clean(d.phone)}`,
    `Trip: ${d.tripType}`,
    `Route: ${route}`,
    `Pickup: ${d.pickupDate} ${d.pickupTime}`,
    ...(d.returnDate ? [`Return: ${d.returnDate}`] : []),
    ...(d.duration ? [`Duration: ${d.duration}`] : []),
    ...(d.airportDirection ? [`Airport: ${d.airportDirection}`] : []),
    ...(d.passengers ? [`Passengers: ${d.passengers}`] : []),
    ...(d.notes && !compact ? [`Notes: ${clean(d.notes)}`] : []),
  ];
  return lines.join('\n');
}

async function sendTwilio(to: string, from: string, body: string): Promise<boolean> {
  const sid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  if (!sid || !token) return false;
  try {
    const res = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${Buffer.from(`${sid}:${token}`).toString('base64')}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({ To: to, From: from, Body: body }).toString(),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) console.error('Owner notification failed:', res.status, (await res.text()).slice(0, 300));
    return res.ok;
  } catch (error) {
    console.error('Owner notification error:', error);
    return false;
  }
}

export async function notifyOwner(d: EnquiryData): Promise<NotifyResult> {
  const smsTo = process.env.OWNER_SMS_TO;
  const smsFrom = process.env.TWILIO_SMS_FROM;
  const waTo = process.env.OWNER_WHATSAPP_TO;
  const waFrom = process.env.TWILIO_WHATSAPP_FROM;

  const [sms, whatsapp] = await Promise.all([
    smsTo && smsFrom ? sendTwilio(smsTo, smsFrom, buildMessage(d, true)) : Promise.resolve(false),
    waTo && waFrom
      ? sendTwilio(`whatsapp:${waTo.replace(/^whatsapp:/, '')}`, waFrom.startsWith('whatsapp:') ? waFrom : `whatsapp:${waFrom}`, buildMessage(d))
      : Promise.resolve(false),
  ]);
  return { sms, whatsapp, any: sms || whatsapp };
}
