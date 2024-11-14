import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// styles
import dataBox from '../../../../styles/Boxes/DataBox.module.css'

// queries
import { useGetClubCourseClasses } from '../../../../Utilities/Services/clubQueries';

// components
import ClubCourseClassBox from './components/ClubCourseClassBox';

const ClubCourseClasses = () => {
    
    const { id } = useParams();

    const {  data: classesData, isLoading: classesDataLoading, error: classesDataError } = useGetClubCourseClasses(id);
    

    return (
        <div className='w-full flex flex-col gap-y-6 items-center pb-20'>

            {classesData && classesData.data.classesCount === 0 &&
                <p className='w-full text-center text-textWarning'>کلاسی اضافه نشده است</p>
            }
            
            {classesData && classesData.data.classesCount > 0 &&
            <>
                <div className=' w-full grid grid-cols-4 items-center text-border-button-yellow gap-x-10'>
                    
                    <div className='w-full col-span-2 flex flex-col justify-center items-start gap-y-2'>
                        <p className='text-xs'>تعداد کلاس های برگزار شده</p>
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

                {
                    classesData.data.classes.map((classData) => {
                    return <ClubCourseClassBox title={'کلاس‌ها'} key={classData.id} classData={classData} />;
                    })
                }

            </>
            }

        </div>
    );
};

export default ClubCourseClasses;