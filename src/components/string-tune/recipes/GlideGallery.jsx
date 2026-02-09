import { Glide } from '../scroll/Glide.jsx';

const STYLE_ID = 'st-glide-gallery-recipe';

function injectStyles() {
  if (typeof document === 'undefined') return;
  if (document.getElementById(STYLE_ID)) return;
  const style = document.createElement('style');
  style.id = STYLE_ID;
  style.textContent = `
    .st-glide-gallery {
      display: grid;
      gap: var(--st-gg-gap, 8px);
    }
    .st-glide-gallery-item {
      overflow: hidden;
      transform: translateZ(0);
      clip-path: inset(0% 0% 0% 0%);
    }
    .st-glide-gallery-item img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  `;
  document.head.appendChild(style);
}

/**
 * GlideGallery — 여러 이미지에 시차 지연(stagger)을 자동 적용하는 갤러리 Recipe
 *
 * Glide Wrapper를 내부적으로 사용하며,
 * 가운데 이미지가 가장 먼저 반응하고 양쪽 끝이 늦게 반응하는
 * 대칭 stagger delay를 자동 계산한다.
 *
 * @param {Object} props
 * @param {Array<{src: string, alt?: string}>} props.images - 이미지 배열
 * @param {number[]} [props.delays] - 이미지별 delay 배열 (생략 시 대칭 자동 계산)
 * @param {number} [props.columns=5] - 그리드 컬럼 수
 * @param {string} [props.gap='8px'] - 그리드 간격
 * @param {string} [props.height='60vh'] - 각 이미지 높이
 * @param {string} [props.className='']
 * @param {React.CSSProperties} [props.style]
 */
export function GlideGallery({
  images = [],
  delays,
  columns = 5,
  gap = '8px',
  height = '60vh',
  className = '',
  style,
}) {
  injectStyles();

  // 대칭 delay 자동 계산: 가운데가 0, 양쪽 끝이 1
  const computedDelays = delays || images.map((_, i) => {
    const center = (images.length - 1) / 2;
    const maxDist = center || 1;
    return Math.round((Math.abs(i - center) / maxDist) * 100) / 100;
  });

  return (
    <div
      className={`st-glide-gallery ${className}`}
      style={{
        '--st-gg-gap': gap,
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        ...style,
      }}
    >
      {images.map((img, i) => (
        <Glide
          key={i}
          as="figure"
          delay={computedDelays[i] ?? 0.5}
          className="st-glide-gallery-item"
          style={{ height }}
        >
          <img src={img.src} alt={img.alt || ''} />
        </Glide>
      ))}
    </div>
  );
}
