import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Flag } from './Flag';

export interface FAQItem {
  question: string;
  answer: string;
}

// Reusable, brand-styled accordion. Renders its own <section> so pages can drop it in directly.
export function FAQ({
  items,
  eyebrow = 'FAQs',
  title = 'Frequently Asked Questions',
  subtitle,
  background = 'white',
}: {
  items: FAQItem[];
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  background?: 'beige' | 'white';
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const bg = background === 'white' ? 'bg-white' : 'bg-[#F4F0EA]';

  return (
    <section className={`relative py-16 sm:py-24 lg:py-32 ${bg}`}>
      <div className="max-w-[1000px] mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <p className="text-[12px] uppercase tracking-[0.2em] text-[#D12126] mb-4 flex items-center gap-2.5"><Flag /> {eyebrow}</p>
          <h2 className="serif text-4xl lg:text-5xl mb-6">{title}</h2>
          {subtitle && <p className="text-xl text-[#6B645D] max-w-2xl mx-auto">{subtitle}</p>}
        </div>

        <div className="divide-y divide-[#2A2623]/10 border-t border-b border-[#2A2623]/10">
          {items.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={index}>
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between gap-6 py-7 text-left group"
                  aria-expanded={isOpen}
                >
                  <span
                    className={`serif text-xl lg:text-2xl transition-colors ${
                      isOpen ? 'text-[#D12126]' : 'text-[#2A2623] group-hover:text-[#D12126]'
                    }`}
                  >
                    {item.question}
                  </span>
                  <span className="shrink-0 text-[#D12126]">
                    {isOpen ? <Minus size={22} /> : <Plus size={22} />}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <p className="pb-7 text-[16px] text-[#6B645D] leading-relaxed max-w-3xl">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
