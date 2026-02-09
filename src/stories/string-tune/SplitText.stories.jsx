// Storybook imports handled by framework
import { SplitText } from '../../components/string-tune';
import './string-tune.css';
import img1 from '../../assets/alphabet/1-v.png';

const meta = {
  title: 'StringTune/Basic/SplitText',
  component: SplitText,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          '텍스트를 문자/단어/줄 단위로 분할하여 개별 애니메이션을 적용합니다. 각 분할 요소에는 `--char-start`, `--word-start`, `--line-start` CSS 변수가 제공됩니다. **스크롤해야 효과를 확인할 수 있습니다.**',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    split: {
      description: '텍스트 분할 단위',
      control: 'select',
      options: ['char', 'word', 'line'],
    },
    repeat: {
      description: '뷰포트 진입 시 반복 애니메이션 여부',
      control: 'boolean',
    },
    as: {
      description: '렌더링할 HTML 태그',
      control: 'select',
      options: ['div', 'h1', 'h2', 'p', 'span'],
    },
  },
};

export default meta;

const IMAGE_URL = img1;

export const Default = {
  args: {
    split: 'char',
    repeat: true,
  },
  render: () => (
    <div className="split-demo-wrapper">
      <div className="instruction">Scroll to see split text animation</div>

      <div className="scroll-spacer">Scroll Down</div>

      <div className="split-poster">
        <figure className="image-bg">
          <img src={IMAGE_URL} alt="StringTune" />
        </figure>

        <SplitText split="char" repeat className="title shaping">
          Shaping
        </SplitText>
        <SplitText split="char" repeat className="title distinct">
          Distinct
        </SplitText>
        <SplitText split="char" repeat className="title identity">
          Identity
        </SplitText>
        <SplitText split="char" repeat className="title through">
          Through
        </SplitText>
        <SplitText split="char" repeat className="title form">
          Form
        </SplitText>
        <SplitText split="char" repeat className="title colour">
          Colour
        </SplitText>

        <p className="description">
          Exploring the balance between bold visuals and subtle details, crafting layouts that resonate.
        </p>
      </div>

      <div className="scroll-spacer">End</div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          '포스터 스타일 레이아웃에서 각 단어가 `char` 단위로 분할됩니다. `--char-start` CSS 변수를 `transition-delay`에 활용하여 순차적인 reveal 효과를 구현했습니다.',
      },
    },
  },
};
