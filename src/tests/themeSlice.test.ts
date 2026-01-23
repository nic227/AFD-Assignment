import { describe, it, expect, afterEach } from 'vitest';
import reducer, {
  toggleTheme,
  setTheme,
  setFontSize,
  toggleHighContrast,
  setReducedMotion,
  getInitialMode,
  getInitialReducedMotion,
} from '../store/slices/themeSlice';

describe('themeSlice', () => {
  const initialState = {
    mode: 'dark' as const,
    fontSize: 'medium' as const,
    highContrast: false,
    reducedMotion: false,
  };

  it('should handle initial state', () => {
    expect(reducer(undefined, { type: '@@INIT' })).toEqual(expect.objectContaining(initialState));
  });

  it('should toggle theme', () => {
    expect(reducer({ ...initialState, mode: 'dark' as const }, toggleTheme())).toMatchObject({ mode: 'light' });
    expect(reducer({ ...initialState, mode: 'light' as const }, toggleTheme())).toMatchObject({ mode: 'dark' });
  });

  it('should set theme', () => {
    expect(reducer(initialState, setTheme('light'))).toMatchObject({ mode: 'light' });
  });

  it('should set theme to dark from light', () => {
    expect(reducer({ ...initialState, mode: 'light' }, setTheme('dark'))).toMatchObject({ mode: 'dark' });
  });

  it('should set font size', () => {
    expect(reducer(initialState, setFontSize('large'))).toMatchObject({ fontSize: 'large' });
  });

  it('should set font size to small and medium', () => {
    expect(reducer(initialState, setFontSize('small'))).toMatchObject({ fontSize: 'small' });
    expect(reducer(initialState, setFontSize('medium'))).toMatchObject({ fontSize: 'medium' });
  });

  it('should toggle high contrast', () => {
    expect(reducer({ ...initialState, highContrast: false }, toggleHighContrast())).toMatchObject({ highContrast: true });
  });

  it('should toggle high contrast twice', () => {
    const state1 = reducer(initialState, toggleHighContrast());
    expect(state1.highContrast).toBe(true);
    const state2 = reducer(state1, toggleHighContrast());
    expect(state2.highContrast).toBe(false);
  });

  it('should set reduced motion', () => {
    expect(reducer(initialState, setReducedMotion(true))).toMatchObject({ reducedMotion: true });
  });

  it('should set reduced motion to false', () => {
    expect(reducer({ ...initialState, reducedMotion: true }, setReducedMotion(false))).toMatchObject({ reducedMotion: false });
  });

  it('should not mutate state for unknown action', () => {
    const prev = { ...initialState };
    expect(reducer(prev, { type: 'UNKNOWN' })).toEqual(prev);
  });
});

describe('themeSlice initial state helpers', () => {
  const originalWindow = globalThis.window;
  const originalLocalStorage = globalThis.localStorage;
  afterEach(() => {
    globalThis.window = originalWindow;
    globalThis.localStorage = originalLocalStorage;
  });

  it('getInitialMode returns dark if window is undefined', () => {
    // @ts-ignore
    delete globalThis.window;
    expect(getInitialMode()).toBe('dark');
  });

  it('getInitialMode returns saved theme if valid', () => {
    globalThis.window = {} as any;
    globalThis.localStorage = {
      getItem: (key: string) => (key === 'theme' ? 'light' : null),
    } as any;
    expect(getInitialMode()).toBe('light');
  });

  it('getInitialMode returns dark if saved theme is invalid', () => {
    globalThis.window = {} as any;
    globalThis.localStorage = {
      getItem: () => 'blue',
    } as any;
    expect(getInitialMode()).toBe('dark');
  });

  it('getInitialReducedMotion returns false if window is undefined', () => {
    // @ts-ignore
    delete globalThis.window;
    expect(getInitialReducedMotion()).toBe(false);
  });

  it('getInitialReducedMotion returns true if matchMedia matches', () => {
    globalThis.window = {
      matchMedia: () => ({ matches: true }),
    } as any;
    expect(getInitialReducedMotion()).toBe(true);
  });

  it('getInitialReducedMotion returns false if matchMedia does not match', () => {
    globalThis.window = {
      matchMedia: () => ({ matches: false }),
    } as any;
    expect(getInitialReducedMotion()).toBe(false);
  });
});
