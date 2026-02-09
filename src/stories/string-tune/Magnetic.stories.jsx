// Storybook imports handled by framework
import { Magnetic } from '../../components/string-tune';
import './string-tune.css';
import img4 from '../../assets/alphabet/4-e.png';

const meta = {
  title: 'StringTune/Basic/Magnetic',
  component: Magnetic,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          '마우스 호버 시 커서 방향으로 끌리는 자석 효과 컴포넌트입니다. `--magnetic-x`, `--magnetic-y` CSS 변수를 통해 오프셋 값을 제공합니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    radius: {
      description: '반응 반경 (px). 커서가 이 범위 안에 있을 때 효과 발동',
      control: { type: 'range', min: 100, max: 1000, step: 50 },
    },
    strength: {
      description: '끌림 강도 (0 ~ 1). 높을수록 강하게 끌림',
      control: { type: 'range', min: 0, max: 1, step: 0.05 },
    },
    as: {
      description: '렌더링할 HTML 태그',
      control: 'select',
      options: ['div', 'button', 'a', 'figure'],
    },
  },
};

export default meta;

const IMAGE_URL = img4;

export const Default = {
  args: {
    radius: 800,
    strength: 0.1,
  },
  render: () => (
    <div className="magnetic-demo-wrapper">
      <Magnetic as="figure" className="image-1" radius={800} strength={0.1}>
        <img src={IMAGE_URL} alt="StringTune" />
      </Magnetic>

      <Magnetic as="figure" className="image-2" radius={800} strength={0.1}>
        <img src={IMAGE_URL} alt="StringTune" />
      </Magnetic>

      <Magnetic as="figure" className="image-3" radius={800} strength={0.1}>
        <img src={IMAGE_URL} alt="StringTune" />
      </Magnetic>

      <span className="note">(Disabled on mobile devices)</span>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          '3개의 이미지가 3D perspective로 배치되어 있습니다. 마우스를 움직이면 `--magnetic-x`, `--magnetic-y` 값에 따라 rotateX/rotateY가 적용됩니다. hover 시 이미지들이 흩어지는 scatter 효과도 확인하세요.',
      },
    },
  },
};
