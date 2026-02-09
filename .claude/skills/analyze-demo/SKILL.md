---
name: analyze-demo
description: StringTune 데모 HTML을 분석하여 변환 스펙을 생성합니다. 코드 생성 없이 분석만 수행합니다.
argument-hint: "[파일경로 또는 컴포넌트명]"
disable-model-invocation: true
allowed-tools: Read, Grep, Glob
---

# Demo 분석 & 스펙 생성

StringTune 데모 HTML을 분석하여 변환 스펙을 생성합니다.
실제 코드는 생성하지 않고 분석 결과만 제공합니다.
변환 전에 스펙을 검토하고 싶을 때 사용합니다. 실제 변환은 `/convert-demo`를 사용하세요.

## 입력

$ARGUMENTS (데모 HTML 파일 경로 또는 컴포넌트명)

## 분석 절차

1. 원본 HTML 파일을 읽는다
2. 다음 정보를 추출하여 표로 정리한다

### 1. 모듈 분석

- StringTune 모듈명 (`string="..."` 값)
- 사용된 속성 (`string-*="..."` 목록)
- 인터랙션 타입: Type A (마우스) / Type B (스크롤)
  - 판별 기준: `.claude/rules/storybook-write.md`의 유형 분류표 참조

### 2. Props 설계

| prop명 | 타입 | 기본값 | 원본 속성 | 설명 |
|--------|------|--------|----------|------|

- prop명은 camelCase
- 기본값은 원본 HTML 속성값에서 추출
- `.claude/rules/component-write.md`의 속성 변환 공식 적용

### 3. CSS 변수 분석

| 변수명 | 용도 | CSS에서 사용 위치 |
|--------|------|-----------------|

### 4. 분류 결정

- **인터랙션 타입**: Type A / Type B → 스토리 layout 결정
- **템플릿 유형**: 기본형 / 확장형(forwardRef)
  - 판별 기준: ref 전달 필요 여부, `...props` 스프레드 필요 여부
  - `.claude/rules/component-write.md`의 이중 분류 체계 참조

### 5. 파일 배치 계획

- 컴포넌트 카테고리: `scroll/` / `cursor/` / `interactive/` / `text/` / `form/`
- 컴포넌트 파일: `src/components/string-tune/{category}/{Name}.jsx`
- 스토리 파일: `src/stories/string-tune/{Name}.stories.jsx`
- 스토리 title: `StringTune/{카테고리}/{Name}`

### 6. 기존 컴포넌트와의 관계

- 유사한 기존 컴포넌트 (참고할 패턴)
- Provider MODULE_MAP에 해당 모듈이 이미 등록되어 있는지 확인
- 배럴 export에 이미 포함되어 있는지 확인

## 출력

위 분석 결과를 마크다운 표로 정리하여 사용자에게 출력한다.
사용자가 확인 후 `/convert-demo`로 실제 변환을 진행할 수 있다.
