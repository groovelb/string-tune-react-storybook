import { LerpClip } from '../../components/string-tune/recipes/LerpClip.jsx';
import IMAGE_URL from '../../assets/alphabet/5-d.png';

const meta = {
  title: 'StringTune/Recipes/LerpClip',
  component: LerpClip,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          '스크롤 속도/방향에 반응하는 clip-path 효과 Recipe 컴포넌트입니다. `clipShape` prop으로 프리셋을 선택하면 **CSS 작성 없이** `--lerp` 변수 기반의 왜곡 효과가 바로 동작합니다. 내부적으로 Lerp Wrapper를 사용합니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    clipShape: {
      description: 'clip-path 프리셋',
      control: { type: 'select' },
      options: ['diamond', 'squeeze', 'skew', 'zoom'],
    },
  },
};

export default meta;

export const Diamond = {
  args: { clipShape: 'diamond' },
  render: (args) => (
    <div style={{ background: '#808080' }}>
      <div style={{ height: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
        Scroll fast to see the effect
      </div>

      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '0 20px' }}>
        <LerpClip {...args} style={{ height: '60vh' }}>
          <img src={IMAGE_URL} alt="StringTune" />
        </LerpClip>
      </div>

      <div style={{ height: '100vh' }} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'diamond 프리셋. 빠르게 스크롤하면 4개 꼭지점이 안쪽으로 모이며 이미지가 줌됩니다. 원본 Lerp 데모와 동일한 패턴.',
      },
    },
  },
};

export const AllPresets = {
  args: {},
  render: () => (
    <div style={{ background: '#808080' }}>
      <div style={{ height: '40vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
        Scroll fast — 4 Presets
      </div>

      {['diamond', 'squeeze', 'skew', 'zoom'].map((shape) => (
        <div key={shape} style={{ maxWidth: '500px', margin: '0 auto', padding: '40px 20px' }}>
          <div style={{ color: 'white', marginBottom: '8px', fontFamily: 'monospace' }}>
            clipShape=&quot;{shape}&quot;
          </div>
          <LerpClip clipShape={shape} style={{ height: '40vh' }}>
            <img src={IMAGE_URL} alt={shape} />
          </LerpClip>
        </div>
      ))}

      <div style={{ height: '50vh' }} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '4가지 clip-path 프리셋 비교: diamond, squeeze, skew, zoom.',
      },
    },
  },
};
