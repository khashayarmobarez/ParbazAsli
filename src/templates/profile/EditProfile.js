import React, { useEffect, useRef, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

// styles
import ButtonStyles from '../../styles/Buttons/ButtonsBox.module.css'

// components
import PageTitle from '../../components/reuseable/PageTitle';
import LowOpacityBackForStickedButtons from '../../components/reuseable/LowOpacityBackForStickedButtons';

const EditProfile = () => {

    const location = useLocation();

    // to set which button is active and style it
    const [activeLink, setActiveLink] = useState('flight'); // State to track active link
    


    return (
        <div className='w-full flex justify-center items-center mt-16 pb-[12vh]'>
            <div className='w-full flex flex-col items-center gap-y-4 md:w-[70%]' >

                <PageTitle title={'ویرایش پروفایل'} navigateTo={'/profile'} />  

                <LowOpacityBackForStickedButtons />

                <div className={`${ButtonStyles.ThreeStickedButtonCont} sticky top-[8.2rem] lg:top-[9.2rem] z-50`}>

                    <Link to='/editProfile/changeProfile' className={`${ButtonStyles.ThreeStickedButtonButton} rounded-r-xl ${location.pathname === '/editProfile/changeProfile' ? ButtonStyles.activeYellow : ''}`} >پروفایل</Link> 

                    <Link to='/editProfile/changeCertificate' className={`${ButtonStyles.ThreeStickedButtonButton} rounded-l-xl ${location.pathname === '/editProfile/changeCertificate' ? ButtonStyles.activeYellow : ''}`}  >گواهینامه</Link> 
                    
                </div>

                <Outlet />

            </div>
        </div>
    );
};

export default EditProfile;