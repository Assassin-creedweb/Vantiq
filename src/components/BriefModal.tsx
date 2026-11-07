import React from 'react';
import { X, Check, ArrowRight, Layers, Sparkles } from 'lucide-react';

interface BriefModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenContact: () => void;
}

export const BriefModal: React.FC<BriefModalProps> = ({ isOpen, onClose, onOpenContact }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl rounded-2xl bg-[#0f0d19] border border-white/[0.1] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.08] bg-[#141122]">
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold uppercase tracking-wider text-white">
              Vantix Studios · Executive Brief
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

        {/* Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-sm text-slate-300 leading-relaxed">
          <div>
            <h3 className="text-xl font-bold text-white uppercase tracking-tight mb-2">
              01. The Problem with Generic AI & Slop
            </h3>
            <p>
              In the post-generative era, the digital landscape has become saturated with templated, soulless interfaces. Standard web agencies produce sterile cards, candy-colored pill badges, and fragile prototypes that break under enterprise traffic.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold text-white uppercase tracking-tight mb-2">
              02. The Vantix Architecture
            </h3>
            <p>
              Vantix Studios merges sub-millisecond neural inference with hand-crafted bespoke spatial design. Every interface we engineer is built directly on native WebGL, zero-overhead CSS pipelines, and micro-frontend architectures designed for 100,000+ concurrent business sessions.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-purple-950/30 border border-purple-500/20 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-purple-300 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Core Guarantees</span>
            </div>
            <ul className="space-y-1.5 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-purple-400" />
                <span>Zero bloated dependencies or synthetic pill clutter.</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-purple-400" />
                <span>Under 15ms time-to-interactive on global CDN edge nodes.</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-purple-400" />
                <span>Full proprietary source code ownership for your enterprise.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-white/[0.08] bg-[#120f20] flex items-center justify-between">
          <span className="text-xs text-slate-400">
            Document Version: 2026.4 // Vantix Confidential
          </span>
          <button
            onClick={() => {
              onClose();
              onOpenContact();
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider text-white bg-purple-600 hover:bg-purple-500 transition-colors cursor-pointer"
          >
            <span>Deploy With Us</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
