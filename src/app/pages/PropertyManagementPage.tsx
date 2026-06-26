import { Link } from 'react-router';
import { TrendingUp, Users, Shield, BarChart, ChevronLeft, ChevronRight, MapPin, Building2, Calendar, ArrowRight, Home, Briefcase, Globe, ClipboardList, FileSignature, Settings, LineChart, LayoutDashboard, Bell } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import { PropertyRentalForm } from '../components/PropertyRentalForm';
import { FAQ } from '../components/FAQ';
import { AnimatedCounter } from '../components/AnimatedCounter';
import { HeroBg } from '../components/HeroBg';

const propertyTypes = [
  { icon: <Home size={26} />, title: 'Residential', desc: 'Apartments, villas, and townhouses for individual and family living.' },
  { icon: <Building2 size={26} />, title: 'Commercial', desc: 'Offices, retail units, and mixed-use assets across prime locations.' },
  { icon: <Calendar size={26} />, title: 'Hospitality & Short-Term', desc: 'Serviced apartments and short-stay rentals with full turnover management.' },
  { icon: <Briefcase size={26} />, title: 'Developer Projects', desc: 'End-to-end management for developers and large project owners.' },
];

const ownerAudience = [
  'Individual landlords',
  'Real estate investors & HNW individuals',
  'Developers & project owners',
];

const tenantAudience = [
  'Expats & foreign residents',
  'Business & corporate tenants',
];

const processSteps = [
  { icon: <ClipboardList size={24} />, step: '01', title: 'Onboarding & Assessment', desc: 'We audit your asset, set targets, and agree on a tailored management scope.' },
  { icon: <FileSignature size={24} />, step: '02', title: 'Tenant Acquisition', desc: 'Premium screening, marketing, and lease execution to secure quality tenants.' },
  { icon: <Settings size={24} />, step: '03', title: 'Day-to-Day Management', desc: 'Maintenance, tenant relations, rent collection, and 24/7 concierge support.' },
  { icon: <LineChart size={24} />, step: '04', title: 'Reporting & Optimization', desc: 'Monthly statements, performance reviews, and ongoing yield enhancement.' },
];

const metrics = [
  { value: 98, suffix: '%', label: 'Average Occupancy' },
  { value: 23, suffix: '%', label: 'Avg. NOI Increase' },
  { value: 150, suffix: '+', label: 'Assets Under Management' },
  { value: 24, suffix: '/7', label: 'Concierge Support' },
];

const propertyFaqs = [
  { question: 'What types of property do you manage?', answer: 'We manage residential apartments and villas, commercial offices and retail, hospitality and short-term rentals, and full developer projects across Hanoi and Ho Chi Minh City.' },
  { question: 'How are your management fees structured?', answer: 'Fees are tailored to your asset type and scope of service, typically as a percentage of collected rent. We agree on a transparent structure during onboarding with no hidden charges.' },
  { question: 'Do you work with overseas and non-resident owners?', answer: 'Yes. A large share of our clients are international investors and non-resident landlords. We provide GDPR-compliant reporting, remote owner portals, and bilingual communication so distance is never a barrier.' },
  { question: 'How quickly can you onboard a new property?', answer: 'Most properties are fully onboarded within one to two weeks, depending on condition and documentation. We handle the assessment, marketing, and tenant acquisition end to end.' },
  { question: 'How will I track my property\u2019s performance?', answer: 'You receive monthly financial statements and performance analytics. Our owner dashboard (coming soon) will give you real-time visibility into occupancy, income, and maintenance.' },
];

const properties = [
  {
    id: 1,
    slug: 'quarter-house',
    name: 'The Quarter House',
    location: 'Hoan Kiem, Hanoi',
    type: 'Boutique Townhouse',
    units: 4,
    occupancy: 95,
    avgRent: '$4,000/month',
    image: '/src/assets/quater-house/e66e48d4-d045-4d8b-b497-28499961516e.avif',
  },
  {
    id: 2,
    slug: null,
    name: 'The Metropolitan',
    location: 'Ba Dinh, Hanoi',
    type: 'Premium Residential',
    units: 156,
    occupancy: 98,
    avgRent: '$2,800/month',
    image: 'https://images.unsplash.com/photo-1774685110718-c5b4fe026144?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjByZXNpZGVudGlhbCUyMGJ1aWxkaW5nJTIwZXh0ZXJpb3J8ZW58MXx8fHwxNzc1ODEwOTEyfDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 3,
    slug: null,
    name: 'Skyline Tower',
    location: 'District 1, HCMC',
    type: 'Mixed-Use Development',
    units: 240,
    occupancy: 95,
    avgRent: '$3,200/month',
    image: 'https://images.unsplash.com/photo-1741317228370-fc25f460cc57?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBidWlsZGluZyUyMHZpZXRuYW18ZW58MXx8fHwxNzc1ODEwOTEzfDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 4,
    slug: null,
    name: 'Vista Residences',
    location: 'Tay Ho, Hanoi',
    type: 'Luxury Apartments',
    units: 89,
    occupancy: 100,
    avgRent: '$3,800/month',
    image: 'https://images.unsplash.com/photo-1768223933860-6d62bc5b2ff3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBwcm9wZXJ0eSUyMGV4dGVyaW9yJTIwYXJjaGl0ZWN0dXJlfGVufDF8fHx8MTc3NTgxMDM4NXww&ixlib=rb-4.1.0&q=80&w=1080',
  },
];

