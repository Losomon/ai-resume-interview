import { useEffect, useState } from 'react';

export type Theme = 'light' | 'dark' | 'system';

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'light';
  try {
    const stored = localStorage.getItem('cf_theme') as Theme | null;
    if (stored === 'light' || stored === 'dark' || stored === 'system') return stored;
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
  } catch {}
  return 'light';
}

function resolveTheme(theme: Theme): 'light' | 'dark' {
  if (theme === 'system') {
    if (typeof window === 'undefined') return 'light';
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return theme;
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    const root = document.documentElement;
    const resolved = resolveTheme(theme);
    root.classList.toggle('dark', resolved === 'dark');
    try {
      localStorage.setItem('cf_theme', theme);
    } catch {}
  }, [theme]);

  const toggle = () => setTheme((t) => {
    if (t === 'system') return 'dark';
    return t === 'dark' ? 'light' : 'dark';
  });

  return { theme, setTheme, toggle };
}