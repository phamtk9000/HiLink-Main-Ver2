import { Link } from 'react-router';
import { Globe, FileCheck, Users, TrendingUp, MapPin, Shield, ArrowRight, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import { FAQ } from '../components/FAQ';

const partners = [
  'CBRE', 'Savills', 'JLL', 'Deloitte', 'PwC',
  'KPMG', 'Baker McKenzie', 'EY', 'Indochina Capital', 'VinaCapital',
];

const businessFaqs = [
  { question: 'How long does company registration in Vietnam take?', answer: 'Most foreign-invested entities are registered within four to eight weeks, depending on the business line and licensing requirements. We manage the full process and keep you updated at each milestone.' },
  { question: 'Can foreigners own 100% of a company in Vietnam?', answer: 'In many sectors, yes — full foreign ownership is permitted. Certain regulated industries have caps or conditions, which we assess during the discovery stage before recommending a structure.' },
  { question: 'Do you help with ongoing compliance after setup?', answer: 'Yes. Beyond formation we provide continuous advisory on tax, accounting, licensing, and reporting so your operations remain fully compliant as they grow.' },
  { question: 'What support do you offer for market entry strategy?', answer: 'We provide market analysis, entry roadmaps, investment structuring, and on-ground implementation — from initial discovery through to optimisation of your live operations.' },
  { question: 'How are your advisory services priced?', answer: 'Engagements are scoped to your objectives, typically as fixed-fee packages for defined deliverables or retainers for ongoing advisory. We agree on pricing transparently before any work begins.' },
];

const services = [
  {
    icon: <Globe size={28} />,
    title: 'Market Entry Strategy',
    description: 'Comprehensive market analysis, competitive landscape assessment, and strategic roadmap for successful Vietnam market entry.',
    points: ['Feasibility assessment', 'Competitive benchmarking', 'Go-to-market roadmap', 'Risk mitigation planning'],
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80',
  },
  {
    icon: <FileCheck size={28} />,
    title: 'Company Formation and Licensing',
    description: 'End-to-end support for business registration, investment certificates, and regulatory compliance in Vietnam.',
    points: ['Investment certificate (IRC)', 'Enterprise registration (ERC)', 'Foreign ownership structures', 'Branch and representative offices'],
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80',
  },
  {
    icon: <Shield size={28} />,
    title: 'Legal and Regulatory Advisory',
    description: 'Navigate Vietnam\'s regulatory framework with expert guidance on compliance, permits, and legal requirements.',
    points: ['Labour law compliance', 'Tax structuring', 'Contract drafting', 'Dispute resolution'],
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80',
  },
  {
    icon: <MapPin size={28} />,
    title: 'Location and Site Selection',
    description: 'Strategic analysis and recommendations for office, retail, or industrial site selection across Vietnam.',
    points: ['District-by-district analysis', 'Infrastructure assessment', 'Lease negotiation', 'Fit-out coordination'],
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80',
  },
  {
    icon: <Users size={28} />,
    title: 'Partner and Talent Sourcing',
    description: 'Connect with vetted local partners, suppliers, and senior talent to accelerate your operations.',
    points: ['Executive search', 'Distributor vetting', 'Joint venture facilitation', 'Supplier due diligence'],
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80',
  },
  {
    icon: <TrendingUp size={28} />,
    title: 'Operational Setup Support',
    description: 'Comprehensive operational launch support including HR, banking, utilities, and infrastructure setup.',
    points: ['Banking setup', 'HR policies and payroll', 'IT and telecoms', 'Vendor management'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80',
  },
];

const sectors = [
  { name: 'Technology and Software', stat: '35+', label: 'clients advised' },
  { name: 'Manufacturing and Industrial', stat: '28+', label: 'market entries' },
  { name: 'Retail and E-commerce', stat: '20+', label: 'launches supported' },
  { name: 'Professional Services', stat: '40+', label: 'firms established' },
  { name: 'Hospitality and F&B', stat: '15+', label: 'venues opened' },
  { name: 'Healthcare and Education', stat: '12+', label: 'licences secured' },
];

const caseStudies = [
  {
    tag: 'Technology',
    client: 'European SaaS Company',
    country: '🇩🇪 Germany',
    challenge: 'Establishing first Asian headquarters in Vietnam with a 50-person team and full product localisation.',
    solution: 'End-to-end market entry: company formation, premium office leasing in Ba Dinh, and executive recruitment for the local leadership team.',
    result: 'Fully operational in 4 months. Under budget. 100% regulatory compliance on first submission.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80',
  },
  {
    tag: 'Manufacturing',
    client: 'Australian Industrial Distributor',
    country: '🇦🇺 Australia',
    challenge: 'Expanding distribution network and establishing bonded warehouse operations across three Vietnamese cities.',
    solution: 'Industrial site analysis, logistics partner sourcing, and customs/bonded warehouse licensing in Hanoi, Da Nang, and HCMC.',
    result: 'Distribution partnerships live in 3 cities within 6 months. 22% reduction in landed costs vs. Singapore hub.',
    image: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80',
  },
  {
    tag: 'Professional Services',
    client: 'UK Architecture Practice',
    country: '🇬🇧 United Kingdom',
    challenge: 'Opening a representative office to serve growing Vietnam infrastructure projects without triggering full foreign entity obligations.',
    solution: 'Structured a representative office under the Ministry of Construction, advised on IP protection and project contract structuring.',
    result: 'Representative office live in 6 weeks. Three major infrastructure contracts signed in Year 1.',
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80',
  },
];

export function BusinessConsultingPage() {
  const [activeService, setActiveService] = useState(0);

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative min-h-screen bg-[#0F0F0F] flex items-end overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1920&q=80"
            alt="Vietnam business district"
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-[#0F0F0F]/40 to-transparent" />
        </div>

        <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12 pb-20 w-full">
          <div className="max-w-3xl">
            <p className="text-[11px] uppercase tracking-[0.3em] text-[#A88F5C] mb-8">Business Consulting</p>
            <h1
              className="serif text-white mb-8 leading-[1.05]"
              style={{ fontSize: 'clamp(3rem, 6vw, 6rem)', fontWeight: 300 }}
            >
              Navigate Vietnam's Business Landscape with Confidence
            </h1>
            <p className="text-[#EAE3D2] text-lg mb-10 max-w-xl leading-relaxed">
              Expert advisory for international businesses entering or expanding in Vietnam's dynamic market — from strategy through to operational launch.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-3 px-10 py-4 bg-[#A88F5C] text-white text-[11px] uppercase tracking-widest hover:bg-[#EAE3D2] hover:text-[#0F0F0F] transition-colors group"
              >
                Request Consultation
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="#case-studies"
                className="inline-flex items-center gap-3 px-10 py-4 border border-white/30 text-white text-[11px] uppercase tracking-widest hover:border-white transition-colors"
              >
                View Case Studies
              </Link>
            </div>
          </div>

          {/* Stat strip */}
          <div className="grid grid-cols-3 gap-px bg-white/10 mt-20">
            {[
              { value: '80+', label: 'Market Entries' },
              { value: '15+', label: 'Years in Vietnam' },
              { value: '12', label: 'Sectors Covered' },
            ].map(({ value, label }) => (
              <div key={label} className="bg-[#0a0a0a] border-t border-white/10 px-8 py-6">
                <div className="serif text-3xl text-[#A88F5C] mb-1">{value}</div>
                <div className="text-[10px] uppercase tracking-[0.25em] text-white/50">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services — interactive tabs ── */}
      <section className="bg-[#F8F6F1] py-28">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="mb-16">
            <p className="text-[11px] uppercase tracking-[0.3em] text-[#A88F5C] mb-4">What We Do</p>
            <h2 className="serif text-4xl lg:text-5xl">Comprehensive Business Solutions</h2>
          </div>

          <div className="grid lg:grid-cols-[340px_1fr] gap-px bg-[#0F0F0F]/10">
            {/* Tab list */}
            <div className="bg-white">
              {services.map((s, i) => (
                <button
                  key={s.title}
                  onClick={() => setActiveService(i)}
                  className={`w-full text-left px-8 py-6 border-l-[3px] transition-all duration-200 flex items-center justify-between group ${
                    activeService === i
                      ? 'border-[#A88F5C] bg-[#F8F6F1]'
                      : 'border-transparent hover:border-[#A88F5C]/40'
                  }`}
                >
                  <div>
                    <div className={`text-[10px] uppercase tracking-[0.25em] mb-1 transition-colors ${activeService === i ? 'text-[#A88F5C]' : 'text-[#707070]'}`}>
                      0{i + 1}
                    </div>
                    <div className="serif text-lg">{s.title}</div>
                  </div>
                  <ArrowRight size={14} className={`transition-all duration-200 ${activeService === i ? 'text-[#A88F5C] translate-x-1' : 'text-transparent group-hover:text-[#A88F5C]/50'}`} />
                </button>
              ))}
            </div>

            {/* Panel */}
            <div className="bg-white">
              <div className="relative aspect-[16/9] overflow-hidden">
                <img
                  key={activeService}
                  src={services[activeService].image}
                  alt={services[activeService].title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F]/60 to-transparent" />
                <div className="absolute bottom-0 left-0 p-8">
                  <div className="text-[#A88F5C] mb-3">{services[activeService].icon}</div>
                  <h3 className="serif text-white text-3xl">{services[activeService].title}</h3>
                </div>
              </div>
              <div className="p-8 lg:p-10">
                <p className="text-[#444] text-[16px] leading-relaxed mb-8">{services[activeService].description}</p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {services[activeService].points.map((p) => (
                    <div key={p} className="flex items-center gap-3 text-[14px] text-[#555]">
                      <CheckCircle size={14} className="text-[#A88F5C] shrink-0" />
                      {p}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Process ── */}
      <section className="bg-white py-28">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="mb-20">
            <p className="text-[11px] uppercase tracking-[0.3em] text-[#A88F5C] mb-4">How We Work</p>
            <h2 className="serif text-4xl lg:text-5xl max-w-lg">A Structured Approach to Market Entry</h2>
          </div>

          <div className="grid md:grid-cols-4 gap-px bg-[#0F0F0F]/10">
            {[
              { n: '01', title: 'Discovery', desc: 'Understand your objectives, analyse market fit, and develop strategic recommendations tailored to your sector.' },
              { n: '02', title: 'Strategy', desc: 'Create a detailed market entry roadmap with timelines, budgets, milestones, and risk mitigation plans.' },
              { n: '03', title: 'Implementation', desc: 'Execute company formation, licensing, office setup, and operational infrastructure with expert on-ground support.' },
              { n: '04', title: 'Optimisation', desc: 'Continuous advisory on compliance, performance, and business development as your Vietnam operations mature.' },
            ].map(({ n, title, desc }) => (
              <div key={n} className="bg-white p-8 lg:p-10">
                <div className="serif text-[56px] font-light text-[#0F0F0F]/08 leading-none mb-6">{n}</div>
                <div className="w-6 h-px bg-[#A88F5C] mb-6" />
                <h3 className="serif text-2xl mb-4">{title}</h3>
                <p className="text-[#707070] text-[14px] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Sector expertise ── */}
      <section className="bg-[#0F0F0F] py-28 text-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="mb-16">
            <p className="text-[11px] uppercase tracking-[0.3em] text-[#A88F5C] mb-4">Sector Expertise</p>
            <h2 className="serif text-4xl lg:text-5xl">Deep Industry Knowledge</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10">
            {sectors.map(({ name, stat, label }) => (
              <div key={name} className="bg-[#0F0F0F] p-8 group hover:bg-[#1a1a1a] transition-colors">
                <div className="serif text-4xl text-[#A88F5C] mb-1">{stat}</div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-6">{label}</div>
                <h3 className="serif text-xl text-white mb-3">{name}</h3>
                <div className="w-8 h-px bg-[#A88F5C]/30 group-hover:bg-[#A88F5C] transition-colors" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Case Studies ── */}
      <section id="case-studies" className="bg-[#F8F6F1] py-28">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="mb-16">
            <p className="text-[11px] uppercase tracking-[0.3em] text-[#A88F5C] mb-4">Proven Results</p>
            <h2 className="serif text-4xl lg:text-5xl">Client Success Stories</h2>
          </div>

          <div className="space-y-px bg-[#0F0F0F]/10">
            {caseStudies.map((c) => (
              <div key={c.client} className="bg-white grid lg:grid-cols-[280px_1fr] gap-0">
                {/* Image */}
                <div className="relative overflow-hidden aspect-[4/3] lg:aspect-auto">
                  <img
                    src={c.image}
                    alt={c.client}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-[#0F0F0F]/40 flex flex-col justify-end p-6">
                    <div className="text-[10px] uppercase tracking-[0.25em] text-[#A88F5C] mb-1">{c.tag}</div>
                    <div className="serif text-white text-xl">{c.client}</div>
                    <div className="text-white/60 text-[12px] mt-1">{c.country}</div>
                  </div>
                </div>
                {/* Content */}
                <div className="p-8 lg:p-10 grid lg:grid-cols-3 gap-8">
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.25em] text-[#707070] mb-3">Challenge</div>
                    <p className="text-[14px] text-[#444] leading-relaxed">{c.challenge}</p>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.25em] text-[#707070] mb-3">Solution</div>
                    <p className="text-[14px] text-[#444] leading-relaxed">{c.solution}</p>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.25em] text-[#A88F5C] mb-3">Result</div>
                    <p className="text-[14px] text-[#0F0F0F] leading-relaxed font-medium">{c.result}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Our Partners ── */}
      <section className="bg-white py-28">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="mb-16 text-center">
            <p className="text-[11px] uppercase tracking-[0.3em] text-[#A88F5C] mb-4">Our Partners</p>
            <h2 className="serif text-4xl lg:text-5xl mb-6">A Trusted Network on the Ground</h2>
            <p className="text-lg text-[#707070] max-w-2xl mx-auto">
              We collaborate with leading advisory, legal, and real estate firms to deliver seamless market entry.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-px bg-[#0F0F0F]/10">
            {partners.map((name) => (
              <div
                key={name}
                className="bg-white py-10 flex items-center justify-center text-[#0F0F0F]/40 hover:text-[#A88F5C] transition-colors"
              >
                <span className="serif text-xl lg:text-2xl font-light whitespace-nowrap">{name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQs ── */}
      <FAQ
        items={businessFaqs}
        subtitle="Common questions from companies expanding into Vietnam."
        background="beige"
      />

      {/* ── CTA ── */}
      <section className="bg-[#0F0F0F] py-28 text-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center justify-between gap-12">
          <div>
            <h2 className="serif text-4xl lg:text-5xl mb-4">Ready to Enter the Vietnam Market?</h2>
            <p className="text-[#EAE3D2] text-lg max-w-lg">
              Schedule a consultation to discuss your objectives and explore the right structure for your business.
            </p>
          </div>
          <Link
            to="/contact"
            className="shrink-0 px-12 py-4 bg-[#A88F5C] text-white text-[11px] uppercase tracking-widest hover:bg-[#EAE3D2] hover:text-[#0F0F0F] transition-colors"
          >
            Book a Consultation
          </Link>
        </div>
      </section>
    </>
  );
}
