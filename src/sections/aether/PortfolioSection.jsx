import React from 'react';
import { Magnetic, ScrollProgress, Lerp, SplitText } from '../../components/string-tune';

const PROJECTS = [
  {
    id: 1,
    title: 'NEBULOUS PROTOCOL',
    category: 'BRAND IDENTITY',
    image: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: 2,
    title: 'VOID RUNNER',
    category: 'VISUAL SYSTEM',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1964&auto=format&fit=crop',
  },
  {
    id: 3,
    title: 'ETHER FLOW',
    category: 'MOTION DESIGN',
    image: 'https://images.unsplash.com/photo-1633167606207-d840b5070fc2?q=80&w=2030&auto=format&fit=crop',
  }
];

export const PortfolioSection = () => {
  return (
    <section id="portfolio" className="brutalist-section portfolio-section">
      <div className="brutalist-container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '8rem' }}>
          <SplitText as="h2" className="brutalist-subheading" style={{ margin: 0 }}>SYNCHRONIZED OUTPUTS</SplitText>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.8rem', letterSpacing: '0.2em' }}>
            TOTAL_NODES: 03 // STATUS: UPLOADING
          </div>
        </div>
        
        <div className="project-list">
          {PROJECTS.map((project, index) => (
            <div key={project.id} className="project-card-wrapper">
              <ScrollProgress enterVp="top" exitVp="bottom">
                <Lerp>
                  <Magnetic radius={800} strength={0.2}>
                    <div className="project-card">
                      <div className="project-image-container">
                        <img src={project.image} alt={project.title} className="project-image" />
                        <div className="image-scan-line" />
                      </div>
                      <div className="project-info">
                        <div className="project-index">[{index + 1}]</div>
                        <div className="project-details">
                          <h3 className="project-title">{project.title}</h3>
                          <p className="project-category">{project.category}</p>
                        </div>
                      </div>
                    </div>
                  </Magnetic>
                </Lerp>
              </ScrollProgress>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .portfolio-section {
          background-color: var(--aether-black);
          color: var(--aether-white);
        }

        .project-list {
          display: flex;
          flex-direction: column;
          gap: 20vh;
        }

        .project-card-wrapper {
          width: 75%;
          margin: 0 auto;
          position: relative;
        }

        .project-card-wrapper:nth-child(even) {
          margin-left: 5%;
        }

        .project-card-wrapper:nth-child(odd) {
          margin-right: 5%;
        }

        .project-card {
          position: relative;
          cursor: pointer;
          /* Advanced scroll-driven transformation */
          transform: 
            perspective(1000px)
            rotateX(calc((var(--progress, 0.5) - 0.5) * -15deg))
            translateY(calc(var(--progress, 0) * -80px))
            scale(calc(0.9 + var(--progress, 0) * 0.15));
          transition: transform 0.1s linear;
        }

        .project-image-container {
          position: relative;
          aspect-ratio: 16/9;
          overflow: hidden;
          border: 2px solid var(--aether-white);
        }

        .project-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: grayscale(1) contrast(1.2);
          transition: filter 0.5s ease, transform 0.8s cubic-bezier(0.23, 1, 0.32, 1);
          transform: scale(1.1);
        }

        .project-card:hover .project-image {
          filter: grayscale(0) contrast(1);
          transform: scale(1);
        }

        .image-scan-line {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            transparent,
            rgba(0, 0, 255, 0.2),
            transparent
          );
          height: 20%;
          width: 100%;
          top: calc(var(--progress, 0) * 80%);
          pointer-events: none;
          z-index: 2;
        }

        .project-info {
          display: flex;
          align-items: flex-start;
          gap: 2rem;
          margin-top: 3rem;
          /* Skew based on scroll speed (lerp) */
          transform: skewX(calc(var(--lerp, 0) * 0.05deg));
        }

        .project-index {
          font-family: var(--font-heading);
          font-weight: 900;
          font-size: 1.5rem;
          color: var(--aether-blue);
        }

        .project-title {
          font-family: var(--font-heading);
          font-weight: 900;
          font-size: clamp(2rem, 6vw, 5rem);
          line-height: 0.85;
          text-transform: uppercase;
          margin: 0;
          letter-spacing: -0.04em;
        }

        .project-category {
          font-size: clamp(0.9rem, 1.5vw, 1.25rem);
          font-weight: 700;
          letter-spacing: 0.15em;
          margin-top: 1rem;
          opacity: 0.6;
          text-transform: uppercase;
        }

        @media (max-width: 768px) {
          .project-card-wrapper {
            width: 100%;
            margin: 0 !important;
          }
        }
      `}</style>
    </section>
  );
};