const testimonials = [
  {
    id: 1,
    quote: "HiLink transformed our property portfolio performance. Their hands-on approach and deep market knowledge delivered a 23% increase in NOI within the first year. They're not just managers—they're true partners.",
    author: 'James Morrison',
    role: 'CEO, Morrison Capital Partners',
    property: 'The Metropolitan',
    image: 'https://images.unsplash.com/photo-1543879739-ab87be3df369?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHByb2Zlc3Npb25hbCUyMG1hbiUyMGFzaWFufGVufDF8fHx8MTc3NTgxMDkxNHww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 2,
    quote: "As an offshore investor, I needed someone I could trust completely. HiLink's transparency, regular reporting, and proactive communication gave me peace of mind. My properties are in the best hands.",
    author: 'Sophie Chen',
    role: 'Principal, Chen Family Office',
    property: 'Vista Residences',
    image: 'https://images.unsplash.com/photo-1581065178047-8ee15951ede6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHByb2Zlc3Npb25hbCUyMHdvbWFuJTIwYXNpYW58ZW58MXx8fHwxNzc1ODEwOTEzfDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 3,
    quote: "The level of service is exceptional. From tenant relations to financial optimization, every detail is handled with professionalism. HiLink's concierge approach to property management is unmatched in Vietnam.",
    author: 'David Zhang',
    role: 'Managing Director, Apex Investments',
    property: 'Skyline Tower',
    image: 'https://images.unsplash.com/photo-1763478958776-ebd04b6459ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwcm9wZXJ0eSUyMG1hbmFnZXIlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NzU4MTA5MTJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
];

const teamMembers = [
  {
    name: 'Linh Nguyen',
    role: 'Head of Property Management',
    specialty: 'Residential Portfolio Optimization',
    image: 'https://images.unsplash.com/photo-1581065178047-8ee15951ede6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHByb2Zlc3Npb25hbCUyMHdvbWFuJTIwYXNpYW58ZW58MXx8fHwxNzc1ODEwOTEzfDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    name: 'Michael Tran',
    role: 'Senior Property Advisor',
    specialty: 'Commercial & Mixed-Use Assets',
    image: 'https://images.unsplash.com/photo-1543879739-ab87be3df369?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHByb2Zlc3Npb25hbCUyMG1hbiUyMGFzaWFufGVufDF8fHx8MTc3NTgxMDkxNHww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    name: 'Anna Pham',
    role: 'Tenant Relations Manager',
    specialty: 'Client Experience & Retention',
    image: 'https://images.unsplash.com/photo-1763478958776-ebd04b6459ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwcm9wZXJ0eSUyMG1hbmFnZXIlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NzU4MTA5MTJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    name: 'Thomas Le',
    role: 'Financial Controller',
    specialty: 'Revenue Optimization & Reporting',
    image: 'https://images.unsplash.com/photo-1758518732175-5d608ba3abdf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMHRlYW18ZW58MXx8fHwxNzc1NjgxOTMxfDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
];

export function PropertyManagementPage() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 lg:py-32 bg-[#0F0F0F] text-white">
        <HeroBg image="/workspace-photos/7a4923f30fa4e9b7abdb461ac56a404f2824d011-7783x5191.avif" />
        <div className="relative z-10 max-w-[1600px] mx-auto px-6 lg:px-12">
          <motion.div 
            className="max-w-4xl"
          >
            <p className="text-sm uppercase tracking-wider text-[#A88F5C] mb-8">Property Management</p>
            <h1 className="serif text-5xl lg:text-7xl mb-8 leading-tight">
              Your Property.<br />Our Passion.<br />Exceptional Results.
            </h1>
            <p className="text-xl text-[#EAE3D2] mb-12 leading-relaxed">
              Concierge-level property management that maximizes asset value and delivers peace of mind for international investors.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-10 py-4 bg-[#A88F5C] text-white text-sm uppercase tracking-wider hover:bg-[#EAE3D2] hover:text-[#0F0F0F] transition-colors group"
            >
              Schedule a Portfolio Review
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 lg:py-32 bg-[#F8F6F1]">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <motion.div 
            className="text-center mb-16"
          >
            <h2 className="serif text-4xl lg:text-5xl mb-6">Full-Service Management</h2>
            <p className="text-xl text-[#707070] max-w-3xl mx-auto">
              A personal touch at every stage, from tenant acquisition to financial reporting
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-[#0F0F0F]"
          >
            <ServiceCard
              icon={<Users size={28} />}
              title="Tenant Relations"
              description="Premium tenant screening, onboarding, and 24/7 concierge support"
            />
            <ServiceCard
              icon={<TrendingUp size={28} />}
              title="Revenue Optimization"
              description="Strategic pricing, occupancy management, and yield enhancement"
            />
            <ServiceCard
              icon={<Shield size={28} />}
              title="Asset Protection"
              description="Proactive maintenance, quality contractors, and property inspections"
            />
            <ServiceCard
              icon={<BarChart size={28} />}
              title="Transparent Reporting"
              description="Monthly financial statements, owner portals, and performance analytics"
            />
          </motion.div>
        </div>
      </section>

      {/* What We Manage */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <motion.div className="text-center mb-16">
            <p className="text-[11px] uppercase tracking-[0.3em] text-[#A88F5C] mb-4">What We Manage</p>
            <h2 className="serif text-4xl lg:text-5xl mb-6">Every Asset Class, One Standard</h2>
            <p className="text-xl text-[#707070] max-w-3xl mx-auto">
              From single residences to full developer portfolios, managed with the same concierge care.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {propertyTypes.map(({ icon, title, desc }) => (
              <motion.div key={title} className="bg-white p-8" whileHover={{ y: -5 }}>
                <div className="text-[#A88F5C] mb-4">{icon}</div>
                <h3 className="serif text-xl mb-3">{title}</h3>
                <p className="text-[#707070] text-sm leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Who We Serve */}
      <section className="py-24 lg:py-32 bg-[#F8F6F1]">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <motion.div className="text-center mb-16">
            <p className="text-[11px] uppercase tracking-[0.3em] text-[#A88F5C] mb-4">Who We Serve</p>
            <h2 className="serif text-4xl lg:text-5xl mb-6">Built for Owners & Occupiers Alike</h2>
            <p className="text-xl text-[#707070] max-w-3xl mx-auto">
              Whether you hold the asset or occupy it, we tailor our service to your role.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-10 lg:p-12">
              <div className="text-[#A88F5C] mb-6"><Briefcase size={28} /></div>
              <h3 className="serif text-2xl lg:text-3xl mb-6">Owners & Landlords</h3>
              <ul className="space-y-4">
                {ownerAudience.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[#444] text-[16px]">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#A88F5C] shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-[#0F0F0F] text-white p-10 lg:p-12">
              <div className="text-[#A88F5C] mb-6"><Globe size={28} /></div>
              <h3 className="serif text-2xl lg:text-3xl mb-6">Tenants & Occupiers</h3>
              <ul className="space-y-4">
                {tenantAudience.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[#EAE3D2] text-[16px]">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#A88F5C] shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <motion.div className="text-center mb-16">
            <p className="text-[11px] uppercase tracking-[0.3em] text-[#A88F5C] mb-4">How It Works</p>
            <h2 className="serif text-4xl lg:text-5xl mb-6">A Clear Path from Onboarding to Returns</h2>
            <p className="text-xl text-[#707070] max-w-3xl mx-auto">
              A structured, four-stage process designed for transparency at every step.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map(({ icon, step, title, desc }) => (
              <motion.div key={step} className="bg-[#F8F6F1] p-8" whileHover={{ y: -5 }}>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[#A88F5C]">{icon}</span>
                  <span className="serif text-3xl text-[#0F0F0F]/10">{step}</span>
                </div>
                <h3 className="serif text-xl mb-3">{title}</h3>
                <p className="text-[#707070] text-sm leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Properties We Manage */}
      <section className="py-24 lg:py-32 bg-[#F8F6F1]">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <motion.div 
            className="text-center mb-16"
          >
            <h2 className="serif text-4xl lg:text-5xl mb-6">Properties We Manage</h2>
            <p className="text-xl text-[#707070] max-w-3xl mx-auto">
              A diverse portfolio of premium residential and commercial assets
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 gap-8"
          >
            {properties.map((property) => (
              <PropertyCard key={property.id} {...property} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Results & Metrics */}
      <section className="py-24 lg:py-32 bg-[#0F0F0F] text-white">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <motion.div className="text-center mb-16">
            <p className="text-[11px] uppercase tracking-[0.3em] text-[#A88F5C] mb-4">Results & Metrics</p>
            <h2 className="serif text-4xl lg:text-5xl mb-6">Performance That Speaks for Itself</h2>
            <p className="text-xl text-[#EAE3D2] max-w-3xl mx-auto">
              Numbers from a portfolio managed with discipline and a concierge mindset.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/10">
            {metrics.map(({ value, suffix, label }) => (
              <div key={label} className="bg-[#0F0F0F] p-10 text-center">
                <div className="serif text-5xl lg:text-6xl text-[#A88F5C] mb-3">
                  <AnimatedCounter end={value} suffix={suffix} />
                </div>
                <div className="text-[11px] uppercase tracking-[0.2em] text-[#EAE3D2]">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Carousel */}
      <section className="py-24 lg:py-32 bg-[#EAE3D2]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <motion.div 
            className="text-center mb-16"
          >
            <h2 className="serif text-4xl lg:text-5xl mb-6">What Our Clients Say</h2>
          </motion.div>

          <div className="relative">
            <motion.div 
              key={currentTestimonial}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="grid lg:grid-cols-3 gap-12 items-center"
            >
              <div className="lg:col-span-2">
                <blockquote className="serif text-3xl lg:text-4xl mb-8 leading-relaxed">
                  "{testimonials[currentTestimonial].quote}"
                </blockquote>
                <div>
                  <div className="text-xl mb-1">{testimonials[currentTestimonial].author}</div>
                  <div className="text-[#707070] mb-1">{testimonials[currentTestimonial].role}</div>
                  <div className="text-sm text-[#A88F5C] uppercase tracking-wider">
                    {testimonials[currentTestimonial].property}
                  </div>
                </div>
              </div>
              <div className="flex justify-center lg:justify-end">
                <img
                  src={testimonials[currentTestimonial].image}
                  alt={testimonials[currentTestimonial].author}
                  className="w-48 h-48 rounded-full object-cover"
                />
              </div>
            </motion.div>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-12">
              <button
                onClick={prevTestimonial}
                className="p-3 border border-[#0F0F0F]/20 hover:bg-[#0F0F0F] hover:text-white transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={20} />
              </button>
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentTestimonial ? 'bg-[#A88F5C] w-8' : 'bg-[#0F0F0F]/20'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
              <button
                onClick={nextTestimonial}
                className="p-3 border border-[#0F0F0F]/20 hover:bg-[#0F0F0F] hover:text-white transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Meet Your Concierge Team */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <motion.div 
            className="text-center mb-16"
          >
            <h2 className="serif text-4xl lg:text-5xl mb-6">Meet Your Concierge Team</h2>
            <p className="text-xl text-[#707070] max-w-3xl mx-auto">
              Dedicated professionals committed to your property's success
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-12"
          >
            {teamMembers.map((member) => (
              <TeamMemberCard key={member.name} {...member} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Owner Dashboard (Coming Soon) */}
      <section className="py-24 lg:py-32 bg-[#F8F6F1]">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            <motion.div>
              <span className="inline-block px-4 py-1.5 bg-[#A88F5C]/15 text-[#8B6914] text-[11px] uppercase tracking-[0.2em] mb-6">
                Coming Soon
              </span>
              <h2 className="serif text-4xl lg:text-5xl mb-6">Your Owner Dashboard</h2>
              <p className="text-lg text-[#707070] mb-8 leading-relaxed">
                A secure, real-time portal to track occupancy, income, maintenance, and reporting across your entire portfolio — anytime, from anywhere.
              </p>
              <ul className="space-y-4">
                {['Live occupancy & income tracking', 'On-demand financial statements', 'Maintenance request visibility', 'Document vault & lease archive'].map((f) => (
                  <li key={f} className="flex items-center gap-3 text-[#444] text-[16px]">
                    <Bell size={16} className="text-[#A88F5C] shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              className="relative aspect-[4/3] bg-[#0F0F0F] flex items-center justify-center overflow-hidden"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4 }}
            >
              <div className="text-center px-8">
                <LayoutDashboard size={64} className="text-[#A88F5C] mx-auto mb-6" />
                <p className="serif text-2xl text-white mb-2">In Development</p>
                <p className="text-sm text-[#EAE3D2]">Launching to managed-property owners soon.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Property Rental Estimate Form */}
      <PropertyRentalForm />

      {/* FAQs */}
      <FAQ
        items={propertyFaqs}
        subtitle="Everything international owners and tenants ask before working with us."
        background="white"
      />

      {/* CTA Section */}
      <section className="py-24 lg:py-32 bg-[#0F0F0F] text-white">
        <motion.div 
          className="max-w-[1600px] mx-auto px-6 lg:px-12 text-center"
        >
          <h2 className="serif text-4xl lg:text-5xl mb-8">
            Elevate Your Property Performance
          </h2>
          <p className="text-xl text-[#EAE3D2] mb-12 max-w-2xl mx-auto">
            Let's discuss how our concierge approach can maximize your asset value and minimize your stress.
          </p>
          <Link
            to="/contact"
            className="inline-block px-12 py-4 bg-[#A88F5C] text-white text-sm uppercase tracking-wider hover:bg-[#EAE3D2] hover:text-[#0F0F0F] transition-colors"
          >
            Schedule a Consultation
          </Link>
        </motion.div>
      </section>
    </>
  );
}

function ServiceCard({ icon, title, description }: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <motion.div 
      className="bg-[#F8F6F1] p-8"
      whileHover={{ y: -5 }}
    >
      <div className="text-[#A88F5C] mb-4">{icon}</div>
      <h3 className="serif text-xl mb-3">{title}</h3>
      <p className="text-[#707070] text-sm leading-relaxed">{description}</p>
    </motion.div>
  );
}

function PropertyCard({ name, location, type, units, occupancy, avgRent, image, slug }: {
  name: string;
  location: string;
  type: string;
  units: number;
  occupancy: number;
  avgRent: string;
  image: string;
  slug: string | null;
}) {
  const inner = (
    <motion.div
      className={`group bg-white overflow-hidden ${slug ? 'cursor-pointer' : ''}`}
      whileHover={{ y: -10, boxShadow: '0 20px 40px rgba(0,0,0,0.15)' }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <motion.img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.6 }}
        />
        <div className="absolute top-6 right-6 px-4 py-2 bg-white/95 text-xs uppercase tracking-wider">
          {type}
        </div>
        {slug && (
          <div className="absolute inset-0 bg-[#0F0F0F]/0 group-hover:bg-[#0F0F0F]/20 transition-colors duration-300 flex items-center justify-center">
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-6 py-3 bg-[#A88F5C] text-white text-xs uppercase tracking-widest">
              View Property
            </span>
          </div>
        )}
      </div>
      <div className="p-8">
        <h3 className="serif text-3xl mb-2">{name}</h3>
        <div className="flex items-center gap-2 text-[#A88F5C] mb-6">
          <MapPin size={16} />
          <span className="text-sm">{location}</span>
        </div>
        <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#0F0F0F]/10">
          <div>
            <div className="text-sm text-[#707070] mb-1">Units</div>
            <div className="serif text-xl">{units}</div>
          </div>
          <div>
            <div className="text-sm text-[#707070] mb-1">Occupancy</div>
            <div className="serif text-xl">{occupancy}%</div>
          </div>
          <div>
            <div className="text-sm text-[#707070] mb-1">Avg Rent</div>
            <div className="serif text-lg">{avgRent}</div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  return slug ? (
    <Link to={`/workspace/${slug}`}>{inner}</Link>
  ) : (
    inner
  );
}

function TeamMemberCard({ name, role, specialty, image }: {
  name: string;
  role: string;
  specialty: string;
  image: string;
}) {
  return (
    <motion.div 
      className="text-center"
      whileHover={{ y: -5 }}
    >
      <div className="mb-6 relative inline-block">
        <img
          src={image}
          alt={name}
          className="w-40 h-40 rounded-full object-cover mx-auto"
        />
        <div className="absolute inset-0 rounded-full border-2 border-[#A88F5C] opacity-0 hover:opacity-100 transition-opacity" />
      </div>
      <h3 className="serif text-2xl mb-2">{name}</h3>
      <div className="text-sm text-[#A88F5C] uppercase tracking-wider mb-3">{role}</div>
      <p className="text-sm text-[#707070]">{specialty}</p>
    </motion.div>
  );
}
