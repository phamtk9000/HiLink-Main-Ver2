import { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

const interests = [
  'Property Management',
  'Workspace Leasing',
  'Business Services',
  'Concierge Services',
  'Industrial & Logistics',
  'Something else',
];

export function BookConsultationPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', interest: interests[0], message: '' });
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
    'w-full bg-transparent border-b border-white/30 py-3 text-white placeholder-white/40 focus:border-[#A88F5C] focus:outline-none transition-colors';

  return (
    <>
      {/* Hero */}
      <section id="hero" className="py-20 lg:py-28 bg-[#0F0F0F] text-white">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <p className="text-sm uppercase tracking-wider text-[#A88F5C] mb-8">Book Consultation</p>
            <h1 className="serif text-5xl lg:text-7xl mb-8 leading-tight">
              Let’s talk about your goals
            </h1>
            <p className="text-xl text-[#EAE3D2] leading-relaxed">
              Share a few details and one of our advisors will be in touch to arrange a consultation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form */}
      <section id="consultation-form" className="py-20 lg:py-28 bg-[#0F0F0F] text-white">
        <div className="max-w-[800px] mx-auto px-6 lg:px-12">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <CheckCircle2 size={56} className="text-[#A88F5C] mx-auto mb-8" />
              <h2 className="serif text-4xl mb-4">Thank you</h2>
              <p className="text-xl text-[#EAE3D2]">
                We have received your request and will contact you shortly.
              </p>
            </motion.div>
          ) : (
            <div className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-sm uppercase tracking-wider text-[#A88F5C] mb-3">Full Name</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => update('name', e.target.value)}
                    placeholder="Your name"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-sm uppercase tracking-wider text-[#A88F5C] mb-3">Email Address</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => update('email', e.target.value)}
                    placeholder="Your email"
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-sm uppercase tracking-wider text-[#A88F5C] mb-3">Phone Number</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => update('phone', e.target.value)}
                    placeholder="Your phone number"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-sm uppercase tracking-wider text-[#A88F5C] mb-3">I’m interested in</label>
                  <select
                    value={form.interest}
                    onChange={(e) => update('interest', e.target.value)}
                    className={`${inputClass} [&>option]:text-[#0F0F0F]`}
                  >
                    {interests.map((i) => (
                      <option key={i} value={i}>{i}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm uppercase tracking-wider text-[#A88F5C] mb-3">Message</label>
                <textarea
                  rows={4}
                  value={form.message}
                  onChange={(e) => update('message', e.target.value)}
                  placeholder="Tell us a little about what you need"
                  className={`${inputClass} resize-none`}
                />
              </div>

              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="px-12 py-4 bg-[#A88F5C] text-white text-sm uppercase tracking-wider hover:bg-[#EAE3D2] hover:text-[#0F0F0F] transition-colors disabled:opacity-60"
              >
                {submitting ? 'Submitting…' : 'Request Consultation'}
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
