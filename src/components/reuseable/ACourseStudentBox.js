import React from 'react';
import { useNavigate } from 'react-router-dom';

// styles
import gradients from '../../styles/gradients/Gradient.module.css'

// mui
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';


const ACourseStudentBox = ({studentData, isForHistory, isForClub}) => {

    const navigate = useNavigate();

    
    // for handling the back button of club course details
    // Cookies.set('lastPathForStudentDetails',location.pathname)

    const handleClickStudent = () => {
        !isForClub && navigate(`/education/studentsList/aStudentCourses/${studentData.id}`)
        isForClub && navigate(`/club/clubCourses/studentsListClub/aStudentClubCourses/${studentData.id}`)
    }
    


    return (
            <div className={`${gradients.container} z-10 flex w-full justify-between items-center h-12 px-4 rounded-2xl text-sm`}
            onClick={handleClickStudent}>

                <span>
                    <PersonOutlineOutlinedIcon />
                </span>
                
                <p className='-mr-4'>{studentData.fullName}</p>

                {
                    !isForHistory &&
                    <p className='text-[var(--yellow-text)]'>دوره فعال:{studentData.activeCourseCount}</p>
                }
                 
                <p>دوره غیر فعال:{studentData.disableCourseCount}</p>

            </div>
    );
};

export default ACourseStudentBox;