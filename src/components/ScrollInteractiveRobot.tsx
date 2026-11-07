import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Sparkles, Cpu, Eye, Zap, ArrowDown, Layers } from 'lucide-react';

export const ScrollInteractiveRobot: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeStage, setActiveStage] = useState<number>(0);
  const [isPlayingAuto, setIsPlayingAuto] = useState(false);
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);

  // Web Audio Synthesizer for cybernetic sound effects
  const playCyberChime = (freq: number, type: OscillatorType = 'sine', duration = 0.25) => {
    if (!isAudioEnabled) return;
    try {
      const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, ctx.currentTime + duration);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // AudioContext not allowed before user interaction
    }
  };

  // Scroll listener to drive video playback progress
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || isPlayingAuto) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate how far the container has scrolled through viewport
      const totalScrollable = rect.height - windowHeight;
      if (totalScrollable <= 0) return;

      const scrolled = -rect.top;
      const progress = Math.min(Math.max(scrolled / totalScrollable, 0), 1);
      setScrollProgress(progress);

      // Determine active stage
      let stage = 0;
      if (progress > 0.66) stage = 2;
      else if (progress > 0.33) stage = 1;
      
      if (stage !== activeStage) {
        setActiveStage(stage);
        playCyberChime(stage === 2 ? 880 : stage === 1 ? 580 : 380, 'sine', 0.2);
      }

      // Sync video currentTime to scroll progress
      if (videoRef.current && videoRef.current.duration) {
        const targetTime = progress * videoRef.current.duration;
        // Avoid micro-jitter
        if (Math.abs(videoRef.current.currentTime - targetTime) > 0.08) {
          videoRef.current.currentTime = targetTime;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isPlayingAuto, activeStage, isAudioEnabled]);

  // Jump to specific phase
  const jumpToPhase = (phaseIndex: number) => {
    setActiveStage(phaseIndex);
    const targetProgress = phaseIndex === 0 ? 0.05 : phaseIndex === 1 ? 0.5 : 0.95;
    setScrollProgress(targetProgress);
    if (videoRef.current && videoRef.current.duration) {
      videoRef.current.currentTime = targetProgress * videoRef.current.duration;
    }
    playCyberChime(phaseIndex === 2 ? 880 : phaseIndex === 1 ? 580 : 380, 'sine', 0.25);
  };

  // Toggle Auto Playback mode
  const toggleAutoPlay = () => {
    if (!videoRef.current) return;
    if (isPlayingAuto) {
      videoRef.current.pause();
      setIsPlayingAuto(false);
    } else {
      videoRef.current.play().catch(() => {});
      setIsPlayingAuto(true);
    }
  };

  // Hotspot definitions
  const hotspots = [
    {
      id: 0,
      title: "Neural Visor Optic",
      subtitle: "Dynamic Lighting & Spatial Depth",
      detail: "Adaptive glass refraction and real-time reflection shaders computed client-side in WebGL.",
      top: "28%",
      left: "48%",
    },
    {
      id: 1,
      title: "Violet Temple Emitters",
      subtitle: "Micro-Interaction Engine",
      detail: "Sub-millisecond reactive states triggered on pointer proximity and scroll velocity.",
      top: "35%",
      left: "34%",
    },
    {
      id: 2,
      title: "Obsidian Ceramic Chassis",
      subtitle: "Zero-Bloat CSS Architecture",
      detail: "Streamlined atomic styling with sub-15ms initial paint and perfect Lighthouse performance scores.",
      top: "62%",
      left: "62%",
    },
  ];

  const stages = [
    {
      label: "Phase 01 // Ignition",
      title: "The Architecture of Tomorrow",
      tagline: "Bespoke digital foundations engineered from the dark canvas up.",
      specs: ["Zero-bloat micro-codebase", "Sub-15ms Time to Interactive", "Custom typography rhythm"],
    },
    {
      label: "Phase 02 // Illumination",
      title: "Fluid Motion & Spatial Web",
      tagline: "Cinematic interactive depth that commands user attention.",
      specs: ["Hardware-accelerated WebGL shaders", "Dynamic viewport physics", "Zero frame-rate drops at 120 FPS"],
    },
    {
      label: "Phase 03 // Full Power",
      title: "Commercial Conversion Core",
      tagline: "High-voltage design crafted to turn curious visitors into buyers.",
      specs: ["Ruthless visual hierarchy", "Frictionless checkout paths", "Automated enterprise edge scaling"],
    },
  ];

  return (
    <section ref={containerRef} className="relative bg-black min-h-[220vh] text-white">
      
      {/* Sticky Viewport Stage */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between p-4 sm:p-8">
        
        {/* Background Ambient Glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-900/15 rounded-full blur-[160px] pointer-events-none" />

        {/* Top HUD Bar */}
        <div className="relative z-30 max-w-7xl mx-auto w-full flex items-center justify-between border-b border-white/[0.08] pb-4">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />
            <span className="text-xs font-mono uppercase tracking-widest text-purple-300">
              Interactive Hardware Timeline
            </span>
            <span className="hidden sm:inline-block text-xs font-mono text-slate-500">
              // Scroll to advance boot sequence
            </span>
          </div>

          {/* Interactive Player Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsAudioEnabled(!isAudioEnabled)}
              className="p-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.1] text-slate-400 hover:text-white transition-colors cursor-pointer"
              title={isAudioEnabled ? "Mute audio synthesis" : "Enable cybernetic SFX"}
            >
              {isAudioEnabled ? <Volume2 className="w-4 h-4 text-purple-400" /> : <VolumeX className="w-4 h-4" />}
            </button>
            <button
              onClick={toggleAutoPlay}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold bg-purple-600/30 hover:bg-purple-600/50 border border-purple-500/40 text-purple-200 transition-colors cursor-pointer"
            >
              {isPlayingAuto ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isPlayingAuto ? 'Pause Orbit' : 'Play Sequence'}</span>
            </button>
          </div>
        </div>

        {/* Center Interactive Core: Video + Hotspots + Scrollytelling Wings */}
        <div className="relative z-20 flex-1 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          {/* Left Wing: Scrollytelling Chapter Specs */}
          <div className="lg:col-span-4 space-y-4 text-left order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-400/30 text-purple-300 text-xs font-mono">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>{stages[activeStage].label}</span>
            </div>

            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white uppercase leading-tight">
              {stages[activeStage].title}
            </h3>

            <p className="text-sm text-slate-300 leading-relaxed font-normal">
              {stages[activeStage].tagline}
            </p>

            <div className="space-y-2 pt-2">
              {stages[activeStage].specs.map((spec, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                  <span>{spec}</span>
                </div>
              ))}
            </div>

            {/* Quick Phase Jump Tabs */}
            <div className="pt-4 flex items-center gap-2">
              {[0, 1, 2].map((idx) => (
                <button
                  key={idx}
                  onClick={() => jumpToPhase(idx)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                    activeStage === idx
                      ? 'bg-purple-600 text-white shadow-md shadow-purple-950 font-bold'
                      : 'bg-white/[0.04] text-slate-400 hover:text-white'
                  }`}
                >
                  0{idx + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Center Column: The Cybernetic Android Video Asset with Interactive Hotspots */}
          <div className="lg:col-span-8 relative flex items-center justify-center order-1 lg:order-2 h-full max-h-[520px] sm:max-h-[600px]">
            
            <div className="relative w-full max-w-[460px] sm:max-w-[540px] aspect-video sm:aspect-square flex items-center justify-center">
              
              {/* Video Element (Scrubbed by scroll position or auto-playing) */}
              <video
                ref={videoRef}
                src="/assets/media/vantiq_interactive_preview.mp4"
                playsInline
                muted
                loop
                className="w-full h-full object-contain pointer-events-auto rounded-2xl"
                onTimeUpdate={() => {
                  if (isPlayingAuto && videoRef.current && videoRef.current.duration) {
                    const p = videoRef.current.currentTime / videoRef.current.duration;
                    setScrollProgress(p);
                    if (p > 0.66) setActiveStage(2);
                    else if (p > 0.33) setActiveStage(1);
                    else setActiveStage(0);
                  }
                }}
              />

              {/* Edge Gradient Blend (Seamless integration with pure black background) */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30 pointer-events-none rounded-2xl" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50 pointer-events-none rounded-2xl" />

              {/* Clickable Holographic Hotspots */}
              {hotspots.map((spot) => (
                <div
                  key={spot.id}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-30"
                  style={{ top: spot.top, left: spot.left }}
                >
                  <button
                    onClick={() => {
                      setActiveHotspot(activeHotspot === spot.id ? null : spot.id);
                      playCyberChime(700 + spot.id * 150, 'triangle', 0.15);
                    }}
                    className="relative group cursor-pointer focus:outline-none"
                    aria-label={spot.title}
                  >
                    <div className="w-5 h-5 rounded-full bg-purple-500/40 border border-purple-400 flex items-center justify-center shadow-[0_0_15px_#a855f7] hover:scale-125 transition-transform">
                      <div className="w-2 h-2 rounded-full bg-white" />
                      <div className="absolute w-8 h-8 rounded-full border border-purple-400/40 animate-ping pointer-events-none" />
                    </div>
                  </button>

                  {/* Hotspot Popover Detail */}
                  {activeHotspot === spot.id && (
                    <div className="absolute left-6 top-0 w-64 p-3 rounded-xl bg-[#141122]/95 border border-purple-500/40 shadow-2xl backdrop-blur-xl z-40 text-left animate-in fade-in duration-150">
                      <div className="text-xs font-bold text-white uppercase tracking-wider mb-0.5">
                        {spot.title}
                      </div>
                      <div className="text-[10px] text-purple-300 font-mono mb-1">
                        {spot.subtitle}
                      </div>
                      <p className="text-[11px] text-slate-300 leading-relaxed">
                        {spot.detail}
                      </p>
                    </div>
                  )}
                </div>
              ))}

            </div>

          </div>

        </div>

        {/* Bottom Scrubber Indicator */}
        <div className="relative z-30 max-w-7xl mx-auto w-full pt-4">
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-2">
            <span>Scroll Timeline Progress</span>
            <span className="text-purple-300 font-bold">{Math.round(scrollProgress * 100)}%</span>
          </div>
          <div className="w-full h-1 bg-white/[0.08] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 via-violet-400 to-amber-400 rounded-full transition-all duration-75"
              style={{ width: `${Math.max(scrollProgress * 100, 3)}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono mt-1">
            <span>00:00 Silhouette</span>
            <span>00:05 Illumination</span>
            <span>00:10 Full Voltage</span>
          </div>
        </div>

      </div>

    </section>
  );
};
