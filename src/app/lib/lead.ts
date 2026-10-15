// Sends an enquiry to /api/lead (api/lead.ts), which emails it to HiLink.
// Throws when it did not go through, so a form never shows "sent" for a
// message nobody received; the form then points the visitor to email/phone.
import { CONTACT } from '../data/site';

export type LeadKind = 'contact' | 'consultation' | 'rental' | 'concierge';

// The hidden anti-spam field. Its name means nothing to a browser, so autofill
// leaves it empty. One called "website" could be filled with a saved URL; the
// endpoint would then take the visitor for a bot, answer "sent" and send nothing.
const TRAP = 'hl_ref_code';

/** Value of the hidden anti-spam field, if a bot filled it. */
export const honeypot = (form: HTMLFormElement | null | undefined) =>
  (form?.elements.namedItem(TRAP) as HTMLInputElement | null)?.value ?? '';

const toBase64 = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(String(r.result).split(',')[1] ?? '');
    r.onerror = () => reject(r.error);
    r.readAsDataURL(file);
  });

export async function sendLead(kind: LeadKind, fields: Record<string, string>, opts: { website?: string; lang?: string; file?: File | null } = {}) {
  const attachment = opts.file && opts.file.size <= 3 * 1024 * 1024
    ? { filename: opts.file.name, type: opts.file.type, content: await toBase64(opts.file) }
    : undefined;
  const res = await fetch('/api/lead', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ kind, fields, website: opts.website ?? '', page: location.href, lang: opts.lang, attachment }),
  });
  // Only a JSON {ok: true} from the endpoint counts — not, say, the site's
  // index.html served for a missing /api route.
  const body = res.ok ? await res.json().catch(() => null) : null;
  if (!body?.ok) throw new Error(`lead ${res.status}`);
}

/** What a form says when sending failed. */
export const leadError = (lang: 'en' | 'vi') =>
  lang === 'vi'
    ? `Chưa gửi được. Vui lòng email ${CONTACT.email} hoặc gọi ${CONTACT.phone}.`
    : `We couldn't send this. Please email ${CONTACT.email} or call ${CONTACT.phone}.`;

/** Hidden field people never see or fill; bots usually do. */
export const HONEYPOT_PROPS = {
  type: 'text',
  name: TRAP,
  tabIndex: -1,
  autoComplete: 'off',
  'data-1p-ignore': true,
  'data-lpignore': 'true',
  'aria-hidden': true,
  className: 'absolute -left-[9999px] h-0 w-0 opacity-0',
} as const;
