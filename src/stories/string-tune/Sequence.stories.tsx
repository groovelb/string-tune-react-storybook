import type { Meta, StoryObj } from '@storybook/react';
import { Sequence, SequenceContainer } from '../../components/string-tune';
import './string-tune.css';

const meta = {
  title: 'StringTune/Basic/Sequence',
  component: Sequence,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          '여러 요소의 순차적 애니메이션을 제어합니다. 같은 name을 가진 요소들이 시퀀스 그룹을 형성하며, `-active`, `-entering`, `-leaving` 클래스가 자동으로 토글됩니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    name: {
      description: '시퀀스 그룹 이름',
      control: 'text',
    },
    index: {
      description: '시퀀스 내 인덱스 (0부터 시작)',
      control: 'number',
    },
    trigger: {
      description: '트리거 모드 - 클릭 시 해당 인덱스 활성화',
      control: 'text',
    },
    as: {
      description: '렌더링할 HTML 태그',
      control: 'select',
      options: ['div', 'section', 'article', 'button'],
    },
  },
} satisfies Meta<typeof Sequence>;

export default meta;
type Story = StoryObj<typeof meta>;

const panels = [
  {
    title: 'Introduction',
    content: 'Welcome to StringTune! This library helps you create beautiful animations using simple data attributes and CSS variables.',
  },
  {
    title: 'Features',
    content: 'Scroll-based effects, cursor tracking, magnetic elements, text splitting, and much more. All controllable via CSS.',
  },
  {
    title: 'Getting Started',
    content: 'Import StringTuneProvider, wrap your app, and start adding data-string attributes to your elements.',
  },
];

export const Default: Story = {
  args: {
    name: 'tabs',
    index: 0,
  },
  render: () => (
    <div className="sequence-demo-wrapper">
      <div className="instruction">Click tabs to see sequence transitions</div>

      <div className="sequence-tabs">
        {panels.map((panel, index) => (
          <Sequence
            key={panel.title}
            as="button"
            name="demo"
            index={index}
            trigger={index}
            className="sequence-tab"
          >
            {panel.title}
          </Sequence>
        ))}
      </div>

      <SequenceContainer
        name="demo"
        activeStep={0}
        enteringDuration={50}
        leavingDuration={400}
        className="sequence-panels"
      >
        {panels.map((panel, index) => (
          <Sequence
            key={panel.title}
            name="demo"
            index={index}
            className="sequence-panel"
          >
            <h3>{panel.title}</h3>
            <p>{panel.content}</p>
          </Sequence>
        ))}
      </SequenceContainer>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          '탭과 패널로 구성된 시퀀스 예제입니다. 탭 클릭 시 해당 패널이 활성화되고, 이전 패널은 `-leaving`, 새 패널은 `-entering` 상태를 거쳐 `-active`가 됩니다.',
      },
    },
  },
};
