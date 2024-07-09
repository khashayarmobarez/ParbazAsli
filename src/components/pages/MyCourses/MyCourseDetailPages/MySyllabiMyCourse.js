import React from 'react';
import { useParams } from 'react-router-dom';

// mui
import { Box, CircularProgress } from '@mui/material';

// queries
import { useAUserCourseSyllabi } from '../../../../Utilities/Services/StudentCoursesQueries';

// components
import DropDownSyllabiData from '../MyComponents/DropDownDyllabiData';

const MySyllabiMyCourse = () => {

    const { id } = useParams();

    const {  data: syllabiDataTheory, isLoading: syllabiDataTheoryLoading, error: syllabiDataTheoryError } = useAUserCourseSyllabi(id,1);
    const {  data: syllabiDataPractical, isLoading: syllabiDataPracticalLoading, error: syllabiDataPracticalError } = useAUserCourseSyllabi(id,2);


    return (
        <div className=' w-full flex flex-col gap-y-7 pb-14'>

            {
                (syllabiDataTheoryLoading || syllabiDataPracticalLoading) &&
                <Box sx={{ display: 'flex', width:'100%' , justifyContent:'center', marginTop:'4rem' }}>
                    <CircularProgress /> 
                </Box>
            }
            {
                syllabiDataTheory && syllabiDataTheory.data.length > 0 &&
                <DropDownSyllabiData title={"سیلابس تئوری"} data={syllabiDataTheory.data} percent={0}  />
            }
            {
                 syllabiDataPractical && syllabiDataPractical.data.length > 0 &&
                <DropDownSyllabiData title={"سیلابس عملی"} data={syllabiDataPractical.data} percent={0} />
            }
        </div>
    );
};

export default MySyllabiMyCourse;