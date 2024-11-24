import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// mui
import AddIcon from '@mui/icons-material/Add';

// styles
import dataBox from '../../../styles/Boxes/DataBox.module.css'
import ButtonStyles from '../../../styles/Buttons/ButtonsBox.module.css'

// queries
import { useACourseClasses } from '../../../Utilities/Services/coursesQueries';

// components
import ClassesBoxCourses from '../../../components/pages/Education/ClassesBoxCourses';

const CourseClasses = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const {  data: classesData } = useACourseClasses(id);
    

    return (
        <div className='w-full flex flex-col gap-y-8 items-center pb-20 '>

            {classesData && classesData.data.classesCount < 1 &&
                <p className='w-full text-center text-textWarning'>کلاسی اضافه نشده است</p>
            }
            
            {classesData && classesData.data.classesCount > 0 &&
            <>
                <div className=' w-full grid grid-cols-4 items-center text-border-button-yellow gap-x-6'>
                    
                    <div className='w-full col-span-2 flex flex-col justify-center items-start gap-y-2'>
                        <p className='text-xs'>تعداد کلاس های برگزارشده</p>
                        <p className={` ${dataBox.classDetailsData} w-full h-10 rounded-xl flex items-center justify-center`}>
                        {classesData.data.classesCount}
                        </p>
                    </div>
                    
                    <div className='w-full col-span-2 flex flex-col justify-center items-start gap-y-2'>
                        <p className='text-xs'>جمع ساعت کلاس ها</p>
                        <p className={` ${dataBox.classDetailsData} w-full h-10 rounded-xl flex items-center justify-center`}>
                        {classesData.data.totalClassHours}
                        </p>
                    </div>

                </div>
            
                <div className='w-full flex flex-col items-center gap-y-4'>
                {
                    classesData.data.classes.map((classData) => {
                    return <ClassesBoxCourses title={'کلاس‌ها'} key={classData.id} classData={classData} />;
                    })
                }
                </div>
            </>
            }

            

            <button onClick={() => navigate(`/education/${id}/AddClass`)} 
            className={`${ButtonStyles.addButton} fixed bottom-[7.8rem] w-[90%] md:w-2/6 z-10`} >
                <AddIcon />
                <p>افزودن کلاس جدید</p>
            </button>

        </div>
    );
};

export default CourseClasses;