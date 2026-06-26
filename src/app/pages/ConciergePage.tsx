import { Plane, UtensilsCrossed, Calendar, Key, Briefcase, Sparkles, Mail, Lock } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';

const services = [
  {
    icon: <Plane size={26} />,
    title: 'Travel & Aviation',
    description: 'Private jet charters, first-class bookings, luxury hotel reservations, bespoke itineraries',
    image: 'https://images.unsplash.com/photo-1768346564233-d71f37bd19b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBwcml2YXRlJTIwamV0JTIwaW50ZXJpb3J8ZW58MXx8fHwxNzc1NzIzMjY1fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    icon: <UtensilsCrossed size={26} />,
    title: 'Dining & Entertainment',
    description: 'Private chef services, restaurant reservations at Michelin-starred venues, exclusive event access',
    image: 'https://images.unsplash.com/photo-1513772457252-c0417654a2a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5lJTIwZGluaW5nJTIwcmVzdGF1cmFudCUyMGVsZWdhbnR8ZW58MXx8fHwxNzc1NzY4MDM0fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    icon: <Calendar size={26} />,
    title: 'Events & Experiences',
    description: 'VIP access to cultural events, private tours, yacht charters, curated experiences',
    image: 'https://images.unsplash.com/photo-1652486392838-bee694e9c931?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB5YWNodCUyMG9jZWFuJTIwc3Vuc2V0fGVufDF8fHx8MTc3NTgxMTE4N3ww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    icon: <Key size={26} />,
    title: 'Lifestyle Management',
    description: 'Personal shopping, home services, relocation support, wellness and spa bookings',
    image: 'https://images.unsplash.com/photo-1774685110718-c5b4fe026144?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjByZXNpZGVudGlhbCUyMGJ1aWxkaW5nJTIwZXh0ZXJpb3J8ZW58MXx8fHwxNzc1ODEwOTEyfDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    icon: <Briefcase size={26} />,
    title: 'Business Support',
    description: 'Executive assistance, meeting coordination, translation services, corporate gifting',
    image: 'https://images.unsplash.com/photo-1698047681820-f26b00b6c639?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMG1lZXRpbmclMjBoYW5kc2hha2V8ZW58MXx8fHwxNzc1NzA2MzkyfDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    icon: <Sparkles size={26} />,
    title: 'Bespoke Requests',
    description: 'Whatever you need, whenever you need it. Your dedicated concierge makes it happen',
    image: 'https://images.unsplash.com/photo-1772214559608-37fdb1ff9f55?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxleGNsdXNpdmUlMjB2aXAlMjBldmVudCUyMHBhcnR5fGVufDF8fHx8MTc3NTgxMTE4N3ww&ixlib=rb-4.1.0&q=80&w=1080',
  },
];

