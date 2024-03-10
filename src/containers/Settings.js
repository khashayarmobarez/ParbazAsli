import React, { useState } from 'react';

// componets
import PageTitle from '../components/reuseable/PageTitle';
import DropDownLine from '../components/reuseable/DropDownLine';

// assets
import SettIcon from '../assets/icons/Icon-settings.svg'
import userIcon from '../assets/icons/user-Icon.svg'
import certificateIcon from '../assets/icons/certificate-Vector.svg'
import moneyIcon from '../assets/icons/money-Icon.svg'
import usersIcon from '../assets/icons/users-Icon.svg'

const Settings = () => {

    const [DropDown, setDropDown] = useState('')

    return (
        <div className='flex flex-col py-14 justify-center items-center w-full gap-y-8'>
            
            <PageTitle title={'تنظیمات'} navigateTo={'/profile'} paddingRight={'40%'} /> 

            <div className='w-[90%] flex flex-col items-center'>
                <DropDownLine  title='مود و ظاهر' icon={SettIcon} dropDown={DropDown} isActive={DropDown === 'dropDown1'} onClick={() => setDropDown(DropDown === 'dropDown1' ? '' : 'dropDown1')} />
                {
                    DropDown === 'dropDown1' &&
                    <div>
                        <p>DropDown!</p>
                    </div>
                }
            </div>

            <div className='w-[90%] flex flex-col items-center'>
                <DropDownLine  title='شخصی' icon={userIcon} dropDown={DropDown} isActive={DropDown === 'dropDown2'} onClick={() => setDropDown(DropDown === 'dropDown2' ? '' : 'dropDown2')} />
                {
                    DropDown === 'dropDown2' &&
                    <div>
                        <p>DropDown!</p>
                    </div>
                }
            </div>

            <div className='w-[90%] flex flex-col items-center'>
                <DropDownLine  title='گواهینامه‌ها' icon={certificateIcon} dropDown={DropDown} isActive={DropDown === 'dropDown3'} onClick={() => setDropDown(DropDown === 'dropDown3' ? '' : 'dropDown3')} />
                {
                    DropDown === 'dropDown3' &&
                    <div>
                        <p>DropDown!</p>
                    </div>
                }
            </div>

            <div className='w-[90%] flex flex-col items-center'>
                <DropDownLine  title='تغییر مربی' icon={moneyIcon} dropDown={DropDown} isActive={DropDown === 'dropDown4'} onClick={() => setDropDown(DropDown === 'dropDown4' ? '' : 'dropDown4')} />
                {
                    DropDown === 'dropDown4' &&
                    <div>
                        <p>DropDown!</p>
                    </div>
                }
            </div>

            <div className='w-[90%] flex flex-col items-center'>
                <DropDownLine  title='ثبت باشگاه' icon={usersIcon} dropDown={DropDown} isActive={DropDown === 'dropDown5'} onClick={() => setDropDown(DropDown === 'dropDown5' ? '' : 'dropDown5')} />
                {
                    DropDown === 'dropDown5' &&
                    <div>
                        <p>DropDown!</p>
                    </div>
                }
            </div>
                

        </div>
    );
};

export default Settings;