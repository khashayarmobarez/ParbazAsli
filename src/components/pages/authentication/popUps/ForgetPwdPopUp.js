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
import { useCheckForgotPasswordCode, useResetPassword, useSendVerificationCode } from '../../../../Utilities/Services/AuthenticationApi';

// regex
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const PHONE_REGEX = /^09\d{9}$/;
const PWD_REGEX = /^[A-Za-z0-9~`!@#$%^&*()\-_\+={}\[\]|\/\\:;"`<>,.\?]+$/;



const ForgetPwdPopUp = ({showPopup, setShowPopup}) => {

    const dispatch = useDispatch();

    const userRef = useRef();
    
    const [showCodeInput, setShowCodeInput] = useState(false);
    const [showPassChangeInput , setShowPassChangeInput] = useState(false);
    
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
    
    const [codeRemainingTime, setCodeRemainingTime] = useState(null)
    const [errMsg, setErrMsg] = useState('');

    // Create an array of refs based on codeLength from api
    const isEmail = EMAIL_REGEX.test(input);
    const codeLength = isEmail ? 6 : 4;
    const [inputRefs, setInputRefs] = useState([]);

    
    const { mutate: mutateVerificationCode , isLoading: VerificationLoading} = useSendVerificationCode();
    const { mutate: mutateCheckCode , isLoading:CheckCodeLoading } = useCheckForgotPasswordCode();
    const { mutate: mutatePassChange , isLoading:passChangeLoading } = useResetPassword();


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


    useEffect(() => {
        dispatch(getAuthSettings());
      }, [dispatch]);
    
    useEffect(() => {
        const isValidPhone = PHONE_REGEX.test(input);
        const isValidEmail = EMAIL_REGEX.test(input);
        setValidInput(isValidPhone || isValidEmail);

        setInputRefs(Array.from({ length: codeLength }, () => React.createRef()));
    }, [input, codeLength]);

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


    useEffect(() => {
        if (inputRefs[0]?.current) {
            inputRefs[0].current.focus();
        }
    }, [inputRefs]);

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

    const handleCodeInput = (e, index) => {
        const newCode = [...code];
        newCode[index] = e.target.value;
        setCode(newCode.join(''));

        if (e.target.value && index < codeLength - 1) {
            inputRefs[index + 1].current.focus();   
        }
    };

    // Select the contents on focus
    function handleFocus(e) {
        e.target.select();
    }

    // Reset all inputs and clear state
    const resetCode = () => {
        inputRefs.forEach(ref => {
            if (ref.current) ref.current.value = '';
        });
        if (inputRefs[0]?.current) inputRefs[0].current.focus();
        setCode('');
    };

    // Handle backspace key
    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' || e.key === 'Delete') {
            if (!code[index] && index > 0) {
                inputRefs[index - 1].current.focus();
            }
        }
    };

    // Capture pasted characters
    const handlePaste = (e) => {
        e.preventDefault();
        
        const pasteData = e.clipboardData.getData('text').slice(0, codeLength);
        const newCode = [...code];
        
        pasteData.split('').forEach((char, i) => {
            if (i < codeLength) {
                newCode[i] = char;
                inputRefs[i].current.value = char;
            }
        });
    
        setCode(newCode.join(''));
    
        const nextIndex = pasteData.length < codeLength ? pasteData.length : codeLength - 1;
        if (inputRefs[nextIndex]?.current) {
            inputRefs[nextIndex].current.focus();
        }
    };

    // Clear button deletes all inputs and selects the first input for entry
    const ClearButton = () => {
        return (
            <button
                onClick={resetCode}
                className="text-2xl absolute right-[-30px] top-3"
            >
                <CloseIcon />
            </button>
        );
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
            
        const requestBody = {
            username: input,
            type: 2
        };
        
        mutateVerificationCode(requestBody, {
            onSuccess: (data) => {
                setShowCodeInput(true);
                console.log('Phone number code sent successfully:', data);
                setCodeRemainingTime(data.data.remainTimeSpanInSeconds)
            },
            onError: (error) => {
                setShowCodeInput(false);
                console.error('Failed to send phone number code:', error);
                setErrMsg(error.response?.data.ErrorMessages[0].ErrorMessage)
                toast(error.response?.data.ErrorMessages[0].ErrorMessage, {
                    type: 'error', // Specify the type of toast (e.g., 'success', 'error', 'info', 'warning')
                    position: 'top-right', // Set the position (e.g., 'top-left', 'bottom-right')
                    autoClose: 5000,
                    theme: 'dark',
                    style: { width: "90%" }
                }); 
            },
        });
    }



        
    // checking the code that is end to the user
    // mutateCheckCode
    const checkCodeHandler = async(e) => {
        e.preventDefault(e);
        if (!code) {
            toast('کد را وارد کنید', {
                type: 'error', 
                position: 'top-right', // Set the position (e.g., 'top-left', 'bottom-right')
                autoClose: 5000,
                theme: 'dark',
                style: { width: "90%" }
            });
            return;
        }

        const requestBody = {
            Username: input,
            Code: code
        };

        mutateCheckCode(requestBody, {
            onSuccess: (data) => {
                setShowCodeInput(false);
                setShowPassChangeInput(true);
                console.log('Code checked successfully:', data);
                setErrMsg('')
                toast('کد تایید با موفقیت تایید شد', {
                    type: 'success', 
                    position: 'top-right', // Set the position (e.g., 'top-left', 'bottom-right')
                    autoClose: 5000,
                    theme: 'dark',
                    style: { width: "90%" }
                });
            },
            onError: (error) => {
                console.error('Failed to check code:', error);
                setErrMsg(error.response?.data.ErrorMessages[0].ErrorMessage)
                toast(error.response?.data.ErrorMessages[0].ErrorMessage, {
                    type: 'error', 
                    position: 'top-right', // Set the position (e.g., 'top-left', 'bottom-right')
                    autoClose: 5000,
                    theme: 'dark',
                    style: { width: "90%" }
                });
            },
        });
    }




    // final submit logic
    const handlePassChangeFinalSubmit = async (e) => {
        e.preventDefault();
        
        if (!validPwd || !validMatch || !code) { 
            setErrMsg("اول فرم را کامل نموده و سپس تایید را بزنید");
            return;
        }

        const requestBody = {
            "username": input,
            "password": pwd,
            "confirmPassword": matchPwd,
            "code": code,
        };

        mutatePassChange(requestBody, {
            onSuccess: (data) => {
                toast('رمز شما با موفقیت تغییر یافت, دوباره لاگین کنید', {
                    type: 'success',
                    position: 'top-right', // Set the position (e.g., 'top-left', 'bottom-right')
                    autoClose: 5000,
                    theme: 'dark',
                    style: { width: "90%" }
                });
                setShowPopup(false);
            },
            onError: (error) => {
                console.error('Failed to change password:', error);
                setErrMsg(error.response?.data.ErrorMessages[0].ErrorMessage)
                toast(error.response?.data.ErrorMessages[0].ErrorMessage, {
                    type: 'error',
                    position: 'top-right', // Set the position (e.g., 'top-left', 'bottom-right')
                    autoClose: 5000,
                    theme: 'dark',
                    style: { width: "90%" }
                });
            },
        });
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

                        {
                            !showCodeInput && !showPassChangeInput &&
                            <>
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

                                {/* <button  className={`${ButtonStyles.addButton} w-32 ${VerificationLoading ? 'cursor-not-allowed opacity-45' : 'cursor-pointer'}`} 
                                    disabled={VerificationLoading}
                                    onClick={sendCodeHandler}>
                                        تایید
                                </button> */}
                            </>
                        }

                        {   showCodeInput && !showPassChangeInput &&
                            <>
                                <h3 className="text-[var(--yellow-text)] text-xl">کد تایید</h3>
                                <div dir="ltr" className="w-full flex justify-center gap-5 relative mt-2">
                                    {inputRefs.map((ref, index) => (
                                        <input
                                            style={{ border: 'none', borderBottom: '2px var(--yellow-text) solid ', background: 'transparent'}}
                                            className={`text-2xl rounded-none shadow-none w-10 flex p-2 text-center border`}
                                            key={index}
                                            type="text"
                                            autocomplete="one-time-code"
                                            maxLength={1}
                                            onChange={(e) => handleCodeInput(e, index)}
                                            ref={ref}
                                            autoFocus={index === 0}
                                            onFocus={handleFocus}
                                            onKeyDown={(e) => handleKeyDown(e, index)}
                                            onPaste={handlePaste}
                                        />
                                    ))}
                                </div>
                                
                                {
                                    isEmail &&
                                    <p className=' text-xs font-medium text-[var(--red-text)] -mb-4'>در صورتی که کد تایید برای شما ارسال نشده‌ است، پوشه هرزنامه (Spam) خود را بررسی نمایید.</p>
                                }
                                <p className={`${codeRemainingTime ? "text-light-yellow my-4" : "hidden"} text-xs font-medium`} aria-live="assertive">اگر کد را دریافت نکردید برای دریافت دوباره ی کد لطفا {codeRemainingTime} ثانیه صبر کنید</p>

                                {
                                    codeRemainingTime < 1 &&
                                        <p onClick={sendCodeHandler} className="text-light-yellow my-2 underline underline-offset-4 cursor-pointer" aria-live="assertive">ارسال مجدد</p>
                                }

                                <button  className={`${ButtonStyles.addButton} w-32 ${CheckCodeLoading ? 'cursor-not-allowed opacity-45' : 'cursor-pointer'}`} 
                                disabled={CheckCodeLoading}
                                onClick={checkCodeHandler}>
                                    تایید
                                </button>
                            </>
                        }

                        {
                            showPassChangeInput && !showCodeInput &&
                            <>
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
                                <button  className={`${ButtonStyles.addButton} w-32 ${passChangeLoading ? 'cursor-not-allowed opacity-45' : 'cursor-pointer'}`} 
                                disabled={passChangeLoading}
                                onClick={handlePassChangeFinalSubmit}>
                                    تایید
                                </button>
                            </>
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