import { motion } from 'motion/react';

const sections = [
  { id: 'information-we-collect', title: 'Information We Collect' },
  { id: 'how-we-use-information', title: 'How We Use Your Information' },
  { id: 'sharing-and-disclosure', title: 'Sharing and Disclosure' },
  { id: 'data-security', title: 'Data Security' },
  { id: 'your-rights', title: 'Your Rights' },
  { id: 'contact', title: 'Contact Us' },
];

export function PrivacyPolicyPage() {
  return (
    <>
      <section id="hero" className="py-20 lg:py-28 bg-[#0F0F0F] text-white">
        <div className="max-w-[900px] mx-auto px-6 lg:px-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-sm uppercase tracking-wider text-[#A88F5C] mb-8">Legal</p>
            <h1 className="serif text-5xl lg:text-6xl mb-6 leading-tight">Privacy Policy</h1>
            <p className="text-[#EAE3D2]">Last updated: {new Date().getFullYear()}</p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-[900px] mx-auto px-6 lg:px-12">
          <p className="text-lg text-[#707070] leading-relaxed mb-12">
            HiLink Vietnam respects your privacy and is committed to protecting the personal data you
            share with us. This policy explains what we collect and how we use it. Final legal wording
            is pending review by counsel before publication.
          </p>
          <div className="space-y-12">
            {sections.map((s) => (
              <div key={s.id} id={s.id}>
                <h2 className="serif text-3xl mb-4">{s.title}</h2>
                <p className="text-[#707070] leading-relaxed">
                  Content for this section will be provided by HiLink. It will describe our practices
                  regarding {s.title.toLowerCase()} in clear, plain language.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
