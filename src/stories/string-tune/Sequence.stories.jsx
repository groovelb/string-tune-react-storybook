// Storybook imports handled by framework
import { Sequence, SequenceContainer } from '../../components/string-tune';
import './string-tune.css';
import img13 from '../../assets/alphabet/13-b.png';

const meta = {
  title: 'StringTune/Basic/Sequence',
  component: Sequence,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          '여러 요소의 순차적 애니메이션을 제어합니다. 같은 name을 가진 요소들이 시퀀스 그룹을 형성하며, `-active`, `-entering`, `-leaving` 클래스가 자동으로 토글됩니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    name: {
      description: '시퀀스 그룹 이름',
      control: 'text',
    },
    index: {
      description: '시퀀스 내 인덱스 (0부터 시작)',
      control: 'number',
    },
    trigger: {
      description: '트리거 모드 - 클릭 시 해당 인덱스 활성화',
      control: 'text',
    },
    as: {
      description: '렌더링할 HTML 태그',
      control: 'select',
      options: ['div', 'section', 'article', 'button', 'figure'],
    },
  },
};

export default meta;

const IMAGE_URL = img13;

// VILNIUS SVG path
const VilniusSvg = () => (
  <svg className="vilnius-svg" viewBox="0 0 568 334">
    <path d="M86,330L129.6.8h-30.4c-11.2,81.6-29.6,245.2-32.8,276.8C63.2,246.4,45.6,82,36,.8H4.4l40.8,329.2h40.8ZM159.2,50.8V.8h-27.6v50h27.6ZM159.2,330V82.4h-27.6v247.6h27.6ZM190.8,330V.8h-27.6v329.2h27.6ZM287.2,330V124c0-32-10-45.6-32.4-45.6s-28,8.8-35.6,22.8c0-6.4-.4-12.8-1.2-18.8h-23.2v247.6h27.6V120.8c4.4-10.8,13.2-15.2,21.2-15.2,11.6,0,16,5.6,16,20v204.4h27.6ZM318.8,50.8V.8h-27.6v50h27.6ZM318.8,330V82.4h-27.6v247.6h27.6ZM414.4,330V82.4h-27.6v208.4c-4.4,10.8-12.8,14.8-21.2,14.8s-15.2-5.2-15.2-20V82.4h-27.6v207.6c0,28.4,10.8,42.8,32,42.8s27.6-7.6,35.2-20.8c0,6.4.4,12,.8,18h23.6ZM480,286.8c0,13.2-6.4,20-17.6,20s-19.2-7.6-19.2-20v-39.6h-24.8v40.4c0,31.6,14.4,46,44.8,46s44.4-13.6,44.4-44.8v-26.8c0-21.2-3.2-32.8-15.6-47.2-10.4-12-22.8-20.4-35.6-33.6-9.2-9.6-11.2-14.4-11.2-26v-29.2c0-13.2,6.4-20,17.2-20s18.8,7.6,18.8,20v40.4h25.2v-40.4c0-32.8-10.4-47.6-42.8-47.6s-45.2,12.8-45.2,47.6v25.6c0,19.2,2.4,28.8,12.8,40.8,10,11.6,25.6,24,36.8,37.2,9.6,11.6,12,18,12,28.8v28.4Z" />
  </svg>
);

