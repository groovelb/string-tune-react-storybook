// Storybook imports handled by framework
import { StringTuneProvider } from '../../components/string-tune';
import './string-tune.css';
import IMAGE_URL from '../../assets/alphabet/5-d.png';

/**
 * FPS Tracker Demo (basic/tutorial-14)
 *
 * Demonstrates the FPS Tracker developer tool that displays
 * frames per second in real-time for performance monitoring.
 */
const meta = {
  title: 'StringTune/Developer/FPSTracker',
  component: StringTuneProvider,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'The **FPS Tracker** is a developer tool that displays real-time frames per second. Enable it by adding `fpsTracker` to modules and setting `fpsTrackerVisible={true}` on StringTuneProvider.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    fpsTrackerVisible: {
      description: 'Toggle FPS tracker visibility',
      control: { type: 'boolean' },
    },
  },
};

export default meta;

const GridImages = () => (
  <div className="fps-demo-wrapper">
    <div className="fps-grid">
      {Array.from({ length: 16 }, (_, i) => (
        <figure key={i} className={`image-${i + 1}`}>
          <img
            data-string="lazy"
            data-string-lazy={IMAGE_URL}
            alt="StringTune"
          />
        </figure>
      ))}
    </div>
  </div>
);

export const Default = {
  args: {
    fpsTrackerVisible: true,
    modules: ['lazy', 'fpsTracker'],
  },
  render: (args) => (
    <StringTuneProvider {...args}>
      <GridImages />
    </StringTuneProvider>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'A 4x4 grid of lazy-loaded images with the FPS tracker overlay visible. The tracker appears at the center of the viewport with a red background.',
      },
    },
  },
};

export const Hidden = {
  args: {
    fpsTrackerVisible: false,
    modules: ['lazy', 'fpsTracker'],
  },
  render: (args) => (
    <StringTuneProvider {...args}>
      <GridImages />
    </StringTuneProvider>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Same grid layout but with the FPS tracker hidden. The module is still loaded but not visible.',
      },
    },
  },
};
