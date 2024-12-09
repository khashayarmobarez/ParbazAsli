import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

// styles
import styles from '../styles/others/Navbar.module.css'
import buttonStyles from '../styles/Buttons/ButtonsBox.module.css'

// queries 
import { useUserData } from '../Utilities/Services/userQueries';
import { useUnreadNotificationCounts } from '../Utilities/Services/notificationAndSurveyQueries';

// api
import { postLogout } from '../Utilities/Services/AuthenticationApi';

// hooks
import useClickOutside from '../Utilities/Hooks/useClickOutside';

// assets
import companyLogo from '../assets/Logo/DigilogbookMainLogo.svg';
import Logout from '../components/icons/Logout';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import { Avatar } from '@mui/material';
import { EditOutlined, GroupsOutlined, HomeOutlined, PhoneOutlined, SettingsOutlined } from '@mui/icons-material';



const NewNavbar = () => {

    const navigate = useNavigate()
    const location = useLocation();
    const token = Cookies.get('token');

    const { data } = useUserData();
    const {  data: notificationCountsData, refetch: refetchNotificationCounts } = useUnreadNotificationCounts();
    
    // Accessing current URL
    const currentUrl = location.pathname;
    
    const burgerRef = useRef(null);

    const [isOpen, setIsOpen] = useState(false);

    // hooks
        // hook to close navbar when you click outside the navbar on the page
        useClickOutside(burgerRef, clickOutside);

        // function to reactive notificationCountsData when the location of the user changes
        useEffect(() => {
            refetchNotificationCounts();
        }, [location, refetchNotificationCounts]);



    // funcs

        // toggle navbar
        const toggleNavbar = () => {
            setIsOpen(!isOpen);
        };

        // handle logout
        const handleLogout = async () => {
            await postLogout(token)
            Cookies.remove('token');
            Cookies.set('userIsLoggedInCrossPlatforms', false, { expires: 7, domain: '.digilogbook.app' });   
            navigate('/landing');
        };


        // function to close navigation list when you choose an item from the navlist
        function clickInput() {
            const input = document.getElementById('burger');
            if (input) {
            input.click();
            } else {
            console.error('Input element not found.');
            }
        }


        // click outside to close the navbar
         function clickOutside() {
            if(isOpen) {
                clickInput()
            }
        }


    return (
        <nav 
        className="fixed top-0 left-0 w-full bg-white shadow-lg z-[150] font-extralight bg-bgMenu" 
        ref={burgerRef}
        >
            <div className=" w-full px-4 py-4 flex justify-between items-center lg:px-10">

                <div className='w-full flex justify-start items-center gap-x-2 lg:gap-x-14'>

                    {/* hamburger menu for mobile */}
                    <label 
                        className={`${styles.burger} mt-[0px] lg:hidden`} 
                        htmlFor="burger" 
                    >
                        <input type="checkbox" id="burger" onClick={toggleNavbar}/>
                            <span></span>
                            <span></span>
                            <span></span>
                    </label>

                    {/* app logo */}
                    <img 
                        onClick={() => navigate('/profile')} 
                        src={companyLogo} 
                        alt="Company Logo" 
                        className='h-8 lg:h-12'  
                    /> 
                    
                    {/* Desktop Navigation */}
                    <ul className="hidden lg:flex lg:gap-x-10 font-extralight">

                        <li
                        className='w-20' 
                        onClick={() => (isOpen ? clickInput() : null)}
                        > 
                            <Link
                            className={`${currentUrl === '/profile' && 'underline underline-offset-8 text-textAccent'}`} 
                            to='/'
                            title="صفحه اصلی" 
                            aria-label="صفحه اصلی"
                            >
                            صفحه اصلی
                            </Link>
                        </li>

                        <li
                        className='w-20' 
                        onClick={() => (isOpen ? clickInput() : null)}
                        > 
                            <a 
                            href='https://digilogbook.app/blogs/1'
                            title="بلاگ" 
                            aria-label="بلاگ"
                            >
                            بلاگ
                            </a>
                        </li>

                        <li
                        className='w-20' 
                        onClick={() => (isOpen ? clickInput() : null)}
                        > 
                            <a 
                            href='https://digilogbook.app/aboutUs'
                            title="بلاگ" 
                            aria-label="بلاگ"
                            >
                            درباره ما
                            </a>
                        </li>

                        <li
                        className='w-20' 
                        onClick={() => (isOpen ? clickInput() : null)}
                        > 
                            <a 
                            href='https://digilogbook.app/contactUs'
                            title="تماس با ما" 
                            aria-label="تماس با ما"
                            >
                            تماس با ما
                            </a>
                        </li>

                        <li
                        className='w-20' 
                        onClick={() => (isOpen ? clickInput() : null)}
                        > 
                            <Link  
                            className={`${currentUrl === '/settings' && 'underline underline-offset-8 text-textAccent'}`} 
                            to='/settings'
                            title="تنظیمات"
                            aria-label="تنظیمات"
                            >
                            تنظیمات
                            </Link>
                        </li>
                        
                    </ul>

                </div>

                {/* icons */}
                <ul className='w-full flex justify-end items-center gap-x-2 lg:gap-x-3'>

                    <li className='w-6 flex flex-col items-center '
                    onClick={() => navigate('/notifications')}>
                        { notificationCountsData?.data !== 0 &&
                            <p 
                                className='w-3.5 h-3.5 -mb-3.5 -mr-4 bg-textError z-50 flex items-center justify-center rounded-full'
                            >
                                {notificationCountsData?.data}
                            </p>
                        }
                        <NotificationsOutlinedIcon 
                            sx={{ fill: currentUrl === '/notifications' ? 'var(--text-accent)' : 'var(--text-default)',}}
                        />
                    </li>

                    <li className='w-6' onClick={() => handleLogout()}>
                        <Logout />
                    </li>

                </ul>

            </div>

            {/* navigation menu in mobile */}
            <div 
            className={`
                lg:hidden fixed bg-bgMenu top-0 right-0 w-3/4 md:w-2/5 h-[100dvh] bg-white z-50 transform transition-all duration-300 rounded-l-3xl flex flex-col items-center justify-start pt-20 text-sm
                ${isOpen ? 'translate-x-0 ' : 'translate-x-full'}`
            }
            style={{boxShadow:isOpen && ' var(--shadow-button-dark),var(--shadow-button-white)'}}
            >

                <Avatar 
                    alt={data?.data.firstName || ''} 
                    src={data?.data.image?.path || '/'} 
                    sx={{height:'110px', width:'110px', zIndex:'0'}} 
                />

                <div id='name' className='flex flex-col items-center py-6 gap-y-3'>
                    <p className='text-lg'>{data?.data.firstName} {data?.data.lastName}</p>
                    <p>کد کاربری: {data?.data.userId}</p>
                </div>

                <ul
                className="lg:hidden bg-white flex flex-col items-start gap-y-7 px-4 pt-4"
                onClick={() => setIsOpen(false)} // Close menu on navigation item click
                >
                    <li
                    className='flex gap-x-3' 
                    onClick={() => (isOpen ? clickInput() : null)}
                    >
                        <HomeOutlined fontSize="small" sx={{color: currentUrl === '/profile' && 'var(--text-accent)' }}   />
                        <Link 
                        to='/'
                        className={`${currentUrl === '/profile' && 'underline underline-offset-8 text-textAccent'}`} 
                        title="پروفایل" 
                        aria-label="پروفایل"
                        >
                        پروفایل
                        </Link>
                    </li>

                    <li
                    className='flex gap-x-3' 
                    onClick={() => (isOpen ? clickInput() : null)}
                    > 
                        <EditOutlined fontSize="small"   />
                        <a 
                        href='https://digilogbook.app/blogs/1'
                        title="بلاگ" 
                        aria-label="بلاگ"
                        >
                        بلاگ
                        </a>
                    </li>

                    <li
                    className='flex gap-x-3' 
                    onClick={() => (isOpen ? clickInput() : null)}
                    > 
                        <GroupsOutlined fontSize="small"   />
                        <a 
                        href='https://digilogbook.app/aboutUs'
                        title="بلاگ" 
                        aria-label="بلاگ"
                        >
                        درباره ما
                        </a>
                    </li>

                    <li
                    className='flex gap-x-3' 
                    onClick={() => (isOpen ? clickInput() : null)}
                    > 
                        <PhoneOutlined fontSize="small"   />
                        <a 
                        href='https://digilogbook.app/contactUs'
                        title="تماس با ما" 
                        aria-label="تماس با ما"
                        >
                        تماس با ما
                        </a>
                    </li>

                    <li
                    className='flex gap-x-3' 
                    onClick={() => (isOpen ? clickInput() : null)}
                    > 
                        <SettingsOutlined fontSize="small" sx={{color: currentUrl === '/settings' && 'var(--text-accent)' }}  />
                        <Link  
                        to='/settings'
                        className={`${currentUrl === '/settings' && 'underline underline-offset-8 text-textAccent'}`} 
                        title="تنظیمات"
                        aria-label="تنظیمات"
                        >
                        تنظیمات
                        </Link>
                    </li>
                </ul>

                <Link 
                to='/' 
                    onClick={() => {clickInput(); handleLogout() }} 
                    className={`
                        ${buttonStyles.normalButton} 
                        w-[130px] h-[48px] flex items-center justify-center rounded-xl text-base mt-10 lg:hidden
                    `} 
                >
                خروج
                </Link>

            </div>

        </nav>
    );
};

export default NewNavbar;