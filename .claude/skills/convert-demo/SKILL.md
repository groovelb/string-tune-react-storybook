---
name: convert-demo
description: StringTune 데모 HTML을 React 컴포넌트 + Storybook 스토리 + CSS로 변환합니다. 데모 파일 경로를 인자로 전달하세요.
argument-hint: "[파일경로 또는 컴포넌트명]"
disable-model-invocation: true
allowed-tools: Read, Write, Edit, Grep, Glob, Bash
---

# Demo → React 컴포넌트 변환

사용자가 StringTune 데모 HTML을 제공하면 React 컴포넌트 + Storybook 스토리 + CSS로 변환합니다.
이 스킬은 내부적으로 분석 단계를 포함하므로 `/analyze-demo`를 먼저 실행할 필요 없이 단독 사용 가능합니다.

## 입력

$ARGUMENTS (데모 HTML 파일 경로 또는 컴포넌트명)

- 파일 경로 예: `src/string-tune-demo/basic/tutorial-07-magnetic.html`
- 컴포넌트명 예: `magnetic` → `src/string-tune-demo/` 하위에서 매칭되는 파일 검색

## 프로세스

### Phase 1: 분석

1. 원본 HTML 파일 읽기
2. 추출할 정보:
   - `string="모듈명"` → React 컴포넌트의 `data-string` 값
   - `string-*` 속성 목록 → props 정의
   - CSS 변수 사용 패턴 → CSS 추출 대상
   - HTML 구조 → 스토리의 render 함수
   - 인터랙션 타입 → Type A(마우스) or Type B(스크롤)
   - 템플릿 유형 → 기본형 or 확장형(forwardRef)
3. 분석 결과를 사용자에게 요약 출력 (props 테이블, 파일 배치 계획)

### Phase 2: 컴포넌트 생성

`.claude/rules/component-write.md` 규칙에 따라:

1. 이중 분류 확인 (Type A/B × 기본형/확장형)
2. 해당 템플릿으로 React 컴포넌트 작성
3. 적절한 카테고리 폴더에 배치
4. 배럴 export 업데이트 (2곳: 카테고리 index.js + 메인 index.js)
5. (새 모듈이면) Provider MODULE_MAP 업데이트

### Phase 3: CSS 추출

`.claude/rules/css-extraction.md` 규칙에 따라:

1. 원본 HTML `<style>`에서 데모 고유 CSS 추출
2. 래퍼 클래스로 스코핑 (`.{component}-demo-wrapper`)
3. `src/stories/string-tune/string-tune.css`에 다음 섹션 번호로 추가

### Phase 4: 스토리 작성

`.claude/rules/storybook-write.md` 규칙에 따라:

1. 원본 데모의 HTML 구조를 JSX로 변환
2. `title: 'StringTune/{카테고리}/{컴포넌트명}'` 형식 준수
3. Type A → `layout: 'centered'` / Type B → `layout: 'fullscreen'` + `scroll-demo-wrapper`
4. `argTypes`에 모든 props 설명 추가
5. `tags: ['autodocs']` 포함

### Phase 5: 검증 체크리스트

아래 항목을 모두 확인한다:

- [ ] 컴포넌트의 `data-string` 값이 원본 `string` 값과 일치
- [ ] props 기본값이 원본 HTML의 속성값과 일치
- [ ] 배럴 export 2곳 (카테고리 index.js, 메인 index.js) 업데이트 완료
- [ ] (새 모듈이면) Provider MODULE_MAP 업데이트 완료
- [ ] CSS 래퍼 클래스명이 `.{component}-demo-wrapper` 패턴 준수
- [ ] 스토리 title이 `StringTune/{카테고리}/{컴포넌트명}` 형식
- [ ] 스토리 layout이 Type A/B에 맞게 설정됨
- [ ] `tags: ['autodocs']` 포함
- [ ] 이미지 URL이 `https://string-tune.fiddle.digital/images/tutorials/tutorial-image.jpg` 사용

### Phase 6: 문서 갱신

1. `docs/string-tune-demo-list.md` — 변환 완료 표시 또는 매핑 추가

## 출력 파일

- `src/components/string-tune/{category}/{ComponentName}.jsx`
- `src/components/string-tune/{category}/index.js` (업데이트)
- `src/components/string-tune/index.js` (업데이트)
- `src/stories/string-tune/{ComponentName}.stories.jsx`
- `src/stories/string-tune/string-tune.css` (섹션 추가)
- (선택) `src/components/string-tune/provider/StringTuneProvider.jsx` (새 모듈만)
