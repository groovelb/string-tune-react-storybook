import { useEffect, useRef } from 'react';
import { StringTune } from '@fiddle-digital/string-tune';
import { Masonry } from '../../components/string-tune';
import './string-tune.css';

const IMAGES = [
  { src: 'https://picsum.photos/582/451', alt: 'Image 1' },
  { src: 'https://picsum.photos/582/576', alt: 'Image 2' },
  { src: 'https://picsum.photos/770/587', alt: 'Image 3' },
  { src: 'https://picsum.photos/768/433', alt: 'Image 4' },
  { src: 'https://picsum.photos/728/528', alt: 'Image 5' },
  { src: 'https://picsum.photos/456/489', alt: 'Image 6' },
  { src: 'https://picsum.photos/572/419', alt: 'Image 7' },
  { src: 'https://picsum.photos/715/403', alt: 'Image 8' },
  { src: 'https://picsum.photos/703/500', alt: 'Image 9' },
  { src: 'https://picsum.photos/629/511', alt: 'Image 10' },
  { src: 'https://picsum.photos/659/467', alt: 'Image 11' },
  { src: 'https://picsum.photos/622/560', alt: 'Image 12' },
  { src: 'https://picsum.photos/522/514', alt: 'Image 13' },
  { src: 'https://picsum.photos/540/553', alt: 'Image 14' },
  { src: 'https://picsum.photos/726/577', alt: 'Image 15' },
];

const FIXED_SPEED = 1200;
const randomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const meta = {
  title: 'StringTune/Layouts/MasonryOrchestrated',
  component: Masonry,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Interactive **Masonry** grid layout with controls for column count, layout mode (auto/manual), and random timing.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    cols: {
      description: '반응형 컬럼 설정 (breakpoint:cols, | 구분)',
      control: { type: 'text' },
    },
    mode: {
      description: '레이아웃 모드',
      control: { type: 'select' },
      options: ['auto', 'manual'],
    },
    gap: {
      description: '반응형 간격 설정 (breakpoint:gap, | 구분)',
      control: { type: 'text' },
    },
  },
};

export default meta;

/**
 * 원본 HTML 데모와 동일한 DOM을 useRef + setAttribute로 직접 생성.
 * React의 속성 변환을 거치지 않음.
 */
