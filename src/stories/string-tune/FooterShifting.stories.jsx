// Storybook imports handled by framework
import { ScrollProgress } from '../../components/string-tune';
import './string-tune.css';

/**
 * Footer Shifting Demo (layouts/tutorial-01)
 *
 * Uses ScrollProgress to create a footer reveal animation
 * where the footer slides up and fades in based on scroll progress.
 *
 * Key animation:
 * - Footer ::after overlay: opacity: calc(1 - var(--progress))
 * - Footer .-w content: transform: translate3d(0, calc(-50% + 50% * var(--progress)), 0)
 */
const meta = {
  title: 'StringTune/Layouts/FooterShifting',
  component: ScrollProgress,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Demonstrates **ScrollProgress** to create a footer reveal effect. The footer slides up and fades in as the user scrolls, using `transform: translate3d()` and `opacity` based on `--progress` CSS variable.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    exitVp: {
      description: 'Viewport position where progress ends (StringTune string-exit-vp)',
      control: { type: 'select' },
      options: ['top', 'center', 'bottom'],
    },
  },
};

export default meta;

export const Default = {
  args: {
    exitVp: 'bottom',
  },
  render: (args) => (
    <>
      {/* Content Section - Black background */}
      <div className="footer-shifting-content">
        <div className="-w">
          <p className="title">
            A lifestyle brand focused on cozy home tech and ambient lighting.
          </p>
          <span className="cta-title">Bring warmth to your space.</span>
          <p className="cta-caption">
            Discover how light can transform your evenings — from gentle glows to
            deep ambers. Join our newsletter for tips, early product releases, and
            a little brightness in your inbox.
          </p>
          <span className="button">Subscribe</span>
        </div>
      </div>

      {/* Footer with ScrollProgress - Blue background
          Only exitVp is passed to match original demo behavior.
          StringTune will track progress as footer scrolls through viewport. */}
      <ScrollProgress as="div" className="footer-shifting-footer" exitVp={args.exitVp}>
        <div className="-w">
          <span className="logo">GlowNest</span>

          <nav className="menu">
            <span>Shop</span>
            <span>About</span>
            <span>Support</span>
          </nav>
          <nav className="help">
            <span>FAQs</span>
            <span>Shipping &amp; Returns</span>
            <span>Warranty</span>
            <span>Contact</span>
          </nav>
          <nav className="legal">
            <span>Privacy Policy</span>
            <span>Terms &amp; Conditions</span>
            <span>Cookies</span>
          </nav>
          <nav className="socials">
            <span>Instagram</span>
            <span>Pinterest</span>
            <span>YouTube</span>
            <span>LinkedIn</span>
          </nav>
          <div className="copy">
            © 2025 GlowNest.
            <br />
            All rights reserved
          </div>
        </div>
      </ScrollProgress>
    </>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Scroll down to see the footer reveal effect. The black overlay fades out (`opacity: calc(1 - var(--progress))`) while the footer content slides up (`transform: translate3d(0, calc(-50% + 50% * var(--progress)), 0)`).',
      },
    },
  },
};
