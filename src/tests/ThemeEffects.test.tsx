import { render, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import ThemeEffects from '../components/ThemeEffects/ThemeEffects';

describe('ThemeEffects', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
    document.documentElement.style.colorScheme = '';
  });

  it('syncs theme mode to localStorage and DOM', async () => {
    render(
      <Provider store={store}>
        <ThemeEffects />
      </Provider>
    );
    const mode = store.getState().theme.mode;
    await waitFor(() => {
      expect(localStorage.getItem('theme')).toBe(mode);
      expect(document.documentElement.getAttribute('data-theme')).toBe(mode);
      expect(document.documentElement.style.colorScheme).toBe(mode);
    });
  });
});
