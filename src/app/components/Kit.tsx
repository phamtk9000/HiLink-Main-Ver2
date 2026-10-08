// Building blocks every page shares: one container width, one section rhythm,
// one heading pattern, one button set. Pages compose these instead of styling
// sections from scratch, so spacing and type stay consistent across the site.
import { Link } from 'react-router';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import type { ReactNode } from 'react';

const EASE = [0.16, 1, 0.3, 1] as const;

export function Container({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`max-w-[1400px] mx-auto px-6 lg:px-12 ${className}`}>{children}</div>;
}

const TONES = {
  cream: 'bg-[#F8F6F1] text-[#0F0F0F]',
  white: 'bg-white text-[#0F0F0F]',
  beige: 'bg-[#F0EDE6] text-[#0F0F0F]',
  dark: 'bg-[#0F0F0F] text-white on-dark',
};
export type Tone = keyof typeof TONES;

export function Section({ tone = 'cream', id, children, className = '' }: {
  tone?: Tone; id?: string; children: ReactNode; className?: string;
}) {
  return (
    <section id={id} className={`py-20 lg:py-28 ${TONES[tone]} ${className}`}>
      <Container>{children}</Container>
    </section>
  );
}

/** Fades content up once when it scrolls into view; off for reduced motion. */
export function Reveal({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  const rm = useReducedMotion();
  if (rm) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.8, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHead({ eyebrow, title, lead, center = false, className = '' }: {
  eyebrow?: string; title: ReactNode; lead?: ReactNode; center?: boolean; className?: string;
}) {
  return (
    <Reveal className={`mb-12 lg:mb-16 ${center ? 'text-center mx-auto' : ''} max-w-3xl ${className}`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2>{title}</h2>
      {lead && <p className={`mt-5 text-[#555] [.on-dark_&]:text-[#EAE3D2]/80 ${center ? 'mx-auto' : ''} max-w-2xl`}>{lead}</p>}
    </Reveal>
  );
}

/** Page banner: a HiLink photo under a charcoal wash, or plain charcoal. */
export function PageHero({ eyebrow, title, lead, photo, children, tall = false }: {
  eyebrow?: string; title: ReactNode; lead?: ReactNode; photo?: string; children?: ReactNode; tall?: boolean;
}) {
  const rm = useReducedMotion();
  return (
    <section className={`relative flex items-end bg-[#0F0F0F] text-white overflow-hidden on-dark ${tall ? 'min-h-[88vh]' : 'min-h-[62vh]'}`}>
      {photo && (
        <>
          <img src={photo} alt="" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F]/85 via-[#0F0F0F]/30 to-[#0F0F0F]/10" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F0F0F]/60 via-[#0F0F0F]/20 to-transparent" />
        </>
      )}
      <Container className="relative w-full pt-36 pb-16 lg:pb-24">
        <motion.div
          className="max-w-4xl"
          initial={rm ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE }}
        >
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          <h1>{title}</h1>
          {lead && <p className="mt-6 text-[1.0625rem] text-[#EAE3D2]/90 max-w-2xl">{lead}</p>}
          {children && <div className="mt-10 flex flex-col sm:flex-row gap-4">{children}</div>}
        </motion.div>
      </Container>
    </section>
  );
}

const BTN = {
  gold: 'bg-[#A88F5C] text-white hover:bg-[#EAE3D2] hover:text-[#0F0F0F]',
  dark: 'bg-[#0F0F0F] text-white hover:bg-[#A88F5C]',
  light: 'border border-white/40 text-white hover:bg-white hover:text-[#0F0F0F]',
  line: 'border border-[#0F0F0F]/25 text-[#0F0F0F] hover:bg-[#0F0F0F] hover:text-white',
};
const btnClass = (v: keyof typeof BTN) =>
  `group inline-flex items-center justify-center gap-2 px-8 py-4 text-[11px] font-medium uppercase tracking-[0.16em] transition-colors ${BTN[v]}`;

/** A button-styled link. `href` = external (new tab), `to` = internal route. */
export function Button({ to, href, variant = 'gold', children }: {
  to?: string; href?: string; variant?: keyof typeof BTN; children: ReactNode;
}) {
  if (href) {
    const external = /^https?:/.test(href);
    return (
      <a href={href} className={btnClass(variant)} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
        {children}
        {external && <ArrowUpRight size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />}
      </a>
    );
  }
  return (
    <Link to={to!} className={btnClass(variant)}>
      {children}
      <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
    </Link>
  );
}

/** Underlined text link with an arrow. */
export function TextLink({ to, href, children }: { to?: string; href?: string; children: ReactNode }) {
  const cls = 'group inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em] border-b border-current/30 pb-1 hover:text-[#A88F5C] transition-colors';
  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children} <ArrowUpRight size={13} />
      </a>
    );
  }
  return (
    <Link to={to!} className={cls}>
      {children} <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
    </Link>
  );
}

/** Photo card: one ratio for every card on the site (4:3). */
export function PhotoCard({ photo, alt, eyebrow, title, text, to, href, cta }: {
  photo: string; alt?: string; eyebrow?: string; title: string; text?: string; to?: string; href?: string; cta?: string;
}) {
  const body = (
    <>
      <div className="relative aspect-[4/3] overflow-hidden bg-[#EAE3D2]">
        <img src={photo} alt={alt ?? title} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
      </div>
      <div className="pt-6">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h3 className="mb-3 group-hover:text-[#7A653B] [.on-dark_&]:group-hover:text-[#D8BE86] transition-colors">{title}</h3>
        {text && <p className="text-[#555] [.on-dark_&]:text-[#EAE3D2]/75">{text}</p>}
        {cta && (
          <span className="mt-5 inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em]">
            {cta} {href ? <ArrowUpRight size={13} /> : <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />}
          </span>
        )}
      </div>
    </>
  );
  if (href) return <a href={href} target="_blank" rel="noopener noreferrer" className="group block">{body}</a>;
  if (to) return <Link to={to} className="group block">{body}</Link>;
  return <div className="group">{body}</div>;
}

/** Closing call to action on a photo. */
export function CtaBand({ title, lead, photo, children }: { title: string; lead?: string; photo?: string; children: ReactNode }) {
  return (
    <section className="relative py-24 lg:py-32 bg-[#0F0F0F] text-white overflow-hidden on-dark">
      {photo && <img src={photo} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover opacity-25" />}
      <Container className="relative text-center">
        <Reveal>
          <h2 className="mb-6">{title}</h2>
          {lead && <p className="text-[#EAE3D2]/90 max-w-2xl mx-auto mb-10">{lead}</p>}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">{children}</div>
        </Reveal>
      </Container>
    </section>
  );
}

/** Numbered list of steps in a row. */
export function Steps({ items }: { items: { t: string; d: string }[] }) {
  return (
    <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#0F0F0F]/10 [.on-dark_&]:bg-white/10">
      {items.map((s, i) => (
        <li key={s.t} className="bg-[#F8F6F1] [.on-dark_&]:bg-[#0F0F0F] p-8 lg:p-10">
          <span className="block text-[11px] font-semibold tracking-[0.16em] text-[#7A653B] [.on-dark_&]:text-[#D8BE86] mb-6">
            {String(i + 1).padStart(2, '0')}
          </span>
          <h3 className="mb-3">{s.t}</h3>
          <p className="text-[#555] [.on-dark_&]:text-[#EAE3D2]/75">{s.d}</p>
        </li>
      ))}
    </ol>
  );
}
