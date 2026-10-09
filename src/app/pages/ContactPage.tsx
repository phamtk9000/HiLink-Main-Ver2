// Contact — quiet, but with a few things that are alive: the HiLink link
// line drawing itself behind the heading, the office's real opening status
// in Hanoi time, direct lines set large enough to read across a room (with
// one-click copy), and the form on a plain white sheet. The page ends with
// the other ways in rather than another banner.
import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react';
import { Link } from 'react-router';
import { ArrowRight, ArrowUpRight, Check, CheckCircle, Copy } from 'lucide-react';
import { motion } from 'motion/react';
import { CONTACT, SERVICES, ws } from '../data/site';
import { useLang, usePageMeta } from '../lib/i18n';
import { Select } from '../components/Select';
import { Flag } from '../components/Flag';
import { HONEYPOT_PROPS, honeypot, leadError, sendLead } from '../lib/lead';
import { LOOP_PATH } from '../lib/loop';

const T = {
  en: {
    meta: 'Contact HiLink — email contact@hilink.vn or call (+84) 24 2202 9000.',
    eyebrow: 'Contact', title: "Let's start a conversation.", lead: 'Tell us what you need — a workspace, a property to look after, a company to set up — and the right person will come back to you within one working day.',
    services: [...SERVICES.map((s) => s.t.en), 'Other'],
    sentTitle: 'Message received', sentBody: 'Thank you for reaching out. A member of our team will reply within one working day.',
    first: 'First name *', last: 'Last name *', email: 'Email *', phone: 'Phone', company: 'Company', service: 'Topic', select: 'Choose a topic', message: 'How can we help? *',
    sending: 'Sending…', send: 'Send message',
    formTitle: 'Write to us',
    lines: 'Direct lines', emailLbl: 'Email', phoneLbl: 'Phone', office: 'Office', directions: 'Get directions',
    copy: 'Copy', copied: 'Copied',
    open: 'Open now', closed: 'Closed now', in: 'in Hanoi', closes: 'closes at', opens: 'opens',
    hours: 'Mon–Fri 08:00–20:00 · Sat 09:00–17:00',
    resp: 'We reply to every enquiry within one working day. For anything urgent, call us.',
    other: 'Other ways in',
    ways: [
      { t: 'Meet an advisor', d: 'Book a consultation', to: '/book-consultation' },
      { t: 'Find a desk or an office', d: 'HiLink Workspaces', href: '' },
      { t: 'Work with us', d: 'Careers at HiLink', to: '/careers' },
    ],
    days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  },
  vi: {
    meta: 'Liên hệ HiLink — email contact@hilink.vn hoặc gọi (+84) 24 2202 9000.',
    eyebrow: 'Liên hệ', title: 'Hãy bắt đầu trao đổi.', lead: 'Cho chúng tôi biết bạn cần gì — một không gian làm việc, một tài sản cần chăm sóc, một công ty cần thành lập — người phù hợp sẽ phản hồi bạn trong một ngày làm việc.',
    services: [...SERVICES.map((s) => s.t.vi), 'Khác'],
    sentTitle: 'Đã nhận lời nhắn', sentBody: 'Cảm ơn bạn đã liên hệ. Một thành viên đội ngũ sẽ phản hồi trong một ngày làm việc.',
    first: 'Tên *', last: 'Họ *', email: 'Email *', phone: 'Số điện thoại', company: 'Công ty', service: 'Chủ đề', select: 'Chọn chủ đề', message: 'Chúng tôi có thể giúp gì? *',
    sending: 'Đang gửi…', send: 'Gửi lời nhắn',
    formTitle: 'Viết cho chúng tôi',
    lines: 'Liên hệ trực tiếp', emailLbl: 'Email', phoneLbl: 'Điện thoại', office: 'Văn phòng', directions: 'Chỉ đường',
    copy: 'Sao chép', copied: 'Đã chép',
    open: 'Đang mở cửa', closed: 'Đã đóng cửa', in: 'tại Hà Nội', closes: 'đóng cửa lúc', opens: 'mở cửa',
    hours: 'T2–T6 08:00–20:00 · T7 09:00–17:00',
    resp: 'Chúng tôi phản hồi mọi yêu cầu trong một ngày làm việc. Việc gấp, vui lòng gọi trực tiếp.',
    other: 'Những cách khác',
    ways: [
      { t: 'Gặp chuyên viên tư vấn', d: 'Đặt lịch tư vấn', to: '/book-consultation' },
      { t: 'Tìm chỗ ngồi hay văn phòng', d: 'HiLink Workspaces', href: '' },
      { t: 'Làm việc cùng chúng tôi', d: 'Tuyển dụng tại HiLink', to: '/careers' },
    ],
    days: ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'],
  },
};

