/**
 * Magnetic - 마우스 호버 시 커서 방향으로 끌리는 자석 효과
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {number} [props.radius=400] - 반응 반경 (px)
 * @param {number} [props.strength=0.1] - 끌림 강도 (0 ~ 1)
 * @param {string} [props.className='']
 * @param {React.CSSProperties} [props.style]
 * @param {React.ElementType} [props.as='div']
 */
export function Magnetic({
  children,
  radius = 400,
  strength = 0.1,
  className = '',
  style,
  as: Component = 'div',
}) {
  return (
    <Component
      data-string="magnetic"
      data-string-radius={radius.toString()}
      data-string-strength={strength.toString()}
      className={className}
      style={style}
    >
      {children}
    </Component>
  );
}
