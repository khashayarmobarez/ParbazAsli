import React, { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';

// styles
import ButtonStyles from '../../../styles/Buttons/ButtonsBox.module.css'

// queries
import { useGetCoachCourses, useGetCoachDetails, useTriggerCoachStatus } from '../../../Utilities/Services/clubQueries';

// mui
import { Avatar } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

// assets
import ClockIcon from '../../../components/icons/ClockIcon'
import DocumentIcon from '../../../components/icons/DocumentIcon'
import UsersIcon from '../../../components/icons/UsersIcon'
import ArrowButton from '../../../components/icons/ArrowButton'


const ClubCoachDetails = () => {

    const navigate = useNavigate()
    const location = useLocation();

    const { id } = useParams();

    const {  data: coachDetails, isLoading: coachDetailsLoading, error: coachDetailsError } = useGetCoachDetails(id);
    const {  data: coachCoursesDetails, isLoading: coachCourseDetailsLoading, error: coachCourseDetailsError } = useGetCoachCourses(id);
    const { mutate: triggerCoachStatus, isLoading: triggerCoachStatusLoading } = useTriggerCoachStatus();

    // for handliung the back button of club course details
    Cookies.set('lastPathForClubCourseDetails',location.pathname)

    const handleClickDetails = (id) => {

        navigate(`/club/courseDetails/${id}/students`)
        
    }

    


    const handleTriggerCoachStatus = (status) => {

        if(status === 'Active' || status === 'Pending') {

            const disableCoachJson = {
                coachId: coachDetails.data.id,
                status: 'Disable',
            };

            triggerCoachStatus(disableCoachJson, {
                onSuccess: () => {
                    toast('مربی با موفقیت غیر فعال شد', {
                        type: 'success',
                        position: 'top-right',
                        autoClose: 5000,
                        theme: 'dark',
                        style: { width: "90%" }
                    });
                    navigate('/club/clubCoaches');
                },
                onError: (error) => {
                    let errorMessage = 'خطایی رخ داده است';
                    if (error.response && error.response.data && error.response.data.ErrorMessages) {
                        errorMessage = error.response.data.ErrorMessages[0].ErrorMessage;
                    }
                    toast(errorMessage, {
                        type: 'error',
                        position: 'top-right',
                        autoClose: 5000,
                        theme: 'dark',
                        style: { width: "90%" }
                    });
                }
            });

        } else if (status === 'Disable') {

            const ActivateCoachJson = {
                coachId: coachDetails.data.id,
                status: 'Active',
            };

            triggerCoachStatus(ActivateCoachJson, {
                onSuccess: () => {
                    toast('مربی با موفقیت غیر فعال شد', {
                        type: 'success',
                        position: 'top-right',
                        autoClose: 5000,
                        theme: 'dark',
                        style: { width: "90%" }
                    });
                    navigate('/club/clubCoaches');
                },
                onError: (error) => {
                    let errorMessage = 'خطایی رخ داده است';
                    if (error.response && error.response.data && error.response.data.ErrorMessages) {
                        errorMessage = error.response.data.ErrorMessages[0].ErrorMessage;
                    }
                    toast(errorMessage, {
                        type: 'error',
                        position: 'top-right',
                        autoClose: 5000,
                        theme: 'dark',
                        style: { width: "90%" }
                    });
                }
            });

        }

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
                    <div className='flex flex-col w-full justify-between items-center rounded-2xl text-sm min-h-16 p-6 gap-y-6 relative bg-bgOutputDefault'
                    style={{ boxShadow:'var(--shadow-all)'}}>

                        <span className='absolute top-4 left-4 cursor-pointer rotate-180 w-8' onClick={() => navigate('/club/clubCoaches')}>
                            <ArrowButton />
                        </span>

                        <div className=' w-full flex items-center justify-between gap-y-4 pl-8'>
                            <p className='text-base' style={{color:'var(--text-accent)'}}>{coachDetails.data.name}</p>
                            <p className='text-[var(--text-disable)]'>
                                وضعیت:
                                {coachDetails.data.status === 'Active' && <span style={{color:'var(--text-accent)'}}> فعال</span>}
                                {coachDetails.data.status === 'Pending' && <span style={{color:'var(--text-warning)'}}> در انتظار تایید</span>}
                                {coachDetails.data.status === 'Disable' && <span style={{color:'var(--text-disable)'}}> غیر فعال</span>}
                                {coachDetails.data.status === 'Rejected' && <span style={{color:'var(--text-error)'}}> رد شده</span>}
                            </p>
                        </div>

                        <div className='w-full flex items-center justify-between gap-y-4 bg'>

                            <Avatar src={coachDetails.data.profilePicture?.path || ''} alt="Remy Sharp" sx={{height:'100px', width:'100px', zIndex:'0'}} />

                            <div className='flex flex-col w-full h-full justify-around items-end gap-y-4 text-sm'>

                                <div className=' flex justify-start items-start w-32' >
                                    <span className='w-6 h-6'>
                                        <UsersIcon/>
                                    </span>
                                    <p className=' font-normal text-xs mr-1  text-start'>تعداد هنرجویان: {coachDetails.data.studentsCount}</p>
                                </div> 

                                <div className=' flex justify-start items-start w-32' >
                                    <span className='w-6 h-6'>
                                        <ClockIcon/>
                                    </span>
                                    <p className=' font-normal text-xs mr-1  text-start'>{coachDetails.data.coachingHours} ساعت مربیگری</p>
                                </div>

                                <div className=' flex justify-start items-start w-32 -mt-1' >
                                    <span className='w-6 h-6' >
                                        <DocumentIcon/>
                                    </span>
                                    <p className=' font-normal text-xs mr-1 mt-[2px] text-start'>کد عضویت: {coachDetails.data.id}</p>
                                </div>

                            </div>
                        </div>
                    </div>
                }

                {
                    coachCoursesDetails && coachCoursesDetails.data.map((course) => (
                        <div
                        key={course.id}
                        className="w-full justify-between items-center px-4 py-4 rounded-[1.6rem] flex flex-col gap-y-6 md:col-span-1 z-10 text-xs bg-bgOutputDefault"
                        style={{
                            boxShadow: 'var(--shadow-all)'
                        }}
                        >
                            <div className='w-full flex justify-between items-center'>

                                <h1 className='text-base'>{course.name}</h1>

                                <div className='flex gap-x-1'>

                                    <p className='text-[var(--text-disable)]'>وضعیت:&nbsp; 
                                        
                                            {course.status === 'Active' && 
                                                <span className='text-textAccent'>فعال</span>
                                            }
                                            {course.status === 'Pending' &&
                                                <span className='text-[var(--text-error)]'>در انتظار...</span>
                                            }
                                            {course.status === 'Disable' &&
                                                <span className='text-[var(--text-error)]'>غیر فعال</span>
                                            }
                                            {course.status === 'Rejected' &&
                                                <span className='text-[var(--text-error)]'>رد شده</span>
                                            }
                                    </p>

                                </div>

                            </div>

                            <div className='w-full flex justify-between items-center'>

                                <div className='flex flex-col text-start gap-y-1'>

                                    {
                                        course.organization &&
                                            <p className='text-base'>
                                                {course.organization}
                                            </p>
                                    }

                                    { course.clubName &&
                                        <p>باشگاه: {course.clubName}</p>
                                    }

                                    {
                                    course.level &&
                                        <p><span className='text-[var(--text-disable)]'>مقطع: </span> {course.level}</p>
                                    }
                                    <p><span className='text-[var(--text-disable)]'>تعداد پرواز:</span> {course.flightsCount}</p>

                                    

                                </div>

                                <div className='flex flex-col text-start gap-y-1'>

                                        <p><span className='text-[var(--text-disable)]'>تعداد هنرجویان فعال:</span> {course.activeStudentCounts}</p>
                                    
                                        <p><span className='text-[var(--text-disable)]'>تعداد هنرجویان سابق:</span> {course.historyStudentCounts}</p>

                                </div>


                            </div>

                            {
                                course.status !== 'Rejected' &&
                                    <button 
                                    onClick={() => handleClickDetails(course.id)}
                                    className={`${ButtonStyles.normalButton}`} >
                                        جزئیات
                                    </button>
                            }

                        </div>
                        ))
                    }    

                    {/* trigger coach status button */}
                    {
                        coachDetails && coachDetails.data.status === 'Disable' &&
                            <div className='fixed bottom-[4rem] w-[90%]  rounded-xl md:w-96 md:relative md:bottom-0 md:top-4 h-[56px] z-30' >
                                <button className={`${ButtonStyles.addButton} w-full`} onClick={() => handleTriggerCoachStatus(coachDetails.data.status)}>
                                    <p>درخواست همکاری مجدد </p>
                                </button>
                            </div>
                    }

                    {
                        coachDetails && coachDetails.data.status === 'Active'  &&
                            <div className='fixed bottom-[4rem] w-[90%] rounded-xl md:w-96 md:relative md:bottom-0 md:top-4 h-[56px] z-30' >
                                <button className={`${ButtonStyles.normalButton} w-full`} onClick={() => handleTriggerCoachStatus(coachDetails.data.status)}>
                                    <p>پایان همکاری</p>
                                </button>
                            </div>
                    }
                    
            </div>
        </div>
    );
};

export default ClubCoachDetails;