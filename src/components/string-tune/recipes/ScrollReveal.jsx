import { RevealOnScroll } from '../scroll/RevealOnScroll.jsx';

const STYLE_ID = 'st-scroll-reveal-recipe';

function injectStyles() {
  if (typeof document === 'undefined') return;
  if (document.getElementById(STYLE_ID)) return;
  const style = document.createElement('style');
  style.id = STYLE_ID;
  style.textContent = `
    /* === ScrollReveal Recipe — initial states === */
    .st-reveal--fadeUp {
      opacity: 0; transform: translateY(40px);
      transition: opacity var(--st-reveal-duration) var(--st-reveal-easing) var(--st-reveal-delay),
                  transform var(--st-reveal-duration) var(--st-reveal-easing) var(--st-reveal-delay);
    }
    .st-reveal--fadeUp.-inview { opacity: 1; transform: translateY(0); }

    .st-reveal--fadeIn {
      opacity: 0;
      transition: opacity var(--st-reveal-duration) var(--st-reveal-easing) var(--st-reveal-delay);
    }
    .st-reveal--fadeIn.-inview { opacity: 1; }

    .st-reveal--scaleIn {
      opacity: 0; transform: scale(0.85);
      transition: opacity var(--st-reveal-duration) var(--st-reveal-easing) var(--st-reveal-delay),
                  transform var(--st-reveal-duration) var(--st-reveal-easing) var(--st-reveal-delay);
    }
    .st-reveal--scaleIn.-inview { opacity: 1; transform: scale(1); }

    .st-reveal--slideLeft {
      opacity: 0; transform: translateX(-60px);
      transition: opacity var(--st-reveal-duration) var(--st-reveal-easing) var(--st-reveal-delay),
                  transform var(--st-reveal-duration) var(--st-reveal-easing) var(--st-reveal-delay);
    }
    .st-reveal--slideLeft.-inview { opacity: 1; transform: translateX(0); }

    .st-reveal--slideRight {
      opacity: 0; transform: translateX(60px);
      transition: opacity var(--st-reveal-duration) var(--st-reveal-easing) var(--st-reveal-delay),
                  transform var(--st-reveal-duration) var(--st-reveal-easing) var(--st-reveal-delay);
    }
    .st-reveal--slideRight.-inview { opacity: 1; transform: translateX(0); }

    .st-reveal--clipReveal {
      opacity: 0; transform: scale(2);
      clip-path: polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%);
      transition: opacity var(--st-reveal-duration) var(--st-reveal-easing) var(--st-reveal-delay),
                  transform var(--st-reveal-duration) var(--st-reveal-easing) var(--st-reveal-delay),
                  clip-path var(--st-reveal-duration) var(--st-reveal-easing) var(--st-reveal-delay);
    }
    .st-reveal--clipReveal.-inview {
      opacity: 1; transform: scale(1);
      clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
    }
  `;
  document.head.appendChild(style);
}

/**
 * ScrollReveal — 스크롤 시 요소를 애니메이션과 함께 노출하는 Recipe 컴포넌트
 *
 * RevealOnScroll Wrapper를 내부적으로 사용하며,
 * 애니메이션 프리셋과 CSS를 내장하여 props만으로 바로 동작한다.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - 노출할 콘텐츠
 * @param {'fadeUp'|'fadeIn'|'scaleIn'|'slideLeft'|'slideRight'|'clipReveal'} [props.animation='fadeUp'] - 애니메이션 프리셋
 * @param {number} [props.delay=0] - 애니메이션 지연 시간 (초)
 * @param {number} [props.duration=1] - 애니메이션 지속 시간 (초)
 * @param {string} [props.easing='cubic-bezier(0.86, 0, 0.31, 1)'] - 이징 함수
 * @param {boolean} [props.repeat=true] - 뷰포트 재진입 시 반복 여부
 * @param {string} [props.className='']
 * @param {React.CSSProperties} [props.style]
 * @param {React.ElementType} [props.as='div']
 */
export function ScrollReveal({
  children,
  animation = 'fadeUp',
  delay = 0,
  duration = 1,
  easing = 'cubic-bezier(0.86, 0, 0.31, 1)',
  repeat = true,
  className = '',
  style,
  as = 'div',
}) {
  injectStyles();

  return (
    <RevealOnScroll
      repeat={repeat}
      className={`st-reveal--${animation} ${className}`}
      as={as}
      style={{
        '--st-reveal-duration': `${duration}s`,
        '--st-reveal-delay': `${delay}s`,
        '--st-reveal-easing': easing,
        ...style,
      }}
    >
      {children}
    </RevealOnScroll>
  );
}
