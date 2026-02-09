import { useEffect, useRef } from 'react';
import { StringTune } from '@fiddle-digital/string-tune';
import { Masonry } from '../../components/string-tune';
import './string-tune.css';

import img1 from '../../assets/alphabet/1-v.png';
import img2 from '../../assets/alphabet/2-i.png';
import img3 from '../../assets/alphabet/3-b.png';
import img4 from '../../assets/alphabet/4-e.png';
import img5 from '../../assets/alphabet/5-d.png';
import img6 from '../../assets/alphabet/6-e.png';
import img7 from '../../assets/alphabet/7-s.png';
import img8 from '../../assets/alphabet/8-i.png';
import img9 from '../../assets/alphabet/9-g.png';
import img10 from '../../assets/alphabet/10-n.png';
import img11 from '../../assets/alphabet/11-l.png';
import img12 from '../../assets/alphabet/12-a.png';
import img13 from '../../assets/alphabet/13-b.png';

const IMAGES = [
  { src: img1, alt: 'V' },
  { src: img2, alt: 'I' },
  { src: img3, alt: 'B' },
  { src: img4, alt: 'E' },
  { src: img5, alt: 'D' },
  { src: img6, alt: 'E' },
  { src: img7, alt: 'S' },
  { src: img8, alt: 'I' },
  { src: img9, alt: 'G' },
  { src: img10, alt: 'N' },
  { src: img11, alt: 'L' },
  { src: img12, alt: 'A' },
  { src: img13, alt: 'B' },
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

    // 로컬 이미지는 lazy 불필요 — 이미 Vite가 번들한 경로이므로 src 직접 사용

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
                <img src={img.src} alt={img.alt} />
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
