import React, { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

// mui
import AddIcon from '@mui/icons-material/Add';

// styles
import dataBox from '../../../styles/Boxes/DataBox.module.css'
import ButtonStyles from '../../../styles/Buttons/ButtonsBox.module.css'

// queries
import { useACourse, useACourseClasses } from '../../../Utilities/Services/coursesQueries';

// components
import ClassesBoxCourses from '../../../modules/Education/ClassesBoxCourses';

const CourseClasses = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const isForClub = location.pathname.includes('/club')

    const {  data: classesData } = useACourseClasses(id, isForClub);
    const { data: aCourseData } = useACourse(id, isForClub);
    

    return (
        <div className='w-full flex flex-col gap-y-8 items-center pb-28 '>

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
                    return <w title={'کلاس‌ها'} key={classData.id} classData={classData} />;
                    })
                }
                </div>
            </>
            }

            
            {
                aCourseData?.data.accesses.canAddClass &&
                    <div className='fixed bottom-[7.85rem] w-[90%] md:w-2/6 z-10'>
                        <div className="relative z-10">
                            <button 
                                onClick={() => navigate(`/education/${id}/AddClass`)} 
                                className={`${ButtonStyles.addButton} w-full`}
                            >
                                <AddIcon />
                                <p>افزودن کلاس جدید</p>
                            </button>
                        </div>
                        <div className="bg-bgPageMain opacity-90 h-10 w-full -mt-4 relative z-0" />
                    </div>
            }

        </div>
    );
};

export default CourseClasses;