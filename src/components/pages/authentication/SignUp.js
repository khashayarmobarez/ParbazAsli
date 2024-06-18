import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { selectAuthSettings, getAuthSettings } from '../../../Utilities/ReduxToolKit/features/AuthenticationData/AuthenticationSlice';

// styles
import ButtonStyles from '../../../styles/Buttons/ButtonsBox.module.css'

// mui
import CircularProgress from '@mui/material/CircularProgress';

// components
import UserNameInputSignup from './Inputs/UserNameInputSignup';
import UserLastNameInputSignup from './Inputs/UserLastNameInputSignup';
import PasswordInputSignup from './Inputs/PasswordInputSignup';
import ConfirmPassInputSignup from './Inputs/ConfirmPassInputSignup';
    // import NationalCodeInput from './Inputs/NationalCodeInput';
import PhoneInputSignup from './Inputs/PhoneInputSignup';
import Checkbox from './Inputs/CheckBox';
import PhoneVerificationCode from './popUps/PhoneVerificationCode';


// regex 
const USER_REGEX = /^[\u0600-\u06FF\s]+$/;
const PWD_REGEX = /^[A-Za-z0-9~`!@#$%^&*()\-_\+={}\[\]|\/\\:;"`<>,.\?]+$/;
const PHONE_REGEX = /^09\d{9}$/;
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
// const NATIONAL_CODE_REGEX = /^\d{10}$/;

