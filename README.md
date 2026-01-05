# StringTune Storybook

> StringTune 라이브러리의 React 컴포넌트 래퍼와 인터랙티브 데모

## StringTune이란?

**StringTune**은 [Fiddle.Digital](https://fiddle.digital/)에서 개발한 DOM 속성 기반의 고성능 모듈러 애니메이션 엔진입니다. HTML 속성을 선택자로 사용하여 패럴랙스, 마그네틱, 스크롤 진행률 등 다양한 효과를 선언적으로 적용할 수 있습니다.

## 기술 스택

- **React 18** - UI 라이브러리
- **Vite** - 빌드 도구
- **Storybook 8** - 컴포넌트 문서화
- **StringTune** - 애니메이션 엔진

## 시작하기

```bash
# 의존성 설치
pnpm install

# Storybook 실행
pnpm storybook

# 개발 서버 실행
pnpm dev

# 프로덕션 빌드
pnpm build
```

## 프로젝트 구조

```
src/
├── components/string-tune/     # React 컴포넌트 래퍼
│   ├── provider/               # StringTuneProvider
│   ├── scroll/                 # 스크롤 기반 (Parallax, Glide, Lerp...)
│   ├── cursor/                 # 커서 기반 (Magnetic, Spotlight, CursorFollow)
│   ├── interactive/            # 인터랙티브 (Impulse, Sequence)
│   ├── text/                   # 텍스트 (SplitText)
│   ├── form/                   # 폼 (FormField)
│   └── index.js
│
└── stories/string-tune/        # Storybook 스토리
    ├── Essential/              # 문서 (Introduction, Modules, React Usage)
    ├── string-tune.css         # 데모 스타일
    └── *.stories.jsx           # 컴포넌트별 스토리
```

## 컴포넌트 목록

### 스크롤 기반

| 컴포넌트 | 설명 | CSS 변수 |
|---------|------|----------|
| `RevealOnScroll` | 뷰포트 진입 시 노출 | `.-inview` 클래스 토글 |
| `Parallax` | 패럴랙스 효과 | `--parallax` |
| `ScrollProgress` | 스크롤 진행률 | `--progress` (0~1) |
| `Lerp` | 스크롤 보간 | `--lerp` |
| `Glide` | 방향성 트래킹 | `--glide` |

### 커서 기반

| 컴포넌트 | 설명 | CSS 변수 |
|---------|------|----------|
| `Magnetic` | 마그네틱 효과 | `--magnetic-x`, `--magnetic-y` |
| `Spotlight` | 스포트라이트 효과 | `--spotlight-angle`, `--spotlight-distance` |
| `CursorFollow` | 커서 추적 | `--x`, `--y` |

### 텍스트 & 인터랙티브

| 컴포넌트 | 설명 |
|---------|------|
| `SplitText` | 텍스트 분할 (char/word/line) |
| `Impulse` | 클릭 파동 효과 |
| `Sequence` | 시퀀스 슬라이드 |
| `FormField` | 폼 필드 상태 관리 |

## 사용법

```jsx
import { StringTuneProvider, Parallax, Magnetic } from './components/string-tune';

function App() {
  return (
    <StringTuneProvider modules={['parallax', 'magnetic']}>
      <Parallax speed={0.5}>
        <img src="/hero.jpg" alt="Hero" />
      </Parallax>

      <Magnetic radius={400} strength={0.1}>
        <button>Hover Me</button>
      </Magnetic>
    </StringTuneProvider>
  );
}
```

## 스크립트

| 명령어 | 설명 |
|--------|------|
| `pnpm dev` | Vite 개발 서버 |
| `pnpm storybook` | Storybook 실행 (포트 6006) |
| `pnpm build` | 프로덕션 빌드 |
| `pnpm build-storybook` | Storybook 정적 빌드 |

## 관련 링크

- [StringTune npm](https://www.npmjs.com/package/@fiddle-digital/string-tune)
- [StringTune 공식 문서](https://tune.fiddle.digital/)
- [StringTune 데모](https://tune-demo.fiddle.digital/)
- [Fiddle.Digital](https://fiddle.digital/)

## 라이선스

MIT
