import React from 'react';
import { useNavigate } from 'react-router-dom';

// styles
import gradients from '../../styles/gradients/Gradient.module.css'

// mui
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';


const ACourseStudentBox = ({studentData, isForHistory, isForClub}) => {

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
                    
                    <p className=''>{studentData.fullName}</p>
                    
                </div>

                {
                    !isForHistory &&
                    <p className='text-[var(--text-accent)] w-full'>دوره فعال:{studentData.activeCourseCount}</p>
                }
                 
                <p className='w-full'>دوره غیر فعال:{studentData.disableCourseCount}</p>

            </div>
    );
};

export default ACourseStudentBox;