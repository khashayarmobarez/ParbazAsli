import React from 'react';
import Cookies from 'js-cookie';

// styles
import gradients from '../../styles/Gradient.module.css'


// mui
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';

// context
import { useTranslation } from '../../Utilities/context/TranslationContext';

const StudentBoxHistory = ({
    showHistoryStudentOptions,
    student,
    handleClickStudent,
    aCourseData,
    setShowHistoryStudentOptions,
    handleTriggerStudentStatus
}) => {

    // language
    const { t } = useTranslation();
    const dir = Cookies.get('dir') || 'ltr';

    return (
        <div className={`flex flex-col w-full ${showHistoryStudentOptions === student.id && 'z-30'}`}>
            <div className={`${gradients.container} z-10 flex w-full justify-between items-center h-12 mt-[-1rem] rounded-2xl text-xs
            ${dir === 'ltr' ? 'pl-3' : 'pr-3'}`}>
                
                <div className='flex items-center justify-start gap-x-2'>
                    <span onClick={() => handleClickStudent(student.id)}>
                        <PersonOutlineOutlinedIcon sx={{width:'20px', height: '20px'}} />
                    </span>
                    <p className={`${student.percent > 50 ? 'text-textAccent' : 'text-textError'}`}
                    onClick={() => handleClickStudent(student.id)}>{student.percent}%</p>
                </div>
                <p onClick={() => handleClickStudent(student.id)}>{student.name}</p>
                <p className='text-textButtonMainDisabled '
                onClick={() => handleClickStudent(student.id)}>
                    {t("education.aCourseDetails.status")}: 
                    {student.status === 'Completed' && <span className='text-textAccent '> {t("education.aCourseDetails.studentsDetails.completed")}</span>}
                    {student.status === 'Canceled' && <span className='text-textError'> {t("education.aCourseDetails.studentsDetails.canceled")}</span>}
                </p>
                <div/>
                {/* <Box sx={{ display: 'flex' , justifyContent:'center' }}>
                    <CircularProgress variant="determinate" value={student.percent > 80 ? student.percent : student.percent + 5 }
                    sx={{'& .MuiCircularProgress-circle': {stroke: 'var(--softer-white)'}, }}/>
                </Box> */}
                {
                    student.status !== 'Completed' && aCourseData?.data.accesses.canReturnStudent &&
                    <button 
                    onClick={
                        () => setShowHistoryStudentOptions(showHistoryStudentOptions === student.id ?
                            ''
                            :
                            student.id
                        )}
                    // onClick={() => navigate('/education/StudentDetails')}
                    className={`${gradients.clipboardButtonBackgroundGradient} w-[52px] h-full flex items-center justify-center 
                    ${dir === 'ltr' ? 'rounded-r-2xl' : 'rounded-l-2xl'}`}
                    >
                        <MoreVertIcon sx={{ width:'20px', height:'20px'}}  />
                    </button>
                }
            </div>
            {
                student.status !== 'Completed' && showHistoryStudentOptions === student.id && aCourseData?.data.accesses.canReturnStudent &&
                <div className={`absolute w-full  flex justify-end ${dir === 'ltr' ? 'right-[5%] md:right-[25%]' : 'left-[5%] md:left-[25%]'} h-[40px] mt-9`}>
                    <div className='w-1/3 md:w-1/6 lg:w-1/12 h-full bg-bgInputDropdown border border-textDisabled rounded-2xl flex flex-col items-center justify-center'>
                        <p className=' text-center active:bg-textAccent'
                        onClick={(event) => handleTriggerStudentStatus( 'Active', student.id, event)}>
                            {t("education.aCourseDetails.studentsDetails.returnToCourse")}
                        </p>
                    </div>
                </div>
            }
        </div>
    );
};

export default StudentBoxHistory;