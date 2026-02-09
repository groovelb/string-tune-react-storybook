# StringTune Storybook 프로젝트

StringTune 라이브러리의 React 컴포넌트 래퍼와 Storybook 데모 프로젝트입니다.

## 프로젝트 구조

```
src/
├── string-tune-demo/              # 원본 HTML 튜토리얼 데모
│   ├── basic/                     # 기본 16개 데모
│   ├── advanced/                  # 고급 3개 데모
│   ├── typography/                # 타이포그래피 4개 데모
│   ├── layouts/                   # 레이아웃 1개 데모
│   └── specials/                  # 스페셜 1개 데모
├── components/string-tune/        # React 컴포넌트 래퍼
│   ├── provider/                  # StringTuneProvider
│   ├── scroll/                    # 스크롤 기반 컴포넌트
│   ├── cursor/                    # 커서 기반 컴포넌트
│   ├── interactive/               # 인터랙션 컴포넌트
│   ├── text/                      # 텍스트 컴포넌트
│   ├── form/                      # 폼 컴포넌트
│   └── index.js                   # 배럴 export
└── stories/string-tune/           # Storybook 스토리
    └── string-tune.css            # 데모 CSS (통합)

docs/
├── STRING-TUNE.md                 # 라이브러리 개요
├── STRING-TUNE-REACT.md           # React 통합 가이드
├── COMPONENT-LIST.md              # 컴포넌트 설계 문서
├── storybook-write.md             # Storybook 작성 가이드
└── string-tune-demo-list.md       # 데모 목록 & 매핑
```

## 변환 파이프라인

이 프로젝트의 핵심 워크플로우:

```
원본 HTML 데모 (string="xxx" 네이티브 속성)
    │
    ├─ 속성 변환: string="xxx" → data-string="xxx"
    ├─ Props 추출: string-radius="800" → radius={800}
    ▼
React 컴포넌트 (src/components/string-tune/)
    │
    ├─ 원본 HTML 구조 → JSX
    ├─ 원본 inline CSS → 스코핑된 CSS
    ▼
Storybook 스토리 (src/stories/string-tune/)
```

### 스킬 (`.claude/skills/`)
- `/analyze-demo <파일경로>` — 데모 분석 & 스펙 생성 (코드 없음, 검토용)
- `/convert-demo <파일경로>` — 데모 → 컴포넌트 + 스토리 + CSS 전체 변환

### 서브 규칙 (`.claude/rules/`)
- `component-write.md` — 컴포넌트 작성 규칙 (속성 변환, 템플릿, 배럴 export, Provider 등록)
- `storybook-write.md` — 스토리 작성 규칙 (Type A/B, title 네이밍, CSS 변수)
- `css-extraction.md` — CSS 추출 규칙 (스코핑, 섹션 번호, 공통 CSS 제외)

## 규칙

### Storybook 스토리 작성
`.claude/rules/storybook-write.md` 참조

**핵심 요약:**
- Type A (Magnetic 등): `layout: 'centered'`, 단순 args 전달
- Type B (Parallax 등): `layout: 'fullscreen'`, `scroll-demo-wrapper` 구조 필수

### 컴포넌트 작성
`.claude/rules/component-write.md` 참조

**핵심 요약:**
- 모든 props는 `data-string-*` 형태로 변환
- CSS 변수 (`--parallax`, `--magnetic-x` 등) 활용
- `as` prop으로 렌더링 태그 변경 가능
- 기본형 / 확장형(forwardRef) 템플릿 구분

### CSS 추출
`.claude/rules/css-extraction.md` 참조

**핵심 요약:**
- 원본 inline CSS → `.{component}-demo-wrapper`로 스코핑
- `string-tune.css`에 섹션 번호 순서대로 추가

## 명령어

```bash
pnpm dev          # Vite 개발 서버
pnpm storybook    # Storybook 실행
pnpm build        # 프로덕션 빌드
```

## 참고 문서

- [StringTune 공식 문서](https://string-tune.fiddle.digital)
- [Storybook 문서](https://storybook.js.org/docs)
