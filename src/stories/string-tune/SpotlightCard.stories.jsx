import { SpotlightCard } from '../../components/string-tune/recipes/SpotlightCard.jsx';
import IMAGE_URL from '../../assets/alphabet/3-b.png';

const meta = {
  title: 'StringTune/Recipes/SpotlightCard',
  component: SpotlightCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '커서 방향으로 빛 효과가 따라오는 카드 Recipe 컴포넌트입니다. 카드 위에 마우스를 올리면 **radial-gradient 스포트라이트**가 커서를 따라갑니다. 내부적으로 Spotlight Wrapper를 사용하며 `--spotlight-angle`과 `--spotlight-distance` CSS 변수를 활용합니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    borderRadius: {
      description: '카드 border-radius (CSS 값)',
      control: 'text',
    },
  },
};

export default meta;

export const ImageCard = {
  args: {
    borderRadius: '16px',
  },
  render: (args) => (
    <SpotlightCard {...args}>
      <img
        src={IMAGE_URL}
        alt="StringTune"
        style={{ display: 'block', width: '400px', maxWidth: '80vw', height: '280px', objectFit: 'cover' }}
      />
    </SpotlightCard>
  ),
  parameters: {
    docs: {
      description: {
        story: '이미지 위에 스포트라이트 효과. 마우스를 카드 위에서 움직여보세요. (데스크탑 전용)',
      },
    },
  },
};

export const ContentCard = {
  args: {
    borderRadius: '16px',
  },
  render: (args) => (
    <SpotlightCard {...args} style={{ background: '#1a1a1a' }}>
      <div style={{ width: '360px', maxWidth: '80vw', padding: '32px', color: 'white' }}>
        <div style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '12px' }}>
          Spotlight Card
        </div>
        <div style={{ fontSize: '0.9rem', color: '#999', lineHeight: 1.6 }}>
          마우스를 카드 위에서 움직이면 빛이 따라옵니다. SpotlightCard는 CSS 작성 없이 radial-gradient 효과를 바로 사용할 수 있습니다.
        </div>
      </div>
    </SpotlightCard>
  ),
  parameters: {
    docs: {
      description: {
        story: '다크 배경 텍스트 카드에 스포트라이트 효과를 적용한 예시.',
      },
    },
  },
};

export const MultipleCards = {
  args: {
    borderRadius: '12px',
  },
  render: (args) => (
    <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center', padding: '20px' }}>
      {[1, 2, 3].map((i) => (
        <SpotlightCard key={i} {...args} style={{ background: '#1a1a1a' }}>
          <div style={{ width: '220px', overflow: 'hidden', borderRadius: args.borderRadius }}>
            <img
              src={IMAGE_URL}
              alt={`Card ${i}`}
              style={{ display: 'block', width: '100%', height: '150px', objectFit: 'cover' }}
            />
            <div style={{ padding: '16px', color: 'white', fontSize: '0.85rem' }}>
              Card {i}
            </div>
          </div>
        </SpotlightCard>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '여러 SpotlightCard를 나란히 배치한 예시. 각 카드의 스포트라이트가 독립적으로 반응합니다.',
      },
    },
  },
};
