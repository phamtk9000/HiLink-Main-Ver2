// One enquiry form for the whole site. Pages choose which optional fields to
// show; every form posts the same payload to /api/lead.
import { useState } from 'react';
import { Link } from 'react-router';
import { Check } from 'lucide-react';
import { CONTACT } from '../data/site';
import { useLang } from '../lib/i18n';
import { LeadError, submitLead } from '../lib/lead';

type Field = 'company' | 'phone' | 'interest' | 'location' | 'date' | 'message';

const T = {
  en: {
    name: 'Full name', email: 'Email', phone: 'Phone', company: 'Company', interest: 'I am interested in',
    location: 'Property address', date: 'Preferred date', message: 'Message', choose: 'Please choose',
    send: 'Send enquiry', sending: 'Sending…', required: 'Required',
    consent: 'By sending this form you agree to our', privacy: 'Privacy Policy',
    sentT: 'Thank you — your message is on its way.', sentD: 'Our team will get back to you shortly.',
    again: 'Send another message',
    errName: 'Please enter your name.', errEmail: 'Please enter a valid email address.',
    errSend: 'We could not send your message just now. Please email us at',
    errOr: 'or call',
  },
  vi: {
    name: 'Họ và tên', email: 'Email', phone: 'Số điện thoại', company: 'Công ty', interest: 'Tôi quan tâm đến',
    location: 'Địa chỉ bất động sản', date: 'Ngày mong muốn', message: 'Lời nhắn', choose: 'Vui lòng chọn',
    send: 'Gửi yêu cầu', sending: 'Đang gửi…', required: 'Bắt buộc',
    consent: 'Khi gửi biểu mẫu này, bạn đồng ý với', privacy: 'Chính sách bảo mật',
    sentT: 'Cảm ơn bạn — lời nhắn đã được gửi.', sentD: 'Đội ngũ HiLink sẽ liên hệ lại với bạn sớm.',
    again: 'Gửi lời nhắn khác',
    errName: 'Vui lòng nhập họ tên.', errEmail: 'Vui lòng nhập email hợp lệ.',
    errSend: 'Hiện chưa gửi được lời nhắn. Vui lòng email cho chúng tôi tại',
    errOr: 'hoặc gọi',
  },
};

const inputCls = 'w-full bg-transparent border-0 border-b border-[#0F0F0F]/20 px-0 py-3 text-[15px] focus:outline-none focus:border-[#A88F5C] transition-colors placeholder:text-[#0F0F0F]/30';
const labelCls = 'block text-[11px] font-semibold uppercase tracking-[0.16em] text-[#555] mb-1';

export function LeadForm({ formType, source, fields = ['company', 'phone', 'message'], interests, messageLabel }: {
  formType: string;
  source: string;
  fields?: Field[];
  interests?: string[];
  messageLabel?: string;
}) {
  const { lang } = useLang();
  const t = T[lang];
  const [v, setV] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'failed'>('idle');
  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setV((p) => ({ ...p, [k]: e.target.value }));
  const has = (f: Field) => fields.includes(f);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!v.name?.trim()) errs.name = t.errName;
    if (!/^\S+@\S+\.\S+$/.test(v.email ?? '')) errs.email = t.errEmail;
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setState('sending');
    try {
      await submitLead({
        formType, source, lang,
        name: v.name, email: v.email, phone: v.phone, company: v.company,
        interest: v.interest, location: v.location, tourDate: v.date, message: v.message,
        website: v.website,
      });
      setState('sent');
      setV({});
    } catch (err) {
      if (err instanceof LeadError && err.field) {
        setErrors({ [err.field]: err.field === 'email' ? t.errEmail : t.errName });
        setState('idle');
      } else {
        setState('failed');
      }
    }
  };

  if (state === 'sent') {
    return (
      <div className="py-12" role="status">
        <span className="inline-flex w-12 h-12 items-center justify-center rounded-full bg-[#A88F5C] text-white mb-6"><Check size={22} /></span>
        <h3 className="mb-3">{t.sentT}</h3>
        <p className="text-[#555] mb-8">{t.sentD}</p>
        <button onClick={() => setState('idle')} className="text-[11px] font-medium uppercase tracking-[0.18em] border-b border-[#0F0F0F]/30 pb-1 hover:text-[#A88F5C]">
          {t.again}
        </button>
      </div>
    );
  }

  const field = (k: string, label: string, opts: { type?: string; required?: boolean; autoComplete?: string } = {}) => (
    <div>
      <label htmlFor={`${formType}-${k}`} className={labelCls}>
        {label}{opts.required && <span className="text-[#A88F5C]"> *</span>}
      </label>
      <input
        id={`${formType}-${k}`}
        type={opts.type ?? 'text'}
        value={v[k] ?? ''}
        onChange={set(k)}
        autoComplete={opts.autoComplete}
        aria-invalid={!!errors[k]}
        className={inputCls}
      />
      {errors[k] && <p className="mt-1 text-[13px] text-[#B42318]">{errors[k]}</p>}
    </div>
  );

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-7">
      {/* Honeypot: hidden from people, tempting to bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] w-px h-px overflow-hidden">
        <label>Website<input tabIndex={-1} autoComplete="off" value={v.website ?? ''} onChange={set('website')} /></label>
      </div>

      <div className="grid sm:grid-cols-2 gap-7">
        {field('name', t.name, { required: true, autoComplete: 'name' })}
        {field('email', t.email, { type: 'email', required: true, autoComplete: 'email' })}
        {has('phone') && field('phone', t.phone, { type: 'tel', autoComplete: 'tel' })}
        {has('company') && field('company', t.company, { autoComplete: 'organization' })}
        {has('location') && field('location', t.location)}
        {has('date') && field('date', t.date, { type: 'date' })}
      </div>

      {has('interest') && interests && (
        <div>
          <label htmlFor={`${formType}-interest`} className={labelCls}>{t.interest}</label>
          <select id={`${formType}-interest`} value={v.interest ?? ''} onChange={set('interest')} className={`${inputCls} cursor-pointer`}>
            <option value="">{t.choose}</option>
            {interests.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
        </div>
      )}

      {has('message') && (
        <div>
          <label htmlFor={`${formType}-message`} className={labelCls}>{messageLabel ?? t.message}</label>
          <textarea id={`${formType}-message`} rows={4} value={v.message ?? ''} onChange={set('message')} className={`${inputCls} resize-none`} />
        </div>
      )}

      {state === 'failed' && (
        <p className="text-[14px] text-[#B42318]" role="alert">
          {t.errSend} <a href={CONTACT.emailHref} className="underline">{CONTACT.email}</a> {t.errOr}{' '}
          <a href={CONTACT.phoneHref} className="underline">{CONTACT.phone}</a>.
        </p>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center gap-6 pt-2">
        <button
          type="submit"
          disabled={state === 'sending'}
          className="inline-flex items-center justify-center px-10 py-4 bg-[#0F0F0F] text-white text-[11px] font-medium uppercase tracking-[0.16em] hover:bg-[#A88F5C] transition-colors disabled:opacity-60"
        >
          {state === 'sending' ? t.sending : t.send}
        </button>
        <p className="text-[12.5px] text-[#666]">
          {t.consent} <Link to={`/${lang}/privacy-policy`} className="underline hover:text-[#7A653B]">{t.privacy}</Link>.
        </p>
      </div>
    </form>
  );
}
