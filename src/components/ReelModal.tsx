import React, { useState, useEffect, useRef } from 'react';
import { X, Play, Pause, Volume2, VolumeX, Maximize2, Sparkles } from 'lucide-react';

interface ReelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReelModal: React.FC<ReelModalProps> = ({ isOpen, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(32);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Audio frequency wave animation simulator
  useEffect(() => {
    if (!isOpen) return;

    let animationFrameId: number;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let step = 0;
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const width = canvas.width;
      const height = canvas.height;
      const centerY = height / 2;

      // Draw futuristic sound wave lines
      for (let j = 0; j < 3; j++) {
        ctx.beginPath();
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = j === 0 ? '#c084fc' : j === 1 ? '#a855f7' : '#9333ea';
        
        for (let x = 0; x < width; x += 3) {
          const freq = (x * 0.02) + (step * 0.05) + (j * 0.8);
          const amp = isPlaying ? (Math.sin(freq) * 22 * Math.sin(x / width * Math.PI)) : 2;
          const y = centerY + amp;
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      }

      step += 1;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isOpen, isPlaying]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl rounded-2xl bg-[#0f0d19] border border-white/[0.1] shadow-2xl overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.08] bg-[#141122]">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-purple-500 animate-pulse" />
            <span className="text-xs uppercase tracking-widest font-bold text-white">
              Vantix Studios 4K Showcase Reel
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

        {/* Video Canvas Stage */}
        <div className="relative aspect-video w-full bg-black overflow-hidden flex items-center justify-center">
          {/* Background image & gradient */}
          <img
            src="/src/assets/images/studio_hardware_core_1793966790442.jpg"
            alt="Studio Showcase"
            className="w-full h-full object-cover opacity-60"
            referrerPolicy="no-referrer"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/40" />

          {/* Central Logo Overlay */}
          <div className="absolute flex flex-col items-center justify-center text-center p-6 pointer-events-none">
            <div className="w-24 h-24 rounded-full overflow-hidden border border-purple-400/40 shadow-2xl shadow-purple-600/50 mb-4 animate-pulse">
              <img
                src="/assets/aistudio/Vantiq_Studios__Futuristic_Glass_Orb_Logo_b172690e.png"
                alt="Orb Logo"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white uppercase">
              The Architecture of Tomorrow
            </h3>
            <p className="text-xs text-purple-300 tracking-widest uppercase mt-1">
              Recorded Live in Vantix Spatial Engine
            </p>
          </div>

          {/* Audio Wave Visualizer Overlay */}
          <canvas
            ref={canvasRef}
            width={600}
            height={80}
            className="absolute bottom-16 left-1/2 -translate-x-1/2 w-3/4 max-w-lg h-14 pointer-events-none opacity-80"
          />

          {/* Big Center Play Trigger (if paused) */}
          {!isPlaying && (
            <button
              onClick={() => setIsPlaying(true)}
              className="absolute w-16 h-16 rounded-full bg-purple-600/90 text-white flex items-center justify-center hover:scale-110 transition-transform cursor-pointer shadow-lg shadow-purple-900"
            >
              <Play className="w-6 h-6 fill-white ml-1" />
            </button>
          )}
        </div>

        {/* Player Controls Bar */}
        <div className="p-4 bg-[#120f20] border-t border-white/[0.08] space-y-2">
          {/* Scrubber */}
          <div 
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const clickX = e.clientX - rect.left;
              setProgress(Math.round((clickX / rect.width) * 100));
            }}
            className="relative w-full h-1.5 bg-white/10 hover:h-2 rounded-full cursor-pointer transition-all"
          >
            <div 
              className="h-full bg-gradient-to-r from-purple-500 to-violet-400 rounded-full" 
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="hover:text-white transition-colors cursor-pointer"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="hover:text-white transition-colors cursor-pointer"
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
              <span className="font-mono tabular-nums text-[11px]">
                01:24 / 03:40
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-[11px] font-semibold text-purple-400 uppercase tracking-wider">
                Ultra HD · 60 FPS
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
