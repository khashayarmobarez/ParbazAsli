import React, { useEffect, useState } from 'react';
import PageTitle from '../../../components/reuseable/PageTitle';
import { useAllStudents, useCourseCounts } from '../../../Utilities/Services/coursesQueries';
import { useLocation, useParams } from 'react-router-dom';
import ArrowButton from '../../../components/icons/ArrowButton';
import CircularProgressLoader from '../../../components/Loader/CircularProgressLoader';
import ACourseStudentBox from '../../../components/reuseable/ACourseStudentBox';

// context
import { useTranslation } from '../../../Utilities/context/TranslationContext';

const StudentsList = () => {

    // language
    const { t } = useTranslation();

    // id 1 is for active students and id 2 is for history student
    const {id} = useParams()
    const location = useLocation()
    
    const isForClub = location.pathname.includes('/club')

    const [pageNumber, setPageNumber] = useState(1);
    let pageSize = 10


    // queries
    const { data: courseCountsData, isLoading: courseCountsLoading } = useCourseCounts(isForClub);
    // id 1 is for active students and id 2 is for history student
    const { data: AllStudents, isLoading: AllStudentLoading, error: AllStudentError } = useAllStudents(id && id, pageNumber, pageSize, isForClub);


    const handleNextPageNumber = () => {
        setPageNumber(prev => prev + 1)
    }

    const handleLastPageNumber = () => {
        setPageNumber(prev => prev - 1)
    }


    return (
        <div className='flex flex-col mt-10 items-center pb-14 md:mt-16'>

            <div  className='w-full flex flex-col items-center gap-y-4 md:w-[55%]'>

                { 
                (courseCountsLoading || AllStudentLoading) &&
                    <CircularProgressLoader /> 
                }

                {
                AllStudentError &&
                    <p className='w-full text-center'>{t("education.studentList.errorMessage")}</p>
                }

                {
                courseCountsData && AllStudents &&
                    <div className='w-full flex flex-col justify-center items-center gap-y-8'>

                        <PageTitle
                            title={`${id === '1' ? `${t("education.studentList.activeStudents")} (${courseCountsData.data.activeStudentCounts})` : `${t("education.studentList.previousStudents")} (${courseCountsData.data.disableStudentCounts})`}`} 
                            navigateTo={isForClub ? '/club/clubCourses' : '/education'}y
                        />

                        {
                            AllStudents && AllStudents.data.length < 1 && !AllStudentLoading && !AllStudentError &&
                            <p className='h-60vh w-full text-center flex justify-center items-center mt-8 text-textWarning' >{t("education.studentList.noStudentsFound")}</p>
                        }

                        <div className='w-[90%] flex flex-col gap-y-4 items-center'>
                            {AllStudents?.data.length > 0 &&
                                AllStudents.data.map((student) => (
                                    <ACourseStudentBox isForClub={isForClub} key={student.id} studentData={student} isForHistory={id === '1' ? false : true} />
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
                                    {t("education.studentList.page")} {pageNumber}
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