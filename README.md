# Vantix Studios

> **Digital Experiences. Built for Business.**  
> High-impact intelligent systems, digital architectures, and transformative creative technology.

---

## Overview

**Vantix Studios** is a state-of-the-art creative engineering and digital architecture studio website. Engineered with high-performance modern web standards, it showcases interactive 3D hardware and cybernetic viewports, fluid kinetic typography, bespoke component transitions, and enterprise-grade lead acquisition interfaces.

## Key Features

- **Interactive Cybernetic Stage**: Scroll-driven video scrubbing and responsive 3D interactive viewport featuring modular architectural hotspots.
- **Dynamic Kinetic Typography**: Real-time fluid text animation and manifesto sections utilizing high-framerate spring physics.
- **Enterprise Demo Sandbox & Inquiries**: Interactive pricing configuration, modular technical architecture inspect modal, and project deployment briefs.
- **Audio-Reactive Showreel Modal**: Immersive media showcase with synchronized visualizer and audio playback controls.
- **Dark Aesthetic Design System**: Tailored cyber-industrial theme with neon violet accents, glassmorphic HUD overlays, and responsive mobile optimization.

## Tech Stack

- **Framework**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vite.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Motion & Physics**: [Motion](https://motion.dev/) (Framer Motion)
- **Icons**: [Lucide React](https://lucide.dev/)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18+ or later recommended)
- `npm` or `yarn` / `pnpm`

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Assassin-creedweb/Vantiq.git
   cd Vantiq
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables (optional):
   ```bash
   cp .env.example .env
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### Production Build

To build the project for production deployment:
```bash
npm run build
```

To preview the production build locally:
```bash
npm run preview
```

## Project Structure

```text
├── public/
│   └── assets/
│       └── media/              # High-definition video, 3D renders, and brand marks
├── src/
│   ├── assets/                 # Component images and static visual assets
│   ├── components/             # Modular React UI components
│   │   ├── ArchitectureSection.tsx
│   │   ├── BriefModal.tsx
│   │   ├── ContactModal.tsx
│   │   ├── CtaBanner.tsx
│   │   ├── CustomCursor.tsx
│   │   ├── DemoSandboxModal.tsx
│   │   ├── FaqSection.tsx
│   │   ├── FeaturePillars.tsx
│   │   ├── Footer.tsx
│   │   ├── Hero.tsx
│   │   ├── MagneticButton.tsx
│   │   ├── Manifesto.tsx
│   │   ├── Navbar.tsx
│   │   ├── ReelModal.tsx
│   │   ├── ScrollInteractiveRobot.tsx
│   │   └── SectionTransition.tsx
│   ├── App.tsx                 # Core page composition
│   ├── index.css               # Global styles & keyframe animations
│   └── main.tsx                # Application entrypoint
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## License

Private repository. All rights reserved. &copy; Vantix Studios.
