import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

// mui 
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';

// styles
import ButtonStyles from '../../../styles/Buttons/ButtonsBox.module.css'
import boxStyles from '../../../styles/Boxes/DataBox.module.css'

// assets
import Attention from '../../../components/icons/Attention';

// queries
import { useClubCourseCounts, useClubCourses, useGetClubCoursesDividers } from '../../../Utilities/Services/clubQueries';

// comnponents
import PageTitle from '../../../components/reuseable/PageTitle';
import DropDownLine from '../../../components/reuseable/DropDownLine';
import CircularProgressLoader from '../../../components/Loader/CircularProgressLoader';

const ClubCourses = () => {

    const navigate = useNavigate()
    const location = useLocation();

    // courseData
    const [courseType, setCourseType] = useState('')
    const [organizationId, setOrganizationId] = useState(1)
    const [pageNumber, setPageNumber] = useState(1)

    const [DropDown, setDropDown] = useState('')

    const { data: courseCountsData, isLoading: courseCountsLoading } = useClubCourseCounts();
    const { data: clubCourseDividerData, isLoading: clubCourseDividerLoading, error: clubCourseDividerError } = useGetClubCoursesDividers();
    const { data: courseData, isLoading: courseDataLoading, error: courseDataError } = useClubCourses(courseType, organizationId, pageNumber);

    // open the first drop down when the users comes in
    // to set the first state for dropdown 
    useEffect(() => {
        if(clubCourseDividerData && clubCourseDividerData.data.length > 0) {
            setDropDown('dropDown0')
            setCourseType(clubCourseDividerData.data[0].courseType)
            setOrganizationId(clubCourseDividerData.data[0].organizationId)
        }
    }, [clubCourseDividerData])

    // for handling the back button of club course details
    Cookies.set('lastPathForClubCourseDetails',location.pathname)


    const handleClubCourseDetails = (id) => () => {
        navigate(`/club/courseDetails/${id}/students`);
    };

    // dropDown onClick
    const handleDropDownClick = (index, course) => {
        setDropDown(DropDown === `dropDown${index}` ? '' : `dropDown${index}`)
        setCourseType(course.courseType)
        setOrganizationId(course.organizationId)
        setPageNumber(1)
    }


    const handleNextPageNumber = () => {
        setPageNumber(prev => prev + 1)
    }

    const handleLastPageNumber = () => {
        setPageNumber(prev => prev - 1)
    }


    return (
        <div className='w-full flex flex-col items-center pt-14 gap-y-4 pb-14 '>

            <div className='w-full flex flex-col items-center gap-y-4 md:w-[70%] lg:gap-y-12 lg:w-[55%]' >

            <PageTitle  title='دوره ها' navigateTo={'/club'} />

                <div className='w-[90%] flex flex-col gap-y-6'>

                    {
                    clubCourseDividerLoading && courseCountsLoading &&
                        <CircularProgressLoader />
                    }

                    {
                    clubCourseDividerError &&
                        <p className='w-full text-center'>مشکلی پیش اماده, دوباره تلاش کنید</p>
                    }

                    {clubCourseDividerData && clubCourseDividerData.data.length < 1 &&
                        <div className='w-full h-[60vh] flex flex-col justify-center items-center text-textWarning'>
                            <span className='w-14 h-14 mb-2'>
                                <Attention />
                            </span>
                            <p>در حال حاضر دوره ای وجود ندارد</p>
                        </div>
                    }

                    {
                    courseCountsData && clubCourseDividerData?.data.length > 0 &&
                        <div className='grid grid-cols-2 w-full justify-between gap-y-4 gap-x-[6%]'>
                            
                                <div className='w-full flex flex-col items-center gap-y-2'>
                                    <p className=' text-xs'>دوره های فعال</p>
                                    <div className= {`${boxStyles.classDetailsData} flex justify-center items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                        <p>{courseCountsData.data.activeCourseCounts}</p>
                                    </div>
                                </div>

                                <div className='w-full flex flex-col items-center gap-y-2'>
                                    <p className=' text-xs'>دوره های غیرفعال</p>
                                    <div className= {`${boxStyles.classDetailsData} flex justify-center items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                        <p>{courseCountsData.data.disableCourseCounts}</p>
                                    </div>
                                </div>

                                <div className='w-full flex flex-col items-center gap-y-2'>
                                    <div className= {`${ButtonStyles.normalButton} flex justify-center items-center px-4 w-full h-12 rounded-xl text-xs`}  id='data'
                                    onClick={() => navigate('/club/clubCourses/studentsListClub/1')}>
                                        <p>هنرجویان فعال ({courseCountsData.data.activeStudentCounts})</p>
                                    </div>
                                </div>

                                <div className='w-full flex flex-col items-center gap-y-2'>
                                    <div className= {`${ButtonStyles.normalButton} flex justify-center items-center px-4 w-full h-12 rounded-xl text-xs`}  id='data'
                                    onClick={() => navigate('/club/clubCourses/studentsListClub/2')}>
                                        <p>هنرجویان سابق ({courseCountsData.data.disableStudentCounts})</p>
                                    </div>
                                </div>
                                
                        </div>
                    }

                    {clubCourseDividerData && clubCourseDividerData.data.length > 0 &&
                        clubCourseDividerData.data.map((course, index) => (
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

                                        {
                                            courseDataError &&
                                            <p className='w-full text-center'>مشکلی پیش اماده, دوباره تلاش کنید</p>
                                        }

                                        <div className='w-full flex flex-col gap-4 md:grid md:grid-cols-2 '>
                                            {
                                                courseData && courseData.data?.map((course) => (
                                                    <div key={course.id} className='w-full flex flex-col items-center'>

                                                        <div
                                                        className="w-full justify-between items-center px-4 py-4 rounded-[1.6rem] flex flex-col gap-y-4 md:col-span-1 z-10 text-xs bg-bgOutputDefault"
                                                        style={{
                                                            boxShadow: 'var(--shadow-all)'
                                                        }}
                                                        >
                                                            <div className='w-full flex justify-between items-center'>
                                                            
                                                                <h1 className='text-base'>{course.name}</h1>

                                                                <div className='flex gap-x-1'>

                                                                    <p className='text-textButtonMainDisabled'>وضعیت:
                                                                        {course.status === 'Active' && 
                                                                            <span className='text-textAccent'> فعال</span>
                                                                        }
                                                                        {course.status === 'Pending' &&
                                                                            <span className='text-textWarning'> در انتظار تایید</span>
                                                                        }
                                                                        {course.status === 'Disable' && 
                                                                            <span className='text-textButtonProfileDisable'> غیر فعال</span>
                                                                        }
                                                                        {course.status === 'Rejected' && 
                                                                            <span className='text-textError'> رد شده</span>
                                                                        }
                                                                    </p>

                                                                </div>
                                                            
                                                            </div>

                                                            <p className={` -mt-1 flex gap-x-1 items-center`}>
                                                                <p className=''>نام مربی: </p>
                                                                <span className='text-sm'>{course.coachFullName}</span>
                                                            </p>

                                                            <div className='w-full flex justify-between items-center'>

                                                                <div className={`${course.status === 'Disable' ? 'textButtonProfileDisable' : 'text-textDefault'}
                                                                flex flex-col text-start gap-y-3`}>
                                                                    
                                                                    {
                                                                        course.type === 'Regular' &&
                                                                        <p className='text-sm'>
                                                                            {course.organization}
                                                                        </p>
                                                                    }
                                                                    {
                                                                        course.type === 'Retraining' &&
                                                                        <p className='text-sm'>
                                                                            <span className=' '>مقطع:</span> {course.level}
                                                                        </p>
                                                                    } 

                                                                    <p>
                                                                        <span className=''>تعداد پرواز: </span> {course.flightsCount}
                                                                    </p>

                                                                    { course.clubName &&
                                                                        <p>
                                                                            <span className=''>باشگاه: </span> {course.clubName}
                                                                        </p>
                                                                    }

                                                                </div>

                                                                <div className={`flex flex-col text-start gap-y-2
                                                                ${course.status === 'Disable' ? 'textButtonProfileDisable' : 'text-textDefault'}`}>
                                                                    <p>
                                                                        <span className=''>تعداد هنرجویان فعال: </span>{course.activeStudentCounts}
                                                                    </p>
                                                                    <p>
                                                                        <span className=''>تعداد هنرجویان سابق: </span>{course.historyStudentCounts}
                                                                    </p>
                                                                </div>


                                                            </div>

                                                            {
                                                                course.status !== 'Rejected' &&
                                                                    <button onClick={handleClubCourseDetails(course.id)} className={`${ButtonStyles.normalButton} self-center`} >
                                                                        جزئیات
                                                                    </button>
                                                            }

                                                        </div>

                                                    </div>
                                                ))
                                            }
                                        </div>

                                        {courseData && courseData.totalPagesCount > 1 &&
                                            <div className='w-full flex justify-between mt-2'>
                                                <p onClick={handleNextPageNumber} className='' style={{color:'var(--text-accent)'}} >{courseData.totalPagesCount > 1 && pageNumber !== courseData.totalPagesCount && 'بقیه ی دوره ها ...'}</p>
                                                <p onClick={handleLastPageNumber} className='' style={{color:'var(--text-accent)'}} >{pageNumber > 1 && 'دوره های قبلی'}</p>
                                            </div>
                                        }

                                    </div>
                                }

                            </div>
                        ))
                    }

                </div>

            </div>

            <div className='fixed bottom-[4rem] w-[90%] rounded-xl md:w-96 md:relative md:bottom-0 md:top-4 h-[56px] z-30' >
                <button className={`${ButtonStyles.addButton} w-full`} onClick={() => navigate('/club/addCourseToClub')}>
                    <AddIcon />
                    <p>افزودن دوره جدید</p>
                </button>
            </div>

        </div>
    );
};

export default ClubCourses;