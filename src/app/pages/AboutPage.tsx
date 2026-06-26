import { Link } from 'react-router';
import { ArrowRight, X, Linkedin, Mail, Target, Compass, Quote } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

// ── Milestones ───────────────────────────────────────────────────────────────
const milestones = [
  { year: '2014', title: 'HiLink Founded', desc: 'Launched in Hanoi as a boutique property management firm serving international landlords.' },
  { year: '2017', title: 'Workspace Division', desc: 'Opened our first premium workspace location, expanding beyond residential management.' },
  { year: '2020', title: 'Business Advisory', desc: 'Added market-entry and corporate advisory services for foreign enterprises.' },
  { year: '2023', title: 'Regional Reach', desc: 'Grew to serve clients across 8 countries with a 40+ strong bilingual team.' },
  { year: '2025', title: 'Concierge & Beyond', desc: 'Launched dedicated concierge services and began developing our owner dashboard platform.' },
];

// ── Notable projects ─────────────────────────────────────────────────────────
const notableProjects = [
  { name: 'The Metropolitan', location: 'Ba Dinh, Hanoi', tag: 'Premium Residential', image: 'https://images.unsplash.com/photo-1774685110718-c5b4fe026144?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&q=80' },
  { name: 'Skyline Tower', location: 'District 1, HCMC', tag: 'Mixed-Use Development', image: 'https://images.unsplash.com/photo-1741317228370-fc25f460cc57?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&q=80' },
  { name: 'Vista Residences', location: 'Tay Ho, Hanoi', tag: 'Luxury Apartments', image: 'https://images.unsplash.com/photo-1768223933860-6d62bc5b2ff3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&q=80' },
];

// ── Testimonials ─────────────────────────────────────────────────────────────
const aboutTestimonials = [
  { quote: 'HiLink combined local expertise with international standards we could actually rely on. They became a genuine extension of our team in Vietnam.', author: 'James Morrison', role: 'CEO, Morrison Capital Partners' },
  { quote: 'As an offshore investor, their transparency and proactive communication gave me complete peace of mind. My properties have never performed better.', author: 'Sophie Chen', role: 'Principal, Chen Family Office' },
  { quote: 'From market entry to day-to-day operations, HiLink guided us at every step. Their advisory team is exceptional.', author: 'David Zhang', role: 'Managing Director, Apex Investments' },
];

// ── Team data ────────────────────────────────────────────────────────────────
const team = [
  {
    name: 'Nguyen Thanh Linh',
    role: 'Chief Executive Officer',
    nationality: 'Vietnamese',
    languages: 'Vietnamese · English · French',
    bio: 'With over 18 years in Vietnam\'s real estate sector, Linh founded HiLink with a vision to bridge international capital with local expertise. Previously Head of Residential at CBRE Vietnam, she has personally overseen transactions exceeding $500M across Southeast Asia.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80',
    expertise: ['Portfolio Strategy', 'International Clients', 'Asset Optimisation'],
  },
  {
    name: 'Michael Tran',
    role: 'Head of Property Management',
    nationality: 'Vietnamese-Australian',
    languages: 'Vietnamese · English',
    bio: 'Michael leads HiLink\'s property management division, overseeing a portfolio of 150+ residential and commercial assets. His background in Australian property law and deep roots in Hanoi\'s expat community make him uniquely positioned to serve international landlords.',
    image: 'https://images.unsplash.com/photo-1556157382-97eda2f9e2bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80',
    expertise: ['Asset Management', 'Tenant Relations', 'Legal Compliance'],
  },
  {
    name: 'Sophie Chen',
    role: 'Director of Workspace Leasing',
    nationality: 'Singaporean',
    languages: 'Mandarin · English · Vietnamese',
    bio: 'Sophie brings 12 years of commercial real estate experience across Singapore, Hong Kong, and Vietnam. She spearheaded HiLink\'s workspace expansion, growing the portfolio from 2 to 6 premium locations in under three years.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80',
    expertise: ['Commercial Leasing', 'Workspace Design', 'Business Development'],
  },
  {
    name: 'David Zhang',
    role: 'Head of Business Advisory',
    nationality: 'Chinese-British',
    languages: 'Mandarin · English · Vietnamese',
    bio: 'David advises international companies on market entry, business registration, and investment structuring in Vietnam. A former Deloitte consultant with an MBA from London Business School, he has guided over 80 foreign enterprises into the Vietnamese market.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80',
    expertise: ['Market Entry', 'Investment Structuring', 'Corporate Advisory'],
  },
  {
    name: 'Anna Pham',
    role: 'Head of Concierge Services',
    nationality: 'Vietnamese',
    languages: 'Vietnamese · English · Japanese',
    bio: 'Anna built HiLink\'s concierge offering from the ground up, drawing on her background in luxury hospitality at Park Hyatt and Rosewood Hanoi. She ensures every international client receives personalised, five-star support from arrival to long-term residency.',
    image: 'https://images.unsplash.com/photo-1598550874175-4d0ef436c909?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80',
    expertise: ['Relocation', 'Lifestyle Management', 'VIP Client Relations'],
  },
  {
    name: 'Thomas Le',
    role: 'Chief Financial Officer',
    nationality: 'Vietnamese-French',
    languages: 'Vietnamese · French · English',
    bio: 'Thomas oversees HiLink\'s financial operations and client reporting infrastructure. A chartered accountant with Big Four experience across Paris and Hanoi, he designed the firm\'s GDPR-compliant, real-time owner portal system.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80',
    expertise: ['Financial Reporting', 'GDPR Compliance', 'Owner Portals'],
  },
];

