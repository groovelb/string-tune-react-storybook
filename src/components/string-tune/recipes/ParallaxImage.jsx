import { Parallax } from '../scroll/Parallax.jsx';

/**
 * ParallaxImage — 스크롤 시 패럴랙스 효과가 적용된 이미지 Recipe 컴포넌트
 *
 * Parallax Wrapper를 내부적으로 사용하며,
 * overflow hidden + transform CSS를 내장하여 props만으로 바로 동작한다.
 *
 * @param {Object} props
 * @param {string} props.src - 이미지 URL
 * @param {string} [props.alt=''] - 이미지 alt 텍스트
 * @param {number} [props.speed=0.5] - 패럴랙스 속도 (-1 ~ 1)
 * @param {string} [props.height='60vh'] - 컨테이너 높이
 * @param {number} [props.scale=1.3] - 이미지 확대 비율 (패럴랙스 범위 확보용)
 * @param {string} [props.className='']
 * @param {React.CSSProperties} [props.style]
 */
export function ParallaxImage({
  src,
  alt = '',
  speed = 0.5,
  height = '60vh',
  scale = 1.3,
  className = '',
  style,
}) {
  return (
    <div
      className={`st-parallax-image ${className}`}
      style={{
        overflow: 'hidden',
        height,
        position: 'relative',
        ...style,
      }}
    >
      <Parallax
        speed={speed}
        style={{
          position: 'absolute',
          inset: 0,
          transform: `translateY(calc(var(--parallax, 0) * 1px))`,
        }}
      >
        <img
          src={src}
          alt={alt}
          style={{
            display: 'block',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            scale,
          }}
        />
      </Parallax>
    </div>
  );
}
