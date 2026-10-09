// The site's dropdown, in place of the browser's native <select> menu — the
// same design as the HiLink Workspaces site (FilterSelect there): a white
// panel with a hairline border, a 2px accent rule along the top, a soft
// shadow, Inter rows that warm to stone on hover, and the chosen row in the
// accent colour with a tick. Here the accent is HiLink red, and a dark tone
// serves forms on the wine ground.
//
// It is a listbox: the trigger is a button (aria-haspopup, aria-expanded),
// the options take ↑ ↓ Home End, Enter or Space to choose, Esc or Tab to
// close, and typing a letter jumps to the next option starting with it.
// A hidden input carries the value for forms that read it by name.
import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react';
import { ChevronDown, Check } from 'lucide-react';

export type SelectOption = { value: string; label: string };

type Props = {
  id?: string;
  name?: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  /** Classes for the trigger, so it matches the inputs around it. */
  className?: string;
  tone?: 'light' | 'dark';
  'aria-labelledby'?: string;
};

export function Select({ id, name, value, onChange, options, placeholder, className = '', tone = 'light', ...aria }: Props) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const list = useRef<HTMLUListElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const uid = useId();
  const listId = `${uid}-list`;
  const current = options.find((o) => o.value === value);
  const dark = tone === 'dark';

  useEffect(() => {
    if (!open) return undefined;
    const onDoc = (e: PointerEvent) => { if (!root.current?.contains(e.target as Node)) setOpen(false); };
    document.addEventListener('pointerdown', onDoc);
    return () => document.removeEventListener('pointerdown', onDoc);
  }, [open]);

  // Keep the highlighted option in view.
  useEffect(() => {
    if (open) list.current?.children[active]?.scrollIntoView({ block: 'nearest' });
  }, [open, active]);

  const show = () => {
    setActive(Math.max(0, options.findIndex((o) => o.value === value)));
    setOpen(true);
  };
  const choose = (i: number) => {
    onChange(options[i].value);
    setOpen(false);
    button.current?.focus();
  };
  const onKey = (e: KeyboardEvent) => {
    const last = options.length - 1;
    if (!open) {
      if (['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(e.key)) { e.preventDefault(); show(); }
      return;
    }
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive((a) => Math.min(last, a + 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActive((a) => Math.max(0, a - 1)); }
    else if (e.key === 'Home') { e.preventDefault(); setActive(0); }
    else if (e.key === 'End') { e.preventDefault(); setActive(last); }
    else if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); choose(active); }
    else if (e.key === 'Escape') { e.preventDefault(); setOpen(false); }
    else if (e.key === 'Tab') setOpen(false);
    else if (e.key.length === 1) {
      const k = e.key.toLowerCase();
      const from = (active + 1) % options.length;
      const order = [...options.slice(from), ...options.slice(0, from)];
      const hit = order.findIndex((o) => o.label.toLowerCase().startsWith(k));
      if (hit >= 0) setActive((from + hit) % options.length);
    }
  };

  const panel = dark
    ? 'bg-[#2B1212] border-white/15 shadow-[0_22px_48px_-18px_rgba(0,0,0,0.7)]'
    : 'bg-white border-[#2A2623]/14 shadow-[0_22px_48px_-18px_rgba(15,15,15,0.4)]';

  return (
    <div ref={root} className="relative">
      {name && <input type="hidden" name={name} value={value} />}
      <button
        ref={button}
        id={id}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-activedescendant={open ? `${uid}-${active}` : undefined}
        aria-labelledby={aria['aria-labelledby']}
        onClick={() => (open ? setOpen(false) : show())}
        onKeyDown={onKey}
        className={`flex items-center justify-between gap-3 text-left ${className}`}
      >
        <span className={current ? '' : dark ? 'text-white/50' : 'text-[#6B645D]'}>{current?.label ?? placeholder}</span>
        <ChevronDown size={18} className={`shrink-0 transition-transform duration-200 ${dark ? 'text-[#F2B8A8]' : 'text-[#D12126]'} ${open ? 'rotate-180' : ''}`} />
      </button>
      <ul
        ref={list}
        id={listId}
        role="listbox"
        tabIndex={-1}
        className={`hl-select-menu absolute left-0 right-0 top-[calc(100%+8px)] z-[400] max-h-[min(60vh,420px)] min-w-[220px] overflow-y-auto border border-t-2 border-t-[#D12126] ${panel} ${open ? 'is-open' : ''}`}
        hidden={!open}
      >
        {options.map((o, i) => {
          const selected = o.value === value;
          return (
            <li
              key={o.value}
              id={`${uid}-${i}`}
              role="option"
              aria-selected={selected}
              onPointerEnter={() => setActive(i)}
              onPointerDown={(e) => e.preventDefault()}
              onClick={() => choose(i)}
              className={`flex cursor-pointer items-center justify-between gap-3 px-4 py-[11px] text-[14px] transition-colors ${
                dark
                  ? `${selected ? 'text-[#FF9A8B]' : 'text-white/90'} ${i === active ? 'bg-white/[0.07]' : ''}`
                  : `${selected ? 'text-[#B01B20]' : 'text-[#2A2623]'} ${i === active ? 'bg-[#F4F0EA]' : ''}`
              }`}
            >
              <span>{o.label}</span>
              {selected && <Check size={14} className="shrink-0" />}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
