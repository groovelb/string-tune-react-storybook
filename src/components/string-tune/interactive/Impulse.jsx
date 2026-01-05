import React, { forwardRef } from 'react';

/**
 * Impulse - 커서 움직임에 반응하는 밀림 효과
 * @param {Object} props
 * @param {React.ElementType} [props.as='div']
 * @param {number} [props.positionX] - X축 이동 강도
 * @param {number} [props.positionY] - Y축 이동 강도
 * @param {number} [props.rotation] - 회전 강도
 * @param {React.ReactNode} [props.children]
 */
export const Impulse = forwardRef(function Impulse(
  { as, positionX, positionY, rotation, children, ...props },
  ref
) {
  const Component = as || 'div';

  // Build impulse config string
  const impulseConfig = [];
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
});
