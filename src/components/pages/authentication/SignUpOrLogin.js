import React, { useEffect, useRef, useState } from 'react';

// styles
import ButtonStyles from '../../../styles/Buttons/ButtonsBox.module.css'

// components
import SignUp from './SignUp';
import Login from './Login';
import { useLocation, useNavigate } from 'react-router-dom';

// assets
import authenticationBackground from '../../../assets/image/logInBackgroundReduced.png'
import logo from '../../../assets/Logo/DigilogbookNoFeatherLogo.png'
import { useMediaQuery } from '@mui/material';

const SignUpOrLogin = () => {

    const isDesktop = useMediaQuery('(min-width: 768px)');

    const navigate = useNavigate();
    const location = useLocation();

    return (
        <div className='pt-0 flex flex-col items-center md:flex-row-reverse bg-bgPageMain h-full'>
            {
                isDesktop &&
                <div className='w-[90%] h-[100dvh] relative'>
                    <img src={authenticationBackground} alt='Authentication' className='w-full h-full object-cover' />
                    <img src={logo} alt='logo' className='w-80 absolute left-[34%] top-[42dvh]' />
                </div>
            }
            <div className='w-full mt-16 flex flex-col items-center gap-y-7 justify-center md:w-[40%] md:px-10'>

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
        </div>
    );
};

export default SignUpOrLogin;