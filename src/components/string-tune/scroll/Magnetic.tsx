import { type ReactNode, type ElementType, type CSSProperties } from 'react';

export interface MagneticProps {
  /** 자식 요소 */
  children: ReactNode;
  /** 반응 반경 (px) */
  radius?: number;
  /** 끌림 강도 (0 ~ 1) */
  strength?: number;
  /** 추가 CSS 클래스 */
  className?: string;
  /** 인라인 스타일 */
  style?: CSSProperties;
  /** 렌더링할 HTML 태그 */
  as?: ElementType;
}

/**
 * 마우스 호버 시 커서 방향으로 끌리는 자석 효과 컴포넌트.
 * `--magnetic-x`, `--magnetic-y` CSS 변수를 통해 오프셋을 제공합니다.
 *
 * @example
 * ```tsx
 * <Magnetic radius={400} strength={0.2}>
 *   <button>Hover me</button>
 * </Magnetic>
 * ```
 *
 * @example CSS 활용
 * ```css
 * .magnetic-element {
 *   transform: translate(
 *     calc(var(--magnetic-x) * 1px),
 *     calc(var(--magnetic-y) * 1px)
 *   );
 * }
 * ```
 */
export function Magnetic({
  children,
  radius = 400,
  strength = 0.1,
  className = '',
  style,
  as: Component = 'div',
}: MagneticProps) {
  return (
    <Component
      data-string="magnetic"
      data-string-radius={radius.toString()}
      data-string-strength={strength.toString()}
      className={className}
      style={style}
    >
      {children}
    </Component>
  );
}
