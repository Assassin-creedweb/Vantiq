import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';

interface SectionTransitionProps {
  children: React.ReactNode;
  className?: string;
  /**
   * If true, starts fully visible at the top of the page (ideal for the initial Hero section)
   * and smoothly cross-fades out as the user scrolls past it.
   */
  isFirstSection?: boolean;
  /**
   * If true, stays fully opaque at the very bottom of the page (ideal for Footer).
   */
  isLastSection?: boolean;
}

/**
 * Global section wrapper providing a continuous, spring-smoothed opacity cross-fade
 * as the user scrolls or navigates between major page sections.
 * Uses pure opacity interpolation (no CSS transform on the wrapper) so child
 * `position: sticky` stages (such as Navbar and Manifesto) remain 100% intact.
 */
export const SectionTransition: React.FC<SectionTransitionProps> = ({
  children,
  className = '',
  isFirstSection = false,
  isLastSection = false,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Smooth opacity curve across the viewport lifecycle:
  // - Enters viewport: fades from 0.15 -> 1
  // - Center of viewport: stays locked at 1
  // - Exits viewport: cross-fades from 1 -> 0.15
  const rawOpacity = useTransform(
    scrollYProgress,
    isFirstSection
      ? [0, 0.55, 0.88, 1]
      : isLastSection
      ? [0, 0.18, 0.85, 1]
      : [0, 0.16, 0.84, 1],
    isFirstSection
      ? [1, 1, 0.35, 0.12]
      : isLastSection
      ? [0.15, 1, 1, 1]
      : [0.15, 1, 1, 0.15]
  );

  const smoothOpacity = useSpring(rawOpacity, {
    stiffness: 110,
    damping: 26,
    mass: 0.4,
  });

  return (
    <motion.div
      ref={sectionRef}
      style={{ opacity: smoothOpacity }}
      className={`will-change-[opacity] ${className}`}
    >
      {children}
    </motion.div>
  );
};
