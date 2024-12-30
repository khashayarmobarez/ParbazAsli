import React, {  useState } from 'react';
import { Link, Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';

// styles
import boxStyles from '../../../styles/Boxes/DataBox.module.css'
import ButtonStyles from '../../../styles/Buttons/ButtonsBox.module.css'

// mui
import { Box, CircularProgress } from '@mui/material';

// queries
import { useGetClubCourse, useTriggerClubCourseStatus } from '../../../Utilities/Services/clubQueries';

// components
import PageTitle from '../../../components/reuseable/PageTitle';
import { toast } from 'react-toastify';
import StandardPopup from '../../../components/reuseable/StandardPopup';
import LowOpacityBackForStickedButtons from '../../../components/reuseable/LowOpacityBackForStickedButtons';

const ClubCourseDetails = () => {
    
    const navigate = useNavigate()
    const location = useLocation()  
    const appTheme = Cookies.get('themeApplied') || 'dark';

    const { id } = useParams();

    const historyPageUrl = Cookies.get('lastPathForClubCourseDetails') || null;
    Cookies.set('lastPathForClubStudentDetails', location.pathname);

    const [showPopup, setShowPopup] = useState(false);
    const [showExtra, setShowExtra ] = useState(false);

    const { data: aCourseData, isLoading: courseDataLoading, error: courseDataError, refetch: refetchCourseData } = useGetClubCourse(id);

    const { mutate: triggerCourseStatus, isLoading: triggerCourseStatusLoading } = useTriggerClubCourseStatus();


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
                    navigate('/club/courseDetails')
                }
            },
        });
    }



    return (
        <div className='flex flex-col mt-14 items-center'>
            <div  className='w-full flex flex-col items-center gap-y-6 md:w-[70%] lg:gap-y-12'>

                <PageTitle title={'جزئیات دوره'} navigateTo={historyPageUrl} /> 

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
                        <div className={` ${boxStyles.classDetails} w-[90%] rounded-xl flex flex-col items-center py-6 gap-y-6 -mb-2 z-[60]`}>

                            <div className=' grid grid-cols-8 gap-x-4 gap-y-4 w-full px-4 md:grid-cols-14 md:gap-y-0 '>

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
                                        
                                        {
                                        aCourseData.data.status === 'Active' && 
                                            <>
                                                <p className=''>فعال</p>
                                            </>
                                        }

                                        {
                                        aCourseData.data.status === 'Pending' &&
                                            <>
                                                <p className=''>در انتظار تایید</p>
                                            </>
                                        }

                                        {
                                        aCourseData.data.status === 'Disable' &&
                                            <>
                                                <p className=''>غیرفعال</p>
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
                                    <p className={`${boxStyles.classDetailsData} p-4 text-sm min-h-14 w-full text-right`}>{aCourseData.data.description}</p>
                                </div>
                            }   

                            <p onClick={() => setShowExtra(!showExtra)}
                            className='w-full px-6 text-sm text-textAccent text-start self-start'>
                                {showExtra ? 'کمتر ...' : 'بیشتر ...'}
                            </p>

                        </div>

                        <LowOpacityBackForStickedButtons />

                        <div className={`${ButtonStyles.ThreeStickedButtonCont} sticky top-[8.2rem] lg:top-[9rem] z-50`}>
                            <Link 
                                to={`/club/courseDetails/${id}/students`} 
                                className={`${ButtonStyles.ThreeStickedButtonButton} rounded-r-xl ${location.pathname === `/club/courseDetails/${id}/students` ? ButtonStyles.activeYellow : ''} `} >
                                هنرجویان
                            </Link> 
                            <Link 
                                to={aCourseData.data.status === 'Pending' ? '#' : `/club/courseDetails/${id}/classes`} 
                                className={`${aCourseData.data.status === 'Pending' ? ButtonStyles.ThreeStickedButtonButtonDisable : ButtonStyles.ThreeStickedButtonButton} 
                                ${aCourseData.data.status === 'Pending' && 'opacity-55'} ${location.pathname === `/club/courseDetails/${id}/classes` ? ButtonStyles.activeYellow : ''}`} >
                                کلاس تئوری
                            </Link> 
                            <Link 
                                to={`/club/courseDetails/${id}/syllabi`}  
                                className={`${ButtonStyles.ThreeStickedButtonButton} rounded-l-xl ${location.pathname === `/club/courseDetails/${id}/syllabi` ? ButtonStyles.activeYellow : ''} `} >
                                سرفصل‌ها
                            </Link>
                        </div>

                        <div className='w-[90%]'>
                            <Outlet />
                        </div>
                        
                        {
                            aCourseData.data.status === 'Active' && !aCourseData.data.clubName &&
                            <div className='fixed bottom-[4.2rem] w-[90%] md:w-2/6 z-10'>
                                <div className="relative z-10">
                                    <button 
                                        className={`${ButtonStyles.normalButton} w-full text-base`} 
                                        onClick={() => setShowPopup(true)}
                                    >
                                        <p>غیر فعال سازی</p>
                                    </button>
                                </div>
                                <div className="bg-bgPageMain opacity-90 h-8 w-full -mt-4 relative z-0" />
                            </div>
                        }
                        
                        {
                            aCourseData.data.status === 'Disable' && !aCourseData.data.clubName &&
                            <div className='fixed bottom-[4.2rem] w-[90%] md:w-2/6 z-10'>
                                <div className="relative z-10">
                                    <button 
                                        className={`${ButtonStyles.addButton} w-full text-base`} 
                                        onClick={(event) => !triggerCourseStatusLoading && handleTriggerCourseStatus(event, 'Active', id)}
                                    >
                                        <p>فعال سازی</p>
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
                showPopup={showPopup} setShowPopup={setShowPopup} 
                loading={triggerCourseStatusLoading} 
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

export default ClubCourseDetails;