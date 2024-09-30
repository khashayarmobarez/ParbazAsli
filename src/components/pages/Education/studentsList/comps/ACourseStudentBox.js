import React from 'react';
import { useNavigate } from 'react-router-dom';

// styles
import gradients from '../../../../../styles/gradients/Gradient.module.css'

// mui
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';


const ACourseStudentBox = ({studentData, isForHistory}) => {

    const navigate = useNavigate();

    
    // for handling the back button of club course details
    // Cookies.set('lastPathForStudentDetails',location.pathname)
    


    return (
            <div className={`${gradients.container} z-10 flex w-full justify-between items-center h-12 px-4 rounded-2xl text-sm`}>
                <span>
                    <PersonOutlineOutlinedIcon />
                </span>
                
                <p className='-mr-4'>{studentData.fullName}</p>

                <p className='text-[var(--yellow-text)]'>دوره فعال:{studentData.activeCourseCount}</p>
                 
                <p>دوره غیر فعال:{studentData.disableCourseCount}</p>

            </div>
    );
};

export default ACourseStudentBox;