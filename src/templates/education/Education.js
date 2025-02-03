import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';

// styles
import boxStyles from '../../styles/DataBox.module.css'
import ButtonStyles from '../../styles/ButtonsBox.module.css'

// assests 
import ArrowButton from '../../components/icons/ArrowButton';

// mui
import AddIcon from '@mui/icons-material/Add';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';


// queries
import { useCourseCounts, useCourseDividers, useCourses, useTriggerCourseStatus } from '../../Utilities/Services/coursesQueries';

// components 
import PageTitle from '../../components/reuseable/PageTitle';
import DropDownLine from '../../components/reuseable/DropDownLine';
import CircularProgressLoader from '../../components/Loader/CircularProgressLoader';
import Attention from '../../components/icons/Attention';

// context
import { useTranslation } from '../../Utilities/context/TranslationContext';



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
                            position: 'top-right', // Set the position (e.g., 'top-left', 'bottom-right')
                            autoClose: 3000,
                            theme: appTheme,
                            style: { width: "350px" }
                        });
                        courseDataRefetch()
                    } else {
                        toast(t("education.courseDeclined"), {
                            type: 'success', // Specify the type of toast (e.g., 'success', 'error', 'info', 'warning')
                            position: 'top-right', // Set the position (e.g., 'top-left', 'bottom-right')
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
                                                <div key={index} className='w-full flex flex-col items-center z-30'>

                                                    <div
                                                    key={course.id}
                                                    className="w-full justify-between items-center px-4 py-4 rounded-[1.6rem] flex flex-col gap-y-4 md:col-span-1 z-10 text-xs bg-bgCard "
                                                    style={{boxShadow:'var(--shadow-all)'}}
                                                    >
                                                        <div className='w-full flex justify-between items-center'>
                                                        
                                                            <h1 className='text-base'>{course.name}</h1>

                                                            <div className='flex gap-x-1'>

                                                                <p className='text-textButtonProfileDisable '>{t("education.courseStatus")}
                                                                    {course.status === 'Active' && 
                                                                        <span className='text-textAccent'>{t("education.active")}</span>
                                                                    }
                                                                    {course.status === 'Pending' &&
                                                                        <span className='text-textWarning'> {t("education.pending")}</span>
                                                                    }
                                                                    {course.status === 'Disable' && 
                                                                        <span className=''> {t("education.inactive")}</span>
                                                                    }
                                                                    {course.status === 'Rejected' && 
                                                                        <span className='text-textError'>{t("education.rejected")}</span>
                                                                    }
                                                                </p>

                                                            </div>
                                                        
                                                        </div>

                                                        {
                                                        isForClub &&
                                                            <p className=''>{t("education.coachName")}:    
                                                                <span className='text-sm'> {course.coachFullName}</span>
                                                            </p>
                                                        }

                                                        <div className='w-full flex justify-between items-center'>

                                                            <div className='flex flex-col text-start gap-y-3'>
                                                                
                                                                {
                                                                    course.type === 'Regular' &&
                                                                    <p className='text-sm'>
                                                                        {course.organization}
                                                                    </p>
                                                                }
                                                                {
                                                                    course.type === 'Retraining' &&
                                                                    <p className='text-sm'>
                                                                        <span className=''>{t("education.level")}:</span> {course.level}
                                                                    </p>
                                                                } 

                                                                <p>
                                                                    <span className=''>{t("education.flightsCount")}: </span>{course.flightsCount}
                                                                </p>

                                                                {
                                                                course.clubName &&
                                                                    <p>
                                                                        <span className=''>{t("education.clubName")}: </span> {course.clubName}
                                                                    </p>
                                                                }

                                                            </div>

                                                            <div className='flex flex-col text-start gap-y-2'>
                                                                <p>
                                                                    <span className=''>{t("education.activeStudentCount")}: </span>{course.activeStudentCounts}
                                                                </p>
                                                                <p>
                                                                    <span className=''>{t("education.previousStudentCount")}: </span>{course.historyStudentCounts}
                                                                </p>
                                                            </div>


                                                        </div>

                                                        {
                                                            course.status !== 'Rejected' &&
                                                                <button onClick={handleCourseDetails(course.id)} className={`${ButtonStyles.normalButton} self-center`} >
                                                                    {t("education.courseDetails")} 
                                                                </button>
                                                        }

                                                    </div>

                                                    {/* Trigger course status */}
                                                    {course.status === 'Pending' && !isForClub &&
                                                        <div className='w-full min-h-14 rounded-b-3xl z-0 mt-[-1rem] pt-4 flex justify-between px-4 bg-bgOutputDefault'>

                                                            <div className='flex justify-center text-xs gap-x-2 items-center gap-y-10'>
                                                                <div className='w-2 h-2 rounded-full' style={{backgroundColor:'var(--text-error)'}}></div>
                                                                <p >{t("education.approveCourse")}</p>
                                                            </div>

                                                            <div className='flex gap-x-6 items-center px-2'>

                                                                {triggerCourseStatusLoading && 
                                                                    <Box sx={{ display: 'flex', width:'full' , justifyContent:'center' }}>
                                                                        <CircularProgress sx={{width:'1rem'}} /> 
                                                                    </Box>
                                                                }
                                                                
                                                                <p onClick={(event) => !triggerCourseStatusLoading && handleTriggerCourseStatus(event, 'active', course.id)} className='text-textAccent text-sm font-medium'  >
                                                                    {t("education.approve")}
                                                                </p>

                                                                <p onClick={(event) => !triggerCourseStatusLoading && handleTriggerCourseStatus(event, 'rejected', course.id)} className='text-textError text-sm font-medium' >
                                                                    {t("education.reject")}
                                                                </p>

                                                            </div>
                                                        </div>
                                                    } 

                                                </div>
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