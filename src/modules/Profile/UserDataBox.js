import React, { useEffect, useState } from 'react';

// react router dom
import { Link } from 'react-router-dom';

// styles
import boxStyles from '../../styles/Boxes/DataBox.module.css'
import buttonStyles from '../../styles/Buttons/ButtonsBox.module.css'

// mui
import { Avatar } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

// assets
import ClockIcon from '../../components/icons/ClockIcon'
import FlightQuantity from '../../components/icons/FlightQuantity'
import UserIcon from '../../components/icons/UserIcon';

// queries 
import { useUserData } from '../../Utilities/Services/userQueries';

// components
import ChangePicPopUp from './EditProfile/ChangePicPopUp'
import PlusWithCircularBorderIcon from '../../components/icons/PlusWithCircularBorderIcon';



const UserDataBox = ({hasCoach}) => {

    const { data, isLoading, error } = useUserData();

    const [showPopUp,setShowPopup] = useState(false)

    return (
        <>
            {
                isLoading && 
                <Box sx={{ display: 'flex', width: 'full' , justifyContent:'center' }}>
                    <CircularProgress /> 
                </Box>
            }

            {
                error && <h3>{error.message}</h3>
            }
            
            {
                data && 
                    <div className={`${boxStyles.containerDarkmode} flex items-center w-full justify-around py-4 rounded-3xl md:h-[200px] md:py-5 md:px-2 `}>

                    {/* picture, name and code  */}
                    <div className='flex flex-col justify-center items-center gap-y-2 md:flex-row md:w-full md:justify-around'>

                        <div onClick={() => setShowPopup(true)} className='w-[99px] h-[99px] flex flex-col items-center justify-center' >
                            <Avatar alt={data.data.firstName} src={data.data.image?.path ? data.data.image.path : '/'} sx={{height:'99px', width:'100px', zIndex:'0'}}/>
                            <div className='w-[105px] h-[105px] mt-[-99px] z-10 rounded-full' style={{border: '2px solid var(--text-accent)',}}></div>
                            <span className='w-[24px] absolute mt-20 ml-16 z-20' >
                                <PlusWithCircularBorderIcon />
                            </span>
                        </div>

                        <div className=' gap-y-2 md:space-y-5 flex flex-col items-center' >
                            <p className=' font-light text-base w-36'>{data.data.firstName} {data.data.lastName}</p>
                            { data.data.levelName &&
                                <p className=' text-xs w-36' >{!data.data.isStarter && 'گواهینامه' } {data.data.levelName} </p>
                            }
                            <p className=' text-xs w-36'>کد کاربری: {data.data.userId}</p>
                        </div>

                    </div>

                    <div className=' flex flex-col items-center self-end gap-y-6 pb-2 md:pb-0 md:flex-row md:self-center md:w-full md:justify-around md:items-center md:space-y-0'>

                        <div className=' gap-y-2 flex flex-col items-center md:space-y-5'>

                            <div className=' flex justify-center items-center w-[80%]' >
                                <span className='w-6 h-6'>
                                    <FlightQuantity />
                                </span>
                                <p className=' font-normal text-sm mr-2 w-44 text-start'>تعداد پرواز {data.data.flightCount}</p>
                            </div> 

                            <div className=' flex justify-between items-center w-[80%]' >
                                <span className='w-6 h-5'>
                                    <ClockIcon/>
                                </span>
                                <p className=' font-normal text-sm mr-2 w-44 text-start'>ساعت پرواز {data.data.flightHours}</p>
                            </div>
                            
                            {/* condition based on coach  */}
                            { hasCoach ?
                                <div className=' flex justify-between items-center w-[80%]' >
                                    <span className='w-6 h-5'>
                                        <ClockIcon/>
                                    </span>
                                    <p className=' font-normal text-sm mr-2 w-44 text-start'>ساعت مربیگری {data.data.coachingHours}</p>
                                </div>
                                :
                                <div/>
                            }

                        </div>

                        <Link to='/editProfile/changeProfile' className={`${buttonStyles.normalButton} w-[130px] h-[48px] flex items-center justify-center rounded-full text-sm ml-[5%] `} >ویرایش پروفایل</Link>

                    </div>
                    <ChangePicPopUp isUserPhotoAvailable={data.data.image} showPopup={showPopUp} setShowPopup={setShowPopup} />

                </div>
            }
        </>
    );
};

export default UserDataBox;