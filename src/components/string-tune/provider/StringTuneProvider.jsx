import { useEffect, useRef, createContext, useContext } from 'react';
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
  StringFPSTracker,
  StringPositionTracker,
} from '@fiddle-digital/string-tune';

const StringTuneContext = createContext({
  instance: null,
  refresh: () => {},
});

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
  fpsTracker: StringFPSTracker,
  positionTracker: StringPositionTracker,
};

const ALL_MODULES = Object.keys(MODULE_MAP);

/**
 * StringTune Provider
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {Array<'lazy'|'parallax'|'progress'|'lerp'|'glide'|'cursor'|'magnetic'|'spotlight'|'impulse'|'split'|'form'|'sequence'|'fpsTracker'|'positionTracker'>} [props.modules]
 * @param {boolean} [props.debug=false]
 * @param {boolean} [props.fpsTrackerVisible=false]
 * @param {boolean} [props.positionTrackerVisible=false]
 */
export function StringTuneProvider({
  children,
  modules = ALL_MODULES,
  debug = false,
  fpsTrackerVisible = false,
  positionTrackerVisible = false,
}) {
  const instanceRef = useRef(null);

  useEffect(() => {
    const instance = StringTune.getInstance();
    instanceRef.current = instance;

    modules.forEach((moduleName) => {
      const Module = MODULE_MAP[moduleName];
      if (Module) {
        instance.use(Module);
        if (debug) {
          console.log(`[StringTune] Module registered: ${moduleName}`);
        }
      }
    });

    instance.start(debug ? 1 : 0);

    if (modules.includes('fpsTracker')) {
      instance.FPSTrackerVisible = fpsTrackerVisible;
    }
    if (modules.includes('positionTracker')) {
      instance.PositionTrackerVisible = positionTrackerVisible;
    }

    if (debug) {
      console.log('[StringTune] Started with modules:', modules);
      window.StringTuneContext = instance;
    }

    return () => {
      if (instanceRef.current) {
        instanceRef.current.destroy();
        instanceRef.current = null;
        if (debug) {
          console.log('[StringTune] Destroyed');
        }
      }
    };
  }, [modules, debug, fpsTrackerVisible, positionTrackerVisible]);

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
 * Hook to access StringTune instance
 * @returns {{ instance: StringTune | null, refresh: () => void }}
 */
export function useStringTune() {
  const context = useContext(StringTuneContext);
  if (!context) {
    throw new Error('useStringTune must be used within a StringTuneProvider');
  }
  return context;
}

export { StringTuneContext };
