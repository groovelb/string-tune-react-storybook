import React, { useEffect } from 'react';
import { StringTuneProvider } from '../components/string-tune';
import { HeroSection } from '../sections/aether/HeroSection';
import { ValueSection } from '../sections/aether/ValueSection';
import { VisionSection } from '../sections/aether/VisionSection';
import { PortfolioSection } from '../sections/aether/PortfolioSection';
import { CTASection } from '../sections/aether/CTASection';
import { Footer } from '../sections/aether/Footer';
import '../styles/aether.css';

/**
 * AetherLandingPage - The complete landing page for AETHER brand agency.
 * 
 * This page brings together all the Brutalist sections and leverages
 * StringTune for high-performance scroll and cursor interactions.
 */
export const AetherLandingPage = () => {
  useEffect(() => {
    document.body.classList.add('aether-page');
    return () => document.body.classList.remove('aether-page');
  }, []);

  return (
    <StringTuneProvider>
      <div className="aether-landing-wrapper">
        <HeroSection />
        <ValueSection />
        <VisionSection />
        <PortfolioSection />
        <CTASection />
        <Footer />
      </div>
    </StringTuneProvider>
  );
};

export default AetherLandingPage;