export function ConciergePage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <>
      {/* Hero Section with Atmospheric Video */}
      <section className="relative min-h-screen flex items-center bg-[#0F0F0F] text-white overflow-hidden">
        <div className="absolute inset-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            poster="/workspace-photos/BG_Hanoi.avif"
            className="w-full h-full object-cover opacity-[0.35]"
          >
            <source src="/media/concierge-timelapse.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-[#0F0F0F]/80 via-[#0F0F0F]/55 to-[#0F0F0F]" />
        </div>

        <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12 py-24 w-full">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-8">
              <Sparkles size={16} className="text-[#A88F5C]" />
              <p className="text-[11px] uppercase tracking-[0.3em] text-[#A88F5C]">
                Concierge Services
              </p>
            </div>
            <h1
              className="serif text-white mb-8 leading-[1.05]"
              style={{ fontSize: 'clamp(3.5rem, 7vw, 7rem)', fontWeight: 300 }}
            >
              Your Life.<br />Perfected.
            </h1>
            <p className="text-lg md:text-xl text-[#EAE3D2] mb-12 leading-relaxed max-w-2xl font-light">
              A dedicated concierge team at your service, 24/7. From the extraordinary to the everyday, we make the impossible, effortless.
            </p>
            <a
              href="#enquire"
              className="inline-flex items-center gap-3 px-10 py-4 bg-[#A88F5C] text-white text-[11px] uppercase tracking-[0.2em] hover:bg-[#EAE3D2] hover:text-[#0F0F0F] transition-colors"
            >
              <Lock size={16} />
              Request Membership
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
          <div className="w-px h-12 bg-white/20" />
          <p className="text-[10px] uppercase tracking-[0.25em] text-white/40">Scroll to discover</p>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-28 lg:py-40 bg-[#F8F6F1]">
        <div className="max-w-[900px] mx-auto px-6 lg:px-12 text-center">
          <h2 className="serif font-light text-4xl lg:text-5xl mb-8 leading-tight text-[#1A1A1A]">
            Time is Your Most Valuable Asset
          </h2>
          <p className="text-lg text-[#707070] leading-relaxed mb-10">
            Your dedicated concierge manages the details, so you can focus on what truly matters. From securing impossible reservations to orchestrating seamless travel, we anticipate your needs before you voice them.
          </p>
          <div className="w-16 h-px bg-[#A88F5C] mx-auto" />
        </div>
      </section>

      {/* What We Arrange */}
      <section className="py-28 lg:py-40 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <p className="text-[11px] uppercase tracking-[0.3em] text-[#A88F5C] mb-4">What We Arrange</p>
            <h2 className="serif font-light text-4xl lg:text-5xl mb-6 text-[#1A1A1A]">What We Can Arrange</h2>
            <p className="text-lg text-[#707070]">
              A selection of our most requested services
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#0F0F0F]/10">
            {services.map((service) => (
              <ServiceCard key={service.title} {...service} />
            ))}
          </div>
        </div>
      </section>

      {/* The Difference */}
      <section className="py-28 lg:py-40 bg-[#F8F6F1]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div>
              <h2 className="serif font-light text-4xl lg:text-5xl mb-12 text-[#1A1A1A]">The HiLink Difference</h2>
              <div className="divide-y divide-[#0F0F0F]/10">
                <div className="pb-8">
                  <h3 className="serif text-2xl mb-3 text-[#1A1A1A]">Personal. Not Automated.</h3>
                  <p className="text-[#707070] leading-relaxed">
                    You work with a dedicated concierge team who knows your preferences, anticipates your needs, and operates with complete discretion.
                  </p>
                </div>
                <div className="py-8">
                  <h3 className="serif text-2xl mb-3 text-[#1A1A1A]">Connected. Not Limited.</h3>
                  <p className="text-[#707070] leading-relaxed">
                    Our network spans Vietnam and beyond—exclusive access to private clubs, VIP events, and experiences unavailable to the public.
                  </p>
                </div>
                <div className="pt-8">
                  <h3 className="serif text-2xl mb-3 text-[#1A1A1A]">Proactive. Not Reactive.</h3>
                  <p className="text-[#707070] leading-relaxed">
                    We don't wait for requests. We know your calendar, understand your preferences, and have everything arranged before you need it.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative aspect-[3/4] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1768346564233-d71f37bd19b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBwcml2YXRlJTIwamV0JTIwaW50ZXJpb3J8ZW58MXx8fHwxNzc1NzIzMjY1fDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Luxury service"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#A88F5C]" />
            </div>
          </div>
        </div>
      </section>

      {/* Membership Enquiry */}
      <section id="enquire" className="py-28 lg:py-40 bg-white">
        <div className="max-w-[760px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <Lock size={36} className="mx-auto mb-8 text-[#A88F5C]" />
            <h2 className="serif font-light text-4xl lg:text-5xl mb-6 text-[#1A1A1A]">Membership Enquiry</h2>
            <p className="text-lg text-[#707070]">
              Concierge services are available exclusively to HiLink property clients and select members.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              placeholder="Full Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-6 py-4 bg-[#F8F6F1] border border-[#0F0F0F]/15 text-[#1A1A1A] placeholder-[#9a9a9a] focus:outline-none focus:border-[#A88F5C] transition-colors"
              required
            />
            <input
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-6 py-4 bg-[#F8F6F1] border border-[#0F0F0F]/15 text-[#1A1A1A] placeholder-[#9a9a9a] focus:outline-none focus:border-[#A88F5C] transition-colors"
              required
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-6 py-4 bg-[#F8F6F1] border border-[#0F0F0F]/15 text-[#1A1A1A] placeholder-[#9a9a9a] focus:outline-none focus:border-[#A88F5C] transition-colors"
              required
            />
            <textarea
              placeholder="Tell us about your needs and how we can assist you..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              rows={6}
              className="w-full px-6 py-4 bg-[#F8F6F1] border border-[#0F0F0F]/15 text-[#1A1A1A] placeholder-[#9a9a9a] focus:outline-none focus:border-[#A88F5C] transition-colors resize-none"
              required
            />
            <button
              type="submit"
              className="w-full px-12 py-4 bg-[#A88F5C] text-white text-[11px] uppercase tracking-[0.2em] hover:bg-[#0F0F0F] transition-colors"
            >
              Submit Enquiry
            </button>
            <p className="text-sm text-[#707070] text-center">
              Your enquiry is handled with complete confidentiality. A member of our team will contact you within 24 hours.
            </p>
          </form>
        </div>
      </section>

      {/* Contact */}
      <section className="py-20 bg-[#F8F6F1] border-t border-[#A88F5C]/20">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <p className="text-[11px] uppercase tracking-[0.3em] text-[#A88F5C] mb-2">Questions?</p>
              <p className="text-xl text-[#1A1A1A]">Our concierge team is available 24/7</p>
            </div>
            <div className="flex items-center gap-8">
              <a
                href="mailto:concierge@hilink.vn"
                className="flex items-center gap-3 text-[#707070] hover:text-[#A88F5C] transition-colors"
              >
                <Mail size={20} />
                <span>concierge@hilink.vn</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function ServiceCard({ icon, title, description, image }: {
  icon: React.ReactNode;
  title: string;
  description: string;
  image: string;
}) {
  return (
    <motion.div
      className="group bg-white overflow-hidden"
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="p-8">
        <div className="text-[#A88F5C] mb-4">{icon}</div>
        <h3 className="serif text-2xl mb-3 text-[#1A1A1A]">{title}</h3>
        <p className="text-[#707070] text-sm leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
}
