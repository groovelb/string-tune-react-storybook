import { type ReactNode, type ElementType, type CSSProperties } from 'react';

export interface SpotlightProps {
  /** 자식 요소 */
  children: ReactNode;
  /** 추가 CSS 클래스 */
  className?: string;
  /** 인라인 스타일 */
  style?: CSSProperties;
  /** 렌더링할 HTML 태그 */
  as?: ElementType;
}

/**
 * 커서 기반 스포트라이트 효과를 제공하는 컴포넌트.
 * 요소 중심에서 커서까지의 각도와 거리를 CSS 변수로 제공합니다.
 *
 * CSS 변수:
 * - `--spotlight-angle`: 각도 (라디안)
 * - `--spotlight-angle-deg`: 각도 (도)
 * - `--spotlight-distance`: 거리 (px)
 *
 * @example
 * ```tsx
 * <Spotlight>
 *   <div className="spotlight-effect">Look at me</div>
 * </Spotlight>
 * ```
 *
 * @example CSS 활용 - 그라데이션
 * ```css
 * .spotlight-effect {
 *   background: conic-gradient(
 *     from calc(var(--spotlight-angle) * 1rad),
 *     #ff0000, #00ff00, #0000ff, #ff0000
 *   );
 * }
 * ```
 *
 * @example CSS 활용 - 눈알 따라가기
 * ```css
 * .eye {
 *   transform: translate(
 *     calc(sin(var(--spotlight-angle-deg)) * min(var(--spotlight-distance), 20) * -0.1%),
 *     calc(cos(var(--spotlight-angle-deg)) * min(var(--spotlight-distance), 20) * 0.1%)
 *   );
 * }
 * ```
 */
export function Spotlight({
  children,
  className = '',
  style,
  as: Component = 'div',
}: SpotlightProps) {
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
