/**
 * ScrollProgress - 스크롤 진행률(0~1)을 --progress CSS 변수로 제공
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {'top'|'center'|'bottom'} [props.enterVp] - 미지정 시 StringTune 기본값 사용
 * @param {'top'|'center'|'bottom'} [props.exitVp] - 미지정 시 StringTune 기본값 사용
 * @param {string} [props.className='']
 * @param {React.CSSProperties} [props.style]
 * @param {React.ElementType} [props.as='div']
 */
export function ScrollProgress({
  children,
  enterVp,
  exitVp,
  className = '',
  style,
  as: Component = 'div',
}) {
  return (
    <Component
      data-string="progress"
      {...(enterVp && { 'data-string-enter-vp': enterVp })}
      {...(exitVp && { 'data-string-exit-vp': exitVp })}
      className={className}
      style={style}
    >
      {children}
    </Component>
  );
}
