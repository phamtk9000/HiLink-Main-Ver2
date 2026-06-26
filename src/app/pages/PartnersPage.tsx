import { Link } from 'react-router';
import { Handshake, Building, Globe, TrendingUp, ArrowRight, ShieldCheck, Layers, HeartHandshake, ClipboardList, Search, FileSignature, Rocket } from 'lucide-react';
import { motion } from 'motion/react';
import { HeroBg } from '../components/HeroBg';

const P = '/workspace-photos';

const partnerTypes = [
  {
    icon: <Building size={28} />,
    title: 'Property Owners & Developers',
    description: 'Asset owners and developers who entrust HiLink with management, leasing, and operations across residential, commercial, and mixed-use portfolios.',
    image: `${P}/7a4923f30fa4e9b7abdb461ac56a404f2824d011-7783x5191.avif`,
  },
  {
    icon: <Globe size={28} />,
    title: 'International Networks',
    description: 'Cross-border advisory, relocation, and investment partners who refer and co-serve global clients entering and operating in Vietnam.',
    image: `${P}/a665b9317ac3b0e14261cf4defef0b33e698271d-4580x6107.avif`,
  },
  {
    icon: <TrendingUp size={28} />,
    title: 'Service & Vendor Partners',
    description: 'Vetted maintenance, hospitality, fit-out, and professional service providers who deliver consistent quality across our portfolio.',
    image: `${P}/19664fdfc1b75028ee1c29a5a20eba70b3550e35-1004x1500.avif`,
  },
];

const benefits = [
  { icon: <Layers size={24} />, title: 'Access our portfolio', desc: 'Work across managed assets and two premium Hanoi workspace campuses with steady, recurring demand.' },
  { icon: <Globe size={24} />, title: 'Reach global clients', desc: 'Tap into our international, bilingual client base of investors, expats, and corporates.' },
  { icon: <ShieldCheck size={24} />, title: 'Trust & transparency', desc: 'Clear agreements, prompt settlement, and a reputation built on doing things properly.' },
  { icon: <HeartHandshake size={24} />, title: 'Long-term relationships', desc: 'We invest in partners for the long run, not one-off transactions.' },
];

const ecosystem = ['HiHomes', 'HiCorp', 'HiMed', 'HiPress', 'HiWise', 'HiFund', 'HiBid', 'HiDC', 'Handic', 'Sudatta'];

const steps = [
  { icon: <Search size={22} />, step: '01', title: 'Introduction', desc: 'Tell us about your organisation and how you would like to collaborate.' },
  { icon: <ClipboardList size={22} />, step: '02', title: 'Assessment', desc: 'We align on standards, scope, and a shared definition of quality.' },
  { icon: <FileSignature size={22} />, step: '03', title: 'Agreement', desc: 'A transparent partnership agreement with clear terms and expectations.' },
  { icon: <Rocket size={22} />, step: '04', title: 'Collaboration', desc: 'We onboard, integrate, and start delivering together.' },
];

