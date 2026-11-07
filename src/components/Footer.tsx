import React from 'react';
import { Twitter, Instagram, Github, Linkedin, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative pt-20 pb-12 bg-[#050407] border-t border-white/[0.06] overflow-hidden font-['Space_Grotesk'] select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Grid: Brand Statement & Nav Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16 border-b border-white/[0.06]">
          
          {/* Brand & Socials Column (Spans 2 cols on lg) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Social Icons with subtle hover lift micro-interaction */}
            <div className="flex items-center gap-3">
              {[
                { href: 'https://twitter.com', label: 'X (Twitter)', Icon: Twitter },
                { href: 'https://instagram.com', label: 'Instagram', Icon: Instagram },
                { href: 'https://github.com', label: 'GitHub', Icon: Github },
                { href: 'https://linkedin.com', label: 'LinkedIn', Icon: Linkedin },
              ].map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-full bg-white/[0.04] hover:bg-purple-600/30 border border-white/[0.08] hover:border-purple-400/50 flex items-center justify-center text-slate-300 hover:text-white hover:-translate-y-1 hover:shadow-[0_4px_15px_rgba(168,85,247,0.3)] transition-all duration-200"
                  aria-label={label}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>

            {/* Brand Motto */}
            <div className="space-y-1">
              <p className="text-base font-bold text-white tracking-wide uppercase">
                Think bold. Engineer for impact.
              </p>
              <p className="text-xs sm:text-sm text-slate-400">
                Digital flagship experiences built for conversion — always bespoke, zero templates.
              </p>
            </div>
          </div>

          {/* Column 1: Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest font-bold text-white">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-400">
              <li><a href="#philosophy" className="inline-block hover:text-white hover:translate-x-1 transition-all duration-200">Philosophy</a></li>
              <li><a href="#showcase" className="inline-block hover:text-white hover:translate-x-1 transition-all duration-200">Showcase Demo</a></li>
              <li><a href="#faq" className="inline-block hover:text-white hover:translate-x-1 transition-all duration-200">FAQ</a></li>
            </ul>
          </div>

          {/* Column 2: Capabilities */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest font-bold text-white">
              Disciplines
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-400">
              <li><a href="#showcase" className="inline-block hover:text-white hover:translate-x-1 transition-all duration-200">Interactive 3D WebGL</a></li>
              <li><a href="#showcase" className="inline-block hover:text-white hover:translate-x-1 transition-all duration-200">Technical SEO Architecture</a></li>
              <li><a href="#showcase" className="inline-block hover:text-white hover:translate-x-1 transition-all duration-200">Lead & CRM Automations</a></li>
              <li><a href="#showcase" className="inline-block hover:text-white hover:translate-x-1 transition-all duration-200">Bespoke Design Tokens</a></li>
              <li><a href="#showcase" className="inline-block hover:text-white hover:translate-x-1 transition-all duration-200">High-Conversion Funnels</a></li>
            </ul>
          </div>

          {/* Column 3: Legal & Support */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest font-bold text-white">
              Direct Access
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-400">
              <li><a href="https://nova-neon-ten.vercel.app/" target="_blank" rel="noopener noreferrer" className="inline-block hover:text-white hover:translate-x-1 transition-all duration-200">Nova Live Template ↗</a></li>
              <li><a href="#faq" className="inline-block hover:text-white hover:translate-x-1 transition-all duration-200">Maintenance Scope</a></li>
              <li><a href="#faq" className="inline-block hover:text-white hover:translate-x-1 transition-all duration-200">Client Support SLA</a></li>
              <li><a href="#top" className="inline-block hover:text-white hover:translate-x-1 transition-all duration-200">Start A Project</a></li>
            </ul>
          </div>

        </div>

        {/* Back to Top & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>
            © {new Date().getFullYear()} VANTIQ. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <a href="#faq" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
            <a href="#faq" className="hover:text-slate-300 transition-colors">Terms of Service</a>
            <button
              onClick={scrollToTop}
              className="group/top flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5 transition-transform duration-200 group-hover/top:-translate-y-0.5" />
            </button>
          </div>
        </div>

        {/* Massive Giant Wordmark */}
        <div className="pt-16 pb-4 select-none overflow-hidden text-center opacity-[0.14] hover:opacity-25 transition-opacity duration-500">
          <span className="text-[15vw] sm:text-[18vw] lg:text-[20vw] font-black tracking-tighter text-white leading-none block uppercase">
            VANTIQ
          </span>
        </div>

      </div>
    </footer>
  );
};
