import React from 'react';
import { useNavigate } from 'react-router-dom';

// styles
import gradients from '../../styles/Gradient.module.css'

// mui
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';

// context
import { useTranslation } from '../../Utilities/context/TranslationContext';


const ACourseStudentBox = ({studentData, isForHistory, isForClub}) => {

    // language
    const { t } = useTranslation();

    const navigate = useNavigate();

    const handleClickStudent = () => {
        !isForClub && navigate(`/education/studentsList/aStudentCourses/${studentData.id}`)
        isForClub && navigate(`/club/clubCourses/studentsListClub/aStudentClubCourses/${studentData.id}`)
    }
    

    return (
            <div className={`${gradients.container} z-10 flex w-full justify-between items-center h-12 p-4 rounded-2xl text-sm`}
            onClick={handleClickStudent}>

                <div className='w-full flex items-center justify-start gap-x-2'>

                    <span>
                        <PersonOutlineOutlinedIcon />
                    </span>
                    
                    <p className=' truncate w-[74px]'>{studentData.fullName}</p>
                    
                </div>

                {
                    !isForHistory &&
                    <p className='text-[var(--text-accent)] w-full'>{t("education.studentList.activeCourses")}:{studentData.activeCourseCount}</p>
                }
                 
                <p className='w-full text-end text-xs'>{t("education.studentList.deactiveCourses")}:{studentData.disableCourseCount}</p>

            </div>
    );
};

export default ACourseStudentBox;