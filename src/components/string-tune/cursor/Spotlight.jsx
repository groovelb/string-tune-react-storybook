/**
 * Spotlight - 커서 기반 스포트라이트 효과
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {string} [props.className='']
 * @param {React.CSSProperties} [props.style]
 * @param {React.ElementType} [props.as='div']
 */
export function Spotlight({
  children,
  className = '',
  style,
  as: Component = 'div',
}) {
  return (
    <Component
      data-string="spotlight"
      className={className}
      style={style}
    >
      {children}
    </Component>
  );
}
