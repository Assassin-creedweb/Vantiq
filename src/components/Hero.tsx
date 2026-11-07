import React from 'react';
import { motion } from 'motion/react';
import { Cpu, Code2, Boxes, Layers, Zap, Orbit, Terminal, Globe, ChevronDown } from 'lucide-react';
import { MagneticButton } from './MagneticButton.tsx';

interface HeroProps {
  onOpenReel?: () => void;
  onOpenBrief?: () => void;
  onOpenContact?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenContact }) => {
  const techStack = [
    { icon: Code2, label: 'TypeScript' },
    { icon: Cpu, label: 'React 19 & Next.js' },
    { icon: Boxes, label: 'Three.js & WebGL' },
    { icon: Layers, label: 'Tailwind CSS' },
    { icon: Zap, label: 'Sub-Millisecond Edge' },
    { icon: Orbit, label: 'Spatial UI Architecture' },
    { icon: Terminal, label: 'Real-Time Shader Pipelines' },
    { icon: Globe, label: 'Global CDN Acceleration' },
  ];

  return (
    <section className="relative overflow-hidden bg-black pt-10 pb-12 md:pt-16 md:pb-16 select-none">
      
      {/* Background radial violet glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[950px] h-[450px] bg-purple-900/20 rounded-full blur-[150px] pointer-events-none" />

      {/* Stage Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative flex flex-col items-center">
        
        {/* Main Headline placed cleanly before (above) the head */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-20 text-center flex flex-col items-center justify-center mb-4 sm:mb-6"
        >
          {/* Line 1: — the future — */}
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[7.75rem] xl:text-[9.5rem] font-extrabold tracking-tight leading-none whitespace-nowrap bg-gradient-to-b from-white via-slate-100 to-slate-300 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(255,255,255,0.3)] font-['Space_Grotesk']">
            — the future —
          </h1>
          
          {/* Line 2: of web design */}
          <p className="text-4xl sm:text-6xl md:text-7xl lg:text-[6.75rem] xl:text-[8.5rem] font-extrabold tracking-tight leading-none whitespace-nowrap mt-2 sm:mt-3 bg-gradient-to-r from-purple-200 via-violet-300 to-purple-400 bg-clip-text text-transparent drop-shadow-[0_0_45px_rgba(168,85,247,0.45)] font-['Space_Grotesk']">
            of web design
          </p>

          {/* Web Design Scope & What We Do */}
          <p className="max-w-2xl text-sm sm:text-base md:text-lg text-slate-300 font-normal leading-relaxed text-balance mt-6 text-center">
            We engineer bespoke digital flagship websites, high-conversion web architectures, and interactive 3D spatial experiences that transform ambitious brands into market leaders.
          </p>

          {/* Interactive Magnetic CTA Button with smooth circular corners */}
          <div className="mt-8 sm:mt-10">
            <MagneticButton onClick={onOpenContact}>
              Start a Project
            </MagneticButton>
          </div>
        </motion.div>

        {/* Center Stage: Low-Opacity VANTIQ Wordmark with Original Classy Cybernetic Figure Overlay */}
        <div className="relative w-full flex items-center justify-center min-h-[380px] sm:min-h-[460px] md:min-h-[500px] mt-2 group/stage">
          
          {/* Giant Low-Opacity VANTIQ Typography Behind Figure */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden">
            <span className="text-[20vw] sm:text-[23vw] md:text-[25vw] lg:text-[22rem] font-black tracking-tight text-white/[0.13] group-hover/stage:text-white/[0.16] transition-colors duration-700 leading-none uppercase font-['Space_Grotesk']">
              VANTIQ
            </span>
          </div>

          {/* Foreground Cybernetic Model: Subtle breathing float micro-interaction */}
          <motion.div
            animate={{ y: [0, -7, 0] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
            className="relative z-10 w-[260px] sm:w-[340px] md:w-[420px] lg:w-[460px] pointer-events-none select-none flex flex-col items-center justify-center"
          >
            
            {/* The original classy helmet model */}
            <img
              src="/assets/media/vantiq_robot_perfect_cutout.png"
              alt="VANTIQ Cybernetic Android Model"
              className="w-full h-auto object-contain drop-shadow-[0_25px_60px_rgba(168,85,247,0.38)] relative z-10"
              referrerPolicy="no-referrer"
            />

            {/* Sleek Matte Black Carbon Finish Shoulders Base extending gently below the neck */}
            <div className="w-[125%] sm:w-[130%] h-14 sm:h-18 -mt-8 sm:-mt-10 relative z-0 flex items-center justify-center">
              <svg
                viewBox="0 0 500 120"
                className="w-full h-full"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="matteCarbon" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#181524" />
                    <stop offset="40%" stopColor="#0e0c16" />
                    <stop offset="100%" stopColor="#000000" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="purpleRim" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#a855f7" stopOpacity="0" />
                    <stop offset="15%" stopColor="#c084fc" stopOpacity="0.7" />
                    <stop offset="50%" stopColor="#a855f7" stopOpacity="0.15" />
                    <stop offset="85%" stopColor="#c084fc" stopOpacity="0.7" />
                    <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {/* Curved matte carbon shoulder silhouette */}
                <path
                  d="M 250,22 C 290,22 360,40 440,75 C 470,88 495,108 500,120 L 0,120 C 5,108 30,88 60,75 C 140,40 210,22 250,22 Z"
                  fill="url(#matteCarbon)"
                />
                {/* Sleek rim highlight matching violet accents */}
                <path
                  d="M 60,75 C 140,40 210,22 250,22 C 290,22 360,40 440,75"
                  stroke="url(#purpleRim)"
                  strokeWidth="1.5"
                />
              </svg>
            </div>

          </motion.div>

        </div>

        {/* Technologies Infinite Marquee Strip: Animating Smoothly Right-to-Left */}
        <div className="w-full mt-10 pt-8 border-t border-white/[0.06] overflow-hidden">
          <span className="text-[11px] font-semibold tracking-widest uppercase text-slate-500 block text-center mb-6">
            Engineered With Next-Gen Web Technologies
          </span>

          {/* Infinite Marquee Track */}
          <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <div className="animate-marquee-infinite flex items-center gap-10 sm:gap-14 py-2">
              {/* Double sequence for seamless infinite loop */}
              {[...techStack, ...techStack].map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={index}
                    className="group/tech flex items-center gap-3 shrink-0 opacity-60 hover:opacity-100 hover:-translate-y-0.5 transition-all duration-200 cursor-default"
                  >
                    <Icon className="w-4 h-4 text-purple-400 group-hover/tech:text-purple-300 group-hover/tech:scale-110 transition-transform shrink-0" />
                    <span className="font-semibold text-xs sm:text-sm tracking-wider text-slate-300 group-hover/tech:text-white transition-colors whitespace-nowrap">
                      {item.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Subtle, High-Tech Animated Mouse-Scroll Indicator at Bottom-Center */}
        <div className="mt-10 flex flex-col items-center justify-center">
          <a
            href="#philosophy"
            aria-label="Scroll to Philosophy section"
            className="group flex flex-col items-center gap-2.5 text-slate-400 hover:text-purple-300 transition-colors cursor-pointer"
          >
            {/* Pulsing Outer Halo + Mouse Capsule */}
            <div className="relative flex items-center justify-center">
              {/* Subtle pulsing ambient ring */}
              <motion.span
                animate={{ scale: [1, 1.35, 1], opacity: [0.35, 0, 0.35] }}
                transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-0 rounded-full border border-purple-400/50 pointer-events-none"
              />

              {/* Mouse Body */}
              <div className="w-6 h-10 rounded-full border border-white/20 group-hover:border-purple-400/70 bg-white/[0.02] group-hover:bg-purple-950/30 backdrop-blur-md flex justify-center pt-2 transition-all duration-300 shadow-[0_0_20px_rgba(168,85,247,0.18)] group-hover:shadow-[0_0_25px_rgba(168,85,247,0.4)]">
                {/* Animated Scroll Wheel Dot */}
                <motion.span
                  animate={{ y: [0, 12, 0], opacity: [1, 0.2, 1] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-1 h-2 rounded-full bg-gradient-to-b from-white to-purple-400 shadow-[0_0_8px_rgba(192,132,252,0.9)]"
                />
              </div>
            </div>

            {/* Micro-Label & Animated Chevron */}
            <div className="flex flex-col items-center gap-0.5">
              <span className="text-[10px] font-mono uppercase tracking-[0.28em] text-slate-500 group-hover:text-purple-300 transition-colors">
                Scroll
              </span>
              <motion.div
                animate={{ y: [0, 3, 0], opacity: [0.4, 0.9, 0.4] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              >
                <ChevronDown className="w-3.5 h-3.5 text-purple-400/80" />
              </motion.div>
            </div>
          </a>
        </div>

      </div>
    </section>
  );
};
