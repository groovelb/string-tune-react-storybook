# StringTune React 컴포넌트 작성 규칙

## 속성 변환 공식

원본 HTML의 네이티브 속성을 React data-* 속성으로 변환한다:

| 원본 (HTML) | React (data-*) | 컴포넌트 prop |
|-------------|----------------|--------------|
| `string="parallax"` | `data-string="parallax"` | (자동, 고정값) |
| `string-parallax="0.5"` | `data-string-parallax="0.5"` | `speed={0.5}` |
| `string-radius="800"` | `data-string-radius="800"` | `radius={800}` |
| `string-repeat` | `data-string-repeat=""` | `repeat={true}` |

## 이중 분류 체계

컴포넌트는 두 축으로 독립 분류된다:

### 축 1: 인터랙션 타입 (스토리 layout 결정 → storybook-write.md)

| Type A (마우스 인터랙션) | Type B (스크롤 기반) |
|---|---|
| Magnetic, Spotlight, CursorFollow, Impulse, SplitText | Parallax, Glide, Lerp, ScrollProgress, RevealOnScroll |

### 축 2: 컴포넌트 템플릿 (아래 참조)

| 기본형 | 확장형 (forwardRef) |
|---|---|
| Parallax, Glide, Lerp, ScrollProgress, RevealOnScroll, Magnetic, Spotlight | Impulse, SplitText, FormField, Sequence |

- **기본형**: props를 명시적으로 destructure, ref 불필요
- **확장형**: `forwardRef` 사용, `...props` 스프레드, ref 전달 필요

## 컴포넌트 템플릿

### 기본형

```jsx
export function ComponentName({
  children,
  propName = defaultValue,
  className = '',
  style,
  as: Component = 'div',
}) {
  return (
    <Component
      data-string="moduleName"
      data-string-propname={propName.toString()}
      className={className}
      style={style}
    >
      {children}
    </Component>
  );
}
```

### 확장형 (forwardRef)

```jsx
import { forwardRef } from 'react';

export const ComponentName = forwardRef(function ComponentName(
  { children, propName = defaultValue, as: Component = 'div', ...props },
  ref
) {
  return (
    <Component
      ref={ref}
      data-string="moduleName"
      data-string-propname={propName?.toString()}
      {...props}
    >
      {children}
    </Component>
  );
});
```

## 필수 규칙

1. **모듈명 매핑**: 원본 `string="xxx"` 값을 `data-string="xxx"`로 그대로 사용
2. **prop 네이밍**: camelCase (예: `enterVp`, `exitVp`, `positionX`)
3. **기본값**: 원본 데모의 기본값을 따름
4. **boolean prop**: `true`이면 `data-string-xxx=""`, `false`/`undefined`이면 속성 생략
5. **as prop**: 모든 컴포넌트에 `as` prop 포함 (기본값 `'div'`)

## 카테고리 분류 기준

| 카테고리 | 기준 | 예시 |
|---------|------|------|
| `scroll/` | 스크롤 위치 기반으로 CSS 변수가 변화 | Parallax, Glide, Lerp, ScrollProgress, RevealOnScroll, Magnetic |
| `cursor/` | 마우스 커서 좌표 기반 | CursorFollow, Spotlight |
| `interactive/` | 클릭/이벤트 기반 상태 전환 | Impulse, Sequence |
| `text/` | 텍스트 DOM 조작 (분할 등) | SplitText |
| `form/` | 폼 입력 상태 추적 | FormField |

## 배럴 export 업데이트 (2곳)

새 컴포넌트 추가 시 반드시 아래 2곳을 업데이트한다:

1. **카테고리 index.js** — 해당 폴더 내 export 추가
   `src/components/string-tune/{category}/index.js`

2. **메인 index.js** — 컴포넌트 파일에서 직접 export (카테고리 index 경유하지 않음)
   `src/components/string-tune/index.js`
   ```js
   // 올바른 패턴: 컴포넌트 파일을 직접 참조
   export { NewComponent } from './scroll/NewComponent.jsx';
   ```

## Provider 등록 (새 모듈인 경우에만)

기존 `MODULE_MAP`에 없는 새 StringTune 모듈을 래핑할 경우:

1. `src/components/string-tune/provider/StringTuneProvider.jsx` 열기
2. 상단 import에 모듈 추가:
   ```js
   import { StringNewModule } from '@fiddle-digital/string-tune';
   ```
3. `MODULE_MAP` 객체에 항목 추가:
   ```js
   newModule: StringNewModule,
   ```

기존 모듈(parallax, magnetic 등)의 변형 스토리를 만드는 경우 이 단계는 불필요하다.
