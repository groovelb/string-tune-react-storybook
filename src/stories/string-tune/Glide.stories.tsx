import type { Meta, StoryObj } from '@storybook/react';
import { Glide } from '../../components/string-tune';
import './string-tune.css';

const meta = {
  title: 'StringTune/Basic/Glide',
  component: Glide,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          '스크롤 시 지연된 부드러운 움직임을 제공하는 컴포넌트입니다. `--glide` CSS 변수를 통해 지연된 스크롤 위치 값을 제공합니다. 여러 요소에 다른 delay 값을 적용하면 순차적인 움직임 효과를 만들 수 있습니다. **스크롤해야 효과를 확인할 수 있습니다.**',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    delay: {
      description: '지연 계수 (0 ~ 1). 높을수록 더 늦게 반응',
      control: { type: 'range', min: 0, max: 1, step: 0.1 },
    },
    as: {
      description: '렌더링할 HTML 태그',
      control: 'select',
      options: ['div', 'figure', 'section'],
    },
  },
} satisfies Meta<typeof Glide>;

export default meta;
type Story = StoryObj<typeof meta>;

const IMAGE_URL =
  'https://string-tune.fiddle.digital/images/tutorials/tutorial-image.jpg';

export const Default: Story = {
  args: {
    delay: 0.5,
  },
  render: () => (
    <div className="scroll-demo-wrapper">
      <div className="instruction">
        Scroll down to see glide effect (each column has different delay)
      </div>

      <div className="scroll-spacer">Scroll Down</div>

      <div className="glide-section">
        <Glide delay={1.17} className="glide-item" as="figure">
          <img src={IMAGE_URL} alt="Glide 1" />
        </Glide>
        <Glide delay={0.91} className="glide-item" as="figure">
          <img src={IMAGE_URL} alt="Glide 2" />
        </Glide>
        <Glide delay={0.65} className="glide-item" as="figure">
          <img src={IMAGE_URL} alt="Glide 3" />
        </Glide>
        <Glide delay={0.91} className="glide-item" as="figure">
          <img src={IMAGE_URL} alt="Glide 4" />
        </Glide>
        <Glide delay={1.17} className="glide-item" as="figure">
          <img src={IMAGE_URL} alt="Glide 5" />
        </Glide>
      </div>

      <div className="scroll-spacer">Keep Scrolling</div>

      <div className="glide-section">
        <Glide delay={0.65} className="glide-item" as="figure">
          <img src={IMAGE_URL} alt="Glide A" />
        </Glide>
        <Glide delay={0.78} className="glide-item" as="figure">
          <img src={IMAGE_URL} alt="Glide B" />
        </Glide>
        <Glide delay={0.91} className="glide-item" as="figure">
          <img src={IMAGE_URL} alt="Glide C" />
        </Glide>
        <Glide delay={1.04} className="glide-item" as="figure">
          <img src={IMAGE_URL} alt="Glide D" />
        </Glide>
        <Glide delay={1.17} className="glide-item" as="figure">
          <img src={IMAGE_URL} alt="Glide E" />
        </Glide>
      </div>

      <div className="scroll-spacer">End</div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          '5개 이미지에 각각 다른 delay(1.0, 0.75, 0, 0.75, 1.0)를 적용했습니다. 가운데 이미지(delay: 0)가 가장 먼저 반응하고, 양쪽 이미지(delay: 1.0)가 가장 늦게 반응합니다.',
      },
    },
  },
};
