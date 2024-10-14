import { React, useState } from 'react';
import Cookies from 'js-cookie';

// react router dom
import { useLocation, useNavigate } from 'react-router-dom';


// import styles from './Footer.module.css';
import GradientStyles from '../../styles/gradients/Gradient.module.css'

// // assets
// import badgeCheck from '../../assets/icons/check-badge.svg'
// import dashboard from '../../assets/icons/dashboard.svg'

// mui 
import { Box, BottomNavigation, BottomNavigationAction , Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import AddIcon from '@mui/icons-material/Add';
import SpaceDashboardOutlinedIcon from '@mui/icons-material/SpaceDashboardOutlined';
import LocalPoliceOutlinedIcon from '@mui/icons-material/LocalPoliceOutlined';


const styles = {
    container: {
      width: '100%',
      zIndex: 100,
      background: '#131423',
      borderRadius: '0',
      Bottom:'2rem',
      height:'calc(3.8rem + env(safe-area-inset-bottom,5))',
      '@media screen and (min-width: 768px)': {
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
      background: 'linear-gradient(195.31deg, #353A65 -84.63%, rgba(42, 46, 81, 0) 100.99%)',
      boxShadow: '-3px 4px 5.8px 5px rgba(0, 0, 0, 0.27), 3px -4px 4px 0px rgba(179, 170, 170, 0.18)',
      height: '100%',
      
      '@media screen and (min-width: 768px)': {
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
        borderRadius: '2rem 0 0 2rem',
      }
    }
  };

  const theme = createTheme({
    typography: {
      fontFamily: 'iransans',
    },
  });


const Footer = ({ userRole }) => {

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
          sx={styles.buttonsContainer}
          showLabels
          value={value}
          onChange={(event, newValue) => {
          setValue(newValue);
          }}
          >
            <BottomNavigationAction onClick={() => navigate('/profile')} label={<Typography variant="body1" sx={{ fontSize: '12px', marginTop:'2px' }}>پروفایل</Typography>} icon={<PersonOutlineOutlinedIcon sx={{width:'1.28rem', height:'1.28rem'}} />} sx={{width:'100%' ,'&.Mui-selected': { color: currentUrl === '/profile' ? '#A5E65E' : 'inherit' }, color:'var(--neutral-light)'}} />
            <BottomNavigationAction onClick={() => navigate('/addFlight/AddFlightType')} label={<Typography variant="body1" sx={{ fontSize: '14px', marginTop:'2px' }}>لاگ</Typography>} icon={<AddIcon className={`${GradientStyles.container}`} sx={{ borderRadius:'8px', width:'1.75rem', height: '1.6rem', marginBottom:'0px'}} />} sx={{ width:'120%' ,'&.Mui-selected': { color: currentUrl === '/addFlight' ? '#A5E65E' : 'inherit' }, color:'var(--neutral-light)'}} />
            <BottomNavigationAction onClick={() => navigate('/flightHistory')} label={<Typography variant="body1" sx={{ fontSize: '12px', marginTop:'2px' }}>لاگ بوک</Typography>} icon={<FolderOutlinedIcon sx={{width:'1.28rem', height:'1.28rem'}}/>} sx={{width:'100%' ,'&.Mui-selected': { color: currentUrl === '/flightHistory' ? '#A5E65E' : 'inherit' }, color:'var(--neutral-light)'}} />
          </BottomNavigation>
        </Box>
      </ThemeProvider>
    );
};

export default Footer;