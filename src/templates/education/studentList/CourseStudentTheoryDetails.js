import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

// styles
import boxStyles from '../../../styles/Boxes/DataBox.module.css'

// mui
import { Box, CircularProgress } from '@mui/material';

// queries
import { useCourseStudentClasses } from '../../../Utilities/Services/coursesQueries';

// components
import CourseClassesBoxMyCourses from '../../../modules/Education/courseStudentDetails/CourseClassesBoxMyCourses';

const CourseStudentTheoryDetails = () => {

    const { studentId } = useParams();
    const location = useLocation()
    
    const isForClub = location.pathname.includes('/club')

    const {  data: classesData, isLoading: classesDataLoading, error: classesDataError } = useCourseStudentClasses(studentId, isForClub);


    
    return (
        <div className='w-full flex flex-col gap-y-4 items-center pb-20'>

            {
                classesDataLoading &&
                <Box sx={{ display: 'flex', width:'100%' , justifyContent:'center', marginTop:'4rem' }}>
                    <CircularProgress /> 
                </Box>
            }

            {classesData && classesData.data.classesCount < 1 && 
                <p className='text-textWarning mb-4'> هنوز کلاس  تئوری برای این دوره توسط مربی ثبت نشده</p>
            }

            {classesData && classesData.data.classesCount > 0 &&
            <>

                    <div className='flex w-full justify-between gap-x-2 mb-2'>
                        
                            <div className='w-full flex flex-col items-center gap-y-2'>
                                <p className=' text-xs'>تعداد کلاس های برگزار شده</p>
                                <div className= {`${boxStyles.classDetailsData} flex justify-center items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                    <p>{classesData.data.classesCount}</p>
                                </div>
                            </div>

                            <div className='w-full flex flex-col items-center gap-y-2'>
                                <p className=' text-xs'>جمع ساعت کلاس ها</p>
                                <div className= {`${boxStyles.classDetailsData} flex justify-center items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                    <p>{classesData.data.totalClassHours}</p>
                                </div>
                            </div>

                    </div>

                {
                    classesData.data.classes.map((classData) => {
                    return <CourseClassesBoxMyCourses title={'کلاس‌ها'} key={classData.id} classData={classData} />;
                    })
                }

                {/* group name of data */}
                {/* <div className='flex justify-between items-center w-full gap-x-2 mt-4'>
                    <h2 className='text-nowrap'>کلاس های مهمان </h2>
                    <div id='line' className='w-full h-[1px] rounded-xl bg-[#D9D9D9]'></div>
                </div> */}
            </>
            }
            
        </div>
    );
};

export default CourseStudentTheoryDetails;