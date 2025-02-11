import React from 'react';

// styles
import boxStyles from '../../styles/DataBox.module.css'
import ButtonStyles from '../../styles/ButtonsBox.module.css';

// assets
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { LinearProgress } from '@mui/material';

// conntext
import { useTranslation } from '../../Utilities/context/TranslationContext';


const MyCourseBox = ({
    course,
    courseData,
    handleCourseDetails,
    triggerCourseStatusLoading,
    handleTriggerCourseStatus
}) => {

    // language
    const { t } = useTranslation();

    return (
        <div  className='w-full flex flex-col items-center'>

            <div className={`${boxStyles.containerDarkmode} rounded-3xl h-auto w-full md:w-full flex flex-col justify-between items-center px-4 py-4 gap-y-4 mt-1 z-10`}>


                <div className='w-full flex justify-between'>
                    
                    {/* conditional course name */}
                    {courseData.status === 'Active' && <p className='text-base'>{courseData.name}</p>}
                    {courseData.status === 'Completed' && <p className='text-base text-textAccent'>{courseData.name}(تمام شده)</p>}
                    {courseData.status === 'Canceled' && <p className='text-base text-textError'>{courseData.name}(لغو شده)</p>}

                    {/* conditional course percent */}
                    <p
                    className={`
                        ${courseData.status === 'Completed'&& 'text-textAccent'}
                        ${courseData.status === 'Canceled'&& 'text-textError'}
                        ${courseData.status === 'Active'&& ''}
                    `}
                    >{courseData.percent}%</p>
                </div>

                <Box sx={{ width: '100%' }}>
                    <LinearProgress 
                        variant="determinate" 
                        value={courseData.percent + (courseData.percent < 2 ? 2 : 0)} 
                        sx={{
                        height: '1rem', 
                        borderRadius: '1rem', 
                        backgroundColor: 'var(--progress-bar-bg)', 
                        '& .MuiLinearProgress-bar': {
                            backgroundColor: 
                            courseData.status === 'Active' ? 'var(--text-warning)' :
                            courseData.status === 'Completed' ? 'var(--text-accent)' :
                            courseData.status === 'Canceled' ? 'var(--text-error)' :
                            undefined, // Optional: A default value if none of the conditions match
                        }
                        }} 
                    />
                </Box>

                <div className='w-full flex justify-between text-start text-sm'>
                    <div className='flex flex-col justify-center gap-y-2 self-start'>
                        { courseData.organization && courseData.type !== 'Regular' &&
                            <p className={`${(courseData.status === 'Canceled' || courseData.status === 'Completed') ? 'text-textButtonMainDisabled' : 'text-textDefault'}`}>
                                <span >
                                    {t('myCourses.organization')}:&nbsp;
                                </span>
                                {courseData.organization}
                            </p>
                        }
                        { courseData.clubName &&
                            <p className={`${(courseData.status === 'Canceled' || courseData.status === 'Completed') ? 'text-textButtonMainDisabled' : 'text-textDefault'}`}>
                                <span >
                                {t('myCourses.club')}:&nbsp;
                                </span>
                                {courseData.clubName}
                            </p>
                        }
                        { courseData.coach &&
                            <p className={`${(courseData.status === 'Canceled' || courseData.status === 'Completed') ? 'text-textButtonMainDisabled' : 'text-textDefault'}`}>
                                <span >
                                    {t('myCourses.coach')}:&nbsp;
                                </span> 
                                {courseData.coach}
                            </p>
                        }
                    </div>
                    <button onClick={handleCourseDetails(courseData.id)} className={`${ButtonStyles.normalButton} self-end`} >
                        {t('myCourses.details')}  
                    </button>

                </div>

            </div>

            {/* Trigger course status */}
            {course.status === 'Pending' &&
                <div className='w-full min-h-14 rounded-b-3xl z-0 mt-[-1rem] pt-5 flex justify-between px-3 bg-bgOutputDefault shadow-lg' >

                    <div className='flex justify-center text-xs gap-x-2 items-center gap-y-10'>
                        <div className='w-2 h-2 rounded-full' style={{backgroundColor:'var(--text-error)'}}></div>
                        <p >{t('myCourses.confirmCourse')}</p>
                    </div>

                    <div className='flex gap-x-4 items-center px-4'>

                        {triggerCourseStatusLoading && 
                            <Box sx={{ display: 'flex', width:'full' , justifyContent:'center' }}>
                                <CircularProgress sx={{width:'1rem'}} /> 
                            </Box>
                        }

                        <p
                        className='text-textAccent text-sm font-semibold'
                        onClick={(event) => !triggerCourseStatusLoading && handleTriggerCourseStatus(event, 'active', course.id)}>
                            {t('myCourses.confirm')}
                        </p>
                        <p
                        className='text-textError text-sm font-semibold'
                        onClick={(event) => !triggerCourseStatusLoading && handleTriggerCourseStatus(event, 'rejected', course.id)}>
                            {t('myCourses.decline')}
                        </p>

                    </div>
                </div>
            } 

        </div>
    );
};

export default MyCourseBox;