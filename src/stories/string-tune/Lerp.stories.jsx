// Storybook imports handled by framework
import { Lerp } from '../../components/string-tune';
import './string-tune.css';

const meta = {
  title: 'StringTune/Basic/Lerp',
  component: Lerp,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          '스크롤 방향과 속도에 따른 선형 보간 값을 `--lerp` CSS 변수로 제공합니다. 스크롤 다운 시 양수, 스크롤 업 시 음수 값을 반환합니다. **스크롤해야 효과를 확인할 수 있습니다.**',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    as: {
      description: '렌더링할 HTML 태그',
      control: 'select',
      options: ['div', 'figure', 'section'],
    },
  },
};

export default meta;

const IMAGE_URL = 'https://string-tune.fiddle.digital/images/tutorials/tutorial-image.jpg';

export const Default = {
  args: {},
  render: () => (
    <div className="lerp-demo-wrapper">
      <span className="note">(Disabled on mobile devices)</span>

      <p>The surface stays still while the structure shifts underneath.</p>

      <Lerp as="figure" className="image-1">
        <img src={IMAGE_URL} alt="StringTune" />
      </Lerp>

      <h1 className="title">
        Up/<br />Down
      </h1>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          '`--lerp` 값에 따라 이미지의 polygon clip-path가 변형됩니다. 스크롤 방향과 속도에 따라 모서리가 움직이는 효과를 확인하세요.',
      },
    },
  },
};
