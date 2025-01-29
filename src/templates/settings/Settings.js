import React, { useState } from 'react';
import Cookies from 'js-cookie';

// styles
import ButtonStyles from '../../styles/ButtonsBox.module.css'

// assets
import SettingIcon from '../../components/icons/SettingIcon'
import CertificateIcon from '../../components/icons/CertificateIcon'
import UserIcon from '../../components/icons/UserIcon'

// queries
// import { useClubStatus } from '../Utilities/Services/clubQueries';

// components
import PageTitle from '../../components/reuseable/PageTitle';
import DropDownLine from '../../components/reuseable/DropDownLine';
import WebColorMode from '../../modules/Settings/WebColorMode';
import EditUserSettings from '../../modules/Settings/EditUserSettings';
import CertificateSettings from '../../modules/Settings/CertificateSettings';
import { useTranslation } from '../../Utilities/context/TranslationContext';
// import AddClub from '../components/modules/Club/AddClub';


const Settings = () => {

    // language
    const { t } = useTranslation();
    const dir = Cookies.get('dir') || 'ltr';
    
    // controlling  items drop down
    const [DropDown, setDropDown] = useState(['dropDown1']);

    // clubstatus could be NotAdded, Pending, Accepted
    // const { data: clubStatus , loading: clubStatusLoading } = useClubStatus();

    const handleOpenDropDowns = (dropDown) => {
        
        !DropDown.includes(dropDown) && setDropDown([...DropDown,dropDown])
        DropDown.includes(dropDown) && setDropDown(DropDown.filter(item => item !== dropDown))

    }

    

    return (
        <div className='w-full flex flex-col items-center'>

            <div className='flex flex-col py-14 justify-center items-center w-full gap-y-8 md:w-[80%]'>
                
            <PageTitle title={t('settings.title')} paddingRight={'40%'} />

            <div className='w-[90%] flex flex-col items-center gap-y-6'>
                <DropDownLine
                    title={t('settings.appearance')}
                    icon={<SettingIcon />}
                    dropDown={DropDown}
                    isActive={DropDown.includes('dropDown1')}
                    onClickActivation={() => handleOpenDropDowns('dropDown1')}
                />
                {
                    DropDown.includes('dropDown1') &&
                    <WebColorMode />
                }
            </div>

            <div className='w-[90%] flex flex-col items-center gap-y-6'>
                <DropDownLine
                    title={t('settings.personal')}
                    icon={<UserIcon />}
                    dropDown={DropDown}
                    isActive={DropDown.includes('dropDown2')}
                    onClickActivation={() => handleOpenDropDowns('dropDown2')}
                />
                {
                    DropDown.includes('dropDown2') &&
                    <EditUserSettings />
                }
            </div>

            <p className='absolute -z-10 text-[#000000]/0'>{t('settings.frontEndDevelopedBy')}</p>
            <p className='absolute -z-10 text-[#000000]/0'>{t('settings.backEndDevelopedBy')}</p>

            <div className='w-[90%] flex flex-col items-center gap-y-4'>
                <DropDownLine
                    title={t('settings.certificates')}
                    icon={<CertificateIcon />}
                    dropDown={DropDown}
                    isActive={DropDown.includes('dropDown3')}
                    onClickActivation={() => handleOpenDropDowns('dropDown3')}
                />
                {
                    DropDown.includes('dropDown3') &&
                    <div className='w-full flex flex-col items-center gap-y-6'>
                        <CertificateSettings />
                    </div>
                }
            </div>


                {/* {   clubStatus &&
                    clubStatus.data === 'NotAdded' &&
                    <div className='w-[90%] flex flex-col items-center'>
                        <DropDownLine  title='ثبت باشگاه' icon={<UserIcon/>} dropDown={DropDown} isActive={DropDown.includes('dropDown5')} onClickActivation={() => handleOpenDropDowns('dropDown5')} />
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
                } */}

            </div>
        </div>
    );
};

export default Settings;