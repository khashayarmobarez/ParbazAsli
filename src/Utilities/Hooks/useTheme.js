import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

export function useTheme() {
  const [currentMode, setCurrentMode] = useState('auto');

  const applyTheme = (theme) => {
    let appliedTheme = theme;
    if (theme === 'auto') {
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      appliedTheme = systemPrefersDark ? 'dark' : 'light';
    }
    document.documentElement.setAttribute('data-theme', appliedTheme);
    Cookies.set('theme', theme, { expires: 30 }); // Save the user's preference for 30 days
  };

  const toggleTheme = (newTheme) => {
    setCurrentMode(newTheme);
    applyTheme(newTheme);
  };

  useEffect(() => {
    const savedTheme = Cookies.get('theme') || 'auto';
    setCurrentMode(savedTheme);
    applyTheme(savedTheme);

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = () => {
      if (currentMode === 'auto') {
        applyTheme('auto');
      }
    };

    mediaQuery.addEventListener('change', handleSystemThemeChange);

    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange);
    };
  }, [currentMode]);

  return { currentMode, toggleTheme };
}