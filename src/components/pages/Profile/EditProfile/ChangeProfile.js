import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

// styles
import ButtonStyles from '../../../../styles/Buttons/ButtonsBox.module.css'

// redux
import { useDispatch, useSelector } from 'react-redux';
import { selectSettings, setPassword1, setPassword2 } from '../../../../Utilities/ReduxToolKit/features/SettingsData/settingsSlice';
import { selectAuthSettings } from '../../../../Utilities/ReduxToolKit/features/AuthenticationData/AuthenticationSlice';

// queries 
import { useChangeEmail, useChangePhoneNumber, useSendVerificattionCodeToChange, useUserData } from '../../../../Utilities/Services/userQueries';

// mui
import { Avatar } from '@mui/material';

// assets
import phoneIcon from '../../../../assets/icons/phone-Icon (Stroke).svg';
import mail from '../../../../assets/icons/mail-Icon (Stroke).svg';
import YellowPlus from '../../../../assets/icons/yellowPlus.svg'

// components
import FixedInput from '../../../inputs/FixedInput';
import InputWithButton from '../../../inputs/InputWithButton';
import ChangePicPopUp from './ChangePicPopUp';
import PhoneVerificationCode from '../../authentication/popUps/PhoneVerificationCode';
import ChangePasswordPopUp from './ChangePasswordPopUp';

const ChangeProfile = () => {

    const authSettings = useSelector(selectAuthSettings);
    const {
        loading,
        error
    } = authSettings;
    const {
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
    const { mutate: mutateChangePhone, isLoading: phoneNumLoading } = useChangePhoneNumber();
    const { mutate: mutateChangeEmail, isLoading: emailLoading } = useChangeEmail();

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


    // function to reduce the remaining time every second on codeRemainingTimePhone
    useEffect(() => {
        if (codeRemainingTimePhone > 0) {
            const timer = setInterval(() => {
                setCodeRemainingTimePhone(prevTime => prevTime - 1);
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [codeRemainingTimePhone]);


    // function to reduce the remaining time every second on codeRemainingTimeEmail
    useEffect(() => {
        if (codeRemainingTimeEmail > 0) {
            const timer = setInterval(() => {
                setCodeRemainingTimeEmail(prevTime => prevTime - 1);
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [codeRemainingTimeEmail]);



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

        // Check if the phone number contains only numbers
        if (!/^\d+$/.test(phoneNumber)) {
            toast('شماره تلفن فقط باید شامل اعداد باشد', {
                type: 'error',
                position: 'top-right',
                autoClose: 5000,
                theme: 'dark',
                style: { width: "90%" }
            });
            return;
        }

        // Check if the phone number is less than 10 digits
        if (phoneNumber.length < 10) {
            toast('شماره تلفن نباید کمتر از 10 رقم باشد', {
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
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
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
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
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


    

    return (
        <div className='w-[90%] flex flex-col items-center gap-y-4'>

            {
                userData && 
                    <>
                        {/* should an onClick be added to this div for changing profile picture */}
                        <div onClick={() => setShowPopupType('changePicture')} className='w-[99px] h-[99px] flex flex-col items-center justify-center' >
                            <Avatar alt={userData.data.firstName} src={userData.data.image?.path ? userData.data.image.path : '/'} sx={{height:'98px', width:'98px', zIndex:'0'}}/>
                            <div className='w-[105px] h-[105px] mt-[-99px]  rounded-full' style={{border: '2px solid var(--yellow-text)',}}></div>
                            <img className=' w-7 absolute mt-20 ml-16 ' src={YellowPlus} alt='icon' />
                        </div>
                        {
                            userData && userData.data &&
                            <div className='flex flex-col w-full space-y-6 items-center md:grid md:grid-cols-2 md:gap-6 md:space-y-0'>
                                <FixedInput textData={userData.data.firstName} />
                                <FixedInput textData={userData.data.lastName} />
                                <InputWithButton isLoading={phoneNumLoading} isForPhone={true} Type={'number'} icon={phoneIcon} onSubmit={changePhoneNumberPopUp} buttonText={'تغییر'} placeH={userData.data.phoneNumber} value={phoneNumber} onChange={changePhoneNumberHandler} />
                                <InputWithButton isLoading={emailLoading} Type={'text'} icon={mail} onSubmit={changeEmailPopUp} buttonText={'تغییر'} placeH={userData.data.email} onChange={changeEmailHandler} />

                                <button type="submit" className={`${ButtonStyles.normalButton} w-24 self-center mt-4`} 
                                onClick={() => setShowPopupType('changePassword')}>
                                    تغییر رمز عبور
                                </button>

                            </div>
                        }
                        

                        <ChangePicPopUp showPopup={showPopupType === 'changePicture'} setShowPopup={setShowPopupType} />

                        <PhoneVerificationCode handleResendCode={changePhoneNumberPopUp} isLoading={LoadingStatus} showPopup={showPopupType === 'confirmPhone'} setShowPopup={setShowPopupType} codeRemainingTime={codeRemainingTimePhone} code={phoneNumberCode} setCode={setPhoneNumberCode}
                        handleFinalSubmit={handleFinalPhoneSubmission} codeLength={phoneNumberCodeLength} />

                        <PhoneVerificationCode handleResendCode={changeEmailPopUp} isLoading={LoadingStatus} showPopup={showPopupType === 'confirmEmail'} setShowPopup={setShowPopupType} codeRemainingTime={codeRemainingTimeEmail} code={emailCode} setCode={setEmailCode}
                        handleFinalSubmit={handleFinalEmailSubmission} codeLength={emailCodeLength}  />

                        <ChangePasswordPopUp showPopUp={showPopupType === 'changePassword'} setShowPopUp={setShowPopupType} />

                    </>
            }
        </div>
    );
};

export default ChangeProfile;