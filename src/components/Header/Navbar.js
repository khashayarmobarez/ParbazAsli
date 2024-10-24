import React, { useEffect, useRef, useState } from 'react';
import Cookies from 'js-cookie';

// queries 
import { useUserData } from '../../Utilities/Services/userQueries';
import { useUnreadNotificationCounts } from '../../Utilities/Services/notificationAndSurveyQueries';

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
import buttonStyles from '../../styles/Buttons/ButtonsBox.module.css'

// react router dom
import { Link, useLocation, useNavigate } from 'react-router-dom';

// assets
import companyLogo from '../../assets/Logo/DigilogbookMainLogo.svg';
import Logout from '../../components/icons/Logout';



const inlineStyles = {
    hideOnLarge: {
        display: 'none',
    }
}



const Navbar = ({toggleTheme ,userRole}) => {

    const token = Cookies.get('token');
    
    const { data } = useUserData();
    const {  data: notificationCountsData, isLoading: notificationCountsLoading, error: notificationCountsError, refetch: refetchNotificationCounts } = useUnreadNotificationCounts();
    
    // state to check the width of the device to remove profile picture for desktop size devices 
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const burgerRef = useRef(null);

    const navigate = useNavigate()
    const location = useLocation();

    // Accessing current URL
    const currentUrl = location.pathname;

    const [isOpen, setIsOpen] = useState(false);


    // function to reactive notificationCountsData when the location of the user changes
    useEffect(() => {
        refetchNotificationCounts();
    }, [location, refetchNotificationCounts]);

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
                height:'58px',
                direction: 'rtl',
                background: 'var(--bg-menu)',
                padding: '0rem 5px 0 5px',
                '@media (max-width: 768px)': {
                    height: '80', // Adjust height for smaller screens}   
                    padding:'0'              
                },
                }} ref={burgerRef}>
                    
                    <Toolbar sx={{
                    display:'flex',
                    justifyContent: 'space-between',
                    background: 'var(--bg-menu)',
                    boxShadow: 'var(--shadow-all)',}}>

                        <nav className='flex items-center justify-center md:w-[85%] md:mr-[-7%] '>

                            {/* app logo */}
                            <img onClick={() => navigate('/profile')} src={companyLogo} alt="Company Logo" className={`${styles.logo}`} /> 
                        
                            <div className={` ${styles.navList} ${isOpen ? styles.open : ''}`} 
                            style={{ background: isOpen ? 'var(--bg-menu)' : 'none',
                            boxShadow: isOpen ? 'var(--shadow-all)' : 'none',
                                }}
                            >
                                {
                                // (windowWidth < 768 && userRole && userRole !== '') &&
                                (windowWidth < 768 && token) && data &&
                                <Avatar alt={data.data.firstName} src={data.data.image?.path ? data.data.image.path : '/'} sx={{height:'110px', width:'110px', zIndex:'0'}} />
                                }
                                <ul className={`${!token ? 'pt-10 mt-[10vh] md:mt-0 md:pt-0 md:w-[50%]' : 'md:w-[80%]'} h-[260px] w-[50%] flex flex-col justify-between items-start text-base md:flex-row md:h-auto md:text-sm z-[101]`}>
                                    <li className={styles.navItem} onClick={() => (isOpen ? clickInput() : null)} > <HomeOutlined fontSize="small" sx={inlineStyles.hideOnLarge}  /> <Link className={styles.link} to='/profile'>صفحه اصلی</Link></li>
                                    <li className={styles.navItem} onClick={() => (isOpen ? clickInput() : null)}> <EditOutlined fontSize="small" sx={inlineStyles.hideOnLarge}  /> <Link className={styles.link} to='/blogs'>بلاگ</Link></li>
                                    <li className={styles.navItem} onClick={() => (isOpen ? clickInput() : null)}> <GroupsOutlined fontSize="small" sx={inlineStyles.hideOnLarge}  /> <Link className={styles.link} to='/aboutUs'>درباره ما</Link></li>
                                    <li className={styles.navItem} onClick={() => (isOpen ? clickInput() : null)}> <PhoneOutlined fontSize="small" sx={inlineStyles.hideOnLarge}  /> <Link className={styles.link} to='/contactUs'>تماس با ما</Link></li>
                                    {!token ?
                                    null
                                    :
                                    <>
                                        <li className={styles.navItem} onClick={() => (isOpen ? clickInput() : null)}> <SettingsOutlined fontSize="small" sx={inlineStyles.hideOnLarge}  /> <Link className={styles.link} to='/settings'>تنظیمات</Link></li>
                                        {/* <li className={styles.navItem} onClick={() => (isOpen ? clickInput() : null)}> <InfoOutlined fontSize="small" sx={inlineStyles.hideOnLarge}  /> <Link className={styles.link} to='/profile'>راهنما</Link></li> */}
                                    </>
                                    }
                                </ul>
                                {token &&
                                <Link to='/' onClick={() => {clickInput(); handleLogout() }} className={`${buttonStyles.normalButton} w-[130px] h-[48px] flex items-center justify-center rounded-xl text-lg md:hidden`} > خروج</Link>
                                }
                            </div>
                        </nav>

                        <div className={ `flex justify-between w-16 md:w-32  xl:ml-[2%] ${(userRole === '' && windowWidth > 768) && 'md:w-32 w-32'}`}>

                            {!token ?
                                (windowWidth > 768) ?
                                    <Link to='/signUpLogin' className={`${GradientStyles.container} rounded-3xl w-full h-12 flex items-center justify-center`} style={{border: '1px solid var(--text-accent)'}}><p>ورود / ثبت نام</p></Link>
                                    :
                                    <Link to='/signUpLogin' className=' self-center justify-self-end'> <LoginIcon sx={{color: 'var(--text-default)', marginBottom: '-0.2rem'}} /> </Link>
                            :
                            <div className='md:flex md:gap-x-4 md:mr-10'>
                                <button >
                                    {
                                        notificationCountsData && notificationCountsData.data > 0 &&
                                            <div className='-mb-4 rounded-full w-4 h-4 text-xs mr-[-4px] flex justify-center items-center font-normal z-50  bg-[var(--text-error)]'>
                                                <p>{notificationCountsData.data}</p>
                                            </div>
                                    }
                                    {currentUrl === '/notifications' ?
                                    <NotificationsOutlinedIcon onClick={() => navigate('/notifications')} sx={{fill:'var(--text-accent)', height:'30px',width:'30px',zIndex:'10',}} />
                                    :<NotificationsOutlinedIcon onClick={() => navigate('/notifications')} sx={{fill:'var(--text-default)', height:'30px',width:'30px',zIndex:'10'}} />
                                    }
                                </button>

                                <div onClick={handleLogout} className={`hidden md:flex justify-center items-center w-8`} >
                                    <Logout/>
                                </div>
                            </div>
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