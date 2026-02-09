import { MasonryGallery } from '../../components/string-tune/recipes/MasonryGallery.jsx';
import img1 from '../../assets/alphabet/1-v.png';
import img2 from '../../assets/alphabet/2-i.png';
import img3 from '../../assets/alphabet/3-b.png';
import img4 from '../../assets/alphabet/4-e.png';
import img5 from '../../assets/alphabet/5-d.png';
import img6 from '../../assets/alphabet/6-e.png';
import img7 from '../../assets/alphabet/7-s.png';
import img8 from '../../assets/alphabet/8-i.png';
import img9 from '../../assets/alphabet/9-g.png';
import img10 from '../../assets/alphabet/10-n.png';
import img11 from '../../assets/alphabet/11-l.png';
import img12 from '../../assets/alphabet/12-a.png';

const IMAGES = [
  { src: img1, alt: 'V' },
  { src: img2, alt: 'I' },
  { src: img3, alt: 'B' },
  { src: img4, alt: 'E' },
  { src: img5, alt: 'D' },
  { src: img6, alt: 'E' },
  { src: img7, alt: 'S' },
  { src: img8, alt: 'I' },
  { src: img9, alt: 'G' },
  { src: img10, alt: 'N' },
  { src: img11, alt: 'L' },
  { src: img12, alt: 'A' },
];

const meta = {
  title: 'StringTune/Recipes/MasonryGallery',
  component: MasonryGallery,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          '컨트롤 UI + emit 로직을 내장한 Masonry 갤러리 Recipe입니다. `images` 배열만 전달하면 **컬럼/모드/타이밍 컨트롤이 자동 포함**되어 바로 동작합니다. 내부적으로 StringTune Masonry 모듈을 직접 사용합니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    cols: {
      description: '초기 컬럼 수',
      control: { type: 'range', min: 2, max: 8, step: 1 },
    },
    gap: {
      description: '반응형 간격 설정 (breakpoint:gap, | 구분)',
      control: 'text',
    },
    showControls: {
      description: '컨트롤 UI 표시 여부',
      control: 'boolean',
    },
  },
};

export default meta;

export const Default = {
  args: {
    images: IMAGES,
    cols: 3,
    gap: '6|1024:8|1600:9|1920:10|2560:11',
    showControls: true,
  },
  render: (args) => (
    <div style={{ background: '#1a1a1a', minHeight: '100vh', padding: '20px 24px' }}>
      <MasonryGallery {...args} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '12개 이미지가 포함된 기본 Masonry 갤러리. 상단 컨트롤로 컬럼 수, 모드(Auto/Manual), 타이밍(Random)을 조절할 수 있습니다.',
      },
    },
  },
};

export const NoControls = {
  args: {
    images: IMAGES.slice(0, 8),
    cols: 4,
    gap: '6|1024:8|1600:9',
    showControls: false,
  },
  render: (args) => (
    <div style={{ background: '#1a1a1a', minHeight: '100vh', padding: '20px 24px' }}>
      <MasonryGallery {...args} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '`showControls={false}`로 컨트롤 UI를 숨긴 순수 갤러리 모드.',
      },
    },
  },
};
