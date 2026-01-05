/**
 * Lerp - 스크롤 방향과 속도에 따른 선형 보간 값 제공
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {string} [props.className='']
 * @param {React.CSSProperties} [props.style]
 * @param {React.ElementType} [props.as='div']
 */
export function Lerp({
  children,
  className = '',
  style,
  as: Component = 'div',
}) {
  return (
    <Component
      data-string="lerp"
      className={className}
      style={style}
    >
      {children}
    </Component>
  );
}
