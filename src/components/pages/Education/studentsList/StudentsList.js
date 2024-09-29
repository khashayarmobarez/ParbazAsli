import React from 'react';
import PageTitle from '../../../reuseable/PageTitle';
import { useAllStudentDividers, useCourseCounts } from '../../../../Utilities/Services/coursesQueries';
import { useParams } from 'react-router-dom';
import CircularProgressLoader from '../../../Loader/CircularProgressLoader';

const StudentsList = () => {

    // id 1 is for active students and id 2 is for history student
    const {id} = useParams()

    // queries
    const { data: courseCountsData, isLoading: courseCountsLoading } = useCourseCounts();
    // id 1 is for active students and id 2 is for history student
    const { data: AllStudentDividers, isLoading: AllStudentDividersLoading, error: AllStudentDividerError } = useAllStudentDividers(id && id);

    return (
        <div className='flex flex-col mt-14 items-center pb-14'>

            { (courseCountsLoading || AllStudentDividersLoading) &&
                <CircularProgressLoader /> 
            }

            {AllStudentDividerError &&
                <p className='w-full text-center'>مشکلی پیش اماده, دوباره تلاش کنید</p>
            }

            {
                !AllStudentDividers && !AllStudentDividersLoading && !AllStudentDividerError &&
                <p className='h-60vh w-full text-center flex justify-center items-center'> هنرجویی اضافه نشده</p>
            }

            {
                courseCountsData &&
                <PageTitle 
                    title={`${id === '1' ? `هنرجویان فعال (${courseCountsData.data.activeStudentCounts})` : `هنرجویان سابق (${courseCountsData.data.disableStudentCounts})`}`} 
                    navigateTo={'/education'} 
                />
            }
            
        </div>
    );
};

export default StudentsList;