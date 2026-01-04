import type { Meta, StoryObj } from '@storybook/react';
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
} satisfies Meta<typeof Lerp>;

export default meta;
type Story = StoryObj<typeof meta>;

const IMAGE_URL =
  'https://string-tune.fiddle.digital/images/tutorials/tutorial-image.jpg';

export const Default: Story = {
  args: {},
  render: () => (
    <div className="scroll-demo-wrapper" style={{ minHeight: '400vh' }}>
      <div className="instruction">
        Scroll up/down to see lerp effect (card tilts based on scroll direction)
      </div>

      <Lerp className="lerp-section">
        <figure className="lerp-card">
          <img src={IMAGE_URL} alt="Lerp demo" />
        </figure>
      </Lerp>

      <div className="scroll-spacer">Keep Scrolling</div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          '`--lerp` 값은 스크롤 방향에 따라 양수/음수가 됩니다. 빠르게 스크롤할수록 절대값이 커집니다. 카드의 기울기와 확대 효과에 활용했습니다.',
      },
    },
  },
};
