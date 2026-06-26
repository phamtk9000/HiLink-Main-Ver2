import { Link } from 'react-router';
import { Building2, Users, Wifi, Coffee, Shield, Calendar, MapPin, ArrowRight, Check, ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { FAQ } from '../components/FAQ';

const workspaceFaqs = [
  { question: 'Can I book a tour before committing?', answer: 'Absolutely. Book a tour of any location and our team will walk you through the spaces, amenities, and membership options with no obligation.' },
  { question: 'What membership types do you offer?', answer: 'We offer hot desks, dedicated desks, private offices, and fully customised team suites. Memberships range from daily passes to long-term commitments.' },
  { question: 'What is included in a membership?', answer: 'High-speed internet, meeting room credits, premium coffee, printing, mail handling, and access to community events. Specific inclusions vary by plan and location.' },
  { question: 'Are the workspaces available across multiple locations?', answer: 'Yes. Members can access participating HiLink locations across the city, depending on their membership tier.' },
  { question: 'Can you accommodate larger teams?', answer: 'We design custom suites for teams of all sizes, with flexible terms that scale as your business grows. Speak to our team to configure a space for you.' },
];

const locations = [
  {
    id: 'obc-ly-thai-to',
    name: 'OBC · 60 Lý Thái Tổ',
    address: '60 Lý Thái Tổ, Hoàn Kiếm District',
    city: 'Hanoi',
    type: 'Lakeside Premium Workspace',
    capacity: 'Ground floor · Hoàn Kiếm Lake views',
    available: true,
    image: '/workspace-photos/a665b9317ac3b0e14261cf4defef0b33e698271d-4580x6107.avif',
  },
  {
    id: 'hilink-ton-that-tung',
    name: 'HiLink · 4 Tôn Thất Tùng',
    address: 'Tầng 15, số 4 Tôn Thất Tùng, Đống Đa District',
    city: 'Hanoi',
    type: 'Premium Tower Workspace',
    capacity: 'Floors 12–15 · Hanoi skyline views',
    available: true,
    image: '/workspace-photos/7a4923f30fa4e9b7abdb461ac56a404f2824d011-7783x5191.avif',
  },
];

const featuredSpaces = [
  { name: 'Horizon Hot Desk', type: 'Hot Desk', floor: 'Floor 12', price: '₫89,000', unit: '/hr', status: 'Available', image: '/workspace-photos/235510ecf59fb755c102c0f4b2254ba63925f069-1800x1200.avif' },
  { name: 'Skyline Suite', type: 'Private Office', floor: 'Floor 15', price: '₫450,000', unit: '/hr', status: 'Limited', image: '/workspace-photos/a57e2c5781bc65cf0e2a061375bf32119341b3b2-2048x1366.avif' },
  { name: 'Boardroom Alpha', type: 'Meeting Room', floor: 'Floor 14', price: '₫350,000', unit: '/hr', status: 'Available', image: '/workspace-photos/19664fdfc1b75028ee1c29a5a20eba70b3550e35-1004x1500.avif' },
  { name: 'Focus Pod B2', type: 'Hot Desk', floor: 'Floor 12', price: '₫95,000', unit: '/hr', status: 'Available', image: '/workspace-photos/ef9cc0f2eae3e1f55e0fd32916c6e81e2bcd7e9f-1000x1500.avif' },
  { name: 'Executive Corner', type: 'Private Office', floor: 'Floor 15', price: '₫680,000', unit: '/hr', status: 'Occupied', image: '/workspace-photos/9df347136e8467636fcc2e51a072f148ca018ad7-5650x6643.avif' },
  { name: 'Innovation Lab', type: 'Meeting Room', floor: 'Floor 12', price: '₫520,000', unit: '/hr', status: 'Available', image: '/workspace-photos/3cc3771207592a087306c8dc2cf6376fb6b28183-800x1200.avif' },
];

const membershipPlans = [
  {
    name: 'Hot Desk',
    price: 'From ₫89k',
    period: '/hour',
    description: 'Open-plan flexible seating',
    features: [
      'Panoramic Hanoi skyline views',
      'Ergonomic seating, 1Gbps fibre',
      'Specialty coffee bar',
      'Hourly, daily & monthly passes',
      'Day pass from ₫650,000',
      'Monthly from ₫8,500,000',
    ],
  },
  {
    name: 'Private Office',
    price: 'From ₫450k',
    period: '/hour',
    description: 'Fully enclosed executive suites',
    features: [
      'Floor-to-ceiling glass',
      'Standing desk & lounge area',
      'Dedicated reception',
      'Parking & phone booth access',
      'Teams of 6–10',
      'Monthly from ₫45,000,000',
    ],
    popular: true,
  },
  {
    name: 'Meeting Room',
    price: 'From ₫280k',
    period: '/hour',
    description: 'Boardrooms & workshop spaces',
    features: [
      '85″ 4K display & video bridge',
      'Acoustic wall panels',
      'Writable walls & breakout pods',
      'Capacity 8–20 people',
      'Full event A/V production',
      'Reception & printing included',
    ],
  },
  {
    name: 'Virtual Office',
    price: 'From ₫299k',
    period: '/month',
    description: 'Premium business address',
    features: [
      'Prestige Tôn Thất Tùng address',
      'Mail handling & forwarding',
      'Call answering service',
      '5 day passes per month',
      'Reception & printing',
      'Register your company here',
    ],
  },
];

const amenities = [
  { icon: <Wifi size={24} />, name: 'Fiber Internet', description: '1Gbps symmetric' },
  { icon: <Coffee size={24} />, name: 'Premium Coffee', description: 'Barista-quality espresso' },
  { icon: <Users size={24} />, name: 'Meeting Rooms', description: '2-20 person capacity' },
  { icon: <Shield size={24} />, name: '24/7 Security', description: 'Access control & CCTV' },
  { icon: <Building2 size={24} />, name: 'Event Space', description: 'Community & networking' },
  { icon: <Calendar size={24} />, name: 'Flexible Terms', description: 'Month-to-month available' },
];

const clientLogos = [
  'Tech Startup A',
  'Consulting Firm B',
  'Design Agency C',
  'Law Firm D',
  'Marketing Co E',
  'Finance Group F',
];

export function WorkspacePage() {
  const [showCTA, setShowCTA] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowCTA(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Sticky CTA */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: showCTA ? 0 : 100, opacity: showCTA ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="fixed bottom-8 right-8 z-50"
      >
        <Link
          to="/contact"
          className="flex items-center gap-2 px-8 py-4 bg-[#A88F5C] text-white text-sm uppercase tracking-wider hover:bg-[#0F0F0F] transition-colors shadow-2xl"
        >
          <Calendar size={18} />
          Book a Tour
        </Link>
      </motion.div>

      {/* Hero Section with Video */}
      <section className="relative min-h-[80vh] flex items-center bg-[#0F0F0F] text-white overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/workspace-photos/c7b0fcf2692da34e051136c7476183cc9967a4a4-6287x5202.avif"
            alt="HiLink workspace"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0F0F0F]/60 to-[#0F0F0F]/90" />
        </div>

        <div className="relative max-w-[1600px] mx-auto px-6 lg:px-12 py-24 w-full">
          <motion.div 
            className="max-w-4xl"
          >
            <motion.p 
              className="text-sm uppercase tracking-wider text-[#A88F5C] mb-8"
            >
              Workspace Leasing
            </motion.p>
            <motion.h1 
              className="serif text-5xl lg:text-7xl mb-8 leading-tight"
            >
              Work Where You Thrive
            </motion.h1>
            <motion.p 
              className="text-xl text-[#EAE3D2] mb-12 leading-relaxed"
            >
              Premium flexible workspaces across two Hanoi addresses — lakeside at 60 Lý Thái Tổ and high above Đống Đa at 4 Tôn Thất Tùng. Hot desks, private offices, and meeting rooms, bookable by the hour.
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-[#A88F5C] text-white text-sm uppercase tracking-wider hover:bg-[#EAE3D2] hover:text-[#0F0F0F] transition-colors group"
              >
                <Calendar size={18} />
                Book a Tour
              </Link>
              <a
                href="https://workspace.hilink.vn"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-[#A88F5C] text-white text-sm uppercase tracking-wider hover:bg-[#EAE3D2] hover:text-[#0F0F0F] transition-colors group"
              >
                <ExternalLink size={18} />
                Visit HiLink Workspace
              </a>
              <a
                href="#locations"
                className="inline-flex items-center justify-center px-10 py-4 border border-white text-white text-sm uppercase tracking-wider hover:bg-white hover:text-[#0F0F0F] transition-colors"
              >
                View Locations
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Why HiLink Workspaces */}
      <section className="py-24 lg:py-32 bg-[#F8F6F1]">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <motion.div 
            className="text-center mb-16"
          >
            <h2 className="serif text-4xl lg:text-5xl mb-6">Why Choose HiLink</h2>
            <p className="text-xl text-[#707070] max-w-3xl mx-auto">
              More than just a desk—a complete business ecosystem
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-3 lg:grid-cols-6 gap-8"
          >
            {amenities.map((amenity) => (
              <motion.div 
                key={amenity.name}
                className="text-center"
                whileHover={{ y: -5 }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full text-[#A88F5C] mb-4">
                  {amenity.icon}
                </div>
                <h3 className="serif text-lg mb-2">{amenity.name}</h3>
                <p className="text-sm text-[#707070]">{amenity.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Membership Plans */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <motion.div 
            className="text-center mb-16"
          >
            <h2 className="serif text-4xl lg:text-5xl mb-6">Spaces &amp; Pricing</h2>
            <p className="text-xl text-[#707070] max-w-3xl mx-auto">
              Transparent hourly rates — book a hot desk, private office, meeting room, or virtual office
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {membershipPlans.map((plan) => (
              <PlanCard key={plan.name} {...plan} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Spaces — mirrors the live HiLink workspace explorer */}
      <section className="py-24 lg:py-32 bg-[#0F0F0F] text-white overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-14">
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-[#C9A55A] mb-4 flex items-center gap-3">
                <span className="w-8 h-px bg-[#C9A55A]" /> 9 Spaces · 3 Floors · Hanoi
              </p>
              <h2 className="serif text-4xl lg:text-5xl">Featured Spaces</h2>
            </div>
            <a
              href="https://workspace.hilink.vn"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-[#C9A55A] border-b border-[#C9A55A]/40 pb-1 hover:border-[#C9A55A] transition-colors"
            >
              See live availability <ExternalLink size={13} />
            </a>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featuredSpaces.map((s) => (
              <a
                key={s.name}
                href="https://workspace.hilink.vn"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block overflow-hidden bg-[#1a1a1a]"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={s.image} alt={s.name} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-[#0F0F0F]/20 to-transparent" />
                  <span className={`absolute top-4 left-4 text-[9px] uppercase tracking-[0.16em] px-2.5 py-1 ${
                    s.status === 'Available' ? 'bg-[#5B7B57] text-white' : s.status === 'Limited' ? 'bg-[#A88F5C] text-white' : 'bg-[#6b3a3a] text-white'
                  }`}>{s.status}</span>
                  <span className="absolute top-4 right-4 text-[10px] uppercase tracking-[0.12em] text-white/70">{s.floor}</span>
                </div>
                <div className="flex items-end justify-between p-5">
                  <div>
                    <p className="text-[9px] uppercase tracking-[0.2em] text-[#C9A55A] mb-1.5">{s.type}</p>
                    <h3 className="serif text-xl">{s.name}</h3>
                  </div>
                  <p className="serif text-lg text-[#C9A55A] whitespace-nowrap">{s.price}<span className="text-[11px] text-white/50">{s.unit}</span></p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Locations */}
      <section id="locations" className="py-24 lg:py-32 bg-[#F8F6F1]">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <motion.div 
            className="text-center mb-16"
          >
            <h2 className="serif text-4xl lg:text-5xl mb-6">Our Locations</h2>
            <p className="text-xl text-[#707070] max-w-3xl mx-auto">
              Two premium addresses in central Hanoi — Hoàn Kiếm and Đống Đa
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 gap-8"
          >
            {locations.map((location) => (
              <LocationCard key={location.id} {...location} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Client Logos */}
      <section className="py-16 bg-white border-y border-[#0F0F0F]/10">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <p className="text-center text-sm uppercase tracking-wider text-[#707070] mb-12">
            Trusted by Leading Companies
          </p>
          <div className="flex flex-wrap justify-center items-center gap-12">
            {clientLogos.map((logo) => (
              <div key={logo} className="text-[#0F0F0F]/40 text-lg uppercase tracking-wider">
                {logo}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <FAQ
        items={workspaceFaqs}
        subtitle="What members most often ask before joining a HiLink workspace."
        background="beige"
      />

      {/* CTA Section */}
      <section className="py-24 lg:py-32 bg-[#0F0F0F] text-white">
        <motion.div 
          className="max-w-[1600px] mx-auto px-6 lg:px-12 text-center"
        >
          <h2 className="serif text-4xl lg:text-5xl mb-8">
            Ready to Find Your Perfect Workspace?
          </h2>
          <p className="text-xl text-[#EAE3D2] mb-12 max-w-2xl mx-auto">
            Book a tour of any of our locations. Our team will help you find the ideal solution for your business.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-12 py-4 bg-[#A88F5C] text-white text-sm uppercase tracking-wider hover:bg-[#EAE3D2] hover:text-[#0F0F0F] transition-colors"
          >
            <Calendar size={18} />
            Schedule a Tour
          </Link>
        </motion.div>
      </section>
    </>
  );
}

function PlanCard({ name, price, period, description, features, popular }: {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  popular?: boolean;
}) {
  return (
    <motion.div 
      className={`bg-white p-8 relative ${popular ? 'ring-2 ring-[#A88F5C]' : 'border border-[#0F0F0F]/10'}`}
      whileHover={{ y: -10, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
    >
      {popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#A88F5C] text-white text-xs uppercase tracking-wider">
          Popular
        </div>
      )}
      <h3 className="serif text-2xl mb-2">{name}</h3>
      <p className="text-sm text-[#707070] mb-6">{description}</p>
      <div className="mb-8">
        <span className="serif text-4xl">{price}</span>
        <span className="text-[#707070]">{period}</span>
      </div>
      <ul className="space-y-3 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3 text-sm">
            <Check size={16} className="text-[#A88F5C] flex-shrink-0 mt-0.5" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <Link
        to="/contact"
        className="block w-full text-center px-6 py-3 bg-[#0F0F0F] text-white text-sm uppercase tracking-wider hover:bg-[#A88F5C] transition-colors"
      >
        Get Started
      </Link>
    </motion.div>
  );
}

function LocationCard({ name, address, city, type, capacity, available, image }: {
  name: string;
  address: string;
  city: string;
  type: string;
  capacity: string;
  available: boolean;
  image: string;
}) {
  return (
    <motion.div 
      className="group bg-white overflow-hidden"
      whileHover={{ y: -10, boxShadow: '0 20px 40px rgba(0,0,0,0.15)' }}
    >
      <a href="https://workspace.hilink.vn" target="_blank" rel="noopener noreferrer">
        <div className="relative aspect-[16/10] overflow-hidden">
          <motion.img
            src={image}
            alt={name}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.6 }}
          />
          <div className="absolute top-6 right-6">
            <div className={`px-4 py-2 text-xs uppercase tracking-wider ${
              available ? 'bg-[#A88F5C] text-white' : 'bg-[#707070] text-white'
            }`}>
              {available ? 'Now Available' : 'Coming Soon'}
            </div>
          </div>
        </div>
        <div className="p-8">
          <div className="text-sm uppercase tracking-wider text-[#A88F5C] mb-3">{city}</div>
          <h3 className="serif text-3xl mb-4">{name}</h3>
          <div className="flex items-start gap-2 text-[#707070] mb-4">
            <MapPin size={16} className="flex-shrink-0 mt-1" />
            <span className="text-sm">{address}</span>
          </div>
          <div className="flex items-center justify-between pt-6 border-t border-[#0F0F0F]/10">
            <div>
              <div className="text-xs text-[#707070] mb-1">Type</div>
              <div className="text-sm">{type}</div>
            </div>
            <div>
              <div className="text-xs text-[#707070] mb-1">Capacity</div>
              <div className="text-sm">{capacity}</div>
            </div>
          </div>
          <div className="mt-6">
            <div className="inline-flex items-center gap-2 text-sm uppercase tracking-wider text-[#0F0F0F] group-hover:text-[#A88F5C] group-hover:gap-4 transition-all">
              Explore live availability <ArrowRight size={16} />
            </div>
          </div>
        </div>
      </a>
    </motion.div>
  );
}
