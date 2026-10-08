// Sends a form to /api/lead (see api/lead.js). Same payload as the lead API on
// hilink.vn, so both sites can feed the same webhook or inbox.

export interface Lead {
  formType: string;
  source?: string;
  name: string;
  company?: string;
  email: string;
  phone?: string;
  interest?: string;
  message?: string;
  location?: string;
  tourDate?: string;
  lang: string;
  /** Honeypot — real visitors never see or fill this field. */
  website?: string;
}

export class LeadError extends Error {
  field?: string;
  constructor(message: string, field?: string) {
    super(message);
    this.field = field;
  }
}

export async function submitLead(lead: Lead): Promise<void> {
  let res: Response;
  try {
    res = await fetch('/api/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(lead),
    });
  } catch {
    throw new LeadError('network');
  }
  let body: { ok?: boolean; delivered?: boolean; field?: string; error?: string } = {};
  try { body = await res.json(); } catch { /* non-JSON reply, e.g. no API in local dev */ }
  if (!res.ok || !body.ok) throw new LeadError(body.error || `HTTP ${res.status}`, body.field);
  // ok but not delivered means no destination is configured on the server —
  // treat it as a failure so the visitor is told to email instead.
  if (body.delivered === false) throw new LeadError('not-delivered');
}
