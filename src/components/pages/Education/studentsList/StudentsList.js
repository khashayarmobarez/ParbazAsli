import React from 'react';
import PageTitle from '../../../reuseable/PageTitle';
import { useCourseCounts } from '../../../../Utilities/Services/coursesQueries';
import { useParams } from 'react-router-dom';

const StudentsList = () => {

    // id 1 is for active students and id 2 is for history student
    const {id} = useParams()

    // queries
    const { data: courseCountsData, isLoading: courseCountsLoading } = useCourseCounts();

    return (
        <div className='flex flex-col mt-14 items-center pb-14'>

            {
                courseCountsData &&
                <PageTitle title={`${id === '1' ? `هنرجویان فعال (${courseCountsData.data.activeStudentCounts})` : `هنرجویان سابق (${courseCountsData.data.disableStudentCounts})`}`} navigateTo={'/education'} />
            }
            
        </div>
    );
};

export default StudentsList;