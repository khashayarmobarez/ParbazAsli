import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

// queries
import { useGetClubCourseSyllabi } from '../../../../Utilities/Services/clubQueries';

// components
import DropDownDataBox from '../../../reuseable/DropDownDataBox';


const ClubCourseSyllabi = () => {
    const { id } = useParams();
    
    const {  data: syllabiDataTheory, isLoading: syllabiDataTheoryLoading, error: syllabiDataTheoryError } = useGetClubCourseSyllabi(id,1);
    const {  data: syllabiDataPractical, isLoading: syllabiDataPracticalLoading, error: syllabiDataPracticalError } = useGetClubCourseSyllabi(id,2);

    useEffect(() => {
        if(syllabiDataTheory && syllabiDataPractical) {
            console.log(syllabiDataTheory)
            console.log(syllabiDataPractical)
        }
    }, [syllabiDataTheory, syllabiDataPractical])
    
    return (
        <div className=' w-full flex flex-col gap-y-7 pb-14'>
            {
                syllabiDataTheory && syllabiDataPractical && syllabiDataTheory.data.length < 1 && syllabiDataPractical.data.length < 1 &&
                <p className='w-full text-center'>سیلابسی برای این دوره ثبت نشده</p>
            }
            {
                syllabiDataTheory && syllabiDataTheory.data.length > 0 &&
                <DropDownDataBox title={"سیلابس تئوری"} data={syllabiDataTheory.data}  />
            }
            {
                 syllabiDataPractical && syllabiDataPractical.data.length > 0 &&
                <DropDownDataBox title={"سیلابس عملی"} data={syllabiDataPractical.data} />
            }
        </div>
    );
};

export default ClubCourseSyllabi;