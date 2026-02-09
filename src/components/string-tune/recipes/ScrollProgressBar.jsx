import { ScrollProgress } from '../scroll/ScrollProgress.jsx';

const STYLE_ID = 'st-scroll-progress-bar-recipe';

function injectStyles() {
  if (typeof document === 'undefined') return;
  if (document.getElementById(STYLE_ID)) return;
  const style = document.createElement('style');
  style.id = STYLE_ID;
  style.textContent = `
    @property --progress {
      syntax: '<number>';
      inherits: true;
      initial-value: 0;
    }

    .st-progress-bar-track {
      position: relative;
    }
    .st-progress-bar-indicator {
      position: fixed;
      z-index: 9999;
      transition: none;
    }

    /* top */
    .st-progress-bar-indicator--top {
      top: 0; left: 0; right: 0;
      height: var(--st-pb-thickness, 4px);
      transform-origin: left center;
      transform: scaleX(var(--progress, 0));
    }
    /* bottom */
    .st-progress-bar-indicator--bottom {
      bottom: 0; left: 0; right: 0;
      height: var(--st-pb-thickness, 4px);
      transform-origin: left center;
      transform: scaleX(var(--progress, 0));
    }
    /* left */
    .st-progress-bar-indicator--left {
      top: 0; left: 0; bottom: 0;
      width: var(--st-pb-thickness, 4px);
      transform-origin: center top;
      transform: scaleY(var(--progress, 0));
    }
    /* right */
    .st-progress-bar-indicator--right {
      top: 0; right: 0; bottom: 0;
      width: var(--st-pb-thickness, 4px);
      transform-origin: center top;
      transform: scaleY(var(--progress, 0));
    }
  `;
  document.head.appendChild(style);
}

/**
 * ScrollProgressBar — 스크롤 진행 상태를 시각적 바로 표시하는 Recipe 컴포넌트
 *
 * ScrollProgress Wrapper를 내부적으로 사용하며,
 * `--progress` (0~1) CSS 변수 기반의 프로그레스 바 UI를 내장한다.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - 스크롤 영역 콘텐츠
 * @param {string} [props.color='#FF5A37'] - 프로그레스 바 색상
 * @param {'top'|'bottom'|'left'|'right'} [props.position='top'] - 바 위치
 * @param {string} [props.thickness='4px'] - 바 두께
 * @param {'top'|'center'|'bottom'} [props.enterVp='top'] - progress 시작 뷰포트 위치
 * @param {'top'|'center'|'bottom'} [props.exitVp='bottom'] - progress 종료 뷰포트 위치
 * @param {string} [props.className='']
 * @param {React.CSSProperties} [props.style]
 */
export function ScrollProgressBar({
  children,
  color = '#FF5A37',
  position = 'top',
  thickness = '4px',
  enterVp = 'top',
  exitVp = 'bottom',
  className = '',
  style,
}) {
  injectStyles();

  return (
    <ScrollProgress
      enterVp={enterVp}
      exitVp={exitVp}
      className={`st-progress-bar-track ${className}`}
      style={style}
    >
      <div
        className={`st-progress-bar-indicator st-progress-bar-indicator--${position}`}
        style={{
          '--st-pb-thickness': thickness,
          backgroundColor: color,
        }}
      />
      {children}
    </ScrollProgress>
  );
}
