import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { getAuthSettings, selectAuthSettings } from '../../Utilities/ReduxToolKit/features/AuthenticationData/AuthenticationSlice';

// api
import { postIsUserAuthenticated } from '../../Utilities/Services/AuthenticationApi';

// styles
import ButtonStyles from '../../styles/Buttons/ButtonsBox.module.css'

// compponents
import EmailInputSignup from '../../modules/authentication/Inputs/EmailInputSignUp';
import PhoneVerificationCode from '../../modules/authentication/popUps/PhoneVerificationCode';
import UserDataBox from '../../modules/Profile/UserDataBox';
import DigilogbookLoading from '../../components/Loader/DigilogbookLoading';
import { toast } from 'react-toastify';

// regexes
import { EMAIL_REGEX } from '../../Utilities/Providers/regexProvider';


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
    const appTheme = Cookies.get('themeApplied') || 'dark';
    
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
                theme: appTheme,
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
                    theme: appTheme,
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
                    theme: appTheme,
                    style: { width: "90%" }
                });
            } else if (err.response?.status === 409) {
                toast('شماره تلفن قبلا استفاده شده', {
                    type: 'error',
                    position: 'top-right',
                    autoClose: 5000,
                    theme: appTheme,
                    style: { width: "90%" }
                });
            } else {
                toast(err.response.data.ErrorMessages[0].ErrorMessage, {
                    type: 'error',
                    position: 'top-right',
                    autoClose: 5000,
                    theme: appTheme,
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
            toast("لطفا کد را درست وارد کنید", {
                type: 'error',
                position: 'top-right',
                autoClose: 5000,
                theme: appTheme,
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
                    theme: appTheme,
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
                    theme: appTheme,
                    style: { width: "90%" }
                });
            } else {
                console.log(err);
                toast(err.response.data.ErrorMessages[0].ErrorMessage, {
                    type: 'error',
                    position: 'top-right',
                    autoClose: 5000,
                    theme: appTheme,
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

            <div className='flex flex-col items-center justify-center gap-y-5 md:mt-4 w-[90%] md:w-[65%]'>

            {error && 
                <div className='w-full min-h-[71vh]'>
                    <p>Error fetching authentication settings: {error}</p>
                </div>
            }

            
            <UserDataBox />

            {
                !loading && !error &&
                <>
                    <p className='text-textWarning text-start'>برای دسترسی به پنل کاربری احراز موارد زیر الزامی است.</p>


                    {/* line and circle of adding flight level */}
                    <div className='w-full flex flex-col gap-y-2 justify-center items-center mb-1'>

                        <div className='flex items-center justify-center w-full'>
                            
                            <div className='border-2 rounded-full w-5 h-5  border-textAccent flex items-center justify-center'>
                                <div className='rounded-full w-3 h-3' style={{background:'var(--text-accent)'}}></div>
                            </div>

                            <div className='rounded-full w-[38%] md:w-[45%] h-[2px]' style={{background:'var(--icon-disable)'}}></div>

                            <div className='rounded-full w-3 h-3' style={{background:'var(--icon-disable)'}}></div>

                            <div className='rounded-full w-[38%] md:w-[45%] h-[2px]' style={{background:'var(--icon-disable)'}}></div>

                            <div className='rounded-full w-3 h-3' style={{background:'var(--icon-disable)'}}></div>

                        </div>
                        

                        <div className='flex items-center justify-between w-[95%] text-xs'>

                            <p className='' style={{color:'var(--text-accent)'}}>احراز ایمیل</p>

                            <p className='' style={{color:'var(--icon-disable)'}}>گواهینامه</p>

                            <p className='' style={{color:'var(--icon-disable)'}}>تاییدیه</p>

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
                        <p style={{color:'var(--text-error)'}}>{errMsg}</p>
                    }

                    <PhoneVerificationCode handleResendCode={handlePopUp} showPopup={showPopUpSubmit} setShowPopup={setShowPopupSubmit} codeRemainingTime={codeRemainingTime} code={code} setCode={setCode}
                    handleFinalSubmit={handleFinalSubmit} errMsg={errMsg} codeLength={emailCodeLength} isLoading={Submitloading} isForEmail={true} />
                </>
            }
            </div>
        </div>
    );
};

export default AddEmail;