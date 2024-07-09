import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// styles
import dataBox from '../../../../styles/Boxes/DataBox.module.css'

// queries
import { useUserCourseClasses } from '../../../../Utilities/Services/StudentCoursesQueries';

// components
import ClassesBoxMyCourses from '../MyComponents/ClassesBoxMyCourses';

const TheoryMyCourse = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const {  data: classesData, isLoading: classesDataLoading, error: classesDataError } = useUserCourseClasses(id);


    return (
        <div className='w-full flex flex-col gap-y-4 items-center pb-20'>

            {classesData && classesData.data.classesCount === 0 && 
                <p> هنوز کلاس  تئوری برای این دوره توسط مربی ثبت نشده</p>
            }

            {classesData && classesData.data.classesCount > 0 &&
            <>
            
                {/* group name of data */}
                <div className='flex justify-between items-center w-full gap-x-2'>
                    <h2 className='text-nowrap' >کلاس ها</h2>
                    <div id='line' className='w-full h-[1px] rounded-xl bg-[#D9D9D9]'></div>
                </div>

                {
                    classesData.data.classes.map((classData) => {
                    return <ClassesBoxMyCourses title={'کلاس‌ها'} key={classData.id} classData={classData} />;
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

export default TheoryMyCourse;