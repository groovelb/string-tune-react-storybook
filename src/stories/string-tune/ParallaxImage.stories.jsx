import { ParallaxImage } from '../../components/string-tune/recipes/ParallaxImage.jsx';
import IMAGE_URL from '../../assets/alphabet/9-g.png';

const meta = {
  title: 'StringTune/Recipes/ParallaxImage',
  component: ParallaxImage,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          '스크롤 시 패럴랙스 효과가 적용된 이미지 Recipe 컴포넌트입니다. `src`와 `speed`만 전달하면 **CSS 작성 없이** 바로 동작합니다. 내부적으로 Parallax Wrapper를 사용합니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    src: {
      description: '이미지 URL',
      control: 'text',
    },
    alt: {
      description: '이미지 alt 텍스트',
      control: 'text',
    },
    speed: {
      description: '패럴랙스 속도 (-1 ~ 1). 양수: 느리게, 음수: 빠르게',
      control: { type: 'range', min: -1, max: 1, step: 0.05 },
    },
    height: {
      description: '컨테이너 높이 (CSS 값)',
      control: 'text',
    },
    scale: {
      description: '이미지 확대 비율 (패럴랙스 범위 확보용)',
      control: { type: 'range', min: 1, max: 2, step: 0.05 },
    },
  },
};

export default meta;

export const Default = {
  args: {
    src: IMAGE_URL,
    alt: 'StringTune Parallax',
    speed: 0.5,
    height: '60vh',
    scale: 1.3,
  },
  render: (args) => (
    <div style={{ background: '#808080' }}>
      <div style={{ height: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
        Scroll Down
      </div>

      <ParallaxImage {...args} />

      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
        Keep Scrolling
      </div>

      <ParallaxImage {...args} speed={-0.3} height="50vh" />

      <div style={{ height: '50vh' }} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          '기본 패럴랙스 이미지. 첫 번째 이미지는 speed 0.5 (느린 스크롤), 두 번째는 speed -0.3 (반대 방향).',
      },
    },
  },
};

export const HeroSection = {
  args: {
    src: IMAGE_URL,
    alt: 'Hero Image',
    speed: 0.3,
    height: '80vh',
    scale: 1.4,
  },
  render: (args) => (
    <div style={{ background: '#808080' }}>
      <div style={{ position: 'relative' }}>
        <ParallaxImage {...args} />
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: 'clamp(2rem, 5vw, 4rem)',
          fontWeight: 'bold',
          textShadow: '0 2px 20px rgba(0,0,0,0.5)',
          zIndex: 1,
        }}>
          Hero Section
        </div>
      </div>

      <div style={{ padding: '80px 40px', color: 'white', maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
        ParallaxImage를 히어로 배경으로 사용하는 예시입니다. 위에 텍스트를 오버레이할 수 있습니다.
      </div>

      <ParallaxImage src={IMAGE_URL} speed={0.6} height="50vh" />

      <div style={{ height: '50vh' }} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '패럴랙스 이미지 위에 텍스트를 오버레이하여 히어로 섹션을 구성하는 예시.',
      },
    },
  },
};
