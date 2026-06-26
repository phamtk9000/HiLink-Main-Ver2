import { Link } from 'react-router';
import { Building2, Briefcase, Sparkles, Factory, MonitorSmartphone, ArrowRight, ArrowUpRight, ClipboardList, Handshake, Settings, LineChart } from 'lucide-react';
import { motion } from 'motion/react';
import { HeroBg } from '../components/HeroBg';

const P = '/workspace-photos';

const solutions = [
  {
    icon: <Building2 size={30} />,
    title: 'Property Management',
    tag: 'Own with confidence',
    description: 'End-to-end management for residential, commercial, hospitality, and short-term rental assets — tenant acquisition, maintenance, rent collection, and transparent owner reporting.',
    points: ['Residential, commercial & hospitality assets', 'Premium tenant screening & leasing', '24/7 maintenance & concierge support', 'Monthly statements & yield optimisation'],
    path: '/property-management',
    image: `${P}/7a4923f30fa4e9b7abdb461ac56a404f2824d011-7783x5191.avif`,
  },
  {
    icon: <MonitorSmartphone size={30} />,
    title: 'Workspace Leasing',
    tag: 'Work where you thrive',
    description: 'Premium coworking and private offices across two Hanoi addresses — bookable by the hour, day, or month, with everything a modern team needs to do their best work.',
    points: ['Hot desks, private offices & meeting rooms', 'Two central Hanoi locations', 'Transparent hourly ₫ pricing', 'Live booking via the HiLink workspace app'],
    path: '/workspace-leasing',
    image: `${P}/a665b9317ac3b0e14261cf4defef0b33e698271d-4580x6107.avif`,
  },
  {
    icon: <Briefcase size={30} />,
    title: 'Business Services',
    tag: 'Scale in Vietnam',
    description: 'Market-entry, advisory, and operational support for businesses scaling in Vietnam — from company formation to accounting, legal, and ongoing back-office operations.',
    points: ['Market entry & company formation', 'Accounting, tax & compliance', 'Legal & licensing advisory', 'Bilingual operational support'],
    path: '/business-services',
    image: `${P}/487a452a78187b29fe238538199927e819f5b150-4501x6130.avif`,
  },
  {
    icon: <Sparkles size={30} />,
    title: 'Concierge Services',
    tag: 'The exceptional, handled',
    description: 'Personal and corporate concierge for clients who expect more — travel, dining, events, lifestyle, and business support delivered by a dedicated team, 24/7.',
    points: ['Travel, aviation & hospitality', 'Dining & exclusive event access', 'Lifestyle & relocation management', 'Executive & business support'],
    path: '/concierge-services',
    image: `${P}/9df347136e8467636fcc2e51a072f148ca018ad7-5650x6643.avif`,
  },
  {
    icon: <Factory size={30} />,
    title: 'Industrial & Logistics',
    tag: 'Space that performs',
    description: 'Warehousing, factory, and logistics property solutions across Vietnam — from site selection and leasing to fit-out coordination and ongoing facilities management.',
    points: ['Warehouse & factory leasing', 'Site selection & due diligence', 'Fit-out & build-out coordination', 'Facilities & supply-chain support'],
    path: '/industrial-logistics',
    image: `${P}/BG_Hanoi.avif`,
  },
];

const process = [
  { icon: <ClipboardList size={22} />, step: '01', title: 'Discovery', desc: 'We learn your goals, assets, and constraints to map the right mix of solutions.' },
  { icon: <Handshake size={22} />, step: '02', title: 'Proposal', desc: 'A clear, transparent scope and plan tailored to your situation — no surprises.' },
  { icon: <Settings size={22} />, step: '03', title: 'Delivery', desc: 'A dedicated bilingual team executes, coordinating every moving part for you.' },
  { icon: <LineChart size={22} />, step: '04', title: 'Optimisation', desc: 'Ongoing reporting and reviews to keep performance climbing over time.' },
];

