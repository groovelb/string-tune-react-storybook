import type { Meta, StoryObj } from '@storybook/react';
import { ScrollProgress } from '../../components/string-tune';
import './string-tune.css';

const meta = {
  title: 'StringTune/Basic/ScrollProgress',
  component: ScrollProgress,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          '스크롤 진행률(0~1)을 `--progress` CSS 변수로 제공하는 컴포넌트입니다. 요소가 뷰포트를 통과하는 동안의 진행 상태를 추적합니다. **스크롤해야 효과를 확인할 수 있습니다.**',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    enterVp: {
      description: '진입 뷰포트 기준점 (요소가 이 지점에 도달하면 0)',
      control: 'select',
      options: ['top', 'center', 'bottom'],
    },
    exitVp: {
      description: '이탈 뷰포트 기준점 (요소가 이 지점을 벗어나면 1)',
      control: 'select',
      options: ['top', 'center', 'bottom'],
    },
    as: {
      description: '렌더링할 HTML 태그',
      control: 'select',
      options: ['div', 'section', 'article'],
    },
  },
} satisfies Meta<typeof ScrollProgress>;

export default meta;
type Story = StoryObj<typeof meta>;

const IMAGE_URL =
  'https://string-tune.fiddle.digital/images/tutorials/tutorial-image.jpg';

export const Default: Story = {
  args: {
    enterVp: 'top',
    exitVp: 'bottom',
  },
  render: (args) => (
    <div className="scroll-demo-wrapper" style={{ minHeight: '400vh' }}>
      <div className="instruction">
        Scroll to see progress (0 → 1)
      </div>

      <div className="scroll-spacer">Scroll Down</div>

      <ScrollProgress {...args} className="progress-section">
        <div className="progress-sticky">
          <figure className="progress-card">
            <img src={IMAGE_URL} alt="Progress demo" />
          </figure>
        </div>
      </ScrollProgress>

      <div className="scroll-spacer">End</div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          '`--progress` CSS 변수는 0에서 1로 변화합니다. scale, opacity, clip-path 등에 활용하여 스크롤 기반 애니메이션을 구현하세요.',
      },
    },
  },
};
