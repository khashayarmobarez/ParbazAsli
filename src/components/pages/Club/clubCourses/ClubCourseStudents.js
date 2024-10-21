import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

// styles
import gradients from '../../../../styles/gradients/Gradient.module.css'

// mui
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import MoreVertIcon from '@mui/icons-material/MoreVert';

// assests
import ArrowButton from '../../../../components/icons/ArrowButton';
import AddIcon from '@mui/icons-material/Add';


// queries
import { useACourse, useACourseHistoryStudents, useACourseStudents, useAddStudentToCourse, useTriggerStudentStatus } from '../../../../Utilities/Services/coursesQueries';
import { useAddStudentToClubCourse, useGetClubCourse, useGetClubCourseStudents, useGetClubCourseStudentsHistory } from '../../../../Utilities/Services/clubQueries';

// components
import TextInput from '../../../inputs/textInput';
import { useUserById } from '../../../../Utilities/Services/queries';
import DropDownLine from '../../../reuseable/DropDownLine';

const CourseStudents = () => {
    
    const navigate = useNavigate();
    const { id } = useParams();
    const [pageNumber, setPageNumber] = useState(1);
    const [historyPageNumber, sethistoryPageNumber] = useState(1);
    const [DropDownHistory, setDropDownHistory] = useState(false);
    const [DropDownActive, setDropDownActive] = useState(true);

    // show student options
    const [showActiveStudentOptions, setShowActiveStudentOptions] = useState(false);
    const [showHistoryStudentOptions, setShowHistoryStudentOptions] = useState(false);

    // add student
    const [studentId, setStudentId] = useState('');

    const { data: studentsData, isLoading: studentsDataLoading, error: studentsDataError, refetch: refetchStudentdata } = useGetClubCourseStudents(id,pageNumber);
    const { data: studentsHistoryData, isLoading: studentsHistoryDataLoading, error: studentsHistoryDataError, refetch:refetchStudentHistorydata } = useGetClubCourseStudentsHistory(id,historyPageNumber);
    const {  data: studentData, isLoading:studentNameLoading , error: studentError } = useUserById(studentId);
    const { data: aCourseData, isLoading: courseDataLoading, error: courseDataError } = useGetClubCourse(id);

    // post student to course
    const {  mutate: addStudentToCourse, isLoading: addStudentToCourseLoading, error: addStudentToCourseError } = useAddStudentToClubCourse();
    

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

    const handleClickStudent = (studentId) => {
        navigate(`/club/courseDetails/studentDetails/${studentId}/practical`);
    }

    
    // handle add student
    const handleAddStudnetToCourse = () => {

        const customCourseData = {
            courseId: id,
            userId: studentId
        }

        addStudentToCourse( customCourseData , {
            onSuccess: () => {
                toast('شاگرد شما با موفقیت اضافه شد', {
                    type: 'success',
                    position: 'top-right',
                    autoClose: 5000,
                    theme: 'dark',
                    style: { width: "90%" }
                });

                // reload after 1 second
                setTimeout(() => {
                    window.location.reload();
                }, 800);
            },
            onError: (error) => {
                let errorMessage = 'خطایی رخ داده است';
                if (error.response && error.response.data && error.response.data.ErrorMessages) {
                    errorMessage = error.response.data.ErrorMessages[0].ErrorMessage;
                }
                toast(errorMessage, {
                    type: 'error',
                    position: 'top-right',
                    autoClose: 5000,
                    theme: 'dark',
                    style: { width: "90%" }
                });
            }
        })
    }
    


    return (
        <div className='w-full flex flex-col items-center pb-14'>
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
                studentsData && studentsData.totalCount < 1 &&
                <p className='w-full text-center pb-6'>هنرجویی به دوره اضافه نشده</p>
            }

            {
                studentsData && !studentsDataLoading &&
                <div className='w-full flex flex-col items-center gap-y-6'>
                    {
                        studentsData.totalCount > 0 &&
                        <DropDownLine  
                            onClickActivation={() => setDropDownActive(!DropDownActive)}
                            title={'هنر جویان'} 
                            dropDown={DropDownActive} 
                            isActive={DropDownActive === true}  
                        />
                    }
                    {DropDownActive && studentsData.data?.map((student) => (
                        <div className={`flex flex-col w-full mb-2 ${showActiveStudentOptions === student.id && 'z-30'}`}
                        onClick={() => handleClickStudent(student.id)}>
                            <div className={`${gradients.container} z-10 flex w-full justify-between items-center h-12 pr-3 mt-[-1rem] rounded-2xl text-sm`}>
                                <span>
                                    <PersonOutlineOutlinedIcon />
                                </span>
                                <p className={`${student.percent > 50 ? 'text-textAccent' : 'text-textError'}`}>{student.percent}%</p>
                                <p>{student.name}</p>
                                <p className='text-textDefault'>وضعیت: 
                                    {student.status === 'Active' && <span className='text-textAccent'> فعال </span>}
                                    {student.status === 'CoachPending' && <span className='text-textWarning'> در انتظار تایید</span>}
                                </p>
                                {/* <Box sx={{ display: 'flex' , justifyContent:'center' }}>
                                    <CircularProgress variant="determinate" value={student.percent > 80 ? student.percent : student.percent + 5 }
                                    sx={{'& .MuiCircularProgress-circle': {stroke: 'var(--softer-white)'}, }}/>
                                </Box> */}
                                <div/>

                            </div>

                        </div>
                    ))}
                    {studentsData && studentsData.totalPagesCount > 1 && (
                        <div className={`w-full flex justify-between px-10 items-center ${(studentsData.totalPagesCount === 1 || studentsData.totalPagesCount === pageNumber) && 'opacity-60'}`}>
                            <button
                                className='w-10 justify-self-start'
                                disabled={studentsData.totalPagesCount === 1 || studentsData.totalPagesCount === pageNumber}
                                onClick={handleNextPageNumber}
                            >
                                <ArrowButton/>
                            </button>

                            <p className='text-sm justify-self-center' style={{ color: 'var(--text-accent)' }}>
                                صفحه ی {pageNumber}
                            </p>

                            <button
                                className={`transform rotate-180 w-10 justify-self-end ${pageNumber === 1 && 'opacity-60'}`}
                                disabled={pageNumber === 1}
                                onClick={handleLastPageNumber}
                            >
                                <ArrowButton/>
                            </button>
                        </div>
                    )}

                    <div className='flex flex-col w-full gap-y-2'>
                        { studentNameLoading && studentId.length > 5 &&
                            <p className=' self-start text-textAccent'>در حال بررسی هنرجو ... </p>
                        }
                        { studentData && 
                            <p className=' self-start text-textAccent'>{studentData.data.fullName}</p>
                        }
                        {studentError && studentId.length > 5 &&
                            <p className='text-textError self-start text-right'>{studentError.response.data.ErrorMessages[0].ErrorMessage}</p>
                        }
                        {
                            aCourseData && aCourseData.data.status === 'Active' &&
                                <div className='w-full flex justify-between relative items-center'>
                                    <div className='w-[70%] flex flex-col'>
                                        <TextInput value={studentId} onChange={handleInputStudentId} placeholder='افزودن هنرجو' className='w-full' />
                                    </div>
                                    <span
                                        className={` w-24 h-12 flex justify-center items-center rounded-2xl font-medium text-textDefaultOpposite cursor-pointer`}
                                        style={{ background: 'var(--text-accent)' }}
                                        onClick={handleAddStudnetToCourse}
                                        disabled={addStudentToCourseLoading}
                                    >
                                       افزودن
                                    </span>
                                </div>
                        }
                    </div>

                    {/* history students */}
                    {
                        studentsHistoryData && studentsHistoryData && studentsHistoryData.data.length > 0 &&
                        <div  className='w-full flex flex-col items-center gap-y-4'>
                            <DropDownLine  
                                onClickActivation={() => setDropDownHistory(!DropDownHistory)}
                                title={'هنر جویان سابق'} 
                                dropDown={DropDownHistory} 
                                isActive={DropDownHistory === true}  
                            />

                            {DropDownHistory &&
                                <div className='w-full flex flex-col items-center gap-y-4'>
                                    {studentsHistoryData.data?.map((student) => (
                                        <div className={`flex flex-col w-full ${showHistoryStudentOptions === student.id && 'z-30'}`}>
                                            <div className={`${gradients.container} z-10 flex w-full justify-between items-center h-12 pr-3 rounded-2xl text-sm`}>
                                                <span>
                                                    <PersonOutlineOutlinedIcon />
                                                </span>
                                                <p className={`${student.percent > 50 ? 'text-textAccent' : 'text-textError'}`}>{student.percent}%</p>
                                                <p>{student.name}</p>
                                                <p className='text-textDisabled'>وضعیت: 
                                                    {student.status === 'Completed' && <span className='text-textAccent '> تمام شده</span>}
                                                    {student.status === 'Canceled' && <span className='text-textError'> لغو شده</span>}
                                                </p>
                                                <div/>
                                                {/* <Box sx={{ display: 'flex' , justifyContent:'center' }}>
                                                    <CircularProgress variant="determinate" value={student.percent > 80 ? student.percent : student.percent + 5 }
                                                    sx={{'& .MuiCircularProgress-circle': {stroke: 'var(--softer-white)'}, }}/>
                                                </Box> */}
                                            </div>
                                        </div>
                                    ))}
                                    {   
                                    studentsHistoryData &&
                                        studentsData.totalPagesCount < studentsData.currentPage && 
                                        <p onClick={handleNextPageHistory} className=' self-start mt-[-0.5rem]' style={{color:'var(--text-accent) '}} >بقیه ی هنرجو ها ...</p>
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