import { ArrowRight } from 'lucide-react';
import { Heart, GraduationCap, Globe2, Mail, Sparkles, Scale, Compass, MapPin, Clock } from '../components/Glyph';
import { motion } from 'motion/react';
import { HeroBg } from '../components/HeroBg';
import { CAREERS } from '../data/careersCopy';
import { LOCATIONS } from '../data/locations';
import { CONTACT } from '../data/site';
import { useLang, usePageMeta } from '../lib/i18n';
import { Flag } from '../components/Flag';
import { photo } from '../lib/photo';

const VALUE_ICONS = [<Heart size={26} />, <GraduationCap size={26} />, <Globe2 size={26} />, <Sparkles size={26} />, <Scale size={26} />, <Compass size={26} />];

const gallery = [
  '/photos/hbc-team.webp',
  '/photos/f15-lounge.webp',
  '/photos/hbc-host.webp',
  '/photos/f15-meeting-pod.webp',
  '/photos/hbc-reception.webp',
  '/photos/nc35-room.webp',
];

const T = {
  en: {
    eyebrow: 'Careers',
    stats: [[String(LOCATIONS.length), 'HiLink locations'], ['6', 'Open roles'], ['2020', 'Founded in Ha Noi'], ['2', 'Districts · Hoan Kiem & Dong Da']],
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
    hireEyebrow: 'How we hire', hireTitle: 'A clear, respectful process',
    hiring: [
      ['Application', 'Send your CV and a short note. We read every one.'],
      ['Intro call', 'A relaxed conversation to learn about you and share more about us.'],
      ['Team interview', 'Meet the people you would work with and dig into the role.'],
      ['Offer & welcome', 'A clear offer and a structured onboarding from day one.'],
    ],
    openEyebrow: 'Always open to great people', openTitle: 'Open positions', applySubject: 'Application',
  },
  vi: {
    eyebrow: 'Tuyển dụng',
    stats: [[String(LOCATIONS.length), 'Địa điểm HiLink'], ['6', 'Vị trí đang tuyển'], ['2020', 'Thành lập tại Hà Nội'], ['2', 'Quận · Hoàn Kiếm & Đống Đa']],
    lifeEyebrow: 'Cuộc sống tại HiLink', lifeTitle: 'Nơi chúng tôi làm việc mỗi ngày',
    lifeLead: 'Đội ngũ làm việc tại các không gian HiLink giữa trung tâm Hà Nội — được thiết kế để công việc trở nên nhẹ nhàng.', lifeAlt: 'Cuộc sống tại HiLink',
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
    hireEyebrow: 'Quy trình tuyển dụng', hireTitle: 'Rõ ràng và tôn trọng',
    hiring: [
      ['Ứng tuyển', 'Gửi CV kèm vài dòng giới thiệu. Chúng tôi đọc từng hồ sơ.'],
      ['Trao đổi ban đầu', 'Một cuộc trò chuyện thoải mái để hiểu về bạn và giới thiệu thêm về chúng tôi.'],
      ['Phỏng vấn với nhóm', 'Gặp những người bạn sẽ làm cùng và tìm hiểu sâu về vị trí.'],
      ['Mời nhận việc', 'Thư mời rõ ràng và quy trình hội nhập bài bản từ ngày đầu.'],
    ],
    openEyebrow: 'Luôn chào đón người giỏi', openTitle: 'Vị trí đang tuyển', applySubject: 'Ứng tuyển',
  },
};

