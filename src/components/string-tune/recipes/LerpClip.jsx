import { Lerp } from '../scroll/Lerp.jsx';

const STYLE_ID = 'st-lerp-clip-recipe';

function injectStyles() {
  if (typeof document === 'undefined') return;
  if (document.getElementById(STYLE_ID)) return;
  const style = document.createElement('style');
  style.id = STYLE_ID;
  style.textContent = `
    .st-lerp-clip {
      transform: translateZ(0);
      overflow: hidden;
    }
    .st-lerp-clip img {
      display: block; width: 100%; height: 100%; object-fit: cover;
    }

    /* diamond: 4 corners pinch inward based on lerp */
    .st-lerp-clip--diamond {
      clip-path: polygon(
        max(calc(var(--lerp, 0) * 0.25%), 0%) max(calc(var(--lerp, 0) * 0.25%), 0%),
        min(calc(100% - var(--lerp, 0) * -0.25%), 100%) max(calc(var(--lerp, 0) * -0.25%), 0%),
        min(calc(100% - var(--lerp, 0) * 0.25%), 100%) min(calc(100% - var(--lerp, 0) * 0.25%), 100%),
        max(calc(var(--lerp, 0) * -0.25%), 0%) min(calc(100% - var(--lerp, 0) * -0.25%), 100%)
      );
    }

    /* squeeze: vertical squeeze on scroll */
    .st-lerp-clip--squeeze {
      clip-path: inset(
        max(calc(var(--lerp, 0) * 0.15%), 0%)
        0%
        max(calc(var(--lerp, 0) * -0.15%), 0%)
        0%
      );
    }

    /* skew: horizontal skew distortion */
    .st-lerp-clip--skew {
      clip-path: polygon(
        max(calc(var(--lerp, 0) * 0.3%), 0%) 0%,
        100% 0%,
        min(calc(100% + var(--lerp, 0) * 0.3%), 100%) 100%,
        0% 100%
      );
    }

    /* scale zoom based on lerp */
    .st-lerp-clip--zoom img,
    .st-lerp-clip--diamond img {
      scale: calc(1 + min(var(--lerp, 0) * var(--lerp, 0) * 0.0001, 1));
    }
  `;
  document.head.appendChild(style);
}

/**
 * LerpClip — 스크롤 속도/방향에 반응하는 clip-path 효과 Recipe 컴포넌트
 *
 * Lerp Wrapper를 내부적으로 사용하며,
 * `--lerp` CSS 변수 기반의 clip-path 프리셋을 내장한다.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - 콘텐츠 (이미지 등)
 * @param {'diamond'|'squeeze'|'skew'|'zoom'} [props.clipShape='diamond'] - clip-path 프리셋
 * @param {string} [props.className='']
 * @param {React.CSSProperties} [props.style]
 */
export function LerpClip({
  children,
  clipShape = 'diamond',
  className = '',
  style,
}) {
  injectStyles();

  return (
    <Lerp
      className={`st-lerp-clip st-lerp-clip--${clipShape} ${className}`}
      style={style}
    >
      {children}
    </Lerp>
  );
}
