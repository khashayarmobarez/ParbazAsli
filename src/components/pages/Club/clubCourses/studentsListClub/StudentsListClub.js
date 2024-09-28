import React from 'react';
import PageTitle from '../../../../reuseable/PageTitle';
import { useParams } from 'react-router-dom';
import CircularProgressLoader from '../../../../Loader/CircularProgressLoader';
import { useClubCourseCounts } from '../../../../../Utilities/Services/clubQueries';

const StudentsListClub = () => {

    // id 1 is for active students and id 2 is for history student
    const {id} = useParams()

    // queries
    const { data: courseCountsData, isLoading: courseCountsLoading } = useClubCourseCounts();

    return (
        <div className='flex flex-col mt-14 items-center pb-14'>

            { 
            courseCountsLoading &&
                <CircularProgressLoader /> 
            }

            {
                courseCountsData &&
                <PageTitle title={`${id === '1' ? `هنرجویان فعال (${courseCountsData.data.activeStudentCounts})` : `هنرجویان سابق (${courseCountsData.data.disableStudentCounts})`}`} navigateTo={'/education'} />
            }
            
        </div>
    );
};

export default StudentsListClub;