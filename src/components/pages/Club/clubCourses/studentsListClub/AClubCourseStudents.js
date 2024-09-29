import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUserById } from '../../../../../Utilities/Services/queries';
import { toast } from 'react-toastify';
import { useACourse, useACourseHistoryStudents, useACourseStudents, useAddStudentToCourse, useTriggerStudentStatus } from '../../../../../Utilities/Services/coursesQueries';

// styles
import gradients from '../../../../../styles/gradients/Gradient.module.css'

// assests
import arrowIcon from '../../../../../assets/icons/Right Arrow Button.svg';

// mui
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';

// comps
import CircularProgressLoader from '../../../../Loader/CircularProgressLoader';
import TextInput from '../../../../inputs/textInput';
import { useAddStudentToClubCourse, useGetClubCourseStudents, useGetClubCourseStudentsHistory } from '../../../../../Utilities/Services/clubQueries';


const AClubCourseStudents = ({courseData, isForHistory}) => {

    const navigate = useNavigate();
    const location = useLocation();

    const { courseId } = courseData

    const [pageNumber, setPageNumber] = useState(1);
    const [historyPageNumber, sethistoryPageNumber] = useState(1);

    // show student options
    const [showActiveStudentOptions, setShowActiveStudentOptions] = useState(false);
    const [showHistoryStudentOptions, setShowHistoryStudentOptions] = useState(false);

    // add student
    const [studentId, setStudentId] = useState('');

    const { data: studentsData, isLoading: studentsDataLoading, error: studentsDataError, refetch: refetchStudentdata } = useGetClubCourseStudents(courseId,pageNumber);
    const { data: studentsHistoryData, isLoading: studentsHistoryDataLoading, error: studentsHistoryDataError, refetch:refetchStudentHistorydata } = useGetClubCourseStudentsHistory(courseId,historyPageNumber);
    const {  data: studentData, isLoading:studentNameLoading , error: studentError } = useUserById(studentId);
    const { data: aCourseData, isLoading: courseDataLoading, error: courseDataError } = useACourse(courseId);

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

    // handle click student
    const handleClickStudent = (id) => {
        navigate(`/education/courseDetails/studentDetails/${id}/practical`)
    }

    // for handling the back button of club course details
    Cookies.set('lastPathForClubStudentDetails',location.pathname)


    // handle add student
    const handleAddStudnetToCourse = () => {

        const customCourseData = {
            courseId: courseId,
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
        <div className='w-full flex flex-col items-center pb-0 pt-8'>
            <div className='w-full flex flex-col'>

            {
                studentsDataLoading &&
                <CircularProgressLoader /> 
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
                    {!isForHistory && studentsData.data?.map((student) => (
                        <div className={`flex flex-col w-full mb-2 ${showActiveStudentOptions === student.id && 'z-30'}`}>
                            <div className={`${gradients.container} z-10 flex w-full justify-between items-center h-12 pr-3 mt-[-1rem] rounded-2xl text-sm`}
                            >
                                <span onClick={() => handleClickStudent(student.id)}>
                                    <PersonOutlineOutlinedIcon />
                                </span>
                                <p className={`${student.percent > 50 ? 'text-[var(--yellow-text)]' : 'text-[var(--red-text)]'}`}
                                onClick={() => handleClickStudent(student.id)}>{student.percent}%</p>
                                <p
                                onClick={() => handleClickStudent(student.id)}>{student.name}</p>
                                <p className='text-[var(--low-opacity-white)]'
                                onClick={() => handleClickStudent(student.id)}>وضعیت: 
                                    {student.status === 'Active' && <span className='text-[var(--yellow-text)]'> فعال </span>}
                                    {student.status === 'CoachPending' && <span className='text-[var(--text-color)]'> در انتظار تایید</span>}
                                </p>
                                {/* <Box sx={{ display: 'flex' , justifyContent:'center' }}>
                                    <CircularProgress variant="determinate" value={student.percent > 80 ? student.percent : student.percent + 5 }
                                    sx={{'& .MuiCircularProgress-circle': {stroke: 'var(--softer-white)'}, }}/>
                                </Box> */}
                                <div onClick={() => handleClickStudent(student.id)} />

                            </div>
                            
                            
                        </div>
                    ))}
                    {studentsData && studentsData.totalPagesCount > 1 && (
                        <div className='w-full flex justify-between px-10 items-center'>
                            <button
                                className='w-10 justify-self-start'
                                disabled={studentsData.totalPagesCount === 1 || studentsData.totalPagesCount === pageNumber}
                                onClick={handleNextPageNumber}
                            >
                                <img
                                    src={arrowIcon}
                                    alt='arrow'
                                    className={`${(studentsData.totalPagesCount === 1 || studentsData.totalPagesCount === pageNumber) && 'opacity-60'}`}
                                />
                            </button>

                            <p className='text-sm justify-self-center' style={{ color: 'var(--yellow-text)' }}>
                                صفحه ی {pageNumber}
                            </p>

                            <button
                                className='transform rotate-180 w-10 justify-self-end'
                                disabled={pageNumber === 1}
                                onClick={handleLastPageNumber}
                            >
                                <img
                                    src={arrowIcon}
                                    alt='arrow'
                                    className={`mt-2 ${pageNumber === 1 && 'opacity-60'}`}
                                />
                            </button>
                        </div>
                    )}

                    {/* <div className='flex flex-col w-full gap-y-2'>
                        { studentNameLoading && studentId.length > 5 &&
                            <p className=' self-start text-[var(--yellow-text)]'>در حال بررسی هنرجو ... </p>
                        }
                        { studentData && 
                            <p className=' self-start text-[var(--yellow-text)]'>{studentData.data.fullName}</p>
                        }
                        {studentError && studentId.length > 5 &&
                            <p className='text-[var(--red-text)] self-start text-right'>{studentError.response.data.ErrorMessages[0].ErrorMessage}</p>
                        }
                        {
                            aCourseData && aCourseData.data.clubName === null && aCourseData.data.status === 'Active' &&
                                <div className='w-full flex justify-between relative items-center'>
                                    <div className='w-[70%] flex flex-col'>
                                        <TextInput value={studentId} onChange={handleInputStudentId} placeholder='افزودن هنرجو' className='w-full' />
                                    </div>
                                    <span
                                        className={` w-24 h-12 flex justify-center items-center rounded-2xl font-medium text-[var(--bg-color)] cursor-pointer`}
                                        style={{ background: 'var(--yellow-button-bg)'}}
                                        onClick={handleAddStudnetToCourse}
                                        disabled={addStudentToCourseLoading}
                                    >
                                       افزودن
                                    </span>
                                </div>
                        }
                    </div> */}

                    {/* history students */}
                    {
                        studentsHistoryData && studentsHistoryData.data.length > 0 &&
                        <div  className='w-full flex flex-col items-center gap-y-4 -mt-4'>

                            {isForHistory &&
                                <div className='w-full flex flex-col items-center gap-y-4'>
                                    {studentsHistoryData.data?.map((student) => (
                                        <div className={`flex flex-col w-full ${showHistoryStudentOptions === student.id && 'z-30'}`}>
                                            <div className={`${gradients.container} z-10 flex w-full justify-between items-center h-12 pr-3 rounded-2xl text-sm`}>
                                                <span onClick={() => handleClickStudent(student.id)}>
                                                    <PersonOutlineOutlinedIcon />
                                                </span>
                                                <p className={`${student.percent > 50 ? 'text-[var(--yellow-text)]' : 'text-[var(--red-text)]'}`}
                                                onClick={() => handleClickStudent(student.id)}>{student.percent}%</p>
                                                <p onClick={() => handleClickStudent(student.id)}>{student.name}</p>
                                                <p className='text-[var(--low-opacity-white)]'
                                                onClick={() => handleClickStudent(student.id)}>
                                                    وضعیت: 
                                                    {student.status === 'Completed' && <span className='text-[var(--yellow-text)] '> تمام شده</span>}
                                                    {student.status === 'Canceled' && <span className='text-[var(--red-text)]'> لغو شده</span>}
                                                </p>
                                                <div/>
                                                {/* <Box sx={{ display: 'flex' , justifyContent:'center' }}>
                                                    <CircularProgress variant="determinate" value={student.percent > 80 ? student.percent : student.percent + 5 }
                                                    sx={{'& .MuiCircularProgress-circle': {stroke: 'var(--softer-white)'}, }}/>
                                                </Box> */}
                                            </div>
                                        </div>
                                    ))}
                                    {   studentsHistoryData &&
                                        studentsData.totalPagesCount < studentsData.currentPage && 
                                        <p onClick={handleNextPageHistory} className=' self-start mt-[-0.5rem]' style={{color:'var(--yellow-text) '}} >بقیه ی هنرجو ها ...</p>
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

export default AClubCourseStudents;