import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

// mui
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

// assets
import Attention from '../../elements/icons/Attention'
import ArrowButton from '../../elements/icons/ArrowButton';

// queries
import { useGuestUserClasses, useUserCourseDividers, useUserCourses } from '../../Utilities/Services/StudentCoursesQueries';
import { useTriggerCourseStatus } from '../../Utilities/Services/coursesQueries';

// components 
import PageTitle from '../../elements/reuseable/PageTitle';
import DropDownLine from '../../elements/reuseable/DropDownLine';
import CircularProgressLoader from '../../elements/Loader/CircularProgressLoader';

// context
import { useTranslation } from '../../Utilities/context/TranslationContext';
import MyCourseBox from '../../modules/MyCourses/MyCourseBox';
import MyCourseBoxGuest from '../../modules/MyCourses/MyCourseBoxGuest';
import Pagination from '../../elements/reuseable/Pagination';



const MyCourses = () => {

    // language
    const { t } = useTranslation();
    const location = useLocation()

    const navigate = useNavigate()

    // courseData
    const [courseType, setCourseType] = useState('')
    const [organizationId, setOrganizationId] = useState('')
    const [pageNumber, setPageNumber] = useState(1)
    
    const [DropDown, setDropDown] = useState('')

    // queries
    const { data: courseDividerData, isLoading: courseDividerLoading, error: courseDividerError } = useUserCourseDividers();
    const { data: courseData, isLoading: courseDataLoading, error: courseDataError, refetch: refetchCourse} = useUserCourses(courseType, organizationId, pageNumber);
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

    // applying last path for my course details back button
    useEffect(() => {
        Cookies.set('lastPathBeforMyCourseDetails',location.pathname)
    },[])


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

            <div  className='w-full flex flex-col items-center gap-y-4 md:w-[70%] md:gap-y-12 lg:w-[55%]'>

                <PageTitle title={t('myCourses.title')} navigateTo={'/profile'} />  

                <div className='w-[90%] flex flex-col gap-y-6'>

                    {courseDividerLoading &&
                    <CircularProgressLoader />
                    }

                    {courseDividerError &&
                        <p className='w-full text-center'>{t('myCourses.error')}</p>
                    }

                    {
                        courseDividerData && courseDividerData.data.length === 0 &&
                        <div className='w-full h-[60vh] flex flex-col justify-center items-center'>
                            <div className='w-20 h-20 mx-auto' >
                                <Attention />
                            </div>
                            <p className='mt-5'>{t('myCourses.noCourses')}</p>
                        </div>
                    }

                    {
                    courseDividerData && courseDividerData.data.length > 0 &&
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
                                            <p className='w-full text-center'>{t('myCourses.error')}</p>
                                        }

                                            <div className='w-full flex flex-col gap-4 md:grid md:grid-cols-2 '>
                                                {
                                                    course.courseType !== 'Guest' && courseData && courseData.data?.map((courseData, index) => (
                                                        
                                                        <MyCourseBox 
                                                            key={index}
                                                            courseData={courseData}
                                                            course={course}
                                                            handleCourseDetails={handleCourseDetails}
                                                            triggerCourseStatusLoading={triggerCourseStatusLoading}
                                                            handleTriggerCourseStatus={handleTriggerCourseStatus}
                                                        />
                                                    ))
                                                }
                                            </div>

                                            { course.courseType !== 'Guest' && 
                                                <Pagination
                                                    totalPagesCount={course?.totalPagesCount} 
                                                    totalCount={course?.totalCount}
                                                    setPageNumber={setPageNumber}
                                                    PageNumber={pageNumber}
                                                    refetch={refetchCourse}
                                                />
                                            }

                                        <div className='w-full flex flex-col gap-4 md:grid md:grid-cols-2 '>
                                            {course.courseType === 'Guest' && guestClassesData && guestClassesData.data.map((guestClass, index) => (
                                                <MyCourseBoxGuest
                                                    key={index}
                                                    guestClass={guestClass}
                                                    handleGuestClassDetails={handleGuestClassDetails}
                                                />
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