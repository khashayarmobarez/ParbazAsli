import React from 'react';
import Cookies from 'js-cookie';

// styles
import gradients from '../../styles/Gradient.module.css'


// mui
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import MoreVertIcon from '@mui/icons-material/MoreVert';

// context
import { useTranslation } from '../../Utilities/context/TranslationContext';



const StudentBox = ({
    student,
    showActiveStudentOptions,
    setShowActiveStudentOptions,
    handleClickStudent,
    aCourseData,
    triggerStudentStatusLoading,
    handleTriggerStudentStatus
}) => {

    // language
    const { t } = useTranslation();
    const dir = Cookies.get('dir') || 'ltr';


    return (
        <div className={`flex flex-col w-full mb-2 ${showActiveStudentOptions === student.id && 'z-30'}`}>
            <div className={`${gradients.container} z-10 flex w-full justify-between items-center h-12 mt-[-1rem] rounded-2xl text-xs
            ${dir === 'ltr' ? 'pl-3' : 'pr-3'}`}>
                <div className='flex items-center justify-start gap-x-2'>
                    <span onClick={() => handleClickStudent(student.id, student.status)}>
                        <PersonOutlineOutlinedIcon sx={{width:'20px', height: '20px'}} />
                    </span>
                    <p className={`${student.status === 'Active' ? 'text-textWarning' : ''}`}
                    onClick={() => handleClickStudent(student.id)}>
                        {student.percent}%
                    </p>
                </div>
                <p
                onClick={() => handleClickStudent(student.id)}>{student.name}</p>
                <p className='text-textButtonMainDisabled'
                onClick={() => handleClickStudent(student.id)}>{t("education.aCourseDetails.status")}: 
                    {student.status === 'Active' && <span className='text-textAccent'> {t("education.aCourseDetails.studentsDetails.active")} </span>}
                    {student.status === 'CoachPending' && <span className='text-textWarning'> {t("education.aCourseDetails.studentsDetails.pending")}</span>}
                </p>
                {/* <Box sx={{ display: 'flex' , justifyContent:'center' }}>
                    <CircularProgress variant="determinate" value={student.percent > 80 ? student.percent : student.percent + 5 }
                    sx={{'& .MuiCircularProgress-circle': {stroke: 'var(--softer-white)'}, }}/>
                </Box> */}
                <div onClick={() => handleClickStudent(student.id)} />
                {
                aCourseData?.data.accesses.canCancelOrFinishStudent &&
                    <button 
                    onClick={() => setShowActiveStudentOptions(
                        showActiveStudentOptions === student.id ?
                        ''
                        :
                        student.id
                    )}
                    className={`${gradients.clipboardButtonBackgroundGradient} w-[52px] h-12 flex items-center justify-center 
                    ${dir === 'ltr' ? 'rounded-r-2xl' : 'rounded-l-2xl'}`}>
                        <MoreVertIcon sx={{ width:'20px', height:'20px'}}  />
                    </button>
                }

            </div>
            {
                aCourseData?.data.accesses.canAcceptOrRejectStudent && student.status === 'CoachPending' &&
                <div className='w-full min-h-16 rounded-b-2xl z-[70] mt-[-1rem] pt-5 flex justify-between px-4 bg-bgOutputDefault shadow-lg'>

                    <div className='flex justify-center text-xs gap-x-2 items-center gap-y-10'>
                        <div className='w-2 h-2 rounded-full' style={{backgroundColor:'var(--text-error)'}}></div>
                        <p >{t("education.aCourseDetails.studentsDetails.confirmStudent")}</p>
                    </div>

                    <div className='flex gap-x-6 items-center px-2'>

                        {triggerStudentStatusLoading && 
                            <Box sx={{ display: 'flex', width:'full' , justifyContent:'center' }}>
                                <CircularProgress sx={{width:'1rem'}} />
                            </Box>
                        }
                        
                        <p onClick={(event) => !triggerStudentStatusLoading && handleTriggerStudentStatus( 'Active', student.id, event)} className='text-textAccent text-sm font-medium'  >
                            {t("education.aCourseDetails.studentsDetails.approve")}
                        </p>

                        <p onClick={(event) => !triggerStudentStatusLoading && handleTriggerStudentStatus( 'CoachRejected', student.id, event)} className='text-textError text-sm font-medium' >
                            {t("education.aCourseDetails.studentsDetails.reject")}
                        </p>

                    </div>
                </div>                                
            }
            {
                aCourseData?.data.accesses.canCancelOrFinishStudent && showActiveStudentOptions === student.id &&
                <div className={` absolute w-full flex justify-end ${dir === 'ltr' ? 'right-[5%] md:right-[25%]' : 'left-[5%] md:left-[25%]'} h-[68px] mt-9`}>
                    <div className='w-1/3 md:w-1/6 lg:w-1/12 h-full bg-bgOutputDefault text-textDefault rounded-2xl flex flex-col items-center justify-end'>
                        <p
                            onClick={(event) => handleTriggerStudentStatus( 'Completed', student.id, event) }
                            className='w-full text-center py-1.5 active:bg-textAccent'
                            >
                                {t("education.aCourseDetails.studentsDetails.completeCourse")} 
                        </p>
                        <div className='w-full h-[2px] bg-bgPageMain'/>
                        <p className=' w-full text-center py-1.5 active:bg-textAccent'
                        onClick={(event) => handleTriggerStudentStatus( 'Canceled', student.id, event)}>
                            {t("education.aCourseDetails.studentsDetails.cancelCourse")}
                        </p>
                    </div>
                </div>
            }
        </div>
    );
};

export default StudentBox;