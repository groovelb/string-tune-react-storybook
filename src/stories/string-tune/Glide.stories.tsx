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

const IMAGE_URL = 'https://string-tune.fiddle.digital/images/tutorials/tutorial-image.jpg';

export const Default: Story = {
  args: {
    delay: 0.5,
  },
  render: () => (
    <div className="glide-demo-wrapper">
      <span className="note">(Disabled on mobile devices)</span>

      <p>Order is temporary — tension is permanent.</p>

      <Glide as="figure" className="image-1" delay={1.0}>
        <img src={IMAGE_URL} alt="StringTune" />
      </Glide>

      <Glide as="figure" className="image-2" delay={0.5}>
        <img src={IMAGE_URL} alt="StringTune" />
      </Glide>

      <Glide as="figure" className="image-3" delay={0.0}>
        <img src={IMAGE_URL} alt="StringTune" />
      </Glide>

      <Glide as="figure" className="image-4" delay={0.5}>
        <img src={IMAGE_URL} alt="StringTune" />
      </Glide>

      <Glide as="figure" className="image-5" delay={1.0}>
        <img src={IMAGE_URL} alt="StringTune" />
      </Glide>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          '5개 이미지에 대칭적인 delay 값(1.0, 0.5, 0.0, 0.5, 1.0)을 적용했습니다. 가운데 이미지(delay: 0)가 가장 먼저 반응하고, 양쪽 끝 이미지(delay: 1.0)가 가장 늦게 반응합니다.',
      },
    },
  },
};
