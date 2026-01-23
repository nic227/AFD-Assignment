import { describe, it, expect } from 'vitest';
import { store } from '../store/store';

describe('Redux store', () => {
  it('should initialize with the correct default state', () => {
    const state = store.getState();
    expect(state).toHaveProperty('theme');
    expect(state).toHaveProperty('projects');
    expect(state).toHaveProperty('contact');
    // Check a few defaults
    expect(state.theme).toHaveProperty('mode');
    expect(state.projects).toHaveProperty('projects');
    expect(state.contact).toHaveProperty('formData');
  });

  it('should dispatch actions and update state', () => {
    store.dispatch({ type: 'theme/toggleTheme' });
    const state = store.getState();
    expect(['light', 'dark']).toContain(state.theme.mode);
  });
});
