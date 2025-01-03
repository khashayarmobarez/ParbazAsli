import React from 'react';
import { Link, Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';

// mui
import { Avatar, useMediaQuery } from '@mui/material';
import { LinearProgress } from '@mui/material';
import Box from '@mui/material/Box';

// styles
import ButtonStyles from '../../../styles/Buttons/ButtonsBox.module.css'

// queries
import { useGetClubCourseStudent } from '../../../Utilities/Services/clubQueries';

// assets
import ClockIcon from '../../../components/icons/ClockIcon';
import FlightQuantity from '../../../components/icons/FlightQuantity';
import ArrowButton from '../../../components/icons/ArrowButton';
import PageTitle from '../../../components/reuseable/PageTitle';
import LowOpacityBackForStickedButtons from '../../../components/reuseable/LowOpacityBackForStickedButtons';

const ClubCourseStudentDetails = () => {

    const location = useLocation();
    
    const { courseId,studentId } = useParams();
    const navigate = useNavigate();

    const isMobile = useMediaQuery('(max-width:720px)');

    const historyPageUrl = Cookies.get('lastPathForClubStudentDetails') || null;

    const { data: studentData } = useGetClubCourseStudent(studentId)


    return (
        <div className='flex flex-col py-16 items-center'>
            <div  className='w-full flex flex-col items-center gap-y-6 md:w-[70%] lg:w-[55%]'>

                <PageTitle title={'جزئیات هنرجو '} navigateTo={historyPageUrl} /> 

                <div className={`w-[90%] min-h-52 rounded-3xl flex justify-between items-start p-[18px] relative bg-bgOutputDefault -mb-2 z-[60]`}
                style={{ boxShadow:'var(--shadow-all)'}}>
                    { 
                    studentData && 
                    <div className='w-full flex flex-col justify-between items-center gap-y-6'>

                        <div className='flex w-full justify-between items-start'>
                            {/* avatar and name */}
                            <div className='w-full h-full flex flex-col justify-between items-start gap-y-4'>  
                                
                                {
                                    isMobile &&
                                    <h1 className='text-sm '>{studentData.data.name}</h1>
                                }

                                <Avatar alt='user picture'  src={ studentData.data.image?.path || ''} sx={{height:'99px', width:'100px', zIndex:'0'}}/>

                            </div>


                            {/* user name and level for desktop */}
                            {
                                !isMobile && studentData.data &&
                                <div className='w-full flex flex-col justify-center items-center gap-y-4'>
                                    <h1 className='text-lg '>{studentData.data.firstName}&nbsp;{studentData.data.lastName}</h1>
                                    <p className='text-xs text-lowOpacityWhite'>گواهینامه {studentData.data.levelName}</p>
                                </div>
                            }


                            {/* user studentData.data */}
                            <div className='w-full flex flex-col justify-between items-start gap-y-6'>

                                {
                                    isMobile && studentData.data &&
                                    <p className='text-xs text-textButtonMainDisabled'>
                                        وضعیت: 
                                        {
                                            studentData.data.status === 'Active' ?
                                            <span className='text-[var(--text-accent)]'> فعال </span>
                                            :
                                                studentData.data.status === 'Canceled' ?
                                                <span className='text-[var(--text-error)]'> غیرفعال </span>
                                                :
                                                    studentData.data.status === 'Completed' ?
                                                    <span className='text-[var(--text-accent)]'> تایید شده </span>
                                                    :
                                                    studentData.data.status === 'Pending' ?
                                                    <span className='text-[var(--text-warning)]'> در انتظار تایید </span>
                                                    :
                                                    ''
                                        }
                                    </p>
                                }

                                <div className='w-full flex flex-col items-start justify-between gap-y-2  text-sm md:pr-[20%]'>
                                    <p className='flex gap-x-2'>
                                        <span className='w-5 h-5'>
                                            <FlightQuantity/>
                                        </span>
                                        {studentData.data.flightCounts} تعداد پرواز
                                    </p>
                                    <p className='flex gap-x-2'>
                                        <span className='w-5 h-5'>
                                            <ClockIcon/>
                                        </span>
                                        {studentData.data.flightHours} ساعت پرواز
                                    </p>
                                    {studentData.data.coachingHours && studentData.data.coachingHours > 0 &&
                                        <p className='flex gap-x-2'>
                                            <span className='w-5 h-5'>
                                                <ClockIcon/>
                                            </span>
                                            {studentData.data.coachingHours} ساعت مربی‌گری
                                        </p>
                                    }
                                    <p className='flex gap-x-2'>
                                        <span className='w-5 h-5'>
                                            <FlightQuantity/>
                                        </span>
                                        کد کاربری: {studentData.data.userId}
                                    </p>
                                </div>

                            </div>
                        </div>
                        
                        <div className='w-full flex flex-col justify-between items-center gap-y-2'>
                            <div className='w-full flex justify-between text-base'>
                                <p>درصد پیشرفت</p>
                                <p>{studentData.data.percent}%</p>
                            </div>
                            <Box sx={{ width: '100%' }}>
                                <LinearProgress 
                                    variant="determinate" 
                                    value={studentData.data.percent + (studentData.data.percent < 2 ? 2 : 0)} 
                                    sx={{ 
                                        height: '1rem', 
                                        borderRadius: '1rem', 
                                        backgroundColor: 'var(--progress-bar-bg)', 
                                        '& .MuiLinearProgress-bar': {
                                            backgroundColor: 
                                            studentData.data.status === 'Active' ? 'var(--text-warning)' :
                                            studentData.data.status === 'Completed' ? 'var(--text-accent)' :
                                            studentData.data.status === 'Canceled' ? 'var(--text-error)' :
                                            undefined, // Optional: A default value if none of the conditions match
                                        }
                                    }} 
                                    />
                            </Box>
                        </div>
                    </div>
                    }

                    {/* back button */}
                    {/* <span className='absolute left-4 top-3 w-6 h-6'
                    onClick={() => {navigate(historyPageUrl); console.log(document.referrer);}}>
                        <ArrowButton />
                    </span> */}
                    
                </div>

                <LowOpacityBackForStickedButtons />

                <div className={`${ButtonStyles.ThreeStickedButtonCont} sticky top-[8.2rem] lg:top-[9rem] z-50`}>
                    <Link to={`/club/courseDetails/studentDetails/${studentId}/practical`} className={`${ButtonStyles.ThreeStickedButtonButton} rounded-r-xl ${location.pathname === `/club/courseDetails/studentDetails/${studentId}/practical` ? ButtonStyles.activeYellow : ''}`} >عملی</Link> 
                    <Link to={`/club/courseDetails/studentDetails/${studentId}/theory`} className={`${ButtonStyles.ThreeStickedButtonButton}  ${location.pathname === `/club/courseDetails/studentDetails/${studentId}/theory` ? ButtonStyles.activeYellow : ''}`} >تئوری</Link> 
                    <Link to={`/club/courseDetails/studentDetails/${studentId}/syllabi`} className={`${ButtonStyles.ThreeStickedButtonButton} rounded-l-xl  ${location.pathname === `/club/courseDetails/studentDetails/${studentId}/syllabi` ? ButtonStyles.activeYellow : ''}`} >وضعیت هنرجو</Link>
                </div>

                <div className='w-[90%]'>
                    <Outlet />
                </div>


            </div>
        </div>
    );
};

export default ClubCourseStudentDetails;