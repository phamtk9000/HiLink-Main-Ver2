import { Link } from 'react-router';
import { ArrowRight, ArrowUpRight, Building2, Briefcase, Bell, TrendingUp, Warehouse } from 'lucide-react';
import { motion } from 'motion/react';
import { useRef } from 'react';
import { AnimatedCounter } from '../components/AnimatedCounter';

const P = '/workspace-photos';
const IMG = {
  heroHanoi: `${P}/BG_HOME.jpg`,
  reception: `${P}/a665b9317ac3b0e14261cf4defef0b33e698271d-4580x6107.avif`,
  lounge: `${P}/c7b0fcf2692da34e051136c7476183cc9967a4a4-6287x5202.avif`,
  deskCity: `${P}/7a4923f30fa4e9b7abdb461ac56a404f2824d011-7783x5191.avif`,
  pantry: `${P}/9a14157465692369d4ceb0727313b5f1dd56d2cd-6500x4334.avif`,
  redLounge: `${P}/9df347136e8467636fcc2e51a072f148ca018ad7-5650x6643.avif`,
  media: `${P}/487a452a78187b29fe238538199927e819f5b150-4501x6130.avif`,
};

const PROJECTS = [
  { name: 'Premium WorkSpace', loc: '4 Tôn Thất Tùng, Đống Đa', cat: 'Specialised Real Estate', img: `${P}/a665b9317ac3b0e14261cf4defef0b33e698271d-4580x6107.avif` },
  { name: 'C7 Giảng Võ', loc: 'Trần Huy Liệu, Ba Đình', cat: 'Residential', img: `${P}/hihomes-1.webp` },
  { name: 'New Space Mỹ Đình', loc: 'Nam Từ Liêm, Hà Nội', cat: 'Residential', img: `${P}/hihomes-2.webp` },
  { name: 'Viha Building', loc: '10 Tràng Thi, Hoàn Kiếm', cat: 'Residential', img: `${P}/19664fdfc1b75028ee1c29a5a20eba70b3550e35-1004x1500.avif` },
  { name: 'Tòa nhà 31 Láng Hạ', loc: 'Láng Hạ, Ba Đình', cat: 'Residential', img: `${P}/3cc3771207592a087306c8dc2cf6376fb6b28183-800x1200.avif` },
  { name: 'M3–M4 Nguyễn Chí Thanh', loc: '91 Nguyễn Chí Thanh, Đống Đa', cat: 'Residential', img: `${P}/hihomes-3.webp` },
  { name: 'HiHomes Giảng Võ', loc: '138B Giảng Võ, Ba Đình', cat: 'Property Management', img: `${P}/hihomes-4.avif` },
  { name: 'HiHomes Thái Thịnh', loc: '27 Thái Thịnh, Đống Đa', cat: 'Property Management', img: `${P}/hihomes-5.avif` },
];

