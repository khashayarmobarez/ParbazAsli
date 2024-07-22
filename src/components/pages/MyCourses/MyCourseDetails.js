import React, { useEffect, useRef, useState } from 'react';
import { Link, Outlet, useParams } from 'react-router-dom';

// styles
import boxStyles from '../../../styles/Boxes/DataBox.module.css'
import ButtonStyles from '../../../styles/Buttons/ButtonsBox.module.css'

// mui
import { Box, CircularProgress } from '@mui/material';

// queries
import { useAUserCourse } from '../../../Utilities/Services/StudentCoursesQueries';

// components
import PageTitle from '../../reuseable/PageTitle';

const MyCourseDetails = () => {

    const { id } = useParams();

    const { data: aCourseData, isLoading: courseDataLoading, error: courseDataError } = useAUserCourse(id);

    // const { mutate: triggerCourseStatus, isLoading: triggerCourseStatusLoading } = useTriggerCourseStatus();

    // to set which button is active and style it
    const [activeLink, setActiveLink] = useState('practical'); // State to track active link


    // Ref to the button element
    const buttonRef = useRef(null);


    // Effect to click the button when the page is mounted
    useEffect(() => {
        // Check if the button ref exists and it has a current property
        if (buttonRef.current) {
        // Programmatically click the button
        buttonRef.current.click();
        }
    }, []);

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
            <div  className='w-full flex flex-col items-center gap-y-6 md:w-[70%]'>

                <PageTitle title={'جزئیات دوره'} navigateTo={'/myCourses'} /> 

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
                                    <p className=' text-xs pr-2'>نام دوره</p>
                                    <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl text-sm`}  id='data' >
                                        <p>{aCourseData.data.name}</p>
                                    </div>
                                </div>

                                <div className='flex flex-col items-start gap-y-1 col-span-4 md:col-span-2'>
                                    <p className=' text-xs pr-2'>نوع دوره</p>
                                    <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl text-sm`}  id='data' >
                                        <p>{aCourseData.data.type}</p>
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

                            </div>
                            
                            <div className=' w-[90%] flex flex-col items-start justify-between gap-y-2' >
                                        <p>توضیحات درباره دوره</p>
                                        <p className='border-solid border-[1px] rounded-3xl p-4 text-sm min-h-14 w-full text-right'>{aCourseData.data.description}</p>
                            </div>

                        </div>

                    
                        <div className={`${ButtonStyles.ThreeStickedButtonCont} sticky top-[6.7rem] bg-white z-10`}>
                            <Link ref={buttonRef} to={`/MyCourses/courseDetails/${id}/practical`} className={`${ButtonStyles.ThreeStickedButtonButton} rounded-r-xl ${activeLink === 'practical' ? ButtonStyles.activeYellow : ''}`} onClick={() => setActiveLink('practical')}>عملی</Link> 
                            <Link to={`/MyCourses/courseDetails/${id}/theory`} className={`${ButtonStyles.ThreeStickedButtonButton}  ${activeLink === 'theory' ? ButtonStyles.activeYellow : ''}`} onClick={() => setActiveLink('theory')} >تئوری</Link> 
                            <Link to={`/MyCourses/courseDetails/${id}/mySyllabi`} className={`${ButtonStyles.ThreeStickedButtonButton} rounded-l-xl  ${activeLink === 'syllabi' ? ButtonStyles.activeYellow : ''}`} onClick={() => setActiveLink('syllabi')} >وضعیت من</Link>
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