import React, { useState } from 'react';

// styles
import ButtonStyles from '../styles/Buttons/ButtonsBox.module.css'

// assets
import SettIcon from '../assets/icons/Icon-settings.svg'
import userIcon from '../assets/icons/user-Icon.svg'
import certificateIcon from '../assets/icons/certificate-Vector.svg'
import usersIcon from '../assets/icons/users-Icon.svg'

// queries
import { useClubStatus } from '../Utilities/Services/clubQueries';

// components
import PageTitle from '../components/reuseable/PageTitle';
import DropDownLine from '../components/reuseable/DropDownLine';
import WebColorMode from '../components/pages/Settings/WebColorMode';
import EditUserSettings from '../components/pages/Settings/EditUserSettings';
import CertificateSettings from '../components/pages/Settings/CertificateSettings';
import AddClub from '../components/pages/Club/AddClub';


const Settings = () => {

    
    // controlling  items drop down
    const [DropDown, setDropDown] = useState(['dropDown2']);

    // clubstatus could be NotAdded, Pending, Accepted
    const { data: clubStatus , loading: clubStatusLoading } = useClubStatus();

    const handleOpenDropDowns = (dropDown) => {
        
        !DropDown.includes(dropDown) && setDropDown([...DropDown,dropDown])
        DropDown.includes(dropDown) && setDropDown(DropDown.filter(item => item !== dropDown))

    }

    

    return (
        <div className='w-full flex flex-col items-center'>

            <div className='flex flex-col py-14 justify-center items-center w-full gap-y-8 md:w-[80%]'>
                
                <PageTitle title={'تنظیمات'} navigateTo={'profile'} paddingRight={'40%'} /> 

                <div className='w-[90%] flex flex-col items-center gap-y-6'>
                    <DropDownLine  title='شخصی' icon={userIcon} dropDown={DropDown} isActive={DropDown.includes('dropDown2')} onClickActivation={() => handleOpenDropDowns('dropDown2')} />
                    {
                        DropDown.includes('dropDown2') &&
                            <EditUserSettings />
                    }
                </div>                                                                                                                                                                                                                                                                                                                   <p className=' absolute -z-10 text-[#000000]/0'>front end developed by khashayar mobarez</p><p className=' absolute -z-10 text-[#000000]/0'>back end developed by hesam javadi</p>
                                                                                                                                                                                                                                                                                                                         
                <div className='w-[90%] flex flex-col items-center gap-y-4'>
                    <DropDownLine title='گواهینامه‌ها' icon={certificateIcon} dropDown={DropDown} isActive={DropDown.includes('dropDown3')} onClickActivation={() => handleOpenDropDowns('dropDown3')} />
                    {
                        DropDown.includes('dropDown3') &&
                        <div className='w-full flex flex-col items-center gap-y-6'>
                            <CertificateSettings />
                        </div>
                    }
                </div>

                {/* <div className='w-[90%] flex flex-col items-center gap-y-6'>
                    <DropDownLine  title='تغییر مربی' icon={moneyIcon} dropDown={DropDown} isActive={DropDown === 'dropDown4'} onClickActivation={() => setDropDown(DropDown === 'dropDown4' ? '' : 'dropDown4')} />
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

                {   clubStatus &&
                    clubStatus.data === 'NotAdded' &&
                    <div className='w-[90%] flex flex-col items-center'>
                        <DropDownLine  title='ثبت باشگاه' icon={usersIcon} dropDown={DropDown} isActive={DropDown.includes('dropDown5')} onClickActivation={() => handleOpenDropDowns('dropDown5')} />
                        {   
                            DropDown.includes('dropDown5') &&
                            <>
                                {
                                    clubStatus.data === 'NotAdded' ?
                                    <AddClub isForSetting={true} />
                                    :
                                    ''
                                }
                            </>
                        }
                    </div>
                }

                
                <div className='w-[90%] flex flex-col items-center gap-y-6'>
                    <DropDownLine  title='مود و ظاهر' icon={SettIcon} dropDown={DropDown} isActive={DropDown.includes('dropDown1')} onClickActivation={() => handleOpenDropDowns('dropDown1')} />
                    {
                        DropDown.includes('dropDown1') &&
                        <WebColorMode />
                    }
                </div>
                    

            </div>
        </div>
    );
};

export default Settings;