export function PartnersPage() {
  return (
    <>
      {/* Hero */}
      <section id="hero" className="relative overflow-hidden min-h-[72vh] flex items-end bg-[#0F0F0F] text-white">
        <HeroBg image={`${P}/487a452a78187b29fe238538199927e819f5b150-4501x6130.avif`} />
        <div className="relative z-10 max-w-[1600px] mx-auto px-6 lg:px-12 py-20 lg:py-28 w-full">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-4xl">
            <p className="text-[11px] uppercase tracking-[0.3em] text-[#C9A55A] mb-7 flex items-center gap-3">
              <span className="w-8 h-px bg-[#C9A55A]" /> Partners
            </p>
            <h1 className="serif text-5xl lg:text-[5rem] mb-8 leading-[0.98]">Built on trusted<br />relationships</h1>
            <p className="text-lg md:text-xl text-[#EAE3D2]/90 leading-relaxed max-w-2xl">
              HiLink works alongside owners, developers, networks, and service partners who share our
              standard of quality and care — many for well over a decade.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-24 lg:py-32 bg-[#F8F6F1]">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 grid lg:grid-cols-12 gap-12 lg:gap-24">
          <div className="lg:col-span-5">
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#A88F5C] mb-5">Stronger together</p>
            <h2 className="serif text-4xl lg:text-5xl leading-tight">A network that delivers across the lifecycle</h2>
          </div>
          <div className="lg:col-span-7 flex items-center">
            <p className="text-xl text-[#707070] leading-relaxed">
              No single firm does everything alone. HiLink brings together a carefully chosen network of
              owners, advisors, and specialist providers — coordinated under one accountable team so our
              clients experience a single, seamless standard of service.
            </p>
          </div>
        </div>
      </section>

      {/* Partner types — with images */}
      <section id="our-partners" className="py-24 lg:py-32 bg-white">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#A88F5C] mb-5">Who we work with</p>
            <h2 className="serif text-4xl lg:text-5xl">Our Partners</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {partnerTypes.map((p) => (
              <motion.div key={p.title} className="group bg-white overflow-hidden border border-[#0F0F0F]/10" whileHover={{ y: -6 }}>
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={p.image} alt={p.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F]/70 to-transparent" />
                  <div className="absolute bottom-4 left-4 w-11 h-11 bg-[#A88F5C] text-white flex items-center justify-center">{p.icon}</div>
                </div>
                <div className="p-8">
                  <h3 className="serif text-2xl mb-4">{p.title}</h3>
                  <p className="text-[#707070] leading-relaxed text-[15px]">{p.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why partner — benefits + feature image */}
      <section className="py-24 lg:py-32 bg-[#0F0F0F] text-white">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#C9A55A] mb-5">Why partner with HiLink</p>
            <h2 className="serif text-4xl lg:text-5xl mb-12 leading-tight">The benefits of working together</h2>
            <div className="grid sm:grid-cols-2 gap-px bg-white/10">
              {benefits.map((b) => (
                <div key={b.title} className="bg-[#0F0F0F] p-7">
                  <div className="text-[#A88F5C] mb-4">{b.icon}</div>
                  <h3 className="serif text-xl mb-2">{b.title}</h3>
                  <p className="text-[#EAE3D2]/70 text-[14px] leading-relaxed">{b.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative aspect-[3/4] overflow-hidden">
            <img src={`${P}/c7b0fcf2692da34e051136c7476183cc9967a4a4-6287x5202.avif`} alt="HiLink partnership" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* Ecosystem strip */}
      <section className="py-20 bg-[#F8F6F1] border-y border-[#0F0F0F]/10">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 text-center">
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#A88F5C] mb-8">Part of the Hanoi Group ecosystem</p>
          <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-4">
            {ecosystem.map((name) => (
              <span key={name} className="serif text-2xl text-[#0F0F0F]/35 hover:text-[#8B6914] transition-colors">{name}</span>
            ))}
          </div>
        </div>
      </section>

      {/* How partnership works */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="mb-14 max-w-2xl">
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#A88F5C] mb-5">How it works</p>
            <h2 className="serif text-4xl lg:text-5xl leading-tight">Becoming a HiLink partner</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#0F0F0F]/10">
            {steps.map((s) => (
              <div key={s.step} className="bg-white p-8 lg:p-10">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[#A88F5C]">{s.icon}</span>
                  <span className="serif text-3xl text-[#0F0F0F]/15">{s.step}</span>
                </div>
                <h3 className="serif text-xl mb-3">{s.title}</h3>
                <p className="text-[#707070] text-[14px] leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner with us — feature */}
      <section id="partner-with-us" className="relative overflow-hidden bg-[#0F0F0F] text-white">
        <div className="grid lg:grid-cols-2">
          <div className="relative min-h-[360px] lg:min-h-0 overflow-hidden">
            <img src={`${P}/e3356eda275930ce1c6f14429c514ddf996312ae-5342x7123.avif`} alt="Partner with HiLink" className="absolute inset-0 w-full h-full object-cover" />
          </div>
          <div className="px-8 lg:px-16 py-20 lg:py-28">
            <div className="text-[#A88F5C] mb-6"><Handshake size={40} /></div>
            <h2 className="serif text-4xl lg:text-5xl mb-8">Partner with us</h2>
            <p className="text-lg text-[#EAE3D2]/85 leading-relaxed mb-8">
              Whether you own property, run a complementary service, or represent international clients,
              we would like to explore how we can work together — and build something that lasts.
            </p>
            <div className="bg-white/[0.04] border border-white/10 p-8 mb-10">
              <h3 className="serif text-xl mb-6">What we look for</h3>
              <ul className="space-y-4">
                {[
                  'A shared commitment to quality and transparency',
                  'Proven reliability and professional standards',
                  'Alignment with our international client base',
                  'Long-term, relationship-driven collaboration',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-[#A88F5C] rounded-full mt-2.5 flex-shrink-0" />
                    <span className="text-[#EAE3D2] text-[15px]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Link to="/contact" className="group inline-flex items-center gap-2 px-10 py-4 bg-[#A88F5C] text-white text-[12px] uppercase tracking-[0.16em] hover:bg-[#EAE3D2] hover:text-[#0F0F0F] transition-colors">
              Start a Conversation
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
