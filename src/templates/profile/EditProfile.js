import React, { useEffect, useRef, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';

// styles
import ButtonStyles from '../../styles/ButtonsBox.module.css'

// components
import PageTitle from '../../components/reuseable/PageTitle';
import LowOpacityBackForStickedButtons from '../../components/reuseable/LowOpacityBackForStickedButtons';

// context
import { useTranslation } from '../../Utilities/context/TranslationContext';


const EditProfile = () => {

    // language
    const { t } = useTranslation();


    const location = useLocation();

    // to set which button is active and style it
    const [activeLink, setActiveLink] = useState('flight'); // State to track active link
    


    return (
        <div className='w-full flex justify-center items-center mt-16 pb-[12vh]'>
            <div className='w-full flex flex-col items-center gap-y-4 md:w-[70%]' >

                <PageTitle title={t('editUser.profile.title')} navigateTo={'/profile'} />  

                <LowOpacityBackForStickedButtons />

                <div dir='rtl' className={`${ButtonStyles.ThreeStickedButtonCont} sticky top-[8.2rem] lg:top-[9.2rem] z-50`}>

                    <Link to='/editProfile/changeProfile' className={`${ButtonStyles.ThreeStickedButtonButton} rounded-r-xl ${location.pathname === '/editProfile/changeProfile' ? ButtonStyles.activeYellow : ''}`} >{t('editUser.profile.profile')}</Link> 

                    <Link to='/editProfile/changeCertificate' className={`${ButtonStyles.ThreeStickedButtonButton} rounded-l-xl ${location.pathname === '/editProfile/changeCertificate' ? ButtonStyles.activeYellow : ''}`}  >{t('editUser.profile.certificate')}</Link> 
                    
                </div>

                <Outlet />

            </div>
        </div>
    );
};

export default EditProfile;