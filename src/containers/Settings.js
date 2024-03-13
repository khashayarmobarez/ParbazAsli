import React, { useState } from 'react';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { selectSettings, setPassword1, setPassword2 } from '../Utilities/ReduxToolKit/features/SettingsData/settingsSlice';

// components
import PageTitle from '../components/reuseable/PageTitle';
import DropDownLine from '../components/reuseable/DropDownLine';
import WebColorMode from '../components/pages/Settings/WebColorMode';
import FixedInput from '../components/inputs/FixedInput';
import PasswordInput from '../components/inputs/PasswordInput';

// assets
import SettIcon from '../assets/icons/Icon-settings.svg'
import userIcon from '../assets/icons/user-Icon.svg'
import certificateIcon from '../assets/icons/certificate-Vector.svg'
import moneyIcon from '../assets/icons/money-Icon.svg'
import usersIcon from '../assets/icons/users-Icon.svg'

const Settings = () => {

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

                <div className='w-[90%] flex flex-col items-center gap-y-2'>
                    <DropDownLine  title='مود و ظاهر' icon={SettIcon} dropDown={DropDown} isActive={DropDown === 'dropDown1'} onClick={() => setDropDown(DropDown === 'dropDown1' ? '' : 'dropDown1')} />
                    {
                        DropDown === 'dropDown1' &&
                        <WebColorMode />
                    }
                </div>

                <div className='w-[90%] flex flex-col items-center gap-y-2'>
                    <DropDownLine  title='شخصی' icon={userIcon} dropDown={DropDown} isActive={DropDown === 'dropDown2'} onClick={() => setDropDown(DropDown === 'dropDown2' ? '' : 'dropDown2')} />
                    {
                        DropDown === 'dropDown2' &&
                        <div className='flex flex-col w-full space-y-4'>
                            <FixedInput test={'محمود'} />
                            <FixedInput test={'شیرازی‌نیا'} />
                            <FixedInput test={'کد ملی'} />
                            <PasswordInput placeHolder={'رمز عبور جدید را وارد کنید'} value={password1} onChange={handlePassword1Change}/>
                            <PasswordInput placeHolder={'رمز عبور جدید را دوباره وارد کنید'} value={password2} onChange={handlePassword2Change}/>
                            {!passwordsMatch() &&
                                <p>Passwords do not match!</p>
                            }
                        </div>
                    }
                </div>

                <div className='w-[90%] flex flex-col items-center gap-y-2'>
                    <DropDownLine  title='گواهینامه‌ها' icon={certificateIcon} dropDown={DropDown} isActive={DropDown === 'dropDown3'} onClick={() => setDropDown(DropDown === 'dropDown3' ? '' : 'dropDown3')} />
                    {
                        DropDown === 'dropDown3' &&
                        <div>
                            <p>DropDown!</p>
                        </div>
                    }
                </div>

                <div className='w-[90%] flex flex-col items-center gap-y-2'>
                    <DropDownLine  title='تغییر مربی' icon={moneyIcon} dropDown={DropDown} isActive={DropDown === 'dropDown4'} onClick={() => setDropDown(DropDown === 'dropDown4' ? '' : 'dropDown4')} />
                    {
                        DropDown === 'dropDown4' &&
                        <div>
                            <p>DropDown!</p>
                        </div>
                    }
                </div>

                <div className='w-[90%] flex flex-col items-center gap-y-2'>
                    <DropDownLine  title='ثبت باشگاه' icon={usersIcon} dropDown={DropDown} isActive={DropDown === 'dropDown5'} onClick={() => setDropDown(DropDown === 'dropDown5' ? '' : 'dropDown5')} />
                    {
                        DropDown === 'dropDown5' &&
                        <div>
                            <p>DropDown!</p>
                        </div>
                    }
                </div>
                    

            </div>
        </div>
    );
};

export default Settings;