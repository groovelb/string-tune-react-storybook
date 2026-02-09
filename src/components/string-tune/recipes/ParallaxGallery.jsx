import { Parallax } from '../scroll/Parallax.jsx';

const STYLE_ID = 'st-parallax-gallery-recipe';

function injectStyles() {
  if (typeof document === 'undefined') return;
  if (document.getElementById(STYLE_ID)) return;
  const style = document.createElement('style');
  style.id = STYLE_ID;
  style.textContent = `
    .st-parallax-gallery {
      display: grid;
      gap: var(--st-pg-gap, 16px);
    }
    .st-parallax-gallery-item {
      overflow: hidden;
      position: relative;
    }
    .st-parallax-gallery-item img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  `;
  document.head.appendChild(style);
}

/**
 * ParallaxGallery — 여러 이미지에 각각 다른 패럴랙스 속도를 적용하는 갤러리 Recipe
 *
 * Parallax Wrapper를 내부적으로 사용하며,
 * 그리드 레이아웃 + 다중 패럴랙스 CSS를 내장한다.
 *
 * @param {Object} props
 * @param {Array<{src: string, alt?: string}>} props.images - 이미지 배열
 * @param {number[]} [props.speeds] - 이미지별 패럴랙스 속도 배열 (생략 시 자동 분배)
 * @param {number} [props.columns=3] - 그리드 컬럼 수
 * @param {string} [props.gap='16px'] - 그리드 간격
 * @param {string} [props.height='300px'] - 각 이미지 높이
 * @param {number} [props.scale=1.3] - 이미지 확대 비율 (패럴랙스 범위 확보용)
 * @param {string} [props.className='']
 * @param {React.CSSProperties} [props.style]
 */
export function ParallaxGallery({
  images = [],
  speeds,
  columns = 3,
  gap = '16px',
  height = '300px',
  scale = 1.3,
  className = '',
  style,
}) {
  injectStyles();

  const computedSpeeds = speeds || images.map((_, i) => {
    const center = (images.length - 1) / 2;
    return Math.round((0.3 + Math.abs(i - center) * 0.15) * 100) / 100;
  });

  return (
    <div
      className={`st-parallax-gallery ${className}`}
      style={{
        '--st-pg-gap': gap,
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        ...style,
      }}
    >
      {images.map((img, i) => (
        <div
          key={i}
          className="st-parallax-gallery-item"
          style={{ height }}
        >
          <Parallax
            speed={computedSpeeds[i] ?? 0.5}
            style={{
              position: 'absolute',
              inset: 0,
              transform: `translateY(calc(var(--parallax, 0) * 1px))`,
            }}
          >
            <img
              src={img.src}
              alt={img.alt || ''}
              style={{ scale }}
            />
          </Parallax>
        </div>
      ))}
    </div>
  );
}
