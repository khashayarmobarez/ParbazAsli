import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

//  Queries

// mui
import AddIcon from '@mui/icons-material/Add';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

// styles
import ButtonStyles from '../styles/Buttons/ButtonsBox.module.css'

// queries
import { useCourseDividers, useCourses, useTriggerCourseStatus } from '../Utilities/Services/coursesQueries';

// components 
import PageTitle from '../components/reuseable/PageTitle';
import DropDownLine from '../components/reuseable/DropDownLine';


const Education = () => {

    const navigate = useNavigate()

    // courseData
    const [courseType, setCourseType] = useState('')
    const [organizationId, setOrganizationId] = useState('')
    const [pageNumber, setPageNumber] = useState(1)
    
    const [DropDown, setDropDown] = useState('')

    // queries
    const { data: courseDividerData, isLoading: courseDividerLoading, error: courseDividerError } = useCourseDividers();
    const { data: courseData, isLoading: courseDataLoading, error: courseDataError } = useCourses(courseType, organizationId, pageNumber);
    const { mutate: triggerCourseStatus, isLoading: triggerCourseStatusLoading } = useTriggerCourseStatus();

    

    // dropDown onClick
    const handleDropDownClick = (index, course) => {
        setDropDown(DropDown === `dropDown${index}` ? '' : `dropDown${index}`)
        setCourseType(course.courseType)
        setOrganizationId(course.organizationId)
        setPageNumber(1)
    }

    const handleCourseDetails = (id) => () => {
        navigate(`/education/courseDetails/${id}`);
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
        <div className='flex flex-col mt-14 items-center pb-14'>

            <div  className='w-full flex flex-col items-center gap-y-4 md:w-[70%]'>

                <PageTitle title={'آموزش'} navigateTo={'/profile'} />  

                <div className='w-[90%] flex flex-col gap-y-6'>

                {courseDividerLoading &&
                <Box sx={{ display: 'flex', width:'full' , justifyContent:'center', marginTop:'4rem' }}>
                    <CircularProgress /> 
                </Box>
                }

                {courseDividerError &&
                    <p className='w-full text-center'>مشکلی پیش اماده, دوباره تلاش کنید</p>
                }

                {courseDividerData && courseDividerData.data.length > 0 &&
                    courseDividerData.data.map((course, index) => (
                        <div key={index} className='w-full flex flex-col items-center gap-y-4'>
                            <DropDownLine  
                                onClick={() => handleDropDownClick(index, course)}
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
                                        courseData && courseData.data?.map((course) => (
                                            <div className='w-full flex flex-col items-center'>

                                                <div
                                                key={course.id}
                                                className="w-full justify-between items-center px-4 py-4 rounded-[1.6rem] flex flex-col gap-y-6 md:col-span-1 text-xs"
                                                style={{
                                                    background: 'var(--organs-coachData-bg) var(--bg-color)',
                                                    boxShadow: 'var(--organs-coachData-boxShadow)'
                                                }}
                                                >
                                                    <h1 className='text-base'>{course.name}</h1>

                                                    <div className='w-full flex justify-between items-center'>

                                                        <div className='flex flex-col text-start gap-y-1'>

                                                            <p>
                                                                {course.level} {course.organization && `/ ${course.organization}`}
                                                            </p>

                                                            { course.clubName &&
                                                                <p>باشگاه: {course.clubName}</p>
                                                            }

                                                            <p>تعداد پرواز: {course.flightsCount}</p>

                                                            <div className='flex gap-x-1'>
                                                                <p>وضعیت: {course.status}</p>

                                                                {course.status === 'Active' && 
                                                                <div className='w-3 h-3 rounded-full' style={{backgroundColor:'var(--dark-green)'}}></div>
                                                                }
                                                                {course.status === 'Pending' &&
                                                                <div className='w-3 h-3 rounded-full' style={{backgroundColor:'var(--yellow-text)'}}></div>
                                                                }
                                                                {course.status === 'Disable' &&
                                                                <div className='w-3 h-3 rounded-full' style={{backgroundColor:'var(--red-text)'}}></div>
                                                                }

                                                            </div>

                                                        </div>

                                                        <button onClick={handleCourseDetails(course.id)} className={`${ButtonStyles.normalButton} self-end`} >
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
                                                            <DisabledByDefaultIcon onClick={(event) => !triggerCourseStatusLoading && handleTriggerCourseStatus(event, 'rejected', course.id)} sx={{ color:'var(--red-text)'}} />

                                                        </div>
                                                    </div>
                                                } 

                                            </div>
                                        ))
                                    }

                                    {courseData && courseData.totalPagesCount > 1 &&
                                        <div className='w-full flex justify-between mt-2'>
                                            <p onClick={handleNextPageNumber} className='' style={{color:'var(--yellow-text)'}} >{courseData.totalPagesCount > 1 && pageNumber !== courseData.totalPagesCount && 'بقیه ی دوره ها ...'}</p>
                                            <p onClick={handleLastPageNumber} className='' style={{color:'var(--yellow-text)'}} >{pageNumber > 1 && 'دوره های قبلی'}</p>
                                        </div>
                                    }

                                </div>
                            }
                        </div>
                    ))
                }
                
                

                </div>

                <div className='fixed bottom-[3.3rem] w-[90%] bg-[#131423] rounded-xl md:w-96 md:relative md:bottom-0 md:top-4 h-[56px]' >
                    <button className={`${ButtonStyles.addButton} w-full`} onClick={() => navigate('/education/addClass') } >
                        <AddIcon />
                        <p>افزودن مورد جدید</p>
                    </button>
                </div>

            </div>

        </div>
    );
};

export default Education;