import React, { useEffect, useRef, useState } from 'react';

// styles
import ButtonStyles from '../../../styles/Buttons/ButtonsBox.module.css'

// components
import SignUp from './SignUp';
import Login from './Login';

const SignUpOrLogin = () => {

    // functions to set up Login or singUp 
        // to set which button is active and style it
        const [activeLink, setActiveLink] = useState('login'); // State to track active link

        // Ref to the button element
        const buttonRef = useRef(null);

        // Effect to click the button when the page is mounted
        useEffect(() => {
            // Check if the button ref exists and it has a current property
            if (buttonRef.current) {
            // Programmatically click the button
            buttonRef.current.click();
            }
        }, []);

    return (
        <div className='pt-12 flex flex-col items-center'>
            <div className='w-full mt-6 flex flex-col items-center justify-center md:w-[55%]'>

                <div className={`${ButtonStyles.ThreeStickedButtonCont}`}>
                    <button ref={buttonRef}  className={`${ButtonStyles.ThreeStickedButtonButton} rounded-r-xl ${activeLink === 'login' ? ButtonStyles.activeYellow : ''}`} onClick={() => setActiveLink('login')}>ورود</button> 
                    <button  className={`${ButtonStyles.ThreeStickedButtonButton} rounded-l-xl  ${activeLink === 'signUp' ? ButtonStyles.activeYellow : ''}`} onClick={() => setActiveLink('signUp')} >ثبت نام</button>
                </div>


                {activeLink === 'login' ? 
                // sign in
                <div className='w-[90%]'>
                    <Login />
                </div> 
                :
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