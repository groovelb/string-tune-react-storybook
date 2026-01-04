# StringTune React/Next.js 통합 가이드

> React 및 Next.js 환경에서 StringTune 사용하기

## 개요

StringTune은 DOM을 직접 조작하기 때문에 React/Next.js에서는 **클라이언트 사이드 컴포넌트**에서만 사용해야 합니다. 이 문서는 React 환경에서의 설정, 사용법, 그리고 주요 모듈들의 활용 방법을 다룹니다.

- **공식 문서**: [tune.fiddle.digital/docs/nextjs](https://tune.fiddle.digital/docs/nextjs/)
- **npm**: [@fiddle-digital/string-tune](https://www.npmjs.com/package/@fiddle-digital/string-tune)

---

## 설치

```bash
# npm
npm install @fiddle-digital/string-tune

# pnpm
pnpm add @fiddle-digital/string-tune

# yarn
yarn add @fiddle-digital/string-tune
```

---

## React 속성 호환성

React/Next.js는 `string="..."` 같은 커스텀 속성을 직접 지원하지 않습니다. StringTune은 이를 위해 **두 가지 속성 형식**을 지원합니다:

| 환경 | 속성 형식 | 예시 |
|------|----------|------|
| Vue/Nuxt | 표준 속성 | `string="progress" string-id="hero"` |
| **React/Next.js** | data- 접두사 | `data-string="progress" data-string-id="hero"` |

라이브러리는 먼저 표준 속성을 확인하고, 없으면 `data-` 접두사 버전을 사용합니다.

---

## 기본 설정

### 1. 초기화 컴포넌트

```tsx
// components/StringTuneInit.tsx
'use client';

import { useEffect } from 'react';
import StringTune from '@fiddle-digital/string-tune';

export default function StringTuneInit() {
  useEffect(() => {
    const instance = StringTune.getInstance();
    instance.start(60); // 60 FPS로 시작

    return () => {
      // 클린업 (필요시)
      instance.stop();
    };
  }, []);

  return null;
}
```

### 2. 레이아웃에 포함

```tsx
// app/layout.tsx (Next.js App Router)
import StringTuneInit from '@/components/StringTuneInit';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <StringTuneInit />
        {children}
      </body>
    </html>
  );
}
```

---

## 모듈 등록 및 사용

### 모듈 Import 및 등록

```tsx
'use client';

import { useEffect } from 'react';
import StringTune, {
  StringProgress,
  StringParallax,
  StringGlide,
  StringMagnetic,
  StringLazy,
} from '@fiddle-digital/string-tune';

export default function StringTuneInit() {
  useEffect(() => {
    const stringTune = StringTune.getInstance();

    // 모듈 등록
    stringTune
      .use(StringProgress)
      .use(StringParallax)
      .use(StringGlide)
      .use(StringMagnetic)
      .use(StringLazy);

    // 시작
    stringTune.start(60);

    return () => {
      stringTune.stop();
    };
  }, []);

  return null;
}
```

---

## 주요 모듈 사용법

### StringProgress - 스크롤 진행률

요소의 뷰포트 진입부터 이탈까지의 진행률(0~1)을 추적합니다.

```tsx
// CSS 변수 --progress가 자동으로 설정됨
<section data-string="progress" data-string-id="hero-section">
  <div className="progress-indicator" />
</section>
```

```css
.progress-indicator {
  transform: scaleX(var(--progress, 0));
  transform-origin: left;
}
```

### StringParallax - 패럴랙스 효과

스크롤에 따른 깊이감 있는 움직임을 생성합니다.

```tsx
<div data-string="parallax" data-string-parallax="0.5">
  <img src="/background.jpg" alt="parallax background" />
</div>

{/* 강도 조절: 0.1 (약함) ~ 1.0 (강함) */}
<div data-string="parallax" data-string-parallax="0.2">
  느린 패럴랙스
</div>
```

### StringGlide - 스크롤 속도 기반 이동

스크롤 속도를 변위로 변환하여 부드러운 드리프트 효과를 만듭니다.

```tsx
{/* CSS 변수 --glide 및 transform이 자동 적용 */}
<div data-string="glide" data-string-id="cloud" data-string-glide="0.25">
  구름 이미지
</div>
```

**속성:**
- `data-string-glide`: 변위 배율 (기본값: 1, 0은 정지, 높을수록 큰 움직임)

### StringMagnetic - 마그네틱 효과

마우스 커서에 반응하는 마그네틱 인터랙션을 생성합니다.

```tsx
<button
  data-string="magnetic"
  data-string-magnetic="radius:150, strength:0.6"
>
  Hover Me
</button>
```

### StringProgressPart - 부분 진행률

부모 Progress의 특정 구간만 0~1로 재매핑합니다.

```tsx
{/* 부모 Progress */}
<section data-string="progress" data-string-id="story">
  긴 스토리 섹션...
</section>

{/* 부모의 35%~60% 구간을 0~1로 재매핑 */}
<div
  data-string="progress-part"
  data-string-part-of="story[0.35-0.6]"
  data-string-id="chapter-two"
>
  챕터 2 콘텐츠
</div>
```

```css
.chapter-content {
  opacity: var(--progress-slice, 0);
}
```

### StringLazy - 지연 로딩

이미지 지연 로딩을 처리합니다.

```tsx
<img
  data-string="lazy"
  data-src="/images/large-image.jpg"
  alt="Lazy loaded image"
/>
```

---

## 이벤트 시스템

StringTune은 전역 이벤트 버스를 통해 다양한 이벤트를 구독할 수 있습니다.

### 이벤트 구독

```tsx
'use client';

import { useEffect } from 'react';
import StringTune from '@fiddle-digital/string-tune';

export default function ScrollTracker() {
  useEffect(() => {
    const stringTune = StringTune.getInstance();

    // 스크롤 위치 구독
    const handleScroll = (value: number) => {
      console.log('Scroll position:', value);
    };

    stringTune.on('scroll', handleScroll);

    // 클린업
    return () => {
      stringTune.off('scroll', handleScroll);
    };
  }, []);

  return null;
}
```

### 주요 이벤트 목록

#### 시스템 이벤트

| 이벤트 | 설명 |
|--------|------|
| `scroll` | 현재 스크롤 위치 (픽셀) |
| `start` | StringTune 시작 |
| `update` | 매 프레임 업데이트 |
| `scroll:start` | 스크롤 시작 |
| `scroll:stop` | 스크롤 정지 |
| `scroll:direction:change` | 방향 변경 (true = 아래) |

#### 오브젝트 이벤트 (ID 기반)

| 이벤트 | 설명 |
|--------|------|
| `object:progress:<id>` | 진행률 (0~1) |
| `object:parallax:<id>` | Y축 변환값 |
| `object:glide:<id>` | 글라이드 변위 |
| `object:activate:<id>` | 활성화 상태 (boolean) |
| `object:inview:<id>` | 뷰포트 진입/이탈 |

#### 커서/인터랙션 이벤트

| 이벤트 | 설명 |
|--------|------|
| `cursor:move:<id>` | 포인터 이동 |
| `magnetic:move:<id>` | 마그네틱 오프셋 |

#### 반응형 이벤트

| 이벤트 | 설명 |
|--------|------|
| `screen:mobile` | 모바일 브레이크포인트 |
| `screen:tablet` | 태블릿 브레이크포인트 |
| `screen:laptop` | 랩톱 브레이크포인트 |
| `screen:desktop` | 데스크톱 브레이크포인트 |

### 특정 오브젝트 이벤트 구독

```tsx
useEffect(() => {
  const stringTune = StringTune.getInstance();

  // hero 섹션의 진행률 구독
  const handleHeroProgress = (progress: number) => {
    console.log('Hero progress:', progress);
  };

  stringTune.on('object:progress:hero', handleHeroProgress);

  return () => {
    stringTune.off('object:progress:hero', handleHeroProgress);
  };
}, []);
```

---

## Object ID 시스템

### 자동 ID vs 커스텀 ID

StringTune은 `string` 속성이 있는 요소에 자동으로 ID를 부여합니다 (`string-1`, `string-2` 등). 이벤트 구독이나 미러링이 필요하면 **커스텀 ID**를 지정하세요.

```tsx
{/* 자동 ID */}
<div data-string="progress">...</div>

{/* 커스텀 ID (권장) */}
<div data-string="progress" data-string-id="hero">...</div>
```

### ID 네이밍 규칙

- 페이지 내 고유해야 함
- kebab-case 또는 snake_case 사용
- 이벤트 구독, 미러링, CSS 셀렉터에 참조할 요소는 반드시 ID 지정

### 미러링 (Mirror)

한 오브젝트의 값을 다른 요소에 복사합니다.

```tsx
{/* 원본 */}
<div data-string="progress" data-string-id="main-progress">
  메인 콘텐츠
</div>

{/* 미러 - main-progress의 값을 복사 */}
<div data-string-copy-from="main-progress">
  진행률 표시기
</div>
```

---

## 커스텀 훅 예제

### useStringTune 훅

```tsx
// hooks/useStringTune.ts
'use client';

import { useEffect, useRef } from 'react';
import StringTune from '@fiddle-digital/string-tune';

export function useStringTuneEvent<T>(
  event: string,
  callback: (value: T) => void
) {
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  useEffect(() => {
    const stringTune = StringTune.getInstance();
    const handler = (value: T) => callbackRef.current(value);

    stringTune.on(event, handler);
    return () => stringTune.off(event, handler);
  }, [event]);
}
```

### 사용 예시

```tsx
'use client';

import { useState } from 'react';
import { useStringTuneEvent } from '@/hooks/useStringTune';

export default function ProgressDisplay() {
  const [progress, setProgress] = useState(0);

  useStringTuneEvent<number>('object:progress:hero', setProgress);

  return (
    <div className="progress-bar">
      {Math.round(progress * 100)}%
    </div>
  );
}
```

### useScrollDirection 훅

```tsx
// hooks/useScrollDirection.ts
'use client';

import { useState } from 'react';
import { useStringTuneEvent } from './useStringTune';

export function useScrollDirection() {
  const [isScrollingDown, setIsScrollingDown] = useState(true);

  useStringTuneEvent<boolean>('scroll:direction:change', setIsScrollingDown);

  return isScrollingDown ? 'down' : 'up';
}
```

---

## 전체 예제: 패럴랙스 히어로 섹션

```tsx
// components/ParallaxHero.tsx
'use client';

import { useState } from 'react';
import { useStringTuneEvent } from '@/hooks/useStringTune';
import styles from './ParallaxHero.module.css';

export default function ParallaxHero() {
  const [progress, setProgress] = useState(0);

  useStringTuneEvent<number>('object:progress:hero', setProgress);

  return (
    <section
      data-string="progress|parallax"
      data-string-id="hero"
      data-string-parallax="0.3"
      className={styles.hero}
    >
      {/* 배경 레이어 */}
      <div
        data-string="parallax"
        data-string-parallax="0.5"
        className={styles.backgroundLayer}
      >
        <img src="/hero-bg.jpg" alt="" />
      </div>

      {/* 콘텐츠 */}
      <div className={styles.content}>
        <h1
          data-string="parallax"
          data-string-parallax="0.1"
        >
          Welcome
        </h1>
        <p>Scroll progress: {Math.round(progress * 100)}%</p>
      </div>

      {/* 진행률 바 */}
      <div
        className={styles.progressBar}
        style={{ transform: `scaleX(${progress})` }}
      />
    </section>
  );
}
```

```css
/* ParallaxHero.module.css */
.hero {
  position: relative;
  min-height: 100vh;
  overflow: hidden;
}

.backgroundLayer {
  position: absolute;
  inset: -10%;
  z-index: -1;
}

.backgroundLayer img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}

.progressBar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: #007bff;
  transform-origin: left;
  z-index: 100;
}
```

---

## 트러블슈팅

### 1. 속성이 인식되지 않음

**문제**: React에서 `string="..."` 속성 사용 시 경고 발생

**해결**: `data-string="..."` 형식 사용

```tsx
// X 잘못됨
<div string="progress">

// O 올바름
<div data-string="progress">
```

### 2. 서버 사이드 렌더링 오류

**문제**: Next.js에서 `window is not defined` 오류

**해결**: `'use client'` 디렉티브 추가 및 `useEffect` 내에서 초기화

```tsx
'use client';

import { useEffect } from 'react';

export default function Component() {
  useEffect(() => {
    // StringTune 초기화는 여기서
  }, []);
}
```

### 3. 이벤트 리스너 메모리 누수

**문제**: 컴포넌트 언마운트 후에도 이벤트 리스너가 남아있음

**해결**: cleanup 함수에서 `.off()` 호출

```tsx
useEffect(() => {
  const stringTune = StringTune.getInstance();
  stringTune.on('scroll', handler);

  return () => {
    stringTune.off('scroll', handler); // 반드시 해제
  };
}, []);
```

### 4. 모바일에서 Glide/Parallax 비활성화

StringGlide는 1080px 미만에서 자동 비활성화됩니다. 필요시 `StringResponsive` 모듈로 커스텀 브레이크포인트를 설정하세요.

---

## 참고 자료

- [공식 Next.js 문서](https://tune.fiddle.digital/docs/nextjs/)
- [이벤트 시스템 문서](https://tune.fiddle.digital/docs/event-system/)
- [Object ID 문서](https://tune.fiddle.digital/docs/object-ids/)
- [StringGlide 모듈](https://tune.fiddle.digital/docs/modules/glide/)
- [StringProgressPart 모듈](https://tune.fiddle.digital/docs/modules/progress-part/)
- [npm 패키지](https://www.npmjs.com/package/@fiddle-digital/string-tune)
- [Codrops 소개 기사](https://tympanus.net/codrops/2025/03/19/stringtune-the-javascript-library-born-from-a-design-agencys-workflow/)
