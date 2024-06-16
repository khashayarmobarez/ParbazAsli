import React, { useEffect, useState } from 'react';

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
import YellowPlus from '../../../assets/icons/yellowPlus.svg'

// queries 
import { useUserData } from '../../../Utilities/Services/userQueries';

// components
import ChangePicPopUp from './EditProfile/ChangePicPopUp'



const UserDataBox = () => {

    const { data, isLoading, error } = useUserData();

    useEffect(() => {
        console.log(data)
    }, [data]);

    const [showPopUp,setShowPopup] = useState(false)

    return (
        <>
            {
                isLoading && <h2 className=' text-white h-[20vh] flex justify-center items-center'>is loading...</h2>
            }

            {
                error && <h3>{error.message}</h3>
            }
            
            {
                data && 
                    <div className={`${boxStyles.containerDarkmode} flex items-center w-full justify-around py-3 rounded-3xl md:h-[200px] md:py-5 md:px-2 `}>

                    {/* picture, name and code  */}
                    <div className='flex flex-col justify-center items-center gap-y-2 md:flex-row md:w-[38%] md:justify-between'>

                        <div onClick={() => setShowPopup(true)} className='w-[99px] h-[99px] flex flex-col items-center justify-center' >
                            <Avatar alt={data.data.fullName} src={data.data.image?.path ? data.data.image.path : '/'} sx={{height:'99px', width:'100px', zIndex:'0'}}/>
                            <div className='w-[105px] h-[105px] mt-[-99px] z-10 rounded-full' style={{border: '2px solid var(--yellow-text)',}}></div>
                            <img className=' w-7 absolute mt-20 ml-16 z-20' src={YellowPlus} alt='icon' />
                        </div>

                        <div className=' space-y-1 md:space-y-5 flex flex-col items-center' >
                            <p className=' font-normal text-base w-36'>{data.data.fullName}</p>
                            { data.data.levelName &&
                                <p className=' font-normal text-xs w-36' style={{color:'var(--softer-white)'}}>{data.data.levelName} </p>
                            }
                            <p className=' font-normal text-xs w-36' style={{color:'var(--softer-white)'}}>کد کاربری: {data.data.userId}</p>
                        </div>

                    </div>

                    <div className=' flex flex-col items-center self-end gap-y-6 pb-2 md:pb-0 md:flex-row md:self-center md:w-[38%] md:justify-between md:items-center md:space-y-0'>

                        <div className=' gap-y-2 flex flex-col items-center md:space-y-5'>

                            <div className=' flex justify-center items-start w-[80%]' >
                                <img src={flightQuan} alt='icon'/>
                                <p className=' font-normal text-xs mr-2 w-36 text-start'>{data.data.flightCount} تعداد پرواز</p>
                            </div> 

                            <div className=' flex justify-between items-start w-[80%]' >
                                <img src={flightHour} alt='icon'/>
                                <p className=' font-normal text-xs mr-2 w-36 text-start'>{data.data.flightHours} ساعت پرواز</p>
                            </div>
                            
                            {/* condition based on coach  */}
                            { data.data.coachingHours >= 0 &&
                                <div className=' flex justify-between items-start w-[80%]' >
                                    <img src={flightHour} alt='icon'/>
                                    <p className=' font-normal text-xs mr-2 w-36 text-start'>{data.data.coachingHours} ساعت مربیگری</p>
                                </div>
                            }


                        </div>

                        <Link to='/editProfile' className={`${GradientStyles.container2} w-[130px] h-[48px] flex items-center justify-center rounded-full text-sm ml-[5%] `} >ویرایش پروفایل</Link>

                        <ChangePicPopUp showPopup={showPopUp} setShowPopup={setShowPopup} />
                    </div>

                </div>
            }
        </>
    );
};

export default UserDataBox;