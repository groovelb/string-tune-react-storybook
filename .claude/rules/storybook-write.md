# StringTune Storybook 작성 규칙

이 프로젝트에서 Storybook 스토리를 작성할 때 따라야 하는 규칙입니다.

## 컴포넌트 유형 분류

### Type A: 즉시 확인 가능 (마우스 인터랙션)
- **컴포넌트**: Magnetic, Spotlight, CursorFollow, Impulse, SplitText
- **layout**: `'centered'`
- **특징**: 단순 args 전달로 데모 가능

### Type B: 스크롤 기반 (스크롤 필요)
- **컴포넌트**: RevealOnScroll, Parallax, Glide, ScrollProgress, Lerp
- **layout**: `'fullscreen'` (필수)
- **특징**: `scroll-demo-wrapper` 구조 필요

## 필수 설정

```tsx
const meta = {
  title: 'StringTune/ComponentName',
  component: ComponentName,
  tags: ['autodocs'],  // 필수: Docs 자동 생성
  parameters: {
    layout: 'fullscreen',  // Type B인 경우
    docs: {
      description: {
        component: '컴포넌트 설명',
      },
    },
  },
  argTypes: {
    // 모든 props에 description 필수
  },
};
```

## Type B 스토리 구조

```tsx
render: (args) => (
  <div className="scroll-demo-wrapper">
    <div className="instruction">Scroll to see effect</div>
    <div className="scroll-spacer">Scroll Down</div>

    {/* 데모 콘텐츠 */}
    <Component {...args}>...</Component>

    <div className="scroll-spacer">End</div>
  </div>
)
```

## CSS 변수 패턴

| 컴포넌트 | CSS 변수 | 사용 예시 |
|---------|---------|----------|
| Parallax | `--parallax` | `translateY(calc(var(--parallax) * 1px))` |
| Glide | `--glide` | `translateY(calc(var(--glide) * 1px))` |
| Magnetic | `--magnetic-x`, `--magnetic-y` | `translate(calc(var(--magnetic-x) * 0.5px), ...)` |
| Progress | `--progress` | `opacity: var(--progress)` |
| RevealOnScroll | 클래스 토글 | `.-inview` 클래스 활용 |

## 상세 가이드

전체 가이드는 `docs/storybook-write.md` 참조
