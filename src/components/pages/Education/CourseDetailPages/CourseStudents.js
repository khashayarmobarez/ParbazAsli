import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// styles
import gradients from '../../../../styles/gradients/Gradient.module.css'

// mui
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

// assests
import clipboard from '../../../../assets/icons/clipboard.svg'

// queries
import { useACourseStudents } from '../../../../Utilities/Services/coursesQueries';

const CourseStudents = () => {
    
    const navigate = useNavigate();
    const { id } = useParams();

    const { data: studentsData, isLoading: studentsDataLoading, error: studentsDataError } = useACourseStudents(id,pageNumber);
    
    const pageNumber = 1;

    // add to the percentage when the value is 0 so it shos that this bar can ce filled
    const[theOne, setTheOne] = useState(0)    
    
    useEffect(() => {
        if((studentsData.percent === 0)) {
            setTheOne(2)
        }
    },[studentsData])

    return (
        <div className='w-full flex flex-col items-center'>
            <div className='w-full flex flex-col'>

            {
                studentsDataLoading &&
                <Box sx={{ display: 'flex', width:'full' , justifyContent:'center', marginTop:'4rem' }}>
                    <CircularProgress /> 
                </Box>
            }

            {
                studentsDataError &&
                <p className='w-full text-center'>مشکلی پیش اماده, دوباره تلاش کنید</p>
            }

            {
                studentsData && studentsData.data?.map((student) => (
                    <div className={`${gradients.container} flex w-full justify-between items-center h-12 pr-3 rounded-2xl text-sm`}>
                        <span>
                            <PersonOutlineOutlinedIcon />
                        </span>
                        <p>{student.name}</p>
                        <p>{student.joinDateTime}</p>
                        <Box sx={{ display: 'flex' , justifyContent:'center' }}>
                            <CircularProgress variant="determinate" value={student.percent + theOne }
                            sx={{'& .MuiCircularProgress-circle': {stroke: 'var(--softer-white)'},}}/>
                        </Box>
                        <button onClick={() => navigate('/education/StudentDetails')} className={`${gradients.clipboardButtonBackgroundGradient} w-14 h-full flex items-center justify-center rounded-l-xl`}>
                            <img src={clipboard} alt='icon' />
                        </button>
                    </div>
                ))
            }
            </div>
        </div>
    );
};

export default CourseStudents;