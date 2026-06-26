import { Heart, GraduationCap, Globe2, Mail, Sparkles, Users, Scale, Compass, ArrowRight, MapPin, Clock } from 'lucide-react';
import { motion } from 'motion/react';
import { HeroBg } from '../components/HeroBg';

const P = '/workspace-photos';

const values = [
  { icon: <Heart size={26} />, title: 'People first', description: 'We invest in our team with mentorship, ownership, and a culture of genuine care.' },
  { icon: <GraduationCap size={26} />, title: 'Room to grow', description: 'Clear progression and exposure across property, workspace, and advisory work.' },
  { icon: <Globe2 size={26} />, title: 'International by nature', description: 'Work across Vietnamese and global contexts with clients from around the world.' },
  { icon: <Sparkles size={26} />, title: 'Pride in the detail', description: 'We sweat the small things — because that is what separates good from exceptional.' },
  { icon: <Scale size={26} />, title: 'Transparency', description: 'Honest communication, fair decisions, and no politics — with each other and our clients.' },
  { icon: <Compass size={26} />, title: 'Ownership', description: 'We give people real responsibility early and the trust to run with it.' },
];

const benefits = [
  'Competitive salary & performance bonuses',
  'Private health insurance',
  'Annual learning & certification budget',
  'Premium HiLink workspace access',
  'Hybrid & flexible working',
  '15+ days annual leave & Tet bonus',
  'Team retreats & quarterly socials',
  'Clear, structured career progression',
];

const teams = [
  { title: 'Property Operations', desc: 'Asset managers, leasing specialists, and maintenance coordinators who keep portfolios performing.' },
  { title: 'Workspace & Community', desc: 'Front-of-house, community, and hospitality teams creating the HiLink experience every day.' },
  { title: 'Advisory & Business Services', desc: 'Consultants, accountants, and legal specialists guiding international clients into Vietnam.' },
  { title: 'Marketing & Studio', desc: 'Strategists, content, and creative producers shaping the HiLink brand and campaigns.' },
];

const hiring = [
  { step: '01', title: 'Application', desc: 'Send your CV and a short note. We read every one.' },
  { step: '02', title: 'Intro call', desc: 'A relaxed conversation to learn about you and share more about us.' },
  { step: '03', title: 'Team interview', desc: 'Meet the people you would work with and dig into the role.' },
  { step: '04', title: 'Offer & welcome', desc: 'A clear offer and a structured onboarding from day one.' },
];

const gallery = [
  `${P}/487a452a78187b29fe238538199927e819f5b150-4501x6130.avif`,
  `${P}/9a14157465692369d4ceb0727313b5f1dd56d2cd-6500x4334.avif`,
  `${P}/e3356eda275930ce1c6f14429c514ddf996312ae-5342x7123.avif`,
  `${P}/c7b0fcf2692da34e051136c7476183cc9967a4a4-6287x5202.avif`,
  `${P}/a665b9317ac3b0e14261cf4defef0b33e698271d-4580x6107.avif`,
  `${P}/7a4923f30fa4e9b7abdb461ac56a404f2824d011-7783x5191.avif`,
];

