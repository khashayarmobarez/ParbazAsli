import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { selectAuthSettings, getAuthSettings } from '../../../Utilities/ReduxToolKit/features/AuthenticationData/AuthenticationSlice';

// styles
import './SignUp.css';
import ButtonStyles from '../../../styles/Buttons/ButtonsBox.module.css'

// components
import UserNameInputSignup from './Inputs/UserNameInputSignup';
import UserLastNameInputSignup from './Inputs/UserLastNameInputSignup';
import PasswordInputSignup from './Inputs/PasswordInputSignup';
import ConfirmPassInputSignup from './Inputs/ConfirmPassInputSignup';
    // import NationalCodeInput from './Inputs/NationalCodeInput';
import PhoneInputSignup from './Inputs/PhoneInputSignup';
import EmailInputSignup from './Inputs/EmailInputSignUp';
import Checkbox from './Inputs/CheckBox';
import PhoneVerificationCode from './popUps/PhoneVerificationCode';


const USER_REGEX = /^[^0-9~'`!@#$%^&*()\-_\+={}\[\]|\/\\:;"`<>,.\?]+$/;
const PWD_REGEX = /^[A-Za-z0-9~`!@#$%^&*()\-_\+={}\[\]|\/\\:;"`<>,.\?]+$/;
const PHONE_REGEX = /^09\d{9}$/;
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
// const NATIONAL_CODE_REGEX = /^\d{10}$/;

const SignUp = () => {

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

    const [email, setEmail] = useState('');
    const [emailFocus, setEmailFocus] = useState(false);

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
    const [validEmail, setValidEmail] = useState(false);


    const [phone, setPhone] = useState(''); // State for phone number
    const [phoneFocus, setPhoneFocus] = useState(false); 
    
    const [showPopUpSubmit, setShowPopupSubmit] = useState(true)

    // confirm phone code
    const [code, setCode] = useState('');

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    const [codeRemainingTime, setCodeRemainingTime] = useState(null)

    useEffect(() => {
        dispatch(getAuthSettings());
      }, [dispatch]);

    useEffect(() => {
        // to set the focus of the user
        userRef.current.focus();
    
    }, []);

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd,phone, email]);

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

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email]);

    const handleTermsToggle = (isChecked) => {
    setTermsChecked(isChecked); // Update the checked state in the parent component
    };

    // pop up logic
    const handlePopUp = async(e) => {

        e.preventDefault();
        if (!validName || !validPwd || !validMatch || !validPhone || !validEmail || !termsChecked) { 
            setErrMsg("Invalid Entry");
            return;
        }
        try {
            
            const requestBody = {
                phoneNumber: phone,
                type: 1
            };
    
            // Send a POST request to the endpoint with the specified body
            const response = await axios.post(
                'https://api.par-baz.ir/api/Auth/SendPhoneNumberCode',
                requestBody
            );
    
            // Check if the request was successful
            if (response.data.isSuccess) {
                // Handle the response data
                console.log('Phone number code sent successfully');
                console.log('Remaining time span:', response.data.data.remainTimeSpanInSeconds);
                setCodeRemainingTime(response.data.data.remainTimeSpanInSeconds)
                setShowPopupSubmit(true)
                // Update UI or perform any additional actions based on the response
            } else {
                console.error('Failed to send phone number code');
                // Handle other scenarios if needed
            }
        } catch (err) {
            // Handle errors
            if (!err?.response) {
                setErrMsg('مشکلی رخ داده, دوباره تلاش کنید');
            } else if (err.response?.status === 409) {
                setErrMsg('شماره تلفن قبلا استفاده شده');
            } else {
                console.log(err)
                setErrMsg(err.response.data.errorMessages[0].errorMessage)
            }
            errRef.current.focus();
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
        if (!validName || !validPwd || !validMatch || !validPhone || !validEmail || !termsChecked || !code) { 
            setErrMsg("Invalid Entry");
            return;
        }
        try {
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

            if (response.data.isSuccess) {
                console.log('Registration successful');
                console.log('JWT Token:', response.data.data.token);
                console.log('Token Expiration:', response.data.data.loginExpirationDateTime);
                // Handle successful registration (e.g., redirect to login or home page)
            } else {
                console.error('Registration failed');
                setErrMsg('Registration failed');
            }
        } catch (err) {
            if (!err?.response) {
                setErrMsg('مشکلی رخ داده, دوباره تلاش کنید');
            } else {
                console.log(err);
                setErrMsg(err.response.data.errorMessages[0].errorMessage);
            }
            errRef.current.focus();
        }
    };


    return (
        <section className='w-full flex flex-col'>

            {loading && <p>Loading authentication settings...</p>}

            {error && <p>Error fetching authentication settings: {error}</p>}
            
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

                        <EmailInputSignup
                            emailRef={userRef}
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            focus={emailFocus}
                            onFocus={() => setEmailFocus(true)}
                            onBlur={() => setEmailFocus(false)}
                        />

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
                            <button type="submit" className={`${ButtonStyles.addButton} w-24 self-center `} 
                            onClick={handlePopUp} 
                            disabled={!validName || !validPwd || !validMatch ? true : false}
                            >
                            تایید
                            </button>
                            {(!validName || !validPwd || !validMatch) &&
                            <p className='mt-[-2.8rem] w-24 h-12 rounded-3xl backdrop-blur text-center text-sm pt-3 font-semibold' style={{color:'black'}} > فرم را کامل کنید</p>
                            }
                        </div>


                        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                        <p className={codeRemainingTime ? "errmsg" : "offscreen"} aria-live="assertive"> برای دریافت دوباره ی کد {codeRemainingTime} صبر کتید</p>

                    </form>

                    <PhoneVerificationCode showPopup={showPopUpSubmit} setShowPopup={setShowPopupSubmit} codeRemainingTime={codeRemainingTime} code={code} setCode={setCode}
                    handleFinalSubmit={handleFinalSubmit} errMsg={errMsg} />
                </>

            )}

            {/* <button 
            onClick={handleSubmit} 
            disabled={!validName || !validPwd || !validMatch ? true : false}
            className={`mt-10 `} style={{
            backgroundColor: (!validName || !validPwd || !validMatch) ? '#ccc' : '#007bff',
            color: (!validName || !validPwd || !validMatch) ? '#666' : '#fff',
            cursor: (!validName || !validPwd || !validMatch) ? 'not-allowed' : 'pointer',
        }}
            >
            Sign Up
            </button> */}

        </section>
    );
};

export default SignUp;