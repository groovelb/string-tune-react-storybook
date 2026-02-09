import { ParallaxImage } from '../../components/string-tune/recipes/ParallaxImage.jsx';
import img1 from '../../assets/alphabet/1-v.png';
import img2 from '../../assets/alphabet/2-i.png';
import img3 from '../../assets/alphabet/3-b.png';
import img4 from '../../assets/alphabet/4-e.png';
import img5 from '../../assets/alphabet/5-d.png';
import img6 from '../../assets/alphabet/6-e.png';

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
    src: img1,
    alt: 'StringTune Parallax',
    speed: 0.5,
    height: '60vh',
    scale: 1.3,
  },
  render: (args) => (
    <div style={{ background: '#000' }}>
      <div style={{ height: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
        Scroll Down
      </div>

      <ParallaxImage {...args} />

      <div style={{ height: '30vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '0.85rem', opacity: 0.6 }}>
        speed: 0.5
      </div>

      <ParallaxImage src={img2} alt="I" speed={-0.3} height="50vh" scale={1.3} />

      <div style={{ height: '30vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '0.85rem', opacity: 0.6 }}>
        speed: -0.3
      </div>

      <ParallaxImage src={img3} alt="B" speed={0.7} height="60vh" scale={1.4} />

      <div style={{ height: '30vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '0.85rem', opacity: 0.6 }}>
        speed: 0.7
      </div>

      <ParallaxImage src={img4} alt="E" speed={-0.5} height="50vh" scale={1.3} />

      <div style={{ height: '30vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '0.85rem', opacity: 0.6 }}>
        speed: -0.5
      </div>

      <ParallaxImage src={img5} alt="D" speed={0.3} height="55vh" scale={1.3} />

      <div style={{ height: '30vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '0.85rem', opacity: 0.6 }}>
        speed: 0.3
      </div>

      <ParallaxImage src={img6} alt="E" speed={-0.6} height="50vh" scale={1.4} />

      <div style={{ height: '50vh' }} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          '6개 이미지에 각각 다른 패럴랙스 속도(0.5, -0.3, 0.7, -0.5, 0.3, -0.6)를 적용합니다. 양수/음수가 번갈아 배치되어 스크롤 시 반대 방향 움직임을 비교할 수 있습니다.',
      },
    },
  },
};

export const HeroSection = {
  args: {
    src: img1,
    alt: 'Hero Image',
    speed: 0.3,
    height: '80vh',
    scale: 1.4,
  },
  render: (args) => (
    <div style={{ background: '#000' }}>
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

      <div style={{ position: 'relative' }}>
        <ParallaxImage src={img2} alt="I" speed={0.6} height="60vh" scale={1.3} />
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
          fontWeight: 'bold',
          textShadow: '0 2px 20px rgba(0,0,0,0.5)',
          zIndex: 1,
        }}>
          Second Section
        </div>
      </div>

      <div style={{ padding: '60px 40px', color: 'white', maxWidth: '600px', margin: '0 auto', textAlign: 'center', fontSize: '0.9rem', opacity: 0.7 }}>
        각 섹션마다 다른 속도를 적용하여 깊이감을 표현합니다.
      </div>

      <div style={{ position: 'relative' }}>
        <ParallaxImage src={img3} alt="B" speed={-0.2} height="50vh" scale={1.3} />
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
          fontWeight: 'bold',
          textShadow: '0 2px 20px rgba(0,0,0,0.5)',
          zIndex: 1,
        }}>
          Third Section
        </div>
      </div>

      <div style={{ height: '50vh' }} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '패럴랙스 이미지 위에 텍스트를 오버레이하여 히어로 섹션을 구성하는 예시. 3개 섹션에 각각 다른 속도를 적용합니다.',
      },
    },
  },
};
