import React, { useEffect, useRef, useState } from 'react';
import { Link, Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';

// styles
import boxStyles from '../../../../styles/Boxes/DataBox.module.css'
import ButtonStyles from '../../../../styles/Buttons/ButtonsBox.module.css'

// mui
import { Box, CircularProgress } from '@mui/material';

// queries
import { useGetClubCourse, useTriggerClubCourseStatus } from '../../../../Utilities/Services/clubQueries';

// components
import PageTitle from '../../../reuseable/PageTitle';
import { toast } from 'react-toastify';
import StandardPopup from '../../../reuseable/StandardPopup';

const ClubCourseDetails = () => {
    
    const navigate = useNavigate()
    const location = useLocation()  

    const { id } = useParams();

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
                        theme: 'dark',
                        style: { width: "90%" }
                    });
                    refetchCourseData()
                } else if(status === 'Disable') {
                    toast('دوره با موفقیت غیرفعال شد', {
                        type: 'success',
                        position: 'top-right',
                        autoClose: 5000,
                        theme: 'dark',
                        style: { width: "90%" }
                    });
                    refetchCourseData()

                } else if(status === 'Rejected') {
                    toast('دوره با موفقیت رد شد', {
                        type: 'success',
                        position: 'top-right',
                        autoClose: 5000,
                        theme: 'dark',
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
            <div  className='w-full flex flex-col items-center gap-y-6 md:w-[70%]'>

                <PageTitle title={'جزئیات دوره'} navigateTo={'/club/clubCourses'} /> 

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
                        <div className={` ${boxStyles.classDetails} w-[90%] rounded-xl flex flex-col items-center py-6 gap-y-6`}>

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

                                    {/* show extra version */}
                                    {
                                    showExtra &&
                                        <div className='flex flex-col items-start gap-y-1 col-span-4 md:col-span-1'>
                                            <p className=' text-xs pr-2'>وضعیت</p>
                                            <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 gap-x-2 w-full h-12 rounded-xl text-sm`}  id='data' >
                                                {aCourseData.data.status === 'Active' && 
                                                    <>
                                                        <p>فعال</p>
                                                        <div className='w-3 h-3 rounded-full ' style={{backgroundColor:'var(--dark-green)'}}></div>
                                                    </>
                                                }
                                                {aCourseData.data.status === 'Pending' &&
                                                    <>
                                                        <p>در انتظار تایید</p>
                                                        <div className='w-3 h-3 rounded-full' style={{backgroundColor:'var(--red-text)'}}></div>
                                                    </>
                                                }
                                                {aCourseData.data.status === 'Disable' &&
                                                    <>
                                                        <p>غیرفعال</p>
                                                        <div className='w-3 h-3 rounded-full' style={{backgroundColor:'var(--red-text)'}}></div>
                                                    </>
                                                }
                                            </div> 
                                        </div>
                                    }   
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
                            className='w-full px-6 text-sm text-[var(--yellow-text)] text-start self-start'>
                                {showExtra ? 'بستن اطلاعات بیشتر' : 'نمایش اطلاعات بیشتر ...'}
                            </p>

                        </div>

                    
                        <div className={`${ButtonStyles.ThreeStickedButtonCont} sticky top-[6.7rem] bg-white z-10`}>
                            <Link 
                                to={`/club/courseDetails/${id}/students`} 
                                className={`${ButtonStyles.ThreeStickedButtonButton} rounded-r-xl ${location.pathname === `/club/courseDetails/${id}/students` ? ButtonStyles.activeYellow : ''} `} >
                                هنرجویان
                            </Link> 
                            <Link 
                                to={aCourseData.data.status === 'Pending' ? '#' : `/club/courseDetails/${id}/classes`} 
                                className={`${ButtonStyles.ThreeStickedButtonButton} ${aCourseData.data.status === 'Pending' && 'opacity-55'} ${location.pathname === `/club/courseDetails/${id}/classes` ? ButtonStyles.activeYellow : ''}`} >
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
                            <button className={`${ButtonStyles.normalButton} z-10 fixed bottom-[4.1rem] w-[90%] md:w-2/6 text-base`} 
                            onClick={() => setShowPopup(true)} >
                                <p>غیر فعال سازی</p>
                            </button>
                        }
                        
                        {
                            aCourseData.data.status === 'Disable' && !aCourseData.data.clubName &&
                            <button className={`${ButtonStyles.normalButton} z-10 fixed bottom-[4.1rem] w-[90%] md:w-2/6 text-base`} 
                                onClick={(event) => !triggerCourseStatusLoading && handleTriggerCourseStatus(event, 'Active', id)} >
                                <p>فعال سازی</p>
                            </button>
                        }
                        {
                            aCourseData.data.status === 'Pending' &&
                                <div className=' z-10 w-[90%] md:w-2/6 fixed bottom-16 flex justify-between'>
                                    <button className={`${ButtonStyles.addButton} w-[45%] text-base`} 
                                        onClick={(event) => !triggerCourseStatusLoading && handleTriggerCourseStatus(event, 'Active', id)} >
                                        <p>تایید</p>
                                    </button>
                                    <button className={`${ButtonStyles.normalButton} w-[45%] text-base`} 
                                        onClick={(event) => !triggerCourseStatusLoading && handleTriggerCourseStatus(event, 'Rejected', id)} >
                                        <p>رد</p>
                                    </button>
                                </div>
                        }
                    </>
                }


            </div>

            <div className={` ${showPopup ? 'fixed' : 'hidden' }  w-full h-full z-20 backdrop-blur-sm`}>
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

export default ClubCourseDetails;