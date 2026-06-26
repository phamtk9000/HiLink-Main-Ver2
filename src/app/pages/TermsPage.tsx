import { motion } from 'motion/react';

const sections = [
  { id: 'acceptance', title: 'Acceptance of Terms' },
  { id: 'use-of-services', title: 'Use of Our Services' },
  { id: 'engagements', title: 'Engagements and Agreements' },
  { id: 'intellectual-property', title: 'Intellectual Property' },
  { id: 'liability', title: 'Limitation of Liability' },
  { id: 'governing-law', title: 'Governing Law' },
  { id: 'contact', title: 'Contact Us' },
];

export function TermsPage() {
  return (
    <>
      <section id="hero" className="py-20 lg:py-28 bg-[#0F0F0F] text-white">
        <div className="max-w-[900px] mx-auto px-6 lg:px-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-sm uppercase tracking-wider text-[#A88F5C] mb-8">Legal</p>
            <h1 className="serif text-5xl lg:text-6xl mb-6 leading-tight">Terms and Conditions</h1>
            <p className="text-[#EAE3D2]">Last updated: {new Date().getFullYear()}</p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-[900px] mx-auto px-6 lg:px-12">
          <p className="text-lg text-[#707070] leading-relaxed mb-12">
            These terms govern your use of the HiLink website and services. Please read them carefully.
            Final legal wording is pending review by counsel before publication.
          </p>
          <div className="space-y-12">
            {sections.map((s) => (
              <div key={s.id} id={s.id}>
                <h2 className="serif text-3xl mb-4">{s.title}</h2>
                <p className="text-[#707070] leading-relaxed">
                  Content for this section will be provided by HiLink. It will set out the terms relating
                  to {s.title.toLowerCase()} in clear, plain language.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
