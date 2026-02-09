import { useCallback, useEffect, useRef } from 'react';
import { useStringTune } from '../provider/StringTuneProvider.jsx';

/**
 * StringTune 이벤트 emit/on 래핑 훅
 *
 * Recipe 컴포넌트 내부에서 StringTune 인스턴스의 이벤트를
 * 명령형으로 조작할 때 사용한다. 디자이너에게 직접 노출하지 않는다.
 *
 * @example
 * const { emit, on, off } = useStringTuneEvent();
 * emit('masonry:update:gallery', { cols: 4 });
 *
 * @returns {{ emit: Function, on: Function, off: Function, instance: StringTune | null }}
 */
export function useStringTuneEvent() {
  const { instance } = useStringTune();
  const instanceRef = useRef(instance);
  instanceRef.current = instance;

  const emit = useCallback((event, data) => {
    if (instanceRef.current) {
      instanceRef.current.emit(event, data);
    }
  }, []);

  const on = useCallback((event, handler) => {
    if (instanceRef.current) {
      instanceRef.current.on(event, handler);
    }
  }, []);

  const off = useCallback((event, handler) => {
    if (instanceRef.current) {
      instanceRef.current.off(event, handler);
    }
  }, []);

  return { emit, on, off, instance };
}

/**
 * StringTune 이벤트 리스너 자동 등록/해제 훅
 *
 * 컴포넌트 마운트 시 리스너를 등록하고 언마운트 시 자동 해제한다.
 *
 * @example
 * useStringTuneListener('masonry:shuffle:end', () => {
 *   console.log('shuffle done');
 * });
 *
 * @param {string} event - 이벤트 이름
 * @param {Function} handler - 핸들러 함수
 */
export function useStringTuneListener(event, handler) {
  const { instance } = useStringTune();
  const handlerRef = useRef(handler);
  handlerRef.current = handler;

  useEffect(() => {
    if (!instance) return;
    const fn = (...args) => handlerRef.current(...args);
    instance.on(event, fn);
    return () => instance.off(event, fn);
  }, [instance, event]);
}
