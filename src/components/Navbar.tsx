import React from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';

interface NavbarProps {
  onOpenContact: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenContact }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navLinks = [
    { href: '#philosophy', label: 'Philosophy' },
    { href: '#showcase', label: 'Showcase' },
    { href: '#faq', label: 'FAQ' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[#08080A]/85 border-b border-white/[0.06] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (VANTIQ with white to purple gradient) */}
        <a 
          href="#top" 
          className="flex items-center gap-3 group shrink-0"
        >
          <span className="text-xl sm:text-2xl font-black tracking-tight bg-gradient-to-r from-white via-slate-100 to-purple-400 bg-clip-text text-transparent group-hover:opacity-90 group-hover:tracking-normal transition-all duration-300">
            VANTIQ
          </span>
        </a>

        {/* Zone 2: Navigation Links with subtle animated underline micro-interaction */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group/nav relative py-1 hover:text-white transition-colors whitespace-nowrap"
            >
              <span>{link.label}</span>
              <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-purple-400 to-fuchsia-400 scale-x-0 group-hover/nav:scale-x-100 origin-left transition-transform duration-300 ease-out rounded-full" />
            </a>
          ))}
        </nav>

        {/* Zone 3: Primary Action with tactile press & glow micro-interaction */}
        <div className="hidden md:flex items-center gap-4 shrink-0">
          <button
            onClick={onOpenContact}
            className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold text-white bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 active:scale-[0.97] border border-purple-400/30 hover:border-purple-400/60 shadow-lg shadow-purple-950/50 hover:shadow-purple-700/30 transition-all duration-200 cursor-pointer whitespace-nowrap"
          >
            <span>Try Now</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-400 hover:text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-white/[0.08] bg-[#0c0a14] px-6 py-6 space-y-4">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base text-slate-300 hover:text-white hover:translate-x-1 transition-all duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="pt-4 border-t border-white/[0.08]">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContact();
              }}
              className="w-full py-3 rounded-lg text-sm font-semibold text-white bg-purple-600 hover:bg-purple-500 active:scale-[0.98] transition-all"
            >
              Try Now — Start Project
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
