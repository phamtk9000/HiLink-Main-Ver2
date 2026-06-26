import { useState } from 'react';
import { Link, useParams } from 'react-router';
import { MapPin, Users, TrendingUp, DollarSign, X, ChevronLeft, ChevronRight, Home, Utensils, Bed, Bath, Wind, Waves, Shirt, ArrowLeft, Building2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// ─── Quarter House image manifest ────────────────────────────────────────────
const QUARTER_HOUSE_IMAGES = [
  { file: 'e66e48d4-d045-4d8b-b497-28499961516e.avif',   label: 'Living Room',        category: 'living',   icon: 'home' },
  { file: 'b9fac8a0-68d2-4131-9fd9-4eca725efb87.webp',   label: 'Full Kitchen',        category: 'kitchen',  icon: 'utensils' },
  { file: '6310c847-24ec-4119-9f26-b04f7a9792d6.webp',   label: 'Dining Area',         category: 'kitchen',  icon: 'utensils' },
  { file: '99a6df66-2ec5-461c-bb47-cbf66686b58b.avif',   label: 'Bedroom 1',           category: 'bedroom',  icon: 'bed' },
  { file: '0999fcd9-9993-4cf8-88da-cd8b12255cc9.avif',   label: 'Bedroom 2',           category: 'bedroom',  icon: 'bed' },
  { file: 'afe87fba-fe07-4f21-af07-da1c5e8c3136.avif',   label: 'Bedroom 3',           category: 'bedroom',  icon: 'bed' },
  { file: '544686f2-0e93-4638-872f-9a59c93bf5c2.avif',   label: 'Bedroom 4',           category: 'bedroom',  icon: 'bed' },
  { file: '3444e3f3-09d5-4c42-b8a8-50a81916b6d2.avif',   label: 'Full Bathroom 1',     category: 'bathroom', icon: 'bath' },
  { file: 'b6f9aaa6-5557-4609-a81c-f2cb8524b30d.avif',   label: 'Full Bathroom 2',     category: 'bathroom', icon: 'bath' },
  { file: 'e33b0144-b86d-4508-bf0b-60f537c6cadc.avif',   label: 'Full Bathroom 3',     category: 'bathroom', icon: 'bath' },
  { file: '79ef7ed9-bb1a-415a-bf53-71365823b8c2.avif',   label: 'Basic WC',            category: 'bathroom', icon: 'bath' },
  { file: 'b9c1c79d-4a0c-4172-a791-c058fa4601e5.avif',   label: 'Balcony',             category: 'outdoor', icon: 'wind' },
  { file: '3fb86da5-f848-4a24-b6c5-5aab156e17b6.avif',   label: 'Laundry Area',        category: 'utility', icon: 'shirt' },
  { file: 'c6b6335c-6047-437f-a066-76280057ca74.webp',   label: 'Exterior',            category: 'outdoor', icon: 'building' },
  { file: '1ad91a8f-cc38-40b8-b904-51f2b28fca8d.avif',   label: 'Additional Photo',    category: 'living',  icon: 'home' },
  { file: '0a66be5e-85c2-493c-acf9-3885677ce07e.webp',   label: 'Interior Detail',     category: 'living',  icon: 'home' },
  { file: 'a3d356a7-ab53-49ba-aa0b-b0ddfcbd6857.avif',   label: 'Staircase',           category: 'living',  icon: 'home' },
  { file: '75f9d08f-4743-4056-be3e-b939a1829c8c.avif',   label: 'Living Detail',       category: 'living',  icon: 'home' },
  { file: '69beb07e-d3c6-4f81-a813-83f81e11ef04.avif',   label: 'Room Detail',         category: 'bedroom', icon: 'bed' },
  { file: '0bfca00c-7b09-40f1-a95c-81749a872a7e.avif',   label: 'Bathroom Detail',     category: 'bathroom', icon: 'bath' },
  { file: 'a78d16e0-cf6a-4390-a0b0-371bc7f763b5.avif',   label: 'Kitchen Detail',      category: 'kitchen', icon: 'utensils' },
  { file: '39c9cd3f-dfb3-432d-adc0-561c3de07fc0.avif',   label: 'Space Overview',      category: 'living',  icon: 'home' },
  { file: '81daea26-30b2-48d6-94c0-8683462f9397.avif',   label: 'Natural Light',       category: 'living',  icon: 'home' },
  { file: '544686f2-dup.avif',                            label: 'Bedroom Detail',      category: 'bedroom', icon: 'bed' },
  { file: '585525eb-5204-4d0c-8bc6-6b8a81d9c688.avif',   label: 'Hallway',             category: 'living',  icon: 'home' },
  { file: 'b9fac8a0-68d2-4131-9fd9-4eca725efb87.webp',   label: 'Storage',             category: 'utility', icon: 'home' },
  { file: '97d0884e-4545-44b6-ae60-c5d4bc78df44.avif',   label: 'Workspace',           category: 'living',  icon: 'home' },
  { file: '36125f3b-9c45-4006-90c4-6fca42bd6f29.avif',   label: 'Window View',         category: 'outdoor', icon: 'wind' },
  { file: '2fb77d22-aa01-4596-af6e-d027437e6874.avif',   label: 'Ceiling Detail',      category: 'living',  icon: 'home' },
  { file: '60dc7cac-8020-4eaf-b1fa-20527d42cb9c.avif',   label: 'Furnishing',          category: 'living',  icon: 'home' },
  { file: '6009809d-0905-4076-a2bd-82c009d8327e.avif',   label: 'Floor Plan Area',     category: 'living',  icon: 'home' },
  { file: '8ee43bf9-49d4-4ae0-ad0b-333edc79f5c0.avif',   label: 'Amenity Detail',      category: 'utility', icon: 'home' },
  { file: 'e750103d-2758-4839-b12d-0771c8179a34.avif',   label: 'Street View',         category: 'outdoor', icon: 'building' },
  { file: '33adff89-3a1d-43bf-8f08-84917e9d28af.avif',   label: 'Neighbourhood',       category: 'outdoor', icon: 'building' },
];

// ─── Property data ────────────────────────────────────────────────────────────
// Generic workspace image set (Unsplash) for workspace leasing locations
const makeWorkspaceImages = (urls: string[]) =>
  urls.map((file, i) => ({ file, label: `Photo ${i + 1}`, category: 'living', icon: 'home', isUrl: true }));

const PROPERTIES: Record<string, any> = {
  'quarter-house': {
    id: 'quarter-house',
    name: 'The Quarter House',
    location: 'Hoan Kiem, Hanoi',
    type: 'Boutique Townhouse',
    units: 4,
    occupancy: 95,
    avgRent: '$4,000/month',
    description: 'A meticulously restored French-quarter townhouse in the heart of Hanoi\'s most prestigious district. Spread across four floors with premium finishes throughout, this property blends colonial architecture with contemporary luxury — offering guests an authentic yet refined experience steps from Hoan Kiem Lake.',
    highlights: ['4 bedrooms, 3.5 bathrooms', '3 fully equipped bathrooms', 'Private balcony with street view', 'Full kitchen & dining area', 'Dedicated laundry facilities', 'High-speed WiFi throughout', 'Air conditioning in all rooms', 'Smart TV in living room & bedrooms'],
    images: QUARTER_HOUSE_IMAGES,
  },
  'hanoi-ba-dinh': {
    id: 'hanoi-ba-dinh',
    name: 'HiLink Ba Dinh',
    location: 'Kim Ma Street, Ba Dinh District, Hanoi',
    type: 'Premium Office Building',
    units: '50–200',
    occupancy: 92,
    avgRent: '$450/desk/month',
    description: 'HiLink Ba Dinh is a flagship premium office building on the prestigious Kim Ma corridor, minutes from the city\'s diplomatic quarter. Offering flexible configurations from hot desks to full-floor private suites, this location combines modern infrastructure with the distinction of a Ba Dinh address.',
    highlights: ['50–200 flexible desk configurations', '24/7 building access & security', 'High-speed fibre internet (1Gbps)', 'Rooftop meeting & event space', 'Concierge & reception services', 'Underground parking available', 'On-site café & catering', 'Dedicated IT support'],
    images: makeWorkspaceImages([
      'https://images.unsplash.com/photo-1626187777040-ffb7cb2c5450?w=1080&q=80',
      'https://images.unsplash.com/photo-1636125659769-0803b11bee67?w=1080&q=80',
      'https://images.unsplash.com/photo-1765366417044-9e84ce8ec942?w=1080&q=80',
      'https://images.unsplash.com/photo-1716703435698-031227389c1c?w=1080&q=80',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1080&q=80',
    ]),
  },
  'hcmc-district-1': {
    id: 'hcmc-district-1',
    name: 'HiLink District 1',
    location: 'Nguyen Hue Boulevard, District 1, Ho Chi Minh City',
    type: 'Mixed-Use Tower',
    units: '100–500',
    occupancy: 97,
    avgRent: '$550/desk/month',
    description: 'Located on the iconic Nguyen Hue pedestrian boulevard, HiLink District 1 occupies six floors of a landmark mixed-use tower in HCMC\'s central business district. The space offers unparalleled connectivity and prestige, with panoramic city views and enterprise-grade infrastructure.',
    highlights: ['100–500 desk configurations', 'City-view executive suites', '24/7 access & biometric entry', 'Rooftop sky lounge', 'Three conference centres', 'Dedicated fibre lines', 'Premium café & dining floor', 'Valet parking'],
    images: makeWorkspaceImages([
      'https://images.unsplash.com/photo-1636125659769-0803b11bee67?w=1080&q=80',
      'https://images.unsplash.com/photo-1626187777040-ffb7cb2c5450?w=1080&q=80',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1080&q=80',
      'https://images.unsplash.com/photo-1716703435698-031227389c1c?w=1080&q=80',
      'https://images.unsplash.com/photo-1765366417044-9e84ce8ec942?w=1080&q=80',
    ]),
  },
  'hanoi-tay-ho': {
    id: 'hanoi-tay-ho',
    name: 'HiLink Tay Ho',
    location: 'Xuan Dieu Street, Tay Ho District, Hanoi',
    type: 'Boutique Workspace',
    units: '20–80',
    occupancy: 88,
    avgRent: '$380/desk/month',
    description: 'HiLink Tay Ho offers an intimate, design-led workspace experience in Hanoi\'s most sought-after expat neighbourhood. Steps from West Lake, this boutique location is ideal for creative agencies, consulting firms, and startups seeking a refined, distraction-free environment.',
    highlights: ['20–80 desk configurations', 'Lake-view private offices', 'Curated design interiors', 'High-speed WiFi & IT support', 'Artisan coffee bar', 'Rooftop terrace & garden', 'Cycling & wellness facilities', 'Quiet zone & focus rooms'],
    images: makeWorkspaceImages([
      'https://images.unsplash.com/photo-1765366417044-9e84ce8ec942?w=1080&q=80',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1080&q=80',
      'https://images.unsplash.com/photo-1626187777040-ffb7cb2c5450?w=1080&q=80',
      'https://images.unsplash.com/photo-1636125659769-0803b11bee67?w=1080&q=80',
      'https://images.unsplash.com/photo-1716703435698-031227389c1c?w=1080&q=80',
    ]),
  },
  'hcmc-binh-thanh': {
    id: 'hcmc-binh-thanh',
    name: 'HiLink Binh Thanh',
    location: 'Dien Bien Phu, Binh Thanh District, Ho Chi Minh City',
    type: 'Corporate Campus',
    units: '150–600',
    occupancy: 0,
    avgRent: 'Coming Soon',
    description: 'Our largest campus to date, HiLink Binh Thanh is a purpose-built corporate park designed for enterprise clients seeking a full-service headquarters solution. Currently under fit-out, this location will set a new benchmark for workplace experience in Ho Chi Minh City.',
    highlights: ['150–600 desk configurations', 'Full-floor enterprise suites', 'Dedicated data centre room', 'Auditorium & event hall', 'Multiple F&B outlets', 'Outdoor campus grounds', 'Private shuttle service', 'Premium concierge'],
    images: makeWorkspaceImages([
      'https://images.unsplash.com/photo-1716703435698-031227389c1c?w=1080&q=80',
      'https://images.unsplash.com/photo-1636125659769-0803b11bee67?w=1080&q=80',
      'https://images.unsplash.com/photo-1626187777040-ffb7cb2c5450?w=1080&q=80',
      'https://images.unsplash.com/photo-1765366417044-9e84ce8ec942?w=1080&q=80',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1080&q=80',
    ]),
  },
};

// ─── Image src helper ─────────────────────────────────────────────────────────
function getImgSrc(img: { file: string; isUrl?: boolean }) {
  if (img.isUrl) return img.file;
  return `/src/assets/quater-house/${img.file}`;
}

// ─── Lightbox ─────────────────────────────────────────────────────────────────
function Lightbox({ images, startIndex, onClose }: {
  images: typeof QUARTER_HOUSE_IMAGES;
  startIndex: number;
  onClose: () => void;
}) {
  const [current, setCurrent] = useState(startIndex);

  const prev = () => setCurrent((c) => (c - 1 + images.length) % images.length);
  const next = () => setCurrent((c) => (c + 1) % images.length);

  const src = getImgSrc(images[current]);

  return (
    <motion.div
      className="fixed inset-0 z-[1000] bg-black/95 flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-4 text-white shrink-0">
        <span className="text-sm uppercase tracking-widest text-white/60">
          {current + 1} / {images.length}
        </span>
        <span className="serif text-lg">{images[current].label}</span>
        <button
          onClick={onClose}
          className="p-2 hover:text-[#A88F5C] transition-colors"
          aria-label="Close"
        >
          <X size={24} />
        </button>
      </div>

      {/* Main image */}
      <div className="flex-1 flex items-center justify-center relative overflow-hidden px-16">
        <AnimatePresence mode="wait">
          <motion.img
            key={current}
            src={src}
            alt={images[current].label}
            className="max-h-full max-w-full object-contain"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.3 }}
          />
        </AnimatePresence>

        {/* Prev / Next */}
        <button
          onClick={prev}
          className="absolute left-4 p-3 bg-white/10 hover:bg-white/20 text-white transition-colors"
          aria-label="Previous"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={next}
          className="absolute right-4 p-3 bg-white/10 hover:bg-white/20 text-white transition-colors"
          aria-label="Next"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Thumbnail strip */}
      <div className="shrink-0 px-6 py-4 overflow-x-auto">
        <div className="flex gap-2 w-max mx-auto">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-16 h-12 shrink-0 overflow-hidden transition-all ${
                i === current ? 'ring-2 ring-[#A88F5C]' : 'opacity-50 hover:opacity-80'
              }`}
            >
              <img
                src={getImgSrc(img)}
                alt={img.label}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Airbnb-style photo grid ──────────────────────────────────────────────────
function PhotoGrid({ images, onOpen }: {
  images: typeof QUARTER_HOUSE_IMAGES;
  onOpen: (i: number) => void;
}) {
  const shown = images.slice(0, 5);
  const remaining = images.length - 5;

  return (
    <div className="grid grid-cols-4 grid-rows-2 gap-2 h-[520px] rounded-none overflow-hidden">
      {/* Hero — spans 2 cols, 2 rows */}
      <button
        className="col-span-2 row-span-2 relative overflow-hidden group"
        onClick={() => onOpen(0)}
        aria-label="Open photo 1"
      >
        <img
          src={getImgSrc(shown[0])}
          alt={shown[0].label}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-300" />
      </button>

      {/* Grid — 4 smaller squares */}
      {shown.slice(1).map((img, i) => (
        <button
          key={i}
          className="relative overflow-hidden group"
          onClick={() => onOpen(i + 1)}
          aria-label={`Open photo ${i + 2}`}
        >
          <img
            src={getImgSrc(img)}
            alt={img.label}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-300" />
          {/* "Show all photos" badge on last tile */}
          {i === 3 && remaining > 0 && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="text-white text-sm font-medium uppercase tracking-widest">
                +{remaining} photos
              </span>
            </div>
          )}
        </button>
      ))}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export function WorkspaceDetailPage() {
  const { locationId } = useParams();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const property = PROPERTIES[locationId ?? ''] ?? null;

  if (!property) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-[#F8F6F1]">
        <div className="text-center">
          <h2 className="serif text-4xl mb-4">Property Not Found</h2>
          <Link to="/workspace-leasing" className="text-[#A88F5C] uppercase text-sm tracking-wider underline">
            Back to Workspaces
          </Link>
        </div>
      </div>
    );
  }
  const images: typeof QUARTER_HOUSE_IMAGES = property.images;

  const categories = [
    { key: 'all',      label: 'All Photos' },
    { key: 'living',   label: 'Living Spaces' },
    { key: 'bedroom',  label: 'Bedrooms' },
    { key: 'kitchen',  label: 'Kitchen & Dining' },
    { key: 'bathroom', label: 'Bathrooms' },
    { key: 'outdoor',  label: 'Exterior' },
    { key: 'utility',  label: 'Utilities' },
  ];

  const filtered = activeCategory === 'all'
    ? images
    : images.filter((img) => img.category === activeCategory);

  return (
    <>
      {/* Back nav */}
      <div className="bg-[#F8F6F1] border-b border-[#0F0F0F]/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-4">
          <Link
            to={property?.id === 'quarter-house' ? '/property-management' : '/workspace-leasing'}
            className="inline-flex items-center gap-2 text-sm uppercase tracking-wider text-[#707070] hover:text-[#A88F5C] transition-colors"
          >
            <ArrowLeft size={16} /> {property?.id === 'quarter-house' ? 'Back to Properties' : 'Back to Workspaces'}
          </Link>
        </div>
      </div>

      {/* Header info */}
      <section className="bg-[#F8F6F1] pt-10 pb-6">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <p className="text-xs uppercase tracking-[0.2em] text-[#A88F5C] mb-3">{property.type}</p>
          <h1 className="serif text-5xl lg:text-6xl mb-3">{property.name}</h1>
          <div className="flex items-center gap-2 text-[#707070]">
            <MapPin size={16} className="text-[#A88F5C]" />
            <span>{property.location}</span>
          </div>
        </div>
      </section>

      {/* Photo grid */}
      <section className="bg-[#F8F6F1] pb-8">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <PhotoGrid images={images} onOpen={(i) => setLightboxIndex(i)} />
          <button
            onClick={() => setLightboxIndex(0)}
            className="mt-4 text-sm uppercase tracking-wider underline underline-offset-4 text-[#0F0F0F] hover:text-[#A88F5C] transition-colors"
          >
            Show all {images.length} photos
          </button>
        </div>
      </section>

      {/* Main content */}
      <section className="py-16 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-[1fr_360px] gap-16">

            {/* Left column */}
            <div>
              {/* Stats row */}
              <div className="grid grid-cols-3 gap-px bg-[#0F0F0F]/10 mb-12">
                {[
                  { icon: <Building2 size={20} />, label: 'Units', value: property.units },
                  { icon: <TrendingUp size={20} />, label: 'Occupancy', value: `${property.occupancy}%` },
                  { icon: <DollarSign size={20} />, label: 'Avg. Rent', value: property.avgRent },
                ].map(({ icon, label, value }) => (
                  <div key={label} className="bg-white px-8 py-6 flex items-center gap-4">
                    <div className="text-[#A88F5C]">{icon}</div>
                    <div>
                      <div className="text-xs uppercase tracking-wider text-[#707070] mb-1">{label}</div>
                      <div className="serif text-2xl">{value}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Description */}
              <div className="mb-12 pb-12 border-b border-[#0F0F0F]/10">
                <h2 className="serif text-3xl mb-6">About this property</h2>
                <p className="text-[#444] leading-relaxed text-lg">{property.description}</p>
              </div>

              {/* Highlights */}
              <div className="mb-12 pb-12 border-b border-[#0F0F0F]/10">
                <h2 className="serif text-3xl mb-6">Property highlights</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {property.highlights.map((h: string) => (
                    <div key={h} className="flex items-center gap-3 text-[#444]">
                      <div className="w-1 h-1 rounded-full bg-[#A88F5C] shrink-0" />
                      {h}
                    </div>
                  ))}
                </div>
              </div>

              {/* Photo gallery by category */}
              <div>
                <h2 className="serif text-3xl mb-6">Explore by room</h2>

                {/* Category filter tabs */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {categories.map((cat) => (
                    <button
                      key={cat.key}
                      onClick={() => setActiveCategory(cat.key)}
                      className={`px-5 py-2 text-xs uppercase tracking-wider transition-all ${
                        activeCategory === cat.key
                          ? 'bg-[#0F0F0F] text-white'
                          : 'border border-[#0F0F0F]/20 hover:border-[#A88F5C] hover:text-[#A88F5C]'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>

                {/* Masonry-style grid */}
                <div className="columns-2 md:columns-3 gap-3 space-y-3">
                  {filtered.map((img, i) => (
                    <button
                      key={`${img.file}-${i}`}
                      className="w-full break-inside-avoid block overflow-hidden group relative"
                      onClick={() => {
                        const globalIndex = images.findIndex((x) => x.file === img.file && x.label === img.label);
                        setLightboxIndex(globalIndex >= 0 ? globalIndex : i);
                      }}
                    >
                      <img
                        src={getImgSrc(img)}
                        alt={img.label}
                        className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-end">
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-xs uppercase tracking-wider px-3 py-2">
                          {img.label}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right sticky CTA panel */}
            <div className="lg:sticky lg:top-24 h-fit">
              <div className="border border-[#0F0F0F]/15 p-8 bg-white shadow-[0_4px_40px_rgba(0,0,0,0.08)]">
                <p className="serif text-3xl mb-1">{property.avgRent}</p>
                <p className="text-sm text-[#707070] mb-8 uppercase tracking-wider">Average monthly rent</p>

                <div className="space-y-4 mb-8 text-sm">
                  {[
                    ['Location', property.location],
                    ['Type', property.type],
                    ['Total Units', property.units],
                    ['Occupancy Rate', `${property.occupancy}%`],
                    ['Management', 'HiLink Vietnam'],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between items-center py-3 border-b border-[#0F0F0F]/08">
                      <span className="text-[#707070] uppercase tracking-wider text-xs">{k}</span>
                      <span className="font-medium">{v}</span>
                    </div>
                  ))}
                </div>

                <Link
                  to="/contact"
                  className="block w-full py-4 bg-[#A88F5C] text-white text-sm uppercase tracking-widest text-center hover:bg-[#0F0F0F] transition-colors mb-3"
                >
                  Enquire About This Property
                </Link>
                <Link
                  to="/contact"
                  className="block w-full py-4 border border-[#0F0F0F] text-sm uppercase tracking-widest text-center hover:bg-[#0F0F0F] hover:text-white transition-colors"
                >
                  Schedule a Viewing
                </Link>

                <p className="text-center text-xs text-[#707070] mt-6">
                  Managed by HiLink Vietnam · Response within 24h
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA strip */}
      <section className="py-20 bg-[#0F0F0F] text-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="serif text-3xl lg:text-4xl mb-3">Interested in listing your property?</h2>
            <p className="text-[#EAE3D2]">Join our managed portfolio and unlock premium returns.</p>
          </div>
          <Link
            to="/contact"
            className="shrink-0 px-10 py-4 bg-[#A88F5C] text-white text-sm uppercase tracking-widest hover:bg-[#EAE3D2] hover:text-[#0F0F0F] transition-colors"
          >
            Book a Portfolio Review
          </Link>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            images={images}
            startIndex={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
// This file is intentionally left empty - see the PROPERTIES object above
