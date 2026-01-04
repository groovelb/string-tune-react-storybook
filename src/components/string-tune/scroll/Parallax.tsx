import { type ReactNode, type ElementType, type CSSProperties } from 'react';

export interface ParallaxProps {
  /** 자식 요소 */
  children: ReactNode;
  /** 패럴랙스 속도 (-1 ~ 1, 양수: 느리게, 음수: 빠르게) */
  speed?: number;
  /** 추가 CSS 클래스 */
  className?: string;
  /** 인라인 스타일 */
  style?: CSSProperties;
  /** 렌더링할 HTML 태그 */
  as?: ElementType;
}

/**
 * 스크롤 시 패럴랙스 효과를 적용하는 컴포넌트.
 * `--parallax` CSS 변수를 통해 translateY 값을 제공합니다.
 *
 * @example
 * ```tsx
 * <Parallax speed={0.5}>
 *   <img src="background.jpg" alt="Parallax" />
 * </Parallax>
 * ```
 */
export function Parallax({
  children,
  speed = 0.5,
  className = '',
  style,
  as: Component = 'div',
}: ParallaxProps) {
  return (
    <Component
      data-string="parallax"
      data-string-parallax={speed.toString()}
      className={className}
      style={style}
    >
      {children}
    </Component>
  );
}
