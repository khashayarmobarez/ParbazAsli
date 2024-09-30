import React, { useEffect, useState } from 'react';
import PageTitle from '../../../reuseable/PageTitle';
import { useAllStudents, useCourseCounts } from '../../../../Utilities/Services/coursesQueries';
import { useParams } from 'react-router-dom';
import CircularProgressLoader from '../../../Loader/CircularProgressLoader';
import ACourseStudentBox from '../../../reuseable/ACourseStudentBox';

const StudentsList = () => {

    // id 1 is for active students and id 2 is for history student
    const {id} = useParams()


    // queries
    const { data: courseCountsData, isLoading: courseCountsLoading } = useCourseCounts();
    // id 1 is for active students and id 2 is for history student
    const { data: AllStudents, isLoading: AllStudentLoading, error: AllStudentError } = useAllStudents(id && id);


    return (
        <div className='flex flex-col mt-14 items-center pb-14'>

            { (courseCountsLoading || AllStudentLoading) &&
                <CircularProgressLoader /> 
            }

            {AllStudentError &&
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
                        <p className='h-60vh w-full text-center flex justify-center items-center mt-8'> هنرجویی یافت نشد</p>
                    }

                    <div className='w-[90%] flex flex-col gap-y-4 items-center'>
                        {AllStudents.data.length > 0 && AllStudents.data &&
                            AllStudents.data.map((student) => (
                                <ACourseStudentBox key={student.id} studentData={student} isForHistory={id === '1' ? false : true} />
                            ))
                        }
                    </div>
                    
                </div>
            }
            
        </div>
    );
};

export default StudentsList;