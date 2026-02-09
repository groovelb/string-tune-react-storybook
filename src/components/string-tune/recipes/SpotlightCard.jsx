import { Spotlight } from '../cursor/Spotlight.jsx';

const STYLE_ID = 'st-spotlight-card-recipe';

function injectStyles() {
  if (typeof document === 'undefined') return;
  if (document.getElementById(STYLE_ID)) return;
  const style = document.createElement('style');
  style.id = STYLE_ID;
  style.textContent = `
    @property --spotlight-angle {
      syntax: '<number>';
      inherits: true;
      initial-value: 0;
    }
    @property --spotlight-distance {
      syntax: '<number>';
      inherits: true;
      initial-value: 0;
    }

    .st-spotlight-card {
      position: relative;
      overflow: hidden;
      border-radius: var(--st-sc-radius, 16px);
    }

    .st-spotlight-card::before {
      content: '';
      position: absolute;
      inset: 0;
      z-index: 1;
      pointer-events: none;
      opacity: 0;
      transition: opacity 0.4s ease;
      background: radial-gradient(
        circle at
          calc(50% + sin(calc(var(--spotlight-angle) * 3.14159 / 180)) * min(var(--spotlight-distance), 600) * 0.06%)
          calc(50% - cos(calc(var(--spotlight-angle) * 3.14159 / 180)) * min(var(--spotlight-distance), 600) * 0.06%),
        rgba(255, 255, 255, 0.25) 0%,
        rgba(255, 255, 255, 0.05) 40%,
        transparent 70%
      );
    }

    @media (min-width: 1024px) {
      .st-spotlight-card::before {
        opacity: calc(1 - min(var(--spotlight-distance), 800) / 800);
      }
    }
  `;
  document.head.appendChild(style);
}

/**
 * SpotlightCard — 커서 방향으로 빛 효과가 따라오는 카드 Recipe 컴포넌트
 *
 * Spotlight Wrapper를 내부적으로 사용하며,
 * radial-gradient 기반의 spotlight 효과 CSS를 내장한다.
 * `--spotlight-angle`과 `--spotlight-distance` CSS 변수를 활용한다.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - 카드 내부 콘텐츠
 * @param {string} [props.borderRadius='16px'] - 카드 border-radius
 * @param {string} [props.className='']
 * @param {React.CSSProperties} [props.style]
 */
export function SpotlightCard({
  children,
  borderRadius = '16px',
  className = '',
  style,
}) {
  injectStyles();

  return (
    <Spotlight
      className={`st-spotlight-card ${className}`}
      style={{
        '--st-sc-radius': borderRadius,
        ...style,
      }}
    >
      {children}
    </Spotlight>
  );
}
