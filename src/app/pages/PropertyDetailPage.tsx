import { useState } from 'react';
import { useParams } from 'react-router';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useLang, usePageMeta } from '../lib/i18n';
import { Button, CtaBand, PageHero, Reveal, Section, TextLink } from '../components/Kit';
import { NotFoundPage } from './NotFoundPage';
import type { Bi } from '../data/site';

// Properties HiLink manages, as shown in the landlord portfolio on hilink.vn.
const PROPERTIES: Record<string, {
  name: string; tag: Bi; loc: Bi; units: string; occupancy: string; rent: string;
  intro: Bi; features: { en: string[]; vi: string[] }; photos: string[];
}> = {
  'quarter-house': {
    name: 'The Quarter House',
    tag: { en: 'Boutique townhouse', vi: 'Nhà phố boutique' },
    loc: { en: 'Hoan Kiem, Hanoi', vi: 'Hoàn Kiếm, Hà Nội' },
    units: '4',
    occupancy: '95%',
    rent: '$4,000/mo',
    intro: {
      en: 'A restored townhouse in the Old Quarter, a few minutes from Hoan Kiem Lake. Four furnished units over several floors, with a street-facing balcony, a shared living room, a full kitchen and laundry — managed day to day by HiLink.',
      vi: 'Một căn nhà phố được phục dựng trong khu Phố Cổ, cách Hồ Hoàn Kiếm vài phút đi bộ. Bốn căn đầy đủ nội thất trải trên nhiều tầng, có ban công nhìn ra phố, phòng khách chung, bếp đầy đủ và khu giặt — do HiLink vận hành hằng ngày.',
    },
    features: {
      en: ['4 bedrooms', '3 full bathrooms and a separate WC', 'Balcony over the street', 'Full kitchen and dining area', 'Laundry area', 'Furnished throughout'],
      vi: ['4 phòng ngủ', '3 phòng tắm đầy đủ và 1 WC riêng', 'Ban công nhìn ra phố', 'Bếp và khu ăn đầy đủ', 'Khu giặt', 'Đầy đủ nội thất'],
    },
    photos: Array.from({ length: 8 }, (_, i) => `/properties/quarter-house/qh-0${i + 1}.webp`),
  },
};

const T = {
  en: { eyebrow: 'Managed by HiLink', units: 'Units', occ: 'Occupancy', rent: 'Average rent', features: 'The property', photos: 'Gallery', back: 'Property management', cta: 'Own a property like this?', ctaLead: 'Tell us about it — HiLink can take over leasing, operations and reporting.', talk: 'Talk to our team', photo: 'Photo', close: 'Close', prev: 'Previous', next: 'Next' },
  vi: { eyebrow: 'Do HiLink quản lý', units: 'Số căn', occ: 'Tỷ lệ lấp đầy', rent: 'Giá thuê trung bình', features: 'Bất động sản', photos: 'Hình ảnh', back: 'Quản lý bất động sản', cta: 'Bạn sở hữu một bất động sản như thế này?', ctaLead: 'Hãy kể cho chúng tôi — HiLink có thể đảm nhận cho thuê, vận hành và báo cáo.', talk: 'Trao đổi với chúng tôi', photo: 'Ảnh', close: 'Đóng', prev: 'Trước', next: 'Sau' },
};

export function PropertyDetailPage() {
  const { propertyId = '' } = useParams();
  const { lang, l } = useLang();
  const t = T[lang];
  const p = PROPERTIES[propertyId];
  const [open, setOpen] = useState<number | null>(null);
  usePageMeta(p?.name ?? '', p?.intro[lang]);
  if (!p) return <NotFoundPage />;

  const go = (d: number) => setOpen((i) => (i === null ? i : (i + d + p.photos.length) % p.photos.length));

  return (
    <>
      <PageHero eyebrow={`${t.eyebrow} · ${p.tag[lang]}`} title={p.name} lead={p.loc[lang]} photo={p.photos[6]} />

      <Section tone="cream">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          <Reveal className="lg:col-span-7">
            <p className="eyebrow">{t.features}</p>
            <p className="lede mb-10">{p.intro[lang]}</p>
            <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3 mb-10">
              {p.features[lang].map((f) => (
                <li key={f} className="flex gap-3 text-[15px]"><span className="text-[#7A653B]">—</span>{f}</li>
              ))}
            </ul>
            <TextLink to={l('/property-management')}>{t.back}</TextLink>
          </Reveal>
          <Reveal className="lg:col-span-5">
            <dl className="divide-y divide-[#0F0F0F]/10 border-y border-[#0F0F0F]/10">
              {[[t.units, p.units], [t.occ, p.occupancy], [t.rent, p.rent]].map(([k, v]) => (
                <div key={k} className="flex items-baseline justify-between py-6">
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#555]">{k}</dt>
                  <dd className="serif text-[1.8rem]">{v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </Section>

      <Section tone="white">
        <p className="eyebrow">{t.photos}</p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {p.photos.map((src, i) => (
            <button key={src} onClick={() => setOpen(i)} className="group relative aspect-[3/2] overflow-hidden bg-[#EAE3D2]" aria-label={`${t.photo} ${i + 1}`}>
              <img src={src} alt="" loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
            </button>
          ))}
        </div>
      </Section>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            className="fixed inset-0 z-[300] bg-[#0F0F0F]/95 flex items-center justify-center p-4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
            onKeyDown={(e) => { if (e.key === 'ArrowLeft') go(-1); if (e.key === 'ArrowRight') go(1); if (e.key === 'Escape') setOpen(null); }}
            tabIndex={-1}
            ref={(el) => el?.focus()}
            role="dialog"
            aria-label={p.name}
          >
            <img src={p.photos[open]} alt="" className="max-w-full max-h-[86vh] object-contain" onClick={(e) => e.stopPropagation()} />
            <button onClick={() => setOpen(null)} className="absolute top-6 right-6 text-white p-2" aria-label={t.close}><X size={26} /></button>
            <button onClick={(e) => { e.stopPropagation(); go(-1); }} className="absolute left-4 text-white p-3" aria-label={t.prev}><ChevronLeft size={32} /></button>
            <button onClick={(e) => { e.stopPropagation(); go(1); }} className="absolute right-4 text-white p-3" aria-label={t.next}><ChevronRight size={32} /></button>
            <span className="absolute bottom-6 text-[12px] text-white/60">{open + 1} / {p.photos.length}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <CtaBand title={t.cta} lead={t.ctaLead} photo={p.photos[1]}>
        <Button to={l('/contact')}>{t.talk}</Button>
      </CtaBand>
    </>
  );
}
