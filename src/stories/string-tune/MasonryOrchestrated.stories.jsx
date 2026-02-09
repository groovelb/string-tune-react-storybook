import { useState, useCallback } from 'react';
import { Masonry, MasonryItem, useStringTune } from '../../components/string-tune';
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

/**
 * Masonry Orchestrated Demo (layouts/tutorial-02)
 *
 * Interactive masonry grid with controls for columns, mode, and timing.
 * Uses StringMasonry module with event emission for dynamic grid updates.
 */
const meta = {
  title: 'StringTune/Layouts/MasonryOrchestrated',
  component: Masonry,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Interactive **Masonry** grid layout with controls for column count, layout mode (auto/manual), and random timing. Uses `StringMasonry` module with `masonry:update` events for dynamic grid reconfiguration.',
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
    stringId: {
      description: 'StringTune 인스턴스 ID (이벤트 타겟)',
      control: { type: 'text' },
    },
  },
};

export default meta;

function MasonryOrchestratedRecipe({ cols, mode, gap, stringId }) {
  const { instance } = useStringTune();
  const [activeCols, setActiveCols] = useState(3);
  const [activeMode, setActiveMode] = useState(mode);
  const [randomTiming, setRandomTiming] = useState(false);
  const [itemTimings, setItemTimings] = useState(
    () => IMAGES.map(() => FIXED_SPEED)
  );

  const colOptions = [3, 4, 5, 6, 7, 8];

  const handleColChange = useCallback((colCount) => {
    setActiveCols(colCount);
    if (instance) {
      instance.emit(`masonry:update:${stringId}`, { cols: colCount });
    }
  }, [instance, stringId]);

  const handleModeChange = useCallback((newMode) => {
    setActiveMode(newMode);
    if (instance) {
      instance.emit(`masonry:update:${stringId}`, { mode: newMode });
    }
  }, [instance, stringId]);

  const handleTimingToggle = useCallback((checked) => {
    setRandomTiming(checked);
    const newTimings = IMAGES.map(() =>
      checked ? randomNumber(1200, 3000) : FIXED_SPEED
    );
    setItemTimings(newTimings);
    if (instance) {
      instance.emit(`masonry:update:${stringId}`, {});
    }
  }, [instance, stringId]);

  return (
    <div className="masonry-demo-wrapper">
      <div className="-w">
        <nav className="controls">
          <div className="control-group">
            <span className="-mm -up">Columns</span>
            <div className="button-group">
              {colOptions.map((col) => (
                <button
                  key={col}
                  className={`-m${activeCols === col ? ' -active' : ''}${col > 5 ? ' -not-on-m' : ''}`}
                  onClick={() => handleColChange(col)}
                >
                  {col}
                </button>
              ))}
            </div>
          </div>
          <div className="control-group">
            <span className="-mm -up">Mode</span>
            <div className="button-group">
              {['auto', 'manual'].map((m) => (
                <button
                  key={m}
                  className={`-m${activeMode === m ? ' -active' : ''}`}
                  onClick={() => handleModeChange(m)}
                >
                  {m.charAt(0).toUpperCase() + m.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <div className="control-group">
            <span className="-mm -up">Timing</span>
            <div className="checkbox-wrap">
              <input
                type="checkbox"
                id="masonry-random-timing-toggle"
                checked={randomTiming}
                onChange={(e) => handleTimingToggle(e.target.checked)}
              />
              <span className="checkbox-toggle"><span></span></span>
              <label className="-m" htmlFor="masonry-random-timing-toggle">Random</label>
            </div>
          </div>
        </nav>

        <Masonry
          className="masonry-grid"
          cols={cols}
          mode={activeMode}
          gap={gap}
          stringId={stringId}
        >
          {IMAGES.map((img, i) => (
            <MasonryItem
              key={i}
              className="masonry-item"
              positionTime={itemTimings[i]}
              sizeTime={itemTimings[i]}
            >
              <figure>
                <img
                  data-string="lazy"
                  data-string-lazy={img.src}
                  alt={img.alt}
                />
              </figure>
              <span className="-mm">image {i}</span>
            </MasonryItem>
          ))}
        </Masonry>
      </div>
    </div>
  );
}

export const Default = {
  args: {
    cols: '2|768:3|1024:4|1440:5',
    mode: 'manual',
    gap: '6|1024:8|1600:9|1920:10|2560:11',
    stringId: 'gallery',
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
