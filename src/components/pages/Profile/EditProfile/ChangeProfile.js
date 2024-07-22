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

const ChangeProfile = () => {

    const { data: userData, isLoading:userDataLoading, error:userDataError } = useUserData();

    useEffect(() => {
        if(userData) {
            console.log(userData)
        }
    })

    const { fullName } = userData.data;

    // popUp use state
    const [showPopup, setShowPopup] = useState(false);
    const [showPicturePopup, setShowPicturePopup] = useState(false);

    // redux
    const dispatch = useDispatch();
    const { password1, password2 } = useSelector(selectSettings );

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

    //    Event handler for form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        setShowPopup(true);
        // Here you can handle form submission, such as sending data to a backend server
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
                <div onClick={() => setShowPicturePopup(true)} className='w-[99px] h-[99px] flex flex-col items-center justify-center' >
                    <Avatar alt={userData.data.fullName} src={userData.data.image?.path ? userData.data.image.path : '/'} sx={{height:'99px', width:'100px', zIndex:'0'}}/>
                    <div className='w-[105px] h-[105px] mt-[-99px] z-10 rounded-full' style={{border: '2px solid var(--yellow-text)',}}></div>
                    <img className=' w-7 absolute mt-20 ml-16 z-20' src={YellowPlus} alt='icon' />
                </div>
                {
                    userData &&
                    <div className='flex flex-col w-full space-y-6 items-center md:grid md:grid-cols-2 md:gap-6 md:space-y-0'>
                        <FixedInput textData={fullName} />
                        {/* <FixedInput test={'شیرازی‌نیا'} /> */}
                        <InputWithButton Type={'number'} icon={phone} buttonText={'دریافت کد'} placeH={'24** *** 0912'} />
                        <PasswordInput placeHolder={'رمز عبور جدید را وارد کنید'} value={password1} onChange={handlePassword1Change}/>
                        <PasswordInput placeHolder={'رمز عبور جدید را دوباره وارد کنید'} value={password2} onChange={handlePassword2Change}/>
                        {!passwordsMatch() &&
                            <p>Passwords do not match!</p>
                        }
                        <InputWithButton Type={'text'} icon={mail} buttonText={'تایید'} placeH={'example@gmail.com'} />
                        <div className='md:col-span-2 md:flex md:justify-center'>
                            <button type='submit' onClick={handleSubmit} className={`${ButtonStyles.addButton} w-36`}>ثبت </button> 
                        </div>
                    </div>
                }
                

                {/* submit pop up */}
                <VerificationCodeInput showPopup={showPopup} setShowPopup={setShowPopup} />

            </>
            }
        </div>
    );
};

export default ChangeProfile;