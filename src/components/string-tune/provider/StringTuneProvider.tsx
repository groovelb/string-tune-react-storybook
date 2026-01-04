import { useEffect, useRef, createContext, useContext, type ReactNode } from 'react';
import {
  StringTune,
  StringLazy,
  StringParallax,
  StringProgress,
  StringLerp,
  StringGlide,
  StringCursor,
  StringMagnetic,
  StringSpotlight,
  StringImpulse,
  StringSplit,
  StringForm,
  StringSequence,
} from '@fiddle-digital/string-tune';

interface StringTuneContextValue {
  instance: StringTune | null;
  refresh: () => void;
}

const StringTuneContext = createContext<StringTuneContextValue>({
  instance: null,
  refresh: () => {},
});

export interface StringTuneProviderProps {
  children: ReactNode;
  /** 사용할 모듈 선택 (기본: 전체) */
  modules?: Array<
    | 'lazy'
    | 'parallax'
    | 'progress'
    | 'lerp'
    | 'glide'
    | 'cursor'
    | 'magnetic'
    | 'spotlight'
    | 'impulse'
    | 'split'
    | 'form'
    | 'sequence'
  >;
  /** 디버그 모드 */
  debug?: boolean;
}

const MODULE_MAP = {
  lazy: StringLazy,
  parallax: StringParallax,
  progress: StringProgress,
  lerp: StringLerp,
  glide: StringGlide,
  cursor: StringCursor,
  magnetic: StringMagnetic,
  spotlight: StringSpotlight,
  impulse: StringImpulse,
  split: StringSplit,
  form: StringForm,
  sequence: StringSequence,
} as const;

const ALL_MODULES = Object.keys(MODULE_MAP) as Array<keyof typeof MODULE_MAP>;

export function StringTuneProvider({
  children,
  modules = ALL_MODULES,
  debug = false,
}: StringTuneProviderProps) {
  const instanceRef = useRef<StringTune | null>(null);

  useEffect(() => {
    // StringTune 인스턴스 생성
    const instance = StringTune.getInstance();
    instanceRef.current = instance;

    // 선택된 모듈 등록
    modules.forEach((moduleName) => {
      const Module = MODULE_MAP[moduleName];
      if (Module) {
        instance.use(Module);
        if (debug) {
          console.log(`[StringTune] Module registered: ${moduleName}`);
        }
      }
    });

    // StringTune 시작
    instance.start(debug ? 1 : 0);

    if (debug) {
      console.log('[StringTune] Started with modules:', modules);
      // 글로벌 접근용 (디버깅)
      (window as unknown as { StringTuneContext: StringTune }).StringTuneContext = instance;
    }

    return () => {
      // 클린업
      if (instanceRef.current) {
        instanceRef.current.destroy();
        instanceRef.current = null;
        if (debug) {
          console.log('[StringTune] Destroyed');
        }
      }
    };
  }, [modules, debug]);

  const refresh = () => {
    if (instanceRef.current) {
      instanceRef.current.refresh();
    }
  };

  return (
    <StringTuneContext.Provider value={{ instance: instanceRef.current, refresh }}>
      {children}
    </StringTuneContext.Provider>
  );
}

/**
 * StringTune 인스턴스에 접근하기 위한 훅
 */
export function useStringTune() {
  const context = useContext(StringTuneContext);
  if (!context) {
    throw new Error('useStringTune must be used within a StringTuneProvider');
  }
  return context;
}

export { StringTuneContext };
