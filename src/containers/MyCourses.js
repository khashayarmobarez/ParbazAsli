import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// mui
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { LinearProgress } from '@mui/material';

// assets
import Attention from '../components/icons/Attention'
import ArrowButton from '../components/icons/ArrowButton';

// styles
import ButtonStyles from '../styles/Buttons/ButtonsBox.module.css'
import boxStyles from '../styles/Boxes/DataBox.module.css'

// queries
import { useGuestUserClasses, useUserCourseDividers, useUserCourses } from '../Utilities/Services/StudentCoursesQueries';
import { useTriggerCourseStatus } from '../Utilities/Services/coursesQueries';

// components 
import PageTitle from '../components/reuseable/PageTitle';
import DropDownLine from '../components/reuseable/DropDownLine';
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
    // guest classes
    const { data: guestClassesData, isLoading: guestClassesLoading, error: guestClassesError } = useGuestUserClasses();
    // const { data: aGuestClassData, isLoading: aGuestClassLoading, error: aGuestClassError } = useAGuestUserClass();

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

    const handleGuestClassDetails = (id) => () => {
        navigate(`/MyCourses/guestClassDetails/${id}`);
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
                            <div className='w-20 h-20 mx-auto' >
                                <Attention />
                            </div>
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

                                        { course.courseType !== 'Guest' && courseDataLoading && 
                                            <Box sx={{ display: 'flex', width:'full' , justifyContent:'center' }}>
                                                <CircularProgress /> 
                                            </Box>
                                        }

                                        { course.courseType !== 'Guest' && courseDataError &&
                                            <p className='w-full text-center'>مشکلی پیش اماده, دوباره تلاش کنید</p>
                                        }

                                            <div className='w-full flex flex-col gap-4 md:grid md:grid-cols-2 '>
                                                {
                                                    course.courseType !== 'Guest' && courseData && courseData.data?.map((courseData, index) => (
                                                        
                                                        <div key={index} className='w-full flex flex-col items-center'>

                                                            <div className={`${boxStyles.containerDarkmode} rounded-3xl h-auto z-0 w-[98%] md:w-full flex flex-col justify-between items-center px-4 py-4 gap-y-4 mr-1 mt-1`}>


                                                                <div className='w-full flex justify-between'>
                                                                    
                                                                    {/* conditional course name */}
                                                                    {courseData.status === 'Active' && <p className='text-base'>{courseData.name}</p>}
                                                                    {courseData.status === 'Completed' && <p className='text-base text-textAccent'>{courseData.name}(تمام شده)</p>}
                                                                    {courseData.status === 'Canceled' && <p className='text-base text-textError'>{courseData.name}(لغو شده)</p>}

                                                                    {/* conditional course percent */}
                                                                    <p
                                                                    className={`
                                                                        ${courseData.status === 'Completed'&& 'text-textAccent'}
                                                                        ${courseData.status === 'Canceled'&& 'text-textError'}
                                                                        ${courseData.status === 'Active'&& ''}
                                                                    `}
                                                                    >{courseData.percent}%</p>
                                                                </div>

                                                                <Box sx={{ width: '100%' }}>
                                                                    <LinearProgress 
                                                                        variant="determinate" 
                                                                        value={courseData.percent + (courseData.percent < 2 ? 2 : 0)} 
                                                                        sx={{
                                                                        height: '1rem', 
                                                                        borderRadius: '1rem', 
                                                                        backgroundColor: 'var(--progress-bar-bg)', 
                                                                        '& .MuiLinearProgress-bar': {
                                                                            backgroundColor: 
                                                                            courseData.status === 'Active' ? 'var(--text-warning)' :
                                                                            courseData.status === 'Completed' ? 'var(--text-accent)' :
                                                                            courseData.status === 'Canceled' ? 'var(--text-error)' :
                                                                            undefined, // Optional: A default value if none of the conditions match
                                                                        }
                                                                        }} 
                                                                    />
                                                                </Box>

                                                                <div className='w-full flex justify-between text-start text-sm'>
                                                                    <div className='flex flex-col justify-between self-start'>
                                                                        { courseData.organization && courseData.type !== 'Regular' &&
                                                                            <p className={`${(courseData.status === 'Canceled' || courseData.status === 'Completed') ? 'text-textButtonMainDisabled' : 'text-textDefault'}`}>
                                                                                <span >
                                                                                    ارگان:&nbsp;
                                                                                </span>
                                                                                {courseData.organization}
                                                                            </p>
                                                                        }
                                                                        { courseData.clubName &&
                                                                            <p className={`${(courseData.status === 'Canceled' || courseData.status === 'Completed') ? 'text-textButtonMainDisabled' : 'text-textDefault'}`}>
                                                                                <span >
                                                                                    باشگاه:&nbsp;
                                                                                </span>
                                                                                {courseData.clubName}
                                                                            </p>
                                                                        }
                                                                        { courseData.coach &&
                                                                            <p className={`${(courseData.status === 'Canceled' || courseData.status === 'Completed') ? 'text-textButtonMainDisabled' : 'text-textDefault'}`}>
                                                                                <span >
                                                                                    مربی:&nbsp;
                                                                                </span> 
                                                                                {courseData.coach}
                                                                            </p>
                                                                        }
                                                                    </div>
                                                                    <button onClick={handleCourseDetails(courseData.id)} className={`${ButtonStyles.normalButton} self-end`} >
                                                                        جزئیات  
                                                                    </button>

                                                                </div>

                                                            </div>

                                                            {/* Trigger course status */}
                                                            {course.status === 'Pending' &&
                                                                <div className='w-full min-h-14 rounded-b-2xl z-10 mt-[-1rem] pt-5 flex justify-between px-4 bg-bgCard shadow-lg' >

                                                                    <div className='flex justify-center text-sm gap-x-2 items-center gap-y-10'>
                                                                        <div className='w-3 h-3 rounded-full' style={{backgroundColor:'var(--text-error)'}}></div>
                                                                        <p >آیا این دوره مورد تایید شما است؟</p>
                                                                    </div>

                                                                    <div className='flex gap-x-4 items-center px-6'>

                                                                        {triggerCourseStatusLoading && 
                                                                            <Box sx={{ display: 'flex', width:'full' , justifyContent:'center' }}>
                                                                                <CircularProgress sx={{width:'1rem'}} /> 
                                                                            </Box>
                                                                        }
                                                                        <CheckBoxIcon onClick={(event) => !triggerCourseStatusLoading && handleTriggerCourseStatus(event, 'active', course.id)} sx={{ color:'var(--text-accent)'}} />
                                                                        <DisabledByDefaultIcon onClick={(event) => !triggerCourseStatusLoading && handleTriggerCourseStatus(event, 'rejected', course.id)} sx={{ color:'var(--text-error)'}} />

                                                                    </div>
                                                                </div>
                                                            } 

                                                        </div>
                                                    ))
                                                }
                                            </div>

                                            { course.courseType !== 'Guest' && courseData && courseData.totalPagesCount > 1 && (
                                                <div className='w-full flex justify-between px-10 items-center'>
                                                    <button
                                                        className={`w-6 h-6 justify-self-start `}
                                                        disabled={courseData.totalPagesCount === 1 || courseData.totalPagesCount === pageNumber}
                                                        onClick={handleNextPageNumber}
                                                    >
                                                        <ArrowButton isRight={true} isDisable={courseData.totalPagesCount === 1 || courseData.totalPagesCount === pageNumber}/>
                                                    </button>

                                                    <p className='text-sm justify-self-center' style={{ color: 'var(--text-accent)' }}>
                                                        صفحه ی {pageNumber}
                                                    </p>

                                                    <button
                                                        className={`transform w-6 h-6 justify-self-end`}
                                                        disabled={pageNumber === 1}
                                                        onClick={handleLastPageNumber}
                                                    >
                                                        <ArrowButton isDisable={pageNumber === 1}/>
                                                    </button>
                                                </div>
                                            )}

                                        <div className='w-full flex flex-col gap-4 md:grid md:grid-cols-2 '>
                                            {course.courseType === 'Guest' && guestClassesData && guestClassesData.data.map((guestClass, index) => (
                                                <div key={index} className='w-full flex flex-col items-center'>
                                                    <div className={`${boxStyles.containerDarkmode} rounded-3xl h-auto z-0 w-[98%] md:w-full flex flex-col justify-between items-center px-4 py-4 gap-y-4 mr-1 mt-1`}>
                                                        <div className='w-full flex justify-between text-sm'>
                                                            <p className='text-base'>{guestClass.name}</p>
                                                            <p>
                                                                <span className='text-textDisabled'>
                                                                    تاریخ:&nbsp;
                                                                </span>
                                                                {guestClass.dateTime}
                                                            </p>
                                                        </div>
                                                        <div className='w-full flex justify-between items-center text-start text-sm'>
                                                            { guestClass.classDuration &&
                                                                <p>
                                                                    <span className='text-textDisabled'>
                                                                        مدت زمان:&nbsp;
                                                                    </span> 
                                                                    {guestClass.classDuration}
                                                                </p>
                                                            }
                                                            <button onClick={handleGuestClassDetails(guestClass.id)} className={`${ButtonStyles.normalButton} self-end`} >
                                                                جزئیات  
                                                            </button>
                                                        </div>


                                                    </div>
                                                </div>
                                            
                                            ))}    
                                        </div>  

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