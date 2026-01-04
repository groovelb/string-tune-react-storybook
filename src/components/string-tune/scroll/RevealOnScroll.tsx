import { type ReactNode, type ElementType, type CSSProperties } from 'react';

export interface RevealOnScrollProps {
  /** 자식 요소 */
  children: ReactNode;
  /** 반복 트리거 여부 (스크롤 아웃 후 다시 인 시 재실행) */
  repeat?: boolean;
  /** 추가 CSS 클래스 */
  className?: string;
  /** 인라인 스타일 */
  style?: CSSProperties;
  /** 렌더링할 HTML 태그 */
  as?: ElementType;
}

/**
 * 스크롤하여 뷰포트에 진입할 때 `-inview` 클래스를 토글하는 컴포넌트.
 * CSS에서 `-inview` 클래스를 활용하여 애니메이션을 구현합니다.
 *
 * @example
 * ```tsx
 * <RevealOnScroll repeat>
 *   <img src="image.jpg" alt="Reveal" />
 * </RevealOnScroll>
 * ```
 */
export function RevealOnScroll({
  children,
  repeat = false,
  className = '',
  style,
  as: Component = 'div',
}: RevealOnScrollProps) {
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