const MAPS = 'https://maps.google.com/?q=60+Ly+Thai+To,+Hoan+Kiem,+Ha+Noi';
// Office hours at 60 Ly Thai To (data/locations.ts, "obc"), by weekday, Hanoi time.
const HOURS: Record<number, [number, number] | null> = { 0: null, 1: [8, 20], 2: [8, 20], 3: [8, 20], 4: [8, 20], 5: [8, 20], 6: [9, 17] };

/** The time in Hanoi (UTC+7), whatever the visitor's own time zone. */
function hanoiNow() {
  const d = new Date(Date.now() + (new Date().getTimezoneOffset() + 420) * 60000);
  return { day: d.getDay(), h: d.getHours(), m: d.getMinutes() };
}

function OfficeStatus({ t }: { t: (typeof T)['en'] }) {
  const [now, setNow] = useState(hanoiNow);
  useEffect(() => {
    const id = window.setInterval(() => setNow(hanoiNow()), 20000);
    return () => window.clearInterval(id);
  }, []);
  const today = HOURS[now.day];
  const minutes = now.h * 60 + now.m;
  const open = !!today && minutes >= today[0] * 60 && minutes < today[1] * 60;
  // Next opening: later today, or the next day with hours.
  let next = '';
  if (!open) {
    for (let k = 0; k < 7; k++) {
      const day = (now.day + k) % 7;
      const hrs = HOURS[day];
      if (!hrs || (k === 0 && minutes >= hrs[0] * 60)) continue;
      next = `${t.opens} ${k === 0 ? '' : `${t.days[day]} `}${String(hrs[0]).padStart(2, '0')}:00`;
      break;
    }
  }
  const clock = `${String(now.h).padStart(2, '0')}:${String(now.m).padStart(2, '0')}`;
  return (
    <p className="inline-flex flex-wrap items-center gap-x-3 gap-y-1 border border-[#2A2623]/12 bg-white/70 px-4 py-2 text-[13px] text-[#2A2623]" aria-live="polite">
      <span className="relative flex h-2 w-2" aria-hidden="true">
        {open && <span className="absolute inset-0 animate-ping rounded-full bg-[#2F9E6B]/60" />}
        <span className={`relative h-2 w-2 rounded-full ${open ? 'bg-[#2F9E6B]' : 'bg-[#B3A79F]'}`} />
      </span>
      <span className="font-medium">{open ? t.open : t.closed}</span>
      <span className="text-[#6B645D]">
        {clock} {t.in} · {open && today ? `${t.closes} ${today[1]}:00` : next}
      </span>
    </p>
  );
}

