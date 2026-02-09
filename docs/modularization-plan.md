# StringTune 컴포넌트 모듈화 계획

## 목적

바이브 코딩을 배운 디자이너들이 StringTune 엔진 전체를 이해하지 않고도,
**컴포넌트 import → props 전달 → 바로 동작**하는 환경을 만든다.

---

## 현황 분석

### 문제: 전부 thin wrapper

현재 13개 컴포넌트 모두 `props → string-* 속성 매핑`만 수행한다.
실제 시각 효과를 보려면 CSS 변수(`--parallax`, `--progress` 등)를 활용하는
별도 CSS를 디자이너가 직접 작성해야 한다.

```
현재: <Parallax speed={0.5}>{children}</Parallax> + 별도 CSS 필수
목표: <ParallaxImage src="..." speed={0.5} /> → 바로 동작
```

### 컴포넌트별 현황

| 컴포넌트 | 바로 사용 가능? | 문제점 |
|---------|:---:|--------|
| Parallax | X | `--parallax` CSS 변수로 transform 직접 작성 필요 |
| Glide | X | `--glide` CSS 변수 + delay 조합 이해 필요 |
| Lerp | X | `--lerp` (속도 기반) + clip-path 계산 필요 |
| ScrollProgress | X | `--progress` (0~1) + CSS 활용법 필요 |
| RevealOnScroll | △ | `-inview` 클래스 단순하나 애니메이션 CSS 필요 |
| Magnetic | X | `--magnetic-x/y` + 3D transform 지식 필요 |
| CursorFollow | X | target/follower 이중 모드, `--x/--y` CSS 필요 |
| Spotlight | X | 삼각함수 기반 angle/distance 계산 필요 |
| Impulse | X | `--push-x/y/rotation` + 레이어 구조 필요 |
| Sequence | X | Sequence + SequenceContainer 2개 조합 필요 |
| SplitText | △ | split 자체는 단순, 애니메이션은 CSS 필요 |
| FormField | △ | 상태 클래스 자동, 스타일링은 CSS 필요 |
| Masonry | X | React 우회 필수, emit 직접 호출 필요 |

### 모범 사례: TextWithProgress

```jsx
// 디자이너가 이것만 알면 된다
<TextProgressRecipe text="..." enterVp="top" exitVp="bottom" />
```

내부에서 ScrollProgress + SplitText를 조합하고 CSS도 내장.
**이 패턴을 모든 효과에 적용하는 것이 목표.**

---

## 3단계 컴포넌트 체계

### Level 1 — Wrapper (기존 유지, 수정 없음)

- **역할**: StringTune 속성을 React props로 매핑
- **대상**: 기존 13개 컴포넌트 전부
- **용도**: 고급 사용자가 자유롭게 조합
- **변경사항**: 없음 (기존 코드 그대로)

```jsx
// Level 1 — 고급 사용자용
<Parallax speed={0.5} className="my-custom-class">
  <img src="..." style={{ transform: 'translateY(calc(var(--parallax) * 100px))' }} />
</Parallax>
```

### Level 2 — Recipe 컴포넌트 (새로 생성)

- **역할**: Wrapper + 기본 CSS + 기본 HTML 구조를 내장
- **대상**: 각 데모/효과별 1개씩
- **용도**: 디자이너가 props만으로 바로 사용

```jsx
// Level 2 — 디자이너용
<ParallaxImage src="hero.jpg" alt="Hero" speed={0.5} />
```

#### 생성 조건

1. **children 대신 명시적 props** (src, text, items 등)
2. **CSS를 컴포넌트 내부에 내장** (inline style 또는 CSS Module)
3. **외부 CSS 파일 의존 없이 독립 작동**
4. **Storybook에서 args만 바꿔서 바로 확인 가능**
5. **내부적으로 Level 1 Wrapper를 import해서 사용**
6. **기존 Wrapper의 동작을 절대 변경하지 않음**

### Level 3 — Hook (특수 케이스)

- **역할**: StringTune 인스턴스 접근, 이벤트 emit/on
- **대상**: 명령형 조작이 필요한 경우 (Masonry 컨트롤, Sequence 네비게이션)

```jsx
// Level 3 — 명령형 조작이 필요할 때
const { emit } = useStringTuneEvent();
emit('masonry:update:gallery', { cols: 4 });
```

#### 생성 조건

1. **Provider 버그 수정 후 사용** (useRef → useState)
2. **또는 StringTune.getInstance() 직접 래핑**
3. **Recipe 컴포넌트 내부에서만 사용, 디자이너에게 노출하지 않음**

---

## 생성할 Recipe 컴포넌트 목록

| Recipe 컴포넌트 | 조합하는 Wrapper | 핵심 Props | 내장하는 것 |
|---|---|---|---|
| `ParallaxImage` | Parallax | `src`, `alt`, `speed`, `height` | transform CSS, 이미지 구조 |
| `ParallaxGallery` | Parallax x N | `images[]`, `speeds[]` | 그리드 레이아웃 + 다중 패럴랙스 |
| `GlideGallery` | Glide x N | `images[]`, `stagger` | 시차 delay 자동 계산 |
| `ScrollReveal` | RevealOnScroll | `children`, `animation`, `delay` | fadeUp/fadeIn/scaleIn 프리셋 CSS |
| `ScrollProgressBar` | ScrollProgress | `color`, `position`, `thickness` | 프로그레스 바 UI 내장 |
| `TextWithProgress` | ScrollProgress + SplitText | `text`, `enterVp`, `exitVp` | **이미 존재 (모범 사례)** |
| `MagneticCard` | Magnetic | `children`, `radius`, `intensity` | 3D transform + perspective 내장 |
| `SpotlightCard` | Spotlight | `children` | 그라데이션 spotlight 효과 내장 |
| `ImpulseCard` | Impulse | `children`, `intensity` | push transform 내장 |
| `ImageCarousel` | Sequence + SequenceContainer | `images[]`, `autoPlay`, `interval` | 네비게이션 + 전환 애니메이션 내장 |
| `MasonryGallery` | Masonry + MasonryItem | `images[]`, `cols`, `gap` | 컨트롤 UI + emit 로직 내장 |
| `LerpClip` | Lerp | `children`, `clipShape` | clip-path 프리셋 내장 |
| `FormInput` | FormField | `label`, `type`, `required`, `errorMsg` | 검증 스타일 내장 |

