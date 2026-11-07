import React, { useRef, useState } from 'react';
import { ArrowUpRight, Sparkles } from 'lucide-react';

interface MagneticButtonProps {
  onClick?: () => void;
  children?: React.ReactNode;
  className?: string;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  onClick,
  children,
  className = '',
}) => {
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    // Calculate magnetic pull offset (scaled factor)
    const distanceX = (e.clientX - centerX) * 0.35;
    const distanceY = (e.clientY - centerY) * 0.35;
    setPosition({ x: distanceX, y: distanceY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setPosition({ x: 0, y: 0 });
  };

  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full text-sm font-semibold tracking-wide text-white bg-gradient-to-r from-purple-950/70 via-black to-purple-950/70 border border-purple-500/40 hover:border-purple-400 shadow-[0_0_30px_rgba(168,85,247,0.3)] hover:shadow-[0_0_50px_rgba(168,85,247,0.6)] cursor-pointer select-none transition-all duration-200 ease-out backdrop-blur-xl ${className}`}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        transition: isHovered
          ? 'transform 0.1s ease-out, box-shadow 0.2s ease, border-color 0.2s ease'
          : 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease',
      }}
    >
      {/* Outer ambient glow ring */}
      <span className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-purple-500/30 via-violet-500/20 to-purple-500/30 blur-sm opacity-50 group-hover:opacity-100 transition-opacity" />

      {/* Button Content */}
      <span className="relative z-10 flex items-center gap-2.5">
        <Sparkles className="w-4 h-4 text-purple-300 group-hover:rotate-12 transition-transform duration-300" />
        <span className="font-semibold text-sm tracking-wide bg-gradient-to-r from-white via-slate-100 to-purple-200 bg-clip-text text-transparent">
          {children || 'Start a Project'}
        </span>
        <div className="w-6 h-6 rounded-full bg-purple-500/20 border border-purple-400/30 flex items-center justify-center group-hover:bg-purple-500 group-hover:text-black transition-all">
          <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </span>
    </button>
  );
};
