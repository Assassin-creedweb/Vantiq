import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

/**
 * Minimal, understated trailing cursor that subtly responds to interactive elements
 * without visual clutter or heavy glow effects.
 */
export const CustomCursor: React.FC = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Crisp, lightweight trailing spring
  const ringX = useSpring(mouseX, { stiffness: 320, damping: 28, mass: 0.25 });
  const ringY = useSpring(mouseY, { stiffness: 320, damping: 28, mass: 0.25 });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(pointer: fine)');
    setIsEnabled(mediaQuery.matches);

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setIsEnabled(e.matches);
    };
    mediaQuery.addEventListener('change', handleMediaChange);

    if (!mediaQuery.matches) {
      return () => mediaQuery.removeEventListener('change', handleMediaChange);
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest(
          'a, button, select, input, textarea, [role="button"], .cursor-pointer'
        );
        setIsHovering(Boolean(interactive));
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      mediaQuery.removeEventListener('change', handleMediaChange);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible, mouseX, mouseY]);

  if (!isEnabled) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[100] overflow-hidden"
      aria-hidden="true"
    >
      {/* Subtle, Minimal Trailing Ring (Gentle 1.25x scale on hover) */}
      <motion.div
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isClicking ? 0.9 : isHovering ? 1.25 : 1,
          opacity: isVisible ? (isHovering ? 0.65 : 0.32) : 0,
        }}
        transition={{
          scale: { type: 'spring', stiffness: 380, damping: 26 },
          opacity: { duration: 0.2 },
        }}
        className={`w-5 h-5 rounded-full border transition-colors duration-200 ${
          isHovering
            ? 'border-purple-300/60 bg-purple-400/[0.06]'
            : 'border-white/30 bg-transparent'
        }`}
      />
    </div>
  );
};
