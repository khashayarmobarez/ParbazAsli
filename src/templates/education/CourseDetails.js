import React, { useEffect, useRef, useState } from 'react';
import { Link, Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';

// styles
import boxStyles from '../../styles/Boxes/DataBox.module.css'
import ButtonStyles from '../../styles/Buttons/ButtonsBox.module.css'

// mui
import { Box, CircularProgress } from '@mui/material';

// queries
import { useACourse, useTriggerCourseStatus } from '../../Utilities/Services/coursesQueries';

// components
import PageTitle from '../../components/reuseable/PageTitle';
import { toast } from 'react-toastify';
import StandardPopup from '../../components/reuseable/StandardPopup';
import LowOpacityBackForStickedButtons from '../../components/reuseable/LowOpacityBackForStickedButtons';

const CourseDetails = () => {
    
    const navigate = useNavigate()
    const location = useLocation()

    const appTheme = Cookies.get('themeApplied') || 'dark';

    const { id } = useParams();

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
                    toast('دوره شما با موفقیت فعال شد', {
                        type: 'success',
                        position: 'top-right',
                        autoClose: 5000,
                        theme: appTheme,
                        style: { width: "90%" }
                    });
                    refetchCourseData()
                } else if(status === 'Disable') {
                    toast('دوره با موفقیت غیرفعال شد', {
                        type: 'success',
                        position: 'top-right',
                        autoClose: 5000,
                        theme: appTheme,
                        style: { width: "90%" }
                    });
                    refetchCourseData()

                } else if(status === 'Rejected') {
                    toast('دوره با موفقیت رد شد', {
                        type: 'success',
                        position: 'top-right',
                        autoClose: 5000,
                        theme: appTheme,
                        style: { width: "90%" }
                    });
                    refetchCourseData()
                    navigate('/education')
                }
            },
        });
    }



    return (
        <div className='flex flex-col mt-14 items-center'>
            <div  className='w-full flex flex-col items-center gap-y-6 md:w-[70%] lg:gap-y-12 lg:w-[55%]'>

                <PageTitle title={'جزئیات دوره'} navigateTo={'/education'} /> 

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
                                    <p className=' text-xs pr-2'>نام</p>
                                    <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl text-sm`}  id='data' >
                                        <p>{aCourseData.data.name}</p>
                                    </div>
                                </div>

                                <div className='flex flex-col items-start gap-y-1 col-span-4 md:col-span-2'>
                                    <p className=' text-xs pr-2'>نوع</p>
                                    <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl text-sm`}  id='data' >
                                        {aCourseData.data.type === 'Regular' && <p>مطابق سیلابس</p> }
                                        {aCourseData.data.type === 'Retraining' && <p>بازآموزی</p> }
                                        {aCourseData.data.type === 'Custom' && <p>شخصی‌سازی شده</p> }
                                    </div>
                                </div>

                                {
                                    aCourseData.data.organization &&
                                    <div className='flex flex-col items-start gap-y-1 col-span-4 md:col-span-2'>
                                        <p className=' text-xs pr-2'>ارگان</p>
                                        <div className= {`${boxStyles.classDetailsData} flex justify-start items-center pr-4 w-full h-12 rounded-xl text-xs`}  id='data' >
                                            <p>{aCourseData.data.organization}</p>
                                        </div>
                                    </div>
                                }

                                {
                                    aCourseData.data.level &&
                                    <div className='flex flex-col items-start gap-y-1 col-span-4 md:col-span-2'>
                                        <p className=' text-xs pr-2'>مقطع</p>
                                        <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl text-sm`}  id='data' >
                                            <p>{aCourseData.data.level}</p>
                                        </div>
                                    </div>
                                }

                                <div className='flex flex-col items-start gap-y-1 col-span-4 md:col-span-1'>
                                    <p className=' text-xs pr-2'>تعداد پرواز</p>
                                    <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl text-sm`}  id='data' >
                                        <p>{aCourseData.data.flightsCount}</p>
                                    </div>
                                </div>

                                {
                                    aCourseData.data.clubName &&
                                    <div className='flex flex-col items-start gap-y-1 col-span-4 md:col-span-1'>
                                        <p className=' text-xs pr-2'>نام باشگاه</p>
                                        <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl text-sm`}  id='data' >
                                            <p>{aCourseData.data.clubName}</p>
                                        </div>
                                    </div>
                                }

                                <div className='flex flex-col items-start gap-y-1 col-span-4 md:col-span-1'>
                                    <p className=' text-xs pr-2'>وضعیت</p>
                                    <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 gap-x-2 w-full h-12 rounded-xl text-sm`}  id='data' >
                                        {aCourseData && aCourseData.data.status === 'Active' && 
                                            <>
                                                <p>فعال</p>
                                                {/* below is a circle to show status of the app with color */}
                                                {/* <div className='w-3 h-3 rounded-full ' style={{backgroundColor:'var(--text-accent)'}}></div> */}
                                            </>
                                        }
                                        {aCourseData && aCourseData.data.status === 'Pending' &&
                                            <>
                                                <p>در انتظار تایید</p>
                                                {/* below is a circle to show status of the app with color */}
                                                {/* <div className='w-3 h-3 rounded-full' style={{backgroundColor:'var(--text-default)'}}></div> */}
                                            </>
                                        }
                                        {aCourseData && aCourseData.data.status === 'Disable' &&
                                            <>
                                                <p>غیرفعال</p>
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
                                    <p>توضیحات درباره دوره</p>
                                    <p className='border-solid border-[1px] rounded-3xl p-4 text-sm min-h-14 w-full text-right'>{aCourseData.data.description}</p>
                                </div>
                            }   

                            <p onClick={() => setShowExtra(!showExtra)}
                            className='w-full px-6 text-sm text-textAccent text-start self-start'>
                                {showExtra ? 'بستن' : 'بیشتر ...'}
                            </p>

                        </div>

                        <LowOpacityBackForStickedButtons />

                        <div className={`${ButtonStyles.ThreeStickedButtonCont} sticky top-[8.2rem] lg:top-[9rem] z-10`}>
                            <Link 
                                to={`/education/courseDetails/${id}/students`} 
                                className={`${ButtonStyles.ThreeStickedButtonButton} rounded-r-xl ${location.pathname === `/education/courseDetails/${id}/students` ? ButtonStyles.activeYellow : ''} `} >
                                هنرجویان
                            </Link> 
                            <Link 
                                to={`/education/courseDetails/${id}/classes`} 
                                className={`${ButtonStyles.ThreeStickedButtonButton}  ${location.pathname === `/education/courseDetails/${id}/classes` ? ButtonStyles.activeYellow : ''}`} >
                                کلاس تئوری
                            </Link> 
                            <Link 
                                to={`/education/courseDetails/${id}/syllabi`}  
                                className={`${ButtonStyles.ThreeStickedButtonButton} rounded-l-xl ${location.pathname === `/education/courseDetails/${id}/syllabi` ? ButtonStyles.activeYellow : ''} `} >
                                سرفصل‌ها
                            </Link>
                        </div>

                        <div className='w-[90%]'>
                            <Outlet />
                        </div>
                        
                        {
                            aCourseData.data.status === 'Active' && !aCourseData.data.clubName &&
                            <button className={`${ButtonStyles.normalButton} fixed bottom-[4.4rem] w-[90%] md:w-2/6 text-base z-50`} 
                            onClick={() => setShowPopup(true)} >
                                <p>غیر فعال سازی</p>
                            </button>
                        }
                        
                        {
                            aCourseData.data.status === 'Disable' && !aCourseData.data.clubName &&
                            <button className={`${ButtonStyles.normalButton} fixed bottom-[4.4rem] w-[90%] md:w-2/6 text-base z-50`} 
                                onClick={(event) => !triggerCourseStatusLoading && handleTriggerCourseStatus(event, 'Active', id)} >
                                <p>فعال سازی</p>
                            </button>
                        }
                        {
                            aCourseData.data.status === 'Pending' &&
                                <div className='w-[90%] md:w-2/6 fixed bottom-[70px] flex justify-between z-[70] gap-x-[6%]'>
                                    <button className={`${ButtonStyles.addButton} w-full text-base`} 
                                        onClick={(event) => !triggerCourseStatusLoading && handleTriggerCourseStatus(event, 'Active', id)} >
                                        <p>تایید</p>
                                    </button>
                                    <button className={`${ButtonStyles.normalButton} w-full text-base`} 
                                        onClick={(event) => !triggerCourseStatusLoading && handleTriggerCourseStatus(event, 'Rejected', id)} >
                                        <p>رد</p>
                                    </button>
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
                topicText='تاییدیه' explanationtext='پس از غیرفعال کردن دوره کاربران فعال این دوره تا پایان دوران دوره خود حق ثبت پرواز دارند ولی کاربر جدیدی به دوره افزوده نمیشود. آیا از غیرفعال کردن این دوره اطمینان دارید؟'
                submitText='بله' declineText='خیر' />
            </div>

        </div>
    );
};

export default CourseDetails;