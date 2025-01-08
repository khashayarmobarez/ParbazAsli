import React from 'react';
import { useParams } from 'react-router-dom';

// mui
import { Box, CircularProgress } from '@mui/material';

// queries
import { useAUserCourseSyllabi } from '../../Utilities/Services/StudentCoursesQueries';

// components
import DropDownSyllabiData from '../../modules/MyCourses/DropDownSyllabiData';

const MySyllabiMyCourse = () => {

    const { id } = useParams();

    const {  data: syllabiData, isLoading: syllabiDataLoading } = useAUserCourseSyllabi(id);


    return (
        <div className=' w-full flex flex-col gap-y-7 pb-14'>

            {
                syllabiDataLoading &&
                <Box sx={{ display: 'flex', width:'100%' , justifyContent:'center', marginTop:'4rem' }}>
                    <CircularProgress /> 
                </Box>
            }
            {
                syllabiData && syllabiData.data.theorySyllabi.length > 0 &&
                <DropDownSyllabiData title={"سرفصل‌های تئوری"} data={syllabiData.data.theorySyllabi} percent={syllabiData.data.theorySyllabiPercent}  />
            }
            {
                syllabiData && syllabiData.data.flightSyllabi.length > 0 &&
                <DropDownSyllabiData title={"سرفصل‌های پرواز"} data={syllabiData.data.flightSyllabi} percent={syllabiData.data.flightSyllabiPercent} />
            }
        </div>
    );
};

export default MySyllabiMyCourse;