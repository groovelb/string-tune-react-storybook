// Storybook imports handled by framework
import { Parallax } from '../../components/string-tune';
import './string-tune.css';
import img1 from '../../assets/alphabet/1-v.png';
import img2 from '../../assets/alphabet/2-i.png';
import img3 from '../../assets/alphabet/3-b.png';
import img4 from '../../assets/alphabet/4-e.png';

const meta = {
  title: 'StringTune/Basic/Parallax',
  component: Parallax,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          '스크롤 시 패럴랙스 효과를 적용하는 컴포넌트입니다. `--parallax` CSS 변수를 통해 스크롤 위치에 따른 오프셋 값을 제공하며, speed로 효과의 강도를 조절합니다. **스크롤해야 효과를 확인할 수 있습니다.**',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    speed: {
      description: '패럴랙스 속도 (-1 ~ 1). 양수: 느리게, 음수: 빠르게',
      control: { type: 'range', min: -1, max: 1, step: 0.1 },
    },
    as: {
      description: '렌더링할 HTML 태그',
      control: 'select',
      options: ['div', 'figure', 'section', 'h1'],
    },
  },
};

export default meta;

export const Default = {
  args: {
    speed: 0.75,
  },
  render: () => (
    <div className="parallax-demo-wrapper">
      <span className="note">(Disabled on mobile devices)</span>

      <figure className="image-bg">
        <img src={img1} alt="V" />
      </figure>

      <Parallax as="figure" className="image-1" speed={0.75}>
        <img src={img2} alt="I" />
      </Parallax>

      <Parallax as="h1" className="title line-1" speed={-0.1}>
        Thought
      </Parallax>

      <Parallax as="h1" className="title line-2" speed={0.1}>
        String
      </Parallax>

      <Parallax as="figure" className="image-2" speed={0.4}>
        <img src={img3} alt="B" />
      </Parallax>

      <Parallax as="h1" className="title line-3" speed={-0.2}>
        Tune
      </Parallax>

      <Parallax as="figure" className="image-3" speed={-0.3}>
        <img src={img4} alt="E" />
      </Parallax>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          '배경 포함 4개 이미지와 3개 텍스트가 각각 다른 패럴랙스 속도로 배치됩니다. 스크롤하면 레이어가 다른 속도로 움직이는 깊이감을 확인하세요.',
      },
    },
  },
};
