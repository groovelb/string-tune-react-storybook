# StringTune React Component List

StringTune 데모 기반 React 컴포넌트 설계 문서

---

## 컴포넌트 요약 테이블

| # | 컴포넌트명 | 역할 | 주요 Props | StringTune 모듈 | 복잡도 |
|---|-----------|------|-----------|----------------|--------|
| 1 | `RevealOnScroll` | 스크롤 시 요소 노출 애니메이션 | `repeat`, `threshold`, `children` | Core (InView) | 낮음 |
| 2 | `Parallax` | 패럴랙스 스크롤 효과 | `speed`, `children` | `StringParallax` | 낮음 |
| 3 | `ScrollProgress` | 스크롤 진행률 기반 애니메이션 | `enterVp`, `exitVp`, `children` | `StringProgress` | 중간 |
| 4 | `Lerp` | 스크롤 방향/속도 기반 보간 효과 | `children` | `StringLerp` | 낮음 |
| 5 | `Glide` | 스크롤 시 순차 노출 효과 | `delay`, `children` | `StringGlide` | 낮음 |
| 6 | `CursorFollow` | 커서 추적 효과 | `children` | `StringCursor` | 낮음 |
| 7 | `Magnetic` | 자석 효과 (hover 시 끌림) | `radius`, `strength`, `children` | `StringMagnetic` | 낮음 |
| 8 | `Spotlight` | 커서 기반 스포트라이트 효과 | `children` | `StringSpotlight` | 중간 |
| 9 | `Impulse` | 클릭/터치 파동 효과 | `children` | `StringImpulse` | 낮음 |
| 10 | `SplitText` | 텍스트 분할 애니메이션 | `split`, `children` | `StringSplit` | 중간 |
| 11 | `FormField` | 폼 필드 상태 관리 | `type`, `name`, `label` | `StringForm` | 중간 |
| 12 | `Sequence` | 시퀀스 슬라이드 | `name`, `index`, `children` | `StringSequence` | 높음 |

---

## 상세 컴포넌트 명세

### 1. RevealOnScroll

**소스**: `tutorial-01-reveal-on-scroll.html`

스크롤하여 뷰포트에 진입할 때 요소를 노출시키는 기본 컴포넌트.

```tsx
interface RevealOnScrollProps {
  children: React.ReactNode;
  repeat?: boolean;        // 반복 트리거 여부 (default: false)
  threshold?: number;      // 뷰포트 진입 임계값
  className?: string;
}
```

**사용된 속성**:
- `data-string` - 기본 InView 감지
- `data-string-repeat` - 반복 트리거

**CSS 클래스**: `.-inview` 클래스가 자동 토글됨

---

### 2. Parallax

**소스**: `tutorial-02-parallax.html`

패럴랙스 스크롤 효과를 제공하는 컴포넌트.

```tsx
interface ParallaxProps {
  children: React.ReactNode;
  speed?: number;          // 패럴랙스 속도 (-1 ~ 1, default: 0.5)
  className?: string;
}
```

**사용된 속성**:
- `data-string="parallax"`
- `data-string-parallax="0.75"` - 속도값

**CSS 변수**: `--parallax` (translateY에 활용)

---

### 3. ScrollProgress

**소스**: `tutorial-03-progress.html`

스크롤 진행률(0~1)을 CSS 변수로 제공하는 컴포넌트.

```tsx
interface ScrollProgressProps {
  children: React.ReactNode;
  enterVp?: 'top' | 'center' | 'bottom';   // 진입 기준점
  exitVp?: 'top' | 'center' | 'bottom';    // 이탈 기준점
  className?: string;
}
```

**사용된 속성**:
- `data-string="progress"`
- `data-string-enter-vp="top"`
- `data-string-exit-vp="bottom"`

**CSS 변수**: `--progress` (0~1 사이 값)

**활용 예시**:
```css
.element {
  scale: calc(0.5 + var(--progress) * 0.5);
  opacity: var(--progress);
}
```

---

### 4. Lerp

**소스**: `tutorial-04-lerp.html`

스크롤 방향과 속도에 따른 선형 보간 값을 제공하는 컴포넌트.

```tsx
interface LerpProps {
  children: React.ReactNode;
  className?: string;
}
```

