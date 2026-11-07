import React, { useState } from 'react';
import { X, Play, RefreshCw, Cpu, Gauge, Zap, Check } from 'lucide-react';

interface DemoSandboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenContact: () => void;
}

export const DemoSandboxModal: React.FC<DemoSandboxModalProps> = ({
  isOpen,
  onClose,
  onOpenContact,
}) => {
  const [latencyTier, setLatencyTier] = useState<'ultra' | 'edge' | 'global'>('ultra');
  const [renderingFrames, setRenderingFrames] = useState(120);
  const [inferenceMode, setInferenceMode] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl rounded-2xl bg-[#0e0c18] border border-white/[0.1] shadow-2xl overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.08] bg-[#141122]">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            <span className="text-sm font-bold uppercase tracking-wider text-white">
              Vantix Interactive Neural Simulator
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.08] transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sandbox Content */}
        <div className="p-6 sm:p-8 space-y-6">
          <p className="text-sm text-slate-300">
            Experiment with the core parameters powering Vantix Studio’s real-time runtime engine. Experience how sub-millisecond execution impacts digital touchpoints.
          </p>

          {/* Interactive Controls Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            {/* Control 1: Edge Region */}
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08]">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold block mb-3">
                Routing Tier
              </span>
              <div className="space-y-2">
                {(['ultra', 'edge', 'global'] as const).map((tier) => (
                  <button
                    key={tier}
                    onClick={() => setLatencyTier(tier)}
                    className={`w-full py-2 px-3 rounded-lg text-xs font-semibold capitalize text-left flex items-center justify-between cursor-pointer transition-colors ${
                      latencyTier === tier
                        ? 'bg-purple-600/40 text-purple-200 border border-purple-500/50'
                        : 'bg-white/[0.02] text-slate-400 hover:text-white'
                    }`}
                  >
                    <span>{tier === 'ultra' ? 'Ultra Low (< 4ms)' : tier === 'edge' ? 'Regional Edge' : 'Global Mesh'}</span>
                    {latencyTier === tier && <Check className="w-3.5 h-3.5" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Control 2: Refresh Rate */}
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] flex flex-col justify-between">
              <div>
                <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold block mb-2">
                  Target FPS
                </span>
                <span className="text-3xl font-extrabold font-mono text-white tabular-nums">
                  {renderingFrames} FPS
                </span>
              </div>
              <input
                type="range"
                min="30"
                max="144"
                step="30"
                value={renderingFrames}
                onChange={(e) => setRenderingFrames(Number(e.target.value))}
                className="w-full mt-4 accent-purple-500 cursor-pointer"
              />
            </div>

            {/* Control 3: Neural Co-Pilot */}
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] flex flex-col justify-between">
              <div>
                <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold block mb-1">
                  Active Inference
                </span>
                <p className="text-xs text-slate-400">
                  Real-time dynamic adaptive layout rendering
                </p>
              </div>
              <button
                onClick={() => setInferenceMode(!inferenceMode)}
                className={`w-full py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                  inferenceMode
                    ? 'bg-emerald-600/30 text-emerald-300 border border-emerald-500/40'
                    : 'bg-white/[0.06] text-slate-400'
                }`}
              >
                {inferenceMode ? 'Inference: Active' : 'Inference: Paused'}
              </button>
            </div>

          </div>

          {/* Interactive Simulation Window */}
          <div className="relative rounded-xl overflow-hidden border border-white/[0.1] bg-[#07060d] p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full overflow-hidden border border-purple-400/40 shrink-0">
                <img
                  src="/assets/media/vantiq_orb_logo.png"
                  alt="Glass Orb Preview"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-white uppercase">Vantix Runtime Core</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/20 text-purple-300">
                    STATUS: OPERATIONAL
                  </span>
                </div>
                <div className="text-xs text-slate-400 mt-1 flex items-center gap-4">
                  <span>Latency: <strong className="text-emerald-400 font-mono">{latencyTier === 'ultra' ? '2.1ms' : latencyTier === 'edge' ? '8.4ms' : '18.2ms'}</strong></span>
                  <span>Frame Time: <strong className="text-purple-300 font-mono">{(1000 / renderingFrames).toFixed(1)}ms</strong></span>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                onClose();
                onOpenContact();
              }}
              className="px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider text-white bg-purple-600 hover:bg-purple-500 transition-colors whitespace-nowrap cursor-pointer shadow-lg shadow-purple-950"
            >
              Deploy in Production →
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
