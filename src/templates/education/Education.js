import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';

// styles
import boxStyles from '../../styles/DataBox.module.css'
import ButtonStyles from '../../styles/ButtonsBox.module.css'

// assests 
import ArrowButton from '../../elements/icons/ArrowButton';

// mui
import AddIcon from '@mui/icons-material/Add';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';


// queries
import { useCourseCounts, useCourseDividers, useCourses, useTriggerCourseStatus } from '../../Utilities/Services/coursesQueries';

// components 
import PageTitle from '../../elements/reuseable/PageTitle';
import DropDownLine from '../../elements/reuseable/DropDownLine';
import CircularProgressLoader from '../../elements/Loader/CircularProgressLoader';
import Attention from '../../elements/icons/Attention';

// context
import { useTranslation } from '../../Utilities/context/TranslationContext';
import CourseBox from '../../modules/Education/CourseBox';



const Education = () => {

    // language
    const { t } = useTranslation();

    const navigate = useNavigate()
    const appTheme = Cookies.get('themeApplied') || 'dark';
    const location = useLocation()

    const isForClub = location.pathname.includes('/club')

    // courseData
    const [courseType, setCourseType] = useState('')
    const [organizationId, setOrganizationId] = useState('')
    const [pageNumber, setPageNumber] = useState(1)
    
    const [DropDown, setDropDown] = useState('')

    // queries
    const { data: courseCountsData, isLoading: courseCountsLoading } = useCourseCounts(isForClub);
    const { data: courseDividerData, isLoading: courseDividerLoading, error: courseDividerError } = useCourseDividers(isForClub);
    const { data: courseData, isLoading: courseDataLoading, error: courseDataError, refetch: courseDataRefetch } = useCourses(courseType, organizationId, pageNumber, isForClub);
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
        !isForClub && navigate(`/education/courseDetails/${id}/students`);
        isForClub && navigate(`/club/courseDetails/${id}/students`);
    };

    const handleStudentListNavigation = (id) => {
        !isForClub && navigate(`/education/studentsList/${id}`)
        isForClub && navigate(`/club/clubCourses/studentsListClub/${id}`)
    }

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

        triggerCourseStatus(triggerStatusForm,
            {
                onSuccess: () => {
                    if(status === 'active') {
                        toast(t("education.courseAccepted"), {
                            type: 'success', // Specify the type of toast (e.g., 'success', 'error', 'info', 'warning')
                            position: 'top-center', // Set the position (e.g., 'top-left', 'bottom-right')
                            autoClose: 3000,
                            theme: appTheme,
                            style: { width: "350px" }
                        });
                        courseDataRefetch()
                    } else {
                        toast(t("education.courseDeclined"), {
                            type: 'success', // Specify the type of toast (e.g., 'success', 'error', 'info', 'warning')
                            position: 'top-center', // Set the position (e.g., 'top-left', 'bottom-right')
                            autoClose: 3000,
                            theme: appTheme,
                            style: { width: "350px" }
                        });
                        courseDataRefetch()
                    }
                }
            }
        );
    }


    return (
        <div className='flex flex-col mt-14 items-center pb-14'>

            <div className='w-full flex flex-col items-center gap-y-4 md:w-[70%] lg:gap-y-12 lg:w-[55%]'>

                <PageTitle title={t("education.title")} navigateTo={'/profile'} />

                <div className='w-[90%] flex flex-col gap-y-6'>

                {courseDividerLoading && courseCountsLoading &&
                        <CircularProgressLoader /> 
                }

                {  
                    courseDividerError &&
                    <p className='w-full text-center'>{t("education.errorMessage")}</p>
                }

                {
                    !courseDividerLoading && !courseDividerError && courseDividerData?.data.length < 1  &&
                    <div className='w-full h-[60vh] flex flex-col justify-center items-center text-textWarning'>
                        <span className='w-14 h-14 mb-2'>
                            <Attention />
                        </span>
                        <p>{t("education.noCourses")}</p>
                    </div>
                }

                {
                courseCountsData && courseDividerData?.data.length > 0  &&
                    <div className='grid grid-cols-2 w-full justify-between gap-y-4 gap-x-[6%]'>
                        
                            <div className='w-full flex flex-col items-center gap-y-2'>
                                <p className=' text-xs'>{t("education.activeCourses")}</p>
                                <div className= {`${boxStyles.classDetailsData} flex justify-center items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                    <p>{courseCountsData.data.activeCourseCounts}</p>
                                </div>
                            </div>

                            <div className='w-full flex flex-col items-center gap-y-2'>
                                <p className=' text-xs'>{t("education.inactiveCourses")}</p>
                                <div className= {`${boxStyles.classDetailsData} flex justify-center items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                    <p>{courseCountsData.data.disableCourseCounts}</p>
                                </div>
                            </div>

                            <div className='w-full flex flex-col items-center gap-y-2'>
                                <div className= {`${ButtonStyles.normalButton} flex justify-center items-center px-4 w-full h-12 rounded-xl text-xs`}  id='data'
                                onClick={() => handleStudentListNavigation(1)}>
                                    <p>{t("education.activeStudents")} ({courseCountsData.data.activeStudentCounts})</p>
                                </div>
                            </div>

                            <div className='w-full flex flex-col items-center gap-y-2'>
                                <div className= {`${ButtonStyles.normalButton} flex justify-center items-center px-4 w-full h-12 rounded-xl text-xs`}  id='data'
                                onClick={() => handleStudentListNavigation(2)}>
                                    <p>{t("education.previousStudents")} ({courseCountsData.data.disableStudentCounts})</p>
                                </div>
                            </div>

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
                                        <CircularProgressLoader />
                                    }

                                    {
                                        courseDataError &&
                                        <p className='w-full text-center'>{t("education.errorMessage")}</p>
                                    }

                                    <div className='w-full flex flex-col gap-4 md:grid md:grid-cols-2 '>
                                        {
                                            courseData && courseData.data?.map((course,index) => (
                                                <CourseBox
                                                    key={index}
                                                    course={course}
                                                    isForClub={isForClub}
                                                    handleCourseDetails={handleCourseDetails}
                                                    triggerCourseStatusLoading={triggerCourseStatusLoading}
                                                    handleTriggerCourseStatus={handleTriggerCourseStatus}
                                                />
                                            ))
                                        }
                                    </div>

                                    {courseData && courseData.totalPagesCount > 1 &&
                                        <div className='w-full flex justify-between px-10 items-center'>
                                            <button
                                                className={`w-6 h-6 justify-self-start`}
                                                disabled={pageNumber === 1}
                                                onClick={handleLastPageNumber}
                                            >
                                                <ArrowButton isRight={true} isDisable={pageNumber === 1}/>
                                            </button>

                                            <p className='text-sm justify-self-center' style={{ color: 'var(--text-accent)' }}>
                                                {t("education.page")} {pageNumber}
                                            </p>

                                            <button
                                                className={`transform w-6 h-6 justify-self-end`}
                                                disabled={courseData.totalPagesCount === 1 || courseData.totalPagesCount === pageNumber}
                                                onClick={handleNextPageNumber}
                                            >
                                                <ArrowButton isDisable={courseData.totalPagesCount === 1 || courseData.totalPagesCount === pageNumber}/>
                                            </button>
                                        </div>  
                                    }

                                </div>
                            }
                        </div>
                    ))
                }
                
                

                </div>

                <div className='fixed bottom-[4.5rem] w-[90%] bg-none rounded-xl md:w-96 md:relative md:bottom-0 md:top-4 h-[56px] z-30'>
                    <div className="relative z-10">
                        <button 
                        className={`${ButtonStyles.addButton} w-full`} 
                        onClick={() => isForClub ? navigate('/club/addCourseToClub') : navigate('/education/addClass')}
                        >
                            <AddIcon /> 
                            <p>{t("education.addNewCourse")}</p>
                        </button>
                    </div>
                    <div className="bg-bgPageMain opacity-90 h-8 w-full -mt-4 relative z-0" />
                </div>

            </div>

        </div>
    );
};

export default Education;