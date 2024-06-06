import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import Cookies from 'js-cookie';

// styles
import ButtonStyles from '../../../styles/Buttons/ButtonsBox.module.css'

// utilities
import { postIsUserAuthenticated } from '../../../Utilities/Services/AuthenticationApi';

// components
import PasswordInputLogin from './Inputs/PasswordInputLogin';
import Checkbox from './Inputs/CheckBox';
import ForgetPwdPopUp from './popUps/ForgetPwdPopUp';
import PhoneOrEmailInput from './Inputs/PhoneOrEmailInput';

// regex
const EMAIL_OR_PHONE_REGEX = /^(09\d{9}|[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*)$/;



const Login = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch();

    const userRef = useRef();
    const errRef = useRef();
    
    const [pwd, setPwd] = useState('');
    const [pwdFocus, setPwdFocus] = useState(false);

    const [userInput, setUserInput] = useState('');
    const [userInputFocus, setUserInputFocus] = useState(false);
    const [validUserInput, setValidUserInput] = useState(false);

    
    const [termsChecked, setTermsChecked] = useState(false);

    const [showForgetPassPopUp, setShowForgetPassPopUp] = useState(false)

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

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


        // Add your validation logic here
        if (!userInput || !pwd || !validUserInput) { 
            setErrMsg("اطلاعات درست نیست");
            return;
        }
        try {
            const requestBody = {
                username: userInput,
                password: pwd,
                rememberMe: true
            };

            const response = await axios.post(
                'https://api.par-baz.ir/api/Auth/Login',
                requestBody
            );

            // Successful login
            if (response.data.isSuccess) {
                console.log('Login successful');
                console.log(response.data.data.loginExpireInDays);
                console.log(response.data.data.token);

                // Save the token in a cookie
                Cookies.set('token', response.data.data.token, { expires: response.data.data.loginExpireInDays });

                await postIsUserAuthenticated(response.data.data.token, dispatch, navigate);
                // Navigate the user to the dashboard
                navigate('/profile');
            } else {
                console.error('Login failed');
                setErrMsg('Login failed');
            }
        } catch (err) {
            if (!err?.response) {
                setErrMsg('مشکلی رخ داده, دوباره تلاش کنید');
            } else if(!err?.response.data.ErrorMessages[0].ErrorKey === 'resetPasswordRequired') {
                setShowForgetPassPopUp(true)
                setErrMsg(' رمز خود را از طریق فراموشی رمز عبور تغییر دهید');
            } else {
                console.log(err);
                setErrMsg(err.response.data.ErrorMessages[0].ErrorMessage);
            }
            errRef.current.focus();
        }
    };

    

    

    return (
        <section className='w-full flex flex-col'>
            
            <form className='w-full flex flex-col gap-y-4 pt-6 pb-10 min-h-[71vh]'>

                <PhoneOrEmailInput
                    phoneRef={userRef}
                    onChange={(e) => setUserInput(e.target.value)}
                    value={userInput}
                    focus={userInputFocus}
                    onFocus={() => setUserInputFocus(true)}
                    onBlur={() => setUserInputFocus(false)}
                />

                <PasswordInputLogin    
                    onChange={(e) => setPwd(e.target.value)}
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

                <p className='text-lg text-start' onClick={handleForgetPassword} style={{color:'var(--yellow-text)'}}>
                    رمز عبور خود را فراموش کرده‌ام
                </p>

                <button type="submit" className={`${ButtonStyles.addButton} w-24 self-center `}
                    onClick={handleLoginSubmit} 
                    disabled={!userInput || !pwd ? true : false}
                    >
                    تایید
                </button>

                <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>

                
            </form>
            
            <ForgetPwdPopUp showPopup={showForgetPassPopUp} setShowPopup={setShowForgetPassPopUp} />
            
        </section>
    );
};

export default Login;