import { Link } from 'react-router';
import { ArrowRight, Building2, Briefcase, Bell, TrendingUp, Users, Shield, Warehouse, CheckCircle } from 'lucide-react';

const services = [
  {
    number: '01',
    icon: <TrendingUp size={28} />,
    title: 'Property Management and Asset Optimisation',
    description: 'Strategic oversight and performance maximisation for your real estate portfolio. We handle everything from tenant relations to financial reporting.',
    features: ['Portfolio Performance Analysis', 'Tenant Acquisition and Relations', 'Maintenance and Operations', 'Financial Reporting and Tax Compliance', 'Market Valuation and Advisory', 'Exit Strategy Planning'],
    link: '/property-management',
    stat: '150+',
    statLabel: 'Properties Managed',
  },
  {
    number: '02',
    icon: <Briefcase size={28} />,
    title: 'Workspace Leasing',
    description: 'Premium office spaces, private suites, and flexible coworking solutions across Hanoi and Ho Chi Minh City with all amenities included.',
    features: ['Private Offices and Suites', 'Coworking Memberships', 'Meeting and Conference Rooms', 'Virtual Office Services', 'Flexible Lease Terms', 'Full Amenities and Support'],
    link: '/workspace-leasing',
    stat: '6',
    statLabel: 'Premium Locations',
  },
  {
    number: '03',
    icon: <Users size={28} />,
    title: 'Business Solutions and Consulting',
    description: 'Expert guidance for international businesses entering or expanding in Vietnam. From company formation to operational launch.',
    features: ['Market Entry Strategy', 'Company Formation and Licensing', 'Legal and Regulatory Compliance', 'Partner and Vendor Sourcing', 'Location Analysis and Site Selection', 'Operational Setup Support'],
    link: '/business-consulting',
    stat: '80+',
    statLabel: 'Market Entries',
  },
  {
    number: '04',
    icon: <Bell size={28} />,
    title: 'Concierge Services',
    description: 'Personalised support for executives, investors, and international professionals. We handle every detail so you can focus on what matters.',
    features: ['Property Search and Viewings', 'Relocation Assistance', 'Visa and Documentation Support', 'Lifestyle and Local Connections', 'Translation and Interpretation', 'Personal Assistance'],
    link: '/concierge',
    stat: '98%',
    statLabel: 'Client Satisfaction',
  },
  {
    number: '05',
    icon: <Warehouse size={28} />,
    title: 'Industrial and Logistics Solutions',
    description: 'Specialised warehousing, factory, and logistics property management for businesses with supply chain and manufacturing operations in Vietnam.',
    features: ['Warehouse and Factory Leasing', 'Industrial Park Placement', 'Logistics Coordination', 'Supply Chain Optimisation', 'Compliance and Safety Management', 'Facility Operations Support'],
    link: '/industrial-logistics',
    stat: '12+',
    statLabel: 'Industrial Parks',
  },
];

export function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[#0F0F0F] py-24 lg:py-32 text-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-12 items-end">
            <div className="lg:col-span-7">
              <p className="text-[11px] uppercase tracking-[0.3em] text-[#A88F5C] mb-8">Our Services</p>
              <h1
                className="serif text-white leading-[1.05]"
                style={{ fontSize: 'clamp(2.8rem, 5vw, 5.5rem)', fontWeight: 300 }}
              >
                Comprehensive Solutions for International Clients
              </h1>
            </div>
            <div className="lg:col-span-5">
              <p className="text-[#EAE3D2] text-lg leading-relaxed">
                From asset management to business advisory — an integrated ecosystem of premium services designed around your needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services list */}
      <section className="bg-[#F8F6F1]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          {services.map((svc, i) => (
            <div
              key={svc.number}
              className="grid lg:grid-cols-12 gap-8 lg:gap-16 py-16 border-b border-[#0F0F0F]/10 items-start"
            >
              {/* Number + icon */}
              <div className="lg:col-span-1 flex lg:flex-col items-center lg:items-start gap-4 lg:gap-3 pt-1">
                <span className="text-[11px] uppercase tracking-[0.25em] text-[#A88F5C]">{svc.number}</span>
                <div className="text-[#A88F5C]">{svc.icon}</div>
              </div>

              {/* Title + description */}
              <div className="lg:col-span-4">
                <h2 className="serif text-2xl lg:text-3xl mb-4 leading-snug">{svc.title}</h2>
                <p className="text-[15px] text-[#555] leading-[1.85] mb-6">{svc.description}</p>
                <Link
                  to={svc.link}
                  className="inline-flex items-center gap-3 group"
                >
                  <span className="text-[11px] uppercase tracking-[0.2em] text-[#0F0F0F] relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#A88F5C] group-hover:after:w-full after:transition-all after:duration-300">
                    Learn More
                  </span>
                  <ArrowRight size={13} className="text-[#A88F5C] group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* Feature list */}
              <div className="lg:col-span-5">
                <div className="grid grid-cols-2 gap-x-8 gap-y-3">
                  {svc.features.map((f) => (
                    <div key={f} className="flex items-start gap-2.5 text-[13px] text-[#555]">
                      <div className="w-1 h-1 rounded-full bg-[#A88F5C] shrink-0 mt-2" />
                      {f}
                    </div>
                  ))}
                </div>
              </div>

              {/* Stat */}
              <div className="lg:col-span-2 lg:text-right">
                <div className="serif text-4xl text-[#8B6914] font-light mb-1">{svc.stat}</div>
                <div className="text-[11px] uppercase tracking-[0.2em] text-[#707070]">{svc.statLabel}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why HiLink — 3 reasons */}
      <section className="bg-white py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="mb-16">
            <p className="text-[11px] uppercase tracking-[0.3em] text-[#A88F5C] mb-4">Why HiLink</p>
            <h2 className="serif text-4xl lg:text-5xl">What Sets Us Apart</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-px bg-[#0F0F0F]/10">
            {[
              { icon: <Shield size={28} />, title: 'Licensed and Compliant', desc: 'Fully licensed real estate agency with GDPR compliance and secured transaction protocols across all services.' },
              { icon: <Users size={28} />, title: 'Bilingual Team', desc: 'Native English and Vietnamese speakers ensuring seamless communication for every international client.' },
              { icon: <TrendingUp size={28} />, title: 'Proven Track Record', desc: '150+ properties managed, 98% client satisfaction, 12+ years of experience in Vietnam\'s real estate market.' },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="bg-[#F8F6F1] p-10">
                <div className="text-[#A88F5C] mb-6">{icon}</div>
                <h3 className="serif text-2xl mb-4">{title}</h3>
                <p className="text-[#707070] text-[14px] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#0F0F0F] py-24 text-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center justify-between gap-12">
          <div>
            <h2 className="serif text-4xl lg:text-5xl mb-4">Let's Discuss Your Needs</h2>
            <p className="text-[#EAE3D2] text-lg">Schedule a consultation to explore how we can support your business.</p>
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
