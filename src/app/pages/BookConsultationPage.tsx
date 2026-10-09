import { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { useLang, usePageMeta } from '../lib/i18n';
import { Select } from '../components/Select';
import { SERVICES } from '../data/site';
import { HONEYPOT_PROPS, honeypot, leadError, sendLead } from '../lib/lead';
import { Contours } from '../components/Contours';

const T = {
  en: {
    eyebrow: 'Book Consultation', title: 'Let’s talk about your goals',
    lead: 'Share a few details and one of our advisors will be in touch to arrange a consultation.',
    interests: [...SERVICES.map((s) => s.t.en), 'Something else'],
    thanks: 'Thank you', thanksBody: 'We have received your request and will contact you shortly.',
    name: 'Full Name', namePh: 'Your name', email: 'Email Address', emailPh: 'Your email', phone: 'Phone Number', phonePh: 'Your phone number',
    interest: 'I’m interested in', message: 'Message', messagePh: 'Tell us a little about what you need',
    submitting: 'Submitting…', submit: 'Request Consultation',
  },
  vi: {
    eyebrow: 'Đặt lịch tư vấn', title: 'Hãy cùng trao đổi về mục tiêu của bạn',
    lead: 'Chia sẻ đôi chút thông tin, một chuyên viên tư vấn sẽ liên hệ để sắp xếp buổi tư vấn.',
    interests: [...SERVICES.map((s) => s.t.vi), 'Nhu cầu khác'],
    thanks: 'Cảm ơn bạn', thanksBody: 'Chúng tôi đã nhận được yêu cầu và sẽ liên hệ với bạn sớm.',
    name: 'Họ và tên', namePh: 'Tên của bạn', email: 'Địa chỉ email', emailPh: 'Email của bạn', phone: 'Số điện thoại', phonePh: 'Số điện thoại của bạn',
    interest: 'Tôi quan tâm đến', message: 'Lời nhắn', messagePh: 'Cho chúng tôi biết đôi chút về nhu cầu của bạn',
    submitting: 'Đang gửi…', submit: 'Yêu cầu tư vấn',
  },
};

export function BookConsultationPage() {
  const { lang } = useLang();
  const t = T[lang];
  usePageMeta(t.eyebrow, t.lead);
  const interests = t.interests;
  const [form, setForm] = useState({ name: '', email: '', phone: '', interest: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const update = (field: string, value: string) => setForm((f) => ({ ...f, [field]: value }));

  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      await sendLead('consultation', {
        Name: form.name, Email: form.email, Phone: form.phone, Interest: form.interest || interests[0], Message: form.message,
      }, { website: honeypot(e.currentTarget), lang });
      setSubmitted(true);
    } catch {
      setError(leadError(lang));
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    'w-full bg-transparent border-b border-[#2A2623]/25 py-3 text-[#2A2623] placeholder-[#6B645D] focus:border-[#D12126] focus:outline-none transition-colors';

  return (
    <>
      {/* Hero */}
      <section id="hero" className="relative overflow-hidden py-20 lg:py-28 bg-[#361716] text-white">
        <Contours />
        <div className="relative max-w-[1600px] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <p className="text-sm uppercase tracking-wider text-[#F06A6E] mb-8">{t.eyebrow}</p>
            <h1 className="serif text-5xl lg:text-7xl mb-8 leading-tight">
              {t.title}
            </h1>
            <p className="text-xl text-[#E9E3DA] leading-relaxed">
              {t.lead}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form */}
      <section id="consultation-form" className="relative py-20 lg:py-28 bg-white text-[#2A2623]">
        <div className="max-w-[800px] mx-auto px-6 lg:px-12">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <CheckCircle2 size={56} className="text-[#D12126] mx-auto mb-8" />
              <h2 className="serif text-4xl mb-4">{t.thanks}</h2>
              <p className="text-xl text-[#6B645D]">
                {t.thanksBody}
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="relative space-y-8">
              <input {...HONEYPOT_PROPS} />
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <label htmlFor="bc-name" className="block text-sm uppercase tracking-wider text-[#D12126] mb-3">{t.name} *</label>
                  <input
                    id="bc-name"
                    required
                    type="text"
                    value={form.name}
                    onChange={(e) => update('name', e.target.value)}
                    placeholder={t.namePh}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="bc-email" className="block text-sm uppercase tracking-wider text-[#D12126] mb-3">{t.email} *</label>
                  <input
                    id="bc-email"
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => update('email', e.target.value)}
                    placeholder={t.emailPh}
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <label htmlFor="bc-phone" className="block text-sm uppercase tracking-wider text-[#D12126] mb-3">{t.phone}</label>
                  <input
                    id="bc-phone"
                    type="tel"
                    value={form.phone}
                    onChange={(e) => update('phone', e.target.value)}
                    placeholder={t.phonePh}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="bc-interest" className="block text-sm uppercase tracking-wider text-[#D12126] mb-3">{t.interest}</label>
                  <Select
                    id="bc-interest"
                    value={form.interest || interests[0]}
                    onChange={(v) => update('interest', v)}
                    options={interests.map((it) => ({ value: it, label: it }))}
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="bc-message" className="block text-sm uppercase tracking-wider text-[#D12126] mb-3">{t.message}</label>
                <textarea
                  id="bc-message"
                  rows={4}
                  value={form.message}
                  onChange={(e) => update('message', e.target.value)}
                  placeholder={t.messagePh}
                  className={`${inputClass} resize-none`}
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="px-12 py-4 bg-[#D12126] text-white text-sm uppercase tracking-wider hover:bg-[#A3181C] transition-colors disabled:opacity-60"
              >
                {submitting ? t.submitting : t.submit}
              </button>
              {error && <p role="alert" className="text-[15px] text-[#B01B20]">{error}</p>}
            </form>
          )}
        </div>
      </section>
    </>
  );
}
