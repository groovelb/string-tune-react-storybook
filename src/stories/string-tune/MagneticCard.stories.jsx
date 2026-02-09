import { MagneticCard } from '../../components/string-tune/recipes/MagneticCard.jsx';
import IMAGE_URL from '../../assets/alphabet/7-s.png';

const meta = {
  title: 'StringTune/Recipes/MagneticCard',
  component: MagneticCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '마우스 방향으로 3D 기울기가 적용되는 카드 Recipe 컴포넌트입니다. `children`만 전달하면 **CSS 작성 없이** perspective + 3D transform이 바로 동작합니다. 내부적으로 Magnetic Wrapper를 사용합니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    radius: {
      description: '반응 반경 (px). 커서가 이 범위 안에 있을 때 효과 발동',
      control: { type: 'range', min: 100, max: 1000, step: 50 },
    },
    strength: {
      description: '끌림 강도 (0 ~ 1). 높을수록 강하게 기울어짐',
      control: { type: 'range', min: 0, max: 1, step: 0.05 },
    },
    perspective: {
      description: 'CSS perspective 값',
      control: 'text',
    },
  },
};

export default meta;

export const ImageCard = {
  args: {
    radius: 600,
    strength: 0.15,
    perspective: '800px',
  },
  render: (args) => (
    <MagneticCard {...args}>
      <img
        src={IMAGE_URL}
        alt="StringTune"
        style={{ display: 'block', width: '360px', maxWidth: '80vw' }}
      />
    </MagneticCard>
  ),
  parameters: {
    docs: {
      description: {
        story: '이미지에 3D 기울기 효과를 적용한 예시. 마우스를 움직여보세요.',
      },
    },
  },
};

export const ContentCard = {
  args: {
    radius: 500,
    strength: 0.12,
    perspective: '1000px',
  },
  render: (args) => (
    <MagneticCard {...args}>
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
            Magnetic Card
          </div>
          <div style={{ fontSize: '0.9rem', color: '#999', lineHeight: 1.5 }}>
            Props만 전달하면 바로 동작하는 3D 카드 효과입니다. perspective, radius, strength를 조절해보세요.
          </div>
        </div>
      </div>
    </MagneticCard>
  ),
  parameters: {
    docs: {
      description: {
        story: '이미지 + 텍스트가 포함된 카드에 3D 기울기를 적용한 예시.',
      },
    },
  },
};

export const MultipleCards = {
  args: {
    radius: 500,
    strength: 0.1,
    perspective: '800px',
  },
  render: (args) => (
    <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', justifyContent: 'center', padding: '40px' }}>
      {[1, 2, 3].map((i) => (
        <MagneticCard key={i} {...args}>
          <div style={{
            width: '240px',
            background: '#222',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
          }}>
            <img
              src={IMAGE_URL}
              alt={`Card ${i}`}
              style={{ display: 'block', width: '100%', height: '160px', objectFit: 'cover' }}
            />
            <div style={{ padding: '16px', color: 'white', fontSize: '0.9rem' }}>
              Card {i}
            </div>
          </div>
        </MagneticCard>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '여러 MagneticCard를 나란히 배치한 예시. 각 카드가 독립적으로 반응합니다.',
      },
    },
  },
};
