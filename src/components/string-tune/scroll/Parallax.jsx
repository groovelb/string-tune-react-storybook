/**
 * Parallax - 스크롤 시 패럴랙스 효과
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {number} [props.speed=0.5] - 패럴랙스 속도 (-1 ~ 1)
 * @param {string} [props.className='']
 * @param {React.CSSProperties} [props.style]
 * @param {React.ElementType} [props.as='div']
 */
export function Parallax({
  children,
  speed = 0.5,
  className = '',
  style,
  as: Component = 'div',
}) {
  return (
    <Component
      data-string="parallax"
      data-string-parallax={speed.toString()}
      className={className}
      style={style}
    >
      {children}
    </Component>
  );
}
