import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

// styles
import ButtonStyles from '../../../styles/Buttons/ButtonsBox.module.css'

// queries
import { useGetCoachCourses, useGetCoachDetails } from '../../../Utilities/Services/clubQueries';

// mui
import { Avatar } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

// assets
import flightHour from '../../../assets/icons/flightHour.svg'
import flightQuan from '../../../assets/icons/flightQuantity.svg'
import clubStudents from '../../../assets/icons/users-Icon.svg'
import { toast } from 'react-toastify';

// components

const ClubCoachDetails = () => {

    const { id } = useParams();

    const {  data: coachDetails, isLoading: coachDetailsLoading, error: coachDetailsError } = useGetCoachDetails(id);
    const {  data: coachCoursesDetails, isLoading: coachCourseDetailsLoading, error: coachCourseDetailsError } = useGetCoachCourses(id);


    const handleClickDetails = () => {

        toast('صفحه در حال توسعه است ...', {
            type: 'error', // Specify the type of toast (e.g., 'success', 'error', 'info', 'warning')
            position: 'top-right', // Set the position (e.g., 'top-left', 'bottom-right')
            autoClose: 3000,
            theme: 'dark',
            style: { width: "350px" }
        });
        
    }


    return (
        <div className='w-full flex flex-col items-center pt-20'>
            <div className='w-[90%] flex flex-col items-center gap-y-6'>

                {
                    coachDetailsLoading &&
                    <Box sx={{ display: 'flex', width:'full' , justifyContent:'center', marginTop:'10rem' }}>
                        <CircularProgress /> 
                    </Box>
                }

                {coachDetails &&
                    <div className='flex flex-col w-full justify-between items-center rounded-2xl text-sm min-h-16 p-6 gap-y-6'
                    style={{background:'var(--coachesDetails-bg)', boxShadow:'var(--coachesDetails-BoxShadow)'}}>

                        <div className=' w-full flex items-center justify-between gap-y-4'>
                            <p className='text-base' style={{color:'var(--yellow-text)'}}>{coachDetails.data.fullName}</p>
                            <p className=''>وضعیت: {coachDetails.data.status}</p>
                        </div>

                        <div className='w-full flex items-center justify-between gap-y-4 bg'>

                            <Avatar src={coachDetails.data.profilePicture.path} alt="Remy Sharp" sx={{height:'100px', width:'100px', zIndex:'0'}} />

                            <div className='flex flex-col w-full h-full justify-around items-end gap-y-4 text-sm'>

                                <div className=' flex justify-start items-start w-32' >
                                    <img src={clubStudents} alt='icon'/>
                                    <p className=' font-normal text-xs mr-2  text-start'>تعداد هنرجویان: {coachDetails.data.studentsCount}</p>
                                </div> 

                                <div className=' flex justify-start items-start w-32' >
                                    <img src={flightHour} alt='icon'/>
                                    <p className=' font-normal text-xs mr-2  text-start'>{coachDetails.data.coachingHours} ساعت مربیگری</p>
                                </div>

                                <div className=' flex justify-start items-start w-32' >
                                    <img src={flightQuan} alt='icon'/>
                                    <p className=' font-normal text-xs mr-2  text-start'>کد عضویت: {coachDetails.data.id}</p>
                                </div>

                            </div>
                        </div>
                    </div>
                }

                {
                    coachCoursesDetails && coachCoursesDetails.data.map((course) => (
                        <div
                        key={course.id}
                        className="w-full justify-between items-center px-4 py-4 rounded-[1.6rem] flex flex-col gap-y-6 md:col-span-1 z-10 text-xs"
                        style={{
                            background: 'var(--organs-coachData-bg) var(--bg-color)',
                            boxShadow: 'var(--organs-coachData-boxShadow)'
                        }}
                        >
                            <h1 className='text-base'>{course.name}</h1>

                            <div className='w-full flex justify-between items-center'>

                                <div className='flex flex-col text-start gap-y-1'>

                                    <p>
                                        {course.level} {course.organization && `/ ${course.organization}`}
                                    </p>

                                    { course.clubName &&
                                        <p>باشگاه: {course.clubName}</p>
                                    }

                                    <p>تعداد پرواز: {course.flightsCount}</p>

                                    <div className='flex gap-x-1'>
                                        <p>وضعیت: {course.status}</p>

                                        {course.status === 'Active' && 
                                        <div className='w-3 h-3 rounded-full' style={{backgroundColor:'var(--dark-green)'}}></div>
                                        }
                                        {course.status === 'Pending' &&
                                        <div className='w-3 h-3 rounded-full' style={{backgroundColor:'var(--yellow-text)'}}></div>
                                        }
                                        {course.status === 'Disable' &&
                                        <div className='w-3 h-3 rounded-full' style={{backgroundColor:'var(--red-text)'}}></div>
                                        }

                                    </div>

                                </div>

                                <button 
                                onClick={handleClickDetails}
                                className={`${ButtonStyles.normalButton} self-end`} >
                                    جزئیات  
                                </button>

                            </div>
                        </div>
                        ))
                    }    
            </div>
        </div>
    );
};

export default ClubCoachDetails;