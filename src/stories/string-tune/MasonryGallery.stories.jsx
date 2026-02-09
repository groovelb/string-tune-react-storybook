import { MasonryGallery } from '../../components/string-tune/recipes/MasonryGallery.jsx';

const IMAGES = [
  { src: 'https://picsum.photos/582/451', alt: 'Image 1' },
  { src: 'https://picsum.photos/582/576', alt: 'Image 2' },
  { src: 'https://picsum.photos/770/587', alt: 'Image 3' },
  { src: 'https://picsum.photos/768/433', alt: 'Image 4' },
  { src: 'https://picsum.photos/728/528', alt: 'Image 5' },
  { src: 'https://picsum.photos/456/489', alt: 'Image 6' },
  { src: 'https://picsum.photos/572/419', alt: 'Image 7' },
  { src: 'https://picsum.photos/715/403', alt: 'Image 8' },
  { src: 'https://picsum.photos/703/500', alt: 'Image 9' },
  { src: 'https://picsum.photos/629/511', alt: 'Image 10' },
  { src: 'https://picsum.photos/659/467', alt: 'Image 11' },
  { src: 'https://picsum.photos/622/560', alt: 'Image 12' },
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
