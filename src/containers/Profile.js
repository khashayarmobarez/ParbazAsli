import React, { useState } from 'react';


import boxStyles from '../styles/Boxes/DataBox.module.css'
import GradientStyles from '../styles/gradients/Gradient.module.css'

// queries 
import { useUserDetails } from '../Utilities/Services/queries';

import { Avatar } from '@mui/material';
import { Link } from 'react-router-dom';

// icons 
import flightHour from '../assets/icons/flightHour.svg'
import flightQuan from '../assets/icons/flightQuantity.svg'
import pencil from '../assets/icons/pencil-alt.svg'

// reuseable component 
import SpeedoMeter from '../components/reuseable/SpeedoMeter';

const Profile = () => {

    const { data, isLoading, error, isFetching } = useUserDetails();

    const [remainingDays, setRemainingDays] = useState(10)


    return (
        <div className='flex flex-col items-center'>

            {
                isLoading && isFetching && <h2 className=' text-white top-10'>is loading</h2>
            }

            {
                error && <h3>{error.message}</h3>
            }

            {
            data && 
            <div className='flex flex-col mt-[25%] items-center justify-center gap-8 w-[90%] md:w-[60%] md:mt-[8%] pb-28'>

                {/* first data box  */}
                <div className={`${boxStyles.containerDarkmode} flex items-center w-[100%] justify-around p-6 md:py-5 md:px-2`}>

                {/* picture, name and code  */}
                        <div className='flex flex-col justify-center items-center ml-[6%] space-y-5 md:flex-row md:w-[38%] md:justify-between md:ml-0'>

                            {data && <Avatar alt="Remy Sharp" src={data.data.thumbnailUrl} sx={{height:'99px', width:'100px', zIndex:'0'}}/>} 
                            <div className=' space-y-2 md:space-y-5' >
                                {data && <p className=' font-normal text-xl w-36'>{data.data.title.slice(0, 10)}</p>}
                                {data && <p className=' font-normal text-xs w-36 text-[#5F7174]'>{data.data.title.slice(0, 20)}</p>}
                                {data && <p className=' font-normal text-xs w-36 text-[#5F7174]'>کد کاربری: {data.data.title.slice(0, 5)}</p>}
                            </div>

                        </div>

                        <div className=' flex flex-col justify-center items-center space-y-8 md:flex-row md:w-[38%] md:justify-between md:space-y-0'>

                            <div className=' space-y-2 flex flex-col items-start md:space-y-5'>

                                {data && <div className=' flex justify-center items-start' >
                                            <img src={flightQuan} alt='icon'/>
                                            <p className=' font-normal text-sm mr-2 w-36 text-start'>{data.data.title.slice(0, 5)} تعداد پرواز</p>
                                        </div> }

                                {data && <div className=' flex justify-between items-start' >
                                            <img src={flightHour} alt='icon'/>
                                            <p className=' font-normal text-sm mr-2 w-36 text-start'>{data.data.title.slice(0, 5)} ساعت پرواز</p>
                                        </div>}

                                {data && <div className=' flex justify-between items-start' >
                                            <img src={flightHour} alt='icon'/>
                                            <p className=' font-normal text-sm mr-2 w-36 text-start'>{data.data.title.slice(0, 5)} ساعت مربیگری</p>
                                        </div>}

                            </div>

                            <Link to='/' className={`${GradientStyles.container2} w-[130px] h-[48px] flex items-center justify-center rounded-full text-sm ml-[-5%] `} >ویرایش پروفایل</Link>

                        </div>

                    </div>

                    {/* box 2, for mapping the parachute data  */}
                    <div className=' flex flex-col space-y-8 md:space-y-0 md:flex-row w-[100%] md:self-start justify-between'>
                        <SpeedoMeter remaining={remainingDays} data={data} className='z-10' />
                        {/* <SpeedoMeter remaining={remainingDays} data={data} className='z-10' /> */}
                    </div>

                    {/* buttons */}
                    <div className='flex justify-between w-[100%] md:w-[47%] md:self-start'>
                        <Link to='/equipment' className={`${GradientStyles.container2} w-[80px] h-[80px] rounded-3xl flex flex-col justify-between items-center p-5 text-[#A5E65E] text-xs`} >
                            <img src={pencil} alt='icon'/>
                            <p>تجهیزات</p>
                        </Link>
                        <Link  to='/education' className={`${GradientStyles.container2} w-[80px] h-[80px] rounded-3xl flex flex-col justify-between items-center p-5 text-[#A5E65E] text-xs`}>
                            <img src={pencil} alt='icon'/>
                            <p>آموزش</p>
                        </Link>
                        <Link className={`${GradientStyles.container2} w-[80px] h-[80px] rounded-3xl flex flex-col justify-between items-center p-5 text-[#A5E65E] text-xs`} to='/'>
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