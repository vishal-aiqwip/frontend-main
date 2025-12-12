import { createContext, useEffect, useMemo, useState } from 'react';

import { logger } from '@/lib/logger';

const initialState = {
  theme: 'system',
  setTheme: () => null
};
const ThemeProviderContext = createContext(initialState);

const ThemeProvider = ({
  children,
  defaultTheme = 'system',
  storageKey = 'vite-ui-theme',
  ...props
}) => {
  const [theme, setTheme] = useState(defaultTheme);
  const [mounted, setMounted] = useState(false);

  // Load theme from localStorage after mount (SSR-safe)
  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored && ['light', 'dark', 'system'].includes(stored)) {
        setTheme(stored);
      }
    } catch (error) {
      logger.error('Failed to load theme from localStorage:', error);
    }
  }, [storageKey]);

  // Apply theme to document
  useEffect(() => {
    if (!mounted) return;

    const root = window.document.documentElement;

    root.classList.remove('light', 'dark');

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';

      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme, mounted]);

  // Save theme to localStorage
  useEffect(() => {
    if (!mounted) return;

    try {
      localStorage.setItem(storageKey, theme);
    } catch (error) {
      logger.error('Failed to save theme to localStorage:', error);
    }
  }, [theme, storageKey, mounted]);

  const value = useMemo(
    () => ({
      theme,
      setTheme: (newTheme) => {
        if (['light', 'dark', 'system'].includes(newTheme)) {
          setTheme(newTheme);
        }
      }
    }),
    [theme]
  );

  // Prevent flash of wrong theme during SSR
  if (!mounted) {
    return <div style={{ visibility: 'hidden' }}>{children}</div>;
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
};

export { ThemeProvider, ThemeProviderContext };
