import type { Meta, StoryObj } from '@storybook/react';
import { SplitText } from '../../components/string-tune';
import './string-tune.css';

const meta = {
  title: 'StringTune/Basic/SplitText',
  component: SplitText,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          '텍스트를 문자/단어/줄 단위로 분할하여 개별 애니메이션을 적용합니다. 각 분할 요소에는 `--char-index`, `--word-index`, `--line-index` CSS 변수가 제공됩니다. **스크롤해야 효과를 확인할 수 있습니다.**',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    split: {
      description: '텍스트 분할 단위',
      control: 'select',
      options: ['char', 'word', 'line'],
    },
    repeat: {
      description: '뷰포트 진입 시 반복 애니메이션 여부',
      control: 'boolean',
    },
    as: {
      description: '렌더링할 HTML 태그',
      control: 'select',
      options: ['div', 'h1', 'h2', 'p', 'span'],
    },
  },
} satisfies Meta<typeof SplitText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    split: 'char',
    repeat: true,
  },
  render: () => (
    <div className="split-demo-wrapper">
      <div className="instruction">
        Scroll to see split text animation
      </div>

      <div className="scroll-spacer">Scroll Down</div>

      <div className="split-text-container">
        <SplitText split="char" repeat className="split-text-title">
          StringTune
        </SplitText>

        <SplitText split="word" repeat className="split-text-subtitle">
          Create stunning animations with simple data attributes and CSS variables
        </SplitText>
      </div>

      <div className="scroll-spacer">End</div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          '제목은 `char` 단위로 분할되어 각 문자가 순차적으로 나타납니다. 부제목은 `word` 단위로 분할됩니다. `--char-index`와 `--word-index`를 `transition-delay`에 활용하여 stagger 효과를 구현했습니다.',
      },
    },
  },
};
