import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Sparkles } from 'lucide-react';

export const Manifesto: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll through this pinned section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Smooth transition: Starts at black (#08080A), reaches pinkish background (#f5e8fc) and STAYS there (never goes back to black)
  const backgroundColor = useTransform(
    scrollYProgress,
    [0.1, 0.7, 1],
    ['#08080A', '#f5e8fc', '#f5e8fc']
  );

  // Headline text: Starts at pure white (#ffffff), reaches dark purple/black (#120524) and STAYS there
  const textColor = useTransform(
    scrollYProgress,
    [0.1, 0.7, 1],
    ['#ffffff', '#120524', '#120524']
  );

  // Kicker label: From lavender to deep royal purple
  const kickerColor = useTransform(
    scrollYProgress,
    [0.1, 0.7, 1],
    ['#c084fc', '#581c87', '#581c87']
  );

  // Keywords text: From muted slate to rich dark purple
  const keywordsColor = useTransform(
    scrollYProgress,
    [0.1, 0.7, 1],
    ['#94a3b8', '#2e1065', '#2e1065']
  );

  // Separator dot: Smooth color shift
  const dotColor = useTransform(
    scrollYProgress,
    [0.1, 0.7, 1],
    ['#a855f7', '#7e22ce', '#7e22ce']
  );

  const keywords = [
    'Bespoke Visual Identity',
    'Interactive 3D Web Design',
    'High-Conversion Architecture',
  ];

  return (
    <div
      id="philosophy"
      ref={containerRef}
      className="relative w-full h-[180vh] select-none"
    >
      {/* Pinned Viewport Stage - Completely open, ZERO box or card container */}
      <motion.div
        style={{ backgroundColor }}
        className="sticky top-0 h-screen w-full flex items-center justify-center px-4 sm:px-8 md:px-12 overflow-hidden transition-colors font-['Space_Grotesk']"
      >
        {/* Open Typography Layout (No box, no borders, no cards) */}
        <div className="relative max-w-4xl w-full mx-auto text-center flex flex-col items-center justify-center">
          
          {/* Level 1: Refined Kicker with subtle sparkle micro-rotation */}
          <motion.div
            style={{ color: kickerColor }}
            whileHover={{ scale: 1.03 }}
            className="group/kicker inline-flex items-center gap-2 text-xs sm:text-sm uppercase tracking-[0.3em] font-semibold mb-4 sm:mb-6 cursor-default"
          >
            <Sparkles className="w-4 h-4 transition-transform duration-500 group-hover/kicker:rotate-90" />
            <span>The VANTIQ Philosophy</span>
          </motion.div>

          {/* Level 2: Primary Commanding Statement */}
          <motion.h2
            style={{ color: textColor }}
            className="text-2xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold tracking-tight uppercase leading-[1.18] text-balance mb-6 sm:mb-8 transition-colors"
          >
            We craft digital experiences faster, bolder, and built for business
            <span className="font-light mx-2 opacity-50">—</span>
            from bespoke visual craft to enterprise scale.
          </motion.h2>

          {/* Level 3: Unboxed Web Design Profession Keywords with subtle hover lift */}
          <motion.div
            style={{ color: keywordsColor }}
            className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm font-semibold tracking-wider uppercase transition-colors"
          >
            {keywords.map((word, index) => (
              <React.Fragment key={word}>
                <motion.span
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                  className="relative group/kw cursor-default py-0.5"
                >
                  <span>{word}</span>
                  <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-current scale-x-0 group-hover/kw:scale-x-100 origin-center transition-transform duration-300 opacity-50" />
                </motion.span>
                {index < keywords.length - 1 && (
                  <motion.span style={{ color: dotColor }} aria-hidden="true" className="text-sm">
                    ·
                  </motion.span>
                )}
              </React.Fragment>
            ))}
          </motion.div>

        </div>
      </motion.div>
    </div>
  );
};