**사용된 속성**:
- `data-string="lerp"`

**CSS 변수**: `--lerp` (음수/양수로 방향 표현)

**활용 예시**:
```css
.element {
  clip-path: polygon(
    calc(var(--lerp) * 0.25%) 0%,
    calc(100% - var(--lerp) * -0.25%) 0%,
    ...
  );
}
```

---

### 5. Glide

**소스**: `tutorial-05-glide.html`

스크롤 시 지연된 순차 노출 효과를 제공하는 컴포넌트.

```tsx
interface GlideProps {
  children: React.ReactNode;
  delay?: number;          // 지연 계수 (0 ~ 1, default: 0.5)
  className?: string;
}
```

**사용된 속성**:
- `data-string="glide"`
- `data-string-glide="0.5"` - 지연값

**CSS 변수**: `--glide`

---

### 6. CursorFollow

**소스**: `tutorial-06-cursor.html`

커서 위치를 추적하여 CSS 변수로 제공하는 컴포넌트.

```tsx
interface CursorFollowProps {
  children: React.ReactNode;
  className?: string;
}
```

**사용된 속성**:
- `data-string="cursor"`

**CSS 변수**:
- `--cursor-x` - 커서 X 좌표
- `--cursor-y` - 커서 Y 좌표

---

### 7. Magnetic

**소스**: `tutorial-07-magnetic.html`

마우스 호버 시 요소가 커서 방향으로 끌리는 자석 효과 컴포넌트.

```tsx
interface MagneticProps {
  children: React.ReactNode;
  radius?: number;         // 반응 반경 (px, default: 400)
  strength?: number;       // 끌림 강도 (0~1, default: 0.1)
  className?: string;
}
```

**사용된 속성**:
- `data-string="magnetic"`
- `data-string-radius="800"`
- `data-string-strength="0.1"`

**CSS 변수**:
- `--magnetic-x`
- `--magnetic-y`

---

### 8. Spotlight

**소스**: `tutorial-08-spotlight.html`

커서 기준 스포트라이트/그라데이션 효과를 제공하는 컴포넌트.

```tsx
interface SpotlightProps {
  children: React.ReactNode;
  className?: string;
}
```

**사용된 속성**:
- `data-string="spotlight"`

**CSS 변수**:
- `--spotlight-angle` - 커서 각도
- `--spotlight-distance` - 커서 거리

**활용 예시**:
```css
.element {
  background: conic-gradient(
    from calc(var(--spotlight-angle) * 1deg),
    #ff0000, #00ff00, #0000ff
  );
}
```

---

### 9. Impulse

**소스**: `tutorial-09-impulse.html`

클릭/터치 시 파동 효과를 생성하는 컴포넌트.

```tsx
interface ImpulseProps {
  children: React.ReactNode;
  className?: string;
}
```

**사용된 속성**:
- `data-string="impulse"`

**동작**: 클릭 시 물결 효과 요소 자동 생성

---

### 10. SplitText

**소스**: `tutorial-10-split.html`

텍스트를 문자/단어/줄 단위로 분할하여 개별 애니메이션을 적용할 수 있는 컴포넌트.

```tsx
interface SplitTextProps {
  children: string;
  split?: 'char' | 'word' | 'line';  // 분할 단위 (default: 'char')
  className?: string;
}
```

**사용된 속성**:
- `data-string="split"`
- `data-string-split="char"` - 분할 방식

**생성되는 구조**:
```html
<span class="-splitted">
  <span class="-s-line">
    <span class="-s-word">
      <span class="-s-char">H</span>
      <span class="-s-char">e</span>
      ...
    </span>
  </span>
</span>
```

---

### 11. FormField

**소스**: `tutorial-11-form.html`

폼 필드의 상태(focus, valid, filled 등)를 관리하는 컴포넌트.

```tsx
interface FormFieldProps {
  type?: 'text' | 'email' | 'password' | 'textarea';
  name: string;
  label?: string;
  required?: boolean;
  className?: string;
}
```

**사용된 속성**:
- `data-string="form"`

**상태 클래스**:
- `.-focus` - 포커스 상태
- `.-filled` - 값이 있는 상태
- `.-valid` - 유효성 검사 통과
- `.-invalid` - 유효성 검사 실패

---

### 12. Sequence (Compound Component)

