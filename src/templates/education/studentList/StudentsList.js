import React, { useEffect, useState } from 'react';
import PageTitle from '../../../components/reuseable/PageTitle';
import { useAllStudents, useCourseCounts } from '../../../Utilities/Services/coursesQueries';
import { useParams } from 'react-router-dom';
import ArrowButton from '../../../components/icons/ArrowButton';
import CircularProgressLoader from '../../../components/Loader/CircularProgressLoader';
import ACourseStudentBox from '../../../components/reuseable/ACourseStudentBox';

const StudentsList = () => {

    // id 1 is for active students and id 2 is for history student
    const {id} = useParams()

    const [pageNumber, setPageNumber] = useState(1);
    let pageSize = 10


    // queries
    const { data: courseCountsData, isLoading: courseCountsLoading } = useCourseCounts();
    // id 1 is for active students and id 2 is for history student
    const { data: AllStudents, isLoading: AllStudentLoading, error: AllStudentError } = useAllStudents(id && id, pageNumber, pageSize);


    const handleNextPageNumber = () => {
        setPageNumber(prev => prev + 1)
    }

    const handleLastPageNumber = () => {
        setPageNumber(prev => prev - 1)
    }


    return (
        <div className='flex flex-col mt-14 items-center pb-14'>

            <div  className='w-full flex flex-col items-center gap-y-4 md:w-[70%]'>

                { 
                (courseCountsLoading || AllStudentLoading) &&
                    <CircularProgressLoader /> 
                }

                {
                AllStudentError &&
                    <p className='w-full text-center'>مشکلی پیش اماده, دوباره تلاش کنید</p>
                }

                {
                courseCountsData && AllStudents &&
                    <div className='w-full flex flex-col justify-center items-center gap-y-8'>
                        <PageTitle 
                            title={`${id === '1' ? `هنرجویان فعال (${courseCountsData.data.activeStudentCounts})` : `هنرجویان سابق (${courseCountsData.data.disableStudentCounts})`}`} 
                            navigateTo={'/education'} 
                        />

                        {
                            AllStudents && AllStudents.data.length < 1 && !AllStudentLoading && !AllStudentError &&
                            <p className='h-60vh w-full text-center flex justify-center items-center mt-8 text-textWarning' > هنرجویی یافت نشد</p>
                        }

                        <div className='w-[90%] flex flex-col gap-y-4 items-center'>
                            {AllStudents?.data.length > 0 &&
                                AllStudents.data.map((student) => (
                                    <ACourseStudentBox key={student.id} studentData={student} isForHistory={id === '1' ? false : true} />
                                ))
                            }
                        </div>


                        { 
                        (AllStudents?.totalPagesCount && AllStudents.totalPagesCount > 1 && AllStudents.data.length > 0) ?
                            <div className='w-full flex justify-between px-10 items-center'>
                                <button
                                    className={`w-6 h-6 justify-self-start`}
                                    disabled={AllStudents.totalPagesCount === 1 || AllStudents.totalPagesCount === pageNumber}
                                    onClick={handleNextPageNumber}
                                >
                                    <ArrowButton isRight={true} isDisable={AllStudents.totalPagesCount === 1 || AllStudents.totalPagesCount === pageNumber}/>
                                </button>

                                <p className='text-sm justify-self-center' style={{ color: 'var(--text-accent)' }}>
                                    صفحه ی {pageNumber}
                                </p>

                                <button
                                    className={`transform w-6 h-6 justify-self-end`}
                                    disabled={pageNumber === 1}
                                    onClick={handleLastPageNumber}
                                >
                                    <ArrowButton isDisable={pageNumber === 1}/>
                                </button>
                            </div>
                            :
                            ''
                        }
                        
                    </div>
                }
            </div>
        </div>
    );
};

export default StudentsList;