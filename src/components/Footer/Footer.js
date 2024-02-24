import { React, useState } from 'react';

// import styles from './Footer.module.css';
import GradientStyles from '../../styles/gradients/Gradient.module.css'

// mui 
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';


const styles = {
    container: {
        bottom:'-5px',
      width: '100%',
      zIndex: 1,
      background: '#131423',
      borderRadius: '2rem 0 0 2rem',
      '@media screen and (min-width: 768px)': {
        right: 0,
        top: '15%',
        width: '125px',
        height: '320px',
      }
    },
    buttonsContainer: {
      width: '100%',
      background: 'linear-gradient(195.31deg, #353A65 -84.63%, rgba(42, 46, 81, 0) 100.99%)',
      boxShadow: '-3px 4px 5.800000190734863px 5px rgba(0, 0, 0, 0.27), 3px -4px 4px 0px rgba(179, 170, 170, 0.18)',
      height: '75px',
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


const Footer = () => {

    const [value, setValue] = useState(0);

    const navigate = useNavigate();
    
    return (
        <Box
        position='fixed'
        bottom={0} // Position the Footer at the bottom of the viewport
        left={0}   // Align the Footer to the left edge of the viewport
        right={0}
        height={'5rem'}
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
                <BottomNavigationAction onClick={() => navigate('/profile')} label="پروفایل" icon={<PersonOutlineOutlinedIcon />} sx={{width:'100%' ,'&.Mui-selected': { color: '#A5E65E'}, color:'var(--neutral-light)'}} />
                <BottomNavigationAction onClick={() => navigate('/')} label="ثبت پرواز" icon={<AddIcon className={`${GradientStyles.container}`} sx={{ borderRadius:'10px', width:'2.4rem', height: '2.4rem'}} />} sx={{ width:'120%' ,'&.Mui-selected': { color: '#A5E65E'}, color:'var(--neutral-light)'}} />
                <BottomNavigationAction onClick={() => navigate('/')} label="سوابق پرواز" icon={<FolderOutlinedIcon/>} sx={{width:'100%' ,'&.Mui-selected': { color: '#A5E65E'}, color:'var(--neutral-light)'}} />
            </BottomNavigation>
        </Box>
    );
};

export default Footer;