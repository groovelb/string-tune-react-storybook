// Storybook imports handled by framework
import { ScrollProgress, SplitText } from '../../components/string-tune';
import './string-tune.css';

/**
 * Text with Progress Demo (typography/tutorial-01)
 *
 * This is a **recipe/pattern** that combines ScrollProgress and SplitText
 * to animate text word-by-word based on scroll progress.
 *
 * Not a standalone component, but demonstrates how to combine primitives.
 */

// Wrapper component for the recipe
const TextProgressRecipe = ({
  enterVp = 'top',
  exitVp = 'bottom',
}) => (
  <div className="text-progress-demo-wrapper">
    <ScrollProgress enterVp={enterVp} exitVp={exitVp} className="-w">
      <div className="text">
        <SplitText as="span" className="-h4 -m-h5 -splitted" split="word">
          <span className="indent" data-val-pct="0"></span>
          <span className="-highlight">The weather</span> in the UK is a curious experiment designed to test patience rather than provide comfort. It can be raining, sunny, windy, and mildly offensive within the same afternoon. Forecasts exist mostly for entertainment, umbrellas serve as emotional support, and any mention of "summer" should be treated as a bold rumour.
        </SplitText>
      </div>
    </ScrollProgress>
  </div>
);

const meta = {
  title: 'StringTune/Typography/TextWithProgress',
  component: TextProgressRecipe,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Combines **ScrollProgress** + **SplitText** for word-by-word text reveal animation based on scroll progress.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    enterVp: {
      description: 'Viewport position where progress starts',
      control: { type: 'select' },
      options: ['top', 'center', 'bottom'],
    },
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
    enterVp: 'top',
    exitVp: 'bottom',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Word-by-word text animation. CSS calculates `--word-progress` from `--progress` and `--word-index` variables.',
      },
    },
  },
};
