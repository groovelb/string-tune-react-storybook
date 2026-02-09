import { GlideGallery } from '../../components/string-tune/recipes/GlideGallery.jsx';
import img1 from '../../assets/alphabet/1-v.png';
import img2 from '../../assets/alphabet/2-i.png';
import img3 from '../../assets/alphabet/3-b.png';
import img4 from '../../assets/alphabet/4-e.png';
import img5 from '../../assets/alphabet/5-d.png';

const DEFAULT_IMAGES = [
  { src: img1, alt: 'V' },
  { src: img2, alt: 'I' },
  { src: img3, alt: 'B' },
  { src: img4, alt: 'E' },
  { src: img5, alt: 'D' },
];

const meta = {
  title: 'StringTune/Recipes/GlideGallery',
  component: GlideGallery,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          '여러 이미지에 시차 지연(stagger)을 자동 적용하는 갤러리 Recipe입니다. 가운데 이미지가 가장 먼저 반응하고, 양쪽 끝이 늦게 반응하는 **대칭 delay가 자동 계산**됩니다. 내부적으로 Glide Wrapper를 사용합니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    columns: {
      description: '그리드 컬럼 수',
      control: { type: 'range', min: 2, max: 8, step: 1 },
    },
    gap: {
      description: '그리드 간격 (CSS 값)',
      control: 'text',
    },
    height: {
      description: '각 이미지 높이 (CSS 값)',
      control: 'text',
    },
  },
};

export default meta;

export const Default = {
  args: {
    images: DEFAULT_IMAGES,
    columns: 5,
    gap: '8px',
    height: '60vh',
  },
  render: (args) => (
    <div style={{ background: '#808080', minHeight: '100vh' }}>
      <div style={{ padding: '40px', textAlign: 'center', color: 'white' }}>
        <span style={{ fontSize: '0.7rem', textTransform: 'uppercase' }}>(Disabled on mobile devices)</span>
        <p style={{ marginTop: '16px' }}>Order is temporary — tension is permanent.</p>
      </div>

      <GlideGallery {...args} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '5개 이미지에 대칭 delay (1.0, 0.5, 0.0, 0.5, 1.0)가 자동 적용됩니다. 원본 Glide 데모와 동일한 패턴.',
      },
    },
  },
};

export const SevenColumns = {
  args: {
    images: [
      { src: img1, alt: 'V' },
      { src: img2, alt: 'I' },
      { src: img3, alt: 'B' },
      { src: img4, alt: 'E' },
      { src: img5, alt: 'D' },
      { src: img1, alt: 'V' },
      { src: img2, alt: 'I' },
    ],
    columns: 7,
    gap: '6px',
    height: '50vh',
  },
  render: (args) => (
    <div style={{ background: '#808080', minHeight: '100vh' }}>
      <div style={{ padding: '40px', textAlign: 'center', color: 'white' }}>
        7 columns with auto-calculated stagger delays
      </div>

      <GlideGallery {...args} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '7컬럼 갤러리. 이미지 수가 달라져도 delay가 자동으로 대칭 계산됩니다.',
      },
    },
  },
};

export const CustomDelays = {
  args: {
    images: DEFAULT_IMAGES,
    delays: [0.0, 0.2, 0.4, 0.6, 0.8],
    columns: 5,
    gap: '8px',
    height: '60vh',
  },
  render: (args) => (
    <div style={{ background: '#808080', minHeight: '100vh' }}>
      <div style={{ padding: '40px', textAlign: 'center', color: 'white' }}>
        Custom delays: [0.0, 0.2, 0.4, 0.6, 0.8] — left to right cascade
      </div>

      <GlideGallery {...args} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '`delays` 배열로 왼쪽에서 오른쪽으로 순차적인 캐스케이드 효과를 직접 지정한 예시.',
      },
    },
  },
};
