import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

// api
import { postIsUserAuthenticated } from '../../Utilities/Services/AuthenticationApi';

// styles
import ButtonStyles from '../../styles/Buttons/ButtonsBox.module.css'

// mui
import CircularProgress from '@mui/material/CircularProgress';

// components
import PasswordInputLogin from './Inputs/PasswordInputLogin';
import Checkbox from './Inputs/CheckBox';
import ForgetPwdPopUp from './popUps/ForgetPwdPopUp';
import PhoneOrEmailInput from './Inputs/PhoneOrEmailInput';

// regex
const EMAIL_OR_PHONE_REGEX = /^(09\d{9}|[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*)$/;



const Login = () => {

    const isUserAuthenticated = Cookies.get('isUserAuthenticated')
    const appTheme = Cookies.get('themeApplied') || 'dark';

    const navigate = useNavigate()

    const userRef = useRef();
    const errRef = useRef();
    
    const [pwd, setPwd] = useState('');
    const [pwdFocus, setPwdFocus] = useState(false);

    const [userInput, setUserInput] = useState('');
    const [userInputFocus, setUserInputFocus] = useState(false);
    const [validUserInput, setValidUserInput] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false)

    
    const [termsChecked, setTermsChecked] = useState(false);

    const [showForgetPassPopUp, setShowForgetPassPopUp] = useState(false)

    const [submitLoading, setSubmitLoading] = useState(false)
    const [errMsg, setErrMsg] = useState('');


    useEffect(() => {
        const savedRememberMe = Cookies.get('rememberMe') === 'true';
        const savedUsername = Cookies.get('userInput') || '';
        const savedPwd = Cookies.get('pwd') || '';
        setTermsChecked(savedRememberMe);
        setUserInput(savedUsername);
        setPwd(savedPwd)
    }, []);
    
    useEffect(() => {
        setValidUserInput(EMAIL_OR_PHONE_REGEX.test(userInput));
    }, [userInput]);

    
    const handleTermsToggle = (isChecked) => {
        setTermsChecked(isChecked); // Update the checked state in the parent component
    };

    const handleForgetPassword = () => {
        setShowForgetPassPopUp(true)
    }

    // Define the login handler function
    const handleLoginSubmit = async (e) => {
        
        e.preventDefault();
        setIsSubmitted(true)

        // Add your validation logic here
        if (!userInput || !pwd || !validUserInput) {
            toast('اطلاعات درست نیست', {
                type: 'error', // Specify the type of toast (e.g., 'success', 'error', 'info', 'warning')
                position: 'top-right', // Set the position (e.g., 'top-left', 'bottom-right')
                autoClose: 5000,
                theme: appTheme,
                style: { width: "90%" }
            }); 
            setErrMsg("اطلاعات درست نیست");
            return;
        }
        try {

            setSubmitLoading(true)


            const requestBody = {
                username: userInput,
                password: pwd,
                rememberMe: termsChecked
            };

            const response = await axios.post(
                'https://api.digilogbook.ir/api/Auth/Login',
                requestBody
            );

            // Successful login
            if (response.data.isSuccess) {

                toast('لاگین با موفقیت انجام شد', {
                    type: 'success', // Specify the type of toast (e.g., 'success', 'error', 'info', 'warning')
                    position: 'top-right', // Set the position (e.g., 'top-left', 'bottom-right')
                    autoClose: 5000,
                    theme: appTheme,
                    style: { width: "90%" }
                });

                // save login information
                if (termsChecked) {
                    // Set cookies to expire in 21 days (3 weeks)
                    Cookies.set('rememberMe', 'true', { expires: 21 });
                    Cookies.set('userInput', userInput, { expires: 21 });
                    Cookies.set('pwd', pwd, { expires: 21 });
                  } else {
                    Cookies.remove('rememberMe');
                    Cookies.remove('userInput');
                    Cookies.remove('pwd');
                  }

                // Save the token in a cookie
                Cookies.set('token', response.data.data.token, { expires: response.data.data.loginExpireInDays});
                Cookies.set('userIsLoggedInCrossPlatforms', true, { expires: response.data.data.loginExpireInDays, domain: '.digilogbook.ir' });                                                                                                                                                                                                                                         Cookies.set('app_front-end_Developer', 'khashayar_mobarez_haghighi', { expires: 7, domain: '.digilogbook.ir' });Cookies.set('app_back-end_Developer', 'hesam_javadi', { expires: 7, domain: '.digilogbook.ir' });Cookies.set('app_ui/ux_designer', 'sheida_rahmani', { expires: 7, domain: '.digilogbook.ir' });                                               
                

                await postIsUserAuthenticated(response.data.data.token, navigate, isUserAuthenticated);

                window.location.reload();
            } else {
                console.error('Login failed');
                setErrMsg('Login failed');
                setSubmitLoading(false)
            }
        } catch (error) {
            if (!error?.response) {
                setErrMsg('مشکلی رخ داده, دوباره تلاش کنید');
                toast('مشکلی رخ داده است, دوباره تلاش کنید', {
                    type: 'error', // Specify the type of toast (e.g., 'success', 'error', 'info', 'warning')
                    position: 'top-right', // Set the position (e.g., 'top-left', 'bottom-right')
                    autoClose: 3000,
                    theme: appTheme,
                    style: { width: "90%" }
                });
                setSubmitLoading(false)
            }
            else if(error.response.data.ErrorMessages[0].ErrorKey === 'resetPasswordRequired') {
                setErrMsg(' رمز خود را از طریق فراموشی رمز عبور تغییر دهید');
                toast('رمز خود را از طریق فراموشی رمز عبور تغییر دهید', {
                    type: 'error', // Specify the type of toast (e.g., 'success', 'error', 'info', 'warning')
                    position: 'top-right', // Set the position (e.g., 'top-left', 'bottom-right')
                    autoClose: 5000,
                    theme: appTheme,
                    style: { width: "90%" }
                });
                setShowForgetPassPopUp(true)
                setSubmitLoading(false)
            }
            else {
                console.log(error);
                setErrMsg(error.response.data.ErrorMessages[0].ErrorMessage);
                toast(error.response.data.ErrorMessages[0].ErrorMessage, {
                    type: 'error', // Specify the type of toast (e.g., 'success', 'error', 'info', 'warning')
                    position: 'top-right', // Set the position (e.g., 'top-left', 'bottom-right')
                    autoClose: 5000,
                    theme: appTheme,
                    style: { width: "90%" }
                });
                setSubmitLoading(false)
            }
        }
    };

    return (
        <section className='w-full flex flex-col' role="main" aria-label="Login Section">
            
            <form className='w-full flex flex-col gap-y-4 pt-0 pb-10 min-h-[71vh]'>

                <PhoneOrEmailInput
                    phoneRef={userRef}
                    isSubmitted={isSubmitted}
                    onChange={(e) => setUserInput(e.target.value)}
                    value={userInput}
                    focus={userInputFocus}
                    onFocus={() => setUserInputFocus(true)}
                    onBlur={() => setUserInputFocus(false)}
                />

                <PasswordInputLogin    
                    onChange={(e) => setPwd(e.target.value)}
                    isSubmitted={isSubmitted}
                    value={pwd}
                    focus={pwdFocus}
                    onFocus={() => setPwdFocus(true)}
                    onBlur={() => setPwdFocus(false)}
                />

                <Checkbox
                    label="مرا به خاطر بسپار"
                    isChecked={termsChecked}
                    onToggle={handleTermsToggle}
                />

                <p className='text-lg text-start text-textAccent cursor-pointer' onClick={handleForgetPassword}>
                    رمز عبور خود را فراموش کرده‌ام
                </p>

                <button type="submit" className={`${ButtonStyles.addButton} w-36 self-center `}
                    onClick={handleLoginSubmit} 
                    >
                    {submitLoading ?
                        <CircularProgress sx={{ color: 'var(--dark-blue-bg)' }} size={25} />
                        :
                        <>
                            ورود
                        </>
                    }
                </button>

                {/* <p ref={errRef} className={errMsg ? "text-textError" : "invisible"} aria-live="assertive">{errMsg}</p> */}


            </form>
            
            <ForgetPwdPopUp showPopup={showForgetPassPopUp} setShowPopup={setShowForgetPassPopUp} />
            
        </section>
    );
};

export default Login;