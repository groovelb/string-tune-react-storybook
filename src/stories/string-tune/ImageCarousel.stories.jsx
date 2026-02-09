import { ImageCarousel } from '../../components/string-tune/recipes/ImageCarousel.jsx';
import img1 from '../../assets/alphabet/1-v.png';
import img2 from '../../assets/alphabet/2-i.png';
import img3 from '../../assets/alphabet/3-b.png';
import img4 from '../../assets/alphabet/4-e.png';

const IMAGES = [
  { src: img1, alt: 'V' },
  { src: img2, alt: 'I' },
  { src: img3, alt: 'B' },
  { src: img4, alt: 'E' },
];

const meta = {
  title: 'StringTune/Recipes/ImageCarousel',
  component: ImageCarousel,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '이미지 캐러셀 Recipe 컴포넌트입니다. `images` 배열만 전달하면 **네비게이션 도트 + 화살표 + clip-path 전환 애니메이션**이 바로 동작합니다. 내부적으로 Sequence + SequenceContainer Wrapper를 사용합니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    height: {
      description: '캐러셀 높이 (CSS 값)',
      control: 'text',
    },
    showDots: {
      description: '네비게이션 도트 표시 여부',
      control: 'boolean',
    },
    showArrows: {
      description: '화살표 표시 여부',
      control: 'boolean',
    },
  },
};

export default meta;

export const Default = {
  args: {
    images: IMAGES,
    height: '400px',
    showDots: true,
    showArrows: true,
  },
  render: (args) => (
    <div style={{ width: '600px', maxWidth: '90vw' }}>
      <ImageCarousel {...args} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '4개 이미지의 기본 캐러셀. 화살표로 이전/다음, 도트로 직접 이동할 수 있습니다. clip-path 기반 전환 애니메이션이 적용됩니다.',
      },
    },
  },
};

export const DotsOnly = {
  args: {
    images: IMAGES,
    height: '350px',
    showDots: true,
    showArrows: false,
  },
  render: (args) => (
    <div style={{ width: '500px', maxWidth: '90vw' }}>
      <ImageCarousel {...args} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '화살표를 숨기고 도트 네비게이션만 표시하는 예시.',
      },
    },
  },
};
