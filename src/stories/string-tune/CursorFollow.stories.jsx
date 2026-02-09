// Storybook imports handled by framework
import { CursorFollow } from '../../components/string-tune';
import './string-tune.css';
import img3 from '../../assets/alphabet/3-b.png';

const meta = {
  title: 'StringTune/Basic/CursorFollow',
  component: CursorFollow,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          '커서 위치를 추적하여 CSS 변수로 제공하는 컴포넌트입니다. `--x`, `--y` (즉시 좌표) 및 lerp 옵션 사용 시 부드러운 추적을 위한 보간된 좌표를 제공합니다. 타겟 모드에서는 호버 시 커서 요소에 클래스를 추가할 수 있습니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    lerp: {
      description: '커서 추적 부드러움 (0~1). 높을수록 더 부드럽게(느리게) 추적',
      control: { type: 'range', min: 0, max: 1, step: 0.1 },
    },
    cursorClass: {
      description: '호버 시 커서 요소에 추가할 클래스 (타겟 모드)',
      control: 'text',
    },
    disableTargetStyle: {
      description: '타겟 스타일 비활성화',
      control: 'boolean',
    },
    as: {
      description: '렌더링할 HTML 태그',
      control: 'select',
      options: ['div', 'span', 'figure'],
    },
  },
};

export default meta;

const IMAGE_URL = img3;

export const Default = {
  args: {
    lerp: 0.75,
  },
  render: () => (
    <div className="cursor-demo-wrapper">
      <span className="cross"></span>

      <CursorFollow className="item water -l" cursorClass="-target-1" disableTargetStyle>
        <figure>
          <img src={IMAGE_URL} alt="StringTune" />
        </figure>
        <span>Water</span>
        <figure>
          <img src={IMAGE_URL} alt="StringTune" />
        </figure>
      </CursorFollow>

      <CursorFollow className="item earth -r" cursorClass="-target-2" disableTargetStyle>
        <figure>
          <img src={IMAGE_URL} alt="StringTune" />
        </figure>
        <span>Earth</span>
        <figure>
          <img src={IMAGE_URL} alt="StringTune" />
        </figure>
      </CursorFollow>

      <CursorFollow className="item air -l" cursorClass="-target-3" disableTargetStyle>
        <figure>
          <img src={IMAGE_URL} alt="StringTune" />
        </figure>
        <span>Air</span>
        <figure>
          <img src={IMAGE_URL} alt="StringTune" />
        </figure>
      </CursorFollow>

      <CursorFollow className="item fire -r" cursorClass="-target-4" disableTargetStyle>
        <figure>
          <img src={IMAGE_URL} alt="StringTune" />
        </figure>
        <span>Fire</span>
        <figure>
          <img src={IMAGE_URL} alt="StringTune" />
        </figure>
      </CursorFollow>

      <span className="note">(Disabled on mobile devices)</span>

      <CursorFollow as="div" className="tutorial-cursor" lerp={0.75}>
        <figure className="image-1">
          <img src={IMAGE_URL} alt="StringTune" />
        </figure>
        <figure className="image-2">
          <img src={IMAGE_URL} alt="StringTune" />
        </figure>
        <figure className="image-3">
          <img src={IMAGE_URL} alt="StringTune" />
        </figure>
        <figure className="image-4">
          <img src={IMAGE_URL} alt="StringTune" />
        </figure>
      </CursorFollow>

      <CursorFollow as="div" className="tutorial-cursor-echo" lerp={0.6} />
      <CursorFollow as="div" className="tutorial-cursor-echo" lerp={0.85} />
      <CursorFollow as="div" className="tutorial-cursor-echo" lerp={0.95} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Water, Earth, Air, Fire 4개의 요소에 호버하면 커서 미리보기에 해당 이미지가 표시됩니다. 커서는 여러 레이어의 에코 효과와 함께 마우스를 부드럽게 따라다닙니다.',
      },
    },
  },
};
