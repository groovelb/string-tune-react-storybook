import { ImpulseCard } from '../../components/string-tune/recipes/ImpulseCard.jsx';
import IMAGE_URL from '../../assets/alphabet/1-v.png';

const meta = {
  title: 'StringTune/Recipes/ImpulseCard',
  component: ImpulseCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '커서 움직임에 물리적으로 반응하는 카드 Recipe 컴포넌트입니다. 마우스를 움직이면 **관성 기반의 밀림(push) + 회전 효과**가 적용됩니다. 내부적으로 Impulse Wrapper를 사용하며 `--push-x`, `--push-y`, `--push-rotation` CSS 변수를 활용합니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    positionStrength: {
      description: '위치 이동 강도 (0 ~ 1)',
      control: { type: 'range', min: 0, max: 1, step: 0.05 },
    },
    rotationStrength: {
      description: '회전 강도 (0 ~ 1)',
      control: { type: 'range', min: 0, max: 1, step: 0.05 },
    },
    xMultiplier: {
      description: 'X축 transform 배율',
      control: { type: 'range', min: 0, max: 2, step: 0.1 },
    },
    yMultiplier: {
      description: 'Y축 transform 배율',
      control: { type: 'range', min: 0, max: 2, step: 0.1 },
    },
    rotationMultiplier: {
      description: '회전 transform 배율',
      control: { type: 'range', min: 0, max: 1, step: 0.05 },
    },
  },
};

export default meta;

export const Default = {
  args: {
    positionStrength: 0.5,
    rotationStrength: 0.25,
    xMultiplier: 0.5,
    yMultiplier: 1,
    rotationMultiplier: 0.25,
  },
  render: (args) => (
    <ImpulseCard {...args}>
      <img
        src={IMAGE_URL}
        alt="StringTune"
        style={{ display: 'block', width: '400px', maxWidth: '80vw', borderRadius: '12px' }}
      />
    </ImpulseCard>
  ),
  parameters: {
    docs: {
      description: {
        story: '기본 ImpulseCard. 마우스를 빠르게 움직이면 관성 기반의 밀림 + 회전 효과를 확인할 수 있습니다. (데스크탑 전용)',
      },
    },
  },
};

export const ContentCard = {
  args: {
    positionStrength: 0.3,
    rotationStrength: 0.15,
    xMultiplier: 0.3,
    yMultiplier: 0.6,
    rotationMultiplier: 0.15,
  },
  render: (args) => (
    <ImpulseCard {...args}>
      <div style={{
        width: '320px',
        maxWidth: '80vw',
        background: '#1a1a1a',
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
      }}>
        <img
          src={IMAGE_URL}
          alt="StringTune"
          style={{ display: 'block', width: '100%', height: '200px', objectFit: 'cover' }}
        />
        <div style={{ padding: '24px', color: 'white' }}>
          <div style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '8px' }}>
            Impulse Card
          </div>
          <div style={{ fontSize: '0.9rem', color: '#999', lineHeight: 1.5 }}>
            마우스 움직임에 물리적으로 반응합니다. positionStrength와 rotationStrength를 조절해보세요.
          </div>
        </div>
      </div>
    </ImpulseCard>
  ),
  parameters: {
    docs: {
      description: {
        story: '이미지 + 텍스트 카드에 부드러운 impulse 효과를 적용한 예시.',
      },
    },
  },
};
