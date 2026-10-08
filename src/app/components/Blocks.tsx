// Content blocks built on real HiLink data: partner logos, workspace
// locations and the service lines. Used on several pages, defined once.
import { Link } from 'react-router';
import { ArrowRight, ArrowUpRight, MapPin } from 'lucide-react';
import { LOCATIONS, WORKSPACE_LINES } from '../data/locations';
import { PARTNERS, SERVICES, ws } from '../data/site';
import { PhotoCard } from './Kit';
import { useLang } from '../lib/i18n';

/** Partner logos, sized by the square root of their aspect ratio so long
 *  wordmarks and square marks carry the same visual weight (as on hilink.vn). */
export function PartnerLogos() {
  return (
    <ul className="flex flex-wrap items-center justify-center gap-x-12 gap-y-10">
      {PARTNERS.map((p) => {
        const width = Math.round(34 * Math.sqrt(p.w / p.h) * 1.6);
        return (
          <li key={p.id}>
            <img
              src={p.src}
              alt={p.name}
              width={width}
              height={Math.round((width * p.h) / p.w)}
              loading="lazy"
              className="opacity-70 grayscale hover:opacity-100 hover:grayscale-0 transition"
              style={{ width, height: 'auto' }}
            />
          </li>
        );
      })}
    </ul>
  );
}

const HOURS_VI: [RegExp, string][] = [
  [/Mon/g, 'T2'], [/Tue/g, 'T3'], [/Wed/g, 'T4'], [/Thu/g, 'T5'], [/Fri/g, 'T6'], [/Sat/g, 'T7'], [/Sun/g, 'CN'], [/late/g, 'khuya'],
];
const hoursFor = (h: string, lang: 'en' | 'vi') => (lang === 'vi' ? HOURS_VI.reduce((s, [re, v]) => s.replace(re, v), h) : h);

/** The seven HiLink Workspaces addresses; each card opens its page on hilink.vn. */
export function LocationGrid({ limit }: { limit?: number }) {
  const { lang } = useLang();
  const list = limit ? LOCATIONS.slice(0, limit) : LOCATIONS;
  const soon = lang === 'vi' ? 'Sắp mở' : 'Opening soon';
  const view = lang === 'vi' ? 'Xem không gian & giá' : 'View spaces & prices';
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
      {list.map((loc) => {
        const line = loc.line ? WORKSPACE_LINES[loc.line] : null;
        return (
          <a key={loc.id} href={ws(lang, `/locations/${loc.id}`)} target="_blank" rel="noopener noreferrer" className="group block">
            <div className="relative aspect-[4/3] overflow-hidden bg-[#EAE3D2]">
              <img src={loc.photo} alt={loc.name} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
              {loc.comingSoon && (
                <span className="absolute top-4 left-4 bg-[#0F0F0F] text-white text-[10px] font-medium uppercase tracking-[0.16em] px-3 py-1.5">{soon}</span>
              )}
            </div>
            <div className="pt-6">
              {line && (
                // Brand gold is too light for 11px text on cream — use the ink tone.
                <p className="eyebrow" style={{ color: line.color === '#A88F5C' ? '#7A653B' : line.color }}>{line.label}</p>
              )}
              <h3 className="mb-2 group-hover:text-[#7A653B] transition-colors">{loc.name}</h3>
              <p className="flex items-start gap-2 text-[13.5px] text-[#666] mb-3">
                <MapPin size={14} className="shrink-0 mt-1" /> {loc.address}
              </p>
              <p className="text-[#555] mb-4">{loc.intro[lang]}</p>
              <p className="text-[12px] text-[#666] mb-5">{hoursFor(loc.hours, lang)}</p>
              <span className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em]">
                {view} <ArrowUpRight size={13} />
              </span>
            </div>
          </a>
        );
      })}
    </div>
  );
}

/** The service lines as cards. A line without a HiLink photograph gets a
 *  typographic panel instead of a stand-in picture. */
export function ServiceGrid({ exclude }: { exclude?: string }) {
  const { lang, l } = useLang();
  const more = lang === 'vi' ? 'Tìm hiểu thêm' : 'Learn more';
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
      {SERVICES.filter((s) => s.path !== exclude).map((s) =>
        s.photo ? (
          <PhotoCard key={s.path} photo={s.photo} title={s.t[lang]} text={s.d[lang]} to={l(s.path)} cta={more} />
        ) : (
          <Link key={s.path} to={l(s.path)} className="group block">
            <div className="aspect-[4/3] bg-[#0F0F0F] flex items-end p-8">
              <span className="serif text-[#D8BE86] text-[clamp(1.6rem,3vw,2.2rem)] leading-tight">{s.t[lang]}</span>
            </div>
            <div className="pt-6">
              <h3 className="mb-3 group-hover:text-[#7A653B] transition-colors">{s.t[lang]}</h3>
              <p className="text-[#555]">{s.d[lang]}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em]">
                {more} <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        ),
      )}
    </div>
  );
}