---

## 생성할 Hook 목록

| Hook | 용도 | 사용처 |
|---|---|---|
| `useStringTuneEvent` | emit/on 래핑 | MasonryGallery, ImageCarousel 내부 |

---

## 파일 구조

```
src/components/string-tune/
├── scroll/                      ← Level 1 (기존 유지, 수정 없음)
│   ├── Parallax.jsx
│   ├── Glide.jsx
│   ├── Lerp.jsx
│   ├── ScrollProgress.jsx
│   ├── RevealOnScroll.jsx
│   ├── Magnetic.jsx
│   └── index.js
├── cursor/                      ← Level 1 (기존 유지, 수정 없음)
│   ├── CursorFollow.jsx
│   ├── Spotlight.jsx
│   └── index.js
├── interactive/                 ← Level 1 (기존 유지, 수정 없음)
│   ├── Impulse.jsx
│   ├── Sequence.jsx
│   └── index.js
├── text/                        ← Level 1 (기존 유지, 수정 없음)
│   ├── SplitText.jsx
│   └── index.js
├── form/                        ← Level 1 (기존 유지, 수정 없음)
│   ├── FormField.jsx
│   └── index.js
├── layouts/                     ← Level 1 (기존 유지, 수정 없음)
│   ├── Masonry.jsx
│   └── index.js
├── provider/                    ← 버그 수정만 (useRef → useState)
│   └── StringTuneProvider.jsx
├── recipes/                     ← Level 2 (새로 생성)
│   ├── ParallaxImage.jsx
│   ├── ParallaxGallery.jsx
│   ├── GlideGallery.jsx
│   ├── ScrollReveal.jsx
│   ├── ScrollProgressBar.jsx
│   ├── MagneticCard.jsx
│   ├── SpotlightCard.jsx
│   ├── ImpulseCard.jsx
│   ├── ImageCarousel.jsx
│   ├── MasonryGallery.jsx
│   ├── LerpClip.jsx
│   ├── FormInput.jsx
│   └── index.js
├── hooks/                       ← Level 3 (새로 생성)
│   ├── useStringTuneEvent.js
│   └── index.js
└── index.js                     ← 기존 export 유지 + 새 export 추가
```

---

## Storybook 구조

```
src/stories/string-tune/
├── Parallax.stories.jsx              ← 기존 유지 (Wrapper 데모)
├── ...                               ← 기존 스토리 전부 유지
├── ParallaxImage.stories.jsx         ← 새로 추가 (Recipe 데모)
├── ScrollReveal.stories.jsx          ← 새로 추가
├── MagneticCard.stories.jsx          ← 새로 추가
└── ...
```

Storybook title 네이밍:
- 기존 Wrapper: `StringTune/Basic/Parallax` (변경 없음)
- 새 Recipe: `StringTune/Recipes/ParallaxImage`

---

## 기존 동작 영향 검증

### 변경되는 파일

| 파일 | 변경 내용 | 위험도 |
|---|---|---|
| `provider/StringTuneProvider.jsx` | useRef → useState (버그 수정) | **없음** — useStringTune() 현재 어디서도 사용 안 함 |
| `index.js` | 새 export 추가 (additive) | **없음** — 기존 named export 그대로 |

### 변경되지 않는 파일

- 기존 Wrapper 컴포넌트 13개: **수정 없음**
- 기존 Story 파일 전부: **수정 없음**
- 기존 CSS (`string-tune.css`): **수정 없음**
- `.storybook/preview.jsx`: **수정 없음**

### 검증 결과

- `useStringTune()` 훅: 전체 코드베이스에서 **0회 사용** → Provider 수정 안전
- 기존 story import 경로: 전부 `../../components/string-tune` → 새 폴더 추가와 무관
- 기존 export 순서: named export만 사용 → 순서 무관

**결론: 계획은 순수 추가(additive)이며, 기존 동작에 영향 없음.**

---

## 실행 우선순위

### Phase 1: 기반 작업

1. Provider 버그 수정 (useRef → useState)
2. `useStringTuneEvent` 훅 생성
3. `recipes/`, `hooks/` 폴더 + barrel export 구성

### Phase 2: 핵심 Recipe (가장 자주 쓸 것)

4. `ScrollReveal` — 가장 단순하고 활용도 높음
5. `ParallaxImage` — 시각적 임팩트 큼
6. `MagneticCard` — 인터랙션 효과 대표

### Phase 3: 갤러리/조합형 Recipe

7. `ParallaxGallery`
8. `GlideGallery`
9. `MasonryGallery`

### Phase 4: 고급 Recipe

10. `ImageCarousel` (Sequence 기반)
11. `LerpClip`
12. `SpotlightCard`
13. `ImpulseCard`
14. `ScrollProgressBar`
15. `FormInput`