export function HomePage() {
  const scroller = useRef<HTMLDivElement>(null);
  const scrollBy = (dir: number) => scroller.current?.scrollBy({ left: dir * 380, behavior: 'smooth' });

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative min-h-[92vh] flex items-end bg-[#0F0F0F] text-white overflow-hidden">
        <motion.img
          src={IMG.heroHanoi}
          alt="Hanoi"
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ scale: 1.12, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.55 }}
          transition={{ duration: 1.6, ease: 'easeOut' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-[#0F0F0F]/40 to-[#0F0F0F]/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F0F0F]/70 to-transparent" />

        <div className="relative max-w-[1600px] mx-auto px-6 lg:px-12 pb-20 lg:pb-28 w-full">
          <motion.p
            className="text-[11px] uppercase tracking-[0.32em] text-[#C9A55A] mb-7 flex items-center gap-3"
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.7 }}
          >
            <span className="w-8 h-px bg-[#C9A55A]" /> Real Estate · Workspace · Advisory — Hà Nội
          </motion.p>
          <motion.h1
            className="serif text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] leading-[0.98] mb-8 max-w-5xl"
            initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.8 }}
          >
            Your assets,<br /><span className="text-[#C9A55A]">managed</span> &amp; optimised.
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-[#EAE3D2]/90 mb-11 max-w-2xl leading-relaxed"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55, duration: 0.8 }}
          >
            Bespoke property management, premium workspace, and business advisory for
            international clients across Vietnam.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.8 }}
          >
            <Link to="/contact" className="group inline-flex items-center justify-center gap-2 px-9 py-4 bg-[#A88F5C] text-white text-[12px] uppercase tracking-[0.16em] hover:bg-[#EAE3D2] hover:text-[#0F0F0F] transition-all">
              Book a Consultation <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/solutions" className="inline-flex items-center justify-center px-9 py-4 border border-white/40 text-white text-[12px] uppercase tracking-[0.16em] hover:bg-white hover:text-[#0F0F0F] transition-colors">
              Explore Services
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── About — editorial three-column ── */}
      <section className="w-full bg-[#F8F6F1]">
        <div className="grid lg:grid-cols-[30%_1fr_28%] min-h-[680px]">
          <div className="relative overflow-hidden min-h-[400px] lg:min-h-0 group">
            <img src={IMG.reception} alt="HiLink reception" className="w-full h-full object-cover transition-transform duration-[1.2s] group-hover:scale-105" />
          </div>

          <div className="px-10 lg:px-16 py-16 lg:py-20 flex flex-col justify-center">
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#A88F5C] mb-10">About the Company</p>
            <h2 className="serif text-[#8B6914] mb-6 leading-none" style={{ fontSize: 'clamp(3rem, 5vw, 5rem)', fontWeight: 400, letterSpacing: '0.06em' }}>HILINK</h2>
            <p className="text-[18px] uppercase tracking-[0.08em] text-[#1a1a1a] mb-6">Vietnam Real Estate Excellence</p>
            <div className="w-full h-px mb-6" style={{ backgroundColor: 'rgba(168,143,92,0.3)' }} />
            <p className="text-[15px] leading-[1.85] text-[#444] max-w-[520px] mb-12">
              Part of Hanoi Group, HiLink understands the complexities of cross-border investment and the needs of international clients. Our bilingual team delivers transparent, GDPR-compliant services with a personalised concierge approach across property management, premium workspace, and business advisory.
            </p>
            <Link to="/about" className="inline-flex items-center gap-3 group w-fit">
              <span className="text-[11px] uppercase tracking-[0.2em] text-[#0F0F0F] relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#A88F5C] group-hover:after:w-full after:transition-all after:duration-300">Learn More About Us</span>
              <ArrowRight size={14} className="text-[#A88F5C] group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="flex flex-col">
            <div className="bg-[#F0EDE6] px-10 py-10 flex flex-col justify-center gap-8 flex-1">
              {[
                { end: 150, suffix: '+', label: 'Properties Managed', duration: 2 },
                { end: 12, suffix: '+', label: 'Years Experience', duration: 1.8 },
                { end: 98, suffix: '%', label: 'Client Satisfaction', duration: 2.2 },
              ].map((stat) => (
                <div key={stat.label} className="border-t border-[#A88F5C]/30 pt-5">
                  <div className="serif text-[40px] font-light text-[#8B6914] leading-none mb-2">
                    <AnimatedCounter end={stat.end} suffix={stat.suffix} duration={stat.duration} />
                  </div>
                  <div className="text-[11px] uppercase tracking-[0.2em] text-[#555]">{stat.label}</div>
                </div>
              ))}
            </div>
            <div className="relative overflow-hidden min-h-[200px] lg:min-h-[260px]">
              <img src={IMG.pantry} alt="HiLink workspace" className="w-full h-full object-cover" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center" style={{ backgroundColor: 'rgba(15,15,15,0.55)' }}>
                <div className="serif text-white text-[72px] font-light leading-none"><AnimatedCounter end={8} duration={1.5} /></div>
                <div className="text-white uppercase tracking-[0.2em] text-[11px] mt-3">Countries Served</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section className="py-24 lg:py-32 bg-[#F8F6F1]">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-24 mb-20">
            <div className="lg:col-span-4">
              <p className="text-[10px] uppercase tracking-[0.3em] text-[#A88F5C] mb-5">What We Do</p>
              <h2 className="serif text-5xl lg:text-6xl">Services</h2>
            </div>
            <div className="lg:col-span-8 flex items-end">
              <p className="text-xl text-[#707070] leading-relaxed">
                End-to-end solutions for property owners, businesses, and international clients seeking excellence in Vietnam's dynamic market.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#0F0F0F]">
            <ServiceCard icon={<TrendingUp size={30} />} title="Asset Management & Optimisation" description="Strategic oversight and performance maximisation for your real estate portfolio." link="/property-management" />
            <ServiceCard icon={<Briefcase size={30} />} title="Workspace Leasing" description="Premium office and coworking solutions tailored to your business needs." link="/workspace-leasing" />
            <ServiceCard icon={<Building2 size={30} />} title="Business Solutions & Consulting" description="Expert advisory services for market entry and business development." link="/business-services" />
            <ServiceCard icon={<Bell size={30} />} title="Concierge Services" description="Personalised support for all your property and business requirements." link="/concierge-services" />
            <ServiceCard icon={<Warehouse size={30} />} title="Industrial & Logistics" description="Specialised warehousing, factory leasing, and supply-chain solutions across Vietnam." link="/industrial-logistics" />
            <div className="bg-[#A88F5C] p-8 lg:p-12 flex flex-col justify-between">
              <div className="text-white/60 text-[10px] uppercase tracking-[0.3em] mb-auto">All Services</div>
              <div>
                <p className="serif text-white text-2xl lg:text-3xl mb-6 leading-snug">Explore the full HiLink ecosystem</p>
                <Link to="/solutions" className="inline-flex items-center gap-2 text-white text-[11px] uppercase tracking-[0.2em] border-b border-white/40 pb-1 hover:border-white transition-colors group">
                  View All Services <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Projects / Portfolio (Hanoi Group milestones) ── */}
      <section className="py-24 lg:py-32 bg-[#0F0F0F] text-white overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="flex flex-wrap items-end justify-between gap-8 mb-14">
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-[#C9A55A] mb-5 flex items-center gap-3">
                <span className="w-8 h-px bg-[#C9A55A]" /> Portfolio · Hanoi Group
              </p>
              <h2 className="serif text-4xl lg:text-6xl leading-none">Selected Projects</h2>
            </div>
            <div className="flex items-center gap-6">
              <p className="hidden md:block max-w-sm text-[#EAE3D2]/70 leading-relaxed text-[15px]">
                Three decades of developing, managing, and operating real estate across Hà Nội — from heritage addresses to premium workspaces.
              </p>
              <div className="flex gap-2">
                <button onClick={() => scrollBy(-1)} aria-label="Previous" className="w-11 h-11 border border-white/25 flex items-center justify-center hover:bg-white hover:text-[#0F0F0F] transition-colors"><ArrowRight size={16} className="rotate-180" /></button>
                <button onClick={() => scrollBy(1)} aria-label="Next" className="w-11 h-11 border border-white/25 flex items-center justify-center hover:bg-white hover:text-[#0F0F0F] transition-colors"><ArrowRight size={16} /></button>
              </div>
            </div>
          </div>

          <div ref={scroller} className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {PROJECTS.map((proj, i) => (
              <motion.div
                key={proj.name}
                className="group relative shrink-0 w-[280px] sm:w-[320px] snap-start"
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ delay: (i % 4) * 0.08, duration: 0.6 }}
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-[#1a1a1a]">
                  <img src={proj.img} alt={proj.name} loading="lazy" className="w-full h-full object-cover transition-transform duration-[0.9s] group-hover:scale-[1.07]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F]/85 via-[#0F0F0F]/10 to-transparent" />
                  <span className="absolute top-4 left-4 text-[9px] uppercase tracking-[0.18em] bg-[#A88F5C] text-white px-3 py-1.5">{proj.cat}</span>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="serif text-2xl mb-1.5 leading-tight">{proj.name}</h3>
                    <p className="text-[12px] text-[#EAE3D2]/70 flex items-start gap-1.5">
                      <span className="text-[#C9A55A] mt-0.5">◦</span> {proj.loc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trust ── */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-[#A88F5C] mb-6">Why HiLink</p>
              <h2 className="serif text-4xl lg:text-5xl mb-8 leading-tight">Trusted by international clients across Asia</h2>
              <p className="text-lg text-[#707070] mb-8 leading-relaxed">
                We understand the complexities of cross-border investment and the unique needs of international clients. Our bilingual team provides transparent, GDPR-compliant services with a personalised concierge approach.
              </p>
              <Link to="/about" className="inline-flex items-center gap-2 text-[#A88F5C] uppercase text-sm tracking-wider group hover:gap-4 transition-all">
                Learn About Us <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <motion.div className="relative aspect-[4/3] overflow-hidden" whileHover={{ scale: 1.02 }} transition={{ duration: 0.4 }}>
              <img src={IMG.lounge} alt="HiLink lounge" className="w-full h-full object-cover" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative py-28 lg:py-36 bg-[#0F0F0F] text-white overflow-hidden">
        <img src={IMG.deskCity} alt="" className="absolute inset-0 w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-[#0F0F0F]/60" />
        <div className="relative max-w-[1600px] mx-auto px-6 lg:px-12 text-center">
          <h2 className="serif text-4xl lg:text-6xl mb-8">Ready to start?</h2>
          <p className="text-xl text-[#EAE3D2]/90 mb-12 max-w-2xl mx-auto">Tell us about your needs. We respond within 24 hours.</p>
          <Link to="/contact" className="group inline-flex items-center gap-2 px-12 py-4 bg-[#A88F5C] text-white text-[12px] uppercase tracking-[0.16em] hover:bg-[#EAE3D2] hover:text-[#0F0F0F] transition-colors">
            Book a Consultation <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </section>
    </>
  );
}

function ServiceCard({ icon, title, description, link }: { icon: React.ReactNode; title: string; description: string; link: string; }) {
  return (
    <Link to={link} className="group bg-[#F8F6F1] p-8 lg:p-12 hover:bg-[#EAE3D2] transition-all block h-full">
      <motion.div className="text-[#A88F5C] mb-6" whileHover={{ x: 4 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}>{icon}</motion.div>
      <h3 className="serif text-2xl lg:text-[1.7rem] mb-4 leading-snug">{title}</h3>
      <p className="text-[#707070] mb-6 leading-relaxed text-[15px]">{description}</p>
      <div className="inline-flex items-center gap-2 text-[#0F0F0F] text-[11px] uppercase tracking-[0.16em] group-hover:gap-4 transition-all">Learn More <ArrowRight size={15} /></div>
    </Link>
  );
}
