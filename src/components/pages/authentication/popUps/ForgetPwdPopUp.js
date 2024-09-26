import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';

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
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const PHONE_REGEX = /^09\d{9}$/;
const PWD_REGEX = /^[A-Za-z0-9~`!@#$%^&*()\-_\+={}\[\]|\/\\:;"`<>,.\?]+$/;



const ForgetPwdPopUp = ({showPopup, setShowPopup}) => {

    const dispatch = useDispatch();

    const notifySuccess = (message) => {
        toast.success(message, {
          position: "top-right",
          autoClose: 6000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          theme: 'dark',
          draggable: true,
          progress: undefined,
          style: { backgroundColor: 'green', color: 'white', width:'90%' }
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

    const [input, setInput] = useState('');
    const [inputFocus, setInputFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [matchFocus, setMatchFocus] = useState(false);

    const [validPwd, setValidPwd] = useState(false);
    const [validMatch, setValidMatch] = useState(false)

    const [validInput, setValidInput] = useState(false);

    // confirm phone code
    const [code, setCode] = useState('');
    const [codeFocus, setCodeFocus] = useState(false);

    const [showInputs, setShowInputs] = useState(false)

    const [codeRemainingTime, setCodeRemainingTime] = useState(null)
    const [errMsg, setErrMsg] = useState('');
    const [submitLoading, setSubmitLoading] = useState(false)

    

    useEffect(() => {
        dispatch(getAuthSettings());
      }, [dispatch]);
    
    useEffect(() => {
        const isValidPhone = PHONE_REGEX.test(input);
        const isValidEmail = EMAIL_REGEX.test(input);
        setValidInput(isValidPhone || isValidEmail);
    }, [input]);

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
    

        const persianToEnglishNumber = (input) => {
            const persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
            const englishNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
            
            return input.replace(/[\u06F0-\u06F9]/g, (char) => {
                return englishNumbers[persianNumbers.indexOf(char)];
            });
        };
          
        const phoneOrEmailInputHandler = (e) => {
        const convertedValue = persianToEnglishNumber(e.target.value);
        setInput(convertedValue);
        };

        // send code handler
        const sendCodeHandler = async(e) => {
            e.preventDefault();
            if (!validInput) { 
                toast('فرمت ایمیل یا شماره تلفن صحیح نمیباشد', {
                    type: 'error', // Specify the type of toast (e.g., 'success', 'error', 'info', 'warning')
                    position: 'top-right', // Set the position (e.g., 'top-left', 'bottom-right')
                    autoClose: 5000,
                    theme: 'dark',
                    style: { width: "90%" }
                }); 
                return;
            }
            try {
                
                const requestBody = {
                    username: input,
                    type: 2
                };
        
                // Send a POST request to the endpoint with the specified body
                const response = await axios.post(
                    'https://api.digilogbook.ir/api/Auth/SendVerificationCode',
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
                    toast('مشکلی رخ داده, دوباره تلاش کنید', {
                        type: 'error', // Specify the type of toast (e.g., 'success', 'error', 'info', 'warning')
                        position: 'top-right', // Set the position (e.g., 'top-left', 'bottom-right')
                        autoClose: 5000,
                        theme: 'dark',
                        style: { width: "90%" }
                    }); 
                } else {
                    console.log(err)
                    setErrMsg(err.response?.data.ErrorMessages[0].ErrorMessage)
                    toast(err.response?.data.ErrorMessages[0].ErrorMessage, {
                        type: 'error', // Specify the type of toast (e.g., 'success', 'error', 'info', 'warning')
                        position: 'top-right', // Set the position (e.g., 'top-left', 'bottom-right')
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
    const handlePassChangeFinalSubmit = async (e) => {
        e.preventDefault();
        
        if (!validPwd || !validMatch || !code) { 
            setErrMsg("اول فرم را کامل نموده و سپس تایید را بزنید");
            return;
        }
        
        try {

            setSubmitLoading(true);

            const requestBody = {
                "username": input,
                "password": pwd,
                "confirmPassword": matchPwd,
                "code": code,
            };
    
            const response = await axios.post(
                'https://api.digilogbook.ir/api/Auth/ForgotPassword',
                requestBody
            );
    
            // Check if response exists and handle successful password change
            if (response && response.data && response.data.isSuccess) {
                setSubmitLoading(false);
                
                // Handle successful password change
                setShowPopup(false);
                notifySuccess('رمز شما با موفقیت تغییر یافت, دوباره لاگین کنید');
            } else {
                console.error('Password change failed');
                setErrMsg('ناموفق');
            }
        } catch (err) {
            setSubmitLoading(false);
            // Improved error handling
            if (!err.response) {
                setErrMsg('مشکلی رخ داده, دوباره تلاش کنید');
            } else {
                console.error('Error:', err);
                setErrMsg(err.response.data && err.response.data.ErrorMessages 
                    ? err.response.data.ErrorMessages[0].ErrorMessage 
                    : 'مشکلی رخ داده, دوباره تلاش کنید');
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
                <div className='w-full h-full flex justify-center items-center backdrop-blur-sm'>
                    <form
                        className={`${boxStyles.containerChangeOwnership} w-[90%] md:w-[384px] pt-16 pb-6 flex flex-col gap-y-4 items-center relative bg-white p-5 rounded-lg shadow-lg`}
                    >
                        <CloseIcon
                            onClick={() => setShowPopup(false)}
                            sx={{ cursor: 'pointer', position: 'absolute', top: 16, right: 16 }}
                        />

                        <InputWithButton
                            id={'phoneOrEmail'}
                            onSubmit={sendCodeHandler}
                            icon={phoneIcon}
                            buttonText={'دریافت کد'}
                            placeH={'شماره موبایل یا ایمیل'}
                            inputRef={userRef}
                            onChange={phoneOrEmailInputHandler}
                            value={input}
                            focus={inputFocus}
                            onFocus={() => setInputFocus(true)}
                            onBlur={() => setInputFocus(false)}
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

                                    <p className=' text-xs font-medium text-[var(--red-text)] -mb-4 -mt-4'>در صورتی که کد تایید برای شما ارسال نشده‌ است، پوشه هرزنامه (Spam) خود را بررسی نمایید.</p>

                                    <p className={`${codeRemainingTime ? "text-light-yellow my-4" : "hidden"} text-xs font-medium`} aria-live="assertive">اگر کد را دریافت نکردید برای دریافت دوباره ی کد لطفا {codeRemainingTime} ثانیه صبر کنید</p>
                                    
                                    {
                                        codeRemainingTime < 1 &&
                                            <p onClick={sendCodeHandler} className="text-light-yellow my-2 underline underline-offset-4" aria-live="assertive">ارسال مجدد</p>
                                    }

                                    <button  className={`${ButtonStyles.addButton} w-32 ${submitLoading ? 'cursor-not-allowed opacity-45' : 'cursor-pointer'}`} 
                                    disabled={submitLoading}
                                    onClick={handlePassChangeFinalSubmit}>
                                        تایید
                                    </button>
                                </>
                            )
                        }

                        {/* <p className={waitNotif ? "errmsg" : "offscreen"} aria-live="assertive"> صبر کنید اطلاعات در حال بارگذاری می باشد</p> */}
                        <p className={errMsg ? "text-[#ED553B] text-sm" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    </form>
                </div>
            )}

        </div>
    );
};

export default ForgetPwdPopUp;