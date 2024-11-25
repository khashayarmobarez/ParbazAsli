import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// style
import boxStyles from '../../../../styles/Boxes/DataBox.module.css'
import ButtonStyles from '../../../../styles/Buttons/ButtonsBox.module.css'

// mui
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

const CourseSlide = ({courseData}) => {

    const navigate = useNavigate()

    // add to the percentage when the value is 0 so it shos that this bar can ce filled
    const[theOne, setTheOne] = useState(0)

    useEffect(() => {
        if((courseData.percent === 0)) {
            setTheOne(2)
        }
    },[courseData])

    return (
        <div className={`${boxStyles.containerDarkmode} rounded-3xl h-[190px] z-0 w-[98%] md:w-full flex flex-col justify-between items-center px-4 py-4 gap-y-0 mr-1 mt-1`}>

            <div className='w-full flex justify-between'>
                <p className=' text-base'>{courseData.name}</p>
                <p>{courseData.percent} %</p>
            </div>

            <Box sx={{ width: '100%',marginTop:'-0.5rem' }}>
                <LinearProgress variant="determinate" value={courseData.percent + theOne} 
                sx={{ height:'1rem', borderRadius:'1rem', backgroundColor :'var(--progress-bar-bg)', '& .MuiLinearProgress-bar': {
                    backgroundColor: 'var(--text-warning)' // Change this to your desired color
                }}} />
            </Box>

            <div className='w-full flex justify-between text-start text-sm'>
                <div className='flex flex-col justify-between self-start'>
                    { courseData.organization &&
                        <p>ارگان: {courseData.organization}</p>
                    }
                    { courseData.organization &&
                        <p>مقطع: {courseData.level}</p>
                    }
                    { courseData.clubName &&
                        <p>باشگاه: {courseData.clubName}</p>
                    }
                    { courseData.coach &&
                        <p>مربی: {courseData.coach}</p>
                    }
                    { courseData.coach &&
                        <p>نوع دوره:  
                            {courseData.type === 'Retraining' && ' بازآموزی '}
                            {courseData.type === 'Regular' && ' آموزشی'}
                            {courseData.type === 'Custom' && ' شخصی سازی شده'}
                        </p>
                    }
                </div>
                <button
                onClick={() => navigate(`/MyCourses/courseDetails/${courseData.id}/practical`) }
                className={`${ButtonStyles.normalButton} self-end`} >
                    جزئیات  
                </button>

            </div>

        </div>
    );
};

export default CourseSlide;