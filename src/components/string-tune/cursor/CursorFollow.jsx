/**
 * CursorFollow - 커서 위치를 추적하여 CSS 변수로 제공
 * @param {Object} props
 * @param {React.ReactNode} [props.children]
 * @param {number} [props.lerp] - 커서 추적 부드러움 (0~1)
 * @param {string} [props.className='']
 * @param {React.CSSProperties} [props.style]
 * @param {React.ElementType} [props.as='div']
 * @param {string} [props.cursorClass] - 호버 시 커서 요소에 추가할 클래스
 * @param {boolean} [props.disableTargetStyle] - 타겟 스타일 비활성화
 * @param {boolean} [props.isFollower] - 커서 팔로워 모드
 */
export function CursorFollow({
  children,
  lerp,
  className = '',
  style,
  as: Component = 'div',
  cursorClass,
  disableTargetStyle,
  isFollower,
}) {
  // 타겟 모드: 호버 시 커서에 클래스 추가
  if (cursorClass !== undefined) {
    return (
      <Component
        data-string="cursor"
        data-string-cursor-class={cursorClass}
        {...(disableTargetStyle && { 'data-string-cursor-target-style-disable': '' })}
        className={className}
        style={style}
      >
        {children}
      </Component>
    );
  }

  // 팔로워 모드: 마우스를 따라다님
  return (
    <Component
      data-string-cursor=""
      {...(lerp !== undefined && { 'data-string-cursor-lerp': lerp.toString() })}
      className={className}
      style={style}
    >
      {children}
    </Component>
  );
}
