import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// mui
import AddIcon from '@mui/icons-material/Add';

// styles
import dataBox from '../../../../styles/Boxes/DataBox.module.css'
import ButtonStyles from '../../../../styles/Buttons/ButtonsBox.module.css'

// components
import ClassesBoxCourses from '../Components/ClassesBoxCourses';

const CourseClasses = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    return (
        <div className='w-full flex flex-col gap-y-4 items-center pb-20'>

            <div className=' w-full grid grid-cols-4 items-center text-border-button-yellow gap-x-10'>
                
                <div className='w-full col-span-2 flex flex-col justify-center items-start gap-y-2'>
                    <p className='text-xs'>تعداد کلاس های برگزارشده</p>
                    <p className={` ${dataBox.classDetailsData} w-full h-10 rounded-xl flex items-center justify-center`}>
                    46
                    </p>
                </div>
                
                <div className='w-full col-span-2 flex flex-col justify-center items-start gap-y-2'>
                    <p className='text-xs'>جمع ساعت کلاس ها</p>
                    <p className={` ${dataBox.classDetailsData} w-full h-10 rounded-xl flex items-center justify-center`}>
                    46
                    </p>
                </div>

            </div>

            <ClassesBoxCourses title={'کلاس‌ها'} />
            

            <button onClick={() => navigate(`/education/${id}/AddClass`)} 
            className={`${ButtonStyles.addButton} fixed bottom-28 w-[90%]`} >
                <AddIcon />
                <p>افزودن کلاس جدید</p>
            </button>

        </div>
    );
};

export default CourseClasses;