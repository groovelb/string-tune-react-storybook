// Storybook imports handled by framework
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
};

export default meta;

const IMAGE_URL = 'https://string-tune.fiddle.digital/images/tutorials/tutorial-image.jpg';

export const Default = {
  args: {
    repeat: true,
  },
  render: (args) => (
    <div className="reveal-demo-wrapper">
      <div className="reveal-header">
        <span>Scroll to reveal</span>
      </div>

      <RevealOnScroll {...args} as="figure" className="image-1">
        <img src={IMAGE_URL} alt="StringTune" />
      </RevealOnScroll>

      <RevealOnScroll {...args} as="figure" className="image-2">
        <img src={IMAGE_URL} alt="StringTune" />
      </RevealOnScroll>

      <RevealOnScroll {...args} as="figure" className="image-3">
        <img src={IMAGE_URL} alt="StringTune" />
      </RevealOnScroll>

      <RevealOnScroll {...args} as="figure" className="image-4">
        <img src={IMAGE_URL} alt="StringTune" />
      </RevealOnScroll>

      <RevealOnScroll {...args} as="figure" className="image-5">
        <img src={IMAGE_URL} alt="StringTune" />
      </RevealOnScroll>

      <RevealOnScroll {...args} as="figure" className="image-6">
        <img src={IMAGE_URL} alt="StringTune" />
      </RevealOnScroll>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          '14열 그리드에 6개의 이미지가 다양한 위치에 배치됩니다. 스크롤하여 이미지가 뷰포트에 들어오면 `-inview` 클래스가 추가되며 clip-path와 scale 애니메이션이 실행됩니다.',
      },
    },
  },
};
