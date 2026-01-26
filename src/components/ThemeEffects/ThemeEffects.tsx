// ThemeEffects component
// Synchronizes Redux theme state with localStorage, DOM attributes, and browser color scheme
// Renders nothing; only handles side effects
import { useEffect } from 'react';
import { useAppSelector } from '../../store/hooks';

export default function ThemeEffects() {
  const mode = useAppSelector((state) => state.theme.mode);

  useEffect(() => {
    // Persist theme mode to localStorage
    localStorage.setItem('theme', mode);
    // Update DOM attribute for CSS theming
    document.documentElement.setAttribute('data-theme', mode);
    // Update browser color-scheme property
    document.documentElement.style.colorScheme = mode;
  }, [mode]);

  // This component renders nothing
  return null;
}
