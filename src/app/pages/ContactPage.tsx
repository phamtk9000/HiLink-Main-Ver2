// Contact — opens with a Stripe-Enterprise-style hero (silk sheet, heavy sans
// headline with colour-shifting knockout words), then follows
// foraspace.com/contact-us: a white panel on the
// left holding a photograph and "Find your solution at HiLink" (it stays in
// view while the form scrolls), and the enquiry on the right in two short
// groups, with fields outlined and labelled on their top edge. Only what we
// need to reply: the topic, a message, a name, a company, an email, a phone.
// The office's live opening status in Hanoi time sits under the logo.
import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react';
import { Link } from 'react-router';
import { ArrowRight, CheckCircle, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import { CONTACT, SERVICES } from '../data/site';
import { useLang, usePageMeta } from '../lib/i18n';
import { Select } from '../components/Select';
import { HONEYPOT_PROPS, honeypot, leadError, sendLead } from '../lib/lead';
import { photo } from '../lib/photo';
import { SilkCanvas } from '../components/SilkCanvas';
import { Flag } from '../components/Flag';

const T = {
  en: {
    meta: 'Contact HiLink — email contact@hilink.vn or call (+84) 24 2202 9000.',
    eyebrow: 'Contact', heroA: 'Let’s start a', heroB: 'conversation',
    heroLead: 'Tell us what you need — a workspace, a property to look after, a company to set up — and the right person will come back to you within one working day.',
    heroCta: 'Make an enquiry', orCall: 'or call',
    title: 'Contact us', sub: 'Make your enquiry',
    lead: "Fill in the details below and we'll put you in touch with the right person. Or give us a call if you prefer, on",
    orEmail: 'or write to',
    find: 'Find your solution at',
    help: 'How can we help you?', who: 'Who should we contact?',
    topic: 'I’m interested in*', topicPh: 'Choose a topic', message: 'Tell us a little more', messagePh: 'A sentence or two about what you need',
    name: 'Full name*', namePh: 'Your full name', company: 'Company', companyPh: 'Company name (optional)',
    email: 'Email address*', emailPh: 'you@company.com', phone: 'Phone number', phonePh: 'So we can call you back',
    services: [...SERVICES.map((s) => s.t.en), 'Something else'],
    consent: 'By sending this form you agree to our', privacy: 'Privacy Policy',
    send: 'Submit', sending: 'Sending…',
    sentTitle: 'Thank you', sentBody: 'We have your enquiry and will reply within one working day.',
    open: 'Open now', closed: 'Closed now', in: 'in Hanoi', closes: 'closes at', opens: 'opens',
    days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    photoAlt: 'Reception at Floor 15, 4 Ton That Tung',
  },
  vi: {
    meta: 'Liên hệ HiLink — email contact@hilink.vn hoặc gọi (+84) 24 2202 9000.',
    eyebrow: 'Liên hệ', heroA: 'Hãy bắt đầu', heroB: 'trao đổi',
    heroLead: 'Cho chúng tôi biết bạn cần gì — một không gian làm việc, một tài sản cần chăm sóc, một công ty cần thành lập — người phù hợp sẽ phản hồi bạn trong một ngày làm việc.',
    heroCta: 'Gửi yêu cầu', orCall: 'hoặc gọi',
    title: 'Liên hệ', sub: 'Gửi yêu cầu của bạn',
    lead: 'Điền thông tin bên dưới, chúng tôi sẽ kết nối bạn với đúng người phụ trách. Hoặc gọi cho chúng tôi nếu bạn muốn, theo số',
    orEmail: 'hoặc viết tới',
    find: 'Tìm giải pháp của bạn tại',
    help: 'Chúng tôi có thể giúp gì?', who: 'Chúng tôi nên liên hệ với ai?',
    topic: 'Tôi quan tâm đến*', topicPh: 'Chọn chủ đề', message: 'Mô tả thêm', messagePh: 'Một vài câu về nhu cầu của bạn',
    name: 'Họ và tên*', namePh: 'Họ tên của bạn', company: 'Công ty', companyPh: 'Tên công ty (không bắt buộc)',
    email: 'Email*', emailPh: 'ban@congty.com', phone: 'Số điện thoại', phonePh: 'Để chúng tôi gọi lại',
    services: [...SERVICES.map((s) => s.t.vi), 'Nhu cầu khác'],
    consent: 'Khi gửi biểu mẫu, bạn đồng ý với', privacy: 'Chính sách bảo mật',
    send: 'Gửi', sending: 'Đang gửi…',
    sentTitle: 'Cảm ơn bạn', sentBody: 'Chúng tôi đã nhận yêu cầu và sẽ phản hồi trong một ngày làm việc.',
    open: 'Đang mở cửa', closed: 'Đã đóng cửa', in: 'tại Hà Nội', closes: 'đóng cửa lúc', opens: 'mở cửa',
    days: ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'],
    photoAlt: 'Quầy lễ tân tại Tầng 15, 4 Tôn Thất Tùng',
  },
};

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
    <p className="inline-flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[13px] text-[#2A2623]" aria-live="polite">
      <span className="relative flex h-2 w-2" aria-hidden="true">
        {open && <span className="absolute inset-0 animate-ping rounded-full bg-[#2F9E6B]/60" />}
        <span className={`relative h-2 w-2 rounded-full ${open ? 'bg-[#2F9E6B]' : 'bg-[#B3A79F]'}`} />
      </span>
      <span className="font-medium">{open ? t.open : t.closed}</span>
      <span className="font-mono text-[12px] text-[#6B645D]">{clock} {t.in} · {open && today ? `${t.closes} ${today[1]}:00` : next}</span>
    </p>
  );
}

