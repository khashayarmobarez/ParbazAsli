import React, { useEffect, useRef, useState } from 'react';

// styles
import ButtonStyles from '../../styles/Buttons/ButtonsBox.module.css'

// components
import SignUp from '../../modules/authentication/SignUp';
import Login from '../../modules/authentication/Login';
import { useLocation, useNavigate } from 'react-router-dom';

// assets
import authenticationBackground from '../../assets/image/logInBackgroundReduced.png'
import logo from '../../assets/Logo/DigilogbookNoFeatherLogo.png'
import { useMediaQuery } from '@mui/material';

const SignUpOrLogin = () => {

    const isDesktop = useMediaQuery('(min-width: 768px)');

    const navigate = useNavigate();
    const location = useLocation();

    const handleLogoClick = () => {
        window.location.href = 'https://digilogbook.app/';
    };

    return (
        <div className='pt-0 flex flex-col items-center md:grid grid-cols-12 bg-bgPageMain h-full'>
            <div className='w-full mt-11 flex flex-col items-center gap-y-6 justify-center md:col-span-4 md:px-[5%]'>

                {
                    !isDesktop &&
                    <img src={logo} alt='logo' className='w-[55%] mb-4' onClick={handleLogoClick} />
                }

                <div className={`${ButtonStyles.ThreeStickedButtonCont}`}>
                    <button 
                    className={`${ButtonStyles.ThreeStickedButtonButton} rounded-r-xl ${location.pathname === '/login' ? ButtonStyles.activeYellow : ''}`} 
                    onClick={() => navigate('/login')}>
                        ورود
                    </button>
                    <button  
                    className={`${ButtonStyles.ThreeStickedButtonButton} rounded-l-xl  ${location.pathname === '/signUp' ? ButtonStyles.activeYellow : ''}`} 
                    onClick={() => navigate('/signUp')}>
                        ثبت نام
                    </button>
                </div>

                {
                    location.pathname === '/login' &&
                    // sign in
                    <div className='w-[90%]'>
                        <Login />
                    </div> 
                }
                {
                    location.pathname === '/signUp' &&
                    // sign up
                    <div className='w-[90%]'>
                        <SignUp />
                    </div>
                }
                
            </div>
            {
                isDesktop &&
                <div className='w-full h-[100dvh] relative col-span-8'>
                    <img src={authenticationBackground} alt='Authentication' className='w-full h-full object-cover' />
                    <img src={logo} alt='logo' className='w-80 absolute left-[34%] top-[42dvh] cursor-pointer' onClick={handleLogoClick} />
                </div>
            }
        </div>
    );
};

export default SignUpOrLogin;