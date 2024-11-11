import React, { useEffect, useRef, useState } from 'react';

// styles
import ButtonStyles from '../../../styles/Buttons/ButtonsBox.module.css'

// components
import SignUp from './SignUp';
import Login from './Login';
import { useLocation, useNavigate } from 'react-router-dom';

const SignUpOrLogin = () => {

    const navigate = useNavigate();
    const location = useLocation();

    return (
        <div className='pt-12 flex flex-col items-center'>
            <div className='w-full mt-6 flex flex-col items-center justify-center md:w-[55%]'>

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