export function CareersPage() {
  const { lang } = useLang();
  const t = T[lang];
  const c = CAREERS[lang];
  usePageMeta(t.eyebrow, c.heroSub);
  const mail = (subject: string) => `${CONTACT.emailHref}?subject=${encodeURIComponent(subject)}`;

  return (
    <>
      {/* Hero */}
      <section id="hero" className="relative overflow-hidden min-h-[72vh] flex items-end bg-[#2A2623] text-white">
        <HeroBg image="/photos/hbc-lounge-xl.webp" />
        <div className="relative z-10 max-w-[1600px] mx-auto px-6 lg:px-12 py-20 lg:py-28 w-full">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-4xl">
            <p className="text-[12px] uppercase tracking-[0.2em] text-[#F06A6E] mb-7 flex items-center gap-3">
              <Flag className="text-[#F06A6E]" /> {t.eyebrow}
            </p>
            <h1 className="serif text-5xl lg:text-[5rem] mb-8 leading-[0.98]">{c.heroTitle}</h1>
            <p className="text-lg md:text-xl text-[#E9E3DA]/90 leading-relaxed max-w-2xl">
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
      <section className="py-24 lg:py-32 bg-[#F4F0EA]">
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
              <motion.div
                key={src}
                className={`relative overflow-hidden ${i === 0 ? 'col-span-2 lg:col-span-2 aspect-[16/10]' : 'aspect-[4/3]'}`}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ delay: (i % 3) * 0.08, duration: 0.5 }}
              >
                <img {...photo(src)} alt={t.lifeAlt} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
              </motion.div>
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
      <section className="py-24 lg:py-32 bg-[#F4F0EA] text-[#2A2623]">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="relative aspect-[4/3] overflow-hidden">
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

      {/* Teams */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <p className="text-[12px] uppercase tracking-[0.2em] text-[#D12126] mb-5 flex items-center gap-2.5"><Flag /> {t.teamsEyebrow}</p>
            <h2 className="serif text-4xl lg:text-5xl">{t.teamsTitle}</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-px bg-[#2A2623]/10">
            {t.teams.map(([title, desc]) => (
              <div key={title} className="bg-[#F4F0EA] p-8 lg:p-12">
                <h3 className="serif text-2xl mb-3">{title}</h3>
                <p className="text-[#6B645D] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How we hire */}
      <section className="py-24 lg:py-32 bg-[#F4F0EA]">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="mb-14 max-w-2xl">
            <p className="text-[12px] uppercase tracking-[0.2em] text-[#D12126] mb-5 flex items-center gap-2.5"><Flag /> {t.hireEyebrow}</p>
            <h2 className="serif text-4xl lg:text-5xl leading-tight">{t.hireTitle}</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#2A2623]/10">
            {t.hiring.map(([title, desc], i) => (
              <div key={title} className="bg-white p-8 lg:p-10">
                <span className="serif text-3xl text-[#D12126]">0{i + 1}</span>
                <h3 className="serif text-xl mt-4 mb-3">{title}</h3>
                <p className="text-[#6B645D] text-[14px] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open positions */}
      <section id="open-positions" className="relative overflow-hidden py-24 lg:py-32 bg-[#FBECEC] text-[#2A2623]">
        <div className="relative z-10 max-w-[1600px] mx-auto px-6 lg:px-12 text-center">
          <p className="text-[12px] uppercase tracking-[0.2em] text-[#D12126] mb-5 flex items-center justify-center gap-3">
            <Clock size={13} /> {t.openEyebrow}
          </p>
          <h2 className="serif text-4xl lg:text-5xl mb-10">{t.openTitle}</h2>
          <ul className="max-w-2xl mx-auto mb-12 divide-y divide-[#2A2623]/10 border-y border-[#2A2623]/10 text-left">
            {c.jobs.map((j) => (
              <li key={j.t}>
                <a href={mail(`${t.applySubject}: ${j.t}`)} className="group flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-4 hover:text-[#D12126] transition-colors">
                  <span className="serif text-xl">{j.t}</span>
                  <span className="text-[12px] uppercase tracking-[0.14em] text-[#6B645D] flex items-center gap-2">
                    {j.dept} · <MapPin size={12} /> {j.loc}
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <p className="text-xl text-[#6B645D] mb-4 max-w-2xl mx-auto">
            <strong className="font-medium">{c.noRole}</strong> {c.noRoleSub}
          </p>
          <a href={mail('CV')} className="mt-8 group inline-flex items-center gap-2 px-12 py-4 bg-[#D12126] text-white text-[12px] uppercase tracking-[0.16em] hover:bg-[#A3181C] transition-colors">
            <Mail size={16} /> {CONTACT.email}
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </section>
    </>
  );
}
