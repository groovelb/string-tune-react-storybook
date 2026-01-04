import React, { forwardRef, type ElementType, type ComponentPropsWithoutRef } from 'react';

export interface ImpulseProps<T extends ElementType = 'div'> {
  /**
   * 렌더링할 HTML 태그
   * @default 'div'
   */
  as?: T;
  /**
   * X축 이동 강도
   */
  positionX?: number;
  /**
   * Y축 이동 강도
   */
  positionY?: number;
  /**
   * 회전 강도
   */
  rotation?: number;
  children?: React.ReactNode;
}

type PolymorphicProps<T extends ElementType> = ImpulseProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof ImpulseProps<T>>;

/**
 * Impulse - 커서 움직임에 반응하는 밀림 효과
 *
 * StringTune의 impulse 모듈을 활용하여 커서 움직임에 따라
 * 요소가 밀려나는 효과를 제공합니다.
 * `--push-x`, `--push-y`, `--push-rotation` CSS 변수를 통해
 * transform에 활용할 수 있습니다.
 */
export const Impulse = forwardRef(function Impulse<T extends ElementType = 'div'>(
  { as, positionX, positionY, rotation, children, ...props }: PolymorphicProps<T>,
  ref: React.ForwardedRef<Element>
) {
  const Component = as || 'div';

  // Build impulse config string
  const impulseConfig: string[] = [];
  if (positionX !== undefined) impulseConfig.push(`positionX: ${positionX}`);
  if (positionY !== undefined) impulseConfig.push(`positionY: ${positionY}`);
  if (rotation !== undefined) impulseConfig.push(`rotation: ${rotation}`);

  return (
    <Component
      ref={ref}
      data-string="impulse"
      {...(impulseConfig.length > 0 && {
        'data-string-impulse': impulseConfig.join(', '),
      })}
      {...props}
    >
      {children}
    </Component>
  );
}) as <T extends ElementType = 'div'>(
  props: PolymorphicProps<T> & { ref?: React.ForwardedRef<Element> }
) => React.ReactElement | null;