**소스**: `tutorial-16-sequence.html`

슬라이드/시퀀스 기반 인터랙션을 제공하는 복합 컴포넌트.

```tsx
// 컨테이너 컴포넌트
interface SequenceProps {
  name: string;            // 시퀀스 식별자
  children: React.ReactNode;
}

// 슬라이드 컴포넌트
interface SequenceSlideProps {
  sequence: string;        // 소속 시퀀스명
  index: number;           // 슬라이드 인덱스
  children: React.ReactNode;
}

// 네비게이션 컴포넌트
interface SequenceNavProps {
  sequence: string;
  direction: 'prev' | 'next';
  children: React.ReactNode;
}
```

**사용된 속성**:
- `data-string="sequence"`
- `data-string-sequence="demo[0]"` - 시퀀스명[인덱스]
- `data-string-sequence-prev="demo"`
- `data-string-sequence-next="demo"`

---

## 구현 우선순위

### Phase 1: 기본 컴포넌트 (낮은 복잡도)

1. **RevealOnScroll** - 가장 기본적인 InView 패턴
2. **Parallax** - 단순 속성 매핑
3. **Magnetic** - 자주 사용되는 인터랙션
4. **Glide** - 단순 지연 효과

### Phase 2: 중간 복잡도 컴포넌트

5. **ScrollProgress** - 진입/이탈 옵션 처리
6. **Lerp** - CSS 변수 활용 예시 필요
7. **CursorFollow** - 좌표 기반 효과
8. **Spotlight** - 각도/거리 계산

### Phase 3: 고급 컴포넌트

9. **SplitText** - DOM 구조 변경 처리
10. **Impulse** - 동적 요소 생성
11. **FormField** - 폼 상태 관리
12. **Sequence** - 복합 컴포넌트 패턴

---

## 공통 구현 사항

### StringTuneProvider

모든 컴포넌트의 상위에 Provider 필요:

```tsx
import { useEffect, createContext, useContext } from 'react';
import { StringTune } from '@fiddle-digital/string-tune';

const StringTuneContext = createContext<StringTune | null>(null);

export function StringTuneProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const instance = StringTune.getInstance();

    // 필요한 모듈 등록
    instance.use(StringParallax);
    instance.use(StringProgress);
    instance.use(StringMagnetic);
    // ... 기타 모듈

    instance.start();

    return () => {
      instance.destroy();
    };
  }, []);

  return (
    <StringTuneContext.Provider value={StringTune.getInstance()}>
      {children}
    </StringTuneContext.Provider>
  );
}
```

### 공통 Props 인터페이스

```tsx
interface StringTuneBaseProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  as?: React.ElementType;  // 렌더링할 HTML 태그
}
```

### React 속성 변환

React에서는 `data-*` prefix 필수:

| HTML 속성 | React Props |
|----------|-------------|
| `string="parallax"` | `data-string="parallax"` |
| `string-parallax="0.5"` | `data-string-parallax="0.5"` |
| `string-repeat` | `data-string-repeat` |

---

## 디렉토리 구조 (제안)

```
src/
├── components/
│   └── string-tune/
│       ├── provider/
│       │   └── StringTuneProvider.tsx
│       ├── scroll/
│       │   ├── RevealOnScroll.tsx
│       │   ├── Parallax.tsx
│       │   ├── ScrollProgress.tsx
│       │   ├── Lerp.tsx
│       │   └── Glide.tsx
│       ├── cursor/
│       │   ├── CursorFollow.tsx
│       │   ├── Magnetic.tsx
│       │   └── Spotlight.tsx
│       ├── interactive/
│       │   ├── Impulse.tsx
│       │   └── Sequence.tsx
│       ├── text/
│       │   └── SplitText.tsx
│       ├── form/
│       │   └── FormField.tsx
│       └── index.ts
└── stories/
    └── string-tune/
        ├── RevealOnScroll.stories.tsx
        ├── Parallax.stories.tsx
        └── ...
```

---

## 참고 자료

- [StringTune 공식 문서](https://string-tune.fiddle.digital)
- [STRING-TUNE.md](./STRING-TUNE.md) - 라이브러리 개요
- [STRING-TUNE-REACT.md](./STRING-TUNE-REACT.md) - React 통합 가이드
