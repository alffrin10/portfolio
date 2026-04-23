import { useState, useEffect, useCallback, startTransition } from 'react';

export function useTheme() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('alffrin_theme') || 'luminus';
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('alffrin_theme', theme);
  }, [theme]);

  const toggle = useCallback(() => {
    startTransition(() => {
      setTheme(t => t === 'void' ? 'luminus' : 'void');
    });
  }, []);

  return { theme, toggle };
}

