import React from 'react';
import { useParams } from 'react-router-dom';

// mui
import { Box, CircularProgress } from '@mui/material';

// queries  
import { useGetStudentSyllabi } from '../../../Utilities/Services/coursesQueries';


// components
import DropDownSyllabiData from '../../../components/modules/MyCourses/DropDownSyllabiData';

const CourseStudentSyllabiDetails = () => {

    const { studentId } = useParams();

    const {  data: syllabiData, isLoading: syllabiDataLoading, error: syllabiDataError } = useGetStudentSyllabi(studentId);


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
                syllabiData && syllabiData.data.practicalSyllabi.length > 0 &&
                <DropDownSyllabiData title={"سرفصل‌های عملی"} data={syllabiData.data.practicalSyllabi} percent={syllabiData.data.practicalSyllabiPercent} />
            }
        </div>
    );
};

export default CourseStudentSyllabiDetails;