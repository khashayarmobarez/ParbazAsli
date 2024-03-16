import React, { useRef, useState } from 'react';

// hooks
import useClickOutside from '../../Utilities/Hooks/useClickOutside';

// mui
import { AppBar } from '@mui/material';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
// mui icons 
import {EditOutlined, GroupsOutlined, HomeOutlined, InfoOutlined, PhoneOutlined, SettingsOutlined }from '@mui/icons-material';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';

// styles
import GradientStyles from '../../styles/gradients/Gradient.module.css'
import styles from './Navbar.module.css';

// react router dom
import { Link, useLocation, useNavigate } from 'react-router-dom';

// assets
import companyLogo from '../../assets/Logo/Digilogbook -1401 1.svg';
import logout from '../../assets//icons/logout.svg';



const inlineStyles = {
    hideOnLarge: {
        display: 'none',
      }
}



const Navbar = ({toggleTheme}) => {

    const burgerRef = useRef(null);

    const navigate = useNavigate()
    const location = useLocation();

    // Accessing current URL
    const currentUrl = location.pathname;

    const [isOpen, setIsOpen] = useState(false);


    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };

    
    // hook to close navbar when you click outside the navbar on the page
    useClickOutside(burgerRef, clickOutside);

    function clickOutside() {
        if(isOpen) {
            clickInput()
        }
    }



    // function to close navigation list when you choose an item from the navlist
    function clickInput() {
        const input = document.getElementById('burger');
        if (input) {
          input.click();
        } else {
          console.error('Input element not found.');
        }
      }

    return (
        <Box position="fixed" sx={{ flexGrow: 1,zIndex:'1000' }} >
                         
            <AppBar  sx={{
                height:'62px',
                background: '#131423',
                padding: '0rem 5px 0 5px',
                '@media (max-width: 768px)': {
                    height: '80', // Adjust height for smaller screens}   
                    padding:'0'              
                },
                }} ref={burgerRef}>
                    
                            <Toolbar sx={{
                            display:'flex',
                            justifyContent: 'space-between',
                            background: 'linear-gradient(195.31deg, #353A65 -84.63%, rgba(42, 46, 81, 0) 100.99%)',
                            boxShadow: '-3px 4px 5.80px 5px rgba(0, 0, 0, 0.27), 3px -4px 4px 0px rgba(179, 170, 170, 0.18)',}}>

                            <div className='flex items-center justify-center md:w-[85%] md:mr-[-7%] '>
                                <img src={companyLogo} alt="Company Logo" className={styles.logo} /> 
                                
                                    <div className={`${GradientStyles.container2} ${styles.navList} ${isOpen ? styles.open : ''}`}>
                                        <ul className=' h-[300px] w-[50%] flex flex-col justify-between items-start text-base md:flex-row md:h-auto md:w-[80%] md:text-sm z-101'>
                                            <li className={styles.navItem} onClick={() => clickInput()} > <HomeOutlined fontSize="small" sx={inlineStyles.hideOnLarge}  /> <Link className={styles.link} to='/profile'>صفحه اصلی</Link></li>
                                            <li className={styles.navItem} onClick={() => clickInput()}> <EditOutlined fontSize="small" sx={inlineStyles.hideOnLarge}  /> <Link className={styles.link} to='/profile'>بلاگ</Link></li>
                                            <li className={styles.navItem} onClick={() => clickInput()}> <GroupsOutlined fontSize="small" sx={inlineStyles.hideOnLarge}  /> <Link className={styles.link} to='/profile'>درباره ما</Link></li>
                                            <li className={styles.navItem} onClick={() => clickInput()}> <PhoneOutlined fontSize="small" sx={inlineStyles.hideOnLarge}  /> <Link className={styles.link} to='/profile'>تماس با ما</Link></li>
                                            <li className={styles.navItem} onClick={() => clickInput()}> <SettingsOutlined fontSize="small" sx={inlineStyles.hideOnLarge}  /> <Link className={styles.link} to='/settings'>تنظیمات</Link></li>
                                            <li className={styles.navItem} onClick={() => clickInput()}> <InfoOutlined fontSize="small" sx={inlineStyles.hideOnLarge}  /> <Link className={styles.link} to='/profile'>راهنما</Link></li>
                                            {/* Add more list items as needed */}
                                        </ul>
                                        <Link to='/' className={`${GradientStyles.container} w-[130px] h-[48px] flex items-center justify-center rounded-xl text-lg md:hidden`} > خروج</Link>
                                    </div>
                                </div>

                                <div className=' flex justify-between w-16 md:w-14 xl:ml-[2%]'>

                                    <button >
                                        {currentUrl === '/notifications' ?
                                        <NotificationsOutlinedIcon onClick={() => navigate('/notifications')} sx={{fill:'var(--yellow-text)', height:'30px',width:'30px'}} />
                                        :<NotificationsOutlinedIcon onClick={() => navigate('/notifications')} sx={{fill:'var(--softer-white)', height:'30px',width:'30px'}} />
                                         }
                                    </button>

                                    <Link to='/' className={`hidden md:flex justify-center items-center`} >
                                        <img src={logout} alt='icon' />
                                    </Link>

                                    

                                    <label className={`${styles.burger} mt-[2px]`} htmlFor="burger" >
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