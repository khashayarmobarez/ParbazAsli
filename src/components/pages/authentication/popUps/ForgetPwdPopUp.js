import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

// react toastify
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { selectAuthSettings, getAuthSettings } from '../../../../Utilities/ReduxToolKit/features/AuthenticationData/AuthenticationSlice';

// mui
import CloseIcon from '@mui/icons-material/Close';

// assets
import phoneIcon from '../../../../assets/icons/phone-Icon (Stroke).svg';

// styles
import boxStyles from '../../../../styles/Boxes/DataBox.module.css';
import ButtonStyles from '../../../../styles/Buttons/ButtonsBox.module.css';

// components 
import InputWithButton from '../../../inputs/InputWithButton';
import PasswordInputSignup from '../Inputs/PasswordInputSignup';
import ConfirmPassInputSignup from '../Inputs/ConfirmPassInputSignup';
import CodeInput from '../Inputs/CodeInput';

// regex
const PHONE_REGEX = /^09\d{9}$/;
const PWD_REGEX = /^[A-Za-z0-9~`!@#$%^&*()\-_\+={}\[\]|\/\\:;"`<>,.\?]+$/;



const ForgetPwdPopUp = ({showPopup, setShowPopup}) => {

    const dispatch = useDispatch();

    const navigate = useNavigate()

    const notifySuccess = (message) => {
        toast.success(message, {
          position: "top-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          style: { backgroundColor: 'green', color: 'white' }
        });
      };

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
    } = authSettings.settings;

    
    const userRef = useRef();
    const errRef = useRef();

    const [phone, setPhone] = useState(''); // State for phone number
    const [phoneFocus, setPhoneFocus] = useState(false); 

    const [pwd, setPwd] = useState('');
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [matchFocus, setMatchFocus] = useState(false);

    const [validPwd, setValidPwd] = useState(false);
    const [validMatch, setValidMatch] = useState(false)

    const [validPhone, setValidPhone] = useState(false);

    // confirm phone code
    const [code, setCode] = useState('');
    const [codeFocus, setCodeFocus] = useState(false);

    const [showInputs, setShowInputs] = useState(false)

    const [codeRemainingTime, setCodeRemainingTime] = useState(null)
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        dispatch(getAuthSettings());
      }, [dispatch]);
    
    useEffect(() => {
        setValidPhone(PHONE_REGEX.test(phone)); // Validate phone number
    }, [phone]);

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


    // send code handler
    const sendCodeHandler = async(e) => {
        e.preventDefault();
        if (!validPhone) { 
            setErrMsg("فرمت شماره تلفن صحیح نمیباشد");
            return;
        }
        try {
            
            const requestBody = {
                phoneNumber: phone,
                type: 2
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
                // Update UI or perform any additional actions based on the response
                setShowInputs(true)
            } else {
                console.error('Failed to send phone number code');
                // Handle other scenarios if needed
            }
        } catch (err) {
            // Handle errors
            if (!err?.response) {
                setErrMsg('مشکلی رخ داده, دوباره تلاش کنید');
            } else {
                console.log(err)
                setErrMsg(err.response.data.ErrorMessages[0].ErrorMessage)
            }
        }
    }


    // final submit logic
    const handlePassChangeFinalSubmit = async (e) => {
        e.preventDefault();
        
        if (!validPwd || !validMatch || !code) { 
            setErrMsg("اول فرم را کامل نموده و با قوانین موافقت کنید, سپس تایید را بزنید");
            return;
        }
        
        try {
            const requestBody = {
                "username": phone,
                "Password": pwd,
                "ConfirmPassword": matchPwd,
                "Code": code,
            };
    
            const response = await axios.post(
                'https://api.par-baz.ir/api/Auth/ForgotPassword',
                requestBody
            );
    
            // Successful passwordCHange
            if (response.data.isSuccess) {
                console.log('Password change successful');
                console.log(response.data.data.loginExpireInDays);
                console.log(response.data);
                
                // Handle successful passwordCHange
                setShowPopup(false);
                notifySuccess('رمز شما با موفقیت تغییر یافت, دوباره لاگین کنید');
            } else {
                console.error('Password change failed');
                setErrMsg('ناموفق');
            }
        } catch (err) {
            if (err.response) {
                setErrMsg('مشکلی رخ داده, دوباره تلاش کنید');
            } else {
                console.error('Error:', err.response.data);
                setErrMsg(err.response.data.ErrorMessages ? err.response.data.ErrorMessages[0].ErrorMessage : 'مشکلی رخ داده, دوباره تلاش کنید');
            }
        }
    };


    return (
        <div className={`fixed inset-0 flex items-center justify-center ${showPopup ? 'visible' : 'invisible'}`}>

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
                    <form
                        className={`${boxStyles.containerChangeOwnership} w-[90%] md:w-[384px] py-16 flex flex-col gap-y-4 items-center relative bg-white p-5 rounded-lg shadow-lg`}
                    >
                        <CloseIcon
                            onClick={() => setShowPopup(false)}
                            sx={{ cursor: 'pointer', position: 'absolute', top: 16, right: 16 }}
                        />

                        <InputWithButton 
                            Type={'number'} 
                            id={'phoneNumber'}
                            onSubmit={sendCodeHandler} 
                            icon={phoneIcon} 
                            buttonText={'دریافت کد'} 
                            placeH={'24** *** 0912'}
                            phoneRef={userRef}
                            onChange={(e) => setPhone(e.target.value)}
                            value={phone}
                            focus={phoneFocus}
                            onFocus={() => setPhoneFocus(true)}
                            onBlur={() => setPhoneFocus(false)}
                        />

                        {
                            showInputs && (
                                <>
                                    <CodeInput
                                        onChange={(e) => setCode(e.target.value)}
                                        value={code}
                                        focus={codeFocus}
                                        onFocus={() => setCodeFocus(true)}
                                        onBlur={() => setCodeFocus(false)}
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

                                    <button  className={`${ButtonStyles.addButton} w-32`} onClick={handlePassChangeFinalSubmit}>ارسال</button>
                                </>
                            )
                        }
                        
                        <p className={codeRemainingTime ? "errmsg" : "offscreen"} aria-live="assertive">اگر کد را دریافت نکردین برای دریافت دوباره ی کد لطفا {codeRemainingTime} صبر کتید</p>
                        <p className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive"> {errMsg}</p>
                        {/* <p className={waitNotif ? "errmsg" : "offscreen"} aria-live="assertive"> صبر کتید اطلاعات در حال بارگذاری می باشد</p> */}

                    </form>
                </>
            )}

        </div>
    );
};

export default ForgetPwdPopUp;