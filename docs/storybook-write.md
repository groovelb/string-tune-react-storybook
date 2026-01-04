# StringTune Storybook 작성 가이드

StringTune 컴포넌트의 Storybook 스토리 작성 규칙입니다.

---

## 기본 원칙

### 1. Autodocs 활성화
모든 스토리는 `tags: ['autodocs']`를 포함하여 Docs 탭이 자동 생성되도록 합니다.

```tsx
const meta = {
  title: 'StringTune/ComponentName',
  component: ComponentName,
  tags: ['autodocs'],
  // ...
} satisfies Meta<typeof ComponentName>;
```

### 2. 컴포넌트 설명 필수
`parameters.docs.description.component`에 컴포넌트 설명을 작성합니다.

```tsx
parameters: {
  docs: {
    description: {
      component: '컴포넌트에 대한 설명. **강조할 내용**은 볼드로.',
    },
  },
},
```

### 3. argTypes 정의
모든 props에 대해 description과 적절한 control을 정의합니다.

```tsx
argTypes: {
  propName: {
    description: 'prop 설명',
    control: { type: 'range', min: 0, max: 1, step: 0.1 },
  },
},
```

---

## 컴포넌트 유형별 작성 방법

### Type A: 즉시 확인 가능한 컴포넌트

**해당 컴포넌트**: Magnetic, Spotlight, CursorFollow, Impulse, SplitText

스크롤 없이 마우스 인터랙션만으로 효과를 확인할 수 있는 컴포넌트입니다.

#### 특징
- `layout: 'centered'` 사용 가능
- 단순한 args 전달로 데모 가능
- Docs와 Canvas 모두에서 즉시 효과 확인

#### 템플릿

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { ComponentName } from '../../components/string-tune';
import './string-tune.css';

