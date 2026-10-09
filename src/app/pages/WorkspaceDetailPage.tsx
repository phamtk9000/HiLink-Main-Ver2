import { useState } from 'react';
import { Link, useParams } from 'react-router';
import { X, ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react';
import { MapPin, TrendingUp, DollarSign, Building2 } from '../components/Glyph';
import { motion, AnimatePresence } from 'motion/react';
import { useLang, usePageMeta } from '../lib/i18n';
import type { Bi } from '../data/site';
import { Contours } from '../components/Contours';
import { photo } from '../lib/photo';

type Photo = { file: string; label: Bi; category: string };

// ─── Quarter House photos (the set HiLink uses on hilink.vn) ─────────────────
const QUARTER_HOUSE_IMAGES: Photo[] = [
  { file: '/properties/quarter-house/qh-07.webp', label: { en: 'Living Room', vi: 'Phòng khách' }, category: 'living' },
  { file: '/properties/quarter-house/qh-02.webp', label: { en: 'Bedroom & Sitting Area', vi: 'Phòng ngủ & góc tiếp khách' }, category: 'bedroom' },
  { file: '/properties/quarter-house/qh-03.webp', label: { en: 'Bedroom', vi: 'Phòng ngủ' }, category: 'bedroom' },
  { file: '/properties/quarter-house/qh-01.webp', label: { en: 'Balcony over the Street', vi: 'Ban công nhìn ra phố' }, category: 'outdoor' },
  { file: '/properties/quarter-house/qh-04.webp', label: { en: 'Bathroom', vi: 'Phòng tắm' }, category: 'bathroom' },
  { file: '/properties/quarter-house/qh-08.webp', label: { en: 'Kitchenette', vi: 'Bếp' }, category: 'kitchen' },
  { file: '/properties/quarter-house/qh-05.webp', label: { en: 'Bedroom Detail', vi: 'Góc phòng ngủ' }, category: 'bedroom' },
  { file: '/properties/quarter-house/qh-06.webp', label: { en: 'Bedroom Alcove', vi: 'Phòng ngủ' }, category: 'bedroom' },
];

// ─── Property data (as in HiLink's managed portfolio on hilink.vn) ───────────
const PROPERTIES: Record<string, {
  id: string; name: string; location: Bi; type: Bi; units: string; occupancy: number; avgRent: string;
  description: Bi; highlights: { en: string[]; vi: string[] }; images: Photo[];
}> = {
  'quarter-house': {
    id: 'quarter-house',
    name: 'The Quarter House',
    location: { en: 'Hoan Kiem, Hanoi', vi: 'Hoàn Kiếm, Hà Nội' },
    type: { en: 'Boutique Townhouse', vi: 'Nhà phố boutique' },
    units: '4',
    occupancy: 95,
    avgRent: '$4,000/month',
    description: {
      en: "A restored townhouse in Hanoi's Old Quarter, a few minutes from Hoan Kiem Lake. Furnished units over several floors, with a street-facing balcony, a shared living room, kitchen and laundry — managed day to day by HiLink.",
      vi: 'Một căn nhà phố được phục dựng trong khu Phố Cổ Hà Nội, cách Hồ Hoàn Kiếm vài phút đi bộ. Các căn đầy đủ nội thất trải trên nhiều tầng, có ban công nhìn ra phố, phòng khách chung, bếp và khu giặt — do HiLink vận hành hằng ngày.',
    },
    highlights: {
      en: ['4 bedrooms', '3 full bathrooms and a separate WC', 'Balcony over the street', 'Full kitchen & dining area', 'Dedicated laundry area', 'Furnished throughout', 'Air conditioning in all rooms', 'Managed by HiLink'],
      vi: ['4 phòng ngủ', '3 phòng tắm đầy đủ và 1 WC riêng', 'Ban công nhìn ra phố', 'Bếp & khu ăn đầy đủ', 'Khu giặt riêng', 'Đầy đủ nội thất', 'Điều hoà tất cả các phòng', 'Do HiLink quản lý'],
    },
    images: QUARTER_HOUSE_IMAGES,
  },
};

const T = {
  en: {
    notFound: 'Property Not Found', back: 'Back to Properties', backWs: 'Back to Workspaces',
    showAll: (n: number) => `Show all ${n} photos`, more: (n: number) => `+${n} photos`, open: (n: number) => `Open photo ${n}`,
    units: 'Units', occ: 'Occupancy', rent: 'Avg. Rent', about: 'About this property', highlights: 'Property highlights', explore: 'Explore by room',
    cats: { all: 'All Photos', living: 'Living Spaces', bedroom: 'Bedrooms', kitchen: 'Kitchen & Dining', bathroom: 'Bathrooms', outdoor: 'Exterior' } as Record<string, string>,
    avg: 'Average monthly rent', loc: 'Location', type: 'Type', total: 'Total Units', occRate: 'Occupancy Rate', mgmt: 'Management',
    enquire: 'Enquire About This Property', viewing: 'Schedule a Viewing', managed: 'Managed by HiLink Vietnam',
    stripTitle: 'Interested in listing your property?', stripLead: 'Join our managed portfolio and let HiLink run it for you.', stripCta: 'Book a Portfolio Review',
    close: 'Close', prev: 'Previous', next: 'Next',
  },
  vi: {
    notFound: 'Không tìm thấy bất động sản', back: 'Quay lại Quản lý bất động sản', backWs: 'Quay lại Cho thuê văn phòng',
    showAll: (n: number) => `Xem tất cả ${n} ảnh`, more: (n: number) => `+${n} ảnh`, open: (n: number) => `Mở ảnh ${n}`,
    units: 'Số căn', occ: 'Lấp đầy', rent: 'Giá thuê TB', about: 'Về bất động sản', highlights: 'Điểm nổi bật', explore: 'Xem theo phòng',
    cats: { all: 'Tất cả ảnh', living: 'Phòng khách', bedroom: 'Phòng ngủ', kitchen: 'Bếp & ăn', bathroom: 'Phòng tắm', outdoor: 'Ngoại thất' } as Record<string, string>,
    avg: 'Giá thuê trung bình mỗi tháng', loc: 'Vị trí', type: 'Loại hình', total: 'Tổng số căn', occRate: 'Tỷ lệ lấp đầy', mgmt: 'Quản lý',
    enquire: 'Hỏi về bất động sản này', viewing: 'Hẹn lịch xem', managed: 'Do HiLink Việt Nam quản lý',
    stripTitle: 'Bạn muốn đưa bất động sản vào danh mục?', stripLead: 'Gia nhập danh mục do HiLink quản lý và để chúng tôi vận hành giúp bạn.', stripCta: 'Đặt lịch đánh giá danh mục',
    close: 'Đóng', prev: 'Trước', next: 'Sau',
  },
};

// ─── Lightbox ─────────────────────────────────────────────────────────────────
function Lightbox({ images, startIndex, onClose }: {
  images: Photo[];
  startIndex: number;
  onClose: () => void;
}) {
  const { lang } = useLang();
  const t = T[lang];
  const [current, setCurrent] = useState(startIndex);

  const prev = () => setCurrent((c) => (c - 1 + images.length) % images.length);
  const next = () => setCurrent((c) => (c + 1) % images.length);

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
        <span className="serif text-lg">{images[current].label[lang]}</span>
        <button
          onClick={onClose}
          className="p-2 hover:text-[#D12126] transition-colors"
          aria-label={t.close}
        >
          <X size={24} />
        </button>
      </div>

      {/* Main image */}
      <div className="flex-1 flex items-center justify-center relative overflow-hidden px-16">
        <AnimatePresence mode="wait">
          <motion.img
            key={current}
            {...photo(images[current].file)}
            alt={images[current].label[lang]}
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
          aria-label={t.prev}
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={next}
          className="absolute right-4 p-3 bg-white/10 hover:bg-white/20 text-white transition-colors"
          aria-label={t.next}
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
                i === current ? 'ring-2 ring-[#D12126]' : 'opacity-50 hover:opacity-80'
              }`}
            >
              <img loading="lazy" decoding="async"
                {...photo(img.file)}
                alt={img.label[lang]}
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
  images: Photo[];
  onOpen: (i: number) => void;
}) {
  const { lang } = useLang();
  const t = T[lang];
  const shown = images.slice(0, 5);
  const remaining = images.length - 5;

  return (
    <div className="grid grid-cols-4 grid-rows-2 gap-2 h-[520px] rounded-none overflow-hidden">
      {/* Hero — spans 2 cols, 2 rows */}
      <button
        className="col-span-2 row-span-2 relative overflow-hidden group"
        onClick={() => onOpen(0)}
        aria-label={t.open(1)}
      >
        <img loading="lazy" decoding="async"
          {...photo(shown[0].file)}
          alt={shown[0].label[lang]}
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
          aria-label={t.open(i + 2)}
        >
          <img loading="lazy" decoding="async"
            {...photo(img.file)}
            alt={img.label[lang]}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-300" />
          {/* "Show all photos" badge on last tile */}
          {i === 3 && remaining > 0 && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="text-white text-sm font-medium uppercase tracking-widest">
                {t.more(remaining)}
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
  const { lang, l } = useLang();
  const t = T[lang];
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const property = PROPERTIES[locationId ?? ''] ?? null;
  usePageMeta(property?.name ?? t.notFound, property?.description[lang]);

  if (!property) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-white">
        <div className="text-center">
          <h2 className="serif text-4xl mb-4">{t.notFound}</h2>
          <Link to={l('/workspace-leasing')} className="text-[#D12126] uppercase text-sm tracking-wider underline">
            {t.backWs}
          </Link>
        </div>
      </div>
    );
  }
  const images = property.images;

  const categories = ['all', 'living', 'bedroom', 'kitchen', 'bathroom', 'outdoor']
    .filter((key) => key === 'all' || images.some((img) => img.category === key));

  const filtered = activeCategory === 'all'
    ? images
    : images.filter((img) => img.category === activeCategory);

  return (
    <>
      {/* Back nav */}
      <div className="bg-white border-b border-[#2A2623]/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-4">
          <Link
            to={l('/property-management')}
            className="inline-flex items-center gap-2 text-sm uppercase tracking-wider text-[#6B645D] hover:text-[#D12126] transition-colors"
          >
            <ArrowLeft size={16} /> {t.back}
          </Link>
        </div>
      </div>

      {/* Header info */}
      <section className="relative bg-white pt-10 pb-6">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <p className="text-xs uppercase tracking-[0.2em] text-[#D12126] mb-3">{property.type[lang]}</p>
          <h1 className="serif text-5xl lg:text-6xl mb-3">{property.name}</h1>
          <div className="flex items-center gap-2 text-[#6B645D]">
            <MapPin size={16} className="text-[#D12126]" />
            <span>{property.location[lang]}</span>
          </div>
        </div>
      </section>

      {/* Photo grid */}
      <section className="relative bg-white pb-8">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <PhotoGrid images={images} onOpen={(i) => setLightboxIndex(i)} />
          <button
            onClick={() => setLightboxIndex(0)}
            className="mt-4 text-sm uppercase tracking-wider underline underline-offset-4 text-[#2A2623] hover:text-[#D12126] transition-colors"
          >
            {t.showAll(images.length)}
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
              <div className="grid grid-cols-3 gap-px bg-[#2A2623]/10 mb-12">
                {[
                  { icon: <Building2 size={20} />, label: t.units, value: property.units },
                  { icon: <TrendingUp size={20} />, label: t.occ, value: `${property.occupancy}%` },
                  { icon: <DollarSign size={20} />, label: t.rent, value: property.avgRent },
                ].map(({ icon, label, value }) => (
                  <div key={label} className="bg-white px-8 py-6 flex items-center gap-4">
                    <div className="text-[#D12126]">{icon}</div>
                    <div>
                      <div className="text-xs uppercase tracking-wider text-[#6B645D] mb-1">{label}</div>
                      <div className="serif text-2xl">{value}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Description */}
              <div className="mb-12 pb-12 border-b border-[#2A2623]/10">
                <h2 className="serif text-3xl mb-6">{t.about}</h2>
                <p className="text-[#444] leading-relaxed text-lg">{property.description[lang]}</p>
              </div>

              {/* Highlights */}
              <div className="mb-12 pb-12 border-b border-[#2A2623]/10">
                <h2 className="serif text-3xl mb-6">{t.highlights}</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {property.highlights[lang].map((h) => (
                    <div key={h} className="flex items-center gap-3 text-[#444]">
                      <div className="w-1 h-1 rounded-full bg-[#D12126] shrink-0" />
                      {h}
                    </div>
                  ))}
                </div>
              </div>

              {/* Photo gallery by category */}
              <div>
                <h2 className="serif text-3xl mb-6">{t.explore}</h2>

                {/* Category filter tabs */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {categories.map((key) => (
                    <button
                      key={key}
                      onClick={() => setActiveCategory(key)}
                      className={`px-5 py-2 text-xs uppercase tracking-wider transition-all ${
                        activeCategory === key
                          ? 'bg-[#361716] text-white'
                          : 'border border-[#2A2623]/20 hover:border-[#D12126] hover:text-[#D12126]'
                      }`}
                    >
                      {t.cats[key]}
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
                        const globalIndex = images.indexOf(img);
                        setLightboxIndex(globalIndex >= 0 ? globalIndex : i);
                      }}
                    >
                      <img loading="lazy" decoding="async"
                        {...photo(img.file)}
                        alt={img.label[lang]}
                        className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                       
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-end">
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-xs uppercase tracking-wider px-3 py-2">
                          {img.label[lang]}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right sticky CTA panel */}
            <div className="lg:sticky lg:top-24 h-fit">
              <div className="border border-[#2A2623]/15 p-8 bg-white shadow-[0_4px_40px_rgba(0,0,0,0.08)]">
                <p className="serif text-3xl mb-1">{property.avgRent}</p>
                <p className="text-sm text-[#6B645D] mb-8 uppercase tracking-wider">{t.avg}</p>

                <div className="space-y-4 mb-8 text-sm">
                  {[
                    [t.loc, property.location[lang]],
                    [t.type, property.type[lang]],
                    [t.total, property.units],
                    [t.occRate, `${property.occupancy}%`],
                    [t.mgmt, 'HiLink Vietnam'],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between items-center py-3 border-b border-[#2A2623]/08">
                      <span className="text-[#6B645D] uppercase tracking-wider text-xs">{k}</span>
                      <span className="font-medium">{v}</span>
                    </div>
                  ))}
                </div>

                <Link
                  to={l('/contact')}
                  className="block w-full py-4 bg-[#D12126] text-white text-sm uppercase tracking-widest text-center hover:bg-[#A3181C] transition-colors mb-3"
                >
                  {t.enquire}
                </Link>
                <Link
                  to={l('/contact')}
                  className="block w-full py-4 border border-[#2A2623] text-sm uppercase tracking-widest text-center hover:bg-[#361716] hover:text-white transition-colors"
                >
                  {t.viewing}
                </Link>

                <p className="text-center text-xs text-[#6B645D] mt-6">
                  {t.managed}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA strip */}
      <section className="relative py-20 bg-[#361716] text-white overflow-hidden">
        <Contours />
        <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="serif text-3xl lg:text-4xl mb-3">{t.stripTitle}</h2>
            <p className="text-white/70">{t.stripLead}</p>
          </div>
          <Link
            to={l('/contact')}
            className="shrink-0 px-10 py-4 bg-[#D12126] text-white text-sm uppercase tracking-widest hover:bg-[#A3181C] transition-colors"
          >
            {t.stripCta}
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
