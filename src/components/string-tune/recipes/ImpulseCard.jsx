import { Impulse } from '../interactive/Impulse.jsx';

const STYLE_ID = 'st-impulse-card-recipe';

function injectStyles() {
  if (typeof document === 'undefined') return;
  if (document.getElementById(STYLE_ID)) return;
  const style = document.createElement('style');
  style.id = STYLE_ID;
  style.textContent = `
    .st-impulse-card {
      transform: translate3d(
        calc(var(--push-x, 0) * var(--st-ic-x-mult, 0.5) * 1%),
        calc(var(--push-y, 0) * var(--st-ic-y-mult, 1) * 1%),
        0
      ) rotate(calc(var(--push-rotation, 0) * var(--st-ic-rot-mult, 0.25) * 1deg));
      will-change: transform;
    }
  `;
  document.head.appendChild(style);
}

/**
 * ImpulseCard — 커서 움직임에 물리적으로 반응하는 카드 Recipe 컴포넌트
 *
 * Impulse Wrapper를 내부적으로 사용하며,
 * `--push-x`, `--push-y`, `--push-rotation` 기반의 transform CSS를 내장한다.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - 카드 내부 콘텐츠
 * @param {number} [props.positionStrength=0.5] - 위치 이동 강도
 * @param {number} [props.rotationStrength=0.25] - 회전 강도
 * @param {number} [props.xMultiplier=0.5] - X축 transform 배율
 * @param {number} [props.yMultiplier=1] - Y축 transform 배율
 * @param {number} [props.rotationMultiplier=0.25] - 회전 transform 배율
 * @param {string} [props.className='']
 * @param {React.CSSProperties} [props.style]
 */
export function ImpulseCard({
  children,
  positionStrength = 0.5,
  rotationStrength = 0.25,
  xMultiplier = 0.5,
  yMultiplier = 1,
  rotationMultiplier = 0.25,
  className = '',
  style,
}) {
  injectStyles();

  return (
    <Impulse
      positionX={positionStrength}
      positionY={positionStrength}
      rotation={rotationStrength}
      className={`st-impulse-card ${className}`}
      style={{
        '--st-ic-x-mult': xMultiplier,
        '--st-ic-y-mult': yMultiplier,
        '--st-ic-rot-mult': rotationMultiplier,
        ...style,
      }}
    >
      {children}
    </Impulse>
  );
}
