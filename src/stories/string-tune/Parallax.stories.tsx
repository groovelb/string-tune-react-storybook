import type { Meta, StoryObj } from '@storybook/react';
import { Parallax } from '../../components/string-tune';
import './string-tune.css';

const meta = {
  title: 'StringTune/Basic/Parallax',
  component: Parallax,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          '스크롤 시 패럴랙스 효과를 적용하는 컴포넌트입니다. `--parallax` CSS 변수를 통해 스크롤 위치에 따른 오프셋 값을 제공하며, speed로 효과의 강도를 조절합니다. **스크롤해야 효과를 확인할 수 있습니다.**',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    speed: {
      description: '패럴랙스 속도 (-1 ~ 1). 양수: 느리게, 음수: 빠르게',
      control: { type: 'range', min: -1, max: 1, step: 0.1 },
    },
    as: {
      description: '렌더링할 HTML 태그',
      control: 'select',
      options: ['div', 'figure', 'section'],
    },
  },
} satisfies Meta<typeof Parallax>;

export default meta;
type Story = StoryObj<typeof meta>;

const IMAGE_URL =
  'https://string-tune.fiddle.digital/images/tutorials/tutorial-image.jpg';

export const Default: Story = {
  args: {
    speed: 0.5,
  },
  render: (args) => (
    <div className="scroll-demo-wrapper">
      <div className="instruction">Scroll down to see parallax effect</div>

      <div className="scroll-spacer">Scroll Down</div>

      <div className="parallax-section">
        <Parallax {...args} className="parallax-bg">
          <img src={IMAGE_URL} alt="Parallax background" />
        </Parallax>
        <Parallax speed={(args.speed ?? 0.5) * -0.5} className="parallax-fg">
          <h1 className="parallax-title">Parallax</h1>
        </Parallax>
      </div>

      <div className="scroll-spacer">Keep Scrolling</div>

      <div className="parallax-section">
        <Parallax speed={0.3} className="parallax-bg">
          <img src={IMAGE_URL} alt="Parallax background" />
        </Parallax>
        <Parallax speed={-0.2} className="parallax-fg">
          <h1 className="parallax-title">Effect</h1>
        </Parallax>
      </div>

      <div className="scroll-spacer">End</div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          '배경 이미지와 텍스트에 서로 다른 speed 값을 적용하여 깊이감을 만듭니다. 스크롤하면 레이어가 다른 속도로 움직이는 것을 확인하세요.',
      },
    },
  },
};
