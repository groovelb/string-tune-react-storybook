import { type ReactNode, type ElementType, type CSSProperties } from 'react';

export interface ScrollProgressProps {
  /** 자식 요소 */
  children: ReactNode;
  /** 진입 뷰포트 기준점 */
  enterVp?: 'top' | 'center' | 'bottom';
  /** 이탈 뷰포트 기준점 */
  exitVp?: 'top' | 'center' | 'bottom';
  /** 추가 CSS 클래스 */
  className?: string;
  /** 인라인 스타일 */
  style?: CSSProperties;
  /** 렌더링할 HTML 태그 */
  as?: ElementType;
}

/**
 * 스크롤 진행률(0~1)을 CSS 변수로 제공하는 컴포넌트.
 * `--progress` CSS 변수를 통해 요소의 스크롤 진행 상태를 추적합니다.
 *
 * @example
 * ```tsx
 * <ScrollProgress enterVp="top" exitVp="bottom">
 *   <div style={{ opacity: 'var(--progress)' }}>Fade in on scroll</div>
 * </ScrollProgress>
 * ```
 *
 * @example CSS 활용
 * ```css
 * .progress-element {
 *   scale: calc(0.5 + var(--progress) * 0.5);
 *   opacity: var(--progress);
 * }
 * ```
 */
export function ScrollProgress({
  children,
  enterVp = 'top',
  exitVp = 'bottom',
  className = '',
  style,
  as: Component = 'div',
}: ScrollProgressProps) {
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
