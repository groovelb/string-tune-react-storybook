import { Sequence, SequenceContainer } from '../interactive/Sequence.jsx';

const STYLE_ID = 'st-image-carousel-recipe';

function injectStyles() {
  if (typeof document === 'undefined') return;
  if (document.getElementById(STYLE_ID)) return;
  const style = document.createElement('style');
  style.id = STYLE_ID;
  style.textContent = `
    .st-carousel { position: relative; overflow: hidden; background: #000; }

    .st-carousel-viewport {
      display: grid; place-items: center;
    }
    .st-carousel-slide {
      grid-area: 1/1;
      opacity: 0;
      transition: opacity 0.6s cubic-bezier(0.35, 0.35, 0, 1),
                  clip-path 0.6s cubic-bezier(0.35, 0.35, 0, 1);
      clip-path: polygon(40% 40%, 60% 40%, 60% 60%, 40% 60%);
    }
    .st-carousel-slide.-active {
      opacity: 1;
      clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
    }
    .st-carousel-slide.-entering {
      opacity: 1;
      clip-path: polygon(40% 40%, 60% 40%, 60% 60%, 40% 60%);
      transition: none;
    }
    .st-carousel-slide.-leaving { opacity: 0; }

    .st-carousel-slide img {
      display: block; width: 100%; height: 100%; object-fit: cover;
    }

    .st-carousel-nav {
      position: absolute; bottom: 16px; left: 50%;
      transform: translateX(-50%);
      display: flex; gap: 8px; z-index: 10;
    }

    .st-carousel-dot {
      width: 10px; height: 10px; border-radius: 50%; border: none;
      background: rgba(255,255,255,0.4); cursor: pointer;
      transition: background 0.3s;
      padding: 0;
    }
    .st-carousel-dot.-active,
    .st-carousel-dot.-entering { background: #fff; }

    .st-carousel-arrows {
      position: absolute; top: 50%; left: 0; right: 0;
      display: flex; justify-content: space-between;
      transform: translateY(-50%); padding: 0 12px;
      z-index: 10; pointer-events: none;
    }
    .st-carousel-arrow {
      width: 40px; height: 40px; border-radius: 50%;
      background: rgba(0,0,0,0.5); border: 1px solid rgba(255,255,255,0.3);
      color: #fff; font-size: 18px; cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      pointer-events: auto; transition: background 0.2s;
    }
    .st-carousel-arrow:hover { background: rgba(0,0,0,0.8); }
  `;
  document.head.appendChild(style);
}

/**
 * ImageCarousel — 이미지 캐러셀 Recipe 컴포넌트
 *
 * Sequence + SequenceContainer Wrapper를 내부적으로 사용하며,
 * 네비게이션 도트 + 화살표 + 전환 애니메이션을 내장한다.
 *
 * @param {Object} props
 * @param {Array<{src: string, alt?: string}>} props.images - 이미지 배열
 * @param {string} [props.height='400px'] - 캐러셀 높이
 * @param {boolean} [props.showDots=true] - 네비게이션 도트 표시 여부
 * @param {boolean} [props.showArrows=true] - 화살표 표시 여부
 * @param {string} [props.name='carousel'] - Sequence 그룹 이름
 * @param {string} [props.className='']
 * @param {React.CSSProperties} [props.style]
 */
export function ImageCarousel({
  images = [],
  height = '400px',
  showDots = true,
  showArrows = true,
  name = 'carousel',
  className = '',
  style,
}) {
  injectStyles();

  return (
    <div className={`st-carousel ${className}`} style={{ height, ...style }}>
      <SequenceContainer
        name={name}
        activeStep={0}
        enteringDuration={50}
        leavingDuration={600}
        className="st-carousel-viewport"
        style={{ width: '100%', height: '100%' }}
      >
        {images.map((img, i) => (
          <Sequence key={i} name={name} index={i} className="st-carousel-slide">
            <img src={img.src} alt={img.alt || `Slide ${i + 1}`} />
          </Sequence>
        ))}
      </SequenceContainer>

      {showArrows && (
        <div className="st-carousel-arrows">
          <Sequence name={name} trigger="prev|loop" as="button" className="st-carousel-arrow">
            &#8592;
          </Sequence>
          <Sequence name={name} trigger="next|loop" as="button" className="st-carousel-arrow">
            &#8594;
          </Sequence>
        </div>
      )}

      {showDots && (
        <nav className="st-carousel-nav">
          {images.map((_, i) => (
            <Sequence
              key={i}
              name={name}
              trigger={i}
              as="button"
              className="st-carousel-dot"
            />
          ))}
        </nav>
      )}
    </div>
  );
}
