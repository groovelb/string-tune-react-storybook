import type { Meta, StoryObj } from '@storybook/react';
import { Magnetic } from '../../components/string-tune';
import './string-tune.css';

const meta = {
  title: 'StringTune/Basic/Magnetic',
  component: Magnetic,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '마우스 호버 시 커서 방향으로 끌리는 자석 효과 컴포넌트입니다. `--magnetic-x`, `--magnetic-y` CSS 변수를 통해 오프셋 값을 제공합니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    radius: {
      description: '반응 반경 (px). 커서가 이 범위 안에 있을 때 효과 발동',
      control: { type: 'range', min: 100, max: 1000, step: 50 },
    },
    strength: {
      description: '끌림 강도 (0 ~ 1). 높을수록 강하게 끌림',
      control: { type: 'range', min: 0, max: 1, step: 0.05 },
    },
    as: {
      description: '렌더링할 HTML 태그',
      control: 'select',
      options: ['div', 'button', 'a', 'figure'],
    },
  },
} satisfies Meta<typeof Magnetic>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    radius: 400,
    strength: 0.1,
    className: 'magnetic-demo',
    children: 'Hover me',
  },
  parameters: {
    docs: {
      description: {
        story:
          '버튼 위에 마우스를 올리면 커서 방향으로 부드럽게 끌립니다. CSS에서 `--magnetic-x`, `--magnetic-y` 변수를 transform에 활용하세요.',
      },
    },
  },
};
