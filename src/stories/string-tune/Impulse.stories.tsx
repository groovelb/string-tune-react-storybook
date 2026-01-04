import type { Meta, StoryObj } from '@storybook/react';
import { Impulse } from '../../components/string-tune';
import './string-tune.css';

const meta = {
  title: 'StringTune/Basic/Impulse',
  component: Impulse,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          '커서 움직임에 반응하여 요소가 밀려나는 효과를 제공합니다. `--push-x`, `--push-y`, `--push-rotation` CSS 변수를 통해 transform을 적용할 수 있습니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    positionX: {
      description: 'X축 이동 강도',
      control: { type: 'range', min: 0, max: 100, step: 5 },
    },
    positionY: {
      description: 'Y축 이동 강도',
      control: { type: 'range', min: 0, max: 100, step: 5 },
    },
    rotation: {
      description: '회전 강도',
      control: { type: 'range', min: 0, max: 50, step: 5 },
    },
    as: {
      description: '렌더링할 HTML 태그',
      control: 'select',
      options: ['div', 'button', 'span'],
    },
  },
} satisfies Meta<typeof Impulse>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    positionX: 30,
    positionY: 30,
    rotation: 15,
  },
  render: (args) => (
    <div className="impulse-demo-wrapper">
      <div className="instruction">Move your mouse around the cards</div>

      <div className="impulse-grid">
        {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'].map((label, i) => (
          <Impulse
            key={label}
            {...args}
            positionX={(args.positionX ?? 30) + i * 5}
            positionY={(args.positionY ?? 30) + i * 5}
            rotation={(args.rotation ?? 15) + i * 2}
            className="impulse-card"
          >
            {label}
          </Impulse>
        ))}
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          '9개의 카드가 커서 움직임에 반응하여 밀려납니다. 각 카드마다 다른 강도 설정을 적용하여 유기적인 움직임을 만들었습니다.',
      },
    },
  },
};
