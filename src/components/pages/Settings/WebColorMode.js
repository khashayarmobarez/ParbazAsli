import React, { useEffect, useState } from 'react';

// hooks
import { useTheme } from '../../../Utilities/Hooks/useTheme';

// styles
import ButtonsBox from '../../../styles/Buttons/ButtonsBox.module.css';

const WebColorMode = () => {
  const { currentMode, toggleTheme } = useTheme();
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Sync the current theme with the checkbox state
  useEffect(() => {
    setIsDarkMode(currentMode === 'dark');
  }, [currentMode]); // Ensure it updates when `currentMode` changes

  // Handle theme change on checkbox toggle
  const handleThemeChange = () => {
    const newTheme = isDarkMode ? 'light' : 'dark';
    toggleTheme(newTheme); // Pass the new theme to the hook
    setIsDarkMode(!isDarkMode); // Update local checkbox state
  };

  return (
    <div
      className="w-full flex justify-between items-center px-4 py-3 rounded-3xl"
      style={{ background: 'var(--button-toggle-bg)', boxShadow: 'var(--button-toggle-boxshadow)' }}
    >
      <p>{isDarkMode ? 'حالت روز' : 'حالت شب'}</p>

      <label className={ButtonsBox.switch}>
        <input type="checkbox" checked={isDarkMode} onChange={handleThemeChange} />
        <span className={ButtonsBox.slider}></span>
      </label>
    </div>
  );
};

export default WebColorMode;