export function CareersPage() {
  return (
    <>
      {/* Hero */}
      <section id="hero" className="relative overflow-hidden min-h-[72vh] flex items-end bg-[#0F0F0F] text-white">
        <HeroBg image={`${P}/9df347136e8467636fcc2e51a072f148ca018ad7-5650x6643.avif`} />
        <div className="relative z-10 max-w-[1600px] mx-auto px-6 lg:px-12 py-20 lg:py-28 w-full">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-4xl">
            <p className="text-[11px] uppercase tracking-[0.3em] text-[#C9A55A] mb-7 flex items-center gap-3">
              <span className="w-8 h-px bg-[#C9A55A]" /> Careers
            </p>
            <h1 className="serif text-5xl lg:text-[5rem] mb-8 leading-[0.98]">Build a career<br />with HiLink</h1>
            <p className="text-lg md:text-xl text-[#EAE3D2]/90 leading-relaxed max-w-2xl">
              We are a team of operators, advisors, and hospitality professionals raising the standard
              of property services in Vietnam — and we are growing.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stat band */}
      <section className="bg-[#0F0F0F] text-white border-t border-white/10">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/10">
          {[['40+', 'Team members'], ['8', 'Countries served'], ['12+', 'Years of growth'], ['2', 'Hanoi campuses']].map(([n, l]) => (
            <div key={l} className="bg-[#0F0F0F] py-10 px-6 text-center">
              <div className="serif text-4xl lg:text-5xl text-[#C9A55A] mb-2">{n}</div>
              <div className="text-[11px] uppercase tracking-[0.18em] text-white/60">{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Life at HiLink — gallery */}
      <section className="py-24 lg:py-32 bg-[#F8F6F1]">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14">
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-[#A88F5C] mb-5">Life at HiLink</p>
              <h2 className="serif text-4xl lg:text-5xl leading-tight">Where we spend our days</h2>
            </div>
            <p className="text-[15px] text-[#707070] max-w-sm">
              Our teams work from light-filled HiLink spaces in the heart of Hanoi — designed to make great work feel effortless.
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {gallery.map((src, i) => (
              <motion.div
                key={src}
                className={`relative overflow-hidden ${i === 0 ? 'col-span-2 lg:col-span-2 aspect-[16/10]' : 'aspect-[4/3]'}`}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ delay: (i % 3) * 0.08, duration: 0.5 }}
              >
                <img src={src} alt="Life at HiLink" loading="lazy" className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why join — values */}
      <section id="why-join" className="py-24 lg:py-32 bg-white">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#A88F5C] mb-5">What it's like</p>
            <h2 className="serif text-4xl lg:text-5xl">Why join us</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#0F0F0F]/10">
            {values.map((v) => (
              <div key={v.title} className="bg-white p-8 lg:p-10 hover:bg-[#F8F6F1] transition-colors">
                <div className="text-[#A88F5C] mb-5">{v.icon}</div>
                <h3 className="serif text-2xl mb-3">{v.title}</h3>
                <p className="text-[#707070] leading-relaxed text-[15px]">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits + feature image */}
      <section className="py-24 lg:py-32 bg-[#0F0F0F] text-white">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="relative aspect-[4/3] overflow-hidden">
            <img src={`${P}/487a452a78187b29fe238538199927e819f5b150-4501x6130.avif`} alt="HiLink team" className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#C9A55A] mb-5">Benefits</p>
            <h2 className="serif text-4xl lg:text-5xl mb-10 leading-tight">We look after our people</h2>
            <ul className="grid sm:grid-cols-2 gap-y-4 gap-x-8">
              {benefits.map((b) => (
                <li key={b} className="flex items-start gap-3 text-[15px] text-[#EAE3D2]">
                  <span className="w-1.5 h-1.5 bg-[#A88F5C] rounded-full mt-2.5 flex-shrink-0" />
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Teams */}
      <section className="py-24 lg:py-32 bg-[#F8F6F1]">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#A88F5C] mb-5">Where you fit</p>
            <h2 className="serif text-4xl lg:text-5xl">Teams at HiLink</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-px bg-[#0F0F0F]/10">
            {teams.map((t) => (
              <div key={t.title} className="bg-[#F8F6F1] p-8 lg:p-12">
                <h3 className="serif text-2xl mb-3">{t.title}</h3>
                <p className="text-[#707070] leading-relaxed">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How we hire */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="mb-14 max-w-2xl">
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#A88F5C] mb-5">How we hire</p>
            <h2 className="serif text-4xl lg:text-5xl leading-tight">A clear, respectful process</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#0F0F0F]/10">
            {hiring.map((h) => (
              <div key={h.step} className="bg-white p-8 lg:p-10">
                <span className="serif text-3xl text-[#A88F5C]">{h.step}</span>
                <h3 className="serif text-xl mt-4 mb-3">{h.title}</h3>
                <p className="text-[#707070] text-[14px] leading-relaxed">{h.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open positions */}
      <section id="open-positions" className="relative overflow-hidden py-24 lg:py-32 bg-[#0F0F0F] text-white">
        <img src={`${P}/c7b0fcf2692da34e051136c7476183cc9967a4a4-6287x5202.avif`} alt="" className="absolute inset-0 w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-[#0F0F0F]/70" />
        <div className="relative z-10 max-w-[1600px] mx-auto px-6 lg:px-12 text-center">
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#C9A55A] mb-5 flex items-center justify-center gap-3">
            <Clock size={13} /> Always open to great people
          </p>
          <h2 className="serif text-4xl lg:text-5xl mb-6">Open positions</h2>
          <p className="text-xl text-[#EAE3D2]/90 mb-4 max-w-2xl mx-auto">
            We do not have specific roles posted right now, but we are always glad to hear from exceptional people.
            Send your CV and tell us how you would like to contribute.
          </p>
          <p className="text-[12px] uppercase tracking-[0.16em] text-white/50 mb-12 flex items-center justify-center gap-2">
            <MapPin size={13} /> Hà Nội · Hybrid
          </p>
          <a href="mailto:careers@hilink.vn" className="group inline-flex items-center gap-2 px-12 py-4 bg-[#A88F5C] text-white text-[12px] uppercase tracking-[0.16em] hover:bg-[#EAE3D2] hover:text-[#0F0F0F] transition-colors">
            <Mail size={16} /> careers@hilink.vn
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </section>
    </>
  );
}
