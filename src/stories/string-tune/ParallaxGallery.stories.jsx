import { ParallaxGallery } from '../../components/string-tune/recipes/ParallaxGallery.jsx';
import img1 from '../../assets/alphabet/1-v.png';
import img2 from '../../assets/alphabet/2-i.png';
import img3 from '../../assets/alphabet/3-b.png';
import img4 from '../../assets/alphabet/4-e.png';
import img5 from '../../assets/alphabet/5-d.png';
import img6 from '../../assets/alphabet/6-e.png';

const DEFAULT_IMAGES = [
  { src: img1, alt: 'V' },
  { src: img2, alt: 'I' },
  { src: img3, alt: 'B' },
  { src: img4, alt: 'E' },
  { src: img5, alt: 'D' },
  { src: img6, alt: 'E' },
];

const meta = {
  title: 'StringTune/Recipes/ParallaxGallery',
  component: ParallaxGallery,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          '여러 이미지에 각각 다른 패럴랙스 속도를 적용하는 갤러리 Recipe입니다. `images` 배열만 전달하면 **속도가 자동 분배**되어 바로 동작합니다. 내부적으로 Parallax Wrapper를 사용합니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    columns: {
      description: '그리드 컬럼 수',
      control: { type: 'range', min: 1, max: 6, step: 1 },
    },
    gap: {
      description: '그리드 간격 (CSS 값)',
      control: 'text',
    },
    height: {
      description: '각 이미지 컨테이너 높이 (CSS 값)',
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
    images: DEFAULT_IMAGES,
    columns: 3,
    gap: '16px',
    height: '300px',
    scale: 1.3,
  },
  render: (args) => (
    <div style={{ background: '#808080' }}>
      <div style={{ height: '40vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
        Scroll Down
      </div>

      <div style={{ padding: '0 40px' }}>
        <ParallaxGallery {...args} />
      </div>

      <div style={{ height: '80vh' }} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '6개 이미지에 자동 분배된 패럴랙스 속도가 적용됩니다. 가운데 이미지가 가장 느리게, 양쪽 끝이 빠르게 반응합니다.',
      },
    },
  },
};

export const CustomSpeeds = {
  args: {
    images: DEFAULT_IMAGES,
    speeds: [0.8, 0.4, 0.1, 0.1, 0.4, 0.8],
    columns: 3,
    gap: '8px',
    height: '350px',
    scale: 1.4,
  },
  render: (args) => (
    <div style={{ background: '#808080' }}>
      <div style={{ height: '40vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
        Scroll Down — Custom Speeds [0.8, 0.4, 0.1, 0.1, 0.4, 0.8]
      </div>

      <div style={{ padding: '0 24px' }}>
        <ParallaxGallery {...args} />
      </div>

      <div style={{ height: '80vh' }} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '`speeds` 배열로 각 이미지의 패럴랙스 속도를 직접 지정한 예시.',
      },
    },
  },
};
