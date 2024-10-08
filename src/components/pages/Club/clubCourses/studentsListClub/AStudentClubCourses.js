import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';

// queries
import { useAClubStudentCourses } from '../../../../../Utilities/Services/clubQueries';

// styles
import boxStyles from '../../../../../styles/Boxes/DataBox.module.css'
import ButtonStyles from '../../../../../styles/Buttons/ButtonsBox.module.css'

// assets
import attention from '../../../../../assets/icons/attention.svg'
import arrowIcon from '../../../../../assets/icons/Right Arrow Button.svg';

// mui
import { LinearProgress } from '@mui/material';
import Box from '@mui/material/Box';

// comps
import PageTitle from '../../../../reuseable/PageTitle';

const AStudentClubCourses = () => {

    const { studentId } = useParams()
    const navigate = useNavigate()
    const location = useLocation()

    Cookies.set('lastPathForClubStudentDetails', location.pathname);

    const [pageNumber, setPageNumber] = useState(1)
    let pageSize = 4

    const { data: StudentCourses, isLoading: StudentCoursesLoading, error: StudentCoursesError, refetch: reftchCourses } = useAClubStudentCourses(studentId && studentId, pageNumber, pageSize);

    // refetch courses when pageNumber changed
    useEffect(() => {
        reftchCourses()
    }, [pageNumber])

    const handleCourseDetails = (id) => () => {
        navigate(`/club/courseDetails/studentDetails/${id}/practical`);
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
                                        {courseData.status === 'Completed' && <p className='text-base text-[var(--yellow-text)]'>{courseData.name}(تمام شده)</p>}
                                        {courseData.status === 'Canceled' && <p className='text-base text-[var(--notification-red)]'>{courseData.name}(لغو شده)</p>}

                                        {/* conditional course percent */}
                                        <p
                                        className={`
                                            ${courseData.status === 'Completed'&& 'text-[var(--yellow-text)]'}
                                            ${courseData.status === 'Canceled'&& 'text-[var(--notification-red)]'}
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
                                            backgroundColor: 'var(--diffrential-blue)', 
                                            '& .MuiLinearProgress-bar': {
                                                backgroundColor: 
                                                courseData.status === 'Active' ? 'var(--red-text)' :
                                                courseData.status === 'Completed' ? 'var(--yellow-text)' :
                                                courseData.status === 'Canceled' ? 'var(--notification-red)' :
                                                undefined, // Optional: A default value if none of the conditions match
                                            }
                                            }} 
                                        />
                                    </Box>

                                    <div className='w-full flex justify-between text-start text-sm'>
                                        <div className='flex flex-col justify-between self-start'>
                                            { courseData.organization && courseData.type !== 'Regular' &&
                                                <p>
                                                    <span className='text-[var(--low-opacity-white)]'>
                                                        ارگان:&nbsp;
                                                    </span>
                                                    {courseData.organization}
                                                </p>
                                            }
                                            { courseData.clubName &&
                                                <p>
                                                    <span className='text-[var(--low-opacity-white)]'>
                                                        باشگاه:&nbsp;
                                                    </span>
                                                    {courseData.clubName}
                                                </p>
                                            }
                                            { courseData.coach &&
                                                <p>
                                                    <span className='text-[var(--low-opacity-white)]'>
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

                            </div>
                        ))
                    }
                </div>

                { StudentCourses && StudentCourses.totalPagesCount && StudentCourses.totalPagesCount > 1 && (
                    <div className='w-full flex justify-between px-10 items-center'>
                        <button
                            className='w-10 justify-self-start'
                            disabled={StudentCourses.totalPagesCount === 1 || StudentCourses.totalPagesCount === pageNumber}
                            onClick={handleNextPageNumber}
                        >
                            <img
                                src={arrowIcon}
                                alt='arrow'
                                className={`${(StudentCourses.totalPagesCount === 1 || StudentCourses.totalPagesCount === pageNumber) && 'opacity-60'}`}
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
        </div>
    );
};

export default AStudentClubCourses;