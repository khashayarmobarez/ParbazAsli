import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';

// styles
import ButtonStyles from '../../styles/Buttons/ButtonsBox.module.css'

// assets
import PhoneIcon from '../../components/icons/PhoneIcon';
import MailIcon from '../../components/icons/MailIcon';

// redux
import { useSelector } from 'react-redux';
import { selectAuthSettings } from '../../Utilities/ReduxToolKit/features/AuthenticationData/AuthenticationSlice';

// queries
import { useChangeEmail, useChangePhoneNumber, useSendVerificattionCodeToChange, useUserData } from '../../Utilities/Services/userQueries';

// components
import FixedInput from '../../components/inputs/FixedInput';
import InputWithButton from '../../components/inputs/InputWithButton';
import ChangePicPopUp from '../Profile/EditProfile/ChangePicPopUp';
import PhoneVerificationCode from '../authentication/popUps/PhoneVerificationCode';
import ChangePasswordPopUp from '../Profile/EditProfile/ChangePasswordPopUp';

const EditUserSettings = () => {

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
        emailCodeLength,
        phoneNumberCodeLength,
    } = authSettings.settings;

    // popUp use state
    const [showPopupType, setShowPopupType] = useState('');
    const [LoadingStatus, setLoadingStatus] = useState(false);

    // phoneNumber states
    const [phoneNumberCode, setPhoneNumberCode] = useState('')
    const [codeRemainingTimePhone, setCodeRemainingTimePhone] = useState(null)
    const [phoneNumber, setPhoneNumber] = useState('')
    
    // email states
    const [email, setEmail] = useState('')
    const [codeRemainingTimeEmail, setCodeRemainingTimeEmail] = useState(null)
    const [emailCode, setEmailCode] = useState('')

    // queries
    const { data: userData, isLoading:userDataLoading, error:userDataError } = useUserData();
    const { mutate: mutateCodeRequestToChange} = useSendVerificattionCodeToChange();
    const { mutate: mutateChangePhone } = useChangePhoneNumber();
    const { mutate: mutateChangeEmail } = useChangeEmail();

    // decrease codeRemainingTimePhone 1, every second
    useEffect(() => {
        if(codeRemainingTimePhone > 0) {
            const interval = setInterval(() => {
                setCodeRemainingTimePhone(codeRemainingTimePhone - 1)
            }, 1000);
            return () => clearInterval(interval);
        }
        
    }, [codeRemainingTimePhone])
    
    useEffect(() => {
        
        if(codeRemainingTimeEmail > 0) {
            const interval = setInterval(() => {
                setCodeRemainingTimeEmail(codeRemainingTimeEmail - 1)
            }
            , 1000);
            return () => clearInterval(interval);
        }
        
    }, [codeRemainingTimeEmail])


    const persianToEnglishNumber = (input) => {
        const persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
        const englishNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
        
        return input.replace(/[\u06F0-\u06F9]/g, (char) => {
            return englishNumbers[persianNumbers.indexOf(char)];
        });
    };

    const changePhoneNumberHandler = (e) => {
        const convertedValue = persianToEnglishNumber(e.target.value);
        setPhoneNumber(convertedValue);
    }


    const changeEmailHandler = (e) => {
        setEmail(e.target.value)
    }

    const handleFinalPhoneSubmission = () => {
        
        if(phoneNumberCode.length !== phoneNumberCodeLength) {
            toast('کد تایید باید ۶ رقمی باشد', {
                type: 'error',
                position: 'top-right',
                autoClose: 5000,
                theme: appTheme,
                style: { width: "90%" }
            });
            return;
        }

        setLoadingStatus(true)

        const requestBody = {
            phoneNumber: phoneNumber,
            code: phoneNumberCode
        }

        mutateChangePhone(requestBody, {
            onSuccess: (data) => {
                setLoadingStatus(false)
                setShowPopupType('')
                toast('شماره تلفن شما با موفقیت تغییر یافت', {
                    type: 'success',
                    position: 'top-right',
                    autoClose: 5000,
                    theme: appTheme,
                    style: { width: "90%" }
                });
            },
            onError: (err) => {
                setLoadingStatus(false)
                setShowPopupType('')
                toast(err.response.data.ErrorMessages[0].ErrorMessage, {
                    type: 'error',
                    position: 'top-right',  
                    autoClose: 5000,
                    theme: appTheme,
                    style: { width: "90%" }
                });
            }
        })
    }


    const changeEmailPopUp = async(e) => {

        if (!email) { 
            toast('ایمیل خود را وارد کنید ', {
                type: 'error', 
                position: 'top-right', 
                autoClose: 5000,
                theme: appTheme,
                style: { width: "90%" }
            });
            return;
        }


        setLoadingStatus(true)
        
        const requestBody = {
            username: email,
        };

        mutateCodeRequestToChange(requestBody,{
            onSuccess: (data) => {
                setLoadingStatus(false)
                setShowPopupType('confirmEmail')
                setCodeRemainingTimeEmail(data.data.remainTimeSpanInSeconds)
                toast('کد تایید برای شما ارسال شد', {
                    type: 'success',
                    position: 'top-right',
                    autoClose: 5000,
                    theme: appTheme,
                    style: { width: "90%" }
                });
            },
            onError: (err) => {
                setLoadingStatus(false)
                toast(err.response.data.ErrorMessages[0].ErrorMessage, {
                    type: 'error', 
                    position: 'top-right', 
                    autoClose: 5000,
                    theme: appTheme,
                    style: { width: "90%" }
                });
            }
        })
    }

    const changePhoneNumberPopUp = async(e) => {

        if (!phoneNumber) { 
            toast('شماره تلفن خود را وارد کنید ', {
                type: 'error', 
                position: 'top-right', 
                autoClose: 5000,
                theme: appTheme,
                style: { width: "90%" }
            });
            return;
        }


        setLoadingStatus(true)
        
        const requestBody = {
            username: phoneNumber,
        };

        console.log(requestBody)

        mutateCodeRequestToChange(requestBody,{
            onSuccess: (data) => {
                setLoadingStatus(false)
                setShowPopupType('confirmPhone')
                setCodeRemainingTimePhone(data.data.remainTimeSpanInSeconds)
                toast('کد تایید برای شما ارسال شد', {
                    type: 'success',
                    position: 'top-right',
                    autoClose: 5000,
                    theme: appTheme,
                    style: { width: "90%" }
                });
            },
            onError: (err) => {
                setLoadingStatus(false)
                toast(err.response.data.ErrorMessages[0].ErrorMessage, {
                    type: 'error', 
                    position: 'top-right', 
                    autoClose: 5000,
                    theme: appTheme,
                    style: { width: "90%" }
                });
            }
        })
    }



    const handleFinalEmailSubmission = () => {
        
        if(emailCode.length !== emailCodeLength) {
            toast('کد تایید باید ۶ رقمی باشد', {
                type: 'error',
                position: 'top-right',
                autoClose: 5000,
                theme: appTheme,
                style: { width: "90%" }
            });
            return;
        }

        setLoadingStatus(true)

        const requestBody = {
            email: email,
            code: emailCode
        }

        mutateChangeEmail(requestBody, {
            onSuccess: (data) => {
                setLoadingStatus(false)
                setShowPopupType('')
                toast('ایمیل شما با موفقیت تغییر یافت', {
                    type: 'success',
                    position: 'top-right',
                    autoClose: 5000,
                    theme: appTheme,
                    style: { width: "90%" }
                });
            },
            onError: (err) => {
                setLoadingStatus(false)
                setShowPopupType('')
                toast(err.response.data.ErrorMessages[0].ErrorMessage, {
                    type: 'error',
                    position: 'top-right',  
                    autoClose: 5000,
                    theme: appTheme,
                    style: { width: "90%" }
                });
            }
        })
    }

    if(userData && userData.data) return (
        <div className='w-full flex flex-col'>
            <div className='flex flex-col w-full space-y-4 items-center md:grid md:grid-cols-2 md:gap-6 md:space-y-0'>

                <FixedInput textData={userData.data.firstName} />
                <FixedInput textData={userData.data.lastName} />
                <InputWithButton isForPhone={true} Type={'number'} icon={<PhoneIcon/>} onSubmit={changePhoneNumberPopUp} buttonText={'تغییر'} placeH={userData.data.phoneNumber} value={phoneNumber} onChange={changePhoneNumberHandler} />
                <InputWithButton Type={'text'} icon={<MailIcon />} onSubmit={changeEmailPopUp} buttonText={'تغییر'} placeH={userData.data.email} onChange={changeEmailHandler} />

            </div>
            <button type="submit" className={`${ButtonStyles.normalButton} w-[170px] self-center mt-4`} 
            onClick={() => setShowPopupType('changePassword')}>
                تغییر رمز عبور
            </button>
            
            <ChangePicPopUp showPopup={showPopupType === 'changePicture'} setShowPopup={setShowPopupType} />

            <PhoneVerificationCode handleResendCode={changePhoneNumberPopUp}  isLoading={LoadingStatus} showPopup={showPopupType === 'confirmPhone'} setShowPopup={setShowPopupType} codeRemainingTime={codeRemainingTimePhone} code={phoneNumberCode} setCode={setPhoneNumberCode}
            handleFinalSubmit={handleFinalPhoneSubmission} codeLength={phoneNumberCodeLength} />

            <PhoneVerificationCode handleResendCode={changeEmailPopUp} isLoading={LoadingStatus} showPopup={showPopupType === 'confirmEmail'} setShowPopup={setShowPopupType} codeRemainingTime={codeRemainingTimeEmail} code={emailCode} setCode={setEmailCode}
            handleFinalSubmit={handleFinalEmailSubmission} codeLength={emailCodeLength} isForEmail={true} />

            <ChangePasswordPopUp showPopUp={showPopupType === 'changePassword'} setShowPopUp={setShowPopupType} />
        </div>
    );
};

export default EditUserSettings;