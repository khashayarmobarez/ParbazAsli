import React, { useEffect, useState } from 'react';

import GradientStyles from '../styles/gradients/Gradient.module.css'

// queries 
import { useUserDetails } from '../Utilities/Services/queries';


// react router dom
import { Link } from 'react-router-dom';

// icons 
import pencil from '../assets/icons/pencil-alt.svg'

// components
import SwiperSlider from '../components/pages/Profile/SwiperSlider';
import UserDataBox from '../components/pages/Profile/UserDataBox';




const Profile = ({userRole}) => {

    const { data, isLoading, error, isFetching } = useUserDetails();

    const [remainingDays, setRemainingDays] = useState(80)



    return (
        <div className='flex flex-col items-center pt-[75px]'>

            {
                isLoading && isFetching && <h2 className=' text-white mt-'>is loading...</h2>
            }

            {
                error && <h3>{error.message}</h3>
            }

            {
            data && 
            <div className='flex flex-col items-center justify-center gap-y-2 w-[90%] md:w-[65%]'>


                    {/* first data box  */}
                    <UserDataBox />

                    {/* parachute renewal box*/}
                    <SwiperSlider remainingDays={remainingDays} data={data} />


                    {/* buttons */}
                    <div className='flex justify-between w-full md:absolute md:left-0 md:top-28 md:flex-col md:w-28 md:h-[20rem] '>

                        <Link to='/equipment' className={`${GradientStyles.container2} w-[60px] h-[60px] rounded-2xl flex flex-col justify-between items-center p-3 text-[#A5E65E] text-xs`} >
                            <img src={pencil} alt='icon' className='w-[56%]'/>
                            <p>تجهیزات</p>
                        </Link>
                        
                        <Link to='/club' className={`${GradientStyles.container2} w-[60px] h-[60px] rounded-2xl flex flex-col justify-between items-center p-3 text-[#A5E65E] text-xs`} >
                            <img src={pencil} alt='icon' className='w-[56%]'/>
                            <p>دوره‌ها</p>
                        </Link>
                        
                        <Link to='/club' className={`${GradientStyles.container2} w-[60px] h-[60px] rounded-2xl flex flex-col justify-between items-center p-3 text-[#A5E65E] text-xs`} >
                            <img src={pencil} alt='icon' className='w-[56%]'/>
                            <p>سرفصل‌ها</p>
                        </Link>

                        <Link  to='/education' className={`${GradientStyles.container2} w-[60px] h-[60px] rounded-2xl flex flex-col justify-between items-center p-3 text-[#A5E65E] text-xs`}>
                            <img src={pencil} alt='icon' className='w-[56%]'/>
                            <p>آموزش</p>
                        </Link>

                        
                        <Link to='/club' className={`${GradientStyles.container2} w-[60px] h-[60px] rounded-2xl flex flex-col justify-between items-center p-3 text-[#A5E65E] text-xs`} >
                            <img src={pencil} alt='icon' className='w-[56%]'/>
                            <p>باشگاه</p>
                        </Link>
                        

                    </div>

                        
            </div>
   
            }

        </div>
    );
};

export default Profile;