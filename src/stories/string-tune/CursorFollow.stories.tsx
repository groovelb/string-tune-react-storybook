import type { Meta, StoryObj } from '@storybook/react';
import { CursorFollow } from '../../components/string-tune';
import './string-tune.css';

const meta = {
  title: 'StringTune/Basic/CursorFollow',
  component: CursorFollow,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          '커서 위치를 추적하여 CSS 변수로 제공하는 컴포넌트입니다. `--x`, `--y` (즉시 좌표) 및 lerp 옵션 사용 시 부드러운 추적을 위한 보간된 좌표를 제공합니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    lerp: {
      description: '커서 추적 부드러움 (0~1). 높을수록 더 부드럽게(느리게) 추적',
      control: { type: 'range', min: 0, max: 1, step: 0.1 },
    },
    as: {
      description: '렌더링할 HTML 태그',
      control: 'select',
      options: ['div', 'span', 'figure'],
    },
  },
} satisfies Meta<typeof CursorFollow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    lerp: 0.8,
  },
  render: (args) => (
    <div className="cursor-demo-wrapper">
      <div className="instruction">Move your mouse around</div>

      {/* 빠른 추적 (작은 원) */}
      <CursorFollow lerp={0.5} className="cursor-follower" />

      {/* 느린 추적 (큰 링) */}
      <CursorFollow {...args} className="cursor-follower-ring" />

      <div className="cursor-content">
        <p>Move your cursor to see the follow effect</p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          '두 개의 커서 팔로워를 표시합니다. 작은 원은 빠르게(lerp: 0.5), 큰 링은 느리게(lerp: 0.8) 커서를 추적합니다. CSS에서 `--x`, `--y` 변수로 transform을 적용합니다.',
      },
    },
  },
};
