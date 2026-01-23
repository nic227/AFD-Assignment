import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import { useAppDispatch, useAppSelector } from '../store/hooks';

// Test the custom hooks for Redux

describe('Redux hooks', () => {
  it('useAppDispatch returns the store dispatch function', () => {
    const { result } = renderHook(() => useAppDispatch(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });
    expect(typeof result.current).toBe('function');
  });

  it('useAppSelector selects state from the store', () => {
    const { result } = renderHook(() => useAppSelector(state => state.theme.mode), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });
    expect(['light', 'dark']).toContain(result.current);
  });
});
