import React, { forwardRef, type ElementType, type ComponentPropsWithoutRef } from 'react';

type SplitType = 'char' | 'word' | 'line';

export interface SplitTextProps<T extends ElementType = 'div'> {
  /**
   * 렌더링할 HTML 태그
   * @default 'div'
   */
  as?: T;
  /**
   * 텍스트 분할 단위
   * @default 'char'
   */
  split?: SplitType;
  /**
   * 뷰포트 진입 시 반복 애니메이션 여부
   */
  repeat?: boolean;
  children?: React.ReactNode;
}

type PolymorphicProps<T extends ElementType> = SplitTextProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof SplitTextProps<T>>;

/**
 * SplitText - 텍스트를 문자/단어/줄 단위로 분할하여 개별 애니메이션 적용
 *
 * StringTune의 split 모듈을 활용하여 텍스트를 분할합니다.
 * 각 분할된 요소에는 `-char`, `-word`, `-line` 클래스와
 * `--char-index`, `--word-index`, `--line-index` CSS 변수가 적용됩니다.
 */
export const SplitText = forwardRef(function SplitText<T extends ElementType = 'div'>(
  { as, split = 'char', repeat, children, ...props }: PolymorphicProps<T>,
  ref: React.ForwardedRef<Element>
) {
  const Component = as || 'div';

  return (
    <Component
      ref={ref}
      data-string="split"
      data-string-split={split}
      {...(repeat && { 'data-string-repeat': '' })}
      {...props}
    >
      {children}
    </Component>
  );
}) as <T extends ElementType = 'div'>(
  props: PolymorphicProps<T> & { ref?: React.ForwardedRef<Element> }
) => React.ReactElement | null;
