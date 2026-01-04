import { type ReactNode, type ElementType, type CSSProperties } from 'react';

export interface GlideProps {
  /** 자식 요소 */
  children: ReactNode;
  /** 지연 계수 (0 ~ 1, 높을수록 더 늦게 반응) */
  delay?: number;
  /** 추가 CSS 클래스 */
  className?: string;
  /** 인라인 스타일 */
  style?: CSSProperties;
  /** 렌더링할 HTML 태그 */
  as?: ElementType;
}

/**
 * 스크롤 시 지연된 부드러운 움직임을 제공하는 컴포넌트.
 * `--glide` CSS 변수를 통해 지연된 스크롤 위치 값을 제공합니다.
 *
 * @example
 * ```tsx
 * <Glide delay={0.5}>
 *   <img src="image.jpg" alt="Glide" />
 * </Glide>
 * ```
 */
export function Glide({
  children,
  delay = 0.5,
  className = '',
  style,
  as: Component = 'div',
}: GlideProps) {
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
