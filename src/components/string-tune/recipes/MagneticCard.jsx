import { Magnetic } from '../scroll/Magnetic.jsx';

const STYLE_ID = 'st-magnetic-card-recipe';

function injectStyles() {
  if (typeof document === 'undefined') return;
  if (document.getElementById(STYLE_ID)) return;
  const style = document.createElement('style');
  style.id = STYLE_ID;
  style.textContent = `
    .st-magnetic-card {
      transform:
        translate(
          calc(var(--magnetic-x, 0) * 0.5%),
          calc(var(--magnetic-y, 0) * 0.5%)
        )
        rotateX(calc(var(--magnetic-y, 0) * -0.5deg))
        rotateY(calc(var(--magnetic-x, 0) * 0.5deg));
      transition: transform 0.3s cubic-bezier(0.35, 0.35, 0, 1);
    }
  `;
  document.head.appendChild(style);
}

/**
 * MagneticCard — 마우스 방향으로 3D 기울기가 적용되는 카드 Recipe 컴포넌트
 *
 * Magnetic Wrapper를 내부적으로 사용하며,
 * perspective + 3D transform CSS를 내장하여 props만으로 바로 동작한다.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - 카드 내부 콘텐츠
 * @param {number} [props.radius=400] - 반응 반경 (px)
 * @param {number} [props.strength=0.1] - 끌림 강도 (0 ~ 1)
 * @param {string} [props.perspective='800px'] - perspective 값
 * @param {string} [props.className='']
 * @param {React.CSSProperties} [props.style]
 */
export function MagneticCard({
  children,
  radius = 400,
  strength = 0.1,
  perspective = '800px',
  className = '',
  style,
}) {
  injectStyles();

  return (
    <div
      className={`st-magnetic-card-wrapper ${className}`}
      style={{
        perspective,
        ...style,
      }}
    >
      <Magnetic
        radius={radius}
        strength={strength}
        className="st-magnetic-card"
      >
        {children}
      </Magnetic>
    </div>
  );
}
