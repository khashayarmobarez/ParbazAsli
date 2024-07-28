import React, { useState } from 'react';
import { toast } from 'react-toastify';

// styles
import ButtonStyles from '../../../styles/Buttons/ButtonsBox.module.css'

// assets
import phoneIcon from '../../../assets/icons/phone-Icon (Stroke).svg';
import mail from '../../../assets/icons/mail-Icon (Stroke).svg';

// redux
import { useSelector } from 'react-redux';
import { selectAuthSettings } from '../../../Utilities/ReduxToolKit/features/AuthenticationData/AuthenticationSlice';

// queries
import { useChangeEmail, useChangePhoneNumber, useSendVerificattionCodeToChange, useUserData } from '../../../Utilities/Services/userQueries';

// components
import FixedInput from '../../inputs/FixedInput';
import InputWithButton from '../../inputs/InputWithButton';
import ChangePicPopUp from '../Profile/EditProfile/ChangePicPopUp';
import PhoneVerificationCode from '../authentication/popUps/PhoneVerificationCode';
import ChangePasswordPopUp from '../Profile/EditProfile/ChangePasswordPopUp';

const EditUserSettings = () => {

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
                theme: 'dark',
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
                    theme: 'dark',
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
                    theme: 'dark',
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
                theme: 'dark',
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
                    theme: 'dark',
                    style: { width: "90%" }
                });
            },
            onError: (err) => {
                setLoadingStatus(false)
                toast(err.response.data.ErrorMessages[0].ErrorMessage, {
                    type: 'error', 
                    position: 'top-right', 
                    autoClose: 5000,
                    theme: 'dark',
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
                theme: 'dark',
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
                    theme: 'dark',
                    style: { width: "90%" }
                });
            },
            onError: (err) => {
                setLoadingStatus(false)
                toast(err.response.data.ErrorMessages[0].ErrorMessage, {
                    type: 'error', 
                    position: 'top-right', 
                    autoClose: 5000,
                    theme: 'dark',
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
                theme: 'dark',
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
                    theme: 'dark',
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
                    theme: 'dark',
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
                <InputWithButton Type={'number'} icon={phoneIcon} onSubmit={changePhoneNumberPopUp} buttonText={'تغییر'} placeH={userData.data.phoneNumber} value={phoneNumber} onChange={changePhoneNumberHandler} />
                <InputWithButton Type={'text'} icon={mail} onSubmit={changeEmailPopUp} buttonText={'تغییر'} placeH={userData.data.email} onChange={changeEmailHandler} />

                <button type="submit" className={`${ButtonStyles.normalButton} w-24 self-center mt-4`} 
                onClick={() => setShowPopupType('changePassword')}>
                    تغییر رمز عبور
                </button>
            </div>
            <ChangePicPopUp showPopup={showPopupType === 'changePicture'} setShowPopup={setShowPopupType} />

            <PhoneVerificationCode isLoading={LoadingStatus} showPopup={showPopupType === 'confirmPhone'} setShowPopup={setShowPopupType} codeRemainingTime={codeRemainingTimePhone} code={phoneNumberCode} setCode={setPhoneNumberCode}
            handleFinalSubmit={handleFinalPhoneSubmission} codeLength={phoneNumberCodeLength} />

            <PhoneVerificationCode isLoading={LoadingStatus} showPopup={showPopupType === 'confirmEmail'} setShowPopup={setShowPopupType} codeRemainingTime={codeRemainingTimeEmail} code={emailCode} setCode={setEmailCode}
            handleFinalSubmit={handleFinalEmailSubmission} codeLength={emailCodeLength} />

            <ChangePasswordPopUp showPopUp={showPopupType === 'changePassword'} setShowPopUp={setShowPopupType} />
        </div>
    );
};

export default EditUserSettings;