export function ContactPage() {
  const { lang, l } = useLang();
  const t = T[lang];
  usePageMeta(t.eyebrow, t.meta);
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', phone: '', company: '', service: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    try {
      const f = formData;
      await sendLead('contact', {
        Name: `${f.firstName} ${f.lastName}`.trim(), Email: f.email, Phone: f.phone, Company: f.company, Service: f.service, Message: f.message,
      }, { website: honeypot(e.currentTarget), lang });
      setSubmitted(true);
    } catch {
      setError(leadError(lang));
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const copy = async (text: string) => {
    try { await navigator.clipboard.writeText(text); setCopied(text); window.setTimeout(() => setCopied(''), 1800); } catch { /* clipboard blocked */ }
  };

  const label = 'block mb-2 text-[12px] uppercase tracking-[0.16em] text-[#6B645D]';
  const field = 'w-full bg-transparent border-b border-[#2A2623]/20 py-3 text-[16px] text-[#2A2623] placeholder:text-[#2A2623]/30 focus:border-[#D12126] focus:outline-none transition-colors';

  const line = (lbl: string, value: string, href: string, copyable = true) => (
    <div className="group border-t border-[#2A2623]/12 py-7">
      <p className={label}>{lbl}</p>
      <div className="flex items-center justify-between gap-4">
        <a href={href} className="serif relative text-[1.6rem] lg:text-[2.1rem] leading-tight text-[#2A2623] hover:text-[#D12126] transition-colors break-all">
          {value}
        </a>
        {copyable && (
          <button
            type="button"
            onClick={() => copy(value)}
            className="inline-flex shrink-0 items-center gap-1.5 border border-[#2A2623]/15 px-3 py-1.5 text-[12px] text-[#6B645D] opacity-100 lg:opacity-0 lg:group-hover:opacity-100 focus:opacity-100 hover:border-[#D12126] hover:text-[#D12126] transition-all"
          >
            {copied === value ? <><Check size={13} /> {t.copied}</> : <><Copy size={13} /> {t.copy}</>}
          </button>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Opening: the heading over the link line, drawing itself. */}
      <section className="relative overflow-hidden bg-white pt-20 pb-16 lg:pt-28 lg:pb-24">
        <svg viewBox="0 0 600 600" className="hl-loop hl-loop--auto is-in pointer-events-none absolute -right-[12%] top-1/2 hidden h-[150%] -translate-y-1/2 opacity-[0.55] md:block" aria-hidden="true">
          <path d={LOOP_PATH} fill="none" stroke="#D12126" strokeOpacity="0.06" strokeWidth="10" />
          <path d={LOOP_PATH} pathLength={1} fill="none" stroke="#D12126" strokeOpacity="0.35" strokeWidth="1" className="hl-loop-draw" />
          <path d={LOOP_PATH} pathLength={1} fill="none" stroke="#FF6A6E" strokeWidth="3" strokeLinecap="round" className="hl-loop-run" />
        </svg>
        <div className="relative max-w-[1600px] mx-auto px-6 lg:px-12">
          <p className="mb-6 inline-flex items-center gap-2.5 text-[12px] uppercase tracking-[0.2em] text-[#D12126]"><Flag /> {t.eyebrow}</p>
          <h1 className="serif max-w-4xl leading-[1.04] text-[#2A2623]">{t.title}</h1>
          <p className="mt-7 max-w-2xl text-[1.0625rem] leading-relaxed text-[#6B645D]">{t.lead}</p>
          <div className="mt-9"><OfficeStatus t={t} /></div>
        </div>
      </section>

      {/* Direct lines and the form. */}
      <section className="bg-[#F4F0EA] py-20 lg:py-28">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 grid lg:grid-cols-12 gap-14 lg:gap-20">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <h2 className="serif leading-[1.1]">{t.lines}</h2>
              <div className="mt-8">
                {line(t.emailLbl, CONTACT.email, CONTACT.emailHref)}
                {line(t.phoneLbl, CONTACT.phone, CONTACT.phoneHref)}
                <div className="border-y border-[#2A2623]/12 py-7">
                  <p className={label}>{t.office}</p>
                  <address className="serif not-italic text-[1.35rem] lg:text-[1.6rem] leading-snug text-[#2A2623]">{CONTACT.address[lang]}</address>
                  <p className="mt-2 text-[14px] text-[#6B645D]">{t.hours}</p>
                  <a href={MAPS} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-1.5 border-b border-[#2A2623]/30 pb-0.5 text-[13px] uppercase tracking-[0.14em] text-[#2A2623] hover:border-[#D12126] hover:text-[#D12126] transition-colors">
                    {t.directions} <ArrowUpRight size={13} />
                  </a>
                </div>
              </div>
              <p className="mt-6 max-w-md text-[14px] leading-relaxed text-[#6B645D]">{t.resp}</p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="border border-[#2A2623]/10 bg-white p-7 sm:p-10 lg:p-14">
              {submitted ? (
                <motion.div
                  className="flex flex-col items-center justify-center py-20 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  role="status"
                >
                  <CheckCircle size={44} className="mb-6 text-[#D12126]" />
                  <p className="serif mb-3 text-[2rem] text-[#2A2623]">{t.sentTitle}</p>
                  <p className="max-w-md text-[#6B645D]">{t.sentBody}</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="relative">
                  <input {...HONEYPOT_PROPS} />
                  <p className="serif text-[1.75rem] text-[#2A2623]">{t.formTitle}</p>
                  <div className="mt-8 grid gap-x-8 gap-y-7 md:grid-cols-2">
                    <div>
                      <label htmlFor="firstName" className={label}>{t.first}</label>
                      <input id="firstName" name="firstName" type="text" autoComplete="given-name" required value={formData.firstName} onChange={handleChange} className={field} />
                    </div>
                    <div>
                      <label htmlFor="lastName" className={label}>{t.last}</label>
                      <input id="lastName" name="lastName" type="text" autoComplete="family-name" required value={formData.lastName} onChange={handleChange} className={field} />
                    </div>
                    <div>
                      <label htmlFor="email" className={label}>{t.email}</label>
                      <input id="email" name="email" type="email" autoComplete="email" required value={formData.email} onChange={handleChange} className={field} />
                    </div>
                    <div>
                      <label htmlFor="phone" className={label}>{t.phone}</label>
                      <input id="phone" name="phone" type="tel" autoComplete="tel" value={formData.phone} onChange={handleChange} className={field} />
                    </div>
                    <div>
                      <label htmlFor="company" className={label}>{t.company}</label>
                      <input id="company" name="company" type="text" autoComplete="organization" value={formData.company} onChange={handleChange} className={field} />
                    </div>
                    <div>
                      <label id="service-label" htmlFor="service" className={label}>{t.service}</label>
                      <Select
                        id="service"
                        name="service"
                        aria-labelledby="service-label"
                        value={formData.service}
                        onChange={(v) => setFormData({ ...formData, service: v })}
                        options={t.services.map((sv) => ({ value: sv, label: sv }))}
                        placeholder={t.select}
                        className={`${field} w-full`}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label htmlFor="message" className={label}>{t.message}</label>
                      <textarea id="message" name="message" required rows={5} value={formData.message} onChange={handleChange} className={`${field} resize-none`} />
                    </div>
                  </div>
                  <div className="mt-10 flex flex-wrap items-center gap-5">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group inline-flex items-center gap-2 bg-[#D12126] px-9 py-4 text-[13px] uppercase tracking-[0.16em] text-white hover:bg-[#A3181C] transition-colors disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {isSubmitting ? t.sending : t.send}
                      <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                    </button>
                    {error && <p role="alert" className="text-[15px] text-[#B01B20]">{error}</p>}
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Other ways in. */}
      <section className="bg-white py-14 lg:py-16">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <p className="text-[12px] uppercase tracking-[0.2em] text-[#6B645D]">{t.other}</p>
          <div className="mt-6 grid md:grid-cols-3 md:divide-x divide-[#2A2623]/10 border-y border-[#2A2623]/10">
            {t.ways.map((w) => {
              const inner = (
                <>
                  <span>
                    <span className="block text-[14px] text-[#6B645D]">{w.t}</span>
                    <span className="serif mt-1 block text-[1.45rem] text-[#2A2623] group-hover:text-[#D12126] transition-colors">{w.d}</span>
                  </span>
                  {w.to ? <ArrowRight size={18} className="shrink-0 text-[#D12126] transition-transform group-hover:translate-x-1" /> : <ArrowUpRight size={18} className="shrink-0 text-[#D12126] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />}
                </>
              );
              const cls = 'group flex items-center justify-between gap-4 py-7 md:px-8 first:md:pl-0 last:md:pr-0 border-b md:border-b-0 border-[#2A2623]/10 last:border-b-0';
              return w.to
                ? <Link key={w.d} to={l(w.to)} className={cls}>{inner}</Link>
                : <a key={w.d} href={ws(lang)} target="_blank" rel="noopener noreferrer" className={cls}>{inner}</a>;
            })}
          </div>
        </div>
      </section>
    </>
  );
}
