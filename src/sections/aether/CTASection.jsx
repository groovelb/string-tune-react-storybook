import React from 'react';
import { Spotlight, Impulse, SplitText } from '../../components/string-tune';

export const CTASection = () => {
  return (
    <section className="brutalist-section cta-section" style={{ padding: '0', borderBottom: 'none', overflow: 'hidden', position: 'relative', zIndex: 20 }}>
      <Spotlight>
        <div className="cta-content">
          {/* Spotlight glow - uses spotlight-distance for intensity */}
          <div className="cta-bg-glow" style={{
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(
              circle at 50% 50%,
              rgba(0, 0, 255, calc(0.2 - var(--spotlight-distance, 1000) / 5000)) 0%,
              transparent 70%
            )`,
            pointerEvents: 'none',
            zIndex: 0
          }} />
          
          <div className="brutalist-container" style={{ padding: '20vh 40px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', position: 'relative', zIndex: 1 }}>
            <div data-string="parallax" data-string-parallax="-0.1">
              <SplitText 
                as="h2" 
                split="word"
                className="brutalist-heading cta-title" 
                style={{ color: 'var(--aether-white)', mixBlendMode: 'difference' }}
              >
                INITIALIZE CONTACT
              </SplitText>
            </div>
            
            <p className="brutalist-text" style={{ 
              color: 'var(--aether-white)', 
              mixBlendMode: 'difference', 
              marginTop: '3rem', 
              marginBottom: '5rem', 
              fontSize: '1.5rem',
              maxWidth: '40ch',
              transform: 'translateY(calc((var(--spotlight-distance, 0) / 1000) * 20px))'
            }}>
              The future is on-chain. Are you ready to architect the narrative? 
              Connect with Aether to catalyze your digital evolution.
            </p>

            <Impulse>
              <button className="aether-btn massive-btn">
                ESTABLISH CONNECTION
              </button>
            </Impulse>
          </div>
        </div>
      </Spotlight>

      <style jsx>{`
        .cta-content {
          background-color: var(--aether-black);
          width: 100%;
          min-height: 90vh;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .massive-btn {
          font-size: clamp(1.5rem, 3vw, 2.5rem);
          padding: 40px 80px;
          background-color: var(--aether-white);
          color: var(--aether-black);
          border: 4px solid var(--aether-blue);
          position: relative;
          overflow: hidden;
        }

        .massive-btn:hover {
          background-color: var(--aether-blue);
          color: var(--aether-white);
          box-shadow: 20px 20px 0 var(--aether-black);
          transform: translate(-10px, -10px);
        }

        :global(.cta-title .-s-word) {
          transition: transform 1s cubic-bezier(0.23, 1, 0.32, 1);
        }

        :global(.-inview) .cta-title .-s-word {
          transform: scale(calc(1 + (1000 - var(--spotlight-distance, 1000)) / 2000));
        }
      `}</style>
    </section>
  );
};
