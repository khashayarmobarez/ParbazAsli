import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

// queries
import { useACourseSyllabi } from '../../../../Utilities/Services/coursesQueries';

// components
import DropDownDataBox from '../../../reuseable/DropDownDataBox';


const CourseSyllabi = () => {
    
    const { id } = useParams();
    
    const {  data: syllabiDataTheory, isLoading: syllabiDataTheoryLoading, error: syllabiDataTheoryError } = useACourseSyllabi(id,1);
    const {  data: syllabiDataPractical, isLoading: syllabiDataPracticalLoading, error: syllabiDataPracticalError } = useACourseSyllabi(id,2);

    
    return (
        <div className=' w-full flex flex-col gap-y-4 pb-14'>
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

export default CourseSyllabi;