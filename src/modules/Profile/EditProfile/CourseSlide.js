import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

// style
import boxStyles from '../../../styles/DataBox.module.css'
import ButtonStyles from '../../../styles/ButtonsBox.module.css'

// mui
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

// context
import { useTranslation } from '../../../Utilities/context/TranslationContext';

const CourseSlide = ({courseData}) => {

    // language
    const { t } = useTranslation();
    const location = useLocation();

    const navigate = useNavigate()

    // add to the percentage when the value is 0 so it shos that this bar can ce filled
    const[theOne, setTheOne] = useState(0)

    useEffect(() => {
        if((courseData.percent === 0)) {
            setTheOne(2)
        }
    },[courseData])

    const handleSelect = () => {
        Cookies.set('lastPathBeforMyCourseDetails',location.pathname)
        navigate(`/MyCourses/courseDetails/${courseData.id}/practical`)
    }

    return (
        <div className={`${boxStyles.containerDarkmode} rounded-[34px] h-[228px] z-0 w-[98%] md:w-full flex flex-col justify-start items-center p-4 gap-y-4 mr-1 mt-1`}>
 
            <div className='w-full flex justify-between'>
                <p className=' text-base'>{courseData.name}</p>
                <p>{courseData.percent} %</p>
            </div>

            <Box sx={{ width: '100%' }}>
                <LinearProgress variant="determinate" value={courseData.percent + theOne} 
                sx={{ height:'1rem', borderRadius:'1rem', backgroundColor :'var(--progress-bar-bg)', '& .MuiLinearProgress-bar': {
                    backgroundColor: 'var(--text-warning)' // Change this to your desired color
                }}} />
            </Box>

            <div className='w-full h-full flex justify-between text-start text-sm '>
                
                <div className='flex flex-col justify-between self-start gap-y-2'>
                    { courseData.organization &&
                        <p>{t("profile.userDashboard.courseCard.organization", { organization: courseData.organization })}</p>
                    }
                    { courseData.organization &&
                        <p>{t("profile.userDashboard.courseCard.level", { level: courseData.level })}</p>
                    }
                    { courseData.clubName &&
                        <p>{t("profile.userDashboard.courseCard.clubName", { clubName: courseData.clubName })}</p>
                    }
                    { courseData.coach &&
                        <p>{t("profile.userDashboard.courseCard.coach", { coach: courseData.coach })}</p>
                    }
                    { courseData.coach &&
                        <p>{t("profile.userDashboard.courseCard.courseType")}&nbsp;
                            {courseData.type === 'Retraining' && t("profile.userDashboard.courseCard.courseTypes.retraining")}
                            {courseData.type === 'Regular' && t("profile.userDashboard.courseCard.courseTypes.regular")}
                            {courseData.type === 'Custom' && t("profile.userDashboard.courseCard.courseTypes.custom")}
                        </p>
                    }
                </div>
                <button
                onClick={handleSelect }
                className={`${ButtonStyles.normalButton} self-end`} >
                    {t("profile.userDashboard.courseCard.detailsButton")}
                </button>

            </div>

        </div>
    );
};

export default CourseSlide;