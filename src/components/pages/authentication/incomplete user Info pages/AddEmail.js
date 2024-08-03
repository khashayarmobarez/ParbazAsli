import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { getAuthSettings, selectAuthSettings } from '../../../../Utilities/ReduxToolKit/features/AuthenticationData/AuthenticationSlice';

// api
import { postIsUserAuthenticated } from '../../../../Utilities/Services/AuthenticationApi';

// styles
import ButtonStyles from '../../../../styles/Buttons/ButtonsBox.module.css'

// compponents
import EmailInputSignup from '../Inputs/EmailInputSignUp';
import PhoneVerificationCode from '../popUps/PhoneVerificationCode';
import UserDataBox from '../../Profile/UserDataBox';
import DigilogbookLoading from '../../../Loader/DigilogbookLoading';
import { toast } from 'react-toastify';

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const AddEmail = () => {

    const authSettings = useSelector(selectAuthSettings);
    const {
        loading,
        error
    } = authSettings;
    const {
        emailCodeLength
    } = authSettings.settings;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAuthSettings());
        console.log(authSettings.settings)
    }, [dispatch]);

    const isUserAuthenticated = Cookies.get('isUserAuthenticated')
    
    const token = Cookies.get('token')

    const navigate = useNavigate()

    const userRef = useRef();

    const [email, setEmail] = useState('');
    const [emailFocus, setEmailFocus] = useState(false);

    const [code, setCode] = useState('');
    
    const [validEmail, setValidEmail] = useState(false);

    const [showPopUpSubmit, setShowPopupSubmit] = useState(false)

    const [Submitloading ,setSubmitLoading] = useState(false)

    const [codeRemainingTime, setCodeRemainingTime] = useState(null)
    
    const [errMsg, setErrMsg] = useState('');


    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email]);



    // pop up logic
    const handlePopUp = async(e) => {

        e.preventDefault();

        
        if (!validEmail) { 
            toast("فرم را کامل نموده و سپس تایید را بزنید", {
                type: 'error',
                position: 'top-right',
                autoClose: 5000,
                theme: 'dark',
                style: { width: "90%" }
            });
            return;
        }
        try {

            setSubmitLoading(true)
            
            const requestBody = {
                username: email,
                type: 1
            };
    
            // Send a POST request to the endpoint with the specified body
            const response = await axios.post(
                'https://api.digilogbook.ir/api/Auth/SendVerificationCode',
                requestBody,
            );
    
            // Check if the request was successful
            if (response.data.isSuccess) {
                setSubmitLoading(false)
                // Handle the response data
                setCodeRemainingTime(response.data.data.remainTimeSpanInSeconds)
                setShowPopupSubmit(true)
                toast('کد با موفقیت ارسال شد', {
                    type: 'success',
                    position: 'top-right',
                    autoClose: 5000,
                    theme: 'dark',
                    style: { width: "90%" }
                });
                // Update UI or perform any additional actions based on the response
            } 
        } catch (err) {
            setSubmitLoading(false)
            // Handle errors
            if (!err?.response) {
                toast('مشکلی رخ داده, دوباره تلاش کنید', {
                    type: 'error',
                    position: 'top-right',
                    autoClose: 5000,
                    theme: 'dark',
                    style: { width: "90%" }
                });
            } else if (err.response?.status === 409) {
                toast('شماره تلفن قبلا استفاده شده', {
                    type: 'error',
                    position: 'top-right',
                    autoClose: 5000,
                    theme: 'dark',
                    style: { width: "90%" }
                });
            } else {
                toast(err.response.data.ErrorMessages[0].ErrorMessage, {
                    type: 'error',
                    position: 'top-right',
                    autoClose: 5000,
                    theme: 'dark',
                    style: { width: "90%" }
                });
            }
        }
    
    }


    // remaining time to send code again
    useEffect(() => {
        if (codeRemainingTime === null) return;

        const intervalId = setInterval(() => {
            setCodeRemainingTime(prevTime => {
                if (prevTime <= 1) {
                    clearInterval(intervalId);
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

    return () => clearInterval(intervalId);
    }, [codeRemainingTime]);



    // final submit logic
    const handleFinalSubmit = async (e) => {
        if ( !validEmail || !code) { 
            toast("اشکالی در اطلاعات وارد شده وجود دارد", {
                type: 'error',
                position: 'top-right',
                autoClose: 5000,
                theme: 'dark',
                style: { width: "90%" }
            });
            return;
        }
        try {
            setSubmitLoading(true)
            console.log(email)
            console.log(code)
            const requestBody = {
                'email':email,
                'code': code
            }

            const response = await axios.post(
                'https://api.digilogbook.ir/api/Auth/AddEmail',
                requestBody,
                {
                    headers: {
                      Authorization: `Bearer ${token}`,
                      'Content-Type': 'application/json',
                    },
                }
            );

            // succesful registeration
            if (response.data.isSuccess) {
                setSubmitLoading(false)
                console.log('email adding successful');
                // Handle successful add email 
                    // check the level of users authentication
                    await postIsUserAuthenticated(token, navigate, isUserAuthenticated);
                    
                    window.location.reload();
            } else {
                console.error('Registration failed');
                toast('ثبت ایمیل ناموفق', {
                    type: 'error',
                    position: 'top-right',
                    autoClose: 5000,
                    theme: 'dark',
                    style: { width: "90%" }
                });
            }
        } catch (err) {
            setSubmitLoading(false)
            if (!err?.response) {
                toast('مشکلی رخ داده, دوباره تلاش کنید', {
                    type: 'error',
                    position: 'top-right',
                    autoClose: 5000,
                    theme: 'dark',
                    style: { width: "90%" }
                });
            } else {
                console.log(err);
                toast(err.response.data.ErrorMessages[0].ErrorMessage, {
                    type: 'error',
                    position: 'top-right',
                    autoClose: 5000,
                    theme: 'dark',
                    style: { width: "90%" }
                });
            }
        }
    };



    return (
        <div className=' w-full h-full flex flex-col items-center pt-20 pb-[4rem]'>
            
            {
            loading && 
                <DigilogbookLoading />
            }

            <div className='flex flex-col items-center justify-center gap-y-8 md:mt-4 w-[90%] md:w-[65%]'>

            {error && 
                <div className='w-full min-h-[71vh]'>
                    <p>Error fetching authentication settings: {error}</p>
                </div>
            }

            
            <UserDataBox />

            {
                !loading && !error &&
                <>
                    <p style={{color:'var(--red-text)'}}>برای دسترسی به پنل کاربری احراز موارد زیر الزامی است</p>


                    {/* line and circle of adding flight level */}
                    <div className='w-full flex flex-col gap-y-3 justify-center items-center'>

                        <div className='flex items-center justify-center w-full'>
                            
                            <div className='rounded-full w-3 h-3' style={{background:'var(--soft-white)'}}></div>

                            <div className='rounded-full w-[38%] md:w-[45%] h-[2px]' style={{background:'var(--soft-white)'}}></div>

                            <div className='rounded-full w-3 h-3' style={{background:'var(--soft-white)'}}></div>

                            <div className='rounded-full w-[38%] md:w-[45%] h-[2px]' style={{background:'var(--soft-white)'}}></div>

                            <div className='rounded-full w-3 h-3' style={{background:'var(--yellow-text)'}}></div>

                        </div>

                        <div className='flex items-center justify-between w-[97%]'>

                            <p className='' style={{color:'var(--soft-white)'}}>تاییدیه</p>

                            <p className='' style={{color:'var(--soft-white)'}}>گواهینامه</p>

                            <p className='' style={{color:'var(--yellow-text)'}}>احراز ایمیل</p>

                        </div>

                    </div>

                    
                    <EmailInputSignup
                        emailRef={userRef}
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        focus={emailFocus}
                        onFocus={() => setEmailFocus(true)}
                        onBlur={() => setEmailFocus(false)}
                    />

                    <button type="submit" className={`${ButtonStyles.addButton} w-24 self-center `} 
                    onClick={handlePopUp} 
                    disabled={Submitloading}
                    >
                            ثبت
                    </button>

                    {
                        errMsg && 
                        <p style={{color:'var(--red-text)'}}>{errMsg}</p>
                    }

                    <PhoneVerificationCode handleResendCode={handlePopUp} showPopup={showPopUpSubmit} setShowPopup={setShowPopupSubmit} codeRemainingTime={codeRemainingTime} code={code} setCode={setCode}
                    handleFinalSubmit={handleFinalSubmit} errMsg={errMsg} codeLength={emailCodeLength} isLoading={Submitloading} />
                </>
            }
            </div>
        </div>
    );
};

export default AddEmail;