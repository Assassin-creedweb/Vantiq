import React, { useState } from 'react';
import { ArrowUpRight, Cpu, Layers, Zap, CheckCircle2 } from 'lucide-react';

interface ArchitectureSectionProps {
  onOpenDemo: () => void;
}

export const ArchitectureSection: React.FC<ArchitectureSectionProps> = ({ onOpenDemo }) => {
  const [activeHotspot, setActiveHotspot] = useState<number | null>(0);

  const hotspots = [
    {
      id: 0,
      title: "Quanta Logic Core",
      desc: "Custom high-throughput compute layer running on dedicated inference silicon with < 2.4ms frame latency.",
      top: "40%",
      left: "48%",
    },
    {
      id: 1,
      title: "Gold Trace Bus",
      desc: "Ultra-low resistance interconnects transferring 128 GB/s real-time digital asset streams without drops.",
      top: "70%",
      left: "30%",
    },
    {
      id: 2,
      title: "Obsidian Heat Spreader",
      desc: "Passive thermodynamic housing designed for sustained 24/7 mission-critical studio deployments.",
      top: "30%",
      left: "75%",
    },
  ];

  return (
    <section id="architecture" className="relative py-20 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column (matches the video copy and layout) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-purple-400">
              <Cpu className="w-4 h-4" />
              <span>System Architecture</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white uppercase leading-[1.1]">
              AI × Humanity: One Future, One Force
            </h2>

            <p className="text-base text-slate-300 leading-relaxed font-normal">
              Power your brand through seamless integration with next-generation digital systems. Build connections that continually adapt, excite, and touch every digital touchpoint — from logic to emotion, from code to culture.
            </p>

            {/* Architecture Highlights */}
            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                <span className="text-sm text-slate-300">
                  Adaptive neural design system synced to live customer behavioral patterns.
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                <span className="text-sm text-slate-300">
                  Zero-latency micro-frontend pipelines ready for multi-region deployment.
                </span>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={onOpenDemo}
                className="group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-lg text-xs font-bold tracking-wider uppercase text-white bg-purple-600 hover:bg-purple-500 transition-colors shadow-lg shadow-purple-900/40 cursor-pointer"
              >
                <span>Explore Demo</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>
          </div>

          {/* Right Column: High-tech Processor Microchip Card (matches the IBM chip card in the video) */}
          <div className="lg:col-span-7 relative">
            <div className="relative rounded-2xl overflow-hidden border border-white/[0.1] bg-[#100e18] shadow-2xl group">
              
              {/* Microchip Image Asset */}
              <div className="relative aspect-video w-full overflow-hidden">
                <img
                  src="/src/assets/images/quantum_neural_processor_1793966790189.jpg"
                  alt="Vantix Quantum Neural Processor Microchip"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                
                {/* Gradient scrim for edge blend */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0b14] via-transparent to-black/20" />
                
                {/* Interactive Hotspots on the chip */}
                {hotspots.map((spot) => (
                  <button
                    key={spot.id}
                    onClick={() => setActiveHotspot(spot.id)}
                    className="absolute -translate-x-1/2 -translate-y-1/2 group/spot cursor-pointer focus:outline-none"
                    style={{ top: spot.top, left: spot.left }}
                    aria-label={spot.title}
                  >
                    <div className="relative flex items-center justify-center">
                      <div className={`w-6 h-6 rounded-full transition-all ${
                        activeHotspot === spot.id 
                          ? 'bg-purple-500 scale-125 shadow-[0_0_20px_#a855f7]' 
                          : 'bg-white/40 hover:bg-purple-400'
                      }`} />
                      <div className="absolute w-3 h-3 rounded-full bg-white" />
                      <div className="absolute w-9 h-9 rounded-full border border-purple-400/60 animate-ping pointer-events-none" />
                    </div>
                  </button>
                ))}
              </div>

              {/* Hotspot details bar below image */}
              <div className="p-5 bg-[#0f0d1a] border-t border-white/[0.08] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs font-semibold text-purple-300">
                    <Zap className="w-3.5 h-3.5 text-amber-400" />
                    <span>{hotspots[activeHotspot ?? 0].title}</span>
                  </div>
                  <p className="text-xs text-slate-300 max-w-xl">
                    {hotspots[activeHotspot ?? 0].desc}
                  </p>
                </div>
                
                <div className="flex items-center gap-1.5 shrink-0">
                  {hotspots.map((spot) => (
                    <button
                      key={spot.id}
                      onClick={() => setActiveHotspot(spot.id)}
                      className={`w-2.5 h-2.5 rounded-full transition-all ${
                        activeHotspot === spot.id ? 'w-6 bg-purple-500' : 'bg-white/20 hover:bg-white/40'
                      }`}
                      aria-label={`Select ${spot.title}`}
                    />
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
