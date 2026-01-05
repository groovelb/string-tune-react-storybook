import React from 'react';
import { ScrollProgress } from '../../components/string-tune';

/**
 * Footer - A shifting reveal footer based on StringTune ScrollProgress.
 */
export const Footer = () => {
  return (
    <ScrollProgress as="footer" className="aether-footer-shifting" exitVp="bottom">
      <div className="footer-shifting-wrapper">
        <div className="brutalist-container footer-grid">
          <div className="footer-brand">
            <h2 className="footer-logo">AETHER</h2>
            <p className="footer-tagline">ARCHITECTING DECENTRALIZED NARRATIVES</p>
          </div>

          <div className="footer-nav">
            <div className="footer-column">
              <h4>PROTOCOL</h4>
              <a href="#">NETWORK</a>
              <a href="#">NODES</a>
              <a href="#">GOVERNANCE</a>
            </div>
            <div className="footer-column">
              <h4>RESOURCES</h4>
              <a href="#">MIRROR</a>
              <a href="#">WHITE PAPER</a>
              <a href="#">ASSETS</a>
            </div>
            <div className="footer-column">
              <h4>CONNECT</h4>
              <a href="#">TWITTER</a>
              <a href="#">DISCORD</a>
              <a href="#">TELEGRAM</a>
            </div>
          </div>

          <div className="footer-bottom">
            <div className="status-indicator">
              <span className="dot" />
              SYSTEM_OPERATIONAL // 2026_EST
            </div>
            <div className="copyright">
              © AETHER. ALL RIGHTS RESERVED.
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .aether-footer-shifting {
          position: relative;
          background-color: var(--aether-blue);
          color: var(--aether-white);
          overflow: hidden;
        }

        .aether-footer-shifting::after {
          content: '';
          display: block;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: var(--aether-black);
          opacity: calc(1 - var(--progress, 0));
          pointer-events: none;
          z-index: 2;
        }

        .footer-shifting-wrapper {
          min-height: 80vh;
          display: flex;
          align-items: center;
          padding: 100px 0;
          transform: translate3d(0, calc(-50% + 50% * var(--progress, 0)), 0);
          will-change: transform;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 4rem;
          width: 100%;
        }

        .footer-logo {
          font-family: var(--font-heading);
          font-weight: 900;
          font-size: 5rem;
          line-height: 1;
          margin-bottom: 1.5rem;
          letter-spacing: -0.04em;
        }

        .footer-tagline {
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 0.9rem;
          letter-spacing: 0.2em;
          opacity: 0.6;
        }

        .footer-nav {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
        }

        .footer-column h4 {
          font-family: var(--font-heading);
          font-weight: 900;
          font-size: 0.75rem;
          letter-spacing: 0.3em;
          margin-bottom: 2.5rem;
          color: rgba(255, 255, 255, 0.5);
        }

        .footer-column a {
          display: block;
          color: var(--aether-white);
          text-decoration: none;
          font-weight: 700;
          font-size: 1.1rem;
          margin-bottom: 1rem;
          transition: transform 0.3s ease;
        }

        .footer-column a:hover {
          transform: translateX(10px);
          color: var(--aether-black);
        }

        .footer-bottom {
          grid-column: 1 / -1;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 6rem;
          border-top: 1px solid rgba(255, 255, 255, 0.2);
          margin-top: 4rem;
        }

        .status-indicator {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-family: var(--font-heading);
          font-weight: 900;
          font-size: 0.7rem;
          letter-spacing: 0.1em;
        }

        .dot {
          width: 8px;
          height: 8px;
          background-color: #00ff00;
          border-radius: 50%;
          box-shadow: 0 0 10px #00ff00;
        }

        .copyright {
          font-size: 0.7rem;
          font-weight: 700;
          opacity: 0.5;
        }

        @media (max-width: 1024px) {
          .footer-grid {
            grid-template-columns: 1fr;
          }
          .footer-logo {
            font-size: 3rem;
          }
          .footer-nav {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </ScrollProgress>
  );
};
