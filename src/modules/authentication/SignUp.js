import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { useTranslation } from '../../Utilities/context/TranslationContext';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { selectAuthSettings, getAuthSettings } from '../../Utilities/ReduxToolKit/features/AuthenticationData/AuthenticationSlice';

// styles
import ButtonStyles from '../../styles/ButtonsBox.module.css'

// mui
import { Box, CircularProgress } from '@mui/material';

// components
import UserNameInputSignup from './Inputs/UserNameInputSignup';
import UserLastNameInputSignup from './Inputs/UserLastNameInputSignup';
import PasswordInputSignup from './Inputs/PasswordInputSignup';
import ConfirmPassInputSignup from './Inputs/ConfirmPassInputSignup';
import PhoneInputSignup from './Inputs/PhoneInputSignup';
import Checkbox from './Inputs/CheckBox';
import PhoneVerificationCode from './popUps/PhoneVerificationCode';
import { postIsUserAuthenticated } from '../../Utilities/Services/AuthenticationApi';


// regex
import { USER_REGEX, PWD_REGEX, PHONE_REGEX  } from '../../Utilities/Providers/regexProvider';
import { API_BASE_URL } from '../../Utilities/Providers/apiUrl';

const SignUp = () => {

    // language
    const { t } = useTranslation();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const isUserAuthenticated = Cookies.get('isUserAuthenticated')
    const appTheme = Cookies.get('themeApplied') || 'dark';

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
    const [validLastName, setValidLastName] = useState(false);
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
    const [isSubmitted, setIsSubmitted] = useState(false)

    useEffect(() => {
        dispatch(getAuthSettings());
      }, [dispatch]);

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd,phone]);

    useEffect(() => {
        setValidName(USER_REGEX.test(user));
        setValidLastName(USER_REGEX.test(userLastName));
      }, [user, userLastName]);
      
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

    const Toastify = (toastText,toastType) => toast(toastText, {
        type: toastType, 
        position: 'top-center', // Set the position (e.g., 'top-left', 'bottom-right')
        autoClose: 5000,
        theme: appTheme,
        style: { width: "90%" }
    });

    // pop up logic
    const handlePopUp = async(e) => {

        e.preventDefault();
        setIsSubmitted(true)

        if (!validName || !validPwd || !validMatch || !validPhone || !termsChecked || !validLastName) { 
            Toastify(t("RegistrationPages.notifications.completeFormAndAgree"),'error')
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
                `${API_BASE_URL}/Auth/SendVerificationCode`,
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
                setErrMsg(t("RegistrationPages.notifications.tryAgain"));
                Toastify(t("RegistrationPages.notifications.tryAgain"),'error')
            } else if (err.response?.status === 409) {
                setSubmitLoading(false)
                setErrMsg(t("RegistrationPages.notifications.phoneAlreadyUsed"));
                Toastify(t("RegistrationPages.notifications.phoneAlreadyUsed"),'error')
            } else {
                setSubmitLoading(false)
                setErrMsg(err.response.data.ErrorMessages[0].ErrorMessage)
                Toastify(err.response.data.ErrorMessages[0].ErrorMessage,'error')
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
        if (!code || code.length < 4) { 
            Toastify(t("RegistrationPages.notifications.enterValidCode"), 'error')
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
                `${API_BASE_URL}/Auth/Register`,
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
                    await postIsUserAuthenticated(response.data.data.token, navigate, isUserAuthenticated);
                    
                    window.location.reload()
            } else {
                console.error('Registration failed');
                setSubmitLoading(false)
                setErrMsg(t("RegistrationPages.notifications.registrationFailed"));
            }
        } catch (err) {
            if (!err?.response) {
                setSubmitLoading(false)
                setErrMsg(t("RegistrationPages.notifications.registrationFailed"));
                Toastify(t("RegistrationPages.notifications.registrationFailed"),'error')
            } else {
                setSubmitLoading(false)
                console.log(err);
                setErrMsg(err.response.data.ErrorMessages[0].ErrorMessage);
                Toastify(err.response.data.ErrorMessages[0].ErrorMessage,'error')
            }
        }
    };


    return (
        <section className='w-full min-h-[70vh] flex flex-col'>

            {
            loading && 
                <Box sx={{ display: 'flex', width:'full' , justifyContent:'center', marginTop:'6rem' }}>
                    <CircularProgress /> 
                </Box>
            }

            {
            error && 
                <div className='w-full min-h-[71vh]'>
                    <p className='text-textError'>{t('RegistrationPages.Signup.errorMessage')}</p>
                </div>
            }
            
            {!loading && !error && (
                <>
                    <form className='w-full flex flex-col gap-y-6 pt-0 pb-10'>

                        <UserNameInputSignup
                            userRef={userRef}
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            focus={userFocus}
                            onFocus={() => setUserFocus(true)}
                            onBlur={() => setUserFocus(false)}
                            isSubmitted={isSubmitted}
                        />

                        <UserLastNameInputSignup
                            onChange={(e) => setUserLastName(e.target.value)}
                            value={userLastName}
                            focus={userLastNameFocus}
                            onFocus={() => setUserLastNameFocus(true)}
                            onBlur={() => setUserLastNameFocus(false)}
                            id='lastName'
                            isSubmitted={isSubmitted}
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
                            isSubmitted={isSubmitted}
                        />

                        <PasswordInputSignup 
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            focus={pwdFocus}
                            onFocus={() => setPwdFocus(true)}
                            onBlur={() => setPwdFocus(false)}
                            isSubmitted={isSubmitted}
                        />

                        <ConfirmPassInputSignup
                            password={pwd}
                            onChange={(e) => setMatchPwd(e.target.value)}
                            value={matchPwd}
                            focus={matchFocus}
                            onFocus={() => setMatchFocus(true)}
                            onBlur={() => setMatchFocus(false)}
                            isSubmitted={isSubmitted}
                        />

                        <Checkbox
                            className={'-mt-2 text-xs'}
                            hasUnderLine={true}
                            label={t('RegistrationPages.Signup.termsCheckbox')}
                            isChecked={termsChecked}
                            onToggle={handleTermsToggle}
                        />

                        <div className='w-28 self-center'>
                            <button type="submit" className={`${ButtonStyles.addButton} w-32 `} 
                            onClick={handlePopUp} 
                            disabled={submitLoading ? true : false}
                            >
                            {submitLoading ?
                                <CircularProgress sx={{ color: 'var(textAccent)' }} size={25} />
                                :
                                <>
                                    {t('RegistrationPages.Signup.submitButton')}
                                </>
                            }
                            </button>
                        </div>


                        <p className={codeRemainingTime ? "text-light-yellow" : "hidden"} aria-live="assertive">
                            {t('RegistrationPages.Signup.resendCodeMessage', { codeRemainingTime })}
                        </p>

                    </form>

                    <PhoneVerificationCode handleResendCode={handlePopUp} showPopup={showPopUpSubmit} setShowPopup={setShowPopupSubmit} codeRemainingTime={codeRemainingTime} code={code} setCode={setCode}
                    handleFinalSubmit={handleFinalSubmit} errMsg={errMsg} codeLength={phoneNumberCodeLength} isLoading={submitLoading} />
                </>

            )}

        </section>
    );
};

export default SignUp;