// ── Partner logos (text-based — replace with real logo images when available) ─
const partners = [
  'CBRE', 'Savills', 'JLL', 'Knight Frank', 'Colliers',
  'Deloitte', 'PwC', 'KPMG', 'Baker McKenzie', 'Indochina Capital',
];

// ── Member modal ─────────────────────────────────────────────────────────────
function MemberModal({ member, onClose }: {
  member: typeof team[0];
  onClose: () => void;
}) {
  return (
    <motion.div
      className="fixed inset-0 z-[500] flex items-center justify-center p-4 lg:p-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-[#0F0F0F]/80 backdrop-blur-sm" />

      {/* Panel */}
      <motion.div
        className="relative z-10 bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 16 }}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-10 p-2 hover:text-[#A88F5C] transition-colors"
        >
          <X size={20} />
        </button>

        <div className="grid lg:grid-cols-[280px_1fr]">
          {/* Photo */}
          <div className="relative aspect-[3/4] lg:aspect-auto overflow-hidden bg-[#EAE3D2]">
            <img
              src={member.image}
              alt={member.name}
              className="w-full h-full object-cover object-top"
            />
          </div>

          {/* Info */}
          <div className="p-8 lg:p-10">
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#A88F5C] mb-4">{member.role}</p>
            <h2 className="serif text-3xl mb-1">{member.name}</h2>
            <p className="text-[13px] text-[#707070] mb-6">{member.nationality} · {member.languages}</p>

            <div className="w-8 h-px bg-[#A88F5C]/40 mb-6" />

            <p className="text-[15px] text-[#444] leading-[1.85] mb-8">{member.bio}</p>

            {/* Expertise tags */}
            <div className="mb-8">
              <p className="text-[10px] uppercase tracking-[0.25em] text-[#707070] mb-3">Areas of Expertise</p>
              <div className="flex flex-wrap gap-2">
                {member.expertise.map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-1.5 border border-[#A88F5C]/30 text-[11px] uppercase tracking-wider text-[#555]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <Link
              to="/contact"
              onClick={onClose}
              className="inline-flex items-center gap-3 group"
            >
              <span className="text-[11px] uppercase tracking-[0.2em] text-[#0F0F0F] relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#A88F5C] group-hover:after:w-full after:transition-all after:duration-300">
                Get in Touch
              </span>
              <ArrowRight size={14} className="text-[#A88F5C] group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────
export function AboutPage() {
  const [selectedMember, setSelectedMember] = useState<typeof team[0] | null>(null);

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-screen bg-[#0F0F0F] flex flex-col">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="/workspace-photos/BG_Hanoi.avif"
            alt="HiLink Hanoi"
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="relative flex-1 flex flex-col items-center justify-center text-center px-6 lg:px-12">
          <p className="text-[11px] uppercase tracking-[0.3em] text-[#A88F5C] mb-8">
            Est. 2014 · Hanoi, Vietnam
          </p>
          <h1
            className="serif text-white max-w-5xl leading-[1.05]"
            style={{ fontSize: 'clamp(4rem, 8vw, 8rem)', fontWeight: 300 }}
          >
            Building Bridges Between Vision and Reality
          </h1>
        </div>
        <div className="relative pb-12 flex flex-col items-center gap-4">
          <div className="w-px h-12 bg-white/20" />
          <p className="text-[10px] uppercase tracking-[0.25em] text-white/40">Scroll to discover</p>
        </div>
      </section>

      {/* Story */}
      <section className="bg-white py-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
            {/* Left — image + pull-quote */}
            <div className="lg:w-[35%]">
              <div className="lg:sticky lg:top-32 space-y-8">
                {/* Portrait image */}
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1651666176094-2bef8442db12?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjBidWlsZGluZyUyMGFyY2hpdGVjdHVyZXxlbnwxfHx8fDE3NzU2NTQyMTF8MA&ixlib=rb-4.1.0&q=80&w=800"
                    alt="HiLink office"
                    className="w-full h-full object-cover"
                  />
                  {/* Gold accent bar */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#A88F5C]" />
                </div>
                {/* Pull-quote below image */}
                <div>
                  <blockquote
                    className="serif italic text-[#A88F5C] leading-snug"
                    style={{ fontSize: 'clamp(1.3rem, 2vw, 1.7rem)' }}
                  >
                    "We bridge local depth with global standards."
                  </blockquote>
                  <div className="mt-6 w-8 h-px bg-[#A88F5C]/40" />
                </div>
              </div>
            </div>
            <div className="lg:w-[65%]">
              <div className="space-y-7 text-[17px] text-[#444] leading-[1.85] mb-16">
                <p>
                  HiLink Vietnam was founded with a clear mission: to provide world-class real estate services that meet the exacting standards of international clients operating in Southeast Asia. Since 2014, we have been the trusted partner for those seeking excellence in Vietnam's real estate market.
                </p>
                <p>
                  Over the past decade, we've grown from a boutique property management firm into a comprehensive ecosystem of services — spanning asset management, workspace solutions, and business advisory. What sets us apart is our deep understanding of both Vietnamese market dynamics and international business culture.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-x-10 gap-y-8">
                {[
                  { value: '2014', label: 'Year Founded' },
                  { value: 'Hanoi', label: 'Headquarters' },
                  { value: '8 Countries', label: 'Markets Served' },
                  { value: '40+ Professionals', label: 'Team Size' },
                ].map(({ value, label }) => (
                  <div key={label} className="border-t pt-5" style={{ borderColor: 'rgba(168,143,92,0.3)' }}>
                    <div className="serif text-2xl text-[#8B6914] mb-2">{value}</div>
                    <div className="text-[11px] uppercase tracking-wider text-[#707070]">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="bg-[#0F0F0F] py-32 text-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-2 gap-px bg-white/10">
            <div className="bg-[#0F0F0F] p-10 lg:p-14">
              <div className="text-[#A88F5C] mb-8"><Compass size={32} /></div>
              <p className="text-[11px] uppercase tracking-[0.3em] text-[#A88F5C] mb-5">Our Vision</p>
              <h2 className="serif text-3xl lg:text-4xl mb-6 leading-snug">
                To be the most trusted name in Vietnamese real estate for international clients.
              </h2>
              <p className="text-[#EAE3D2] text-[16px] leading-relaxed">
                We envision a market where cross-border investment is seamless, transparent, and built on lasting partnerships — with HiLink as the bridge between global ambition and local opportunity.
              </p>
            </div>
            <div className="bg-[#0F0F0F] p-10 lg:p-14">
              <div className="text-[#A88F5C] mb-8"><Target size={32} /></div>
              <p className="text-[11px] uppercase tracking-[0.3em] text-[#A88F5C] mb-5">Our Mission</p>
              <h2 className="serif text-3xl lg:text-4xl mb-6 leading-snug">
                To deliver world-class service that meets the exacting standards of global clients.
              </h2>
              <p className="text-[#EAE3D2] text-[16px] leading-relaxed">
                Through deep market knowledge, bilingual expertise, and a concierge approach, we protect and grow our clients' assets while removing the friction of operating in a new market.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-[#F8F6F1] py-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <p className="text-[11px] uppercase tracking-[0.3em] text-[#A88F5C] mb-16">What We Stand For</p>
          <div className="divide-y divide-[#0F0F0F]/10">
            {[
              { num: '01', title: 'Transparency', desc: 'Clear reporting, honest communication, and full visibility into every aspect of your asset management.' },
              { num: '02', title: 'Excellence', desc: 'We set the highest standards in client service, property management, and business advisory — without exception.' },
              { num: '03', title: 'Partnership', desc: 'Your success is our success. We work alongside you as a trusted long-term partner, not just a service provider.' },
              { num: '04', title: 'Discretion', desc: 'International clients trust us with their most sensitive assets. We treat that trust with the utmost care and confidentiality.' },
            ].map(({ num, title, desc }) => (
              <div key={num} className="flex items-start gap-8 py-10">
                <span className="serif font-light text-[#0F0F0F]/[0.07] leading-none select-none shrink-0 hidden lg:block" style={{ fontSize: '80px' }}>
                  {num}
                </span>
                <div className="flex-1 lg:pt-4">
                  <h3 className="serif text-3xl mb-3">{title}</h3>
                  <p className="text-[#707070] text-[16px] leading-relaxed max-w-2xl">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* History / Milestones */}
      <section className="bg-white py-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="mb-16">
            <p className="text-[11px] uppercase tracking-[0.3em] text-[#A88F5C] mb-4">Our Journey</p>
            <h2 className="serif text-4xl lg:text-5xl">Milestones & Achievements</h2>
          </div>

          <div className="border-l-2 border-[#A88F5C]/30 ml-2 lg:ml-4">
            {milestones.map(({ year, title, desc }) => (
              <div key={year} className="relative pl-10 lg:pl-14 pb-12 last:pb-0">
                <span className="absolute left-0 -translate-x-1/2 top-1 w-3 h-3 rounded-full bg-[#A88F5C]" />
                <div className="serif text-2xl text-[#8B6914] mb-2">{year}</div>
                <h3 className="serif text-xl mb-2">{title}</h3>
                <p className="text-[#707070] text-[15px] leading-relaxed max-w-2xl">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Notable Projects */}
      <section className="bg-[#F8F6F1] py-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="mb-16">
            <p className="text-[11px] uppercase tracking-[0.3em] text-[#A88F5C] mb-4">Selected Work</p>
            <h2 className="serif text-4xl lg:text-5xl">Notable Projects</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {notableProjects.map(({ name, location, tag, image }) => (
              <motion.div key={name} className="group bg-white overflow-hidden" whileHover={{ y: -8 }}>
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={image}
                    alt={name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute top-5 left-5 px-3 py-1.5 bg-white/95 text-[10px] uppercase tracking-[0.2em]">
                    {tag}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="serif text-2xl mb-1">{name}</h3>
                  <p className="text-[13px] text-[#A88F5C] uppercase tracking-wider">{location}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Ecosystem — Part of Hanoi Group */}
      <section className="bg-white py-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
            <div>
              <p className="text-[11px] uppercase tracking-[0.3em] text-[#A88F5C] mb-4">Part of Hanoi Group</p>
              <h2 className="serif text-4xl lg:text-5xl">A Wider Ecosystem</h2>
            </div>
            <p className="text-[15px] text-[#707070] max-w-sm">
              HiLink is one of fourteen member and affiliated companies under Hanoi Group, giving our clients access to an integrated network across real estate, finance, and services.
            </p>
          </div>

          {/* Member companies */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#0F0F0F]/10">
            {[
              { name: 'HiHomes', desc: 'Serviced apartments & residential management across Hanoi.' },
              { name: 'HiCorp', desc: 'Corporate development and group investment management.' },
              { name: 'HiMed', desc: 'Healthcare facilities, clinics, and medical services.' },
              { name: 'HiPress', desc: 'Media, communications, and publishing.' },
              { name: 'HiWise', desc: 'Education, training, and knowledge development.' },
              { name: 'HiFund', desc: 'Capital, financial advisory, and investment funds.' },
            ].map((c) => (
              <div key={c.name} className="group bg-white p-8 lg:p-10 hover:bg-[#F8F6F1] transition-colors">
                <h3 className="serif text-2xl mb-3 text-[#0F0F0F] group-hover:text-[#8B6914] transition-colors">{c.name}</h3>
                <p className="text-[14px] text-[#707070] leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>

          {/* Strip line */}
          <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 text-[12px] uppercase tracking-[0.18em] text-[#0F0F0F]/40">
            <span>Handic</span><span>·</span><span>HiDC</span><span>·</span><span>HiBid</span><span>·</span><span>HiLink</span><span>·</span><span>Sudatta</span><span>·</span><span>and more</span>
          </div>
        </div>
      </section>

      {/* Customers / Testimonials */}
      <section className="bg-[#0F0F0F] py-32 text-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="mb-16 text-center">
            <p className="text-[11px] uppercase tracking-[0.3em] text-[#A88F5C] mb-4">In Their Words</p>
            <h2 className="serif text-4xl lg:text-5xl">What Our Clients Say</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-px bg-white/10">
            {aboutTestimonials.map(({ quote, author, role }) => (
              <div key={author} className="bg-[#0F0F0F] p-8 lg:p-10">
                <Quote size={28} className="text-[#A88F5C] mb-6" />
                <p className="serif text-[18px] italic text-[#EAE3D2] leading-relaxed mb-8">"{quote}"</p>
                <div className="w-8 h-px bg-[#A88F5C]/40 mb-5" />
                <div className="serif text-lg">{author}</div>
                <div className="text-[12px] uppercase tracking-wider text-[#A88F5C] mt-1">{role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners ticker */}
      <section className="bg-[#F8F6F1] py-16 overflow-hidden border-t border-b border-[#0F0F0F]/08">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 mb-10">
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#A88F5C] text-center">
            Trusted Partners &amp; Affiliates
          </p>
        </div>
        {/* Seamless ticker: single animated row containing two copies */}
        <div className="overflow-hidden">
          <div className="flex w-max" style={{ animation: 'ticker 32s linear infinite' }}>
            {[...partners, ...partners].map((name, i) => (
              <span
                key={i}
                className="serif text-[22px] font-light text-[#0F0F0F]/30 whitespace-nowrap hover:text-[#A88F5C] transition-colors cursor-default select-none px-10"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
        <style>{`
          @keyframes ticker {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
        `}</style>
      </section>

      {/* CTA */}
      <section className="relative py-28 text-white overflow-hidden">
        <img src="/workspace-photos/9df347136e8467636fcc2e51a072f148ca018ad7-5650x6643.avif" alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[#0F0F0F]/72" />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center justify-between gap-12">
          <div>
            <h2 className="serif text-4xl lg:text-5xl mb-4">Let's Work Together</h2>
            <p className="text-[#EAE3D2] text-lg">Discover how we can support your business in Vietnam.</p>
          </div>
          <Link to="/contact" className="shrink-0 inline-flex items-center gap-3 px-9 py-4 bg-[#A88F5C] text-white text-[11px] uppercase tracking-[0.2em] hover:bg-[#EAE3D2] hover:text-[#0F0F0F] transition-colors group">
            Get in Touch
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* Member modal */}
      <AnimatePresence>
        {selectedMember && (
          <MemberModal
            member={selectedMember}
            onClose={() => setSelectedMember(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
