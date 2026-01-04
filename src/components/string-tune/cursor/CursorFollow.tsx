import { type ReactNode, type ElementType, type CSSProperties } from 'react';

export interface CursorFollowProps {
  /** 자식 요소 */
  children: ReactNode;
  /** 커서 추적 부드러움 (0~1, 낮을수록 더 빠르게 추적) */
  lerp?: number;
  /** 추가 CSS 클래스 */
  className?: string;
  /** 인라인 스타일 */
  style?: CSSProperties;
  /** 렌더링할 HTML 태그 */
  as?: ElementType;
}

/**
 * 커서 위치를 추적하여 CSS 변수로 제공하는 컴포넌트.
 * `--x`, `--y` (즉시 좌표) 및 `--x-lerp`, `--y-lerp` (부드러운 좌표) CSS 변수를 제공합니다.
 *
 * @example
 * ```tsx
 * <CursorFollow lerp={0.8}>
 *   <div className="follow-cursor">Follow me</div>
 * </CursorFollow>
 * ```
 *
 * @example CSS 활용
 * ```css
 * .follow-cursor {
 *   position: fixed;
 *   left: 0;
 *   top: 0;
 *   transform: translate(
 *     calc(var(--x) * 1px),
 *     calc(var(--y) * 1px)
 *   );
 * }
 * ```
 */
export function CursorFollow({
  children,
  lerp,
  className = '',
  style,
  as: Component = 'div',
}: CursorFollowProps) {
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
