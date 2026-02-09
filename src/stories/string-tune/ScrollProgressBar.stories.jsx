import { ScrollProgressBar } from '../../components/string-tune/recipes/ScrollProgressBar.jsx';

const meta = {
  title: 'StringTune/Recipes/ScrollProgressBar',
  component: ScrollProgressBar,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          '스크롤 진행 상태를 시각적 바로 표시하는 Recipe 컴포넌트입니다. `children`을 감싸면 해당 영역의 스크롤 진행률이 **고정 프로그레스 바**로 표시됩니다. 내부적으로 ScrollProgress Wrapper를 사용하며 `--progress` (0~1) CSS 변수를 활용합니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    color: {
      description: '프로그레스 바 색상',
      control: 'color',
    },
    position: {
      description: '바 위치',
      control: { type: 'select' },
      options: ['top', 'bottom', 'left', 'right'],
    },
    thickness: {
      description: '바 두께 (CSS 값)',
      control: 'text',
    },
    enterVp: {
      description: 'Progress 시작 뷰포트 위치',
      control: { type: 'select' },
      options: ['top', 'center', 'bottom'],
    },
    exitVp: {
      description: 'Progress 종료 뷰포트 위치',
      control: { type: 'select' },
      options: ['top', 'center', 'bottom'],
    },
  },
};

export default meta;

export const TopBar = {
  args: {
    color: '#FF5A37',
    position: 'top',
    thickness: '4px',
    enterVp: 'top',
    exitVp: 'bottom',
  },
  render: (args) => (
    <div style={{ background: '#808080' }}>
      <ScrollProgressBar {...args}>
        <div style={{ padding: '60px 40px', maxWidth: '700px', margin: '0 auto', color: 'white', lineHeight: 1.8 }}>
          <h2 style={{ marginBottom: '24px' }}>Article Title</h2>
          <p style={{ marginBottom: '16px' }}>
            Drawing was a language of thought — a way to understand motion, balance, and harmony.
            Every stroke on the paper carried intention, mapping the invisible forces that shaped the world around him.
          </p>
          <p style={{ marginBottom: '16px' }}>
            The weather in the UK is a curious experiment designed to test patience rather than provide comfort.
            It can be raining, sunny, windy, and mildly offensive within the same afternoon.
          </p>
          <p style={{ marginBottom: '16px' }}>
            Forecasts exist mostly for entertainment, umbrellas serve as emotional support,
            and any mention of "summer" should be treated as a bold rumour.
          </p>
          <p style={{ marginBottom: '16px' }}>
            Order is temporary — tension is permanent. The surface stays still while the structure shifts underneath.
            Balance is not found, it is felt. A question of weight, not of certainty.
          </p>
          <p>
            In the quiet spaces between the words, understanding forms. Not through effort, but through patience.
            The mind settles, the noise fades, and what remains is clarity — simple, unforced, and whole.
          </p>
        </div>
      </ScrollProgressBar>

      <div style={{ height: '40vh' }} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '화면 상단에 고정된 빨간색 프로그레스 바. 스크롤하면 진행 상태가 표시됩니다.',
      },
    },
  },
};

export const LeftBar = {
  args: {
    color: '#3687ff',
    position: 'left',
    thickness: '3px',
    enterVp: 'top',
    exitVp: 'bottom',
  },
  render: (args) => (
    <div style={{ background: '#808080' }}>
      <ScrollProgressBar {...args}>
        <div style={{ padding: '60px 40px 60px 60px', maxWidth: '700px', margin: '0 auto', color: 'white', lineHeight: 1.8 }}>
          <h2 style={{ marginBottom: '24px' }}>Side Progress</h2>
          <p style={{ marginBottom: '16px' }}>
            왼쪽에 세로 프로그레스 바가 표시됩니다. position prop을 left/right로 변경하면
            세로 방향의 진행률 표시가 가능합니다.
          </p>
          <p style={{ marginBottom: '16px' }}>
            Drawing was a language of thought — a way to understand motion, balance, and harmony.
            Every stroke on the paper carried intention.
          </p>
          <p style={{ marginBottom: '16px' }}>
            The weather in the UK is a curious experiment designed to test patience rather than provide comfort.
            It can be raining, sunny, windy, and mildly offensive within the same afternoon.
          </p>
          <p>
            Order is temporary — tension is permanent. The surface stays still while the structure shifts underneath.
          </p>
        </div>
      </ScrollProgressBar>

      <div style={{ height: '40vh' }} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '왼쪽에 세로 프로그레스 바를 표시하는 예시. `position="left"`로 설정.',
      },
    },
  },
};
