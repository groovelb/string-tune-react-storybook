# CSS 추출 및 통합 규칙

## 원칙

원본 HTML `<style>` 블록에서 CSS를 추출하여
`src/stories/string-tune/string-tune.css`에 통합한다.

## 추출 프로세스

1. 원본 HTML의 `<style>` 블록에서 **공통 CSS**(리셋, 타이포, 그리드 시스템)는 제외
2. **데모 고유 CSS**만 추출
3. 래퍼 클래스로 스코핑: `.{component}-demo-wrapper`
4. 기존 CSS 파일의 섹션 번호 패턴을 따라 주석 추가

## 섹션 번호 결정

1. `string-tune.css` 파일에서 마지막 섹션 주석을 검색
   (패턴: `/* === N. Component Name === */` 또는 숫자가 포함된 섹션 구분선)
2. 마지막 번호 + 1 을 새 섹션 번호로 사용
3. 섹션 구분 주석 형식:
   ```css
   /* ==========================================
      14. New Component Demo
      ========================================== */
   ```

## 스코핑 규칙

```css
/* 원본 body/전체 스타일 → 래퍼에 적용 */
.newcomponent-demo-wrapper {
  /* ... */
}

/* 원본의 .element 스타일 → 래퍼 하위로 스코핑 */
.newcomponent-demo-wrapper .element {
  /* ... */
}
```

래퍼 클래스명: `{component 소문자}-demo-wrapper`
예: Magnetic → `.magnetic-demo-wrapper`, ScrollProgress → `.progress-demo-wrapper`

## CSS 변수 처리

- StringTune이 주입하는 CSS 변수(`--parallax`, `--progress` 등)는 그대로 사용
- `@property` 선언이 필요한 경우 파일 상단에 추가
- 원본의 `transform`, `opacity` 등 CSS 변수 활용 패턴을 정확히 복제

## 이미지 URL

항상 고정 URL 사용:
```
https://string-tune.fiddle.digital/images/tutorials/tutorial-image.jpg
```

## 공통 CSS 요소 (추출 제외 대상)

아래는 이미 `string-tune.css`에 포함된 공통 요소이므로 중복 추출하지 않는다:
- CSS 리셋 (`*, *::before, *::after`)
- 기본 타이포그래피 (`body`, `h1`~`h6`)
- 그리드 시스템 (`.grid-14`, `.grid-28` 등)
- 공통 유틸리티 (`.scroll-spacer`, `.instruction`)
