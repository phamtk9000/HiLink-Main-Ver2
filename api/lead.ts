// POST /api/lead — every enquiry form on the site lands here and is sent on
// as an email through Resend (https://resend.com).
//
// Environment (Vercel → Project → Settings → Environment Variables):
//   RESEND_API_KEY  required. Without it the endpoint answers 503 and the
//                   forms tell the visitor to email or call instead.
//   LEAD_TO         where enquiries go; comma-separated. Default contact@hilink.vn.
//   LEAD_FROM       sender. Must be on a domain verified in Resend, e.g.
//                   "HiLink Website <web@hilink.vn>". Until a domain is
//                   verified, Resend only delivers mail from onboarding@resend.dev
//                   to the Resend account's own address.
//
// Spam: a hidden "website" field that people never fill; when it is filled
// the request is answered as if it worked and nothing is sent.

declare const process: { env: Record<string, string | undefined> };

const KINDS: Record<string, string> = {
  contact: 'Contact form',
  consultation: 'Consultation request',
  rental: 'Property rental estimate',
  concierge: 'Concierge membership',
};

const MAX_FIELD = 5000;
const MAX_ATTACHMENT = 3 * 1024 * 1024; // bytes, before base64

type Lead = {
  kind?: string;
  fields?: Record<string, unknown>;
  website?: string;
  page?: string;
  lang?: string;
  attachment?: { filename?: string; type?: string; content?: string };
};

const json = (status: number, body: unknown) =>
  new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json' } });

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

export async function POST(request: Request) {
  const key = process.env.RESEND_API_KEY;
  if (!key) return json(503, { error: 'not_configured' });

  let lead: Lead;
  try {
    lead = await request.json();
  } catch {
    return json(400, { error: 'bad_json' });
  }
  if (lead.website) return json(200, { ok: true });

  const label = KINDS[lead.kind ?? ''];
  if (!label || !lead.fields || typeof lead.fields !== 'object') return json(400, { error: 'bad_request' });

  const rows = Object.entries(lead.fields)
    .slice(0, 20)
    .map(([k, v]) => [k.slice(0, 60), String(v ?? '').trim().slice(0, MAX_FIELD)] as const)
    .filter(([, v]) => v);
  const get = (k: string) => rows.find(([name]) => name.toLowerCase() === k)?.[1] ?? '';
  const name = get('name');
  const email = get('email');
  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return json(422, { error: 'missing_fields' });

  const attachments: { filename: string; content: string }[] = [];
  const a = lead.attachment;
  if (a?.content && a.filename && /^image\//.test(a.type ?? '')) {
    if ((a.content.length * 3) / 4 > MAX_ATTACHMENT) return json(413, { error: 'attachment_too_large' });
    attachments.push({ filename: a.filename.slice(0, 120), content: a.content });
  }

  const meta = [['Page', lead.page ?? ''], ['Language', lead.lang ?? '']].filter(([, v]) => v) as [string, string][];
  const all = [...rows, ...meta];
  const html = `<h2 style="font-family:sans-serif">${esc(label)}</h2><table style="font-family:sans-serif;border-collapse:collapse">${all
    .map(([k, v]) => `<tr><td style="padding:6px 16px 6px 0;color:#6B645D;vertical-align:top">${esc(k)}</td><td style="padding:6px 0;white-space:pre-wrap">${esc(v)}</td></tr>`)
    .join('')}</table>`;
  const text = `${label}\n\n${all.map(([k, v]) => `${k}: ${v}`).join('\n')}`;

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: process.env.LEAD_FROM || 'HiLink Website <onboarding@resend.dev>',
      to: (process.env.LEAD_TO || 'contact@hilink.vn').split(',').map((s) => s.trim()).filter(Boolean),
      reply_to: email,
      subject: `[${label}] ${name}`,
      html,
      text,
      ...(attachments.length ? { attachments } : {}),
    }),
  });
  if (!res.ok) {
    console.error('resend', res.status, await res.text().catch(() => ''));
    return json(502, { error: 'send_failed' });
  }
  return json(200, { ok: true });
}
