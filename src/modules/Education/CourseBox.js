import React from 'react';

// context
import { useTranslation } from '../../Utilities/context/TranslationContext';

// styles
import ButtonStyles from '../../styles/ButtonsBox.module.css';

// assets
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';


const CourseBox = ({ 
    course,
    isForClub,
    handleCourseDetails,
    triggerCourseStatusLoading,
    handleTriggerCourseStatus
}) => {

    const { t } = useTranslation();


    return (
        <div className='w-full flex flex-col items-center z-30'>

            <div
                key={course.id}
                className="w-full justify-between items-center px-4 py-4 rounded-[1.6rem] flex flex-col gap-y-4 md:col-span-1 z-10 text-xs bg-bgCard "
                style={{boxShadow:'var(--shadow-all)'}}
            >
                <div className='w-full flex justify-between items-center'>
                
                    <h1 className='text-base'>{course.name}</h1>

                    <div className='flex gap-x-1'>

                        <p className='text-textButtonProfileDisable '>{t("education.courseStatus")}&nbsp;
                            {course.status === 'Active' && 
                                <span className='text-textAccent'>{t("education.active")}</span>
                            }
                            {course.status === 'Pending' &&
                                <span className='text-textWarning'> {t("education.pending")}</span>
                            }
                            {course.status === 'Disable' && 
                                <span className=''> {t("education.inactive")}</span>
                            }
                            {course.status === 'Rejected' && 
                                <span className='text-textError'>{t("education.rejected")}</span>
                            }
                        </p>

                    </div>
                
                </div>

                {
                isForClub &&
                    <p className=''>{t("education.coachName")}:    
                        <span className='text-sm'> {course.coachFullName}</span>
                    </p>
                }

                <div className='w-full flex justify-between items-center'>

                    <div className='flex flex-col text-start gap-y-3'>
                        
                        {
                            course.type === 'Regular' &&
                            <p className='text-sm'>
                                {course.organization}
                            </p>
                        }
                        {
                            course.type === 'Retraining' &&
                            <p className='text-sm'>
                                <span className=''>{t("education.level")}:</span> {course.level}
                            </p>
                        } 

                        <p>
                            <span className=''>{t("education.flightsCount")}: </span>{course.flightCount}
                        </p>

                        {
                        course.clubName &&
                            <p>
                                <span className=''>{t("education.clubName")}: </span> {course.clubName}
                            </p>
                        }

                    </div>

                    <div className='flex flex-col text-start gap-y-2'>
                        <p>
                            <span className=''>{t("education.activeStudentCount")}: </span>{course.activeStudentCount}
                        </p>
                        <p>
                            <span className=''>{t("education.previousStudentCount")}: </span>{course.historyStudentCount}
                        </p>
                    </div>

                </div>

                {
                    course.status !== 'Rejected' &&
                        <button onClick={handleCourseDetails(course.id)} className={`${ButtonStyles.normalButton} self-center`} >
                            {t("education.courseDetails")} 
                        </button>
                }

            </div>

            {/* Trigger course status */}
            {course.status === 'Pending' && !isForClub &&
                <div className='w-full min-h-14 rounded-b-3xl z-0 mt-[-1rem] pt-4 flex justify-between px-4 bg-bgOutputDefault'>

                    <div className='flex justify-center text-xs gap-x-2 items-center gap-y-10'>
                        <div className='w-2 h-2 rounded-full' style={{backgroundColor:'var(--text-error)'}}></div>
                        <p >{t("education.approveCourse")}</p>
                    </div>

                    <div className='flex gap-x-6 items-center px-2'>

                        {triggerCourseStatusLoading && 
                            <Box sx={{ display: 'flex', width:'full' , justifyContent:'center' }}>
                                <CircularProgress sx={{width:'1rem'}} /> 
                            </Box>
                        }
                        
                        <p onClick={(event) => !triggerCourseStatusLoading && handleTriggerCourseStatus(event, 'active', course.id)} className='text-textAccent text-sm font-medium'  >
                            {t("education.approve")}
                        </p>

                        <p onClick={(event) => !triggerCourseStatusLoading && handleTriggerCourseStatus(event, 'rejected', course.id)} className='text-textError text-sm font-medium' >
                            {t("education.reject")}
                        </p>

                    </div>
                </div>
            } 

        </div>
    );
};

export default CourseBox;