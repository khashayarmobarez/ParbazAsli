import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

export function useTheme() {
  const [currentMode, setCurrentMode] = useState('dark'); // Default to dark mode

  const applyTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    Cookies.set('theme', theme, { expires: 30 }); // Save the user's preference for 30 days
  };

  const toggleTheme = (newTheme) => {
    setCurrentMode(newTheme);
    applyTheme(newTheme);
  };

  useEffect(() => {
    const savedTheme = Cookies.get('theme') || 'dark'; // Default to dark if no cookie
    setCurrentMode(savedTheme);
    applyTheme(savedTheme);
  }, []);

  return { currentMode, toggleTheme };
}