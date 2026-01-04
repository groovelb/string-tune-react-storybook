# StringTune

> DOM 속성 기반의 고성능 모듈러 애니메이션 엔진

## 개요

**StringTune**은 [Fiddle.Digital Design Agency](https://fiddle.digital/)에서 내부 도구로 개발되어 공개된 JavaScript 라이브러리입니다. HTML 속성을 선택자(selector)로 사용하여 애니메이션과 인터랙션 효과를 선언적으로 적용하는 **효과 엔진**입니다.

- **npm**: [@fiddle-digital/string-tune](https://www.npmjs.com/package/@fiddle-digital/string-tune)
- **Demo**: [tune-demo.fiddle.digital](https://tune-demo.fiddle.digital/)
- **Docs**: [tune.fiddle.digital](https://tune.fiddle.digital/)
- **현재 버전**: v1.1.46

---

## 라이브러리 성격

StringTune은 **UI 컴포넌트 라이브러리가 아닙니다**. 완성된 Button, Card 같은 컴포넌트를 제공하지 않으며, React 훅도 직접 제공하지 않습니다.

### 다른 라이브러리와 비교

| 유형 | 예시 | StringTune |
|------|------|:----------:|
| UI 컴포넌트 라이브러리 | MUI, Chakra UI, Ant Design | ✗ |
| React 훅 라이브러리 | Framer Motion, react-use | ✗ |
| **DOM 속성 기반 효과 엔진** | GSAP ScrollTrigger, Locomotive Scroll | ✓ |

### StringTune이 제공하는 것

| 제공함 | 제공하지 않음 |
|--------|--------------|
| 패럴랙스 **효과** | `<Button>` 컴포넌트 |
| 스크롤 진행률 **계산** | `<Card>` 컴포넌트 |
| 마그네틱 **인터랙션** | `useParallax()` 훅 |
| 커서 트래킹 **시스템** | `useScroll()` 훅 |
| CSS 변수 자동 주입 | 스타일링된 UI |

---

## 작동 원리

StringTune은 HTML 속성을 선택자로 사용하여 DOM 요소에 효과를 연결합니다.

```
┌─────────────────────────────────────────────────────────────┐
│                    StringTune 작동 흐름                      │
└─────────────────────────────────────────────────────────────┘

  1. HTML에 속성 선언
     ┌───────────────────────────────────────┐
     │ <div string="parallax">...</div>      │
     │ <div string="magnetic">...</div>      │
     └───────────────────────────────────────┘
                        │
                        ▼
  2. StringTune 엔진 시작
     ┌───────────────────────────────────────┐
     │ StringTune.getInstance().start(60)   │
     └───────────────────────────────────────┘
                        │
                        ▼
  3. 엔진이 DOM 스캔 (속성 = 선택자)
     ┌───────────────────────────────────────┐
     │ querySelectorAll('[string]')         │
     │ querySelectorAll('[data-string]')    │
     └───────────────────────────────────────┘
                        │
                        ▼
  4. 매칭된 요소에 효과 연결 & 매 프레임 업데이트
     ┌───────────────────────────────────────┐
     │ • CSS 변수 주입 (--progress 등)       │
     │ • transform 적용                      │
     │ • 이벤트 발행                         │
     └───────────────────────────────────────┘
```

### 속성의 역할

HTML 속성이 **선택자**이자 **설정값** 역할을 동시에 수행합니다:

```html
<div
  string="parallax"           <!-- 선택자: "이 요소에 parallax 효과 적용" -->
  string-parallax="0.5"       <!-- 설정: "강도는 0.5" -->
  string-id="hero"            <!-- 식별자: 이벤트 구독용 ID -->
>
  콘텐츠
</div>
```

### 효과 적용 결과

엔진이 요소를 발견하면 자동으로:

1. **CSS 변수 주입**: `--progress`, `--parallax`, `--glide` 등
2. **transform 적용**: `translate3d()`, `scale()` 등
3. **이벤트 발행**: `object:progress:hero`, `object:parallax:hero` 등

```css
/* CSS에서 주입된 변수 활용 */
.element {
  opacity: var(--progress);           /* 스크롤 진행률에 따라 투명도 변경 */
  transform: translateY(var(--parallax));  /* 패럴랙스 값 적용 */
}
```

---

## 핵심 특징

| 특징 | 설명 |
|------|------|
| **선언적 접근** | HTML 속성과 CSS 변수만으로 애니메이션 제어 (JavaScript 코드 불필요) |
| **모듈러 아키텍처** | 필요한 모듈만 선택적으로 사용하여 번들 크기 최적화 |
| **프레임워크 무관** | React, Vue, Angular, Nuxt, 순수 HTML/CSS 모두 지원 |
| **고성능** | 레이아웃 시프트와 리페인트 최소화로 높은 FPS 유지 |
| **확장 가능** | 커스텀 모듈 생성 및 기존 모듈 상속 지원 |

---

## 설치

### npm

```bash
npm install @fiddle-digital/string-tune
```

### pnpm

```bash
pnpm add @fiddle-digital/string-tune
```

### CDN

```html
<script src="https://cdn.jsdelivr.net/npm/@fiddle-digital/string-tune/dist/index.js"></script>
```

---

## 모듈 목록

StringTune은 18개의 모듈로 구성되어 있습니다.

### Core

| 모듈 | 설명 |
|------|------|
| **StringTune** | 스크롤 이벤트 처리 및 부드러운 스크롤링 (핵심 모듈) |
| **StringLoading** | 페이지 로딩 완료 감지 |

### Animation Effects

| 모듈 | 설명 |
|------|------|
| **StringParallax** | 스크롤 기반 패럴랙스 효과 (모바일에서는 비활성화) |
| **StringLerp** | 스크롤 중 부드러운 수학적 보간(interpolation) |
| **StringGlide** | 방향성 스크롤 트래킹 및 시각적 피드백 |
| **StringMagnetic** | 마우스 인터랙션 기반 마그네틱 효과 |

### UI Elements

| 모듈 | 설명 |
|------|------|
| **StringScrollbar** | 커스텀 스크롤바 |
| **StringCursor** | 커스텀 커서 인터랙션 |
| **StringSplit** | 텍스트 분할 및 애니메이션 (글자/단어 단위) |

### Performance & Media

| 모듈 | 설명 |
|------|------|
| **StringLazy** | 이미지 지연 로딩 |
| **StringVideoAutoplay** | 뷰포트 진입 시 비디오 자동 재생 |

### Tracking

| 모듈 | 설명 |
|------|------|
| **StringProgress** | 스크롤 진행률 트래킹 |
| **StringPositionTracker** | 스크롤 위치 및 방향 추적 |
| **StringFPSTracker** | 실시간 FPS 측정 |

### Utilities

| 모듈 | 설명 |
|------|------|
| **StringResponsive** | 화면 크기에 따른 동작 조정 |
| **StringAnchor** | 변환(transform)을 위한 앵커 포인트 정의 |

---

## 기본 사용법

### HTML 속성 기반 설정

StringTune의 핵심은 JavaScript 없이 HTML 속성만으로 효과를 적용하는 것입니다.

```html
<!-- Progress 트래킹 -->
<div string="progress">
  <span class="progress-value"></span>
</div>

<!-- Parallax 효과 (강도: 0.5) -->
<div string-parallax="0.5">
  <img src="background.jpg" alt="parallax image" />
</div>

<!-- 텍스트 분할 애니메이션 (글자 단위, 왼쪽에서) -->
<h1 string-split="char[left]">Hello World</h1>

<!-- 마그네틱 효과 -->
<button string-magnetic="radius:100, strength:0.5">
  Hover Me
</button>

<!-- 뷰포트 오프셋 설정 -->
<div string="progress" string-offset-top="100" string-offset-bottom="50">
  Content
</div>
```

### JavaScript 초기화

```javascript
import { StringTune, StringParallax, StringProgress } from '@fiddle-digital/string-tune';

// 모듈 등록
StringTune.register(StringParallax);
StringTune.register(StringProgress);

// 초기화 (60 FPS)
StringTune.init(60);
```

### React에서 사용

```jsx
import { useEffect } from 'react';
import { StringTune, StringParallax } from '@fiddle-digital/string-tune';

function App() {
  useEffect(() => {
    StringTune.register(StringParallax);
    StringTune.init(60);

    return () => {
      StringTune.destroy();
    };
  }, []);

  return (
    <div string-parallax="0.3">
      <h1>Parallax Content</h1>
    </div>
  );
}
```

---

## StringTune-3D 확장

3D 그래픽 통합을 위한 확장 모듈입니다. Three.js를 기반으로 합니다.

### 설치

```bash
npm install @fiddle-digital/string-tune
npm install string-tune-3d
npm install three
```

### 특징

- HTML 속성 기반 3D 오브젝트 생성
- DOM 요소와 3D 오브젝트 자동 위치 동기화
- Three.js 통합
- TypeScript 지원
- GLTF 모델 로더 내장

### 사용 예시

```html
<!-- 기본 도형 -->
<div string-3d="box" string-3d-color="#ff0000"></div>
<div string-3d="sphere" string-3d-color="#00ff00" string-3d-opacity="0.8"></div>
<div string-3d="plane" string-3d-material="standard"></div>

<!-- 3D 모델 로드 -->
<div string-3d="model" string-3d-src="/models/character.gltf" string-3d-scale="2"></div>

<!-- 조명 -->
<div string-3d="light" string-3d-intensity="1.5"></div>
```

### 3D 속성 목록

| 속성 | 설명 |
|------|------|
| `string-3d` | 오브젝트 타입 (box, sphere, plane, model, light) |
| `string-3d-color` | 오브젝트 색상 |
| `string-3d-material` | 머티리얼 타입 |
| `string-3d-opacity` | 투명도 |
| `string-3d-src` | 3D 모델 파일 경로 |
| `string-3d-scale` | 스케일 |
| `string-3d-intensity` | 조명 강도 |

### 초기화

```javascript
import { StringTune } from '@fiddle-digital/string-tune';
import { String3D, ThreeJSProvider } from 'string-tune-3d';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

// Three.js 프로바이더 설정
const provider = new ThreeJSProvider(THREE, {
  gltfLoader: GLTFLoader
});

// String3D 등록
String3D.setProvider(provider);
StringTune.register(String3D);

// 초기화
StringTune.init(60);
```

---

## 커스텀 모듈 생성

기존 모듈을 상속하여 커스텀 모듈을 만들 수 있습니다.

```javascript
import { StringModule } from '@fiddle-digital/string-tune';

class MyCustomEffect extends StringModule {
  static attribute = 'my-effect';

  constructor(element) {
    super(element);
    // 초기화 로직
  }

  onScroll(progress) {
    // 스크롤 이벤트 핸들링
    this.element.style.opacity = progress;
  }

  onResize() {
    // 리사이즈 이벤트 핸들링
  }

  destroy() {
    // 정리 로직
    super.destroy();
  }
}

// 등록
StringTune.register(MyCustomEffect);
```

---

## 성능 최적화 팁

1. **필요한 모듈만 임포트**: 사용하지 않는 모듈은 번들에서 제외
2. **적절한 FPS 설정**: 복잡한 애니메이션은 30-60 FPS 권장
3. **모바일 대응**: `StringResponsive`로 모바일에서 무거운 효과 비활성화
4. **지연 로딩 활용**: `StringLazy`로 이미지 로딩 최적화

---

## 브라우저 지원

- Chrome (최신)
- Firefox (최신)
- Safari (최신)
- Edge (최신)

---

## 참고 자료

- [npm 패키지](https://www.npmjs.com/package/@fiddle-digital/string-tune)
- [공식 데모 사이트](https://tune-demo.fiddle.digital/)
- [Codrops 소개 기사](https://tympanus.net/codrops/2025/03/19/stringtune-the-javascript-library-born-from-a-design-agencys-workflow/)
- [StringTune-3D GitHub](https://github.com/penev-palemiya/StringTune-3D)
- [jsDelivr CDN](https://www.jsdelivr.com/package/npm/@fiddle-digital/string-tune)

---

## 라이선스

MIT License
