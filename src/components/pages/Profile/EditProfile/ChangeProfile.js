import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

// styles
import ButtonStyles from '../../../../styles/Buttons/ButtonsBox.module.css'
import boxStyles from '../../../../styles/Boxes/DataBox.module.css'

// mui
import CloseIcon from '@mui/icons-material/Close';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { selectSettings, setPassword1, setPassword2 } from '../../../../Utilities/ReduxToolKit/features/SettingsData/settingsSlice';
import { selectAuthSettings } from '../../../../Utilities/ReduxToolKit/features/AuthenticationData/AuthenticationSlice';

// queries 
import { useChangePhoneNumber, useSendVerificattionCodeToChangePhoneNumber, useUserData } from '../../../../Utilities/Services/userQueries';

// mui
import { Avatar } from '@mui/material';

// assets
import phoneIcon from '../../../../assets/icons/phone-Icon (Stroke).svg';
import mail from '../../../../assets/icons/mail-Icon (Stroke).svg';
import YellowPlus from '../../../../assets/icons/yellowPlus.svg'

// components
import FixedInput from '../../../inputs/FixedInput';
import PasswordInput from '../../../inputs/PasswordInput';
import InputWithButton from '../../../inputs/InputWithButton';
import VerificationCodeInput from '../../../reuseable/VerificationCodeInput';
import ChangePicPopUp from './ChangePicPopUp';
import PhoneVerificationCode from '../../authentication/popUps/PhoneVerificationCode';

const ChangeProfile = () => {

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

    // popUp use state
    const [showPopupType, setShowPopupType] = useState('');
    const [LoadingStatus, setLoadingStatus] = useState(false);
    const [codeRemainingTime, setCodeRemainingTime] = useState(null)
    const [phoneNumberCode, setPhoneNumberCode] = useState('')
    // phoneNumber states
    const [phoneNumber, setPhoneNumber] = useState('')
    
    // redux states
    const dispatch = useDispatch();
    const { password1, password2 } = useSelector(selectSettings);
    
    // queries
    const { data: userData, isLoading:userDataLoading, error:userDataError } = useUserData();
    const { mutate: mutateCodeRequestForPhone} = useSendVerificattionCodeToChangePhoneNumber();
    const { mutate: mutateChangePhone } = useChangePhoneNumber();

    const changePhoneNumberHandler = (e) => {
        setPhoneNumber(e.target.value)
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
            type: 1
        };

        console.log(requestBody)

        mutateCodeRequestForPhone(requestBody,{
            onSuccess: (data) => {
                setLoadingStatus(false)
                setShowPopupType('confirmPhone')
                setCodeRemainingTime(data.data.remainTimeSpanInSeconds)
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



    const changeEmailPopUp = () => {
        toast('در حال توسعه', {
            type: 'error',
            position: 'top-right',
            autoClose: 5000,
            theme: 'dark',
            style: { width: "90%" }
        });
    }

    const handlePassword1Change = (event) => {
        dispatch(setPassword1(event.target.value));
    };

    const handlePassword2Change = (event) => {
        dispatch(setPassword2(event.target.value));
    };


    // Function to check if the passwords match
    const passwordsMatch = () => {
        return password1 === password2;
    };

    

    return (
        <div className='w-[90%] flex flex-col items-center gap-y-4'>

            {
                userData && 
                    <>
                        {/* should an onClick be added to this div for changing profile picture */}
                        <div onClick={() => setShowPopupType('changePicture')} className='w-[99px] h-[99px] flex flex-col items-center justify-center' >
                            <Avatar alt={userData.data.firstName} src={userData.data.image?.path ? userData.data.image.path : '/'} sx={{height:'99px', width:'100px', zIndex:'0'}}/>
                            <div className='w-[105px] h-[105px] mt-[-99px] z-10 rounded-full' style={{border: '2px solid var(--yellow-text)',}}></div>
                            <img className=' w-7 absolute mt-20 ml-16 z-20' src={YellowPlus} alt='icon' />
                        </div>
                        {
                            userData && userData.data &&
                            <div className='flex flex-col w-full space-y-6 items-center md:grid md:grid-cols-2 md:gap-6 md:space-y-0'>
                                <FixedInput textData={userData.data.firstName} />
                                <FixedInput textData={userData.data.lastName} />
                                <InputWithButton Type={'number'} icon={phoneIcon} onSubmit={changePhoneNumberPopUp} buttonText={'دریافت کد'} placeH={userData.data.phoneNumber} onChange={changePhoneNumberHandler} />
                                <InputWithButton Type={'text'} icon={mail} onSubmit={changeEmailPopUp} buttonText={'احراز'} placeH={userData.data.email} />
                                <PasswordInput placeHolder={'رمز عبور جدید را وارد کنید'} value={password1} onChange={handlePassword1Change}/>
                                <PasswordInput placeHolder={'رمز عبور جدید را دوباره وارد کنید'} value={password2} onChange={handlePassword2Change}/>
                                {!passwordsMatch() &&
                                    <p>Passwords do not match!</p>
                                }
                            </div>
                        }

                        <ChangePicPopUp showPopup={showPopupType === 'changePicture'} setShowPopup={setShowPopupType} />

                        <PhoneVerificationCode isLoading={LoadingStatus} showPopup={showPopupType === 'confirmPhone'} setShowPopup={setShowPopupType} codeRemainingTime={codeRemainingTime} code={phoneNumberCode} setCode={setPhoneNumberCode}
                        handleFinalSubmit={handleFinalPhoneSubmission} codeLength={phoneNumberCodeLength} />

                    </>
            }
        </div>
    );
};

export default ChangeProfile;