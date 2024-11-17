import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';

// queries
import { useAClubStudentCourses } from '../../../../../Utilities/Services/clubQueries';

// styles
import boxStyles from '../../../../../styles/Boxes/DataBox.module.css'
import ButtonStyles from '../../../../../styles/Buttons/ButtonsBox.module.css'

// assets
import ArrowButton from '../../../../../components/icons/ArrowButton';

// mui
import { LinearProgress } from '@mui/material';
import Box from '@mui/material/Box';

// comps
import PageTitle from '../../../../reuseable/PageTitle';
import Attention from '../../../../icons/Attention';

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
                    navigateTo={`/club/clubCourses`} 
                />

                {/* {studentId} normal */}

                <div className='w-[90%] flex flex-col gap-4 md:grid md:grid-cols-2 '>

                    { StudentCourses?.data.length < 1 &&
                        <div className='w-full h-[60vh] flex flex-col justify-center items-center text-textWarning'>
                            <span className='w-14 h-14 mb-2'>
                                <Attention />
                            </span>
                            <p>در حال حاضر دوره ای وجود ندارد</p>
                        </div>
                    }

                    {
                        StudentCourses && StudentCourses.data?.map((courseData, index) => (
                            
                            <div key={index} className='w-full flex flex-col items-center'>

                                <div className={`${boxStyles.containerDarkmode} rounded-3xl h-auto z-0 w-[98%] md:w-full flex flex-col justify-between items-center px-4 py-4 gap-y-4 mr-1 mt-1`}>


                                    <div className='w-full flex justify-between'>
                                        
                                        {/* conditional course name */}
                                        {(courseData.status === 'Active' || courseData.status === 'CoachPending') && <p className='text-base'>{courseData.name}</p>}
                                        {courseData.status === 'Completed' && <p className='text-base text-textAccent'>{courseData.name}(تمام شده)</p>}
                                        {courseData.status === 'Canceled' && <p className='text-base text-textError'>{courseData.name}(لغو شده)</p>}
                                        

                                        {/* conditional course percent */}
                                        {
                                            courseData.status === 'CoachPending' ?
                                            <p className={`text-textWarning`}>
                                                در انتظار تایید...
                                            </p>
                                            :
                                            <p
                                            className={`
                                                ${courseData.status === 'Completed'&& 'text-textAccent'}
                                                ${courseData.status === 'Canceled'&& 'text-textError'}
                                                ${courseData.status === 'Active'&& ''}
                                            `}
                                            >{courseData.percent}%</p>
                                        }
                                    </div>

                                    {
                                        courseData.status !== 'CoachPending' &&
                                        <Box sx={{ width: '100%' }}>
                                            <LinearProgress 
                                                variant="determinate" 
                                                value={courseData.percent + (courseData.percent < 2 ? 2 : 0)} 
                                                sx={{ 
                                                height: '1rem', 
                                                borderRadius: '1rem', 
                                                backgroundColor: 'var(--bg-pop-up-header-footer)', 
                                                '& .MuiLinearProgress-bar': {
                                                    backgroundColor: 
                                                    courseData.status === 'Active' ? 'var(--text-warning)' :
                                                    courseData.status === 'Completed' ? 'var(--text-accent)' :
                                                    courseData.status === 'Canceled' ? 'var(--text-error)' :
                                                    'var(--text-warning)', // Optional: A default value if none of the conditions match
                                                }
                                                }} 
                                            />
                                        </Box>
                                    }

                                    <div className='w-full flex justify-between text-start text-sm'>
                                        <div className={`flex flex-col justify-between self-start gap-y-2
                                            text-${courseData.status === 'Active' ? 'text-textDefault' :
                                            courseData.status === 'Completed' ? 'text-textButtonProfileDisable' :
                                            courseData.status === 'Canceled' ? 'text-textButtonProfileDisable' :
                                            'textDefault'}
                                            `}>
                                            { 
                                            courseData.organization && courseData.type !== 'Regular' &&
                                                <p className={`${(courseData.status === 'Canceled' || courseData.status === 'Completed') ? 'text-textButtonProfileDisable' : 'text-textDefault'}`} >
                                                    <span >
                                                        ارگان:&nbsp;
                                                    </span>
                                                    {courseData.organization}
                                                </p>
                                            }
                                            { 
                                            courseData.clubName &&
                                                <p className={`${(courseData.status === 'Canceled' || courseData.status === 'Completed') ? 'text-textButtonProfileDisable' : 'text-textDefault'}`} >
                                                    <span className=''>
                                                        باشگاه:&nbsp;
                                                    </span>
                                                    {courseData.clubName}
                                                </p>
                                            }
                                            { 
                                            courseData.coach &&
                                                <p className={`${(courseData.status === 'Canceled' || courseData.status === 'Completed') ? 'text-textButtonProfileDisable' : 'text-textDefault'}`} >
                                                    <span className=''>
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
                            className={`w-6 h-6 justify-self-start`}
                            disabled={StudentCourses.totalPagesCount === 1 || StudentCourses.totalPagesCount === pageNumber}
                            onClick={handleNextPageNumber}
                        >
                            <ArrowButton isRight={true} isDisable={StudentCourses.totalPagesCount === 1 || StudentCourses.totalPagesCount === pageNumber}/>
                        </button>

                        <p className='text-sm justify-self-center' style={{ color: 'var(--text-accent)' }}>
                            صفحه ی {pageNumber}
                        </p>

                        <button
                            className={`transform w-6 h-6 justify-self-end `}
                            disabled={pageNumber === 1}
                            onClick={handleLastPageNumber}
                        >
                            <ArrowButton isDisable={pageNumber === 1}/>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AStudentClubCourses;