// Storybook imports handled by framework
import { Parallax } from '../../components/string-tune';
import './string-tune.css';

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

const IMAGE_URL = 'https://string-tune.fiddle.digital/images/tutorials/tutorial-image.jpg';

export const Default = {
  args: {
    speed: 0.75,
  },
  render: () => (
    <div className="parallax-demo-wrapper">
      <span className="note">(Disabled on mobile devices)</span>

      <figure className="image-bg">
        <img src={IMAGE_URL} alt="StringTune" />
      </figure>

      <Parallax as="figure" className="image-1" speed={0.75}>
        <img src={IMAGE_URL} alt="StringTune" />
      </Parallax>

      <Parallax as="h1" className="title line-1" speed={-0.1}>
        Thought
      </Parallax>

      <Parallax as="h1" className="title line-2" speed={0.1}>
        String
      </Parallax>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          '배경 이미지 위에 전경 이미지와 "Thought/String" 텍스트가 각각 다른 패럴랙스 속도로 배치됩니다. 스크롤하면 레이어가 다른 속도로 움직이는 깊이감을 확인하세요.',
      },
    },
  },
};
