import React, { useEffect, useRef, useState } from 'react';
import Cookies from 'js-cookie';


// api
import { postLogout } from '../../Utilities/Services/AuthenticationApi';

// hooks
import useClickOutside from '../../Utilities/Hooks/useClickOutside';

// mui
import { AppBar, Avatar } from '@mui/material';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
// mui icons 
import {EditOutlined, GroupsOutlined, HomeOutlined, InfoOutlined, PhoneOutlined, SettingsOutlined }from '@mui/icons-material';
import LoginIcon from '@mui/icons-material/Login';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';

// styles
import GradientStyles from '../../styles/gradients/Gradient.module.css'
import styles from './Navbar.module.css';

// react router dom
import { Link, useLocation, useNavigate } from 'react-router-dom';

// assets
import companyLogo from '../../assets/Logo/Digilogbook -1401 1.svg';
import logout from '../../assets/icons/logout.svg';



const inlineStyles = {
    hideOnLarge: {
        display: 'none',
      }
}



const Navbar = ({toggleTheme ,userRole}) => {
    
    const token = Cookies.get('token') || null;

    // state to check the width of the device to remove profile picture for desktop size devices 
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

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

    
    // handle logout
    const handleLogout = () => {
        Cookies.remove('token');
        navigate('/landing');
        postLogout(token)
    };


    // function to set the width of the device in the windowWidth state
    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        // Listen to window resize event
        window.addEventListener('resize', handleResize);

        // Clean up event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []); 

    return (
        <Box position="fixed" sx={{ flexGrow: 1,zIndex:'1000', }} >
                         
            <AppBar  sx={{
                height:'62px',
                background: '#131424',
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
                                
                                    <div className={` ${styles.navList} ${isOpen ? styles.open : ''}`} 
                                    style={{ background: isOpen ? 'linear-gradient(75.59deg, #111221 -4.46%, #2E3048 105.44%)' : 'none',
                                    border: '1px solid rgba(17, 24, 39, 0.1)',
                                    boxShadow: isOpen ? '-2px 3px 4.3px 1px #0000007A' : 'none',
                                      }}
                                    >
                                        {
                                        // (windowWidth < 768 && userRole && userRole !== '') &&
                                        (windowWidth < 768 && token) &&
                                        <Avatar alt="Remy Sharp" sx={{height:'99px', width:'100px', zIndex:'0'}} />
                                        }
                                        <ul className={`${!token ? 'pt-10 md:pt-0 md:w-[50%]' : 'md:w-[80%]'} h-[300px] w-[50%] flex flex-col justify-between items-start text-base md:flex-row md:h-auto md:text-sm z-101`}>
                                            <li className={styles.navItem} onClick={() => (isOpen ? clickInput() : null)} > <HomeOutlined fontSize="small" sx={inlineStyles.hideOnLarge}  /> <Link className={styles.link} to='/profile'>صفحه اصلی</Link></li>
                                            <li className={styles.navItem} onClick={() => (isOpen ? clickInput() : null)}> <EditOutlined fontSize="small" sx={inlineStyles.hideOnLarge}  /> <Link className={styles.link} to='/blogs'>بلاگ</Link></li>
                                            <li className={styles.navItem} onClick={() => (isOpen ? clickInput() : null)}> <GroupsOutlined fontSize="small" sx={inlineStyles.hideOnLarge}  /> <Link className={styles.link} to='/aboutUs'>درباره ما</Link></li>
                                            <li className={styles.navItem} onClick={() => (isOpen ? clickInput() : null)}> <PhoneOutlined fontSize="small" sx={inlineStyles.hideOnLarge}  /> <Link className={styles.link} to='/contactUs'>تماس با ما</Link></li>
                                            {!token ?
                                            null
                                            :
                                            <>
                                                <li className={styles.navItem} onClick={() => (isOpen ? clickInput() : null)}> <SettingsOutlined fontSize="small" sx={inlineStyles.hideOnLarge}  /> <Link className={styles.link} to='/settings'>تنظیمات</Link></li>
                                                <li className={styles.navItem} onClick={() => (isOpen ? clickInput() : null)}> <InfoOutlined fontSize="small" sx={inlineStyles.hideOnLarge}  /> <Link className={styles.link} to='/profile'>راهنما</Link></li>
                                            </>
                                            }
                                        </ul>
                                        {!token ?
                                        <Link to='/signUpLogin' onClick={() => clickInput()} className={`${GradientStyles.container} w-[130px] h-[48px] flex items-center justify-center rounded-3xl text-lg mt-6 md:hidden`} style={{border:'1px solid var(--yellow-text)'}}> ورود / ثبت نام</Link>
                                        :
                                        <Link to='/' onClick={() => {clickInput(); handleLogout() }} className={`${GradientStyles.container} w-[130px] h-[48px] flex items-center justify-center rounded-xl text-lg md:hidden`} > خروج</Link>
                                        }
                                    </div>
                                </div>

                                <div className={ `flex justify-between w-16 md:w-14 xl:ml-[2%] ${(userRole === '' && windowWidth > 768) && 'md:w-32 w-32'}`}>

                                    {!token ?
                                        (windowWidth > 768) ?
                                            <Link to='/signUpLogin' className={`${GradientStyles.container} rounded-3xl w-[120px] h-9 flex items-center justify-center`} style={{border: '1px solid var(--yellow-text)'}}><p>ورود / ثبت نام</p></Link>
                                            :
                                            <Link to='/signUpLogin' className=' self-center justify-self-end'> <LoginIcon /> </Link>

                                    :
                                    <>
                                        <button >
                                            {currentUrl === '/notifications' ?
                                            <NotificationsOutlinedIcon onClick={() => navigate('/notifications')} sx={{fill:'var(--yellow-text)', height:'30px',width:'30px'}} />
                                            :<NotificationsOutlinedIcon onClick={() => navigate('/notifications')} sx={{fill:'var(--softer-white)', height:'30px',width:'30px'}} />
                                            }
                                        </button>

                                        <div to='/' className={`hidden md:flex justify-center items-center`} >
                                            <img src={logout} alt='logout' onClick={handleLogout} />
                                        </div>
                                    </>
                                    }

                                    

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