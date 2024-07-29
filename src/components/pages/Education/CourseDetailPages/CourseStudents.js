import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

// styles
import gradients from '../../../../styles/gradients/Gradient.module.css'

// mui
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

// assests
import clipboard from '../../../../assets/icons/clipboard.svg'
import AddIcon from '@mui/icons-material/Add';

// queries
import { useACourse, useACourseHistoryStudents, useACourseStudents, useAddStudentToCourse } from '../../../../Utilities/Services/coursesQueries';

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

    // add student
    const [studentId, setStudentId] = useState('');

    const { data: studentsData, isLoading: studentsDataLoading, error: studentsDataError } = useACourseStudents(id,pageNumber);
    const { data: studentsHistoryData, isLoading: studentsHistoryDataLoading, error: studentsHistoryDataError } = useACourseHistoryStudents(id,historyPageNumber);
    const {  data: studentData, isLoading:studentNameLoading , error: studentError } = useUserById(studentId);
    const { data: aCourseData, isLoading: courseDataLoading, error: courseDataError } = useACourse(id);

    // post student to course
    const {  mutate: addStudentToCourse, isLoading: addStudentToCourseLoading, error: addStudentToCourseError } = useAddStudentToCourse();
    


    const handleNextPage = () => {
        if(studentsData.totalPagesCount === pageNumber) return;
        console.log('next page')
        setPageNumber(prev => prev + 1)
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

    // handle add student
    const handleAddStudnetToCourse = () => {

        const customCourseData = {
            courseId: id,
            userId: studentId
        }

        addStudentToCourse( customCourseData , {
            onSuccess: () => {
                toast('دوره شما با موفقیت تایید شد', {
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
                studentsData && 
                <div className='w-full flex flex-col items-center gap-y-6'>
                    {studentsData.data?.map((student) => (
                        <div className={`${gradients.container} flex w-full justify-between items-center h-12 pr-3 rounded-2xl text-sm`}>
                            <span>
                                <PersonOutlineOutlinedIcon />
                            </span>
                            <p>{student.name}</p>
                            <p>{student.joinDateTime}</p>
                            {/* <Box sx={{ display: 'flex' , justifyContent:'center' }}>
                                <CircularProgress variant="determinate" value={student.percent > 80 ? student.percent : student.percent + 5 }
                                sx={{'& .MuiCircularProgress-circle': {stroke: 'var(--softer-white)'}, }}/>
                            </Box> */}
                            <button className={`${gradients.clipboardButtonBackgroundGradient} w-14 h-full flex items-center justify-center rounded-l-xl`}>
                                <img src={clipboard} alt='icon' />
                            </button>
                        </div>
                    ))}
                    {
                        studentsData.totalPagesCount < pageNumber &&
                        <p onClick={handleNextPage} className=' self-start mt-[-0.5rem]' style={{color:'var(--yellow-text) '}} >بقیه ی هنرجو ها ...</p>
                    }

                    <div className='flex flex-col w-full gap-y-2'>
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
                            aCourseData && aCourseData.data.clubName !== '' &&
                                <div className='w-full flex justify-between relative items-center'>
                                    <div className='w-[86%] flex flex-col'>
                                        <TextInput value={studentId} onChange={handleInputStudentId} placeholder='افزودن هنرجو' className='w-full' />
                                    </div>
                                    <span
                                        className={` w-[34px] h-[34px] flex justify-center items-center rounded-lg ${gradients.container}`}
                                        onClick={handleAddStudnetToCourse}
                                        disabled={addStudentToCourseLoading}
                                    >
                                        <AddIcon sx={{ width: '2.2rem', height: '2.2rem' }} />
                                    </span>
                                </div>
                        }
                    </div>

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
                                <div className='w-full flex flex-col items-center gap-y-6'>
                                    {studentsHistoryData.data?.map((student) => (
                                        <div className={`${gradients.container} flex w-full justify-between items-center h-12 pr-3 rounded-2xl text-sm`}>
                                            <span>
                                                <PersonOutlineOutlinedIcon />
                                            </span>
                                            <p>{student.name}</p>
                                            <p>{student.joinDateTime}</p>
                                            <Box sx={{ display: 'flex' , justifyContent:'center' }}>
                                                <CircularProgress variant="determinate" value={student.percent > 80 ? student.percent : student.percent + 5 }
                                                sx={{'& .MuiCircularProgress-circle': {stroke: 'var(--softer-white)'}, }}/>
                                            </Box>
                                            <button onClick={() => navigate('/education/StudentDetails')} className={`${gradients.clipboardButtonBackgroundGradient} w-14 h-full flex items-center justify-center rounded-l-xl`}>
                                                <img src={clipboard} alt='icon' />
                                            </button>
                                        </div>
                                    ))}
                                    {
                                        studentsData.totalPagesCount < pageNumber &&
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

export default CourseStudents;