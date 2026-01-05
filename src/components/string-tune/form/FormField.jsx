import React, { forwardRef } from 'react';

/**
 * FormField - 폼 필드 상태를 CSS 클래스로 제공
 * @param {Object} props
 * @param {React.ElementType} [props.as='div']
 * @param {React.ReactNode} [props.children]
 */
export const FormField = forwardRef(function FormField(
  { as, children, ...props },
  ref
) {
  const Component = as || 'div';

  return (
    <Component ref={ref} data-string="form" {...props}>
      {children}
    </Component>
  );
});
