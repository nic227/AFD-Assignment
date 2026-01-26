// Redux slice for theme and accessibility settings
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

// Theme mode type
export type ThemeMode = 'light' | 'dark';

// State shape for theme and accessibility
export interface ThemeState {
  mode: ThemeMode; // Light or dark mode
  fontSize: 'small' | 'medium' | 'large'; // Font size preference
  highContrast: boolean; // High contrast mode
  reducedMotion: boolean; // Reduced motion preference
}

// Helper to get initial theme mode from localStorage or default
export const getInitialMode = (): ThemeMode => {
  if (typeof window === 'undefined') return 'dark';
  const saved = localStorage.getItem('theme') as ThemeMode | null;
  return saved === 'light' || saved === 'dark' ? saved : 'dark';
};

// Helper to get reduced motion preference
export const getInitialReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Initial state for theme slice
const initialState: ThemeState = {
  mode: getInitialMode(),
  fontSize: 'medium',
  highContrast: false,
  reducedMotion: getInitialReducedMotion(),
};

// Create the theme slice with reducers for toggling and setting preferences
const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    // Toggle between light and dark mode
    toggleTheme: (state) => {
      state.mode = state.mode === 'dark' ? 'light' : 'dark';
    },
    // Set theme mode directly
    setTheme: (state, action: PayloadAction<ThemeMode>) => {
      state.mode = action.payload;
    },
    setFontSize: (state, action: PayloadAction<'small' | 'medium' | 'large'>) => {
      state.fontSize = action.payload;
    },
    toggleHighContrast: (state) => {
      state.highContrast = !state.highContrast;
    },
    setReducedMotion: (state, action: PayloadAction<boolean>) => {
      state.reducedMotion = action.payload;
    },
  },
});

export const { toggleTheme, setTheme, setFontSize, toggleHighContrast, setReducedMotion } =
  themeSlice.actions;

export default themeSlice.reducer;
