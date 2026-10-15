import { useState } from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Heart, GraduationCap, Globe2, Mail, Sparkles, Scale, Compass, MapPin, Clock } from '../components/Glyph';
import { motion } from 'motion/react';
import { HeroBg } from '../components/HeroBg';
import { CAREERS } from '../data/careersCopy';
import { CONTACT } from '../data/site';
import { useLang, usePageMeta } from '../lib/i18n';
import { Flag } from '../components/Flag';
import { photo } from '../lib/photo';
import { WORKSPACE_LOCATIONS } from '../data/workspaceLocations';

const VALUE_ICONS = [<Heart size={26} />, <GraduationCap size={26} />, <Globe2 size={26} />, <Sparkles size={26} />, <Scale size={26} />, <Compass size={26} />];

// One photograph per team (Teams at HiLink).
// Generated photographs of the kind of work each team does (PHOTO-CREDITS.md).
const TEAM_PHOTOS = ['/photos/ai-team-property.webp', '/photos/ai-team-community.webp', '/photos/ai-team-advisory.webp', '/photos/ai-team-studio.webp'];

const gallery = [
  '/photos/hbc-lounge-2.webp',
  '/photos/f15-lounge.webp',
  '/photos/hbc-host.webp',
  '/photos/f15-meeting-pod.webp',
  '/photos/hbc-reception.webp',
  '/photos/nc35-room.webp',
];

const T = {
  en: {
    eyebrow: 'Careers',
    stats: [[String(WORKSPACE_LOCATIONS.length), 'HiLink locations'], ['6', 'Open roles'], ['2020', 'Founded in Ha Noi'], ['2', 'Districts · Hoan Kiem & Dong Da']],
    lifeEyebrow: 'Life at HiLink', lifeTitle: 'Where we spend our days',
    lifeLead: 'Our teams work from HiLink spaces in the heart of Hanoi — designed to make great work feel effortless.', lifeAlt: 'Life at HiLink',
    whyEyebrow: "What it's like", whyTitle: 'Why join us',
    values: [
      ['People first', 'We invest in our team with mentorship, ownership, and a culture of genuine care.'],
      ['Room to grow', 'Clear progression and exposure across property, workspace, and advisory work.'],
      ['International by nature', 'Work across Vietnamese and global contexts with clients from around the world.'],
      ['Pride in the detail', 'We sweat the small things — because that is what separates good from exceptional.'],
      ['Transparency', 'Honest communication, fair decisions, and no politics — with each other and our clients.'],
      ['Ownership', 'We give people real responsibility early and the trust to run with it.'],
    ],
    teamAlt: 'A HiLink team working with clients',
    teamsEyebrow: 'Where you fit', teamsTitle: 'Teams at HiLink',
    teams: [
      ['Property Operations', 'Asset managers, leasing specialists, and maintenance coordinators who keep portfolios performing.'],
      ['Workspace & Community', 'Front-of-house, community, and hospitality teams creating the HiLink experience every day.'],
      ['Advisory & Business Services', 'Consultants, accountants, and legal specialists guiding international clients into Vietnam.'],
      ['Marketing & Studio', 'Strategists, content, and creative producers shaping the HiLink brand and campaigns.'],
    ],
    openEyebrow: 'Always open to great people', openTitle: 'Open positions', applySubject: 'Application',
  },
  vi: {
    eyebrow: 'Tuyển dụng',
    stats: [[String(WORKSPACE_LOCATIONS.length), 'Địa điểm HiLink'], ['6', 'Vị trí đang tuyển'], ['2020', 'Thành lập tại Hà Nội'], ['2', 'Quận · Hoàn Kiếm & Đống Đa']],
    lifeEyebrow: 'Cuộc sống tại HiLink', lifeTitle: 'Nơi chúng tôi làm việc mỗi ngày',
    lifeLead: 'Đội ngũ làm việc tại các không gian HiLink giữa trung tâm Hà Nội.', lifeAlt: 'Cuộc sống tại HiLink',
    whyEyebrow: 'Làm việc tại đây', whyTitle: 'Vì sao gia nhập',
    values: [
      ['Con người là trên hết', 'Chúng tôi đầu tư cho đội ngũ bằng sự kèm cặp, trao quyền và văn hoá quan tâm thật sự.'],
      ['Không gian phát triển', 'Lộ trình rõ ràng và cơ hội làm việc trong bất động sản, không gian làm việc và tư vấn.'],
      ['Môi trường quốc tế', 'Làm việc trong bối cảnh Việt Nam và quốc tế, cùng khách hàng từ khắp nơi.'],
      ['Chỉn chu từng chi tiết', 'Chúng tôi chăm chút những điều nhỏ — vì đó là điều phân biệt tốt và xuất sắc.'],
      ['Minh bạch', 'Giao tiếp thẳng thắn, quyết định công bằng — với nhau và với khách hàng.'],
      ['Trao quyền', 'Chúng tôi giao trách nhiệm thật từ sớm và tin tưởng để bạn tự làm.'],
    ],
    teamAlt: 'Đội ngũ HiLink làm việc cùng khách hàng',
    teamsEyebrow: 'Vị trí của bạn', teamsTitle: 'Các nhóm tại HiLink',
    teams: [
      ['Vận hành bất động sản', 'Quản lý tài sản, chuyên viên cho thuê và điều phối bảo trì giữ cho danh mục vận hành hiệu quả.'],
      ['Không gian & cộng đồng', 'Lễ tân, cộng đồng và dịch vụ tạo nên trải nghiệm HiLink mỗi ngày.'],
      ['Tư vấn & dịch vụ doanh nghiệp', 'Tư vấn viên, kế toán và chuyên viên pháp lý đồng hành cùng khách hàng quốc tế vào Việt Nam.'],
      ['Marketing & studio', 'Chiến lược, nội dung và sáng tạo định hình thương hiệu và chiến dịch HiLink.'],
    ],
    openEyebrow: 'Luôn chào đón người giỏi', openTitle: 'Vị trí đang tuyển', applySubject: 'Ứng tuyển',
  },
};

