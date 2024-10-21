import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';

// queries
import { useAStudentCourses } from '../../../../Utilities/Services/coursesQueries';

// comps
import PageTitle from '../../../reuseable/PageTitle';

// styles
import boxStyles from '../../../../styles/Boxes/DataBox.module.css'
import ButtonStyles from '../../../../styles/Buttons/ButtonsBox.module.css'

// assets
import ArrowButton from '../../../../components/icons/ArrowButton';

// mui
import { LinearProgress } from '@mui/material';
import Box from '@mui/material/Box';


const AStudentCourses = () => {

    const { studentId } = useParams()
    const navigate = useNavigate()
    const location = useLocation()

    Cookies.set('lastPathForStudentDetails',location.pathname)

    const [pageNumber, setPageNumber] = useState(1)
    let pageSize = 4

    const { data: StudentCourses, isLoading: StudentCoursesLoading, error: StudentCoursesError, refetch: reftchCourses } = useAStudentCourses(studentId && studentId, pageNumber, pageSize);

    // refetch courses when pageNumber changed
    useEffect(() => {
        reftchCourses()
    }, [pageNumber])

    const handleCourseDetails = (id) => () => {
        navigate(`/education/courseDetails/studentDetails/${id}/practical`);
    };

    const handleNextPageNumber = () => {
        setPageNumber(prev => prev + 1)
    }

    const handleLastPageNumber = () => {
        setPageNumber(prev => prev - 1)
    }

    return (
        <div className='flex flex-col mt-14 items-center pb-14 gap-y-6'>

            <div  className='w-full flex flex-col items-center gap-y-4 md:w-[70%]'>

                <PageTitle 
                    title={StudentCourses ? `${StudentCourses.data[0].studentName}` : 'نام هنرجو' }
                    navigateTo={`/education`} 
                />

                {/* {studentId} normal */}

                <div className='w-[90%] flex flex-col gap-4 md:grid md:grid-cols-2 '>
                    {
                        StudentCourses && StudentCourses.data?.map((courseData, index) => (
                            
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
                                            backgroundColor: 'var(--bg-button-secondary-hover)', 
                                            '& .MuiLinearProgress-bar': {
                                                backgroundColor: 
                                                courseData.status === 'Active' ? 'var(--text-error)' :
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
                                                <p>
                                                    <span className='text-textDisabled'>
                                                        ارگان:&nbsp;
                                                    </span>
                                                    {courseData.organization}
                                                </p>
                                            }
                                            { courseData.clubName &&
                                                <p>
                                                    <span className='text-textDisabled'>
                                                        باشگاه:&nbsp;
                                                    </span>
                                                    {courseData.clubName}
                                                </p>
                                            }
                                            { courseData.coach &&
                                                <p>
                                                    <span className='text-textDisabled'>
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
                                {/* {course.status === 'Pending' &&
                                    <div className='w-full min-h-14 rounded-b-2xl z-10 mt-[-1rem] pt-5 flex justify-between px-4' 
                                    style={{background: '#262941',
                                        boxShadow: 'var(--organs-coachData-boxShadow)'}}>

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
                                }  */}

                            </div>
                        ))
                    }
                </div>

                { StudentCourses && StudentCourses.totalPagesCount && StudentCourses.totalPagesCount > 1 && (
                    <div className='w-full flex justify-between px-10 items-center'>
                        <button
                            className={`w-6 h-6 justify-self-start ${(StudentCourses.totalPagesCount === 1 || StudentCourses.totalPagesCount === pageNumber) && 'opacity-60'}`}
                            disabled={StudentCourses.totalPagesCount === 1 || StudentCourses.totalPagesCount === pageNumber}
                            onClick={handleNextPageNumber}
                        >
                            <ArrowButton/>
                        </button>

                        <p className='text-sm justify-self-center' style={{ color: 'var(--text-accent)' }}>
                            صفحه ی {pageNumber}
                        </p>

                        <button
                            className={`transform rotate-180 w-6 h-6 justify-self-end ${pageNumber === 1 && 'opacity-60'}`}
                            disabled={pageNumber === 1}
                            onClick={handleLastPageNumber}
                        >
                            <ArrowButton/>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AStudentCourses;