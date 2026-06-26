import { Link } from 'react-router';
import { Package, Truck, Factory, Shield, BarChart, MapPin, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { HeroBg } from '../components/HeroBg';

export function IndustrialPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 lg:py-32 bg-[#0F0F0F] text-white">
        <HeroBg image="/workspace-photos/BG_Hanoi.avif" />
        <div className="relative z-10 max-w-[1600px] mx-auto px-6 lg:px-12">
          <motion.div 
            className="grid lg:grid-cols-12 gap-12 lg:gap-24"
          >
            <motion.div className="lg:col-span-6">
              <p className="text-sm uppercase tracking-wider text-[#A88F5C] mb-8">Industrial & Logistics</p>
              <h1 className="serif text-5xl lg:text-7xl mb-8 leading-tight">
                Strategic Solutions for Manufacturing & Distribution
              </h1>
              <p className="text-xl text-[#EAE3D2] mb-12 leading-relaxed">
                Specialized warehousing, factory, and logistics property management for businesses with supply chain and manufacturing operations in Vietnam.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-10 py-4 bg-[#A88F5C] text-white text-sm uppercase tracking-wider hover:bg-[#EAE3D2] hover:text-[#0F0F0F] transition-colors group"
              >
                Request Information
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-24 lg:py-32 bg-[#F8F6F1]">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <motion.div 
            className="text-center mb-16"
          >
            <h2 className="serif text-4xl lg:text-5xl mb-6">Comprehensive Industrial Solutions</h2>
            <p className="text-xl text-[#707070] max-w-3xl mx-auto">
              End-to-end support for your manufacturing and logistics operations
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#0F0F0F]"
          >
            <ServiceCard
              icon={<Package size={32} />}
              title="Warehouse & Distribution Centers"
              description="Modern warehousing facilities with advanced logistics infrastructure, security systems, and efficient layouts."
            />
            <ServiceCard
              icon={<Factory size={32} />}
              title="Factory & Manufacturing Space"
              description="Purpose-built manufacturing facilities in established industrial parks with full utilities and compliance."
            />
            <ServiceCard
              icon={<MapPin size={32} />}
              title="Industrial Park Placement"
              description="Strategic site selection within Vietnam's top-tier industrial zones with optimal infrastructure and incentives."
            />
            <ServiceCard
              icon={<Truck size={32} />}
              title="Logistics Coordination"
              description="Supply chain optimization, last-mile delivery solutions, and transportation network integration."
            />
            <ServiceCard
              icon={<Shield size={32} />}
              title="Compliance & Safety Management"
              description="Regulatory compliance support, safety protocols, environmental standards, and permit management."
            />
            <ServiceCard
              icon={<BarChart size={32} />}
              title="Facility Operations Support"
              description="Ongoing operational management, maintenance, utilities, and vendor coordination for seamless operations."
            />
          </motion.div>
        </div>
      </section>

      {/* Industrial Parks */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <motion.div 
            className="text-center mb-16"
          >
            <h2 className="serif text-4xl lg:text-5xl mb-6">Strategic Locations</h2>
            <p className="text-xl text-[#707070] max-w-3xl mx-auto">
              Access to Vietnam's premier industrial zones
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 gap-12"
          >
            <IndustrialParkCard
              name="Northern Industrial Corridor"
              location="Bac Ninh, Bac Giang, Hai Phong"
              features={[
                'Proximity to Hanoi and major ports',
                'Electronics and manufacturing hub',
                'Excellent highway and rail connections',
                'Favorable tax incentives',
              ]}
              image="https://images.unsplash.com/photo-1731847999830-6f71b78d720e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwd2FyZWhvdXNlJTIwZmFjaWxpdHl8ZW58MXx8fHwxNzc1ODAwMjI4fDA&ixlib=rb-4.1.0&q=80&w=1080"
            />
            <IndustrialParkCard
              name="Southern Logistics Hub"
              location="Binh Duong, Dong Nai, Long An"
              features={[
                'Adjacent to HCMC metropolitan area',
                'Deep-water port access',
                'Multimodal transportation links',
                'Established supply chain ecosystem',
              ]}
              image="https://images.unsplash.com/photo-1768796372478-f3c46af523a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb2dpc3RpY3MlMjBkaXN0cmlidXRpb24lMjBjZW50ZXJ8ZW58MXx8fHwxNzc1Nzc5MzcyfDA&ixlib=rb-4.1.0&q=80&w=1080"
            />
          </motion.div>
        </div>
      </section>

      {/* Facility Types */}
      <section className="py-24 lg:py-32 bg-[#EAE3D2]">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <motion.div 
            className="text-center mb-16"
          >
            <h2 className="serif text-4xl lg:text-5xl mb-6">Facility Options</h2>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-3 gap-8"
          >
            <FacilityCard
              type="Built-to-Suit"
              description="Custom-designed facilities tailored to your specific operational requirements and specifications"
              size="From 5,000m²"
            />
            <FacilityCard
              type="Ready-Built Warehouses"
              description="Immediate occupancy warehouses with standard specifications and flexible lease terms"
              size="1,000 - 20,000m²"
            />
            <FacilityCard
              type="Shared Logistics Centers"
              description="Cost-effective shared warehousing solutions with professional management and security"
              size="From 500m²"
            />
          </motion.div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <motion.div 
            className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center"
          >
            <motion.div>
              <h2 className="serif text-4xl lg:text-5xl mb-8">
                Why Partner with HiLink for Industrial Real Estate
              </h2>
              <div className="space-y-6">
                <ValuePoint
                  title="Local Expertise"
                  description="Deep relationships with industrial park developers and understanding of regional advantages"
                />
                <ValuePoint
                  title="Regulatory Navigation"
                  description="Expert support for permits, environmental compliance, and operational licensing"
                />
                <ValuePoint
                  title="Cost Optimization"
                  description="Negotiate favorable terms and identify tax incentives and operational efficiencies"
                />
                <ValuePoint
                  title="Operational Continuity"
                  description="Ensure uninterrupted operations with proactive maintenance and vendor management"
                />
              </div>
            </motion.div>
            <motion.div 
              className="relative aspect-[4/3] overflow-hidden"
            >
              <img
                src="https://images.unsplash.com/photo-1731847999830-6f71b78d720e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwd2FyZWhvdXNlJTIwZmFjaWxpdHl8ZW58MXx8fHwxNzc1ODAwMjI4fDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Industrial facility"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 lg:py-32 bg-[#0F0F0F] text-white">
        <motion.div 
          className="max-w-[1600px] mx-auto px-6 lg:px-12 text-center"
        >
          <h2 className="serif text-4xl lg:text-5xl mb-8">
            Find Your Ideal Industrial Space
          </h2>
          <p className="text-xl text-[#EAE3D2] mb-12 max-w-2xl mx-auto">
            Discuss your manufacturing and logistics requirements with our industrial real estate specialists.
          </p>
          <Link
            to="/contact"
            className="inline-block px-12 py-4 bg-[#A88F5C] text-white text-sm uppercase tracking-wider hover:bg-[#EAE3D2] hover:text-[#0F0F0F] transition-colors"
          >
            Request Site Information
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
      className="bg-[#F8F6F1] p-8 lg:p-10"
      whileHover={{ y: -5 }}
    >
      <div className="text-[#A88F5C] mb-6">{icon}</div>
      <h3 className="serif text-2xl mb-4">{title}</h3>
      <p className="text-[#707070] leading-relaxed">{description}</p>
    </motion.div>
  );
}

function IndustrialParkCard({ name, location, features, image }: {
  name: string;
  location: string;
  features: string[];
  image: string;
}) {
  return (
    <motion.div 
      className="bg-white overflow-hidden"
    >
      <div className="relative aspect-[16/9] overflow-hidden">
        <img src={image} alt={name} className="w-full h-full object-cover" />
      </div>
      <div className="p-8">
        <h3 className="serif text-3xl mb-2">{name}</h3>
        <p className="text-[#A88F5C] mb-6">{location}</p>
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-[#A88F5C] rounded-full mt-2 flex-shrink-0" />
              <span className="text-[#707070]">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

function FacilityCard({ type, description, size }: {
  type: string;
  description: string;
  size: string;
}) {
  return (
    <motion.div 
      className="bg-white p-8"
      whileHover={{ y: -5 }}
    >
      <h3 className="serif text-2xl mb-4">{type}</h3>
      <p className="text-[#707070] mb-6 leading-relaxed">{description}</p>
      <div className="text-[#A88F5C] text-sm uppercase tracking-wider">{size}</div>
    </motion.div>
  );
}

function ValuePoint({ title, description }: {
  title: string;
  description: string;
}) {
  return (
    <div>
      <h3 className="serif text-xl mb-2">{title}</h3>
      <p className="text-[#707070] leading-relaxed">{description}</p>
    </div>
  );
}
