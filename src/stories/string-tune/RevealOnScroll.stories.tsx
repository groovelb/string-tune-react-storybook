import type { Meta, StoryObj } from '@storybook/react';
import { RevealOnScroll } from '../../components/string-tune';
import './string-tune.css';

const meta = {
  title: 'StringTune/Basic/RevealOnScroll',
  component: RevealOnScroll,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          '스크롤하여 뷰포트에 진입할 때 `-inview` 클래스를 토글하는 컴포넌트입니다. CSS에서 해당 클래스를 활용하여 다양한 애니메이션을 구현할 수 있습니다. **스크롤해야 효과를 확인할 수 있습니다.**',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    repeat: {
      description: '뷰포트를 벗어났다가 다시 들어올 때 애니메이션 반복 여부',
      control: 'boolean',
    },
    as: {
      description: '렌더링할 HTML 태그',
      control: 'select',
      options: ['div', 'figure', 'section', 'article'],
    },
  },
} satisfies Meta<typeof RevealOnScroll>;

export default meta;
type Story = StoryObj<typeof meta>;

const IMAGE_URL =
  'https://string-tune.fiddle.digital/images/tutorials/tutorial-image.jpg';

export const Default: Story = {
  args: {
    repeat: true,
  },
  render: (args) => (
    <div className="scroll-demo-wrapper">
      <div className="instruction">
        Scroll down to reveal images (repeat: {args.repeat ? 'on' : 'off'})
      </div>

      <div className="scroll-spacer">Scroll Down</div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', maxWidth: 800, margin: '0 auto' }}>
        <RevealOnScroll {...args} className="reveal-demo" as="figure">
          <img src={IMAGE_URL} alt="Reveal 1" style={{ width: '100%', height: 300, objectFit: 'cover' }} />
        </RevealOnScroll>
        <RevealOnScroll {...args} className="reveal-demo" as="figure">
          <img src={IMAGE_URL} alt="Reveal 2" style={{ width: '100%', height: 300, objectFit: 'cover' }} />
        </RevealOnScroll>
      </div>

      <div className="scroll-spacer">Keep Scrolling</div>

      <div style={{ maxWidth: 600, margin: '0 auto' }}>
        <RevealOnScroll {...args} className="reveal-demo" as="figure">
          <img src={IMAGE_URL} alt="Reveal 3" style={{ width: '100%', height: 400, objectFit: 'cover' }} />
        </RevealOnScroll>
      </div>

      <div className="scroll-spacer">End</div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          '스크롤하여 이미지가 뷰포트에 들어오면 `-inview` 클래스가 추가되며 애니메이션이 실행됩니다. `repeat` 옵션이 켜져 있으면 다시 스크롤 아웃 후 인 시 애니메이션이 재실행됩니다.',
      },
    },
  },
};
