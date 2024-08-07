import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

//  Queries

// mui
import AddIcon from '@mui/icons-material/Add';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

// assets
import attention from '../assets/icons/attention.svg'
import arrowIcon from '../assets/icons/Right Arrow Button.svg';

// styles
import ButtonStyles from '../styles/Buttons/ButtonsBox.module.css'
import boxStyles from '../styles/Boxes/DataBox.module.css'

// queries

// components 
import PageTitle from '../components/reuseable/PageTitle';
import DropDownLine from '../components/reuseable/DropDownLine';
import { useUserCourseDividers, useUserCourses } from '../Utilities/Services/StudentCoursesQueries';
import { useTriggerCourseStatus } from '../Utilities/Services/coursesQueries';
import { LinearProgress } from '@mui/material';
import CircularProgressLoader from '../components/Loader/CircularProgressLoader';



const MyCourses = () => {

    const navigate = useNavigate()

    // courseData
    const [courseType, setCourseType] = useState('')
    const [organizationId, setOrganizationId] = useState('')
    const [pageNumber, setPageNumber] = useState(1)
    
    const [DropDown, setDropDown] = useState('')

    // queries
    const { data: courseDividerData, isLoading: courseDividerLoading, error: courseDividerError } = useUserCourseDividers();
    const { data: courseData, isLoading: courseDataLoading, error: courseDataError } = useUserCourses(courseType, organizationId, pageNumber);
    const { mutate: triggerCourseStatus, isLoading: triggerCourseStatusLoading } = useTriggerCourseStatus();

    // to set the first state for dropdown 
    useEffect(() => {
        if(courseDividerData && courseDividerData.data.length > 0) {
            setDropDown('dropDown0')
            setCourseType(courseDividerData.data[0].courseType)
            setOrganizationId(courseDividerData.data[0].organizationId)
        }
    }, [courseDividerData])


    // dropDown onClick
    const handleDropDownClick = (index, course) => {
        setDropDown(DropDown === `dropDown${index}` ? '' : `dropDown${index}`)
        setCourseType(course.courseType)
        setOrganizationId(course.organizationId)
        setPageNumber(1)
    }

    const handleCourseDetails = (id) => () => {
        navigate(`/MyCourses/courseDetails/${id}/practical`);
    };


    const handleNextPageNumber = () => {
        setPageNumber(prev => prev + 1)
    }

    const handleLastPageNumber = () => {
        setPageNumber(prev => prev - 1)
    }


    const handleTriggerCourseStatus = (event ,status ,id) => {

        event.preventDefault();

        const triggerStatusForm = {
            courseId: id,
            status: status
        }

        triggerCourseStatus(triggerStatusForm);
    }


    return (
        <div className='flex flex-col mt-14 items-center'>

            <div  className='w-full flex flex-col items-center gap-y-4 md:w-[70%]'>

                <PageTitle title={'دوره‌های من'} navigateTo={'/profile'} />  

                <div className='w-[90%] flex flex-col gap-y-6'>

                {courseDividerLoading &&
                <CircularProgressLoader />
                }

                {courseDividerError &&
                    <p className='w-full text-center'>مشکلی پیش اماده, دوباره تلاش کنید</p>
                }

                {
                    courseDividerData && courseDividerData.data.length === 0 &&
                    <div className='w-full h-[60vh] flex flex-col justify-center items-center'>
                        <img src={attention} alt='attention' className='w-20 h-20 mx-auto' />
                        <p>در انتظار مربی...</p>
                        <p className='mt-5'>هنوز دوره‌ای برای شما افزوده نشده است!</p>
                    </div>
                }

                {courseDividerData && courseDividerData.data.length > 0 &&
                    courseDividerData.data.map((course, index) => (
                        <div key={index} className='w-full flex flex-col items-center gap-y-4'>
                            <DropDownLine  
                                onClickActivation={() => handleDropDownClick(index, course)}
                                title={course.name} 
                                dropDown={DropDown} 
                                isActive={DropDown === `dropDown${index}`}  
                            />

                            {DropDown === `dropDown${index}` && 
                                <div className='w-full flex flex-col gap-y-4'>

                                    {courseDataLoading && 
                                        <Box sx={{ display: 'flex', width:'full' , justifyContent:'center' }}>
                                            <CircularProgress /> 
                                        </Box>
                                    }

                                    {courseDataError &&
                                        <p className='w-full text-center'>مشکلی پیش اماده, دوباره تلاش کنید</p>
                                    }

                                    {
                                        courseData && courseData.data?.map((courseData) => (
                                            <div key={courseData.id} className='w-full flex flex-col items-center'>

                                                <div className={`${boxStyles.containerDarkmode} rounded-3xl h-auto z-0 w-[98%] md:w-full flex flex-col justify-between items-center px-4 py-4 gap-y-4 mr-1 mt-1`}>


                                                    <div className='w-full flex justify-between'>
                                                        <p className=' text-base'>{courseData.name}</p>
                                                        <p>{courseData.percent} %</p>
                                                    </div>

                                                    <Box sx={{ width: '100%' }}>
                                                        <LinearProgress variant="determinate" value={courseData.percent + (courseData.percent < 2 ? 2 : 0)} 
                                                        sx={{ height:'1rem', borderRadius:'1rem', backgroundColor :'var(--diffrential-blue)', '& .MuiLinearProgress-bar': {
                                                            backgroundColor: 'var(--red-text)' // Change this to your desired color
                                                        }}} />
                                                    </Box>

                                                    <div className='w-full flex justify-between text-start text-sm'>
                                                        <div className='flex flex-col justify-between self-start'>
                                                            { courseData.organization && courseData.type !== 'Regular' &&
                                                                <p>ارگان: {courseData.organization}</p>
                                                            }
                                                            { courseData.level && courseData.type !== 'Regular' &&
                                                                <p>مقطع: {courseData.level}</p>
                                                            }
                                                            { courseData.clubName &&
                                                                <p>باشگاه: {courseData.clubName}</p>
                                                            }
                                                            { courseData.coach &&
                                                                <p>مربی: {courseData.coach}</p>
                                                            }
                                                            <div className='flex gap-x-1'>
                                                                <p>وضعیت:
                                                                    {courseData.status === 'Active' && ' فعال'}
                                                                    {courseData.status === 'Finished' && ' تمام شده'}
                                                                    {courseData.status === 'Canceled' && ' لغو شده'}
                                                                </p>

                                                                {courseData.status === 'Active' && 
                                                                    <div className='w-3 h-3 rounded-full' style={{backgroundColor:'var(--dark-green)'}}></div>
                                                                }
                                                                {courseData.status === 'Finished' &&
                                                                    <div className='w-3 h-3 rounded-full' style={{backgroundColor:'var(--red-text)'}}></div>
                                                                }
                                                                {courseData.status === 'Canceled' &&
                                                                    <div className='w-3 h-3 rounded-full' style={{backgroundColor:'var(--notification-red)'}}></div>
                                                                }

                                                            </div>
                                                        </div>
                                                        <button onClick={handleCourseDetails(courseData.id)} className={`${ButtonStyles.normalButton} self-end`} >
                                                            جزئیات  
                                                        </button>

                                                    </div>

                                                </div>

                                                {/* Trigger course status */}
                                                {course.status === 'Pending' &&
                                                    <div className='w-full min-h-14 rounded-b-2xl z-10 mt-[-1rem] pt-5 flex justify-between px-4' 
                                                    style={{background: '#262941',
                                                        boxShadow: 'var(--organs-coachData-boxShadow)'}}>

                                                        <div className='flex justify-center text-sm gap-x-2 items-center gap-y-10'>
                                                            <div className='w-3 h-3 rounded-full' style={{backgroundColor:'var(--red-text)'}}></div>
                                                            <p >آیا این دوره مورد تایید شما است؟</p>
                                                        </div>

                                                        <div className='flex gap-x-4 items-center px-6'>

                                                            {triggerCourseStatusLoading && 
                                                                <Box sx={{ display: 'flex', width:'full' , justifyContent:'center' }}>
                                                                    <CircularProgress sx={{width:'1rem'}} /> 
                                                                </Box>
                                                            }
                                                            <CheckBoxIcon onClick={(event) => !triggerCourseStatusLoading && handleTriggerCourseStatus(event, 'active', course.id)} sx={{ color:'var(--dark-green)'}} />
                                                            <DisabledByDefaultIcon onClick={(event) => !triggerCourseStatusLoading && handleTriggerCourseStatus(event, 'rejected', course.id)} sx={{ color:'var(--notification-red)'}} />

                                                        </div>
                                                    </div>
                                                } 

                                            </div>
                                        ))
                                    }

                                    {courseData && courseData.totalPagesCount > 1 && (
                                        <div className='w-full flex justify-between px-10 items-center'>
                                            <button
                                                className='w-10 justify-self-start'
                                                disabled={courseData.totalPagesCount === 1 || courseData.totalPagesCount === pageNumber}
                                                onClick={handleNextPageNumber}
                                            >
                                                <img
                                                    src={arrowIcon}
                                                    alt='arrow'
                                                    className={`${(courseData.totalPagesCount === 1 || courseData.totalPagesCount === pageNumber) && 'opacity-60'}`}
                                                />
                                            </button>

                                            <p className='text-sm justify-self-center' style={{ color: 'var(--yellow-text)' }}>
                                                صفحه ی {pageNumber}
                                            </p>

                                            <button
                                                className='transform rotate-180 w-10 justify-self-end'
                                                disabled={pageNumber === 1}
                                                onClick={handleLastPageNumber}
                                            >
                                                <img
                                                    src={arrowIcon}
                                                    alt='arrow'
                                                    className={`mt-2 ${pageNumber === 1 && 'opacity-60'}`}
                                                />
                                            </button>
                                        </div>
                                    )}
                                </div>

                                }
                                
                        </div>
                    ))
                }

                </div>

            </div>

        </div>
    );
};

export default MyCourses;