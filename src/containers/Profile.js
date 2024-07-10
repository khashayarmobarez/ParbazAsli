import React, { useEffect, useState } from 'react';

// styles
import GradientStyles from '../styles/gradients/Gradient.module.css'
import boxStyles from '../styles/Boxes/DataBox.module.css'
import ButtonStyles from '../styles/Buttons/ButtonsBox.module.css'

// mui
import AddIcon from '@mui/icons-material/Add';

// queries 
import { useUserProfile } from '../Utilities/Services/userQueries';


// react router dom
import { Link, useNavigate } from 'react-router-dom';

// icons 
import pencil from '../assets/icons/pencil-alt.svg'

// components
import UserDataBox from '../components/pages/Profile/UserDataBox';
import ParachutesSwiperSlider from '../components/pages/Profile/ParachutesSwiperSlider';
import UserCoursesSlider from '../components/pages/Profile/UserCoursesSlider';
import Loader from '../components/Loader/Loader';




const Profile = ({userRole}) => {

    const navigate = useNavigate()

    const { data, isLoading, error } = useUserProfile();

    return (
        <div className='flex flex-col items-center pt-[75px] md:pt-28'>

            {
                isLoading && 
                <div className='flex w-full h-[90vh] items-center justify-center'>
                    <Loader />
                </div>
            }

            {
                error &&
                <div className='flex flex-col justify-center items-center mt-8'>
                    <p>مشکلی پیش امده بعدا دوباره تلاش کنید</p>
                    <h3>{error.message}</h3>
                </div>
            }

            {
            data && 
            <div className='flex flex-col items-center justify-center gap-y-2 md:gap-y-4 w-[90%] md:w-[65%]'>


                    {/* first data box  */}
                    <UserDataBox />

                    {/* parachute renewal box*/}
                    {
                    data.data.parachutes && data.data.parachutes.length > 0 ? 
                    
                        <ParachutesSwiperSlider parachutesData={data.data.parachutes} />
                        :
                        <div className={`${boxStyles.containerDarkmode} rounded-3xl h-28 z-0 w-full flex flex-col justify-between items-center px-2 py-4 `}>
                            <p className=' font-medium text-sm'>چتر و وسایل پروازی خود را اضافه کنید</p>
                            <button onClick={() => navigate('/equipment')} className={`${ButtonStyles.addButton} w-20`} >
                                <AddIcon />
                            </button>
                        </div>

                    }



                    {/* buttons */}
                    <div className={`flex justify-between w-full md:absolute md:left-0 md:top-28 md:flex-col md:w-28 md:h-[24rem]
                        ${!data.data.hasCoach && 'px-12'}`}>

                        <Link to='/equipment' className={`${GradientStyles.container2} w-[60px] h-[60px] rounded-2xl flex flex-col justify-between items-center p-3 text-[#A5E65E] text-xs`} >
                            <img src={pencil} alt='icon' className='w-[56%]'/>
                            <p>تجهیزات</p>
                        </Link>
                        
                        <Link to='/MyCourses' className={`${GradientStyles.container2} w-[60px] h-[60px] rounded-2xl flex flex-col justify-between items-center p-3 text-[#A5E65E] text-xs`} >
                            <img src={pencil} alt='icon' className='w-[56%]'/>
                            <p>دوره‌ها</p>
                        </Link>
                        
                        <Link to='/' className={`${GradientStyles.container2} w-[60px] h-[60px] rounded-2xl flex flex-col justify-between items-center p-3 text-[#A5E65E] text-xs`} >
                            <img src={pencil} alt='icon' className='w-[56%]'/>
                            <p>سرفصل‌ها</p>
                        </Link>
                        
                        {/* education is condition based on, data.data.hasCoach  */}
                        <Link  to={data.data.hasCoach ? '/education' : '/'} className={`${GradientStyles.container2} ${!data.data.hasCoach && 'hidden'} w-[60px] h-[60px] rounded-2xl flex flex-col justify-between items-center p-3 text-[#A5E65E] text-xs`}>
                            <img src={pencil} alt='icon' className='w-[56%]'/>
                            <p>آموزش</p>
                        </Link>
                        
                        {/* club is condition based on, data.data.hasCoach  */}
                        <Link to={data.data.hasCoach ? '/club' : '/'} className={`${GradientStyles.container2} ${!data.data.hasCoach && 'hidden'} w-[60px] h-[60px] rounded-2xl flex flex-col justify-between items-center p-3 text-[#A5E65E] text-xs`} >
                            <img src={pencil} alt='icon' className='w-[56%]'/>
                            <p>باشگاه</p>
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