import React from 'react';
import { Link, Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';

// mui
import { Avatar, useMediaQuery } from '@mui/material';
import { LinearProgress } from '@mui/material';
import Box from '@mui/material/Box';

// styles
import ButtonStyles from '../../../../styles/Buttons/ButtonsBox.module.css'

// assets
import ClockIcon from '../../../../components/icons/ClockIcon';
import FlightQuantity from '../../../../components/icons/FlightQuantity';
import ArrowButton from '../../../../components/icons/ArrowButton';
import UserIcon from '../../../../components/icons/UserIcon';
import { useACourseStudent, useCourseStudentFlights, useStudentPendingFlightCounts } from '../../../../Utilities/Services/coursesQueries';

const CourseStudentDetails = () => {

    const location = useLocation();
    const navigate = useNavigate();
    
    const { studentId } = useParams();
    
    const historyPageUrl = Cookies.get('lastPathForStudentDetails') || null;

    const isMobile = useMediaQuery('(max-width:720px)');

    const { data: studentData } = useACourseStudent(studentId);
    const { data: studentPendingFlightCounts } = useStudentPendingFlightCounts(studentId);
    const { data: userFlights, isLoading: userFlightsLoading } = useCourseStudentFlights(studentId && studentId,1,10);


    return (
        <div className='flex flex-col py-20 items-center'>
            <div  className='w-full flex flex-col items-center gap-y-10 md:w-[70%]'>

                {/* the data box */}
                <div className={`w-[90%] min-h-52 rounded-3xl flex justify-between items-start pb-8 px-4 py-2  relative`}
                    style={{background:'var(--bg-output-default)', boxShadow:'var(--shadow-all)'}}
                >
                    { 
                    studentData && 
                    <div className='w-full flex flex-col justify-between gap-y-6'>

                        <div className='flex w-full justify-between items-center -mr-4'>
                            {/* avatar and name */}
                            <div className='w-full h-full flex flex-col justify-between items-center gap-y-6 pt-2'>
                                
                                {
                                    isMobile &&
                                    <h1 className='text-lg'>{studentData.data.name}</h1>
                                }

                                    
                                <Avatar
                                    src={ studentData.data.image?.path || ''} 
                                    alt='userPicture' 
                                    sx={{height:'100px', width:'100px', zIndex:'0'}}
                                />

                            </div>


                            {/* user name and level for desktop */}
                            {
                                !isMobile && studentData.data &&
                                <div className='w-full flex flex-col justify-center items-center gap-y-4'>
                                    <h1 className='text-lg'>{studentData.data.firstName}&nbsp;{studentData.data.lastName}</h1>
                                    <p className='text-xs text-lowOpacityWhite'>گواهینامه {studentData.data.levelName}</p>
                                </div>
                            }


                            {/* user studentData.data */}
                            <div className='w-full flex flex-col justify-between items-center gap-y-8 pt-2 mr-4'>

                                {
                                    isMobile && studentData.data &&
                                    <p className='text-xs text-lowOpacityWhite self-start'>
                                        وضعیت: 
                                        {
                                            studentData.data.status === 'Active' ?
                                            <span className='text-textAccent'> فعال </span>
                                            :
                                                studentData.data.status === 'Canceled' ?
                                                <span className='text-textError'> غیرفعال </span>
                                                :
                                                    studentData.data.status === 'Completed' ?
                                                    <span className='text-textAccent'> تایید شده </span>
                                                    :
                                                    studentData.data.status === 'Pending' ?
                                                    <span className='text-textWarning'> در انتظار تایید </span>
                                                    :
                                                    ''
                                        }
                                    </p>
                                }

                                <div className='w-full flex flex-col items-start justify-between gap-y-4 text-sm md:pr-[20%]'>
                                    <p className='flex gap-x-2'>
                                        <span className='w-5'>
                                            <FlightQuantity/>
                                        </span>
                                        تعداد پرواز {studentData.data.flightCounts}
                                    </p>
                                    <p className='flex gap-x-2'>
                                        <span className='w-5'>
                                            <ClockIcon/>
                                        </span>
                                        ساعت پرواز {studentData.data.flightHours}
                                    </p>
                                    {studentData.data.coachingHours && studentData.data.coachingHours > 0 &&
                                        <p className='flex gap-x-2'>
                                            <span className='w-5'>
                                                <ClockIcon/>
                                            </span>
                                            {studentData.data.coachingHours} ساعت مربی‌گری
                                        </p>
                                    }
                                    <p className='flex gap-x-2'>
                                    <span className='w-5'>
                                        <UserIcon/>
                                    </span>
                                        کد کاربری: {studentData.data.userId}
                                    </p>
                                </div>

                            </div>
                        </div>
                        
                        <div className='w-full flex flex-col justify-between items-center gap-y-4 '>
                            <div className='w-full flex justify-between'>
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
                                        backgroundColor: 'var(--bg-pop-up-header-footer)', 
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
                    <span className=' absolute left-4 top-4 w-6 h-6 transform'
                    onClick={() => navigate(historyPageUrl)}>
                        <ArrowButton />
                    </span>
                    
                </div>

                <div className={`${ButtonStyles.ThreeStickedButtonCont} sticky top-[6.7rem] bg-white z-10`}>
                    <Link to={`/education/courseDetails/studentDetails/${studentId}/practical`} className={`${ButtonStyles.ThreeStickedButtonButton} rounded-r-xl ${location.pathname === `/education/courseDetails/studentDetails/${studentId}/practical` ? ButtonStyles.activeYellow : ''}`} >
                        عملی
                        {
                            studentPendingFlightCounts && studentPendingFlightCounts.data > 0 &&
                                <span className='text-textError'>
                                    &nbsp;({studentPendingFlightCounts.data})
                                </span>
                        }
                    </Link>
                    <Link to={`/education/courseDetails/studentDetails/${studentId}/theory`} className={`${ButtonStyles.ThreeStickedButtonButton}  ${location.pathname === `/education/courseDetails/studentDetails/${studentId}/theory` ? ButtonStyles.activeYellow : ''}`} >تئوری</Link> 
                    <Link to={`/education/courseDetails/studentDetails/${studentId}/syllabi`} className={`${ButtonStyles.ThreeStickedButtonButton} rounded-l-xl  ${location.pathname === `/education/courseDetails/studentDetails/${studentId}/syllabi` ? ButtonStyles.activeYellow : ''}`} >وضعیت هنرجو</Link>
                </div>

                <div className='w-[90%]'>
                    <Outlet />
                </div>


            </div>
        </div>
    );
};

export default CourseStudentDetails;