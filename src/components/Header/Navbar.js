import React, { useState } from 'react';
import { AppBar } from '@mui/material';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';

import GradientStyles from '../../styles/gradients/Gradient.module.css'
import styles from './Navbar.module.css'; 

import companyLogo from '../../assets/Logo/Digilogbook -1401 1.svg';
import iconBell from '../../assets/icons/bell icon (Stroke).svg'
import { Link } from 'react-router-dom';

// icons 
import {EditOutlined, GroupsOutlined, HomeOutlined, InfoOutlined, PhoneOutlined, SettingsOutlined }from '@mui/icons-material';


const inlineStyles = {
    hideOnLarge: {
        display: 'none',
      }
}



const Navbar = () => {

    const [isOpen, setIsOpen] = useState(false);

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <Box position="fixed" sx={{ flexGrow: 1 }}>
                         
            <AppBar  sx={{
                height:'56px',
                boxShadow: '-3px 4px 5.800000190734863px 5px #00000045',
                backgroundImage: 'linear-gradient(var(--gradient-direction), var(--gradient-start), var(--gradient-end))',
                padding: '0rem 5px 0 5px',
                '@media (max-width: 768px)': {
                    height: '80', // Adjust height for smaller screens}   
                    padding:'0'              
                },
                }} >
                    
                            <Toolbar sx={{display:'flex', justifyContent: 'space-between'}}>

                            <div className='flex items-center justify-center md:w-[70%] md:mr-[-2.2rem] '>
                                <img src={companyLogo} alt="Company Logo" className={styles.logo} /> 
                                
                                    <div className={`${GradientStyles.container} ${styles.navList} ${isOpen ? styles.open : ''}`}>
                                        <ul className=' h-[300px] w-[50%] flex flex-col justify-between items-start text-base md:flex-row md:h-auto md:w-[100%] md:text-sm'>
                                            <li className={styles.navItem}> <HomeOutlined fontSize="small" sx={inlineStyles.hideOnLarge}  /> <Link className={styles.link} to='/profile'>صفحه اصلی</Link></li>
                                            <li className={styles.navItem}> <EditOutlined fontSize="small" sx={inlineStyles.hideOnLarge}  /> <Link className={styles.link} to='/profile'>بلاگ</Link></li>
                                            <li className={styles.navItem}> <GroupsOutlined fontSize="small" sx={inlineStyles.hideOnLarge}  /> <Link className={styles.link} to='/profile'>درباره ما</Link></li>
                                            <li className={styles.navItem}> <PhoneOutlined fontSize="small" sx={inlineStyles.hideOnLarge}  /> <Link className={styles.link} to='/profile'>تماس با ما</Link></li>
                                            <li className={styles.navItem}> <SettingsOutlined fontSize="small" sx={inlineStyles.hideOnLarge}  /> <Link className={styles.link} to='/profile'>تنظیمات</Link></li>
                                            <li className={styles.navItem}> <InfoOutlined fontSize="small" sx={inlineStyles.hideOnLarge}  /> <Link className={styles.link} to='/profile'>راهنما</Link></li>
                                            {/* Add more list items as needed */}
                                        </ul>
                                        <Link to='/' className={`${GradientStyles.container} w-[130px] h-[48px] flex items-center justify-center rounded-xl text-lg md:hidden`} > خروج</Link>
                                    </div>
                            </div>

                                <div className=' flex justify-between w-14 md:w-14 md:ml-[-2rem]'>

                                    <button >
                                        <img src={iconBell} alt='bell icon' className=' w-6' />
                                    </button>
                                    

                                    <label className={styles.burger} for="burger" >
                                        <input type="checkbox" id="burger" onClick={toggleNavbar}/>
                                            <span></span>
                                            <span></span>
                                            <span></span>
                                    </label>


                                </div>
                                
                            </Toolbar>

                        </AppBar>

                    </Box>
    );
};

export default Navbar;