const SignUp = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const authSettings = useSelector(selectAuthSettings);
    const {
        loading,
        error
    } = authSettings;
    const {
        passwordMinLength,
        passwordMaxLength,
        passwordRequireNonAlphanumeric,
        passwordRequireDigit,
        passwordRequireUppercase,
        passwordRequireLowercase,
        phoneNumberCodeLength,
    } = authSettings.settings;


    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [userFocus, setUserFocus] = useState(false);

    const [userLastName, setUserLastName] = useState(''); // New state for last name
    const [userLastNameFocus, setUserLastNameFocus] = useState(false); 

    // const [nationalCode, setNationalCode] = useState('');
    // const [nationalCodeFocus, setNationalCodeFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [matchFocus, setMatchFocus] = useState(false);

    const [termsChecked, setTermsChecked] = useState(false);

    const [validName, setValidName] = useState(false);
    const [validPwd, setValidPwd] = useState(false);
    const [validMatch, setValidMatch] = useState(false)
    const [validPhone, setValidPhone] = useState(false);
    // const [validNationalCode, setValidNationalCode] = useState(false);


    const [phone, setPhone] = useState(''); // State for phone number
    const [phoneFocus, setPhoneFocus] = useState(false); 
    
    const [showPopUpSubmit, setShowPopupSubmit] = useState(false)

    // confirm phone code
    const [code, setCode] = useState('');

    const [submitLoading, setSubmitLoading] = useState(false)
    const [errMsg, setErrMsg] = useState('');

    const [codeRemainingTime, setCodeRemainingTime] = useState(null)

    useEffect(() => {
        dispatch(getAuthSettings());
      }, [dispatch]);

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd,phone]);

    useEffect(() => {
        setValidName(USER_REGEX.test(user));
      }, [user]);
      
    useEffect(() => {
    const isValid =
        pwd.length >= passwordMinLength &&
        pwd.length <= passwordMaxLength &&
        (!passwordRequireNonAlphanumeric || /[^\w\s]/.test(pwd)) &&
        (!passwordRequireDigit || /\d/.test(pwd)) &&
        (!passwordRequireUppercase || /[A-Z]/.test(pwd)) &&
        (!passwordRequireLowercase || /[a-z]/.test(pwd)) &&
        PWD_REGEX.test(pwd);

    setValidPwd(isValid);
    setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd,  passwordMinLength, passwordMaxLength, passwordRequireNonAlphanumeric, passwordRequireDigit, passwordRequireUppercase, passwordRequireLowercase]);


    useEffect(() => {
        setValidPhone(PHONE_REGEX.test(phone)); // Validate phone number
    }, [phone]);

    const handleTermsToggle = (isChecked) => {
    setTermsChecked(isChecked); // Update the checked state in the parent component
    };

    // pop up logic
    const handlePopUp = async(e) => {

        e.preventDefault();
        if (!validName || !validPwd || !validMatch || !validPhone || !termsChecked) { 
            setErrMsg("اول فرم را کامل نموده و با قوانین موافقت کنید, سپس تایید را بزنید");
            return;
        }
        try {

            setSubmitLoading(true)
            
            const requestBody = {
                username: phone,
                type: 1
            };

            console.log(requestBody)
    
            // Send a POST request to the endpoint with the specified body
            const response = await axios.post(
                'https://api.par-baz.ir/api/Auth/SendVerificationCode',
                requestBody
            );
    
            // Check if the request was successful
            if (response.data.isSuccess) {
                setSubmitLoading(false)
                // Handle the response data
                setCodeRemainingTime(response.data.data.remainTimeSpanInSeconds)
                setShowPopupSubmit(true)
                // Update UI or perform any additional actions based on the response
            } else {
                setSubmitLoading(false)
                console.error('Failed to send phone number code');
                // Handle other scenarios if needed
            }
        } catch (err) {
            // Handle errors
            if (!err?.response) {
                setSubmitLoading(false)
                setErrMsg('مشکلی رخ داده, دوباره تلاش کنید');
                toast('مشکلی رخ داده, دوباره تلاش کنید', {
                    type: 'error', 
                    position: 'top-right', 
                    autoClose: 5000,
                    theme: 'dark',
                    style: { width: "90%" }
                });
            } else if (err.response?.status === 409) {
                setSubmitLoading(false)
                setErrMsg('شماره تلفن قبلا استفاده شده');
                toast('شماره تلفن قبلا استفاده شده', {
                    type: 'error', 
                    position: 'top-right', 
                    autoClose: 5000,
                    theme: 'dark',
                    style: { width: "90%" }
                });
            } else {
                setSubmitLoading(false)
                setErrMsg(err.response.data.ErrorMessages[0].ErrorMessage)
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
        if (!validName || !validPwd || !validMatch || !validPhone || !termsChecked || !code) { 
            setErrMsg("اول فرم را کامل نموده و با قوانین موافقت کنید, سپس تایید را بزنید");
            toast('اول فرم را کامل نموده و با قوانین موافقت کنید, سپس تایید را بزنید', {
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
                "PhoneNumber": phone,
                "Code": code,
                "FirstName": user,
                "LastName": userLastName,
                "Password": pwd,
                "ConfirmPassword": matchPwd
            }

            const response = await axios.post(
                'https://api.par-baz.ir/api/Auth/Register',
                requestBody
            );

            // succesful registeration
            if (response.data.isSuccess) {

                setSubmitLoading(false)

                console.log('Registration successful');
                console.log(response.data.data.loginExpireInDays);
                // Handle successful registration (e.g., redirect to login or home page)
                    // Save the token in a cookie
                    Cookies.set('token', response.data.data.token, { expires: response.data.data.loginExpireInDays });
                    // navigate the user to its page
                    navigate('/profile');
                    window.location.reload()
            } else {
                console.error('Registration failed');
                setSubmitLoading(false)
                setErrMsg('ثبت نام ناموفق');
            }
        } catch (err) {
            if (!err?.response) {
                setSubmitLoading(false)
                setErrMsg('مشکلی رخ داده, دوباره تلاش کنید');
                toast('مشکلی رخ داده است, دوباره تلاش کنید', {
                    type: 'error', 
                    position: 'top-right', 
                    autoClose: 5000,
                    theme: 'dark',
                    style: { width: "90%" }
                });
            } else {
                setSubmitLoading(false)
                console.log(err);
                setErrMsg(err.response.data.ErrorMessages[0].ErrorMessage);
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
        <section className='w-full min-h-[70vh] flex flex-col'>

            {loading && 
                <div className='w-full min-h-[71vh]'>
                    <p>Loading authentication settings...</p>
                </div>
            }

            {error && 
                <div className='w-full min-h-[71vh]'>
                    <p>Error fetching authentication settings: {error}</p>
                </div>
            }
            
            {!loading && !error && (
                <>
                    <form className='w-full flex flex-col gap-y-4 pt-6 pb-10'>

                        <UserNameInputSignup
                            userRef={userRef}
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            focus={userFocus}
                            onFocus={() => setUserFocus(true)}
                            onBlur={() => setUserFocus(false)}
                        />

                        <UserLastNameInputSignup
                            onChange={(e) => setUserLastName(e.target.value)}
                            value={userLastName}
                            focus={userLastNameFocus}
                            onFocus={() => setUserLastNameFocus(true)}
                            onBlur={() => setUserLastNameFocus(false)}
                            id='lastName'
                        />

                        {/* <NationalCodeInput
                            nationalCodeRef={userRef}
                            onChange={(e) => setNationalCode(e.target.value)}
                            value={nationalCode}
                            focus={nationalCodeFocus}
                            onFocus={() => setNationalCodeFocus(true)}
                            onBlur={() => setNationalCodeFocus(false)}
                        /> */}

                        <PhoneInputSignup
                            phoneRef={userRef}
                            onChange={(e) => setPhone(e.target.value)}
                            value={phone}
                            focus={phoneFocus}
                            onFocus={() => setPhoneFocus(true)}
                            onBlur={() => setPhoneFocus(false)}
                        />

                        <PasswordInputSignup 
                            
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            focus={pwdFocus}
                            onFocus={() => setPwdFocus(true)}
                            onBlur={() => setPwdFocus(false)}
                        />

                        <ConfirmPassInputSignup
                            password={pwd}
                            onChange={(e) => setMatchPwd(e.target.value)}
                            value={matchPwd}
                            focus={matchFocus}
                            onFocus={() => setMatchFocus(true)}
                            onBlur={() => setMatchFocus(false)}
                        />

                        <Checkbox
                            label="با قوانین و مقررات موافقم"
                            isChecked={termsChecked}
                            onToggle={handleTermsToggle}
                        />

                        <div className='w-28 self-center'>
                            <button type="submit" className={`${ButtonStyles.addButton} w-32 `} 
                            onClick={handlePopUp} 
                            disabled={submitLoading ? true : false}
                            >
                            {submitLoading ?
                                <CircularProgress sx={{ color: 'var(--dark-blue-bg)' }} size={25} />
                                :
                                <>
                                    تایید
                                </>
                            }
                            </button>
                            {/* {(!validName || !validPwd || !validMatch || !validPhone || !validEmail) &&
                            <p className='mt-[-2.8rem] w-24 h-12 rounded-3xl backdrop-blur text-center text-sm pt-3 font-semibold' style={{color:'black'}} > فرم را کامل کنید</p>
                            } */}
                        </div>


                        {/* <p ref={errRef} className={errMsg ? `text-[#ED553B]` : "hidden"} aria-live="assertive">{errMsg}</p> */}
                        <p className={codeRemainingTime ? "text-light-yellow" : "hidden"} aria-live="assertive"> برای دریافت دوباره ی کد {codeRemainingTime} صبر کتید</p>

                    </form>

                    <PhoneVerificationCode showPopup={showPopUpSubmit} setShowPopup={setShowPopupSubmit} codeRemainingTime={codeRemainingTime} code={code} setCode={setCode}
                    handleFinalSubmit={handleFinalSubmit} errMsg={errMsg} codeLength={phoneNumberCodeLength} />
                </>

            )}

        </section>
    );
};

export default SignUp;