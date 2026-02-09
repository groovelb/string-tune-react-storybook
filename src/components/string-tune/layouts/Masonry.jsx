import { forwardRef } from 'react';

/**
 * Masonry - 메이슨리 그리드 레이아웃 컨테이너
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {string} [props.cols='2|768:3|1024:4|1440:5'] - 반응형 컬럼 수 (breakpoint:cols)
 * @param {string} [props.mode='manual'] - 레이아웃 모드 ('auto' | 'manual')
 * @param {string} [props.gap='6|1024:8|1600:9|1920:10|2560:11'] - 반응형 간격
 * @param {string} [props.stringId] - StringTune 인스턴스 ID (이벤트 타겟용)
 * @param {React.ElementType} [props.as='div']
 */
export const Masonry = forwardRef(function Masonry(
  {
    children,
    cols = '2|768:3|1024:4|1440:5',
    mode = 'manual',
    gap = '6|1024:8|1600:9|1920:10|2560:11',
    stringId,
    as: Component = 'div',
    ...props
  },
  ref
) {
  return (
    <Component
      ref={ref}
      {...{
        'string': 'masonry',
        'string-id': stringId,
        'string-masonry-cols': cols,
        'string-masonry-mode': mode,
        'string-masonry-gap': gap,
      }}
      {...props}
    >
      {children}
    </Component>
  );
});

/**
 * MasonryItem - 메이슨리 그리드 아이템
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {number} [props.positionTime=1200] - 위치 전환 시간 (ms)
 * @param {string} [props.positionEasing='cubic-bezier(0.69, 0, 0, 1)'] - 위치 전환 이징
 * @param {number} [props.sizeTime=1200] - 크기 전환 시간 (ms)
 * @param {string} [props.sizeEasing='cubic-bezier(0.69, 0, 0, 1)'] - 크기 전환 이징
 * @param {React.ElementType} [props.as='div']
 */
export function MasonryItem({
  children,
  positionTime = 1200,
  positionEasing = 'cubic-bezier(0.69, 0, 0, 1)',
  sizeTime = 1200,
  sizeEasing = 'cubic-bezier(0.69, 0, 0, 1)',
  className = '',
  style,
  as: Component = 'div',
}) {
  return (
    <Component
      {...{
        'string-masonry-position-time': positionTime.toString(),
        'string-masonry-position-easing': positionEasing,
        'string-masonry-size-time': sizeTime.toString(),
        'string-masonry-size-easing': sizeEasing,
      }}
      className={className}
      style={style}
    >
      {children}
    </Component>
  );
}
