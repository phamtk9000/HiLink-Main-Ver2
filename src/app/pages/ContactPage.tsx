import { useState } from 'react';
import { Mail, Phone, MapPin, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { HeroBg } from '../components/HeroBg';

const services = [
  'Property Management',
  'Workspace Leasing',
  'Business Consulting',
  'Concierge Services',
  'Industrial & Logistics',
  'Other',
];

export function ContactPage() {
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
    'w-full px-6 py-4 bg-white border border-[#0F0F0F]/10 focus:outline-none focus:border-[#A88F5C] transition-colors text-[#0F0F0F] placeholder:text-[#0F0F0F]/30';

  return (
    <>
      <section className="relative overflow-hidden py-24 lg:py-32 bg-[#0F0F0F] text-white">
        <HeroBg image="/workspace-photos/a665b9317ac3b0e14261cf4defef0b33e698271d-4580x6107.avif" />
        <div className="relative z-10 max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="max-w-4xl">
            <p className="text-sm uppercase tracking-wider text-[#A88F5C] mb-8">Get in Touch</p>
            <h1 className="serif text-5xl lg:text-7xl mb-8 leading-tight">
              Let's Start a Conversation
            </h1>
            <p className="text-xl text-[#EAE3D2] leading-relaxed">
              Tell us about your needs. We respond within 24 hours.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32 bg-[#F8F6F1]">
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
                  <CheckCircle size={48} className="text-[#A88F5C] mb-6" />
                  <h2 className="serif text-3xl mb-4">Message Received</h2>
                  <p className="text-[#707070] max-w-md">
                    Thank you for reaching out. A member of our team will respond within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="firstName" className="block mb-3 text-sm uppercase tracking-wider">
                        First Name *
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
                        Last Name *
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
                        Email *
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
                        Phone
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
                        Company
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
                        Service
                      </label>
                      <select
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className={inputClass}
                      >
                        <option value="">Select a service</option>
                        {services.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block mb-3 text-sm uppercase tracking-wider">
                      Message *
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
                    className="px-12 py-4 bg-[#0F0F0F] text-white text-sm uppercase tracking-wider hover:bg-[#A88F5C] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Sending…' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>

            {/* Contact info */}
            <div className="lg:col-span-5 space-y-12">
              <div>
                <h3 className="serif text-2xl mb-8">Contact Information</h3>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <Mail size={20} className="text-[#A88F5C] shrink-0 mt-1" />
                    <div>
                      <p className="text-xs uppercase tracking-wider text-[#707070] mb-1">Email</p>
                      <a href="mailto:contact@hilink.vn" className="hover:text-[#A88F5C] transition-colors">
                        contact@hilink.vn
                      </a>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Phone size={20} className="text-[#A88F5C] shrink-0 mt-1" />
                    <div>
                      <p className="text-xs uppercase tracking-wider text-[#707070] mb-1">Phone</p>
                      <a href="tel:+842422029000" className="hover:text-[#A88F5C] transition-colors">
                        (+84) 24 2202 9000
                      </a>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <MapPin size={20} className="text-[#A88F5C] shrink-0 mt-1" />
                    <div>
                      <p className="text-xs uppercase tracking-wider text-[#707070] mb-1">Office</p>
                      <address className="not-italic text-[#333] leading-relaxed">
                        Tầng 15 số 4 Tôn Thất Tùng,<br />
                        Đống Đa, Hà Nội, Việt Nam
                      </address>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-[#0F0F0F]/10 pt-12">
                <p className="text-xs uppercase tracking-wider text-[#707070] mb-4">Response Time</p>
                <p className="text-[#333] leading-relaxed">
                  We respond to all enquiries within 24 hours during business days. For urgent matters, please call directly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
