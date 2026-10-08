// Vercel serverless function: receives the site's enquiry forms.
//
// Same contract as POST /api/lead on hilink.vn. The lead is forwarded to one
// of two destinations, chosen by environment variables:
//   LEAD_WEBHOOK_URL                                — any HTTPS webhook (CRM, Zapier, Make, Slack)
//   RESEND_API_KEY + LEAD_TO_EMAIL + LEAD_FROM_EMAIL — email through Resend
// With neither set the function answers { ok: true, delivered: false } and the
// form tells the visitor to email instead, so a lead is never silently lost.

const FIELD_LIMIT = 2000;
const EMAIL_RE = /^\S+@\S+\.\S+$/;

const clean = (v) =>
  typeof v === "string" ? v.trim().slice(0, FIELD_LIMIT) : v == null ? "" : String(v).slice(0, FIELD_LIMIT);

const escapeHtml = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

async function forwardToWebhook(url, lead) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(lead),
  });
  if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
}

async function forwardByEmail(lead) {
  const rows = Object.entries(lead)
    .filter(([, v]) => v !== "" && v != null)
    .map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0;color:#666">${escapeHtml(k)}</td><td style="padding:4px 0"><strong>${escapeHtml(v)}</strong></td></tr>`)
    .join("");
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${process.env.RESEND_API_KEY}` },
    body: JSON.stringify({
      from: process.env.LEAD_FROM_EMAIL,
      to: [process.env.LEAD_TO_EMAIL],
      reply_to: lead.email || undefined,
      subject: `HiLink enquiry — ${lead.formType}${lead.name ? ` — ${lead.name}` : ""}`,
      html: `<h2 style="font-family:system-ui">New enquiry from the HiLink website</h2>
             <table style="font-family:system-ui;font-size:14px;border-collapse:collapse">${rows}</table>`,
    }),
  });
  if (!res.ok) throw new Error(`Resend responded ${res.status}`);
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  let body = req.body;
  if (typeof body === "string") {
    try { body = JSON.parse(body); } catch { return res.status(400).json({ ok: false, error: "Invalid JSON" }); }
  }
  if (!body || typeof body !== "object") return res.status(400).json({ ok: false, error: "Missing body" });

  // Honeypot filled in: answer like a success so the bot learns nothing.
  if (clean(body.website)) return res.status(200).json({ ok: true, delivered: true });

  if (!clean(body.name)) return res.status(400).json({ ok: false, field: "name", error: "Name is required" });
  if (!EMAIL_RE.test(clean(body.email))) {
    return res.status(400).json({ ok: false, field: "email", error: "A valid email address is required" });
  }

  const lead = {
    formType: clean(body.formType) || "general",
    source: clean(body.source),
    name: clean(body.name),
    company: clean(body.company),
    email: clean(body.email),
    phone: clean(body.phone),
    interest: clean(body.interest),
    message: clean(body.message),
    location: clean(body.location),
    tourDate: clean(body.tourDate),
    lang: clean(body.lang),
    submittedAt: new Date().toISOString(),
  };

  try {
    if (process.env.LEAD_WEBHOOK_URL) {
      await forwardToWebhook(process.env.LEAD_WEBHOOK_URL, lead);
      return res.status(200).json({ ok: true, delivered: true, via: "webhook" });
    }
    if (process.env.RESEND_API_KEY && process.env.LEAD_TO_EMAIL && process.env.LEAD_FROM_EMAIL) {
      await forwardByEmail(lead);
      return res.status(200).json({ ok: true, delivered: true, via: "email" });
    }
  } catch (err) {
    console.error("[api/lead] delivery failed:", err);
    return res.status(502).json({ ok: false, error: "Delivery failed" });
  }

  console.warn("[api/lead] no destination configured — lead not delivered");
  return res.status(200).json({ ok: true, delivered: false });
}
