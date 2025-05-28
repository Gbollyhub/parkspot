
import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    // Check if theme is stored in localStorage
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    
    // Check if browser prefers dark mode
    if (!savedTheme) {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      return prefersDark ? 'dark' : 'light';
    }
    
    return savedTheme || 'light';
  });

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Update localStorage when theme changes
    localStorage.setItem('theme', theme);
    
    // Update document class for tailwind dark mode
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Add a data-theme attribute for additional CSS targeting
    document.documentElement.setAttribute('data-theme', theme);
    
    // Dispatch an event that other components can listen for
    window.dispatchEvent(new CustomEvent('themechange', { detail: { theme } }));
  }, [theme, mounted]);

  return {
    theme,
    setTheme,
    toggleTheme: () => {
      const newTheme = theme === 'light' ? 'dark' : 'light';
      setTheme(newTheme);
      // Dispatch theme change event immediately
      window.dispatchEvent(new CustomEvent('themechange', { detail: { theme: newTheme } }));
    },
    isDark: theme === 'dark',
    isLoaded: mounted,
  };
}
