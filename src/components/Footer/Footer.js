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


const styles = {
    container: {
        bottom:'-5px',
      width: '100%',
      '@media screen and (min-width: 768px)': {
        right: 0,
        top: '25%',
        width: '150px',
        height: '340px',
      }
    },
    buttonsContainer: {
      background: 'linear-gradient(195.31deg, #353A65 34.63%, rgba(42, 46, 81, 0) 100.99%)',
      width: '100%',
      boxShadow: '-3px 4px 5.8px 5px #00000045, 3px -4px 4px 0px #B3AAAA2E',
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
                <BottomNavigationAction label="پروفایل" icon={<PersonOutlineOutlinedIcon />} sx={{width:'100%' ,'&.Mui-selected': { color: '#A5E65E'}, color:'var(--neutral-light)'}} />
                <BottomNavigationAction label="ثبت پرواز" icon={<AddIcon className={`${GradientStyles.container}`} sx={{ borderRadius:'5px', width:'2.2rem', height: '2.2rem'}} />} sx={{ width:'100%' ,'&.Mui-selected': { color: '#A5E65E'}, color:'var(--neutral-light)'}} />
                <BottomNavigationAction label="سوابق پرواز" icon={<FolderOutlinedIcon/>} sx={{width:'100%' ,'&.Mui-selected': { color: '#A5E65E'}, color:'var(--neutral-light)'}} />
            </BottomNavigation>
        </Box>
    );
};

export default Footer;