export function CareersPage() {
  const { lang } = useLang();
  const [team, setTeam] = useState(0);
  const t = T[lang];
  const c = CAREERS[lang];
  usePageMeta(t.eyebrow, c.heroSub);
  const mail = (subject: string) => `${CONTACT.emailHref}?subject=${encodeURIComponent(subject)}`;

  return (
    <>
      {/* Hero */}
      <section id="hero" className="relative overflow-hidden min-h-[72vh] flex items-end bg-[#2A2623] text-white">
        <HeroBg image="/photos/f15-logo.webp" />
        <div className="relative z-10 max-w-[1600px] mx-auto px-6 lg:px-12 py-20 lg:py-28 w-full">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-4xl">
            <p className="text-[12px] uppercase tracking-[0.2em] text-[#F06A6E] mb-7 flex items-center gap-3">
              <Flag className="text-[#F06A6E]" /> {t.eyebrow}
            </p>
            <h1 className="serif text-5xl lg:text-[5rem] mb-8 leading-[0.98]">{c.heroTitle}</h1>
            <p className="text-lg md:text-xl text-[#F8F6F1]/90 leading-relaxed max-w-2xl">
              {c.heroSub}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stat band */}
      <section className="bg-[#2A2623] text-white border-t border-white/10">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/10">
          {t.stats.map(([n, label]) => (
            <div key={label} className="bg-[#2A2623] py-10 px-6 text-center">
              <div className="serif text-4xl lg:text-5xl text-[#F06A6E] mb-2">{n}</div>
              <div className="text-[12px] uppercase tracking-[0.18em] text-white/60">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Life at HiLink — gallery */}
      <section className="relative py-24 lg:py-32 bg-white">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14">
            <div>
              <p className="text-[12px] uppercase tracking-[0.2em] text-[#D12126] mb-5 flex items-center gap-2.5"><Flag /> {t.lifeEyebrow}</p>
              <h2 className="serif text-4xl lg:text-5xl leading-tight">{t.lifeTitle}</h2>
            </div>
            <p className="text-[15px] text-[#6B645D] max-w-sm">
              {t.lifeLead}
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {gallery.map((src, i) => (
              <div
                key={src}
                className={`relative overflow-hidden rounded-[8px] ${i === 0 ? 'col-span-2 lg:col-span-2 aspect-[16/10]' : 'aspect-[4/3]'}`}
              >
                <img {...photo(src)} alt={t.lifeAlt} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why join — values */}
      <section id="why-join" className="py-24 lg:py-32 bg-white">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <p className="text-[12px] uppercase tracking-[0.2em] text-[#D12126] mb-5 flex items-center gap-2.5"><Flag /> {t.whyEyebrow}</p>
            <h2 className="serif text-4xl lg:text-5xl">{t.whyTitle}</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#2A2623]/10">
            {t.values.map(([title, description], i) => (
              <div key={title} className="bg-white p-8 lg:p-10 hover:bg-[#F4F0EA] transition-colors">
                <div className="text-[#D12126] mb-5">{VALUE_ICONS[i]}</div>
                <h3 className="serif text-2xl mb-3">{title}</h3>
                <p className="text-[#6B645D] leading-relaxed text-[15px]">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits + feature image */}
      <section className="relative py-24 lg:py-32 bg-white text-[#2A2623]">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[8px]">
            <img loading="lazy" decoding="async" {...photo('/photos/hbc-team.webp')} alt={t.teamAlt} className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="text-[12px] uppercase tracking-[0.2em] text-[#D12126] mb-5 flex items-center gap-2.5"><Flag /> {c.benefitsE}</p>
            <h2 className="serif text-4xl lg:text-5xl mb-10 leading-tight">{c.benefitsT}</h2>
            <ul className="grid sm:grid-cols-2 gap-y-4 gap-x-8">
              {c.perks.map((b) => (
                <li key={b.t} className="flex items-start gap-3 text-[15px] text-[#6B645D]">
                  <span className="w-1.5 h-1.5 bg-[#D12126] rounded-full mt-2.5 flex-shrink-0" />
                  <span><strong className="font-medium text-[#2A2623]">{b.t}</strong> — {b.d}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Teams: four photographs side by side; the one in hand opens out and
          shows what the team does. Hover or focus on wide screens, tap on
          phones (where the panels stack and the open one grows taller). */}
      <section className="relative py-24 lg:py-32 bg-white">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="mb-12 lg:mb-14">
            <p className="text-[12px] uppercase tracking-[0.2em] text-[#D12126] mb-5 flex items-center gap-2.5"><Flag /> {t.teamsEyebrow}</p>
            <h2 className="serif text-4xl lg:text-5xl">{t.teamsTitle}</h2>
          </div>
          <div className="flex flex-col lg:flex-row gap-3 lg:gap-4 lg:h-[540px]">
            {t.teams.map(([title, desc], k) => {
              const on = k === team;
              return (
                <button
                  key={title}
                  type="button"
                  onMouseEnter={() => setTeam(k)}
                  onFocus={() => setTeam(k)}
                  onClick={() => setTeam(k)}
                  aria-expanded={on}
                  className={`group relative overflow-hidden rounded-[8px] bg-[#2A2623] text-left text-white transition-[flex-grow,height] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] lg:h-auto lg:basis-0 ${on ? 'h-[340px] lg:grow-[3.4]' : 'h-[108px] lg:grow'}`}
                >
                  <img loading="lazy" decoding="async" {...photo(TEAM_PHOTOS[k], '(min-width: 1024px) 50vw, 100vw')} alt="" className={`absolute inset-0 h-full w-full object-cover transition-[transform,opacity] duration-[1.2s] ${on ? 'scale-100 opacity-90' : 'scale-[1.08] opacity-55'}`} />
                  <span className={`absolute inset-0 transition-colors duration-700 ${on ? 'bg-gradient-to-t from-black/75 via-black/15 to-transparent' : 'bg-[#361716]/55'}`} aria-hidden="true" />
                  <span className="absolute left-5 top-3.5 lg:left-7 lg:top-7 text-[13px] font-medium tabular-nums tracking-[0.08em] text-white/85">{String(k + 1).padStart(2, '0')}</span>
                  {/* Closed, on wide screens: the title runs up the panel. */}
                  <span className={`serif absolute bottom-7 left-7 hidden origin-bottom-left -rotate-90 translate-x-[1.1em] whitespace-nowrap text-[1.35rem] transition-opacity duration-500 lg:block ${on ? 'opacity-0' : 'opacity-100'}`} aria-hidden="true">{title}</span>
                  <span className={`absolute inset-x-5 bottom-4 lg:inset-x-8 lg:bottom-8 block ${on ? '' : 'lg:opacity-0'} transition-opacity duration-500 ${on ? 'delay-200' : ''}`}>
                    <span className={`serif block lg:text-[2rem] leading-[1.15] ${on ? 'text-[1.5rem]' : 'text-[1.25rem]'}`}>{title}</span>
                    <span className={`mt-3 block max-w-[46ch] text-[15px] leading-relaxed text-white/85 ${on ? '' : 'hidden lg:block'}`}>{desc}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Open positions: one row per role, the same columns in every row. */}
      <section id="open-positions" className="relative py-24 lg:py-32 bg-white text-[#2A2623]">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="mb-10 lg:mb-14 flex flex-wrap items-end justify-between gap-x-16 gap-y-6">
            <div>
              <p className="text-[12px] uppercase tracking-[0.2em] text-[#D12126] mb-5 flex items-center gap-2.5"><Clock size={13} /> {t.openEyebrow}</p>
              <h2 className="serif text-4xl lg:text-5xl">{t.openTitle}</h2>
            </div>
            <p className="max-w-md text-[15px] leading-relaxed text-[#6B645D]">
              <strong className="font-medium text-[#2A2623]">{c.noRole}</strong> {c.noRoleSub}
            </p>
          </div>
          <ul className="border-t border-[#2A2623]/15">
            {c.jobs.map((j) => (
              <li key={j.t} className="border-b border-[#2A2623]/15">
                <a href={mail(`${t.applySubject}: ${j.t}`)} className="group grid grid-cols-[1fr_auto] lg:grid-cols-[minmax(0,5fr)_minmax(0,4fr)_minmax(0,3fr)_auto] items-center gap-x-8 gap-y-2 py-6 lg:py-7">
                  <span className="serif text-[1.35rem] lg:text-[1.6rem] leading-tight transition-colors group-hover:text-[#D12126]">{j.t}</span>
                  <ArrowUpRight size={20} className="text-[#D12126] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 lg:order-last" />
                  <span className="col-span-2 lg:col-span-1 text-[12px] uppercase tracking-[0.14em] text-[#6B645D]">{j.dept}</span>
                  <span className="col-span-2 lg:col-span-1 flex items-center gap-2 text-[12px] uppercase tracking-[0.14em] text-[#6B645D]"><MapPin size={12} /> {j.loc}</span>
                </a>
              </li>
            ))}
          </ul>
          <a href={mail('CV')} className="mt-12 group inline-flex items-center gap-2 px-8 sm:px-12 py-4 bg-[#D12126] text-white text-[12px] uppercase tracking-[0.16em] hover:bg-[#A3181C] transition-colors">
            <Mail size={16} /> {CONTACT.email}
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </section>
    </>
  );
}
