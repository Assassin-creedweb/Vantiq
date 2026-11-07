import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export const FaqSection: React.FC = () => {
  // Default open index 0 to provide immediate context
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "HOW FAST CAN VANTIQ LAUNCH OUR DIGITAL FLAGSHIP?",
      a: "Most bespoke flagship landing pages are designed, engineered, and live within 2 to 3 weeks. Full multi-page digital ecosystems typically take 3 to 4 weeks with live staging previews and milestone sprint reviews."
    },
    {
      q: "ARE TECHNICAL SEO AND AUTOMATIONS INCLUDED?",
      a: "Technical SEO is fully included in your project scope (Schema.org JSON-LD structured data, OpenGraph social cards, semantic hierarchy, and search indexing). Custom automations (CRM integrations, multi-step webhook workflows, and complex lead routing) are specialized add-ons done exclusively at a separate cost based on your tech stack requirements."
    },
    {
      q: "HOW DOES ONGOING MAINTENANCE WORK?",
      a: "Ongoing maintenance is handled for a small percentage fee. It covers hosting upkeep, continuous security monitoring, and up to 2 or 3 minor content or layout updates per month. Please note: any complete redesign or overhaul of the whole template is strictly out of scope of the maintenance budget and will be scoped and quoted as an independent project."
    },
    {
      q: "DO WE OWN THE SOURCE CODE AND DESIGN ASSETS?",
      a: "100%. Upon final project delivery, you hold complete legal ownership of all Figma source files, bespoke design tokens, custom assets, and production Git repositories. There are zero ongoing licensing fees and zero vendor lock-in."
    },
    {
      q: "WHAT IS THE FIRST STEP TO GET STARTED?",
      a: "Click 'Start a Project' or 'Schedule Discovery Call' below. We will schedule a focused 30-minute discovery session to understand your brand goals, define deliverables, and immediately kick off your design sprint."
    }
  ];

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 md:py-28 relative overflow-hidden bg-[#06050a] font-['Space_Grotesk'] select-none">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[700px] h-[400px] bg-purple-900/15 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Scroll-Reveal Animation */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-white/[0.08]"
        >
          <div className="max-w-xl">
            <span className="text-xs uppercase tracking-[0.25em] text-purple-400 font-bold block mb-2">
              Frequently Asked Questions
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white uppercase leading-[1.05]">
              Got A Question?<br />
              <span className="text-slate-400">We've Got An Answer.</span>
            </h2>
          </div>

          <div className="max-w-md">
            <p className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed">
              Clear, transparent terms regarding our design sprints, technical deliverables, and maintenance scope.
            </p>
          </div>
        </motion.div>

        {/* Accordion List with Staggered Scroll-Reveal & Subtle Hover Micro-Interactions */}
        <div className="divide-y divide-white/[0.08] mt-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="py-6 transition-colors"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full flex items-center justify-between text-left group cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className={`text-base sm:text-lg md:text-xl font-bold tracking-tight uppercase transition-all duration-300 group-hover:translate-x-1.5 ${
                    isOpen ? 'text-white' : 'text-slate-300 group-hover:text-white'
                  }`}>
                    {faq.q}
                  </span>
                  
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300 shrink-0 ml-4 ${
                    isOpen
                      ? 'bg-purple-600/20 border-purple-400/50 text-purple-300 rotate-180'
                      : 'bg-white/[0.02] border-white/[0.08] text-purple-400 group-hover:bg-purple-500/15 group-hover:border-purple-400/40 group-hover:scale-105'
                  }`}>
                    {isOpen ? (
                      <span className="text-xl font-light leading-none">−</span>
                    ) : (
                      <span className="text-xl font-light leading-none">+</span>
                    )}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="mt-4 pr-8 text-xs sm:text-sm md:text-base text-slate-300 font-normal leading-relaxed max-w-3xl">
                        <p>{faq.a}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
