import type { Meta, StoryObj } from '@storybook/react';
import { Spotlight } from '../../components/string-tune';
import './string-tune.css';

const meta = {
  title: 'StringTune/Basic/Spotlight',
  component: Spotlight,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          '요소 중심에서 커서까지의 각도와 거리를 CSS 변수로 제공합니다. `--spotlight-angle` (라디안), `--spotlight-angle-deg` (도), `--spotlight-distance` (px)를 활용하여 커서 방향 기반 효과를 구현합니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    as: {
      description: '렌더링할 HTML 태그',
      control: 'select',
      options: ['div', 'section', 'figure'],
    },
  },
} satisfies Meta<typeof Spotlight>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  render: () => (
    <div className="spotlight-demo-wrapper">
      <div className="instruction">Move your mouse around the card</div>

      <Spotlight className="spotlight-card">
        <div className="spotlight-eyes">
          <div className="spotlight-eye">
            <div className="spotlight-pupil" />
          </div>
          <div className="spotlight-eye">
            <div className="spotlight-pupil" />
          </div>
        </div>
        <h2>Spotlight Effect</h2>
        <p>
          The gradient and eyes follow your cursor.
          <br />
          Move around to see the effect!
        </p>
      </Spotlight>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          '카드의 배경 그라데이션이 커서 방향으로 회전하고, 눈동자가 커서를 따라갑니다. `--spotlight-angle`을 그라데이션 각도에, `sin/cos`와 `--spotlight-distance`를 눈동자 위치에 활용했습니다.',
      },
    },
  },
};
