
import { useEffect, useState } from 'react';
import { useTheme } from '@/hooks/use-theme';

export const useMapTheme = () => {
  const { theme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState(theme);

  useEffect(() => {
    // Update current theme immediately when theme changes
    setCurrentTheme(theme);
  }, [theme]);

  useEffect(() => {
    const handleThemeChange = (event: Event) => {
      const customEvent = event as CustomEvent<{theme: 'light' | 'dark'}>;
      console.log('Map theme change detected:', customEvent.detail.theme);
      setCurrentTheme(customEvent.detail.theme);
    };

    window.addEventListener('themechange', handleThemeChange);
    
    return () => {
      window.removeEventListener('themechange', handleThemeChange);
    };
  }, []);

  const getMapStyle = (themeMode: 'light' | 'dark') => {
    return themeMode === 'dark' 
      ? 'mapbox://styles/mapbox/dark-v11' 
      : 'mapbox://styles/mapbox/streets-v11';
  };

  return {
    theme: currentTheme,
    currentTheme,
    setCurrentTheme,
    getMapStyle
  };
};
