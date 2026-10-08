import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

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
  background = 'beige',
}: {
  items: FAQItem[];
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  background?: 'beige' | 'white';
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const bg = background === 'white' ? 'bg-white' : 'bg-[#F0EDE6]';

  return (
    <section className={`py-20 lg:py-28 ${bg}`}>
      <div className="max-w-[1000px] mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="mb-6">{title}</h2>
          {subtitle && <p className="text-[#555] max-w-2xl mx-auto">{subtitle}</p>}
        </div>

        <div className="divide-y divide-[#0F0F0F]/10 border-t border-b border-[#0F0F0F]/10">
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
                    className={`serif text-[var(--step-h3)] transition-colors ${
                      isOpen ? 'text-[#7A653B]' : 'text-[#0F0F0F] group-hover:text-[#7A653B]'
                    }`}
                  >
                    {item.question}
                  </span>
                  <span className="shrink-0 text-[#A88F5C]">
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
                      <p className="pb-7 text-[#555] max-w-3xl">
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
