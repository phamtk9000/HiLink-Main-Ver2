// The phone and email, under the button of a page's closing call to action
// ("Ready to start?" and the like) — moved up out of the footer at the
// user's request, so they sit where the visitor decides to get in touch.
import { Mail, Phone } from 'lucide-react';
import { CONTACT } from '../data/site';

export function CtaContact({ align = 'center', className = '' }: { align?: 'center' | 'start'; className?: string }) {
  const item = 'inline-flex items-center gap-2.5 text-white/80 hover:text-white transition-colors';
  return (
    <p className={`flex flex-wrap gap-x-8 gap-y-3 text-[15px] ${align === 'center' ? 'justify-center' : 'justify-start'} ${className}`}>
      <a href={CONTACT.phoneHref} className={`${item} tabular-nums`}><Phone size={16} strokeWidth={1.5} aria-hidden="true" /> {CONTACT.phone}</a>
      <a href={CONTACT.emailHref} className={item}><Mail size={16} strokeWidth={1.5} aria-hidden="true" /> {CONTACT.email}</a>
    </p>
  );
}
