import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

// react toastify
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { selectAuthSettings, getAuthSettings } from '../../../Utilities/ReduxToolKit/features/AuthenticationData/AuthenticationSlice';

// mui
import CloseIcon from '@mui/icons-material/Close';

// assets
import UserIcon from '../../../components/icons/UserIcon';

// styles
import boxStyles from '../../../styles/DataBox.module.css';
import ButtonStyles from '../../../styles/ButtonsBox.module.css';

// components 
import PasswordInputSignup from '../Inputs/PasswordInputSignup';
import ConfirmPassInputSignup from '../Inputs/ConfirmPassInputSignup';
import { useCheckForgotPasswordCode, useResetPassword, useSendVerificationCode } from '../../../Utilities/Services/AuthenticationApi';
import TextInput from '../../../components/inputs/textInput';

// regexes
import { EMAIL_REGEX, PHONE_REGEX, PWD_REGEX } from '../../../Utilities/Providers/regexProvider';

// context
import { useTranslation } from '../../../Utilities/context/TranslationContext';




const ForgetPwdPopUp = ({showPopup, setShowPopup}) => {

    // language
      const { t } = useTranslation();
      const dir = Cookies.get('dir') || 'ltr';

    const dispatch = useDispatch();
    const appTheme = Cookies.get('themeApplied') || 'dark';
    
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
    const [submitted, setSubmitted] = useState(false)

    
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

    const Toastify = (toastText,toastType) => toast(toastText, {
        type: toastType, 
        position: 'top-right', // Set the position (e.g., 'top-left', 'bottom-right')
        autoClose: 5000,
        theme: appTheme,
        style: { width: "90%" }
    });
        
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
        
        setSubmitted(true)

        if (!validInput) { 
            Toastify(t("RegistrationPages.popups.notifications.invalidInput"), 'error')
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
                Toastify(error.response?.data.ErrorMessages[0].ErrorMessage,'error') 
            },
        });
    }



        
    // checking the code that is end to the user
    // mutateCheckCode
    const checkCodeHandler = async(e) => {
        e.preventDefault(e);
        if (!code || code.length < codeLength) {
            Toastify(t("RegistrationPages.popups.notifications.enterCode"), 'error')
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
                Toastify(t("RegistrationPages.popups.notifications.codeSentSuccess"), 'success')
            },
            onError: (error) => {
                console.error('Failed to check code:', error);
                setErrMsg(error.response?.data.ErrorMessages[0].ErrorMessage)
                Toastify(error.response?.data.ErrorMessages[0].ErrorMessage, 'error')
            },
        });
    }




    // final submit logic
    const handlePassChangeFinalSubmit = async (e) => {
        e.preventDefault();
        
        if (!validPwd || !validMatch || !code) { 
            setErrMsg(t("RegistrationPages.popups.notifications.completeForm"));
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
                Toastify(t("RegistrationPages.popups.notifications.passwordChangeSuccess"), 'success')
                setShowPopup(false);
            },
            onError: (error) => {
                console.error('Failed to change password:', error);
                setErrMsg(error.response?.data.ErrorMessages[0].ErrorMessage)
                Toastify(error.response?.data.ErrorMessages[0].ErrorMessage, 'error')
            },
        });
    };


    return (
        <div className={`fixed inset-0 flex items-center justify-center z-[100] ${showPopup ? 'visible' : 'invisible'}`}>

            {loading && 
                <div className='w-full min-h-[71vh]'>
                    <p>{t("RegistrationPages.popups.changePass.loadingMessage")}</p>
                </div>
            }

            {error && 
                <div className='w-full min-h-[71vh]'>
                    <p>{t("RegistrationPages.popups.changePass.errorMessage")} {error}</p>
                </div>
            }
            
            {!loading && !error && (
                <div className='w-full h-full flex justify-center items-center backdrop-blur-sm '>
                    <form
                    className={`${boxStyles.containerChangeOwnership} w-[90%] md:w-[384px] pt-14 pb-2 flex flex-col gap-y-4 items-center relative bg-white p-5 rounded-[34px] shadow-lg`}
                    >
                        <CloseIcon
                            onClick={() => setShowPopup(false)}
                            sx={{ cursor: 'pointer', position: 'absolute', top: 16, right: 16 }}
                        />

                        {
                            !showCodeInput && !showPassChangeInput &&
                            <div className='w-full flex flex-col items-center gap-y-6'>
                                <p className='text-textAccent text-xl'>{t("RegistrationPages.popups.changePass.phoneOrEmailPrompt")}</p>

                                <TextInput
                                    id={'TI1'}
                                    value={input}
                                    onChange={phoneOrEmailInputHandler}
                                    placeholder={t("RegistrationPages.popups.changePass.phoneOrEmailTitle")}
                                    Type={'text'}
                                    icon={<UserIcon />} // You can replace `null` with a specific icon if you have one
                                    customActivePlaceHolderBgColor={'bg-bgCard'}
                                    ErrorCondition={input.length < 1}
                                    ErrorText={t("RegistrationPages.popups.changePass.phoneError")}
                                    ErrorCondition2={!(PHONE_REGEX.test(input) || EMAIL_REGEX.test(input)) && input.length > 0}
                                    ErrorText2={t("RegistrationPages.popups.changePass.phoneEmailFormatError")}
                                    isSubmitted={submitted} 
                                />

                                <button  className={`${ButtonStyles.addButton} w-32 ${VerificationLoading ? 'cursor-not-allowed opacity-45' : 'cursor-pointer'}`} 
                                    disabled={VerificationLoading}
                                    onClick={sendCodeHandler}>
                                        {t("RegistrationPages.popups.changePass.confirmButton")}
                                </button>
                            </div>
                        }

                        {   showCodeInput && !showPassChangeInput &&
                            <>
                                <h3 className="text-textAccent text-xl">{t("RegistrationPages.popups.changePass.codePrompt")}</h3>
                                <div dir="ltr" className="w-full flex justify-center gap-5 relative mt-2">
                                    {inputRefs.map((ref, index) => (
                                        <input
                                            style={{ border: 'none', borderBottom: '2px var(--text-default) solid ', background: 'transparent'}}
                                            className={`text-2xl rounded-none shadow-none w-10 flex p-2 text-center border`}
                                            key={index}
                                            type="text"
                                            autoComplete="one-time-code"
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
                                    <p className=' text-xs font-medium text-textAccent -mb-4'>در صورتی که کد تایید برای شما ارسال نشده‌ است، پوشه هرزنامه (Spam) خود را بررسی نمایید.</p>
                                }
                                <p className={`${codeRemainingTime ? "text-textAccent my-4" : "hidden"} text-xs font-medium`} aria-live="assertive">{t("RegistrationPages.popups.changePass.resendCodeMessage", { codeRemainingTime })}</p>

                                {
                                    codeRemainingTime < 1 &&
                                        <p onClick={sendCodeHandler} className="text-textAccent my-2 cursor-pointer text-xs font-medium" aria-live="assertive">
                                            {t("RegistrationPages.popups.changePass.resendCodeAction")}
                                        </p>
                                }

                                <button  className={`${ButtonStyles.addButton} w-32 ${CheckCodeLoading ? 'cursor-not-allowed opacity-45' : 'cursor-pointer'}`} 
                                disabled={CheckCodeLoading}
                                onClick={checkCodeHandler}>
                                    {t("RegistrationPages.popups.changePass.confirmButton")}
                                </button>
                            </>
                        }

                        {
                            showPassChangeInput && !showCodeInput &&
                            <>
                                <PasswordInputSignup 
                                    customActivePlaceHolderBgColor={'bg-bgCard'}
                                    customPlaceHolderText={t("RegistrationPages.popups.changePass.passwordInputPrompt")}
                                    onChange={(e) => setPwd(e.target.value)}
                                    value={pwd}
                                    focus={pwdFocus}
                                    onFocus={() => setPwdFocus(true)}
                                    onBlur={() => setPwdFocus(false)}
                                />

                                <ConfirmPassInputSignup
                                    customActivePlaceHolderBgColor={'bg-bgCard'}
                                    customPlaceHolderText={t("RegistrationPages.popups.changePass.confirmPasswordPrompt")}
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
                                    {t("RegistrationPages.popups.changePass.confirmButton")}
                                </button>
                            </>
                        }
                                    

                    </form>
                </div>
            )}

        </div>
    );
};

export default ForgetPwdPopUp;