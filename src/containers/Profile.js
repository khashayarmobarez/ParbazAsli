// coach profile

import React, { useState } from 'react';

import boxStyles from '../styles/Boxes/DataBox.module.css'
import GradientStyles from '../styles/gradients/Gradient.module.css'

// queries 
import { useUserDetails } from '../Utilities/Services/queries';

// mui
import { Avatar } from '@mui/material';

// react router dom
import { Link } from 'react-router-dom';

// icons 
import flightHour from '../assets/icons/flightHour.svg'
import flightQuan from '../assets/icons/flightQuantity.svg'
import pencil from '../assets/icons/pencil-alt.svg'

// components
import SwiperSlider from '../components/pages/Profile/SwiperSlider';




const Profile = ({userRole}) => {

    const { data, isLoading, error, isFetching } = useUserDetails();

    const [remainingDays, setRemainingDays] = useState(80)


    return (
        <div className='flex flex-col items-center pt-24 pb-[4rem]'>

            {
                isLoading && isFetching && <h2 className=' text-white mt-'>is loading...</h2>
            }

            {
                error && <h3>{error.message}</h3>
            }

            {
            data && 
            <div className='flex flex-col items-center justify-center gap-y-4 mt-4 w-[100%] md:w-[65%]'>

                    {/* first data box  */}
                    <div className={`${boxStyles.containerDarkmode} flex items-center w-[90%] md:w-[100%] md:h-[200px] justify-around py-6 md:py-5 md:px-2 rounded-3xl`}>

                        {/* picture, name and code  */}
                        <div className='flex flex-col justify-center items-center ml-[6%] space-y-5 md:flex-row md:w-[38%] md:justify-between md:ml-0'>

                            {data && <Avatar alt="Remy Sharp" src={data.data.thumbnailUrl} sx={{height:'99px', width:'100px', zIndex:'0'}}/>} 
                            <div className=' space-y-2 md:space-y-5' >
                                {data && <p className=' font-normal text-xl w-36'>{data.data.title.slice(0, 10)}</p>}
                                {data && <p className=' font-normal text-xs w-36 text-[#5F7174]'>کد کاربری: {data.data.title.slice(0, 5)}</p>}
                            </div>

                        </div>

                        <div className=' flex flex-col justify-center items-center space-y-8 md:flex-row md:w-[38%] md:justify-between md:items-center md:space-y-0'>

                            <div className=' space-y-2 flex flex-col items-start md:space-y-5'>

                                {data &&
                                <div className=' flex justify-center items-start' >
                                    <img src={flightQuan} alt='icon'/>
                                    <p className=' font-normal text-sm mr-2 w-36 text-start'>{data.data.title.slice(0, 5)} تعداد پرواز</p>
                                </div> }

                                {data &&
                                <div className=' flex justify-between items-start' >
                                    <img src={flightHour} alt='icon'/>
                                    <p className=' font-normal text-sm mr-2 w-36 text-start'>{data.data.title.slice(0, 5)} ساعت پرواز</p>
                                </div>}
                                
                                {/* condition based on coach  */}
                                {data &&
                                 userRole === 'coach' &&
                                <div className=' flex justify-between items-start' >
                                    <img src={flightHour} alt='icon'/>
                                    <p className=' font-normal text-sm mr-2 w-36 text-start'>{data.data.title.slice(0, 5)} ساعت مربیگری</p>
                                </div>}


                            </div>

                            <Link to='/editProfile' className={`${GradientStyles.container2} w-[130px] h-[48px] flex items-center justify-center rounded-full text-sm ml-[5%] `} >ویرایش پروفایل</Link>

                        </div>

                    </div>

                    <SwiperSlider remainingDays={remainingDays} data={data} />

                    {/* box 2, for mapping the parachute data  */}
                    {/* <div className=' flex flex-col space-y-8 md:space-y-0 md:flex-row w-[100%] md:self-start justify-between'>
                        <SpeedoMeter remaining={remainingDays} data={data} className='z-10' />
                        <SpeedoMeter remaining={remainingDays} data={data} className='z-10' />
                    </div> */}

                    {/* buttons */}
                    <div className='flex justify-between w-[90%] md:absolute md:left-0 md:top-28 md:flex-col md:w-28 md:h-[20rem] '>

                        <Link to='/equipment' className={`${GradientStyles.container2} w-[80px] h-[80px] rounded-3xl flex flex-col justify-between items-center p-5 text-[#A5E65E] text-xs`} >
                            <img src={pencil} alt='icon'/>
                            <p>تجهیزات</p>
                        </Link>

                        <Link  to='/education' className={`${GradientStyles.container2} w-[80px] h-[80px] rounded-3xl flex flex-col justify-between items-center p-5 text-[#A5E65E] text-xs`}>
                            <img src={pencil} alt='icon'/>
                            <p>آموزش</p>
                        </Link>

                        
                        <Link to='/club' className={`${GradientStyles.container2} w-[80px] h-[80px] rounded-3xl flex flex-col justify-between items-center p-5 text-[#A5E65E] text-xs`} >
                            <img src={pencil} alt='icon'/>
                            <p>باشگاه</p>
                        </Link>
                        

                    </div>

                        
            </div>
   
            }

        </div>
    );
};

export default Profile;