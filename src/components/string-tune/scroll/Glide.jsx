/**
 * Glide - 스크롤 시 지연된 부드러운 움직임 제공
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {number} [props.delay=0.5] - 지연 계수 (0 ~ 1)
 * @param {string} [props.className='']
 * @param {React.CSSProperties} [props.style]
 * @param {React.ElementType} [props.as='div']
 */
export function Glide({
  children,
  delay = 0.5,
  className = '',
  style,
  as: Component = 'div',
}) {
  return (
    <Component
      data-string="glide"
      data-string-glide={delay.toString()}
      className={className}
      style={style}
    >
      {children}
    </Component>
  );
}
