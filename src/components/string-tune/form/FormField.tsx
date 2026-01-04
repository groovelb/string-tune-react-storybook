import React, { forwardRef, type ElementType, type ComponentPropsWithoutRef } from 'react';

export interface FormFieldProps<T extends ElementType = 'div'> {
  /**
   * 렌더링할 HTML 태그
   * @default 'div'
   */
  as?: T;
  children?: React.ReactNode;
}

type PolymorphicProps<T extends ElementType> = FormFieldProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof FormFieldProps<T>>;

/**
 * FormField - 폼 필드 상태를 CSS 클래스로 제공
 *
 * StringTune의 form 모듈을 활용하여 내부 input/textarea의
 * 유효성 상태를 CSS 클래스로 제공합니다.
 * `-error`, `-valid`, `-invalid`, `-focus` 클래스가 자동으로 토글됩니다.
 */
export const FormField = forwardRef(function FormField<T extends ElementType = 'div'>(
  { as, children, ...props }: PolymorphicProps<T>,
  ref: React.ForwardedRef<Element>
) {
  const Component = as || 'div';

  return (
    <Component ref={ref} data-string="form" {...props}>
      {children}
    </Component>
  );
}) as <T extends ElementType = 'div'>(
  props: PolymorphicProps<T> & { ref?: React.ForwardedRef<Element> }
) => React.ReactElement | null;
