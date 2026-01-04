import { type ReactNode, type ElementType, type CSSProperties } from 'react';

export interface LerpProps {
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
 * 스크롤 방향과 속도에 따른 선형 보간 값을 제공하는 컴포넌트.
 * `--lerp` CSS 변수를 통해 스크롤 방향(양수/음수)과 속도를 추적합니다.
 *
 * @example
 * ```tsx
 * <Lerp>
 *   <img src="image.jpg" className="skew-on-scroll" />
 * </Lerp>
 * ```
 *
 * @example CSS 활용
 * ```css
 * .skew-on-scroll {
 *   transform: skewY(calc(var(--lerp) * 0.1deg));
 * }
 * ```
 */
export function Lerp({
  children,
  className = '',
  style,
  as: Component = 'div',
}: LerpProps) {
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
