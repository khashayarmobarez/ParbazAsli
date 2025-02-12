import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';

// styles
import boxStyles from '../../styles/DataBox.module.css'
import ButtonStyles from '../../styles/ButtonsBox.module.css'

// mui
import { Box, CircularProgress } from '@mui/material';

// queries
import { useACourse, useTriggerCourseStatus } from '../../Utilities/Services/coursesQueries';

// components
import PageTitle from '../../elements/reuseable/PageTitle';
import { toast } from 'react-toastify';
import StandardPopup from '../../elements/reuseable/StandardPopup';
import LowOpacityBackForStickedButtons from '../../elements/reuseable/LowOpacityBackForStickedButtons';

// context
import { useTranslation } from '../../Utilities/context/TranslationContext';

const CourseDetails = () => {

    // language
    const { t } = useTranslation();
    const dir = Cookies.get('dir') || 'ltr';
    
    const navigate = useNavigate()
    const location = useLocation()

    const isForClub = location.pathname.includes('/club')
    const appTheme = Cookies.get('themeApplied') || 'dark';

    const { id } = useParams();

    const clubHistoryPageUrl = Cookies.get('lastPathForClubCourseDetails') || null;
    isForClub && Cookies.set('lastPathForClubStudentDetails', location.pathname);

    const [showPopup, setShowPopup] = useState(false);
    const [showExtra, setShowExtra ] = useState(false);

    const { data: aCourseData, isLoading: courseDataLoading, error: courseDataError, refetch: refetchCourseData } = useACourse(id);

    const { mutate: triggerCourseStatus, isLoading: triggerCourseStatusLoading } = useTriggerCourseStatus();

    const handleTriggerCourseStatus = (event ,status ,id) => {

        event.preventDefault();

        const triggerStatusForm = {
            courseId: id,
            status: status
        }

        triggerCourseStatus(triggerStatusForm, {
            onSuccess: () => {
                if(status === 'Active') {
                    toast(t("education.aCourseDetails.courseActivated"), {
                        type: 'success',
                        position: 'top-center',
                        autoClose: 5000,
                        theme: appTheme,
                        style: { width: "90%" }
                    });
                    refetchCourseData()
                } else if(status === 'Disable') {
                    toast(t("education.aCourseDetails.courseDeactivated"), {
                        type: 'success',
                        position: 'top-center',
                        autoClose: 5000,
                        theme: appTheme,
                        style: { width: "90%" }
                    });
                    refetchCourseData()

                } else if(status === 'Rejected') {
                    toast(t("education.aCourseDetails.courseRejected"), {
                        type: 'success',
                        position: 'top-center',
                        autoClose: 5000,
                        theme: appTheme,
                        style: { width: "90%" }
                    });
                    refetchCourseData()
                    isForClub ?
                        navigate('/club/courseDetails')
                        :
                        navigate('/education')
                }
            },
        });
    }



    return (
        <div className='flex flex-col mt-14 items-center'>
            <div  className='w-full flex flex-col items-center gap-y-6 md:w-[70%] lg:gap-y-12 lg:w-[55%]'>

                <PageTitle title={t("education.aCourseDetails.courseDetails")} navigateTo={isForClub ? clubHistoryPageUrl : '/education'} /> 

                {
                    courseDataLoading &&
                    <Box sx={{ display: 'flex', width:'full' , justifyContent:'center', marginTop:'4rem' }}>
                        <CircularProgress /> 
                    </Box>
                }

                {
                    courseDataError &&
                    <p className='w-full text-center'>مشکلی پیش اماده, دوباره تلاش کنید</p>
                }

                {
                    aCourseData &&
                    <>
                        <div className={` ${boxStyles.classDetails} w-[90%] rounded-xl flex flex-col items-center py-6 gap-y-6 z-[60] lg:-mb-10`}>

                            <div className=' grid grid-cols-8 gap-x-4 gap-y-4 w-full px-4 md:grid-cols-14 md:gap-y-0'>

                                <div className='flex flex-col items-start gap-y-1 col-span-4 md:col-span-2'>
                                    <p className=' text-xs pr-2'>{t("education.aCourseDetails.name")}</p>
                                    <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl text-sm`}  id='data' >
                                        <p>{aCourseData.data.name}</p>
                                    </div>
                                </div>

                                <div className='flex flex-col items-start gap-y-1 col-span-4 md:col-span-2'>
                                    <p className=' text-xs pr-2'>{t("education.aCourseDetails.type")}</p>
                                    <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl text-sm`}  id='data' >
                                        {aCourseData.data.type === 'Regular' && <p>{t("education.aCourseDetails.accordingToSyllabus")}</p> }
                                        {aCourseData.data.type === 'Retraining' && <p>{t("education.aCourseDetails.retraining")}</p> }
                                        {aCourseData.data.type === 'Custom' && <p>{t("education.aCourseDetails.customized")}</p> }
                                    </div>
                                </div>

                                {
                                    aCourseData.data.organization &&
                                    <div className='flex flex-col items-start gap-y-1 col-span-4 md:col-span-2'>
                                        <p className=' text-xs pr-2'>{t("education.aCourseDetails.organization")}</p>
                                        <div className= {`${boxStyles.classDetailsData} flex justify-start items-center pr-4 w-full h-12 rounded-xl text-xs`}  id='data' >
                                            <p>{aCourseData.data.organization}</p>
                                        </div>
                                    </div>
                                }

                                {
                                    aCourseData.data.level &&
                                    <div className='flex flex-col items-start gap-y-1 col-span-4 md:col-span-2'>
                                        <p className=' text-xs pr-2'>{t("education.aCourseDetails.level")}</p>
                                        <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl text-sm`}  id='data' >
                                            <p>{aCourseData.data.level}</p>
                                        </div>
                                    </div>
                                }

                                <div className='flex flex-col items-start gap-y-1 col-span-4 md:col-span-1'>
                                    <p className=' text-xs pr-2'>{t("education.aCourseDetails.flightsCount")}</p>
                                    <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl text-sm`}  id='data' >
                                        <p>{aCourseData.data.flightsCount}</p>
                                    </div>
                                </div>

                                {
                                    aCourseData.data.clubName &&
                                    <div className='flex flex-col items-start gap-y-1 col-span-4 md:col-span-1'>
                                        <p className=' text-xs pr-2'>{t("education.aCourseDetails.clubName")}</p>
                                        <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl text-sm`}  id='data' >
                                            <p>{aCourseData.data.clubName}</p>
                                        </div>
                                    </div>
                                }

                                <div className='flex flex-col items-start gap-y-1 col-span-4 md:col-span-1'>
                                    <p className=' text-xs pr-2'>{t("education.aCourseDetails.status")}</p>
                                    <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 gap-x-2 w-full h-12 rounded-xl text-sm`}  id='data' >
                                        {aCourseData && aCourseData.data.status === 'Active' && 
                                            <>
                                                <p>{t("education.aCourseDetails.active")}</p>
                                                {/* below is a circle to show status of the app with color */}
                                                {/* <div className='w-3 h-3 rounded-full ' style={{backgroundColor:'var(--text-accent)'}}></div> */}
                                            </>
                                        }
                                        {aCourseData && aCourseData.data.status === 'Pending' &&
                                            <>
                                                <p>{t("education.aCourseDetails.pending")}</p>
                                                {/* below is a circle to show status of the app with color */}
                                                {/* <div className='w-3 h-3 rounded-full' style={{backgroundColor:'var(--text-default)'}}></div> */}
                                            </>
                                        }
                                        {aCourseData && aCourseData.data.status === 'Disable' &&
                                            <>
                                                <p>{t("education.aCourseDetails.inactive")}</p>
                                                {/* below is a circle to show status of the app with color */}
                                                {/* <div className='w-3 h-3 rounded-full' style={{backgroundColor:'var(--text-error)'}}></div> */}
                                            </>
                                        }
                                    </div> 
                                </div> 
                            </div>

                            {/* show extra version */}
                            {
                            showExtra && 
                                <div className=' w-[90%] flex flex-col items-start justify-between gap-y-2' >
                                    <p>{t("education.aCourseDetails.courseDescription")}</p>
                                    <p className={`${boxStyles.classDetailsData} p-4 text-sm min-h-14 w-full ${dir === 'ltr' ? 'text-left' : 'text-right'}`}>{aCourseData.data.description}</p>
                                </div>
                            }   

                            {
                                aCourseData?.data.description.length > 0  && 
                                <p onClick={() => setShowExtra(!showExtra)}
                                className='w-full px-6 text-sm text-textAccent text-start self-start'>
                                    {showExtra ? t("education.aCourseDetails.close") : t("education.aCourseDetails.more")}
                                </p>
                            }

                        </div>

                        <LowOpacityBackForStickedButtons />

                        <div dir='rtl' className={`${ButtonStyles.ThreeStickedButtonCont} sticky top-[8.2rem] lg:top-[9rem] z-10`}>
                            <Link 
                                to={isForClub ? `/club/courseDetails/${id}/students` : `/education/courseDetails/${id}/students`} 
                                className={`${ButtonStyles.ThreeStickedButtonButton} rounded-r-xl 
                                ${(
                                    location.pathname === `/education/courseDetails/${id}/students` || location.pathname === `/club/courseDetails/${id}/students`)
                                    ? ButtonStyles.activeYellow : ''} `} 
                                >
                                {t("education.aCourseDetails.students")}
                            </Link> 
                            <Link 
                                to={isForClub ? `/club/courseDetails/${id}/classes` : `/education/courseDetails/${id}/classes`} 
                                className={`${ButtonStyles.ThreeStickedButtonButton}  
                                ${(location.pathname === `/education/courseDetails/${id}/classes` || location.pathname === `/club/courseDetails/${id}/classes`)
                                    ? ButtonStyles.activeYellow : ''}`} 
                                >
                                {t("education.aCourseDetails.theoryClasses")}
                            </Link> 
                            <Link 
                                to={isForClub ? `/club/courseDetails/${id}/syllabi` : `/education/courseDetails/${id}/syllabi`}  
                                className={`${ButtonStyles.ThreeStickedButtonButton} rounded-l-xl 
                                ${(location.pathname === `/education/courseDetails/${id}/syllabi` || location.pathname === `/club/courseDetails/${id}/syllabi`)
                                    ? ButtonStyles.activeYellow : ''} `} 
                                >
                                {t("education.aCourseDetails.syllabi")}
                            </Link>
                        </div>

                        <div className='w-[90%]'>
                            <Outlet />
                        </div>
                        
                        {
                            aCourseData.data.accesses.buttonStatus === 'Disable' && !aCourseData.data.clubName &&
                            <div className='fixed bottom-[4rem] w-[90%] md:w-2/6 z-50'>
                                <div className="relative z-10">
                                    <button 
                                        className={`${ButtonStyles.normalButton} w-full text-base`} 
                                        onClick={() => setShowPopup(true)}
                                    >
                                        <p>{t("education.aCourseDetails.deactivate")}</p>
                                    </button>
                                </div>
                                <div className="bg-bgPageMain opacity-90 h-8 w-full -mt-4 relative z-0" />
                            </div>
                        }
                        
                        {
                            aCourseData.data.accesses.buttonStatus === 'Enable' && !aCourseData.data.clubName &&
                            <div className='fixed bottom-[4rem] w-[90%] md:w-2/6 z-50'>
                                <div className="relative z-10">
                                    <button 
                                        className={`${ButtonStyles.addButton} w-full text-base`} 
                                        onClick={(event) => !triggerCourseStatusLoading && handleTriggerCourseStatus(event, 'Active', id)}
                                    >
                                        <p>{t("education.aCourseDetails.activate")}</p>
                                    </button>
                                </div>
                                <div className="bg-bgPageMain opacity-90 h-8 w-full -mt-4 relative z-0" />
                            </div>
                        }
                        {
                            aCourseData.data.accesses.buttonStatus === 'Confirmation' &&
                            <div className='fixed bottom-[70px] w-[90%] md:w-2/6 z-[70]'>
                                <div className="relative z-10 flex justify-between gap-x-[6%]">
                                    <button 
                                        className={`${ButtonStyles.addButton} w-full text-base`} 
                                        onClick={(event) => !triggerCourseStatusLoading && handleTriggerCourseStatus(event, 'Active', id)}
                                    >
                                        <p>{t("education.aCourseDetails.confirm")}</p>
                                    </button>
                                    <button 
                                        className={`${ButtonStyles.normalButton} w-full text-base`} 
                                        onClick={(event) => !triggerCourseStatusLoading && handleTriggerCourseStatus(event, 'Rejected', id)}
                                    >
                                        <p>{t("education.aCourseDetails.reject")}</p>
                                    </button>
                                </div>
                                <div className="bg-bgPageMain opacity-90 h-8 w-full -mt-4 relative z-0" />
                            </div>
                        }
                    </>
                }


            </div>

            <div className={` ${showPopup ? 'fixed' : 'hidden' }  w-full h-full z-[70] backdrop-blur-sm`}>
                <StandardPopup
                showPopup={showPopup} setShowPopup={setShowPopup} loading={triggerCourseStatusLoading}
                handleSubmit={(event) => {
                    !triggerCourseStatusLoading && handleTriggerCourseStatus(event, 'Disable', id);
                    setShowPopup(false);
                }}
                topicText={t("education.aCourseDetails.confirm")} explanationtext={t("education.aCourseDetails.confirmationMessage")}
                submitText={t("education.aCourseDetails.yes")} declineText={t("education.aCourseDetails.no")} />
            </div>

        </div>
    );
};

export default CourseDetails;