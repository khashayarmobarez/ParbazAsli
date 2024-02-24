import { useEffect } from 'react';

const useAppModeEffect = (isDarkMode) => {
  useEffect(() => {
    // Update root styles when mode changes
    const root = document.documentElement;
    if (isDarkMode) {

            root.style.setProperty('--bg-color', '#131423');
            root.style.setProperty('--text-color', '#ffffff');

        // basic data box styles
            root.style.setProperty('--Basic-dataBox-bg', '#181A2D');
            root.style.setProperty('--Basic-dataBox-border', 'rgba(238, 238, 238, 0.46)');

        // buttons
            // yellow background buttons
            root.style.setProperty('--yellow-button-bg', 'linear-gradient(21.47deg, #A5E65E 14.52%, rgba(173, 203, 139, 0) 245.02%)');
            
        // databox
            // class details
            root.style.setProperty('--class-details-bg', 'linear-gradient(200.38deg, #181A2D -7.59%, rgba(135, 141, 203, 0) 323.12%)');

            

        // Add more CSS variable updates for dark mode as needed
        
    } else {
      root.style.setProperty('--bg-color', '#ffffff');
      root.style.setProperty('--text-color', '#333333');
      // Add more CSS variable updates for light mode as needed
    }
  }, [isDarkMode]);
};

export default useAppModeEffect;