export function ContactPage() {
  const { lang, l } = useLang();
  const t = T[lang];
  usePageMeta(t.title, t.meta);
  const [form, setForm] = useState({ topic: '', message: '', name: '', company: '', email: '', phone: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const onField = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm({ ...form, [e.target.name]: e.target.value });
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    setError('');
    try {
      await sendLead('contact', {
        Name: form.name, Email: form.email, Phone: form.phone, Company: form.company, Service: form.topic, Message: form.message,
      }, { website: honeypot(e.currentTarget), lang });
      setSent(true);
    } catch {
      setError(leadError(lang));
    } finally {
      setSending(false);
    }
  };

  // Fields outlined, the label sitting on the top edge (as on Fora).
  const box = 'w-full rounded-[2px] border border-[#2A2623]/70 bg-transparent px-4 font-mono text-[14px] text-[#2A2623] placeholder:text-[#2A2623]/40 focus:border-[#D12126] focus:outline-none transition-colors';
  const legend = 'absolute -top-[9px] left-3 z-10 bg-white px-1.5 font-mono text-[12px] leading-[18px] text-[#2A2623]';
  const field = (name: keyof typeof form, label: string, ph: string, type = 'text', required = false, auto?: string) => (
    <div className="relative">
      <label htmlFor={`c-${name}`} className={legend}>{label}</label>
      <input id={`c-${name}`} name={name} type={type} required={required} autoComplete={auto} placeholder={ph} value={form[name]} onChange={onField} className={`${box} h-[54px]`} />
    </div>
  );

  return (
    <>
    {/* Opening, after the stripe.com/enterprise hero: a deep diagonal ground,
        a silk sheet across the lower right, a heavy sans headline whose last
        words keep changing colour, and one clear action. In HiLink's wine,
        peach and red. */}
    <section className="relative overflow-hidden bg-[linear-gradient(145deg,#3B1C1E,#1B0E0F_75%)] text-white">
      <SilkCanvas variant="sheet" />
      <div className="relative max-w-[1600px] mx-auto px-6 lg:px-12 pt-24 pb-24 lg:pt-36 lg:pb-36 grid lg:grid-cols-12">
        <div className="lg:col-span-7 lg:col-start-5">
          <p className="mb-6 inline-flex items-center gap-2.5 text-[12px] uppercase tracking-[0.2em] text-[#FF9A8B]"><Flag /> {t.eyebrow}</p>
          <h1 className="hl-hero-sans text-white">
            {t.heroA}{' '}<span className="hl-knockout">{t.heroB}</span>
          </h1>
          <p className="mt-8 max-w-[38rem] text-[1.125rem] lg:text-[1.25rem] leading-[1.6] text-white/85">{t.heroLead}</p>
          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
            <a href="#enquiry" className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-[15px] font-medium text-[#2A2623] hover:bg-[#FBECEC] transition-colors">
              {t.heroCta} <ChevronRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </a>
            <span className="text-[15px] text-white/70">
              {t.orCall}{' '}<a href={CONTACT.phoneHref} className="font-mono text-white underline decoration-white/30 underline-offset-4 hover:decoration-white">{CONTACT.phone}</a>
            </span>
          </div>
        </div>
      </div>
    </section>

    <section id="enquiry" className="relative bg-white scroll-mt-[76px]">
      <div className="grid lg:grid-cols-12">
        {/* Left: photograph and sign-off, held in view. */}
        <div className="lg:col-span-5 bg-[#F4F0EA]">
          <div className="lg:sticky lg:top-[76px] flex flex-col gap-8 p-6 sm:p-10 lg:p-12 lg:h-[calc(100vh-76px)]">
            <div className="relative min-h-[260px] flex-1 overflow-hidden rounded-[8px] bg-[#2A2623]">
              <img {...photo('/photos/f15-reception.webp', '(min-width: 1024px) 38vw, 100vw')} alt={t.photoAlt} fetchPriority="high" className="absolute inset-0 h-full w-full object-cover" />
            </div>
            <div className="text-center">
              <p className="serif text-[1.55rem] lg:text-[1.7rem] text-[#2A2623]">{t.find}</p>
              <img src="/brand/logo-hilink-lockup.svg" alt="HiLink — Your Solution" className="mx-auto mt-4 h-20 lg:h-24 w-auto" />
              <div className="mt-5 flex justify-center"><OfficeStatus t={t} /></div>
            </div>
          </div>
        </div>

        {/* Right: the enquiry. */}
        <div className="lg:col-span-7 px-6 sm:px-10 lg:px-20 xl:px-28 py-14 lg:py-20">
          <div className="max-w-[640px]">
            <p className="text-[12px] uppercase tracking-[0.2em] text-[#6B645D]">{t.title}</p>
            <h2 className="serif mt-2 hl-display text-[#2A2623]">{t.sub}</h2>
            <p className="mt-6 text-[15px] leading-relaxed text-[#4A443F]">
              {t.lead}{' '}
              <a href={CONTACT.phoneHref} className="font-mono text-[14px] text-[#2A2623] underline decoration-[#2A2623]/30 underline-offset-4 hover:text-[#D12126]">{CONTACT.phone}</a>
              {' '}{t.orEmail}{' '}
              <a href={CONTACT.emailHref} className="font-mono text-[14px] text-[#2A2623] underline decoration-[#2A2623]/30 underline-offset-4 hover:text-[#D12126]">{CONTACT.email}</a>.
            </p>

            {sent ? (
              <motion.div className="mt-14 border-t border-[#2A2623]/15 pt-14" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} role="status">
                <CheckCircle size={40} className="text-[#D12126]" />
                <p className="serif mt-6 text-[2rem] text-[#2A2623]">{t.sentTitle}</p>
                <p className="mt-2 text-[15px] text-[#6B645D]">{t.sentBody}</p>
              </motion.div>
            ) : (
              <form onSubmit={onSubmit} className="relative mt-12 border-t border-[#2A2623]/15 pt-12">
                <input {...HONEYPOT_PROPS} />
                <p className="serif text-[1.55rem] lg:text-[1.7rem] text-[#2A2623]">{t.help}</p>
                <div className="mt-8 space-y-8">
                  <div className="relative">
                    <span id="c-topic-label" className={legend}>{t.topic}</span>
                    <Select
                      id="c-topic"
                      name="topic"
                      aria-labelledby="c-topic-label"
                      value={form.topic}
                      onChange={(v) => setForm({ ...form, topic: v })}
                      options={t.services.map((sv) => ({ value: sv, label: sv }))}
                      placeholder={t.topicPh}
                      className={`${box} h-[54px] w-full`}
                    />
                  </div>
                  <div className="relative">
                    <label htmlFor="c-message" className={legend}>{t.message}</label>
                    <textarea id="c-message" name="message" rows={4} placeholder={t.messagePh} value={form.message} onChange={onField} className={`${box} resize-none py-4`} />
                  </div>
                </div>

                <p className="serif mt-14 text-[1.55rem] lg:text-[1.7rem] text-[#2A2623]">{t.who}</p>
                <div className="mt-8 space-y-8">
                  {field('name', t.name, t.namePh, 'text', true, 'name')}
                  {field('company', t.company, t.companyPh, 'text', false, 'organization')}
                  <div className="grid gap-8 sm:grid-cols-2">
                    {field('email', t.email, t.emailPh, 'email', true, 'email')}
                    {field('phone', t.phone, t.phonePh, 'tel', false, 'tel')}
                  </div>
                </div>

                <p className="mt-10 text-[13px] leading-relaxed text-[#6B645D]">
                  {t.consent} <Link to={l('/privacy-policy')} className="underline underline-offset-4 hover:text-[#D12126]">{t.privacy}</Link>.
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-5">
                  <button
                    type="submit"
                    disabled={sending}
                    className="group inline-flex items-center gap-2 rounded-full bg-[#D12126] px-8 py-3 text-[14px] text-white hover:bg-[#A3181C] transition-colors disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {sending ? t.sending : t.send}
                    <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
                  </button>
                  {error && <p role="alert" className="text-[14px] text-[#B01B20]">{error}</p>}
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
    </>
  );
}
