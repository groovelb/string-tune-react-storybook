import React from 'react';
import { Parallax, SplitText, CursorFollow, ScrollProgress } from '../../components/string-tune';

/**
 * AetherHero - The high-impact opening section for the AETHER agency.
 */
export const HeroSection = () => {
  return (
    <section className="brutalist-section hero-section" style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
      <CursorFollow>
        <div className="hero-bg-overlay" />
      </CursorFollow>

      {/* Background Decorative Elements */}
      <div 
        className="parallax-node"
        data-string="parallax" 
        data-string-parallax="0.3"
        style={{
          position: 'absolute',
          top: '15%',
          left: '10%',
          width: '40vw',
          height: '2px',
          backgroundColor: 'var(--aether-blue)',
          zIndex: -1,
          opacity: 0.2
        }}
      />
      
      <div className="brutalist-container" style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '1200px' }}>
        <SplitText 
          as="h1" 
          split="char" 
          className="brutalist-heading hero-title"
          style={{ marginBottom: '2rem' }}
        >
          AETHER
        </SplitText>
        
        <SplitText
          as="p"
          split="word"
          className="brutalist-subheading hero-subtitle"
          style={{
            color: 'var(--aether-blue)',
            maxWidth: '25ch',
            margin: '0 auto 4rem auto',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '0.2em 0.3em',
            textAlign: 'center'
          }}
        >
          ARCHITECTING DECENTRALIZED NARRATIVES
        </SplitText>

        <div className="hero-message-container" style={{ marginBottom: '5rem', display: 'flex', justifyContent: 'center' }}>
          <ScrollProgress enterVp="center" exitVp="bottom">
            <SplitText 
              as="p" 
              split="word"
              className="brutalist-text hero-message -splitted" 
              style={{ 
                margin: '0 auto',
                maxWidth: '45ch',
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: '0.4em 0.3em'
              }}
            >
              Distilling Web3 complexity into raw visual impact. We build brands for the future of the internet.
            </SplitText>
          </ScrollProgress>
        </div>

        <div 
          data-string="reveal" 
          className="reveal-cta"
          style={{ transitionDelay: '1.2s' }}
        >
          <a href="#portfolio" className="aether-btn">INITIALIZE EXPLORATION</a>
        </div>
      </div>

      <style jsx>{`
        .hero-section {
          background-color: var(--aether-white);
          border-bottom: var(--aether-grid);
          overflow: hidden;
        }

        .hero-bg-overlay {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: radial-gradient(
            circle at calc(var(--x, 50) * 1px) calc(var(--y, 50) * 1px),
            rgba(0, 0, 255, 0.05) 0%,
            transparent 50%
          );
          z-index: 0;
        }
        
        :global(.-s-char), :global(.-s-word) {
          display: inline-block;
          will-change: transform, opacity, clip-path;
        }

        /* Initial reveal for Title (chars) and Subtitle (words) */
        :global(.hero-title .-s-char),
        :global(.hero-subtitle .-s-word) {
          opacity: 0;
          transform: translateY(100%);
          transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);
        }

        :global(.-inview) :global(.hero-title .-s-char),
        :global(.-inview) :global(.hero-subtitle .-s-word) {
          opacity: 1;
          transform: translateY(0);
        }

        /* Stagger chars for title */
        ${Array.from({ length: 10 }).map((_, i) => `
          :global(.-inview) :global(.hero-title .-s-char:nth-child(${i + 1})) {
            transition-delay: ${i * 0.08}s;
          }
        `).join('')}

        /* Stagger words for subtitle */
        ${Array.from({ length: 15 }).map((_, i) => `
          :global(.-inview) :global(.hero-subtitle .-s-word:nth-child(${i + 1})) {
            transition-delay: ${0.4 + i * 0.06}s;
          }
        `).join('')}

        /* TextWithProgress effect for THE MESSAGE (hero-message) */
        :global(.hero-message .-s-word) {
          --word-turn: calc(var(--word-index) / var(--word-global-total));
          --word-step: calc(1 / var(--word-global-total));
          --word-progress: clamp(0, calc((var(--progress) - var(--word-turn)) / var(--word-step)), 1);
          
          transform: translate3d(0, calc(100% - var(--word-progress) * 100%), 0);
          clip-path: inset(-15% 0 calc(115% - var(--word-progress) * 130%) 0);
        }
      `}</style>
    </section>
  );
};
