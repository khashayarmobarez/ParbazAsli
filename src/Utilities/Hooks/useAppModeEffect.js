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
            // yellow text and border, transparent background button style
            root.style.setProperty('--yellow-border-button', '#A5E65E');
      
            // input normal border color
            root.style.setProperty('--light-border-button-collapsed', 'linear-gradient(215.85deg, rgba(238, 238, 238, 0.46) -45.31%, rgba(238, 238, 238, 0) 168.95%)');
            // input active border color
            root.style.setProperty('--yellow-border-button-active', 'linear-gradient(180deg, #A5E65E -27.08%, #A5E65E -27.07%, #859278 147.92%)');
            // drop down student syllabus box data boxes color
            root.style.setProperty('--syllabus-data-boxes-bg', '#1B253B');

            // disable button
            root.style.setProperty('--disabled-button-bg', '#323232');
            root.style.setProperty('--disabled-button-text', '#535353');


            
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