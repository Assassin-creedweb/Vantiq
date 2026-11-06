import React, { useState } from 'react';
import { X, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPlan?: string;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose, initialPlan }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    plan: initialPlan || 'LANDING_PAGE',
    timeline: 'Immediate (< 30 days)',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Full name is required';
    if (!formData.email.trim()) {
      errs.email = 'Business email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please provide a valid work email address';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200 font-['Space_Grotesk']">
      <div className="relative w-full max-w-xl rounded-2xl bg-[#0f0d1a] border border-white/[0.1] shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.08] bg-[#131022]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full overflow-hidden border border-purple-400/30">
              <img
                src="/assets/aistudio/Vantiq_Studios__Futuristic_Glass_Orb_Logo_b172690e.png"
                alt="VANTIQ"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <span className="text-sm font-bold tracking-tight text-white uppercase block">
                Initiate VANTIQ Deployment
              </span>
              <span className="text-[11px] text-slate-400 block">
                Direct consultation with our executive design team
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.08] transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body or Success State */}
        <div className="p-6 sm:p-8">
          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-14 h-14 rounded-full bg-purple-600/20 border border-purple-500/40 text-purple-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-white uppercase tracking-tight">
                Deployment Request Received
              </h3>
              <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                Thank you, <span className="text-white font-semibold">{formData.name}</span>. An executive partner from <span className="text-white font-semibold">VANTIQ</span> will contact <span className="text-purple-300 font-mono">{formData.email}</span> within 2 business hours with your customized onboarding packet.
              </p>
              <div className="pt-6">
                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 rounded-lg text-xs font-semibold text-white bg-purple-600 hover:bg-purple-500 transition-colors cursor-pointer"
                >
                  Return to VANTIQ
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Marcus Vance"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white/[0.04] border border-white/[0.1] focus:border-purple-500 text-sm text-white placeholder-slate-500 focus:outline-none transition-colors"
                  />
                  {errors.name && <p className="text-[11px] text-rose-400 mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1.5">
                    Business Email *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="marcus@orbitlabs.io"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white/[0.04] border border-white/[0.1] focus:border-purple-500 text-sm text-white placeholder-slate-500 focus:outline-none transition-colors"
                  />
                  {errors.email && <p className="text-[11px] text-rose-400 mt-1">{errors.email}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1.5">
                    Organization / Company
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Orbit Labs Inc."
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white/[0.04] border border-white/[0.1] focus:border-purple-500 text-sm text-white placeholder-slate-500 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1.5">
                    Project Scope
                  </label>
                  <select
                    value={formData.plan}
                    onChange={(e) => setFormData({ ...formData, plan: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#141220] border border-white/[0.1] focus:border-purple-500 text-sm text-white focus:outline-none transition-colors"
                  >
                    <option value="LANDING_PAGE">High-Conversion Landing Page</option>
                    <option value="MULTI_PAGE_WEBSITE">Custom Multi-Page Website</option>
                    <option value="WEBSITE_AUTOMATIONS">Full-Stack Website + CRM & Workflow Automations</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1.5">
                  Project Brief or Core Objectives
                </label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us about the digital experience you're building..."
                  className="w-full px-3.5 py-2.5 rounded-lg bg-white/[0.04] border border-white/[0.1] focus:border-purple-500 text-sm text-white placeholder-slate-500 focus:outline-none transition-colors resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-between text-xs text-slate-400">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Encrypted & NDA Protected</span>
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-xs font-bold uppercase tracking-wider text-white bg-purple-600 hover:bg-purple-500 transition-colors shadow-lg shadow-purple-950 cursor-pointer"
                >
                  <span>Submit Request</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
