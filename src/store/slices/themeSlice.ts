import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface ThemeState {
  mode: 'light' | 'dark';
  fontSize: 'small' | 'medium' | 'large';
  highContrast: boolean;
  reducedMotion: boolean;
}

const initialState: ThemeState = {
  mode: (localStorage.getItem('theme') as 'light' | 'dark') || 'dark',
  fontSize: 'medium',
  highContrast: false,
  reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === 'dark' ? 'light' : 'dark';
      localStorage.setItem('theme', state.mode);
      document.documentElement.setAttribute('data-theme', state.mode);
    },
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.mode = action.payload;
      localStorage.setItem('theme', state.mode);
      document.documentElement.setAttribute('data-theme', state.mode);
    },
    setFontSize: (state, action: PayloadAction<'small' | 'medium' | 'large'>) => {
      state.fontSize = action.payload;
      localStorage.setItem('fontSize', state.fontSize);
    },
    toggleHighContrast: (state) => {
      state.highContrast = !state.highContrast;
      localStorage.setItem('highContrast', JSON.stringify(state.highContrast));
    },
    setReducedMotion: (state, action: PayloadAction<boolean>) => {
      state.reducedMotion = action.payload;
    },
  },
});

export const { toggleTheme, setTheme, setFontSize, toggleHighContrast, setReducedMotion } =
  themeSlice.actions;

export default themeSlice.reducer;
