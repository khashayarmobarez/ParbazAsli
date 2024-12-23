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
import PageTitle from '../../../components/reuseable/PageTitle';


const ClubCoachDetails = () => {

    const navigate = useNavigate()
    const location = useLocation();
    
    // for handliung the back button of club course details
    Cookies.set('lastPathForClubCourseDetails',location.pathname)
    const appTheme = Cookies.get('themeApplied') || 'dark';

    const { id } = useParams();

    const {  data: coachDetails, isLoading: coachDetailsLoading } = useGetCoachDetails(id);
    const {  data: coachCoursesDetails } = useGetCoachCourses(id);
    const { mutate: triggerCoachStatus } = useTriggerCoachStatus();


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
                        theme: appTheme,
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
                        theme: appTheme,
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
                        theme: appTheme,
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
                        theme: appTheme,
                        style: { width: "90%" }
                    });
                }
            });

        }

    }


    return (
        <div className='w-full flex flex-col items-center pt-14 gap-y-6'>

            <div className='w-full flex flex-col items-center gap-y-6 md:w-[70%] lg:w-[55%] lg:gap-y-12'>

                <PageTitle title={'جزئیات مربی'} navigateTo={'/club/clubCoaches'} />

                <div className='w-[90%] flex flex-col items-center gap-y-6'>

                    {
                        coachDetailsLoading &&
                        <Box sx={{ display: 'flex', width:'full' , justifyContent:'center', marginTop:'10rem' }}>
                            <CircularProgress /> 
                        </Box>
                    }

                    {coachDetails &&
                        <div className='flex flex-col w-full justify-between items-center rounded-3xl text-sm min-h-16 p-6 gap-y-4 relative bg-bgOutputDefault'
                        style={{ boxShadow:'var(--shadow-all)'}}>

                            {/* <span className='absolute top-4 left-4 cursor-pointer w-6 h-6' onClick={() => navigate('/club/clubCoaches')}>
                                <ArrowButton />
                            </span> */}

                            <div className=' w-full flex items-center justify-between gap-y-4 pl-[15%] md:pl-[13%] lg:pl-[7%]'>
                                <p className='text-base' style={{color:'var(--text-accent)'}}>{coachDetails.data.name}</p>
                                <p className='text-textButtonMainDisabled'>
                                    وضعیت:
                                    {coachDetails.data.status === 'Active' && <span style={{color:'var(--text-accent)'}}> فعال</span>}
                                    {coachDetails.data.status === 'Pending' && <span style={{color:'var(--text-warning)'}}> در انتظار تایید</span>}
                                    {coachDetails.data.status === 'Disable' && <span className='text-textButtonMainDisabled'> غیر فعال</span>}
                                    {coachDetails.data.status === 'Rejected' && <span style={{color:'var(--text-error)'}}> رد شده</span>}
                                </p>
                            </div>

                            <div className='w-full flex items-center justify-between gap-y-4 bg'>

                                <Avatar src={coachDetails.data.profilePicture?.path || ''} alt="Remy Sharp" sx={{height:'100px', width:'100px', zIndex:'0'}} />

                                <div className='flex flex-col w-full h-full justify-around items-end gap-y-4 text-sm'>

                                    <div className=' flex justify-start items-center w-32' >
                                        <span className='w-5 h-5'>
                                            <UsersIcon/>
                                        </span>
                                        <p className=' font-normal text-xs mr-1  text-start'>تعداد هنرجویان: {coachDetails.data.studentsCount}</p>
                                    </div> 

                                    <div className=' flex justify-start items-center w-32' >
                                        <span className='w-5 h-5'>
                                            <ClockIcon/>
                                        </span>
                                        <p className=' font-normal text-xs mr-1  text-start'>{coachDetails.data.coachingHours} ساعت مربیگری</p>
                                    </div>

                                    <div className=' flex justify-start items-center w-32 -mt-1' >
                                        <span className='w-5 h-5' >
                                            <DocumentIcon/>
                                        </span>
                                        <p className=' font-normal text-xs mr-1 mt-[2px] text-start'>کد عضویت: {coachDetails.data.id}</p>
                                    </div>

                                </div>
                            </div>
                        </div>
                    }

                    {
                        coachCoursesDetails && coachCoursesDetails.data < 1 &&
                            <p className='w-full py-4 text-textWarning'>
                                <p>هنوز دوره ای برای این مربی ثبت نشده است</p>
                            </p>
                    }

                    {
                        coachCoursesDetails && coachCoursesDetails.data.map((course) => (
                            <div
                            key={course.id}
                            className="w-full justify-between items-center px-4 py-4 rounded-[1.6rem] flex flex-col gap-y-4 md:col-span-1 z-10 text-xs bg-bgOutputDefault"
                            style={{
                                boxShadow: 'var(--shadow-all)'
                            }}
                            >
                                <div className='w-full flex justify-between items-center'>

                                    <h1 className='text-sm'>{course.name}</h1>

                                    <div className='flex gap-x-1'>

                                        <p className='text-textButtonMainDisabled text-sm'>وضعیت:&nbsp; 
                                            
                                                {course.status === 'Active' && 
                                                    <span className='text-textAccent'>فعال</span>
                                                }
                                                {course.status === 'Pending' &&
                                                    <span className='text-textWarning'>در انتظار...</span>
                                                }
                                                {course.status === 'Disable' &&
                                                    <span className='text-textButtonMainDisabled'>غیر فعال</span>
                                                }
                                                {course.status === 'Rejected' &&
                                                    <span className='text-[var(--text-error)]'>رد شده</span>
                                                }
                                        </p>

                                    </div>

                                </div>

                                <div className='w-full flex justify-between items-start'>

                                    <div className='flex flex-col text-start gap-y-2 text-sm'>

                                        {
                                            course.organization &&
                                                <p className='text-sm'>
                                                    {course.organization}
                                                </p>
                                        }

                                        { course.clubName &&
                                            <p><span className=''>باشگاه:</span> {course.clubName}</p>
                                        }

                                        {
                                        course.level &&
                                            <p><span className=''>مقطع: </span> {course.level}</p>
                                        }
                                        <p><span className=''>تعداد پرواز:</span> {course.flightsCount}</p>

                                        

                                    </div>

                                    <div className='flex flex-col text-start gap-y-1 text-sm'>

                                            <p><span className=''>تعداد هنرجویان فعال:</span> {course.activeStudentCounts}</p>
                                        
                                            <p><span className=''>تعداد هنرجویان سابق:</span> {course.historyStudentCounts}</p>

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
                                <div className='fixed bottom-[4rem] w-[90%]  rounded-xl md:w-96 md:relative md:bottom-0 md:top-4 h-12 z-30' >
                                    <button className={`${ButtonStyles.addButton} w-full`} onClick={() => handleTriggerCoachStatus(coachDetails.data.status)}>
                                        <p>درخواست همکاری مجدد </p>
                                    </button>
                                </div>
                        }

                        {
                            coachDetails && coachDetails.data.status === 'Active'  &&
                                <div className='fixed bottom-[4.5rem] w-[90%] rounded-xl md:w-96 md:relative md:bottom-0 md:top-4 h-12 z-30' >
                                    <button className={`${ButtonStyles.normalButton} w-full`} onClick={() => handleTriggerCoachStatus(coachDetails.data.status)}>
                                        <p>پایان همکاری</p>
                                    </button>
                                </div>
                        }
                        
                </div>

            </div>
        </div>
    );
};

export default ClubCoachDetails;