// FESTIVAL SVG path
const FestivalSvg = () => (
  <svg className="festival-svg" viewBox="0 0 568 334">
    <path d="M118,78.4c29.6,0,44.4,16.8,44.4,50.8v79.6h-61.6v74.8c0,14.8,5.6,22,17.2,22s18.4-7.2,18.4-22v-44.4h26v44.4c0,33.2-14.8,50-44.4,50s-42.8-16.8-42.8-50v-154.4c0-33.6,15.2-50.8,42.8-50.8ZM89.8.8v30.8H31v117.2h40.4v30.4H31v150.8H.6V.8h89.2ZM118,107.2c-11.6,0-17.2,7.2-17.2,22v59.6h35.6v-59.6c0-14.8-6-22-18.4-22ZM211.6,78.4c32.4,0,42.8,14.8,42.8,47.6v40.4h-25.2v-40.4c0-12.4-7.6-20-18.8-20s-17.2,6.8-17.2,20v29.2c0,11.6,2,16.4,11.2,26,12.8,13.2,25.2,21.6,35.6,33.6,12.4,14.4,15.6,26,15.6,47.2v26.8c0,31.2-15.2,44.8-44.4,44.8s-44.8-14.4-44.8-46v-48.4h24.8v47.6c0,12.4,7.6,20,19.2,20s17.6-6.8,17.6-20v-28.4c0-10.8-2.4-17.2-12-28.8-11.2-13.2-26.8-25.6-36.8-37.2-10.4-12-12.8-21.6-12.8-40.8v-25.6c0-34.8,15.2-47.6,45.2-47.6ZM287.2.8v54h31.6v23.6h-31.6v251.6h-27.6V78.4h-17.6v-23.6h17.6V.8h27.6ZM318.8,82.4v247.6h-27.6V82.4h27.6ZM318.8.8v50h-27.6V.8h27.6ZM462.4,78.4c29.2,0,43.6,16.4,43.6,48.8v202.8h-24.8v-14.8c-6.8,12.4-16.4,18.4-29.6,18.4-22.4,0-35.6-11.6-35.6-39.2v-36.4c0-48.4,28.4-61.6,63.6-76.4v-54c0-14-4-21.6-18-21.6s-18,7.6-18,21.6v52h-24.4v-52.4c0-32.4,12.8-48.8,43.2-48.8ZM348.4,82.4c2.6,18.5,5.4,39.7,8.2,61.2l.5,4.2c6,46.4,11.5,93.1,13.7,114.3,3.2-31.6,15.2-120,24.8-179.6h26.4l-37.6,247.6h-27.6l-36-247.6h27.6ZM479.6,203.6c-32.4,12-36.8,26.4-36.8,56.4v26.4c0,13.6,6.4,20.4,18.8,20.4s15.2-4.4,18-15.6v-87.6ZM537.6,330V.8h-27.6v329.2h27.6ZM570,330v-50h-28.4v50h28.4Z" />
  </svg>
);

export const Default = {
  args: {
    name: 'demo',
    index: 0,
  },
  render: () => (
    <div className="sequence-demo-wrapper">
      {/* Navigation Arrows */}
      <nav className="sequence-nav-arrows">
        <Sequence as="span" name="demo" trigger="prev|loop">
          ←
        </Sequence>
        <Sequence as="span" name="demo" trigger="next|loop">
          →
        </Sequence>
      </nav>

      {/* Mini Sequence Preview */}
      <div className="sequence-mini">
        {[0, 1, 2, 3].map((i) => (
          <Sequence key={i} as="figure" name="demo" index={i} trigger={i}>
            <img src={IMAGE_URL} alt={`Slide ${i + 1}`} />
          </Sequence>
        ))}
      </div>

      <VilniusSvg />

      {/* Main Image Sequence */}
      <SequenceContainer
        name="demo"
        activeStep={0}
        enteringDuration={50}
        leavingDuration={900}
        className="sequence-image-container"
      >
        {[0, 1, 2, 3].map((i) => (
          <Sequence key={i} as="figure" name="demo" index={i}>
            <img src={IMAGE_URL} alt={`Slide ${i + 1}`} />
          </Sequence>
        ))}
      </SequenceContainer>

      <FestivalSvg />

      {/* Page Navigation */}
      <nav className="sequence-nav-pages">
        {[0, 1, 2, 3].map((i) => (
          <Sequence key={i} as="span" name="demo" index={i} trigger={i}>
            {i + 1}
          </Sequence>
        ))}
      </nav>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          '"VILNIUS FESTIVAL" 로고 사이에 이미지 슬라이더가 배치된 예제입니다. 화살표 버튼과 페이지 번호를 클릭하여 이미지를 전환할 수 있습니다. 전환 시 clip-path 애니메이션이 적용됩니다.',
      },
    },
  },
};
