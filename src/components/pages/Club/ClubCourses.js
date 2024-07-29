import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// mui 
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';

// styles
import ButtonStyles from '../../../styles/Buttons/ButtonsBox.module.css'

// queries
import { useClubCourses, useGetClubCoursesDividers } from '../../../Utilities/Services/clubQueries';

// comnponents
import PageTitle from '../../reuseable/PageTitle';
import DropDownLine from '../../reuseable/DropDownLine';
import { toast } from 'react-toastify';

const ClubCourses = () => {

    const navigate = useNavigate()

    // courseData
    const [courseType, setCourseType] = useState('')
    const [organizationId, setOrganizationId] = useState('')
    const [pageNumber, setPageNumber] = useState(1)

    const [DropDown, setDropDown] = useState('')

    const { data: clubCourseDividerData, isLoading: clubCourseDividerLoading, error: clubCourseDividerError } = useGetClubCoursesDividers();
    const { data: courseData, isLoading: courseDataLoading, error: courseDataError } = useClubCourses(courseType, organizationId, pageNumber);

    const diabledButton = () => {
        toast('این بخش در حال توسعه است ...', {
            type: 'success',
            position: 'top-right',
            autoClose: 5000,
            theme: 'dark',
            style: { width: "90%" }
          });
    }

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
        <div className='w-full flex flex-col items-center pt-14 gap-y-4'>

            <PageTitle  title='دوره ها' />

            <div className='w-[90%] flex flex-col items-center' >

                {clubCourseDividerLoading &&
                    <Box sx={{ display: 'flex', width:'full' , justifyContent:'center', marginTop:'4rem' }}>
                        <CircularProgress /> 
                    </Box>
                }

                {clubCourseDividerError &&
                    <p className='w-full text-center'>مشکلی پیش اماده, دوباره تلاش کنید</p>
                }

                {
                    !clubCourseDividerData && !clubCourseDividerLoading && !clubCourseDividerError &&
                    <p className='h-60vh w-full text-center flex justify-center items-center'> دوره ای اضافه نشده</p>
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

                                    {
                                        courseData && courseData.data?.map((course) => (
                                            <div className='w-full flex flex-col items-center'>

                                                <div
                                                key={course.id}
                                                className="w-full justify-between items-center px-4 py-4 rounded-[1.6rem] flex flex-col gap-y-6 md:col-span-1 z-10 text-xs"
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
                                                                <div className='w-3 h-3 rounded-full' style={{backgroundColor:'var(--red-text)'}}></div>
                                                                }
                                                                {course.status === 'Disable' &&
                                                                <div className='w-3 h-3 rounded-full' style={{backgroundColor:'var(--red-text)'}}></div>
                                                                }

                                                            </div>

                                                        </div>

                                                        <button
                                                        onClick={diabledButton}
                                                        className={`${ButtonStyles.normalButton} self-end`} >
                                                            جزئیات  
                                                        </button>

                                                    </div>
                                                </div>

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

            <div className='fixed bottom-[3.3rem] w-[90%] bg-[#131423] rounded-xl md:w-96 md:relative md:bottom-0 md:top-4 h-[56px] z-30' >
                <button className={`${ButtonStyles.addButton} w-full`} onClick={() => navigate('/club/addCourseToClub')}>
                    <AddIcon />
                    <p>افزودن مورد جدید</p>
                </button>
            </div>

        </div>
    );
};

export default ClubCourses;