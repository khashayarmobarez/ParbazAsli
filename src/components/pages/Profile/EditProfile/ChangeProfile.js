import React, { useEffect, useState } from 'react';

// styles
import ButtonStyles from '../../../../styles/Buttons/ButtonsBox.module.css'
import boxStyles from '../../../../styles/Boxes/DataBox.module.css'

// mui
import CloseIcon from '@mui/icons-material/Close';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { selectSettings, setPassword1, setPassword2 } from '../../../../Utilities/ReduxToolKit/features/SettingsData/settingsSlice';

// queries 
import { useUserDetails } from '../../../../Utilities/Services/queries';

// mui
import { Avatar } from '@mui/material';

// assets
import phone from '../../../../assets/icons/phone-Icon (Stroke).svg';
import mail from '../../../../assets/icons/mail-Icon (Stroke).svg';
import YellowPlus from '../../../../assets/icons/yellowPlus.svg'

// components
import { useUserData } from '../../../../Utilities/Services/userQueries';

// components
import FixedInput from '../../../inputs/FixedInput';
import PasswordInput from '../../../inputs/PasswordInput';
import InputWithButton from '../../../inputs/InputWithButton';
import VerificationCodeInput from '../../../reuseable/VerificationCodeInput';
import ChangePicPopUp from './ChangePicPopUp';
import { toast } from 'react-toastify';
import axios from 'axios';

const ChangeProfile = () => {

    // popUp use state
    const [showPopupType, setShowPopupType] = useState(false);
    const [LoadingStatus, setLoadingStatus] = useState(false);
    const [codeRemainingTime, setCodeRemainingTime] = useState(null)
    // phoneNumber states
    const [phoneNumber, setPhoneNumber] = useState('')
    
    // redux states
    const dispatch = useDispatch();
    const { password1, password2 } = useSelector(selectSettings);
    
    // queries
    const { data: userData, isLoading:userDataLoading, error:userDataError } = useUserData();


    const changePhoneNumber = async(e) => {

        e.preventDefault();
        // if (!phoneNumber) { 
        //     setErrMsg("اول فرم را کامل نموده و با قوانین موافقت کنید, سپس تایید را بزنید");
        //     return;
        // }
        toast('در حال توسعه', {
            type: 'error',
            position: 'top-right',
            autoClose: 5000,
            theme: 'dark',
            style: { width: "90%" }
        });

        try {

            setLoadingStatus(true)
            
            const requestBody = {
                username: phone,
                type: 1
            };

            console.log(requestBody)
    
            // Send a POST request to the endpoint with the specified body
            const response = await axios.post(
                'https://api.par-baz.ir/api/Auth/SendVerificationCode',
                requestBody
            );
    
            // Check if the request was successful
            if (response.data.isSuccess) {
                setLoadingStatus(false)
                // Handle the response data
                setCodeRemainingTime(response.data.data.remainTimeSpanInSeconds)
                setShowPopupType('')
                // Update UI or perform any additional actions based on the response
            } else {
                setLoadingStatus(false)
                console.error('Failed to send phone number code');
                // Handle other scenarios if needed
            }
        } catch (err) {
            // Handle errors
            if (!err?.response) {
                setLoadingStatus(false)
                setShowPopupType('')
                toast('مشکلی رخ داده, دوباره تلاش کنید', {
                    type: 'error', 
                    position: 'top-right', 
                    autoClose: 5000,
                    theme: 'dark',
                    style: { width: "90%" }
                });
            } else if (err.response?.status === 409) {
                setLoadingStatus(false)
                setShowPopupType('')
                toast('شماره تلفن قبلا استفاده شده', {
                    type: 'error', 
                    position: 'top-right', 
                    autoClose: 5000,
                    theme: 'dark',
                    style: { width: "90%" }
                });
            } else {
                setLoadingStatus(false)
                toast(err.response.data.ErrorMessages[0].ErrorMessage, {
                    type: 'error', 
                    position: 'top-right', 
                    autoClose: 5000,
                    theme: 'dark',
                    style: { width: "90%" }
                });
            }
        }
    }

    const changeEmail = () => {
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

    

    const { data, isLoading, error, isFetching } = useUserDetails();

    return (
        <div className='w-[90%] flex flex-col items-center gap-y-4'>
            {
                isLoading && isFetching && <h2 className=' text-white mt-'>is loading...</h2>
            }

            {
                error && <h3>{error.message}</h3>
            }

            {
                data && 
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
                                <InputWithButton Type={'number'} icon={phone} onSubmit={changePhoneNumber} buttonText={'دریافت کد'} placeH={userData.data.phoneNumber} onChange={phoneNumberChangeHandler} />
                                {!passwordsMatch() &&
                                    <p>Passwords do not match!</p>
                                }
                                <InputWithButton Type={'text'} icon={mail} onSubmit={changeEmail} buttonText={'تایید'} placeH={userData.data.email} />
                                <PasswordInput placeHolder={'رمز عبور جدید را وارد کنید'} value={password1} onChange={handlePassword1Change}/>
                                <PasswordInput placeHolder={'رمز عبور جدید را دوباره وارد کنید'} value={password2} onChange={handlePassword2Change}/>
                            </div>
                        }

                        <ChangePicPopUp showPopup={showPopupType === 'changePicture'} setShowPopup={setShowPopupType} />

                    </>
            }
        </div>
    );
};

export default ChangeProfile;