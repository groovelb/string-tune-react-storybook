import React, { forwardRef } from 'react';

/**
 * SplitText - 텍스트를 문자/단어/줄 단위로 분할
 * @param {Object} props
 * @param {React.ElementType} [props.as='div']
 * @param {'char'|'word'|'line'} [props.split='char'] - 분할 단위
 * @param {boolean} [props.repeat] - 뷰포트 진입 시 반복 애니메이션 여부
 * @param {React.ReactNode} [props.children]
 */
export const SplitText = forwardRef(function SplitText(
  { as, split = 'char', repeat, children, ...props },
  ref
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
});
