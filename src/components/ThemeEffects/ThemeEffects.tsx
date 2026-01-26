import { useEffect } from 'react';
import { useAppSelector } from '../../store/hooks';

/**
 * ThemeEffects component
 * 
 * This component synchronizes Redux theme state with:
 * - localStorage (persistence)
 * - document.documentElement attributes (CSS theming)
 * - colorScheme style (browser native dark/light mode hints)
 * 
 * It renders nothing but handles all theme-related side effects.
 */
export default function ThemeEffects() {
  const mode = useAppSelector((state) => state.theme.mode);

  useEffect(() => {
    // Persist to localStorage
    localStorage.setItem('theme', mode);
    
    // Update DOM for CSS variable theming
    document.documentElement.setAttribute('data-theme', mode);
    
    // Update color-scheme for native browser styling
    document.documentElement.style.colorScheme = mode;
  }, [mode]);

  // This component renders nothing - it only handles effects
  return null;
}
