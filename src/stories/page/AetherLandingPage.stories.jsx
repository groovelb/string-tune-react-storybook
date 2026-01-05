import React from 'react';
import AetherLandingPage from '../../pages/AetherLandingPage';

export default {
  title: 'Page/AetherLandingPage',
  component: AetherLandingPage,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
## AETHER Landing Page

브루탈리즘(Brutalism) 컨셉의 Web3 브랜드 에이전시 랜딩 페이지입니다.
StringTune의 다양한 모듈을 활용하여 과감하고 실험적인 인터랙션을 구현했습니다.

### 적용된 인터랙션
| 섹션 | 적용 기술 | 효과 |
|------|----------|------|
| **Hero** | \`SplitText\`, \`Parallax\` | 텍스트 순차 노출 및 배경 페럴랙스 |
| **Values** | \`RevealOnScroll\`, \`Glide\` | 스크롤 시 그리드 아이템 순차 노출 |
| **Portfolio** | \`Magnetic\`, \`ScrollProgress\` | 마그네틱 호버 효과 및 스크롤 진행 기반 이동 |
| **CTA** | \`Spotlight\`, \`Impulse\` | 커서 추적 스포트라이트 및 클릭 파동 효과 |
        `,
      },
    },
  },
};

export const Default = {
  render: () => <AetherLandingPage />,
};
