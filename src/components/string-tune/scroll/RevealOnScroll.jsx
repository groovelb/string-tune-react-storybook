/**
 * RevealOnScroll - 스크롤하여 뷰포트 진입 시 -inview 클래스 토글
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {boolean} [props.repeat=false]
 * @param {string} [props.className='']
 * @param {React.CSSProperties} [props.style]
 * @param {React.ElementType} [props.as='div']
 */
export function RevealOnScroll({
  children,
  repeat = false,
  className = '',
  style,
  as: Component = 'div',
}) {
  return (
    <Component
      data-string=""
      {...(repeat && { 'data-string-repeat': '' })}
      className={className}
      style={style}
    >
      {children}
    </Component>
  );
}
