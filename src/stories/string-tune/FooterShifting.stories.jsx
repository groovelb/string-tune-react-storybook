// Storybook imports handled by framework
import { ScrollProgress } from '../../components/string-tune';
import './string-tune.css';

/**
 * Footer Shifting Demo (layouts/tutorial-01)
 *
 * Uses ScrollProgress to create a footer reveal animation
 * where the footer slides up from the bottom based on scroll progress.
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
      description: 'Viewport position where progress ends',
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
    <div className="footer-shifting-demo-wrapper">
      {/* Content Section */}
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

      {/* Footer with ScrollProgress */}
      <ScrollProgress {...args} as="div" className="footer-shifting-footer">
        <div className="-w">
          <span className="logo">GlowNest</span>

          <nav className="menu">
            <span>Shop</span>
            <span>About</span>
            <span>Support</span>
          </nav>
          <nav className="help">
            <span>FAQs</span>
            <span>Shipping & Returns</span>
            <span>Warranty</span>
            <span>Contact</span>
          </nav>
          <nav className="legal">
            <span>Privacy Policy</span>
            <span>Terms & Conditions</span>
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
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'The footer uses `--progress` CSS variable to animate its position and opacity. The black overlay fades out as progress increases, revealing the blue footer beneath.',
      },
    },
  },
};
