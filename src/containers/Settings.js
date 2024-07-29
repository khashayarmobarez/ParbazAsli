import React, { useState } from 'react';

// styles
import ButtonStyles from '../styles/Buttons/ButtonsBox.module.css'

// assets
import SettIcon from '../assets/icons/Icon-settings.svg'
import userIcon from '../assets/icons/user-Icon.svg'
import certificateIcon from '../assets/icons/certificate-Vector.svg'
import usersIcon from '../assets/icons/users-Icon.svg'
import dateIcon from '../assets/icons/calender-Icon.svg';

// queries
import { useClubStatus } from '../Utilities/Services/clubQueries';

// components
import PageTitle from '../components/reuseable/PageTitle';
import DropDownLine from '../components/reuseable/DropDownLine';
import WebColorMode from '../components/pages/Settings/WebColorMode';
import TextInput from '../components/inputs/textInput';
import EditUserSettings from '../components/pages/Settings/EditUserSettings';
import CertificateSettings from '../components/pages/Settings/CertificateSettings';
import AddClub from '../components/pages/Club/AddClub';


const Settings = () => {

    
    // controlling  items drop down
    const [DropDown, setDropDown] = useState('')

    // clubstatus could be NotAdded, Pending, Accepted
    const { data: clubStatus , loading: clubStatusLoading } = useClubStatus();

    

    return (
        <div className='w-full flex flex-col items-center'>

            <div className='flex flex-col py-14 justify-center items-center w-full gap-y-8 md:w-[80%]'>
                
                <PageTitle title={'تنظیمات'} navigateTo={'profile'} paddingRight={'40%'} /> 

                <div className='w-[90%] flex flex-col items-center gap-y-6'>
                    <DropDownLine  title='مود و ظاهر' icon={SettIcon} dropDown={DropDown} isActive={DropDown === 'dropDown1'} onClickActivation={() => setDropDown(DropDown === 'dropDown1' ? '' : 'dropDown1')} />
                    {
                        DropDown === 'dropDown1' &&
                        <WebColorMode />
                    }
                </div>

                <div className='w-[90%] flex flex-col items-center gap-y-6'>
                    <DropDownLine  title='شخصی' icon={userIcon} dropDown={DropDown} isActive={DropDown === 'dropDown2'} onClickActivation={() => setDropDown(DropDown === 'dropDown2' ? '' : 'dropDown2')} />
                    {
                        DropDown === 'dropDown2' &&
                            <EditUserSettings />
                    }
                </div>                                                                                                                                                                                                                                                                                                                   <p className=' absolute -z-10 text-[#000000]/0'>front end developed by khashayar mobarez</p><p className=' absolute -z-10 text-[#000000]/0'>back end developed by hesam javadi</p>
                                                                                                                                                                                                                                                                                                                         
                <div className='w-[90%] flex flex-col items-center gap-y-4'>
                    <DropDownLine  title='گواهینامه‌ها' icon={certificateIcon} dropDown={DropDown} isActive={DropDown === 'dropDown3'} onClickActivation={() => setDropDown(DropDown === 'dropDown3' ? '' : 'dropDown3')} />
                    {
                        DropDown === 'dropDown3' &&
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
                    clubStatus.data === 'Accepted' &&
                        <div className='w-[90%] flex flex-col items-center'>
                            <DropDownLine  title='ثبت باشگاه' icon={usersIcon} dropDown={DropDown} isActive={DropDown === 'dropDown5'} onClickActivation={() => setDropDown(DropDown === 'dropDown5' ? '' : 'dropDown5')} />
                            {   
                                DropDown === 'dropDown5' &&
                                <>
                                    {
                                        clubStatus.data !== 'NotAdded' ?
                                        <AddClub isForSetting={true} />
                                        :
                                        ''
                                    }
                                </>
                            }
                        </div>
                }
                    

            </div>
        </div>
    );
};

export default Settings;