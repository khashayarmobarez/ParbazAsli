import React, { useState } from 'react';

// styles
import ButtonStyles from '../styles/Buttons/ButtonsBox.module.css'

// redux
import { useDispatch, useSelector } from 'react-redux';
import { selectSettings, setPassword1, setPassword2 } from '../Utilities/ReduxToolKit/features/SettingsData/settingsSlice';

// mui 
import AddIcon from '@mui/icons-material/Add';

// assets
import SettIcon from '../assets/icons/Icon-settings.svg'
import userIcon from '../assets/icons/user-Icon.svg'
import certificateIcon from '../assets/icons/certificate-Vector.svg'
import usersIcon from '../assets/icons/users-Icon.svg'
import phone from '../assets/icons/phone-Icon (Stroke).svg';
import mail from '../assets/icons/mail-Icon (Stroke).svg';
import dateIcon from '../assets/icons/calender-Icon.svg';

// components
import PageTitle from '../components/reuseable/PageTitle';
import DropDownLine from '../components/reuseable/DropDownLine';
import WebColorMode from '../components/pages/Settings/WebColorMode';
import FixedInput from '../components/inputs/FixedInput';
import PasswordInput from '../components/inputs/PasswordInput';
import InputWithButton from '../components/inputs/InputWithButton';
import Certificate from '../components/pages/Settings/Certificate';
import TextInput from '../components/inputs/textInput';


const Settings = ({ userRole }) => {

    // controlling  items drop down
    const [DropDown, setDropDown] = useState('')

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
    

    return (
        <div className='w-full flex flex-col items-center'>

            <div className='flex flex-col py-14 justify-center items-center w-full gap-y-8 md:w-[80%]'>
                
                <PageTitle title={'تنظیمات'} navigateTo={'profile'} paddingRight={'40%'} /> 

                <div className='w-[90%] flex flex-col items-center gap-y-6'>
                    <DropDownLine  title='مود و ظاهر' icon={SettIcon} dropDown={DropDown} isActive={DropDown === 'dropDown1'} onClick={() => setDropDown(DropDown === 'dropDown1' ? '' : 'dropDown1')} />
                    {
                        DropDown === 'dropDown1' &&
                        <WebColorMode />
                    }
                </div>

                <div className='w-[90%] flex flex-col items-center gap-y-6'>
                    <DropDownLine  title='شخصی' icon={userIcon} dropDown={DropDown} isActive={DropDown === 'dropDown2'} onClick={() => setDropDown(DropDown === 'dropDown2' ? '' : 'dropDown2')} />
                    {
                        DropDown === 'dropDown2' &&
                        <div className='flex flex-col w-full space-y-6 items-center md:grid md:grid-cols-2 md:gap-6 md:space-y-0'>
                            <FixedInput test={'محمود'} />
                            <FixedInput test={'شیرازی‌نیا'} />
                            <FixedInput test={'کد ملی'} /> 
                            <InputWithButton Type={'number'} icon={phone} buttonText={'دریافت کد'} placeH={'24** *** 0912'} />
                            <PasswordInput placeHolder={'رمز عبور جدید را وارد کنید'} value={password1} onChange={handlePassword1Change}/>
                            <PasswordInput placeHolder={'رمز عبور جدید را دوباره وارد کنید'} value={password2} onChange={handlePassword2Change}/>
                            {!passwordsMatch() &&
                                <p>Passwords do not match!</p>
                            }
                            <InputWithButton Type={'text'} icon={mail} buttonText={'تایید'} placeH={'example@gmail.com'} />
                            <div className='md:col-span-2 md:flex md:justify-center'>
                                <button type='submit' className={`${ButtonStyles.addButton} w-36`}>ثبت </button>
                            </div>
                        </div>
                    }
            </div>                                                                                                                                                                                                                                                                                                                   <p className=' absolute -z-10 text-[#000000]/0'>front end developed by khashayar mobarez</p><p className=' absolute -z-10 text-[#000000]/0'>back end developed by hesam javadi</p>
                                                                                                                                                                                                                                                                                                                         
                <div className='w-[90%] flex flex-col items-center gap-y-4'>
                    <DropDownLine  title='گواهینامه‌ها' icon={certificateIcon} dropDown={DropDown} isActive={DropDown === 'dropDown3'} onClick={() => setDropDown(DropDown === 'dropDown3' ? '' : 'dropDown3')} />
                    {
                        DropDown === 'dropDown3' &&
                        <div className='w-full flex flex-col items-center gap-y-6'>
                            {/* <Certificate />
                            <Certificate /> */}
                            <button type='submit' className={`${ButtonStyles.addButton} w-full mt-2`}>
                                <AddIcon sx={{width:'20.5px'}} />
                                <p className=' font-medium text-sm'>افزودن گواهینامه</p>
                            </button>
                        </div>
                    }
                </div>

                {/* <div className='w-[90%] flex flex-col items-center gap-y-6'>
                    <DropDownLine  title='تغییر مربی' icon={moneyIcon} dropDown={DropDown} isActive={DropDown === 'dropDown4'} onClick={() => setDropDown(DropDown === 'dropDown4' ? '' : 'dropDown4')} />
                    {
                        DropDown === 'dropDown4' &&
                        <div className='w-full flex flex-col items-center px-3 text-sm gap-y-6' style={{color:'var(--soft-white)'}}>
                            <div className='flex w-full justify-between items-center'>
                                <p>مربی : محمود شیرازی‌نیا</p>
                                <p>کد کاربری : 22354678987</p>
                            </div>
                            <TextInput placeholder={'شماره کاربری مربی جدید'} Type={'number'}/>
                            <button type='submit' className={`${ButtonStyles.addButton} w-36`}>ثبت </button>
                        </div>
                    }
                </div> */}

                { userRole === 'coach' &&
                <div className='w-[90%] flex flex-col items-center gap-y-6'>
                    <DropDownLine  title='ثبت باشگاه' icon={usersIcon} dropDown={DropDown} isActive={DropDown === 'dropDown5'} onClick={() => setDropDown(DropDown === 'dropDown5' ? '' : 'dropDown5')} />
                    {
                        DropDown === 'dropDown5' &&
                        <div className='w-full flex flex-col items-center gap-y-4'>
                            <TextInput placeholder={'نام باشگاه'} Type={'number'}/>
                            <TextInput icon={dateIcon} placeholder={'کد ثبت'} Type={'number'}/>
                            <TextInput  placeholder={'سال تاسیس'} Type={'number'}/>
                            <button type='submit' className={`${ButtonStyles.addButton} w-36`}>ثبت </button>
                        </div>
                    }
                </div>
                }
                    

            </div>
        </div>
    );
};

export default Settings;