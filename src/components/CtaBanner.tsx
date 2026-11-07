import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { ArrowUpRight, Sparkles, PhoneCall, CheckCircle2 } from 'lucide-react';
const laptopImage = '/assets/media/vantiq_deployment_cinematic.png';

interface CtaBannerProps {
  onOpenContact: () => void;
}

export const CtaBanner: React.FC<CtaBannerProps> = ({ onOpenContact }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse tilt physics for 3D perspective interaction
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 120 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-8, 8]);
  const translateZ = useTransform(smoothMouseY, [-0.5, 0.5], [0, 20]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  return (
    <section
      id="deploy"
      className="relative w-full overflow-hidden bg-[#06050a] font-['Space_Grotesk'] select-none pt-20 pb-28 md:pt-28 md:pb-36"
    >
      {/* Ambient background volumetric lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[1000px] h-[550px] bg-gradient-to-b from-purple-900/25 via-violet-800/10 to-transparent rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[600px] h-[350px] bg-purple-600/10 rounded-full blur-[160px] pointer-events-none" />

      {/* Completely unboxed, cinematic stage (no enclosing card box) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Level 1: Commanding Statement & Value Proposition */}
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.28em] text-purple-400 mb-4 px-3.5 py-1.5 rounded-full bg-purple-950/70 border border-purple-500/30">
            <Sparkles className="w-3.5 h-3.5 text-purple-300 animate-pulse" />
            <span>Initiate Deployment</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white uppercase leading-[1.05] text-balance mb-6">
            Ready To Unleash Your Digital Presence?
          </h2>

          <p className="text-base sm:text-lg md:text-xl text-slate-300 font-normal leading-relaxed max-w-2xl text-balance mb-8">
            Turn your static website into a dynamic, revenue-generating sales asset. Engineered with custom 3D spatial dynamics, technical SEO, and conversion architecture.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onOpenContact}
              className="relative group/btn overflow-hidden inline-flex items-center gap-2.5 px-8 py-4 rounded-xl text-xs font-bold uppercase tracking-wider text-white border border-purple-400/50 cursor-pointer shadow-[0_0_30px_rgba(168,85,247,0.45)] hover:shadow-[0_0_45px_rgba(168,85,247,0.75)] transition-all"
            >
              {/* Radiant left-to-right gradient sweep */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-700 via-fuchsia-500 to-indigo-600 animate-sweep opacity-95 group-hover/btn:opacity-100 transition-opacity" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/45 to-transparent animate-shimmer-sweep pointer-events-none" />

              <span className="relative z-10 flex items-center gap-2">
                <span>Start Your Project</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
              </span>
            </button>

            <button
              onClick={onOpenContact}
              className="inline-flex items-center gap-2 px-7 py-4 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-200 bg-white/[0.04] hover:bg-purple-600/20 border border-white/[0.1] hover:border-purple-400/40 transition-all cursor-pointer backdrop-blur-md"
            >
              <PhoneCall className="w-3.5 h-3.5 text-purple-400" />
              <span>Schedule Discovery Call</span>
            </button>
          </div>

          {/* Quick value badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              2–3 Weeks Turnaround
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              100% Code & Figma Ownership
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              Full Technical SEO Included
            </span>
          </div>
        </div>

        {/* Level 2: Photorealistic 3D Perspective Laptop on Industrial Slatted Stage displaying our 1st Violet Screen */}
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={handleMouseLeave}
          className="relative max-w-5xl mx-auto cursor-pointer perspective-[1200px]"
          onClick={onOpenContact}
        >
          {/* Subtle floating physics container */}
          <motion.div
            style={{
              rotateX,
              rotateY,
              translateZ,
              transformStyle: 'preserve-3d',
            }}
            animate={{
              y: isHovered ? -5 : [0, -10, 0],
            }}
            transition={{
              y: {
                duration: 5,
                repeat: Infinity,
                ease: 'easeInOut',
              },
            }}
            className="relative w-full rounded-2xl overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.95)]"
          >
            {/* The 3D MacBook on Industrial Rack showcasing our 1st Violet Hero Screen */}
            <img
              src={laptopImage}
              alt="VANTIQ 1st Violet Hero Screen on MacBook Studio Stage"
              className="w-full h-auto object-cover rounded-2xl transition-transform duration-500 hover:scale-[1.01]"
              referrerPolicy="no-referrer"
            />

            {/* Subtle interactive hover highlight */}
            <div className="absolute inset-0 bg-gradient-to-t from-purple-900/15 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          </motion.div>

        </div>

      </div>
    </section>
  );
};
