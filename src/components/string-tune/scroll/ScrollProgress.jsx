/**
 * ScrollProgress - 스크롤 진행률(0~1)을 --progress CSS 변수로 제공
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {'top'|'center'|'bottom'} [props.enterVp='top']
 * @param {'top'|'center'|'bottom'} [props.exitVp='bottom']
 * @param {string} [props.className='']
 * @param {React.CSSProperties} [props.style]
 * @param {React.ElementType} [props.as='div']
 */
export function ScrollProgress({
  children,
  enterVp = 'top',
  exitVp = 'bottom',
  className = '',
  style,
  as: Component = 'div',
}) {
  return (
    <Component
      data-string="progress"
      data-string-enter-vp={enterVp}
      data-string-exit-vp={exitVp}
      className={className}
      style={style}
    >
      {children}
    </Component>
  );
}
