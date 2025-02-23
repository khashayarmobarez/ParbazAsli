import React, { useEffect, useRef, useState } from 'react';
import { Link, Outlet, useLocation, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';

// styles
import boxStyles from '../../styles/DataBox.module.css'
import ButtonStyles from '../../styles/ButtonsBox.module.css'

// mui
import { Box, CircularProgress, LinearProgress } from '@mui/material';

// queries
import { useAUserCourse } from '../../Utilities/Services/StudentCoursesQueries';

// components
import PageTitle from '../../elements/reuseable/PageTitle';
import LowOpacityBackForStickedButtons from '../../elements/reuseable/LowOpacityBackForStickedButtons';

// context
import { useTranslation } from '../../Utilities/context/TranslationContext';

const MyCourseDetails = () => {

    const { t } = useTranslation();
    const dir = Cookies.get('dir') || 'ltr';
    
    const location = useLocation();
    const lastPath = Cookies.get('lastPathBeforMyCourseDetails') || '/myCourses';

    const { id } = useParams();

    const [extra, setExtra] = useState(false);

    const { data: aCourseData, isLoading: courseDataLoading, error: courseDataError } = useAUserCourse(id);

    // const { mutate: triggerCourseStatus, isLoading: triggerCourseStatusLoading } = useTriggerCourseStatus();


    // const handleTriggerCourseStatus = (event ,status ,id) => {

    //     event.preventDefault();

    //     const triggerStatusForm = {
    //         courseId: id,
    //         status: status
    //     }

    //     triggerCourseStatus(triggerStatusForm);
    // }



    return (
        <div className='flex flex-col mt-14 items-center'>
            <div className='w-full flex flex-col items-center gap-y-6 md:w-[70%] lg:gap-y-12 lg:w-[55%]'>

                <PageTitle title={t("myCourses.aCourseDetails.courseDetails")} navigateTo={lastPath} /> 

                {
                    courseDataLoading &&
                    <Box sx={{ display: 'flex', width:'full' , justifyContent:'center', marginTop:'4rem' }}>
                        <CircularProgress /> 
                    </Box>
                }

                {
                    courseDataError &&
                    <p className='w-full text-center'>{t("myCourses.aCourseDetails.errorMessage")}</p>
                }

                {
                    aCourseData &&
                    <>
                        <div className={` ${boxStyles.classDetails} w-[90%] rounded-xl flex flex-col items-center py-6 gap-y-8 -mb-3 z-[60] lg:-mb-10`}>

                            <div className=' grid grid-cols-8 gap-x-4 gap-y-4 w-full px-4 md:grid-cols-14 md:gap-y-0'>

                                <div className='flex flex-col items-start gap-y-1 col-span-4 md:col-span-2'>
                                    <p className=' text-xs pr-2'>{t("myCourses.aCourseDetails.name")}</p>
                                    <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl text-sm`}  id='data' >
                                        <p>{aCourseData.data.name}</p>
                                    </div>
                                </div>

                                <div className='flex flex-col items-start gap-y-1 col-span-4 md:col-span-2'>
                                    <p className=' text-xs pr-2'>{t("myCourses.aCourseDetails.type")}</p>
                                    <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl text-sm`}  id='data' >
                                        <p>
                                            {aCourseData.data.type === 'Regular' && <p>{t("myCourses.aCourseDetails.accordingToSyllabus")}</p> }
                                            {aCourseData.data.type === 'Retraining' && <p>{t("myCourses.aCourseDetails.retraining")}</p> }
                                            {aCourseData.data.type === 'Custom' && <p>{t("myCourses.aCourseDetails.customized")}</p> }
                                        </p>
                                    </div>
                                </div>

                                {
                                    aCourseData.data.organization &&
                                    <div className='flex flex-col items-start gap-y-1 col-span-4 md:col-span-2'>
                                        <p className=' text-xs pr-2'>{t("myCourses.aCourseDetails.organization")}</p>
                                        <div className= {`${boxStyles.classDetailsData} flex justify-start items-center pr-4 w-full h-12 rounded-xl text-xs`}  id='data' >
                                            <p>{aCourseData.data.organization}</p>
                                        </div>
                                    </div>
                                }

                                {
                                    aCourseData.data.level &&
                                    <div className='flex flex-col items-start gap-y-1 col-span-4 md:col-span-2'>
                                        <p className=' text-xs pr-2'>{t("myCourses.aCourseDetails.level")}</p>
                                        <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl text-sm`}  id='data' >
                                            <p>{aCourseData.data.level}</p>
                                        </div>
                                    </div>
                                }

                                <div className='flex flex-col items-start gap-y-1 col-span-4 md:col-span-1'>
                                    <p className=' text-xs pr-2'>{t("myCourses.aCourseDetails.flightsCount")}</p>
                                    <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl text-sm`}  id='data' >
                                        <p>{aCourseData.data.flightCount}</p>
                                    </div>
                                </div>

                                {
                                    aCourseData.data.clubName &&
                                    <div className='flex flex-col items-start gap-y-1 col-span-4 md:col-span-1'>
                                        <p className=' text-xs pr-2'>{t("myCourses.aCourseDetails.clubName")}</p>
                                        <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl text-sm`}  id='data' >
                                            <p>{aCourseData.data.clubName}</p>
                                        </div>
                                    </div>
                                }

                                {
                                    aCourseData.data.coach &&
                                    <div className='flex flex-col items-start gap-y-1 col-span-4 md:col-span-1'>
                                        <p className=' text-xs pr-2'>{t("myCourses.aCourseDetails.coachName")}</p>
                                        <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl text-sm`}  id='data' >
                                            <p>{aCourseData.data.coach}</p>
                                        </div>
                                    </div>
                                }

                                <div className='flex flex-col items-start gap-y-1 col-span-4 md:col-span-1'>
                                    <p className=' text-xs pr-2'>{t("myCourses.aCourseDetails.status")}</p>
                                    <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 gap-x-2 w-full h-12 rounded-xl text-sm`}  id='data' >
                                        {
                                        aCourseData.data.status === 'Active' && 
                                            <>
                                                <p>{t("myCourses.aCourseDetails.active")}</p>
                                                {/* <div className='w-3 h-3 rounded-full bg-textAccent'></div> */}
                                            </>
                                        }
                                        {
                                        aCourseData.data.status === 'Canceled' &&
                                            <>
                                                <p>{t("myCourses.aCourseDetails.canceled")}</p>
                                                {/* <div className='w-3 h-3 rounded-full bg-textError'></div> */}
                                            </>
                                        }
                                        {
                                        aCourseData.data.status === 'Completed' &&
                                            <>
                                                <p>{t("myCourses.aCourseDetails.completed")}</p>
                                                {/* <div className='w-3 h-3 rounded-full bg-textAccent'></div> */}
                                            </>
                                        }
                                    </div> 
                                </div>

                            </div>
                            
                            <Box sx={{ width: '90%', display:'flex', flexDirection:'column', rowGap:'1rem' }}>
                                <div className='w-full flex justify-between px-1 text-base'>
                                        <p>{t("myCourses.aCourseDetails.progressPercentage")}</p>
                                        <p>{aCourseData.data.percent}%</p>
                                </div>
                                <LinearProgress variant="determinate" value={aCourseData.data.percent > 3 ? aCourseData.data.percent : aCourseData.data.percent + 3} 
                                sx={{ height:'1rem', borderRadius:'1rem', backgroundColor :'var(--progress-bar-bg)', '& .MuiLinearProgress-bar': {
                                    borderRadius:'1rem',backgroundColor: aCourseData.data.percent < 100 ? 'var(--text-warning)' : 'var(--text-accent)' // Change this to your desired color
                                }}} />
                            </Box>

                            {
                                !extra && aCourseData.data.description &&
                                <p onClick={() => setExtra(true)} className='text-textAccent font-medium text-base cursor-pointer self-start text-start mx-[5vw]'>
                                    {t("myCourses.aCourseDetails.more")}
                                </p>
                            }
                            
                            {
                                extra &&
                                <div className=' w-[90%] flex flex-col items-start justify-between gap-y-2' >
                                    <p>{t("myCourses.aCourseDetails.courseDescription")}</p>
                                    <p className={`${boxStyles.classDetailsData} p-4 text-sm min-h-14 w-full text-right`}>{aCourseData.data.description}</p>
                                </div>
                            }

                        </div>

                        <LowOpacityBackForStickedButtons />

                        <div className={`${ButtonStyles.ThreeStickedButtonCont} sticky top-[8.2rem] lg:top-[9rem] z-50`}>
                            <Link 
                            to={`/MyCourses/courseDetails/${id}/practical`} 
                            className={`${ButtonStyles.ThreeStickedButtonButton} 
                            ${dir === 'ltr' ? 'rounded-l-xl' : 'rounded-r-xl'}
                            ${location.pathname === `/MyCourses/courseDetails/${id}/practical` ? ButtonStyles.activeYellow : ''}`} >
                            {t("myCourses.aCourseDetails.practical")}
                            </Link> 
                            <Link 
                            to={`/MyCourses/courseDetails/${id}/theory`} 
                            className={`${ButtonStyles.ThreeStickedButtonButton}  ${location.pathname === `/MyCourses/courseDetails/${id}/theory` ? ButtonStyles.activeYellow : ''}`} >
                            {t("myCourses.aCourseDetails.theory")}
                            </Link> 
                            <Link 
                            to={`/MyCourses/courseDetails/${id}/mySyllabi`} 
                            className={`${ButtonStyles.ThreeStickedButtonButton} 
                            ${dir === 'ltr' ? 'rounded-r-xl' : 'rounded-l-xl'}
                            ${location.pathname === `/MyCourses/courseDetails/${id}/mySyllabi` ? ButtonStyles.activeYellow : ''}`} >
                            {t("myCourses.aCourseDetails.myStatus")}
                            </Link>
                        </div>

                        <div className='w-[90%]'>
                            <Outlet />
                        </div>

                        {/* <button className={`${ButtonStyles.normalButton} fixed bottom-[3.75rem] w-[90%] text-base`} 
                        onClick={(event) => !triggerCourseStatusLoading && handleTriggerCourseStatus(event, 'rejected', id)} >
                            <p>آرشیو دوره</p>
                        </button> */}
                    </>
                }


            </div>
        </div>
    );
};

export default MyCourseDetails;