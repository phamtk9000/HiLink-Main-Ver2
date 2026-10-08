import { useState } from 'react';
import { Mail, Phone, MapPin, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { HeroBg } from '../components/HeroBg';
import { CONTACT } from '../data/site';
import { useLang, usePageMeta } from '../lib/i18n';

const T = {
  en: {
    meta: 'Contact HiLink — email contact@hilink.vn or call (+84) 24 2202 9000.',
    eyebrow: 'Get in Touch', title: "Let's Start a Conversation", lead: 'Tell us about your needs. We respond within 24 hours.',
    services: ['Property Management', 'Workspace Leasing', 'Business Consulting', 'Concierge Services', 'Industrial & Logistics', 'Other'],
    sentTitle: 'Message Received', sentBody: 'Thank you for reaching out. A member of our team will respond within 24 hours.',
    first: 'First Name *', last: 'Last Name *', email: 'Email *', phone: 'Phone', company: 'Company', service: 'Service', select: 'Select a service', message: 'Message *',
    sending: 'Sending…', send: 'Send Message',
    info: 'Contact Information', emailLbl: 'Email', phoneLbl: 'Phone', office: 'Office',
    respTitle: 'Response Time', resp: 'We respond to all enquiries within 24 hours during business days. For urgent matters, please call directly.',
  },
  vi: {
    meta: 'Liên hệ HiLink — email contact@hilink.vn hoặc gọi (+84) 24 2202 9000.',
    eyebrow: 'Liên hệ', title: 'Hãy bắt đầu trao đổi', lead: 'Cho chúng tôi biết nhu cầu của bạn. Chúng tôi phản hồi trong vòng 24 giờ.',
    services: ['Quản lý bất động sản', 'Cho thuê văn phòng', 'Tư vấn doanh nghiệp', 'Dịch vụ concierge', 'Công nghiệp & logistics', 'Khác'],
    sentTitle: 'Đã nhận lời nhắn', sentBody: 'Cảm ơn bạn đã liên hệ. Một thành viên đội ngũ sẽ phản hồi trong vòng 24 giờ.',
    first: 'Tên *', last: 'Họ *', email: 'Email *', phone: 'Số điện thoại', company: 'Công ty', service: 'Dịch vụ', select: 'Chọn dịch vụ', message: 'Lời nhắn *',
    sending: 'Đang gửi…', send: 'Gửi lời nhắn',
    info: 'Thông tin liên hệ', emailLbl: 'Email', phoneLbl: 'Điện thoại', office: 'Văn phòng',
    respTitle: 'Thời gian phản hồi', resp: 'Chúng tôi phản hồi mọi yêu cầu trong vòng 24 giờ vào ngày làm việc. Với việc gấp, vui lòng gọi trực tiếp.',
  },
};

export function ContactPage() {
  const { lang } = useLang();
  const t = T[lang];
  usePageMeta(t.eyebrow, t.meta);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1400));
    setIsSubmitting(false);
    setSubmitted(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const inputClass =
    'w-full px-6 py-4 bg-white border border-[#2A2623]/10 focus:outline-none focus:border-[#D12126] transition-colors text-[#2A2623] placeholder:text-[#2A2623]/30';

  return (
    <>
      <section className="relative overflow-hidden py-24 lg:py-32 bg-[#361716] text-white">
        <HeroBg image="/photos/f15-reception.webp" />
        <div className="relative z-10 max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="max-w-4xl">
            <p className="text-sm uppercase tracking-wider text-[#F06A6E] mb-8">{t.eyebrow}</p>
            <h1 className="serif text-5xl lg:text-7xl mb-8 leading-tight">
              {t.title}
            </h1>
            <p className="text-xl text-[#E9E3DA] leading-relaxed">
              {t.lead}
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32 bg-[#F4F0EA]">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-24">
            {/* Form */}
            <div className="lg:col-span-7">
              {submitted ? (
                <motion.div
                  className="flex flex-col items-center justify-center py-24 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <CheckCircle size={48} className="text-[#D12126] mb-6" />
                  <h2 className="serif text-3xl mb-4">{t.sentTitle}</h2>
                  <p className="text-[#6B645D] max-w-md">
                    {t.sentBody}
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="firstName" className="block mb-3 text-sm uppercase tracking-wider">
                        {t.first}
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        required
                        value={formData.firstName}
                        onChange={handleChange}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block mb-3 text-sm uppercase tracking-wider">
                        {t.last}
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        required
                        value={formData.lastName}
                        onChange={handleChange}
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="email" className="block mb-3 text-sm uppercase tracking-wider">
                        {t.email}
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block mb-3 text-sm uppercase tracking-wider">
                        {t.phone}
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="company" className="block mb-3 text-sm uppercase tracking-wider">
                        {t.company}
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label htmlFor="service" className="block mb-3 text-sm uppercase tracking-wider">
                        {t.service}
                      </label>
                      <select
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className={inputClass}
                      >
                        <option value="">{t.select}</option>
                        {t.services.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block mb-3 text-sm uppercase tracking-wider">
                      {t.message}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      className={inputClass + ' resize-none'}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-12 py-4 bg-[#361716] text-white text-sm uppercase tracking-wider hover:bg-[#D12126] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? t.sending : t.send}
                  </button>
                </form>
              )}
            </div>

            {/* Contact info */}
            <div className="lg:col-span-5 space-y-12">
              <div>
                <h3 className="serif text-2xl mb-8">{t.info}</h3>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <Mail size={20} className="text-[#D12126] shrink-0 mt-1" />
                    <div>
                      <p className="text-xs uppercase tracking-wider text-[#6B645D] mb-1">{t.emailLbl}</p>
                      <a href={CONTACT.emailHref} className="hover:text-[#D12126] transition-colors">
                        {CONTACT.email}
                      </a>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Phone size={20} className="text-[#D12126] shrink-0 mt-1" />
                    <div>
                      <p className="text-xs uppercase tracking-wider text-[#6B645D] mb-1">{t.phoneLbl}</p>
                      <a href={CONTACT.phoneHref} className="hover:text-[#D12126] transition-colors">
                        {CONTACT.phone}
                      </a>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <MapPin size={20} className="text-[#D12126] shrink-0 mt-1" />
                    <div>
                      <p className="text-xs uppercase tracking-wider text-[#6B645D] mb-1">{t.office}</p>
                      <address className="not-italic text-[#333] leading-relaxed">
                        {CONTACT.address[lang]}
                      </address>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-[#2A2623]/10 pt-12">
                <p className="text-xs uppercase tracking-wider text-[#6B645D] mb-4">{t.respTitle}</p>
                <p className="text-[#333] leading-relaxed">
                  {t.resp}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
