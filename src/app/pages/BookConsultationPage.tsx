import { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { useLang, usePageMeta } from '../lib/i18n';
import { Candles } from '../components/Candles';

const T = {
  en: {
    eyebrow: 'Book Consultation', title: 'Let’s talk about your goals',
    lead: 'Share a few details and one of our advisors will be in touch to arrange a consultation.',
    interests: ['Property Management', 'Workspace Leasing', 'Business Services', 'Concierge Services', 'Industrial & Logistics', 'Something else'],
    thanks: 'Thank you', thanksBody: 'We have received your request and will contact you shortly.',
    name: 'Full Name', namePh: 'Your name', email: 'Email Address', emailPh: 'Your email', phone: 'Phone Number', phonePh: 'Your phone number',
    interest: 'I’m interested in', message: 'Message', messagePh: 'Tell us a little about what you need',
    submitting: 'Submitting…', submit: 'Request Consultation',
  },
  vi: {
    eyebrow: 'Đặt lịch tư vấn', title: 'Hãy cùng trao đổi về mục tiêu của bạn',
    lead: 'Chia sẻ đôi chút thông tin, một chuyên viên tư vấn sẽ liên hệ để sắp xếp buổi tư vấn.',
    interests: ['Quản lý bất động sản', 'Cho thuê văn phòng', 'Dịch vụ doanh nghiệp', 'Dịch vụ concierge', 'Công nghiệp & logistics', 'Nhu cầu khác'],
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

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) return;
    setSubmitting(true);
    // Submission is stubbed until the backend endpoint is wired up.
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 800);
  };

  const inputClass =
    'w-full bg-transparent border-b border-[#2A2623]/25 py-3 text-[#2A2623] placeholder-[#6B645D] focus:border-[#D12126] focus:outline-none transition-colors';

  return (
    <>
      {/* Hero */}
      <section id="hero" className="relative overflow-hidden py-20 lg:py-28 bg-[#361716] text-white">
        <Candles />
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
      <section id="consultation-form" className="py-20 lg:py-28 bg-[#F4F0EA] text-[#2A2623]">
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
            <div className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-sm uppercase tracking-wider text-[#D12126] mb-3">{t.name}</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => update('name', e.target.value)}
                    placeholder={t.namePh}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-sm uppercase tracking-wider text-[#D12126] mb-3">{t.email}</label>
                  <input
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
                  <label className="block text-sm uppercase tracking-wider text-[#D12126] mb-3">{t.phone}</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => update('phone', e.target.value)}
                    placeholder={t.phonePh}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-sm uppercase tracking-wider text-[#D12126] mb-3">{t.interest}</label>
                  <select
                    value={form.interest || interests[0]}
                    onChange={(e) => update('interest', e.target.value)}
                    className={`${inputClass} [&>option]:text-[#2A2623]`}
                  >
                    {interests.map((i) => (
                      <option key={i} value={i}>{i}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm uppercase tracking-wider text-[#D12126] mb-3">{t.message}</label>
                <textarea
                  rows={4}
                  value={form.message}
                  onChange={(e) => update('message', e.target.value)}
                  placeholder={t.messagePh}
                  className={`${inputClass} resize-none`}
                />
              </div>

              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="px-12 py-4 bg-[#D12126] text-white text-sm uppercase tracking-wider hover:bg-[#A3181C] transition-colors disabled:opacity-60"
              >
                {submitting ? t.submitting : t.submit}
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
