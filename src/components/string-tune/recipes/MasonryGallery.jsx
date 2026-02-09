import { useEffect, useRef, useCallback } from 'react';
import { StringTune } from '@fiddle-digital/string-tune';

const STYLE_ID = 'st-masonry-gallery-recipe';

function injectStyles() {
  if (typeof document === 'undefined') return;
  if (document.getElementById(STYLE_ID)) return;
  const style = document.createElement('style');
  style.id = STYLE_ID;
  style.textContent = `
    .st-masonry-gallery { position: relative; }
    .st-masonry-gallery *,
    .st-masonry-gallery *::before,
    .st-masonry-gallery *::after { margin: 0; padding: 0; box-sizing: border-box; }

    .st-masonry-gallery .st-mg-controls {
      display: flex; gap: 24px; align-items: center; flex-wrap: wrap;
      padding: 16px 0; margin-bottom: 12px;
    }
    .st-masonry-gallery .st-mg-control-group {
      display: flex; align-items: center; gap: 8px;
    }
    .st-masonry-gallery .st-mg-control-group span {
      font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.05em;
      color: #999; white-space: nowrap;
    }
    .st-masonry-gallery .st-mg-btn-group { display: flex; gap: 4px; }
    .st-masonry-gallery .st-mg-btn {
      background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.15);
      color: #ccc; padding: 6px 14px; font-size: 0.85rem; cursor: pointer;
      border-radius: 4px; transition: all 0.2s;
    }
    .st-masonry-gallery .st-mg-btn:hover { background: rgba(255,255,255,0.15); color: #fff; }
    .st-masonry-gallery .st-mg-btn.-active {
      background: rgba(255,255,255,0.2); border-color: rgba(255,255,255,0.4); color: #fff;
    }

    .st-masonry-gallery .st-mg-grid { position: relative; }
    .st-masonry-gallery .st-mg-item figure { margin: 0; }
    .st-masonry-gallery .st-mg-item img {
      display: block; width: 100%; height: auto; object-fit: cover;
    }
    .st-masonry-gallery .st-mg-item span {
      display: block; font-size: 0.7rem; padding: 8px 0 4px; color: #999;
    }
  `;
  document.head.appendChild(style);
}

const randomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

/**
 * MasonryGallery — 컨트롤 UI + emit 로직을 내장한 Masonry 갤러리 Recipe
 *
 * 내부적으로 StringTune Masonry 모듈을 직접 사용하며,
 * 컬럼/모드/타이밍 컨트롤을 내장하여 props만으로 바로 동작한다.
 *
 * @param {Object} props
 * @param {Array<{src: string, alt?: string}>} props.images - 이미지 배열
 * @param {number} [props.cols=3] - 초기 컬럼 수
 * @param {string} [props.gap='6|1024:8|1600:9|1920:10|2560:11'] - 반응형 간격
 * @param {boolean} [props.showControls=true] - 컨트롤 UI 표시 여부
 * @param {string} [props.className='']
 * @param {React.CSSProperties} [props.style]
 */
export function MasonryGallery({
  images = [],
  cols = 3,
  gap = '6|1024:8|1600:9|1920:10|2560:11',
  showControls = true,
  className = '',
  style,
}) {
  injectStyles();

  const wrapperRef = useRef(null);
  const initRef = useRef(false);

  const setup = useCallback(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper || initRef.current) return;
    initRef.current = true;

    const grid = wrapper.querySelector('.st-mg-grid');
    if (!grid) return;

    // string-* 속성 직접 설정
    grid.setAttribute('string', 'masonry');
    grid.setAttribute('string-id', 'st-mg');
    grid.setAttribute('string-masonry-cols', cols.toString());
    grid.setAttribute('string-masonry-mode', 'manual');
    grid.setAttribute('string-masonry-gap', gap);

    const items = grid.querySelectorAll('.st-mg-item');
    items.forEach((item) => {
      item.setAttribute('string-masonry-position-time', '1200');
      item.setAttribute('string-masonry-position-easing', 'cubic-bezier(0.69, 0, 0, 1)');
      item.setAttribute('string-masonry-size-time', '1200');
      item.setAttribute('string-masonry-size-easing', 'cubic-bezier(0.69, 0, 0, 1)');
    });

    // 초기화 대기 후 컨트롤 바인딩
    setTimeout(() => {
      const stringTune = StringTune.getInstance();

      if (showControls) {
        const colBtns = wrapper.querySelectorAll('[data-st-mg-cols]');
        const modeBtns = wrapper.querySelectorAll('[data-st-mg-mode]');
        const timingCb = wrapper.querySelector('.st-mg-timing-toggle');

        const setActive = (btns, val, attr) => {
          btns.forEach((b) => b.classList.toggle('-active', b.getAttribute(attr) === String(val)));
        };

        colBtns.forEach((btn) => {
          btn.addEventListener('click', () => {
            const c = parseInt(btn.getAttribute('data-st-mg-cols'));
            setActive(colBtns, c, 'data-st-mg-cols');
            stringTune.emit('masonry:update:st-mg', { cols: c });
          });
        });

        modeBtns.forEach((btn) => {
          btn.addEventListener('click', () => {
            const m = btn.getAttribute('data-st-mg-mode');
            setActive(modeBtns, m, 'data-st-mg-mode');
            grid.setAttribute('string-masonry-mode', m);
            stringTune.emit('masonry:update:st-mg', { mode: m });
          });
        });

        if (timingCb) {
          timingCb.addEventListener('change', () => {
            items.forEach((item) => {
              const d = timingCb.checked ? randomNumber(1200, 3000).toString() : '1200';
              item.setAttribute('string-masonry-position-time', d);
              item.setAttribute('string-masonry-size-time', d);
            });
            stringTune.emit('masonry:update:st-mg', {});
          });
        }

        setActive(colBtns, cols, 'data-st-mg-cols');
        setActive(modeBtns, 'manual', 'data-st-mg-mode');
      }

      stringTune.emit('masonry:update:st-mg', { cols });
    }, 300);
  }, [cols, gap, showControls]);

  useEffect(() => {
    initRef.current = false;
    setup();
  }, [setup]);

  return (
    <div className={`st-masonry-gallery ${className}`} style={style} ref={wrapperRef}>
      {showControls && (
        <div className="st-mg-controls">
          <div className="st-mg-control-group">
            <span>Columns</span>
            <div className="st-mg-btn-group">
              {[3, 4, 5, 6].map((n) => (
                <button key={n} className="st-mg-btn" data-st-mg-cols={n}>{n}</button>
              ))}
            </div>
          </div>
          <div className="st-mg-control-group">
            <span>Mode</span>
            <div className="st-mg-btn-group">
              <button className="st-mg-btn" data-st-mg-mode="auto">Auto</button>
              <button className="st-mg-btn" data-st-mg-mode="manual">Manual</button>
            </div>
          </div>
          <div className="st-mg-control-group">
            <span>Timing</span>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', color: '#ccc', fontSize: '0.85rem' }}>
              <input type="checkbox" className="st-mg-timing-toggle" />
              Random
            </label>
          </div>
        </div>
      )}

      <div className="st-mg-grid">
        {images.map((img, i) => (
          <div key={i} className="st-mg-item">
            <figure>
              <img src={img.src} alt={img.alt || `Image ${i + 1}`} />
            </figure>
            <span>image {i}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