function MasonryOrchestratedRecipe({ cols, mode, gap }) {
  const wrapperRef = useRef(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    // 그리드에 string-* 속성 직접 설정
    const grid = wrapper.querySelector('.masonry-grid');
    grid.setAttribute('string', 'masonry');
    grid.setAttribute('string-id', 'gallery');
    grid.setAttribute('string-masonry-cols', cols);
    grid.setAttribute('string-masonry-mode', mode);
    grid.setAttribute('string-masonry-gap', gap);

    // 각 아이템에 속성 직접 설정
    const items = grid.querySelectorAll('.masonry-item');
    items.forEach((item) => {
      item.setAttribute('string-masonry-position-time', '1200');
      item.setAttribute('string-masonry-position-easing', 'cubic-bezier(0.69, 0, 0, 1)');
      item.setAttribute('string-masonry-size-time', '1200');
      item.setAttribute('string-masonry-size-easing', 'cubic-bezier(0.69, 0, 0, 1)');
    });

    // 각 이미지에 lazy 속성 직접 설정
    const imgs = grid.querySelectorAll('img[data-lazy-src]');
    imgs.forEach((img) => {
      const src = img.getAttribute('data-lazy-src');
      img.removeAttribute('data-lazy-src');
      img.setAttribute('string', 'lazy');
      img.setAttribute('string-lazy', src);
    });

    // Provider 초기화 대기
    const timer = setTimeout(() => {
      const stringTune = StringTune.getInstance();
      const colControls = wrapper.querySelector('#col-controls');
      const modeControls = wrapper.querySelector('#mode-controls');
      const timingCheckbox = wrapper.querySelector('#masonry-random-timing-toggle');

      const colButtons = colControls.querySelectorAll('button');
      const modeButtons = modeControls.querySelectorAll('button');

      const setActive = (buttons, value, attr) => {
        buttons.forEach((btn) => {
          if (btn.getAttribute(attr) == value) {
            btn.classList.add('-active');
          } else {
            btn.classList.remove('-active');
          }
        });
      };

      colButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
          const colCount = parseInt(btn.getAttribute('data-cols'));
          setActive(colButtons, colCount, 'data-cols');
          stringTune.emit('masonry:update:gallery', { cols: colCount });
        });
      });

      modeButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
          const modeVal = btn.getAttribute('data-mode');
          setActive(modeButtons, modeVal, 'data-mode');
          grid.setAttribute('string-masonry-mode', modeVal);
          stringTune.emit('masonry:update:gallery', { mode: modeVal });
        });
      });

      const updateTiming = () => {
        const isRandom = timingCheckbox?.checked;
        items.forEach((item) => {
          const duration = isRandom
            ? randomNumber(1200, 3000).toString()
            : FIXED_SPEED.toString();
          item.setAttribute('string-masonry-position-time', duration);
          item.setAttribute('string-masonry-size-time', duration);
        });
        stringTune.emit('masonry:update:gallery', {});
      };

      stringTune.on('masonry:shuffle:start', () => {
        grid.classList.add('shuffling');
      });
      stringTune.on('masonry:shuffle:end', () => {
        grid.classList.remove('shuffling');
      });

      if (timingCheckbox) {
        timingCheckbox.checked = false;
        timingCheckbox.disabled = false;
        timingCheckbox.addEventListener('change', updateTiming);
        updateTiming();
      }

      setActive(colButtons, '3', 'data-cols');
      setActive(modeButtons, 'manual', 'data-mode');
      stringTune.emit('masonry:update:gallery', { cols: 3 });
      grid.setAttribute('string-masonry-mode', 'manual');
    }, 300);

    return () => clearTimeout(timer);
  }, [cols, mode, gap]);

  return (
    <div className="masonry-demo-wrapper" ref={wrapperRef}>
      <div className="-w">
        <nav className="controls">
          <div className="control-group">
            <span className="-mm -up">Columns</span>
            <div className="button-group" id="col-controls">
              <button className="-m" data-cols="3">3</button>
              <button className="-m" data-cols="4">4</button>
              <button className="-m" data-cols="5">5</button>
              <button className="-m -not-on-m" data-cols="6">6</button>
              <button className="-m -not-on-m" data-cols="7">7</button>
              <button className="-m -not-on-m" data-cols="8">8</button>
            </div>
          </div>
          <div className="control-group">
            <span className="-mm -up">Mode</span>
            <div className="button-group" id="mode-controls">
              <button className="-m" data-mode="auto">Auto</button>
              <button className="-m" data-mode="manual">Manual</button>
            </div>
          </div>
          <div className="control-group">
            <span className="-mm -up">Timing</span>
            <div className="checkbox-wrap">
              <input type="checkbox" id="masonry-random-timing-toggle" />
              <span className="checkbox-toggle"><span></span></span>
              <label className="-m" htmlFor="masonry-random-timing-toggle">Random</label>
            </div>
          </div>
        </nav>

        <div className="masonry-grid" id="masonry-grid">
          {IMAGES.map((img, i) => (
            <div key={i} className="masonry-item">
              <figure>
                <img data-lazy-src={img.src} alt={img.alt} />
              </figure>
              <span className="-mm">image {i}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export const Default = {
  args: {
    cols: '2|768:3|1024:4|1440:5',
    mode: 'manual',
    gap: '6|1024:8|1600:9|1920:10|2560:11',
  },
  render: (args) => <MasonryOrchestratedRecipe {...args} />,
  parameters: {
    docs: {
      description: {
        story:
          'Interactive masonry grid with column/mode/timing controls. Click column buttons to change layout, toggle between Auto/Manual mode, and enable random timing for staggered animations.',
      },
    },
  },
};
