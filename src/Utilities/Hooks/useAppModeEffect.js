import { useEffect } from 'react';



const useAppModeEffect = (isDarkMode) => {
  
  useEffect(() => {
    // Update root styles when mode changes
    const root = document.documentElement;
    if (isDarkMode) {

        root.style.setProperty('--bg-color', '#131423');
        root.style.setProperty('--text-color', '#ebebeb');
        root.style.setProperty('--low-opacity-white', 'rgba(255, 255, 255, 0.3)');
        root.style.setProperty('--yellow-text', '#A5E65E');
        root.style.setProperty('--dark-green', '#638a38');
        root.style.setProperty('--red-text', '#ED553B');
        root.style.setProperty('--notification-red', '#a70107');
        root.style.setProperty('--dark-blue-bg', '#151D2E');
        root.style.setProperty('--diffrential-blue', '#262941');
        root.style.setProperty('--primary-light', '#c0c2cf');
        root.style.setProperty('--design-background-normal', '#454459');
        root.style.setProperty('--primaryA-dark-hover', '#20233D');

        // overall used colors
        root.style.setProperty('--soft-white', '#F6FDEF');
        root.style.setProperty('--softer-white', ' #CDD3D4');
        root.style.setProperty('--corn-flower-blue', ' #878DCB');
        root.style.setProperty('--purple', ' #3b5284');
        
        
        // landing page elements
        root.style.setProperty('--landing-page-titles-bg', ' linear-gradient(179.42deg, #181A2D 18.89%, rgba(135, 141, 203, 0.8) 252.75%)');
        root.style.setProperty('--landing-page-titles-boxShadow', ' 1px -1px 2.6px 0px rgba(235, 224, 224, 0.51),-3px 4px 10.3px 4px rgba(0, 0, 0, 0.3)');
        
        // about us and contact us data box
        root.style.setProperty('--about-us-box-color', '  linear-gradient(189.66deg, #131526 12.42%, rgba(57, 60, 84, 0.9) 207.54%)');
        root.style.setProperty('--about-us-box-shodow', ' 1px -1px 2.6px 0px rgba(235, 224, 224, 0.29), -3px 4px 10.1px 4px rgba(0, 0, 0, 0.25)');

        // speedometer background
        root.style.setProperty('--speedometer-background', 'linear-gradient(195.31deg, #323232 -84.63%, rgba(34, 34, 34, 0.285) 48.09%, rgba(79, 79, 79, 0) 100.99%)');
        root.style.setProperty('--speedometer-boxShadow', '-3px 4px 5.80px 5px #00000045, 3px -4px 4px 0px #B3AAAA2E, 0px 4px 4px 0px #C2BDBD40 inset');
        
            
        // buttons(profile buttons and otherspages)
        root.style.setProperty('--profile-buttons-background', 'linear-gradient(198deg, rgba(24,26,45,1) 10%, rgba(135,141,203,0.25) 90%)');
        root.style.setProperty('--profile-buttons-boxShadow', '-2px 3px 4.3px 1px #0000007A, 1px -1px 2.5px 0px #EBE0E082, 0px 4px 10.8px 2px #3F4D6C inset');


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
            
            // button an input(toggle dark mode element)
            root.style.setProperty('--button-toggle-bg', 'linear-gradient(222.79deg, #181A2D 31.59%, rgba(135, 141, 203, 0) 170.26%)');
            root.style.setProperty('--button-toggle-boxshadow', '-2px 3px 4.3px 1px rgba(0, 0, 0, 0.48), 1px -1px 2.599px 0px rgba(235, 224, 224, 0.51), 0px 4px 10.8px 2px rgba(63, 77, 108, 1) inset');

        // databox
            // class details
            root.style.setProperty('--class-details-bg', 'linear-gradient(8deg, rgba(135,141,203,0.25) 0%, rgba(24,26,45,1) 115%)');
            root.style.setProperty('--class-details-boxShadow', ' -3px 4px 5.80px 5px rgba(0, 0, 0, 0.27), 3px -4px 4px 0px rgba(179, 170, 170, 0.2)');

  
        // input border
            root.style.setProperty('--input-border', 'rgba(238, 238, 238, 0.26)');

                        
        // setting input Background
        root.style.setProperty('--dark-input-bg', '#181A2D');
        root.style.setProperty('--dark-input-boxShadow', ' -3px 4px 4px 1px rgba(0, 0, 0, 0.32)');
        
        // club => coaches => coaches details boxes
        root.style.setProperty('--coachesDetails-bg', 'linear-gradient(5deg, rgba(135,141,203,0.3) -41%, rgba(24,26,45,0.2) 100%)');
        root.style.setProperty('--coachesDetails-BoxShadow', ' 1px -1px 2.59px 0px rgba(235, 224, 224, 0.21)');
        
        // organization/couches details/ coach data
        root.style.setProperty('--organs-coachData-bg', 'linear-gradient(5.31deg, #353A65 -34.63%, rgba(42, 46, 81, 0) 100.99%)')
        root.style.setProperty('--organs-coachData-boxShadow', ' -3px 4px 5.8px 5px rgba(0, 0, 0, 0.27), 3px -4px 4px 0px rgba(179, 170, 170, 0.28)')
          // color for coach data box, right side color
          root.style.setProperty('--boxes-yellow-side', 'linear-gradient(21.47deg, #A5E65E 14.52%, rgba(173, 203, 139, 0) 245.02%)')
          root.style.setProperty('--boxes-yellow-side-boxshadow', '-2px 3px 4.3px 1px #0000007A,1px -1px 2.6px 0px #EBE0E082, 0px 4px 10.8px 2px #46AE2D inset')
          
          
          // landing page
            // section titles
            root.style.setProperty('--landing-title-bg', ' linear-gradient(159.42deg, #181A2D 18.89%, rgba(135, 141, 203, 0) 432.75%)')
            root.style.setProperty('--landing-title-bg-boxShadow', '1px -1px 2.6px 0px rgba(235, 224, 224, 0.51),-3px 4px 10.3px 4px rgba(0, 0, 0, 0.3)')

            

        

            
 

        // Add more CSS variable updates for dark mode as needed
        
    } else {
      root.style.setProperty('--bg-color', '#ffffff');
      root.style.setProperty('--text-color', '#333333');
      // Add more CSS variable updates for light mode as needed
    }
  }, [isDarkMode]);
};

export default useAppModeEffect;