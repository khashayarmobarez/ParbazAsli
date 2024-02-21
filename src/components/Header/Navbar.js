import React, { useState } from 'react';
import { AppBar } from '@mui/material';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';

import GradientStyles from '../../styles/gradients/Gradient.module.css'
import styles from './Navbar.module.css';

import { Link } from 'react-router-dom';

import companyLogo from '../../assets/Logo/Digilogbook -1401 1.svg';
import iconBell from '../../assets/icons/bell icon (Stroke).svg'
import logout from '../../assets//icons/logout.svg'

// icons 
import {EditOutlined, GroupsOutlined, HomeOutlined, InfoOutlined, PhoneOutlined, SettingsOutlined }from '@mui/icons-material';


const inlineStyles = {
    hideOnLarge: {
        display: 'none',
      }
}



const Navbar = ({toggleTheme}) => {



    const [isOpen, setIsOpen] = useState(false);

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <Box position="fixed" sx={{ flexGrow: 1,zIndex:'1000' }}>
                         
            <AppBar  sx={{
                height:'62px',
                background: '#131423',
                padding: '0rem 5px 0 5px',
                '@media (max-width: 768px)': {
                    height: '80', // Adjust height for smaller screens}   
                    padding:'0'              
                },
                }} >
                    
                            <Toolbar sx={{
                            display:'flex',
                            justifyContent: 'space-between',
                            background: 'linear-gradient(195.31deg, #353A65 -84.63%, rgba(42, 46, 81, 0) 100.99%)',
                            boxShadow: '-3px 4px 5.800000190734863px 5px rgba(0, 0, 0, 0.27), 3px -4px 4px 0px rgba(179, 170, 170, 0.18)',}}>

                            <div className='flex items-center justify-center md:w-[85%] md:mr-[-7%] '>
                                <img src={companyLogo} alt="Company Logo" className={styles.logo} /> 
                                
                                    <div className={`${GradientStyles.container2} ${styles.navList} ${isOpen ? styles.open : ''}`}>
                                        <ul className=' h-[300px] w-[50%] flex flex-col justify-between items-start text-base md:flex-row md:h-auto md:w-[80%] md:text-sm z-101'>
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

                                <div className=' flex justify-between w-14 md:w-14 xl:ml-[2%]'>

                                    <button >
                                        <img onClick={toggleTheme} src={iconBell} alt='bell icon' className=' w-6' />
                                    </button>

                                    <Link to='/' className={`hidden md:flex justify-center items-center`} >
                                        <img src={logout} alt='icon' />
                                    </Link>

                                    

                                    <label className={styles.burger} htmlFor="burger" >
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