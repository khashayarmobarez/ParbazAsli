import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

import { useSelector } from 'react-redux';
import { selectSettings } from '../../Utilities/ReduxToolKit/features/SettingsData/settingsSlice';

// styles
import GradientStyles from '../../styles/Gradient.module.css'
import boxStyles from '../../styles/DataBox.module.css'
import ButtonStyles from '../../styles/ButtonsBox.module.css'

// mui
import AddIcon from '@mui/icons-material/Add';

// queries 
import { useUserProfile } from '../../Utilities/Services/userQueries';


// react router dom
import { Link, useNavigate } from 'react-router-dom';

// icons 
import pencil from '../../assets/icons/pencil-alt.svg'

// components
import UserDataBox from '../../modules/Profile/UserDataBox';
import ParachutesSwiperSlider from '../../modules/Profile/ParachutesSwiperSlider';
import UserCoursesSlider from '../../modules/Profile/UserCoursesSlider';
import DigilogbookLoading from '../../components/Loader/DigilogbookLoading';
import UserCertificateStatus from '../../modules/Profile/UserCertificateStatus';

// context
import { useTranslation } from '../../Utilities/context/TranslationContext';



const Profile = () => {

    // language
    const { t } = useTranslation();
    const dir = Cookies.get('dir') || 'ltr';

    const navigate = useNavigate()

    const { data, isLoading, error } = useUserProfile();


    return (
        <div className='flex flex-col items-center pt-[75px] md:pt-28 pb-8'>


            {
                isLoading && 
                <DigilogbookLoading />
            }

            {
                error &&
                <div className='flex flex-col justify-center items-center mt-8'>
                    <p>{t("profile.userDashboard.errorOccurred")}</p>
                    <h3>{error.message}</h3>
                </div>
            }

            {
            data && 
            <div className='flex flex-col items-center justify-center mt-2 gap-y-2 md:gap-y-4 w-[90%] md:w-[65%]'>

                    {/* first data box  */}
                    <UserDataBox hasCoach={data.data.hasCoach} />

                    {/* certificate situation */}
                    <UserCertificateStatus
                    userCertificateStatus={data?.data.userCertificateStatus || ''} 
                    daysToCertificateExpiration={data?.data.daysToCertificateExpiration || ''} 
                    />

                    {/* parachute renewal box*/}
                    {
                    data.data.parachutes && data.data.parachutes.length > 0 ? 
                    
                        <ParachutesSwiperSlider isForClub={false} parachutesData={data.data.parachutes} />
                        :
                        <div className={`${boxStyles.containerDarkmode} rounded-3xl h-28 z-0 w-full flex flex-col justify-center items-center p-4 mb-2 gap-y-4`}>
                            <p className='  text-sm'>
                                {t("profile.userDashboard.addParachutePrompt")}
                            </p>
                            <button onClick={() => navigate('/equipment/addParachute')} className={`${ButtonStyles.addButton} w-16 h-8`}
                            style={{minHeight:'0', borderRadius:'12px'}} >
                                <AddIcon />
                            </button>
                        </div>

                    }



                    {/* buttons */}
                    <div className={`flex justify-around w-full -mt-1 lg:absolute lg:top-28 lg:flex-col lg:w-28 lg:h-[24rem]
                    ${dir === 'ltr' ? 'lg:right-0' : 'lg:left-0'}
                    ${!data.data.hasCoach ? 'px-12 justify-center gap-x-8' : 'justify-around' }`}>

                        <Link to='/equipment/flightEquipment' className={`${ButtonStyles.profileButton} bg-bgButtonProfileDefault hover:bg-bgButtonProfileHover w-[62px] h-[62px] rounded-2xl flex flex-col justify-between items-center p-3 text-textButtonProfileDefault text-xs`} >
                            <img src={pencil} alt='icon' className='w-[56%]'/>
                            <p>{t("profile.userDashboard.buttons.equipment")}</p>
                        </Link>
                        
                        <Link to='/MyCourses' className={`${ButtonStyles.profileButton} bg-bgButtonProfileDefault hover:bg-bgButtonProfileHover w-[62px] h-[62px] rounded-2xl flex flex-col justify-between items-center p-3 text-textButtonProfileDefault text-xs`} >
                            <img src={pencil} alt='icon' className='w-[56%]'/>
                            <p>{t("profile.userDashboard.buttons.courses")}</p>
                        </Link>
                        
                        <Link to='/syllabi' className={`${ButtonStyles.profileButton} bg-bgButtonProfileDefault hover:bg-bgButtonProfileHover w-[62px] h-[62px] rounded-2xl flex flex-col justify-between items-center p-3 text-textButtonProfileDefault text-xs`} >
                            <img src={pencil} alt='icon' className='w-[56%]'/>
                            <p>{t("profile.userDashboard.buttons.syllabi")}</p>
                        </Link>
                        
                        {/* education is condition based on, data.data.hasCoach  */}
                        <Link  to={data.data.hasCoach ? '/education' : '/'} className={`${ButtonStyles.profileButton} bg-bgButtonProfileDefault hover:bg-bgButtonProfileHover ${!data.data.hasCoach && 'hidden'} w-[62px] h-[62px] rounded-2xl flex flex-col justify-between items-center p-3 text-textButtonProfileDefault text-xs`}>
                            <img src={pencil} alt='icon' className='w-[56%]'/>
                            <p>{t("profile.userDashboard.buttons.education")}</p>
                        </Link>
                        
                        {/* club is condition based on, data.data.hasCoach  */}
                        <Link to={data.data.hasCoach ? '/club' : '/'} className={`${ButtonStyles.profileButton} bg-bgButtonProfileDefault hover:bg-bgButtonProfileHover ${!data.data.hasCoach && 'hidden'} w-[62px] h-[62px] rounded-2xl flex flex-col justify-between items-center p-3 text-textButtonProfileDefault text-xs`} >
                            <img src={pencil} alt='icon' className='w-[56%]'/>
                            <p>{t("profile.userDashboard.buttons.club")}</p>
                        </Link>
                        

                    </div>

                    {/* user Courses slider */}
                    {
                    data.data.userCourses && data.data.userCourses.length > 0 && 
                        <UserCoursesSlider coursesData={data.data.userCourses} />
                    }

            </div>
            
        }

        </div>
    );
};

export default Profile;