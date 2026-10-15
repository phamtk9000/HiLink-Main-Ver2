// What a form shows once it has been sent (Contact, Concierge, the rental
// estimate): HiLink's two rings draw themselves and close into a link, a
// check appears where they meet; then the thanks, what happens next as three
// steps (the first done), and the ways on — home, or send another. It stays
// until the visitor moves on. Reduced motion shows it drawn and still.
import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { useLang } from '../lib/i18n';

const T = {
  en: { steps: ['Received', 'Reviewed by our team', 'We get back to you'], home: 'Back to home', again: 'Send another request' },
  vi: { steps: ['Đã nhận', 'Đội ngũ xem xét', 'Chúng tôi liên hệ lại'], home: 'Về trang chủ', again: 'Gửi yêu cầu khác' },
};

export function FormSent({ title, body, onAgain, tone = 'light' }: { title: string; body: string; onAgain?: () => void; tone?: 'light' | 'dark' }) {
  const { lang, l } = useLang();
  const t = T[lang];
  const dark = tone === 'dark';
  const ink = dark ? 'text-[#F8F6F1]' : 'text-[#2A2623]';
  const soft = dark ? 'text-[#F8F6F1]/75' : 'text-[#6B645D]';
  const rule = dark ? 'border-white/20' : 'border-[#2A2623]/15';
  return (
    <div role="status" aria-live="polite" className={`hl-sent ${ink}`}>
      <svg viewBox="0 0 120 64" className="h-16 w-auto" aria-hidden="true" fill="none" strokeLinecap="round">
        <circle className="hl-sent__ring" cx="46" cy="32" r="24" stroke="currentColor" strokeWidth="2" pathLength={1} />
        <circle className="hl-sent__ring hl-sent__ring--2" cx="74" cy="32" r="24" stroke="#D12126" strokeWidth="2" pathLength={1} />
        <path className="hl-sent__tick" d="M53.5 32.5l4.5 4.5 8.5-9" stroke="#D12126" strokeWidth="2.4" strokeLinejoin="round" pathLength={1} />
      </svg>
      <p className="serif hl-sent__in mt-7 text-[2rem] leading-tight lg:text-[2.25rem]">{title}</p>
      <p className={`hl-sent__in mt-3 max-w-[46ch] text-[15.5px] leading-relaxed ${soft}`} style={{ animationDelay: '0.9s' }}>{body}</p>
      <ol className={`hl-sent__in mt-8 grid gap-3 border-t pt-6 sm:grid-cols-3 ${rule}`} style={{ animationDelay: '1.1s' }}>
        {t.steps.map((s, k) => (
          <li key={s} className="flex items-center gap-3 text-[13.5px]">
            <span className={`grid h-6 w-6 shrink-0 place-items-center rounded-full border text-[11px] tabular-nums ${k === 0 ? 'border-[#D12126] bg-[#D12126] text-white' : `${rule} ${soft}`}`}>{k + 1}</span>
            <span className={k === 0 ? '' : soft}>{s}</span>
          </li>
        ))}
      </ol>
      <div className="hl-sent__in mt-9 flex flex-wrap items-center gap-x-8 gap-y-4" style={{ animationDelay: '1.3s' }}>
        <Link to={l('/')} className={`group inline-flex items-center gap-2 px-7 py-3.5 text-[12px] uppercase tracking-[0.18em] transition-colors ${dark ? 'bg-[#F8F6F1] text-[#2A2623] hover:bg-white' : 'bg-[#2A2623] text-white hover:bg-[#D12126]'}`}>
          {t.home} <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
        </Link>
        {onAgain && (
          <button type="button" onClick={onAgain} className={`text-[13px] underline underline-offset-4 transition-colors ${dark ? 'decoration-white/40 hover:text-white' : 'decoration-[#2A2623]/30 hover:text-[#D12126]'}`}>
            {t.again}
          </button>
        )}
      </div>
    </div>
  );
}
