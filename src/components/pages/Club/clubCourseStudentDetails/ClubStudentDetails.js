import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// mui
import { useMediaQuery } from '@mui/material';

// assets
import flightHour from '../../../../assets/icons/flightHour.svg';
import flightQuan from '../../../../assets/icons/flightQuantity.svg';
import rightArrowButton from '../../../../assets/icons/Right Arrow Button.svg';

const ClubCourseStudentDetails = ({data}) => {
    
    const { studentId } = useParams();
    const navigate = useNavigate();

    

    const isMobile = useMediaQuery('(max-width:720px)');


    return (
        <div className='flex flex-col py-20 items-center'>
            <div  className='w-[90%] flex flex-col items-center gap-y-4 md:w-[70%]'>

                <div className={`w-full min-h-52 rounded-3xl flex justify-between items-center p-4 relative`}
                style={{background:'var(--coachesDetails-bg)', boxShadow:'var(--coachesDetails-BoxShadow)'}}>
                    { 
                    data && 
                    <>
                        {/* avatar and name */}
                        <div className='w-full flex flex-col justify-between items-center gap-y-4'>
                            
                            {
                                isMobile &&
                                <h1 className='text-lg font-medium'>{data.firstName}&nbsp;{data.lastName}</h1>
                            }

                                <div className="avatar">
                                    <div className="w-24 rounded-full">
                                    <img
                                        src={data.image ? data.image.path : ''} 
                                        alt='userPicture' 
                                    />
                                    </div>
                                </div>

                        </div>


                        {/* user name and level for desktop */}
                        {
                            !isMobile && data &&
                            <div className='w-full flex flex-col justify-center items-center gap-y-4'>
                                <h1 className='text-lg font-medium'>{data.firstName}&nbsp;{data.lastName}</h1>
                                <p className='text-xs text-lowOpacityWhite'>گواهینامه {data.levelName}</p>
                            </div>
                        }


                        {/* user data */}
                        <div className='w-full flex flex-col justify-between items-center gap-y-4  py-2'>

                            {
                                isMobile && data &&
                                <p className='text-xs text-lowOpacityWhite'>گواهینامه {data.levelName}</p>
                            }

                            <div className='w-full flex flex-col items-start justify-between gap-y-2 mr-4 text-sm md:pr-[20%]'>
                                <p className='flex gap-x-2'>
                                    <img alt='icon' src={flightQuan} />
                                    {data.flightCount} تعداد پرواز
                                </p>
                                <p className='flex gap-x-2'>
                                    <img alt='icon' src={flightHour} />
                                    {data.flightHours} ساعت پرواز
                                </p>
                                <p className='flex gap-x-2'>
                                    <img alt='icon' src={flightHour} />
                                    {data.coachingHours} ساعت مربی‌گری
                                </p>
                                <p className='flex gap-x-2'>
                                    <img alt='icon' src={flightQuan} />
                                    کد کاربری: {data.userId}
                                </p>
                            </div>

                        </div>
                    </>
                    }

                    {/* back button */}
                    <img
                        src={rightArrowButton}
                        alt="rightArrowButton"
                        onClick={() => navigate(-1)}
                        className='absolute left-4 top-2 w-8 h-8 transform rotate-180'
                    />
                    
                </div>

            </div>
        </div>
    );
};

export default ClubCourseStudentDetails;