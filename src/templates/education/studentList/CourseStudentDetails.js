import React from 'react';
import { Link, Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';

// mui
import { Avatar, useMediaQuery } from '@mui/material';
import { LinearProgress } from '@mui/material';
import Box from '@mui/material/Box';

// styles
import ButtonStyles from '../../../styles/ButtonsBox.module.css'

// assets
import ClockIcon from '../../../elements/icons/ClockIcon';
import FlightQuantity from '../../../elements/icons/FlightQuantity';
import UserIcon from '../../../elements/icons/UserIcon';
import { useACourseStudent, useStudentPendingPracticalActivityCount } from '../../../Utilities/Services/coursesQueries';
import PageTitle from '../../../elements/reuseable/PageTitle';
import LowOpacityBackForStickedButtons from '../../../elements/reuseable/LowOpacityBackForStickedButtons';

// context
import { useTranslation } from '../../../Utilities/context/TranslationContext';
import UserDefaultProfilePic from '../../../elements/reuseable/UserDefaultProfilePic';

const CourseStudentDetails = () => {
    
    // language
    const { t } = useTranslation();
    const dir = Cookies.get('dir') || 'ltr';

    const location = useLocation();
    const navigate = useNavigate();

    const isForClub = location.pathname.includes('/club')
    
    const { studentId } = useParams();
    
    const historyPageUrl = Cookies.get('lastPathForStudentDetails') || null;
    const ClubhistoryPageUrl = Cookies.get('lastPathForClubStudentDetails') || null;    

    const isMobile = useMediaQuery('(max-width:720px)');

    const { data: studentData } = useACourseStudent(studentId);
    const { data: studentPendingFlightCounts } = useStudentPendingPracticalActivityCount(studentId);


    return (
        <div className='flex flex-col py-14 items-center'>
            
            <div  className='w-full flex flex-col items-center gap-y-4 md:w-[70%]'>

                <PageTitle navigateTo={isForClub ? ClubhistoryPageUrl : historyPageUrl} title={t("education.StudentCourseDetails.studentDetails")} />

                {/* the data box */}
                <div className={`w-[90%] min-h-52 rounded-3xl flex justify-between items-start relative z-[60]`}
                style={{background:'var(--bg-output-default)', boxShadow:'var(--shadow-all)'}}
                >
                    { 
                    studentData && 
                    <div className='w-full flex flex-col justify-between gap-y-4 p-4'>

                        <div className='flex w-full justify-between items-center '>
                            {/* avatar and name */}
                            <div className='w-full h-full flex flex-col justify-between items-start gap-y-4'>
                                
                                {
                                isMobile &&
                                    <h1 className='text-base'>{studentData.data.name}</h1>
                                }

                                {
                                    studentData.data.image ?
                                    <Avatar
                                        src={ studentData.data.image?.path || ''} 
                                        alt='userPicture' 
                                        sx={{height:'100px', width:'100px', zIndex:'0'}}
                                    />
                                    :
                                    <div className='w-[100px] h-[100px]'>
                                        <UserDefaultProfilePic />
                                    </div>
                                }

                            </div>


                            {/* user name and level for desktop */}
                            {
                                !isMobile && studentData.data &&
                                <div className='w-full flex flex-col justify-center items-center gap-y-4'>
                                    <h1 className='text-sm'>{studentData.data.firstName}&nbsp;{studentData.data.lastName}</h1>
                                    <p className='text-xs text-lowOpacityWhite'>{t("education.StudentCourseDetails.studentStatus")} {studentData.data.levelName}</p>
                                </div>
                            }


                            {/* user studentData.data */}
                            <div className='w-full flex flex-col justify-between items-center gap-y-8 pt-1 '>

                                {
                                    isMobile && studentData.data &&
                                    <p className='text-xs text-lowOpacityWhite self-start'>
                                        وضعیت: 
                                        {
                                            studentData.data.status === 'Active' ?
                                            <span className='text-textAccent'> {t("education.StudentCourseDetails.active")} </span>
                                            :
                                                studentData.data.status === 'Canceled' ?
                                                <span className='text-textError'> {t("education.StudentCourseDetails.canceled")} </span>
                                                :
                                                    studentData.data.status === 'Completed' ?
                                                    <span className='text-textAccent'> {t("education.StudentCourseDetails.completed")} </span>
                                                    :
                                                    studentData.data.status === 'Pending' ?
                                                    <span className='text-textWarning'> {t("education.StudentCourseDetails.pending")} </span>
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
                                        {t("education.StudentCourseDetails.flightCount")}: {studentData.data.flightCount}
                                    </p>
                                    <p className='flex gap-x-2'>
                                        <span className='w-5'>
                                            <ClockIcon/>
                                        </span>
                                        {t("education.StudentCourseDetails.flightHours")}: {studentData.data.flightHours}
                                    </p>
                                    {studentData.data.coachingHours && studentData.data.coachingHours > 0 &&
                                        <p className='flex gap-x-2'>
                                            <span className='w-5'>
                                                <ClockIcon/>
                                            </span>
                                            {studentData.data.coachingHours} {t("education.StudentCourseDetails.coachingHours")}
                                        </p>
                                    }
                                    <p className='flex gap-x-2'>
                                    <span className='w-5'>
                                        <UserIcon/>
                                    </span>
                                    {t("education.StudentCourseDetails.userId")}: {studentData.data.userId}
                                    </p>
                                </div>

                            </div>
                        </div>
                        
                        <div className='w-full flex flex-col justify-between items-center gap-y-4 '>
                            <div className='w-full flex justify-between text-base'>
                                <p>{t("education.StudentCourseDetails.progressPercent")}</p>
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
                    {/* <span className=' absolute left-4 top-4 w-6 h-6 transform'
                    onClick={() => navigate(historyPageUrl)}>
                        <ArrowButton />
                    </span> */}
                    
                </div>

                <LowOpacityBackForStickedButtons />

                <div className={`${ButtonStyles.ThreeStickedButtonCont} sticky top-[8.2rem] lg:top-[9rem] z-20`}>
                    
                    <Link 
                    to={isForClub ? `/club/courseDetails/studentDetails/${studentId}/practical` : `/education/courseDetails/studentDetails/${studentId}/practical`} 
                    className={`${ButtonStyles.ThreeStickedButtonButton} 
                    ${dir === 'ltr' ? 'rounded-l-xl' : 'rounded-r-xl'} 
                    ${location.pathname.includes('/practical') ? ButtonStyles.activeYellow : ''}`} 
                    >
                        {t("education.StudentCourseDetails.practical")}
                        {
                            studentPendingFlightCounts && studentPendingFlightCounts.data > 0 &&
                                <span className='text-textError'>
                                    &nbsp;({studentPendingFlightCounts.data})
                                </span>
                        }
                    </Link>

                    <Link 
                    to={isForClub ? `/club/courseDetails/studentDetails/${studentId}/theory` : `/education/courseDetails/studentDetails/${studentId}/theory`} 
                    className={`${ButtonStyles.ThreeStickedButtonButton}  
                    ${location.pathname.includes('/theory') ? ButtonStyles.activeYellow : ''}`} 
                    >
                        {t("education.StudentCourseDetails.theory")}
                    </Link> 

                    <Link 
                    to={isForClub ? `/club/courseDetails/studentDetails/${studentId}/syllabi` : `/education/courseDetails/studentDetails/${studentId}/syllabi`} 
                    className={`${ButtonStyles.ThreeStickedButtonButton}
                    ${dir === 'ltr' ? 'rounded-r-xl' : 'rounded-l-xl'}
                    ${location.pathname.includes('/syllabi') ? ButtonStyles.activeYellow : ''}`} 
                    >
                        {t("education.StudentCourseDetails.studentStatus")}
                    </Link>
                </div>

                <div className='w-[90%]'>
                    <Outlet />
                </div>


            </div>
        </div>
    );
};

export default CourseStudentDetails;