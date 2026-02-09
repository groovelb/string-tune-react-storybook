// Storybook imports handled by framework
import { ScrollProgress } from '../../components/string-tune';
import './string-tune.css';
import img12 from '../../assets/alphabet/12-a.png';

const meta = {
  title: 'StringTune/Basic/ScrollProgress',
  component: ScrollProgress,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          '스크롤 진행률(0~1)을 `--progress` CSS 변수로 제공하는 컴포넌트입니다. 요소가 뷰포트를 통과하는 동안의 진행 상태를 추적합니다. **스크롤해야 효과를 확인할 수 있습니다.**',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    enterVp: {
      description: '진입 뷰포트 기준점 (요소가 이 지점에 도달하면 0)',
      control: 'select',
      options: ['top', 'center', 'bottom'],
    },
    exitVp: {
      description: '이탈 뷰포트 기준점 (요소가 이 지점을 벗어나면 1)',
      control: 'select',
      options: ['top', 'center', 'bottom'],
    },
    as: {
      description: '렌더링할 HTML 태그',
      control: 'select',
      options: ['div', 'section', 'article'],
    },
  },
};

export default meta;

const IMAGE_URL = img12;

export const Default = {
  args: {
    enterVp: 'top',
    exitVp: 'bottom',
  },
  render: (args) => (
    <ScrollProgress {...args} className="progress-demo-wrapper">
      <p>Drawing was a language of thought — a way to understand motion, balance, and harmony.</p>

      <figure className="image-1">
        <img src={IMAGE_URL} alt="StringTune" />
      </figure>

      <span className="line"></span>

      <h1 className="title">Balance</h1>
    </ScrollProgress>
  ),
  parameters: {
    docs: {
      description: {
        story:
          '"Balance" 타이틀과 함께 이미지가 스크롤에 따라 scale과 clip-path가 변화합니다. `--progress` CSS 변수가 0에서 1로 변화하며 애니메이션을 구동합니다.',
      },
    },
  },
};
