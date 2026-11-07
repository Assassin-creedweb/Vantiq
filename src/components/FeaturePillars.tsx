import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowRight, 
  ExternalLink, 
  ShieldCheck, 
  Sparkles,
  RotateCw
} from 'lucide-react';

interface FeaturePillarsProps {
  onOpenContact: () => void;
}

export const FeaturePillars: React.FC<FeaturePillarsProps> = ({ onOpenContact }) => {
  const templateUrl = 'https://nova-neon-ten.vercel.app/';
  const [iframeKey, setIframeKey] = useState<number>(0);
  const [iframeLoading, setIframeLoading] = useState<boolean>(true);

  const reloadIframe = () => {
    setIframeLoading(true);
    setIframeKey((prev) => prev + 1);
  };

  return (
    <section
      id="showcase"
      className="relative w-full min-h-screen flex flex-col justify-center bg-[#07060b] select-none font-['Space_Grotesk'] px-4 sm:px-6 lg:px-8 py-10 lg:py-14 overflow-hidden"
    >
      {/* Fallback alias anchor */}
      <div id="features" className="absolute -top-20 opacity-0 pointer-events-none" />

      {/* Ambient background glow lighting */}
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-purple-900/20 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 -translate-y-1/2 w-[600px] h-[400px] bg-fuchsia-900/15 rounded-full blur-[150px] pointer-events-none" />

      {/* Content wrapper */}
      <div className="max-w-6xl mx-auto w-full relative z-10 flex flex-col justify-center">
        
        {/* Section Header with Scroll-Reveal Animation */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-3 mb-5 border-b border-white/[0.12]"
        >
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs uppercase tracking-[0.25em] text-purple-400 font-bold block">
                Featured Live Template
              </span>
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-purple-950/80 border border-purple-500/30 text-purple-300 font-bold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Hero Dynamics
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white uppercase leading-none">
              Live Production Showcase.
            </h2>
          </div>

          {/* Quick Launch Button to visit the real URL directly */}
          <div className="flex items-center gap-2 self-start sm:self-end">
            <a
              href={templateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 border border-purple-400/40 shadow-lg shadow-purple-950/60 transition-all cursor-pointer"
            >
              <span>Launch Full Live App</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </motion.div>

        {/* Masterpiece Browser Preview Window - Scroll-Reveal Animation */}
        <motion.div
          initial={{ opacity: 0, y: 36, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.75, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-2xl overflow-hidden border-2 border-purple-500/35 bg-[#0b0817] shadow-[0_20px_60px_rgba(0,0,0,0.9)] mb-6"
        >
          
          {/* Futuristic Browser Chrome Toolbar */}
          <div className="h-10 px-4 bg-[#130e26] border-b border-white/[0.08] flex items-center justify-between gap-3 text-xs text-slate-300">
            {/* Window controls (traffic lights) */}
            <div className="flex items-center gap-2 shrink-0">
              <div className="w-3 h-3 rounded-full bg-rose-500/80" />
              <div className="w-3 h-3 rounded-full bg-amber-500/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <button 
                onClick={reloadIframe}
                title="Reload preview"
                className="ml-2 p-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <RotateCw className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Direct Address Bar linking to the real template URL */}
            <div className="flex-1 max-w-md mx-auto flex items-center justify-center">
              <a
                href={templateUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="Click to visit live URL"
                className="group flex items-center gap-2 px-3.5 py-1 rounded-lg bg-black/50 border border-white/[0.1] hover:border-purple-400/50 text-[11px] sm:text-xs font-mono text-slate-300 hover:text-white transition-all w-full justify-between"
              >
                <div className="flex items-center gap-2 truncate">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="truncate text-purple-200">https://nova-neon-ten.vercel.app/</span>
                </div>
                <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-purple-300 shrink-0 ml-1" />
              </a>
            </div>

            {/* Quick Badge */}
            <div className="hidden sm:flex items-center gap-1.5 text-[11px] font-mono text-slate-400 shrink-0">
              <span className="text-purple-300 font-semibold">Front Page View</span>
            </div>
          </div>

          {/* Iframe Viewport Area: Locked strictly to the front page hero stage */}
          <div className="relative w-full h-[400px] sm:h-[460px] lg:h-[500px] bg-[#05070a] overflow-hidden select-none">
            
            {/* Loading Indicator */}
            {iframeLoading && (
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#07060b] gap-3">
                <div className="w-8 h-8 rounded-full border-2 border-purple-500 border-t-transparent animate-spin" />
                <span className="text-xs font-mono uppercase tracking-widest text-purple-300">
                  Loading front page dynamics...
                </span>
              </div>
            )}

            {/* Embedded Live Iframe with scroll locked to showcase front page hero and its live animations */}
            <div className="w-full h-full overflow-hidden pointer-events-auto">
              <iframe
                key={iframeKey}
                src={templateUrl}
                title="NOVA Performance Club — Front Page Hero Showcase"
                onLoad={() => setIframeLoading(false)}
                className="w-full h-full border-0 bg-[#05070a] pointer-events-auto"
                scrolling="no"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                loading="lazy"
              />
            </div>

            {/* Interactive Overlay linking to full live app */}
            <a
              href={templateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-3 right-3 z-20 group/overlay inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/85 hover:bg-purple-950 backdrop-blur-md border border-purple-500/40 hover:border-purple-400 text-[11px] font-mono text-purple-200 shadow-xl transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-400 group-hover/overlay:animate-spin" />
              <span>Full Experience at nova-neon-ten.vercel.app</span>
              <ExternalLink className="w-3 h-3 text-purple-300" />
            </a>

          </div>

        </motion.div>

        {/* Client-Focused Conversion Prompt with Scroll-Reveal Animation */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-purple-950/70 via-[#19112e] to-purple-950/70 border border-purple-400/35 shadow-xl"
        >
          <div className="text-left">
            <h4 className="text-base sm:text-lg font-extrabold uppercase text-white tracking-tight mb-1">
              Ready to turn your static website into a dynamic sales asset?
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed">
              Ditch generic templates. We build bespoke high-impact digital flagships that command attention and drive real commercial revenue.
            </p>
          </div>

          <button
            onClick={onOpenContact}
            className="w-full sm:w-auto relative group/btn overflow-hidden py-3 px-6 rounded-xl text-xs font-bold uppercase tracking-wider text-white border border-purple-400/50 cursor-pointer shadow-[0_0_25px_rgba(168,85,247,0.45)] hover:shadow-[0_0_40px_rgba(168,85,247,0.7)] transition-all shrink-0"
          >
            {/* Animated radiant gradient background */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-700 via-fuchsia-500 to-indigo-600 animate-sweep opacity-95 group-hover/btn:opacity-100 transition-opacity" />

            {/* Continuous left-to-right luminous beam sweep */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/45 to-transparent animate-shimmer-sweep pointer-events-none" />

            <span className="relative z-10 flex items-center justify-center gap-2">
              <span>Start Your Transformation</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
            </span>
          </button>
        </motion.div>

      </div>
    </section>
  );
};
