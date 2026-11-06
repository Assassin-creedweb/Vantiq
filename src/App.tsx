/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Navbar } from './components/Navbar.tsx';
import { Hero } from './components/Hero.tsx';
import { Manifesto } from './components/Manifesto.tsx';
import { FeaturePillars } from './components/FeaturePillars.tsx';
import { FaqSection } from './components/FaqSection.tsx';
import { CtaBanner } from './components/CtaBanner.tsx';
import { Footer } from './components/Footer.tsx';
import { SectionTransition } from './components/SectionTransition.tsx';
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
