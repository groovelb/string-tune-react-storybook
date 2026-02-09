import { useEffect, useRef, useState, useCallback, createContext, useContext } from 'react';
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
  StringMasonry,
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
  masonry: StringMasonry,
};

const ALL_MODULES = Object.keys(MODULE_MAP);

/**
 * StringTune Provider
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {Array<'lazy'|'parallax'|'progress'|'lerp'|'glide'|'cursor'|'magnetic'|'spotlight'|'impulse'|'split'|'form'|'sequence'|'fpsTracker'|'positionTracker'|'masonry'>} [props.modules]
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
  const [instance, setInstance] = useState(null);
  const instanceRef = useRef(null);

  useEffect(() => {
    const inst = StringTune.getInstance();
    instanceRef.current = inst;
    setInstance(inst);

    modules.forEach((moduleName) => {
      const Module = MODULE_MAP[moduleName];
      if (Module) {
        inst.use(Module);
        if (debug) {
          console.log(`[StringTune] Module registered: ${moduleName}`);
        }
      }
    });

    inst.start(debug ? 1 : 0);

    if (modules.includes('fpsTracker')) {
      inst.FPSTrackerVisible = fpsTrackerVisible;
    }
    if (modules.includes('positionTracker')) {
      inst.PositionTrackerVisible = positionTrackerVisible;
    }

    if (debug) {
      console.log('[StringTune] Started with modules:', modules);
      window.StringTuneContext = inst;
    }

    return () => {
      if (instanceRef.current) {
        instanceRef.current.destroy();
        instanceRef.current = null;
        setInstance(null);
        if (debug) {
          console.log('[StringTune] Destroyed');
        }
      }
    };
  }, [modules, debug, fpsTrackerVisible, positionTrackerVisible]);

  const refresh = useCallback(() => {
    if (instanceRef.current) {
      instanceRef.current.refresh();
    }
  }, []);

  return (
    <StringTuneContext.Provider value={{ instance, refresh }}>
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
