import React, { useEffect, useState } from 'react';
import PageTitle from '../../../elements/reuseable/PageTitle';
import { useAllStudents, useCourseCounts } from '../../../Utilities/Services/coursesQueries';
import { useLocation, useParams } from 'react-router-dom';
import ArrowButton from '../../../elements/icons/ArrowButton';
import CircularProgressLoader from '../../../elements/Loader/CircularProgressLoader';
import ACourseStudentBox from '../../../elements/reuseable/ACourseStudentBox';
import Cookies from 'js-cookie';

// context
import { useTranslation } from '../../../Utilities/context/TranslationContext';
import Pagination from '../../../elements/reuseable/Pagination';

const StudentsList = () => {

    // language
    const { t } = useTranslation();

    // id 1 is for active students and id 2 is for history student
    const {id} = useParams()
    const location = useLocation()
    
    const isForClub = location.pathname.includes('/club')

    const [pageNumber, setPageNumber] = useState(1);
    let pageSize = 8

    Cookies.set('lastStudentListPath', location.pathname)

    // queries
    const { data: courseCountsData, isLoading: courseCountsLoading } = useCourseCounts(isForClub);
    // id 1 is for active students and id 2 is for history student
    const { data: AllStudents, isLoading: AllStudentLoading, error: AllStudentError, refetch: refetchStudents } = useAllStudents(id && id, pageNumber, pageSize, isForClub);


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

                        <Pagination
                            totalPagesCount={AllStudents?.totalPagesCount} 
                            totalCount={AllStudents?.totalCount}
                            setPageNumber={setPageNumber}
                            PageNumber={pageNumber}
                            refetch={refetchStudents}
                        />
                        
                    </div>
                }
            </div>
        </div>
    );
};

export default StudentsList;