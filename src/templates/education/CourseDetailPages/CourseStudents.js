import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';

// styles
import gradients from '../../../styles/Gradient.module.css'

// mui
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import MoreVertIcon from '@mui/icons-material/MoreVert';

// assests
import ArrowButton from '../../../components/icons/ArrowButton';


// queries
import { useACourse, useACourseHistoryStudents, useACourseStudents, useAddStudentToCourse, useTriggerStudentStatus } from '../../../Utilities/Services/coursesQueries';

// components
import TextInput from '../../../components/inputs/textInput';
import { useUserById } from '../../../Utilities/Services/queries';
import DropDownLine from '../../../components/reuseable/DropDownLine';

// context
import { useTranslation } from '../../../Utilities/context/TranslationContext';

const CourseStudents = () => {

    // language
    const { t } = useTranslation();
    const dir = Cookies.get('dir') || 'ltr';
    
    const navigate = useNavigate();
    const location = useLocation();

    const isForClub = location.pathname.includes('/club')
    const { id } = useParams();

    const appTheme = Cookies.get('themeApplied') || 'dark';

    const [pageNumber, setPageNumber] = useState(1);
    const [historyPageNumber, sethistoryPageNumber] = useState(1);
    const [DropDownHistory, setDropDownHistory] = useState(false);
    const [DropDownActive, setDropDownActive] = useState(true);

    // show student options
    const [showActiveStudentOptions, setShowActiveStudentOptions] = useState(false);
    const [showHistoryStudentOptions, setShowHistoryStudentOptions] = useState(false);

    // add student
    const [studentId, setStudentId] = useState('');

    const [isSubmitted, setIsSubmitted] = useState(false)


    const { data: studentsData, isLoading: studentsDataLoading, error: studentsDataError, refetch: refetchStudentdata } = useACourseStudents(id, pageNumber);
    const { data: studentsHistoryData, isLoading: studentsHistoryDataLoading, error: studentsHistoryDataError, refetch:refetchStudentHistorydata } = useACourseHistoryStudents(id, historyPageNumber);
    const {  data: studentData, isLoading:studentNameLoading , error: studentError } = useUserById(studentId);
    const { data: aCourseData, isLoading: courseDataLoading, error: courseDataError } = useACourse(id);
    const { mutate: triggerStudentStatus, isLoading: triggerStudentStatusLoading } = useTriggerStudentStatus();

    // post student to course
    const {  mutate: addStudentToCourse, isLoading: addStudentToCourseLoading, error: addStudentToCourseError } = useAddStudentToCourse();
    

    const handleNextPageNumber = () => {
        setPageNumber(prev => prev + 1)
        setTimeout(() => {
            refetchStudentdata();
        }, 100);
    }

    const handleLastPageNumber = () => {
        setPageNumber(prev => prev - 1)
        setTimeout(() => {
            refetchStudentdata();
        }, 100);
    }

    const handleNextPageHistory = () => {
        if(studentsHistoryData.totalPagesCount === historyPageNumber) return;
        console.log('next page')
        sethistoryPageNumber(prev => prev + 1)
    }

    // handle text input state
    const handleInputStudentId = (event) => {
        setStudentId(event.target.value);
    };

    // handle click student
    const handleClickStudent = (id, status) => {

        if(status !== 'CoachPending' && status !== 'CoachRejected') {
            isForClub ?
                navigate(`/club/courseDetails/studentDetails/${id}/practical`)
                :
                navigate(`/education/courseDetails/studentDetails/${id}/practical`)
        }
    }

    // for handling the back button of club course details
    Cookies.set('lastPathForStudentDetails',location.pathname)

    const handleTriggerStudentStatus = (status ,id, event) => {

        event.preventDefault();

        const triggerStatusForm = {
            userCourseId: id,
            status: status
        }

        triggerStudentStatus(triggerStatusForm,{
            onSuccess: (data) => {
                if(status === 'Active') {
                    toast(t("education.aCourseDetails.studentsDetails.studentApproved"), {
                        type: 'success', // Specify the type of toast (e.g., 'success', 'error', 'info', 'warning')
                        position: 'top-right', 
                        autoClose: 3000,
                        theme: appTheme,
                        style: { width: "350px" }
                    });
                }
                else if(status === 'Canceled') {
                    toast(t("education.aCourseDetails.studentsDetails.studentApproved"), {
                        type: 'success', // Specify the type of toast (e.g., 'success', 'error', 'info', 'warning')
                        position: 'top-right',
                        autoClose: 3000,
                        theme: appTheme,
                        style: { width: "350px" }
                    });
                } else if(status === 'Completed') {
                    toast( t("education.aCourseDetails.studentsDetails.studentCompleted"), {
                        type: 'success', // Specify the type of toast (e.g., 'success', 'error', 'info', 'warning')
                        position: 'top-right',
                        autoClose: 3000,
                        theme: appTheme,
                        style: { width: "350px" }
                    });
                } else if(status === 'CoachRejected') {
                    toast(t("education.aCourseDetails.studentsDetails.studentRejected"), {
                        type: 'success', // Specify the type of toast (e.g., 'success', 'error', 'info', 'warning')
                        position: 'top-right',
                        autoClose: 3000,
                        theme: appTheme,
                        style: { width: "350px" }
                    });
                }
                setShowHistoryStudentOptions('')
                setShowActiveStudentOptions('')
                refetchStudentdata();
                refetchStudentHistorydata();
            },
        });
    }

    // handle add student
    const handleAddStudnetToCourse = () => {

        setIsSubmitted(true)

        const customCourseData = {
            courseId: id,
            userId: studentId,
        }

        addStudentToCourse( customCourseData , {
            onSuccess: () => {
                toast(t("education.aCourseDetails.studentsDetails.studentAdded"), {
                    type: 'success',
                    position: 'top-right',
                    autoClose: 5000,
                    theme: appTheme,
                    style: { width: "90%" }
                });

                // reload after 1 second
                setTimeout(() => {
                    window.location.reload();
                }, 800);
            },
            onError: (error) => {
                let errorMessage = t("education.aCourseDetails.studentsDetails.errorOccurred");
                if (error.response && error.response.data && error.response.data.ErrorMessages) {
                    errorMessage = error.response.data.ErrorMessages[0].ErrorMessage;
                }
                toast(errorMessage, {
                    type: 'error',
                    position: 'top-right',
                    autoClose: 5000,
                    theme: appTheme,
                    style: { width: "90%" }
                });
            }
        })
    }
    


    return (
        <div className='w-full flex flex-col items-center pb-20'>
            <div className='w-full flex flex-col'>

            {
                studentsDataLoading &&
                <Box sx={{ display: 'flex', width:'full' , justifyContent:'center', marginTop:'4rem' }}>
                    <CircularProgress /> 
                </Box>
            }

            {
                studentsDataError &&
                <p className='w-full text-center'>{t("education.aCourseDetails.studentsDetails.errorMessage")}</p>
            }

            {
                studentsData && studentsData.totalCount < 1 &&
                <p className='w-full text-center pb-5 pt-4 text-textWarning'>{t("education.aCourseDetails.studentsDetails.noStudentsAdded")}</p>
            }

            {
                studentsData && !studentsDataLoading &&
                <div className='w-full flex flex-col items-center gap-y-6 -mt-2'>
                    {
                        studentsData.totalCount > 0 &&
                        <DropDownLine  
                        onClickActivation={() => setDropDownActive(!DropDownActive)}
                        title={t("education.aCourseDetails.studentsDetails.students")} 
                        dropDown={DropDownActive} 
                        isActive={DropDownActive === true}  
                        />
                    }
                    {DropDownActive && studentsData.data?.map((student) => (
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
                                <div className={` absolute w-full flex justify-end ${dir === 'ltr' ? 'right-[5%]' : 'left-[5%]'} h-[68px] mt-9 md:left-[25%]`}>
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
                    ))}
                    {studentsData && studentsData.totalPagesCount > 1 && (
                        <div className={`w-full flex justify-between px-10 items-center `}>
                            <button
                                className='w-6 h-6 justify-self-start'
                                disabled={studentsData.totalPagesCount === 1 || studentsData.totalPagesCount === pageNumber}
                                onClick={handleNextPageNumber}
                            >
                                <ArrowButton isRight={true} isDisable={studentsData.totalPagesCount === 1 || studentsData.totalPagesCount === pageNumber}/>
                            </button>

                            <p className='text-sm justify-self-center' style={{ color: 'var(--text-accent)' }}>
                                {t("education.aCourseDetails.studentsDetails.page")} {pageNumber}
                            </p>

                            <button
                                className={`transform w-6 h-6 justify-self-end `}
                                disabled={pageNumber === 1}
                                onClick={handleLastPageNumber}
                            >
                                <ArrowButton isDisable={pageNumber === 1}/>
                            </button>
                        </div>
                    )}

                    <div className='flex flex-col w-full gap-y-2'>
                        { studentNameLoading && studentId.length > 5 &&
                            <p className=' self-start text-textAccent'>{t("education.aCourseDetails.studentsDetails.checkingStudent")}</p>
                        }
                        { studentData && 
                            <p className=' self-start text-textAccent'>{studentData.data.fullName}</p>
                        }
                        {studentError && studentId.length > 5 &&
                            <p className='text-textError self-start text-right'>{studentError.response.data.ErrorMessages[0].ErrorMessage}</p>
                        }
                        {
                        aCourseData?.data.accesses.canAddStudent &&
                            <div className='w-full flex justify-between relative items-center gap-x-4'>
                                <div className='w-[70%] md:w-full flex flex-col'>
                                    <TextInput 
                                    id={'TI1'} 
                                    value={studentId} 
                                    onChange={handleInputStudentId} 
                                    placeholder={t("education.aCourseDetails.studentsDetails.addStudent")}
                                    className='w-full' 
                                    isSubmitted={isSubmitted}
                                    ErrorCondition={!studentId}
                                    ErrorText={t("education.aCourseDetails.studentsDetails.enterStudentId")}
                                    />
                                </div>
                                <span
                                    className={` w-[26%] h-12 flex justify-center items-center rounded-2xl bg-bgButtonMainDefault text-[#eee] hover:bg-bgButtonMainHover cursor-pointer`}
                                    onClick={handleAddStudnetToCourse}
                                    disabled={addStudentToCourseLoading}
                                >
                                    {t("education.aCourseDetails.studentsDetails.add")}
                                </span>
                            </div>
                        }
                    </div>

                    {/* history students */}
                    {
                        studentsHistoryData && studentsHistoryData.data.length > 0 &&
                        <div  className='w-full flex flex-col items-center gap-y-4'>
                            <DropDownLine  
                                onClickActivation={() => setDropDownHistory(!DropDownHistory)}
                                title={t("education.aCourseDetails.studentsDetails.previousStudents")}
                                dropDown={DropDownHistory} 
                                isActive={DropDownHistory === true}  
                            />

                            {DropDownHistory &&
                                <div className='w-full flex flex-col items-center gap-y-4'>
                                    {studentsHistoryData.data?.map((student,index) => (
                                        <div key={index} className={`flex flex-col w-full ${showHistoryStudentOptions === student.id && 'z-30'}`}>
                                            <div className={`${gradients.container} z-10 flex w-full justify-between items-center h-12 pr-3 rounded-2xl text-xs`}>
                                                
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
                                                    className={`${gradients.clipboardButtonBackgroundGradient} w-[52px] h-full flex items-center justify-center rounded-l-2xl`}
                                                    >
                                                        <MoreVertIcon sx={{ width:'20px', height:'20px'}}  />
                                                    </button>
                                                }
                                            </div>
                                            {
                                                student.status !== 'Completed' && showHistoryStudentOptions === student.id && aCourseData?.data.accesses.canReturnStudent &&
                                                <div className=' absolute w-full flex justify-end left-[5%] h-[40px] mt-14 md:left-[15%]'>
                                                    <div className='w-1/3 h-full bg-bgInputDropdown border border-textDisabled rounded-2xl flex flex-col items-center justify-center'>
                                                        <p className=' text-center active:bg-textAccent'
                                                        onClick={(event) => handleTriggerStudentStatus( 'Active', student.id, event)}>
                                                            {t("education.aCourseDetails.studentsDetails.returnToCourse")}
                                                        </p>
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                    ))}
                                    {   
                                    studentsHistoryData &&
                                    studentsData.totalPagesCount < studentsData.currentPage && 
                                        <p onClick={handleNextPageHistory} className=' self-start mt-[-0.5rem] text-textAccent ' >
                                            {t("education.aCourseDetails.studentsDetails.moreStudents")}
                                        </p>
                                    }
                                </div>
                            }

                        </div>

                    }

                </div>
            }
            </div>
        </div>
    );
};

export default CourseStudents;