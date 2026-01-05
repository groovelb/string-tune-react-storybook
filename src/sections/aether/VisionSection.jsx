import React from 'react';
import { RevealOnScroll, SplitText } from '../../components/string-tune';
import './VisionSection.css';

/**
 * VisionSection - Large narrative text with reveal animation.
 */
export const VisionSection = () => {
  return (
    <section className="vision-section">
      <div className="vision-container">
        {/* Section Label */}
        <div className="vision-label">
          <div className="vision-label-line" />
          <span className="vision-label-text">PROPHETIC_INPUT</span>
        </div>

        {/* Text with staggered word reveal */}
        <RevealOnScroll className="vision-content">
          <SplitText as="p" split="word" className="vision-text">
            We envision a digital landscape where narratives are no longer dictated by central authorities, but architected by the collective intelligence of decentralized networks. Aether is the bridge between raw protocol code and human emotion, distilling the complexity of the machine into visceral, immutable brand identities that resonate across the chain.
          </SplitText>
        </RevealOnScroll>
      </div>
    </section>
  );
};
