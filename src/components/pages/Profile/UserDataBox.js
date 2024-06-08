import React from 'react';

// redux
import { useSelector } from 'react-redux';
import { selectUser } from '../../../Utilities/ReduxToolKit/features/userData/userSlice';

// react router dom
import { Link } from 'react-router-dom';

// styles
import boxStyles from '../../../styles/Boxes/DataBox.module.css'
import GradientStyles from '../../../styles/gradients/Gradient.module.css'

// mui
import { Avatar } from '@mui/material';

// assets
import flightHour from '../../../assets/icons/flightHour.svg'
import flightQuan from '../../../assets/icons/flightQuantity.svg'

// queries 
import { useUserData } from '../../../Utilities/Services/queries';



const UserDataBox = () => {

    const { data, isLoading, error, isFetching } = useUserData();

    return (
        <>
            {
                isLoading && isFetching && <h2 className=' text-white mt-'>is loading...</h2>
            }

            {
                error && <h3>{error.message}</h3>
            }
            
            {
                data && 
                    <div className={`${boxStyles.containerDarkmode} flex items-center w-full justify-around py-6 rounded-3xl md:h-[200px] md:py-5 md:px-2 `}>

                    {/* picture, name and code  */}
                    <div className='flex flex-col justify-center items-center gap-y-4 md:flex-row md:w-[38%] md:justify-between'>

                        <Avatar alt="Remy Sharp" src={data.data.image} sx={{height:'95px', width:'95px', zIndex:'0'}}/>
                        <div className=' space-y-2 md:space-y-5' >
                            <p className=' font-normal text-lg w-36'>{data.data.fullName}</p>
                            { data.data.levelName &&
                                <p className=' font-normal text-xs w-36' style={{color:'var(--softer-white)'}}>{data.data.levelName} </p>
                            }
                            <p className=' font-normal text-xs w-36' style={{color:'var(--softer-white)'}}>کد کاربری: {data.data.userId}</p>
                        </div>

                    </div>

                    <div className=' flex flex-col items-center self-end gap-y-10 md:flex-row md:w-[38%] md:justify-between md:items-center md:space-y-0'>

                        <div className=' gap-y-4 flex flex-col items-center md:space-y-5'>

                            <div className=' flex justify-center items-start w-[80%]' >
                                <img src={flightQuan} alt='icon'/>
                                <p className=' font-normal text-sm mr-2 w-36 text-start'>{data.data.flightHours} تعداد پرواز</p>
                            </div> 

                            <div className=' flex justify-between items-start w-[80%]' >
                                <img src={flightHour} alt='icon'/>
                                <p className=' font-normal text-sm mr-2 w-36 text-start'>{data.data.flightHours} ساعت پرواز</p>
                            </div>
                            
                            {/* condition based on coach  */}
                            { data.data.coachingHours &&
                                <div className=' flex justify-between items-start w-[80%]' >
                                    <img src={flightHour} alt='icon'/>
                                    <p className=' font-normal text-sm mr-2 w-36 text-start'>{data.data.coachingHours} ساعت مربیگری</p>
                                </div>
                            }


                        </div>

                        <Link to='/editProfile' className={`${GradientStyles.container2} w-[130px] h-[48px] flex items-center justify-center rounded-full text-sm ml-[5%] `} >ویرایش پروفایل</Link>

                    </div>

                </div>
            }
        </>
    );
};

export default UserDataBox;