import { ScrollReveal } from '../../components/string-tune/recipes/ScrollReveal.jsx';
import IMAGE_URL from '../../assets/alphabet/11-l.png';

const meta = {
  title: 'StringTune/Recipes/ScrollReveal',
  component: ScrollReveal,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          '스크롤 시 요소를 애니메이션과 함께 노출하는 Recipe 컴포넌트입니다. `animation` prop으로 프리셋을 선택하면 **CSS 작성 없이** 바로 동작합니다. 내부적으로 RevealOnScroll Wrapper를 사용합니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    animation: {
      description: '애니메이션 프리셋',
      control: { type: 'select' },
      options: ['fadeUp', 'fadeIn', 'scaleIn', 'slideLeft', 'slideRight', 'clipReveal'],
    },
    delay: {
      description: '애니메이션 지연 시간 (초)',
      control: { type: 'range', min: 0, max: 2, step: 0.1 },
    },
    duration: {
      description: '애니메이션 지속 시간 (초)',
      control: { type: 'range', min: 0.2, max: 3, step: 0.1 },
    },
    easing: {
      description: 'CSS 이징 함수',
      control: { type: 'select' },
      options: [
        'cubic-bezier(0.86, 0, 0.31, 1)',
        'cubic-bezier(0.35, 0.35, 0, 1)',
        'ease',
        'ease-in-out',
        'linear',
      ],
    },
    repeat: {
      description: '뷰포트를 벗어났다가 다시 들어올 때 반복 여부',
      control: 'boolean',
    },
  },
};

export default meta;

export const FadeUp = {
  args: {
    animation: 'fadeUp',
    duration: 1,
    delay: 0,
    repeat: true,
  },
  render: (args) => (
    <div style={{ background: '#808080', minHeight: '100vh' }}>
      <div className="scroll-spacer" style={{ height: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
        Scroll Down
      </div>

      <div style={{ display: 'grid', gap: '60px', padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
        <ScrollReveal {...args}>
          <img src={IMAGE_URL} alt="StringTune" style={{ width: '100%', display: 'block' }} />
        </ScrollReveal>

        <ScrollReveal {...args} delay={0.2}>
          <div style={{ background: '#333', color: 'white', padding: '40px', fontSize: '1.2rem' }}>
            Props만 전달하면 바로 동작하는 ScrollReveal Recipe입니다.
          </div>
        </ScrollReveal>

        <ScrollReveal {...args} delay={0.4}>
          <img src={IMAGE_URL} alt="StringTune" style={{ width: '100%', display: 'block' }} />
        </ScrollReveal>
      </div>

      <div style={{ height: '40vh' }} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '기본 fadeUp 프리셋. 요소가 뷰포트에 진입하면 아래에서 위로 페이드인됩니다.',
      },
    },
  },
};

export const ClipReveal = {
  args: {
    animation: 'clipReveal',
    duration: 1.5,
    delay: 0,
    repeat: true,
  },
  render: (args) => (
    <div style={{ background: '#808080', minHeight: '100vh' }}>
      <div style={{ height: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
        Scroll Down
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', padding: '40px' }}>
        <ScrollReveal {...args}>
          <img src={IMAGE_URL} alt="StringTune" style={{ width: '100%', display: 'block' }} />
        </ScrollReveal>
        <ScrollReveal {...args} delay={0.3}>
          <img src={IMAGE_URL} alt="StringTune" style={{ width: '100%', display: 'block' }} />
        </ScrollReveal>
      </div>

      <div style={{ height: '40vh' }} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'clipReveal 프리셋. 원본 RevealOnScroll 데모와 동일한 clip-path + scale 애니메이션을 **CSS 없이** 바로 사용할 수 있습니다.',
      },
    },
  },
};

export const AllPresets = {
  args: {
    duration: 1,
    repeat: true,
  },
  render: (args) => (
    <div style={{ background: '#808080', minHeight: '100vh' }}>
      <div style={{ height: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
        Scroll Down — 6 Presets
      </div>

      <div style={{ display: 'grid', gap: '80px', padding: '40px', maxWidth: '600px', margin: '0 auto' }}>
        {['fadeUp', 'fadeIn', 'scaleIn', 'slideLeft', 'slideRight', 'clipReveal'].map((preset) => (
          <div key={preset}>
            <div style={{ color: 'white', marginBottom: '12px', fontFamily: 'monospace' }}>
              animation=&quot;{preset}&quot;
            </div>
            <ScrollReveal {...args} animation={preset}>
              <img src={IMAGE_URL} alt={preset} style={{ width: '100%', display: 'block' }} />
            </ScrollReveal>
          </div>
        ))}
      </div>

      <div style={{ height: '40vh' }} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '6가지 애니메이션 프리셋을 한 번에 비교합니다: fadeUp, fadeIn, scaleIn, slideLeft, slideRight, clipReveal.',
      },
    },
  },
};
