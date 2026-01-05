import React from 'react';
import { RevealOnScroll, Glide, ScrollProgress, SplitText } from '../../components/string-tune';

const VALUE_DATA = [
  {
    id: '01',
    title: 'DECENTRALIZED FIRST',
    description: 'We prioritize sovereign networks and censorship-resistant protocols in every design decision.'
  },
  {
    id: '02',
    title: 'EXPERIMENTAL RAWNESS',
    description: 'Breaking the polished web standards to create visceral, memorable brand experiences.'
  },
  {
    id: '03',
    title: 'GLOBAL SYNCHRONICITY',
    description: 'Operating across time zones to build a borderless digital future.'
  },
  {
    id: '04',
    title: 'QUANTUM STORYTELLING',
    description: 'Narratives that exist in multiple states, adapting to the evolution of on-chain data.'
  }
];

export const ValueSection = () => {
  return (
    <section className="brutalist-section value-section">
      <div className="brutalist-container">
        <ScrollProgress enterVp="top" exitVp="bottom">
          <div className="value-header" style={{ marginBottom: '4rem', display: 'flex', alignItems: 'baseline', gap: '2rem', paddingLeft: '20px' }}>
            <SplitText as="h2" className="brutalist-subheading" style={{ margin: 0 }}>BRAIN CORE</SplitText>
            <div className="progress-bar-container" style={{ flexGrow: 1, height: '2px', backgroundColor: 'rgba(0,0,0,0.1)', position: 'relative' }}>
              <div className="progress-bar" style={{ 
                position: 'absolute', 
                left: 0, 
                top: 0, 
                height: '100%', 
                backgroundColor: 'var(--aether-blue)',
                width: 'calc(var(--progress, 0) * 100%)'
              }} />
            </div>
            <div className="progress-text" style={{ fontFamily: 'var(--font-heading)', fontWeight: 900 }}>
              {/* StringTune will inject --progress which we can't easily display in text without JS, 
                  but we can use it for CSS transformations */}
              CORE_SYNC: <span style={{ color: 'var(--aether-blue)' }}>ACTIVE</span>
            </div>
          </div>
        </ScrollProgress>
        
        <div className="value-grid">
          {VALUE_DATA.map((item, index) => (
            <RevealOnScroll 
              key={item.id} 
              className="value-item"
              repeat={true}
            >
              <div className="value-index-wrapper" style={{ overflow: 'hidden' }}>
                <div className="value-index">{item.id}</div>
              </div>
              <Glide delay={0.2 + index * 0.1}>
                <h3 className="value-title">{item.title}</h3>
                <p className="value-description">{item.description}</p>
              </Glide>
              
              <div className="item-reveal-line" />
            </RevealOnScroll>
          ))}
        </div>
      </div>

      <style jsx>{`
        .value-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          border-top: var(--aether-grid);
          border-left: var(--aether-grid);
        }

        .value-item {
          padding: 80px 60px 80px 80px; /* Increased left padding specifically */
          border-right: var(--aether-grid);
          border-bottom: var(--aether-grid);
          background-color: var(--aether-white);
          position: relative;
          transition: background-color 0.4s cubic-bezier(0.23, 1, 0.32, 1);
        }

        .value-item:hover {
          background-color: var(--aether-blue);
          color: var(--aether-white);
        }

        .value-index {
          font-family: var(--font-heading);
          font-weight: 900;
          font-size: 2rem;
          margin-bottom: 2rem;
          color: var(--aether-blue);
          transform: translateY(100%);
          transition: transform 0.6s cubic-bezier(0.23, 1, 0.32, 1);
        }

        :global(.-inview) .value-index {
          transform: translateY(0);
        }

        .value-item:hover .value-index {
          color: var(--aether-white);
        }

        .value-title {
          font-family: var(--font-heading);
          font-weight: 900;
          font-size: 1.75rem;
          margin-bottom: 1.5rem;
          line-height: 1;
          letter-spacing: -0.02em;
        }

        .value-description {
          font-size: 1.1rem;
          line-height: 1.4;
          opacity: 0.8;
          max-width: 25ch;
        }

        .item-reveal-line {
          position: absolute;
          bottom: 0;
          left: 0;
          height: 4px;
          background-color: var(--aether-blue);
          width: 0;
          transition: width 0.8s cubic-bezier(0.23, 1, 0.32, 1);
        }

        :global(.-inview) .item-reveal-line {
          width: 100%;
        }

        .value-item:hover .item-reveal-line {
          background-color: var(--aether-white);
        }
      `}</style>
    </section>
  );
};
