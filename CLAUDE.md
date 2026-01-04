# StringTune Storybook 프로젝트

StringTune 라이브러리의 React 컴포넌트 래퍼와 Storybook 데모 프로젝트입니다.

## 프로젝트 구조

```
src/
├── components/string-tune/     # StringTune React 컴포넌트
│   ├── provider/               # StringTuneProvider
│   ├── scroll/                 # 스크롤 기반 컴포넌트
│   └── index.ts
└── stories/string-tune/        # Storybook 스토리
    └── string-tune.css         # 데모 스타일

docs/
├── STRING-TUNE.md              # 라이브러리 개요
├── STRING-TUNE-REACT.md        # React 통합 가이드
├── COMPONENT-LIST.md           # 컴포넌트 설계 문서
└── storybook-write.md          # Storybook 작성 가이드
```

## 규칙

### Storybook 스토리 작성
`.claude/rules/storybook-write.md` 참조

**핵심 요약:**
- Type A (Magnetic 등): `layout: 'centered'`, 단순 args 전달
- Type B (Parallax 등): `layout: 'fullscreen'`, `scroll-demo-wrapper` 구조 필수

### 컴포넌트 작성
- 모든 props는 `data-string-*` 형태로 변환
- CSS 변수 (`--parallax`, `--magnetic-x` 등) 활용
- `as` prop으로 렌더링 태그 변경 가능

## 명령어

```bash
pnpm dev          # Vite 개발 서버
pnpm storybook    # Storybook 실행
pnpm build        # 프로덕션 빌드
```

## 참고 문서

- [StringTune 공식 문서](https://string-tune.fiddle.digital)
- [Storybook 문서](https://storybook.js.org/docs)
