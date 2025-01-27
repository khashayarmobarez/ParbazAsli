import { React, useState } from 'react';
import Cookies from 'js-cookie';

// react router dom
import { useLocation, useNavigate } from 'react-router-dom';


// mui 
import { Box, BottomNavigation, BottomNavigationAction , Typography, useMediaQuery } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import AddIcon from '@mui/icons-material/Add';

// context
import { useTranslation } from '../Utilities/context/TranslationContext';


const styles = {
    container: {
      width: '100%',
      zIndex: 60,
      background: 'var(--bg-menu)',
      borderRadius: '0',
      Bottom:'2rem',
      height:'calc(65px + env(safe-area-inset-bottom,5))',
      '@media screen and (min-width: 1024px)': {
        borderRadius: '2rem 0 0 2rem',
        right: 0,
        top: '15%',
        width: '125px',
        height: '320px',
      }
    },
    buttonsContainer: {
      paddingBottom:'env(safe-area-inset-bottom, 5rem)',
      width: '100%',
      background: 'var(--bg-menu)',
      boxShadow: ' -0.5px -3px 10px 0px rgba(0, 0, 0, 0.32)',
      height: '100%',
      
      '@media screen and (min-width: 1024px)': {
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
      }
    }
  };

  const theme = createTheme({
    typography: {
      fontFamily: 'iransans, SF-pro'
    },
  });


const Footer = ({ userRole }) => {

  // language
  const { t } = useTranslation();
  const dir = Cookies.get('dir') || 'ltr';

  const isDesktop = useMediaQuery('(min-width:768px)');

  const token = Cookies.get('token') || null;

  const navigate = useNavigate();
  const location = useLocation();

  // Accessing current URL
  const currentUrl = location.pathname;

    const [value, setValue] = useState(0);

    if (!token) {
      return null; // Return null to render nothing when userRole is empty
    }

    return (
      <ThemeProvider theme={theme}>
        <Box
          position='fixed'
          bottom={0} // Position the Footer at the bottom of the viewport
          left={0}   // Align the Footer to the left edge of the viewport
          right={0}
          sx={styles.container}
        >
          <BottomNavigation
          sx={{
            ...styles.buttonsContainer,
            borderRadius: dir === 'ltr' && isDesktop ? '0 2rem 2rem 0' : isDesktop ? '2rem 0 0 2rem' : '', // Conditional borderRadius
          }}
          showLabels
          value={value}
          onChange={(event, newValue) => {
          setValue(newValue);
          }}
          >

            <BottomNavigationAction 
            onClick={() => navigate('/profile')} 
            label={<Typography variant="body1" 
            sx={{ fontSize: '12px', marginTop:'2px' }}>
              {t("footer.profile")}
            </Typography>} 
            icon={<PersonOutlineOutlinedIcon sx={{width:'24px', height:'24px'}} />} 
            sx={{width:'100%' ,'&.Mui-selected': { color: currentUrl.includes('/profile') ? 'var(--text-accent)' : 'inherit' }, color:'var(--neutral-light)'}} 
            />
            
            <BottomNavigationAction 
            onClick={() => navigate('/addFlight/AddFlightType')} 
            label={<Typography variant="body1" 
            sx={{ fontSize: '14px', marginTop:'2px' }}>
              {t("footer.log")}
            </Typography>} 
            icon={<AddIcon sx={{ borderRadius:'8px', width:'30px', height: '30px', marginBottom:'2px', border: 'solid 1.5px'}} />} 
            sx={{ width:'120%' ,'&.Mui-selected': { color: currentUrl.includes('/addFlight') ? 'var(--text-accent)' : 'inherit' }, color:'var(--neutral-light)'}} />
            
            <BottomNavigationAction 
            onClick={() => navigate('/flightHistory')} 
            label={<Typography variant="body1" 
            sx={{ fontSize: '12px', marginTop:'2px' }}>
              {t("footer.logbook")}
            </Typography>} 
            icon={<FolderOutlinedIcon sx={{width:'24px', height:'24px'}}/>} 
            sx={{width:'100%' ,'&.Mui-selected': { color: currentUrl.includes('/flightHistory') ? 'var(--text-accent)' : 'inherit' }, color:'var(--neutral-light)'}} />
          </BottomNavigation>

        </Box>
      </ThemeProvider>
    );
};

export default Footer;