const meta = {
  title: 'StringTune/ComponentName',
  component: ComponentName,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '컴포넌트 설명. 마우스를 올려 효과를 확인하세요.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    prop1: {
      description: 'prop1 설명',
      control: { type: 'range', min: 0, max: 100, step: 10 },
    },
  },
} satisfies Meta<typeof ComponentName>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    prop1: 50,
    className: 'demo-class',
    children: 'Demo Content',
  },
  parameters: {
    docs: {
      description: {
        story: '스토리별 추가 설명',
      },
    },
  },
};
```

#### 예시: Magnetic

```tsx
export const Default: Story = {
  args: {
    radius: 400,
    strength: 0.1,
    className: 'magnetic-demo',
    children: 'Hover me',
  },
};
```

---

### Type B: 스크롤 기반 컴포넌트

**해당 컴포넌트**: RevealOnScroll, Parallax, Glide, ScrollProgress, Lerp

스크롤 동작이 필요한 컴포넌트입니다. 특별한 레이아웃 구성이 필요합니다.

#### 특징
- `layout: 'fullscreen'` 필수
- 스크롤 가능한 wrapper 필요 (`min-height: 200vh`)
- 안내 UI (instruction) 추가 권장
- spacer 요소로 스크롤 영역 확보

#### 필수 CSS 클래스

```css
/* string-tune.css에 포함 */
.scroll-demo-wrapper {
  min-height: 200vh;
  padding: 2rem;
  background: linear-gradient(180deg, #f5f5f5 0%, #e0e0e0 100%);
}

.scroll-demo-wrapper .instruction {
  position: fixed;
  top: 1rem;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-size: 0.875rem;
  z-index: 100;
  pointer-events: none;
}

.scroll-spacer {
  height: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  font-size: 0.875rem;
}
```

#### 템플릿

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { ComponentName } from '../../components/string-tune';
import './string-tune.css';

const meta = {
  title: 'StringTune/ComponentName',
  component: ComponentName,
  parameters: {
    layout: 'fullscreen',  // 필수!
    docs: {
      description: {
        component: '컴포넌트 설명. **스크롤해야 효과를 확인할 수 있습니다.**',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    // ...
  },
} satisfies Meta<typeof ComponentName>;

export default meta;
type Story = StoryObj<typeof meta>;

const IMAGE_URL = 'https://string-tune.fiddle.digital/images/tutorials/tutorial-image.jpg';

export const Default: Story = {
  args: {
    prop1: 0.5,
  },
  render: (args) => (
    <div className="scroll-demo-wrapper">
      {/* 안내 UI */}
      <div className="instruction">
        Scroll down to see effect
      </div>

      {/* 상단 여백 */}
      <div className="scroll-spacer">Scroll Down</div>

      {/* 데모 콘텐츠 */}
      <ComponentName {...args} className="demo-class">
        <img src={IMAGE_URL} alt="Demo" />
      </ComponentName>

      {/* 중간 여백 */}
      <div className="scroll-spacer">Keep Scrolling</div>

      {/* 추가 데모 */}
      <ComponentName prop1={0.3} className="demo-class">
        <img src={IMAGE_URL} alt="Demo 2" />
      </ComponentName>

      {/* 하단 여백 */}
      <div className="scroll-spacer">End</div>
    </div>
  ),
};
```

#### 예시: Parallax

```tsx
export const Default: Story = {
  args: {
    speed: 0.5,
  },
  render: (args) => (
    <div className="scroll-demo-wrapper">
      <div className="instruction">Scroll down to see parallax effect</div>
      <div className="scroll-spacer">Scroll Down</div>

      <div className="parallax-section">
        {/* 배경 레이어 */}
        <Parallax {...args} className="parallax-bg">
          <img src={IMAGE_URL} alt="Background" />
        </Parallax>
        {/* 전경 레이어 (반대 방향) */}
        <Parallax speed={(args.speed ?? 0.5) * -0.5} className="parallax-fg">
          <h1 className="parallax-title">Parallax</h1>
        </Parallax>
      </div>

      <div className="scroll-spacer">End</div>
    </div>
  ),
};
```

---

## CSS 변수 활용 패턴

StringTune이 주입하는 CSS 변수를 활용한 스타일링:

### Parallax
```css
.parallax-element {
  transform: translateY(calc(var(--parallax, 0) * 1px));
}
```

### Glide
```css
.glide-element {
  transform: translateY(calc(var(--glide, 0) * 1px));
}
```

### Magnetic
```css
.magnetic-element {
  transform: translate(
    calc(var(--magnetic-x, 0) * 0.5px),
    calc(var(--magnetic-y, 0) * 0.5px)
  );
}
```

### Progress
```css
.progress-element {
  opacity: var(--progress, 0);
  scale: calc(0.5 + var(--progress, 0) * 0.5);
}
```

### RevealOnScroll (클래스 토글)
```css
.reveal-element img {
  opacity: 0;
  transition: opacity 1.2s ease;
}
.reveal-element.-inview img {
  opacity: 1;
}
```

---

## 체크리스트

### 스토리 작성 전
- [ ] 컴포넌트 유형 확인 (Type A / Type B)
- [ ] 필요한 CSS 클래스 정의 여부 확인
- [ ] CSS 변수 활용 방식 파악

### 스토리 작성 시
- [ ] `tags: ['autodocs']` 포함
- [ ] `parameters.docs.description.component` 작성
- [ ] `argTypes`에 모든 props 설명 추가
- [ ] Type B의 경우 `layout: 'fullscreen'` 설정
- [ ] Type B의 경우 `scroll-demo-wrapper` 구조 적용

### 스토리 작성 후
- [ ] Docs 탭에서 정상 렌더링 확인
- [ ] Canvas (Default)에서 효과 동작 확인
- [ ] Controls에서 props 변경 시 반영 확인

---

## 파일 구조

```
src/
├── components/string-tune/
│   ├── scroll/
│   │   ├── RevealOnScroll.tsx
│   │   ├── Parallax.tsx
│   │   ├── Magnetic.tsx
│   │   └── Glide.tsx
│   └── index.ts
└── stories/string-tune/
    ├── string-tune.css          # 공통 데모 스타일
    ├── RevealOnScroll.stories.tsx
    ├── Parallax.stories.tsx
    ├── Magnetic.stories.tsx
    └── Glide.stories.tsx
```