export function SolutionsPage() {
  return (
    <>
      {/* Hero */}
      <section id="hero" className="relative overflow-hidden min-h-[72vh] flex items-end bg-[#0F0F0F] text-white">
        <HeroBg image={`${P}/c7b0fcf2692da34e051136c7476183cc9967a4a4-6287x5202.avif`} />
        <div className="relative z-10 max-w-[1600px] mx-auto px-6 lg:px-12 py-20 lg:py-28 w-full">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-4xl">
            <p className="text-[11px] uppercase tracking-[0.3em] text-[#C9A55A] mb-7 flex items-center gap-3">
              <span className="w-8 h-px bg-[#C9A55A]" /> Our Solutions
            </p>
            <h1 className="serif text-5xl lg:text-[5rem] mb-8 leading-[0.98]">
              One partner across the<br />full property lifecycle
            </h1>
            <p className="text-lg md:text-xl text-[#EAE3D2]/90 leading-relaxed max-w-2xl">
              From management and workspace to advisory and concierge, HiLink brings every solution
              international clients need to invest, operate, and grow in Vietnam — under one roof.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quick nav strip */}
      <section className="bg-[#0F0F0F] border-t border-white/10">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="flex flex-wrap gap-x-8 gap-y-3 py-6">
            {solutions.map((s, i) => (
              <a key={s.path} href={`#solution-${i}`} className="text-[11px] uppercase tracking-[0.16em] text-white/55 hover:text-[#C9A55A] transition-colors">
                {s.title}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-24 lg:py-32 bg-[#F8F6F1]">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 grid lg:grid-cols-12 gap-12 lg:gap-24">
          <div className="lg:col-span-5">
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#A88F5C] mb-5">Everything under one roof</p>
            <h2 className="serif text-4xl lg:text-5xl leading-tight">Five solutions, one standard of excellence</h2>
          </div>
          <div className="lg:col-span-7 flex items-center">
            <p className="text-xl text-[#707070] leading-relaxed">
              Most clients start with a single need — a property to manage, an office to lease, a company to set up.
              They stay because HiLink can handle everything that comes next. Explore each solution below, or tell us
              your goals and we will compose the right combination for you.
            </p>
          </div>
        </div>
      </section>

      {/* Detailed solution sections */}
      <section id="solutions" className="bg-white">
        {solutions.map((s, i) => (
          <div
            id={`solution-${i}`}
            key={s.path}
            className={`border-t border-[#0F0F0F]/10 ${i % 2 === 1 ? 'bg-[#F8F6F1]' : 'bg-white'}`}
          >
            <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-20 lg:py-28">
              <div className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ${i % 2 === 1 ? 'lg:[direction:rtl]' : ''}`}>
                <motion.div
                  className="relative aspect-[4/3] overflow-hidden lg:[direction:ltr]"
                  initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.7 }}
                >
                  <img src={s.image} alt={s.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F]/30 to-transparent" />
                  <span className="absolute top-5 left-5 text-[9px] uppercase tracking-[0.2em] bg-[#0F0F0F]/70 text-[#C9A55A] px-3 py-1.5">0{i + 1}</span>
                </motion.div>

                <motion.div
                  className="lg:[direction:ltr]"
                  initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.6 }}
                >
                  <div className="text-[#A88F5C] mb-5">{s.icon}</div>
                  <p className="text-[10px] uppercase tracking-[0.28em] text-[#A88F5C] mb-3">{s.tag}</p>
                  <h3 className="serif text-3xl lg:text-4xl mb-6">{s.title}</h3>
                  <p className="text-[#707070] leading-relaxed mb-8 text-[17px]">{s.description}</p>
                  <ul className="grid sm:grid-cols-2 gap-y-3 gap-x-6 mb-10">
                    {s.points.map((pt) => (
                      <li key={pt} className="flex items-start gap-3 text-[15px] text-[#0F0F0F]">
                        <span className="w-1.5 h-1.5 bg-[#A88F5C] rounded-full mt-2.5 flex-shrink-0" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                  <Link to={s.path} className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-[#0F0F0F] group">
                    <span className="relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#A88F5C] group-hover:after:w-full after:transition-all after:duration-300">
                      Explore {s.title}
                    </span>
                    <ArrowRight size={15} className="text-[#A88F5C] group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* How we work together */}
      <section className="py-24 lg:py-32 bg-[#0F0F0F] text-white">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="mb-14 max-w-2xl">
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#C9A55A] mb-5">How we work together</p>
            <h2 className="serif text-4xl lg:text-5xl leading-tight">A simple path from first call to lasting results</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10">
            {process.map((p) => (
              <div key={p.step} className="bg-[#0F0F0F] p-8 lg:p-10">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[#A88F5C]">{p.icon}</span>
                  <span className="serif text-3xl text-white/20">{p.step}</span>
                </div>
                <h3 className="serif text-xl mb-3">{p.title}</h3>
                <p className="text-[#EAE3D2]/70 text-[14px] leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="py-24 lg:py-32 bg-[#F8F6F1]">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 text-center">
          <h2 className="serif text-4xl lg:text-5xl mb-8">Not sure where to start?</h2>
          <p className="text-xl text-[#707070] mb-12 max-w-2xl mx-auto">
            Tell us about your goals and we will map the right combination of solutions for you.
          </p>
          <Link to="/book-consultation" className="group inline-flex items-center gap-2 px-12 py-4 bg-[#A88F5C] text-white text-[12px] uppercase tracking-[0.16em] hover:bg-[#0F0F0F] transition-colors">
            Book a Consultation <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </section>
    </>
  );
}
