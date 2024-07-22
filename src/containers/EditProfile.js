import React, { useEffect, useRef, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

// styles
import ButtonStyles from '../styles/Buttons/ButtonsBox.module.css'

// components
import PageTitle from '../components/reuseable/PageTitle';

const EditProfile = () => {

    // to set which button is active and style it
    const [activeLink, setActiveLink] = useState('flight'); // State to track active link
    

    // Ref to the button element
    const buttonRef = useRef(null);


    // Effect to click the button when the page is mounted
    useEffect(() => {
        // Check if the button ref exists and it has a current property
        if (buttonRef.current) {
        // Programmatically click the button
        buttonRef.current.click();
        }
    }, []); // Empty dependency array ensures the effect runs only once after initial render


    return (
        <div className='w-full flex justify-center items-center mt-14 pb-[12vh]'>
            <div className='w-full flex flex-col items-center gap-y-4 md:w-[70%]' >

                <PageTitle title={'ویرایش پروفایل'} />  

                <div className={`${ButtonStyles.ThreeStickedButtonCont}`}>
                    <Link ref={buttonRef} to='/editProfile/changeProfile' className={`${ButtonStyles.ThreeStickedButtonButton} rounded-r-xl ${activeLink === 'profile' ? ButtonStyles.activeYellow : ''}`} onClick={() => setActiveLink('profile')}>پروفایل</Link> 
                    <Link to='/editProfile/changeCertificate' className={`${ButtonStyles.ThreeStickedButtonButton} rounded-l-xl ${activeLink === 'certificate' ? ButtonStyles.activeYellow : ''}`} onClick={() => setActiveLink('certificate')} >گواهینامه</Link> 
                </div>

                <Outlet />

            </div>
        </div>
    );
};

export default EditProfile;