/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { MessageCircle } from 'lucide-react';
import { Navbar } from './components/Navbar.tsx';
import { Hero } from './components/Hero.tsx';
import { Manifesto } from './components/Manifesto.tsx';
import { FeaturePillars } from './components/FeaturePillars.tsx';
import { FaqSection } from './components/FaqSection.tsx';
import { CtaBanner } from './components/CtaBanner.tsx';
import { Footer } from './components/Footer.tsx';
import { SectionTransition } from './components/SectionTransition.tsx';
import { CustomCursor } from './components/CustomCursor.tsx';
import { ReelModal } from './components/ReelModal.tsx';
import { ContactModal } from './components/ContactModal.tsx';
import { BriefModal } from './components/BriefModal.tsx';
import { DemoSandboxModal } from './components/DemoSandboxModal.tsx';

export default function App() {
  const [isReelOpen, setIsReelOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isBriefOpen, setIsBriefOpen] = useState(false);
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);

  // Smooth global opacity cross-fade when navigating via in-page anchor links
  useEffect(() => {
    let fadeTimeout: number | undefined;

    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest('a');
      if (!target) return;

      const href = target.getAttribute('href');
      if (!href || !href.startsWith('#')) return;

      e.preventDefault();
      setIsNavigating(true);

      if (href === '#top') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const targetElement = document.querySelector(href);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }

      window.clearTimeout(fadeTimeout);
      fadeTimeout = window.setTimeout(() => {
        setIsNavigating(false);
      }, 380);
    };

    document.addEventListener('click', handleAnchorClick);
    return () => {
      document.removeEventListener('click', handleAnchorClick);
      window.clearTimeout(fadeTimeout);
    };
  }, []);

  return (
    <motion.div
      id="top"
      initial={{ opacity: 0 }}
      animate={{ opacity: isNavigating ? 0.45 : 1 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="min-h-screen bg-[#08080A] text-slate-100 flex flex-col selection:bg-purple-600/40 selection:text-white"
    >
      {/* Global Custom Trailing Cursor with Interactive Hover Magnification */}
      <CustomCursor />

      {/* Zone 1 & 2: Hero & Manifesto. The VANTIQ header stays sticky here,
          then naturally leaves with the 2nd page so it does not obscure Page 3 visuals */}
      <div className="relative">
        <Navbar onOpenContact={() => setIsContactOpen(true)} />

        {/* 1st Page: Hero Stage with Scroll Cross-Fade */}
        <SectionTransition isFirstSection>
          <Hero
            onOpenReel={() => setIsReelOpen(true)}
            onOpenBrief={() => setIsBriefOpen(true)}
            onOpenContact={() => setIsContactOpen(true)}
          />
        </SectionTransition>

        {/* 2nd Page: Pinned VANTIQ Philosophy with Scroll-Driven Color Inversion & Cross-Fade */}
        <SectionTransition>
          <Manifesto />
        </SectionTransition>
      </div>

      <main className="flex-1">
        {/* 3rd Page: Featured Live Template (Front Page & Dynamics Showcase) */}
        <SectionTransition>
          <FeaturePillars onOpenContact={() => setIsContactOpen(true)} />
        </SectionTransition>

        {/* 4th Page: Frequently Asked Questions (Web Design Client Focus) */}
        <SectionTransition>
          <FaqSection />
        </SectionTransition>

        {/* 5th Page: Initiate Deployment 3D Stage */}
        <SectionTransition>
          <CtaBanner onOpenContact={() => setIsContactOpen(true)} />
        </SectionTransition>
      </main>

      {/* Giant Futuristic Footer with Iconic Wordmark */}
      <SectionTransition isLastSection>
        <Footer />
      </SectionTransition>

      {/* Floating Direct Inquiry Trigger */}
      <motion.button
        onClick={() => setIsContactOpen(true)}
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.96 }}
        aria-label="Send direct project inquiry"
        className="fixed bottom-6 right-6 z-40 group flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#120e24]/90 hover:bg-[#191332] backdrop-blur-xl border border-purple-400/40 hover:border-purple-300/70 text-white shadow-[0_10px_30px_rgba(0,0,0,0.75)] hover:shadow-[0_0_30px_rgba(168,85,247,0.35)] transition-all cursor-pointer font-['Space_Grotesk']"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-400" />
        </span>
        <MessageCircle className="w-4 h-4 text-purple-300 group-hover:scale-110 transition-transform" />
        <span className="text-xs font-bold tracking-wider uppercase hidden sm:inline">
          Start Inquiry
        </span>
      </motion.button>

      {/* Interactive Experience Modals */}
      <ReelModal
        isOpen={isReelOpen}
        onClose={() => setIsReelOpen(false)}
      />

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />

      <BriefModal
        isOpen={isBriefOpen}
        onClose={() => setIsBriefOpen(false)}
        onOpenContact={() => setIsContactOpen(true)}
      />

      <DemoSandboxModal
        isOpen={isDemoOpen}
        onClose={() => setIsDemoOpen(false)}
        onOpenContact={() => setIsContactOpen(true)}
      />
    </motion.div>
  );
}
