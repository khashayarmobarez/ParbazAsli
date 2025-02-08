import React from 'react';
import { useLocation, useParams } from 'react-router-dom';

// mui
import { Box, CircularProgress } from '@mui/material';

// queries  
import { useGetStudentSyllabi } from '../../../Utilities/Services/coursesQueries';


// components
import DropDownSyllabiData from '../../../modules/MyCourses/DropDownSyllabiData';

// context
import { useTranslation } from '../../../Utilities/context/TranslationContext';

const CourseStudentSyllabiDetails = () => {

    // language
    const { t } = useTranslation();

    const { studentId } = useParams();


    const {  data: syllabiData, isLoading: syllabiDataLoading, error: syllabiDataError } = useGetStudentSyllabi(studentId);


    return (
        <div className=' w-full flex flex-col gap-y-4 pb-14'>

            {
                syllabiDataLoading &&
                <Box sx={{ display: 'flex', width:'100%' , justifyContent:'center', marginTop:'4rem' }}>
                    <CircularProgress /> 
                </Box>
            }
            {
                syllabiData && syllabiData.data?.theorySyllabi?.length > 0 &&
                <DropDownSyllabiData 
                title={t("myCourses.aCourseDetails.syllabi.theory")} 
                data={syllabiData.data?.theorySyllabi} 
                percent={syllabiData.data?.theorySyllabiPercent}
                />
            }
            {
                syllabiData && syllabiData.data?.flightSyllabi?.length > 0 &&
                <DropDownSyllabiData 
                title={t("myCourses.aCourseDetails.syllabi.fly")}
                data={syllabiData.data?.flightSyllabi} 
                percent={syllabiData.data?.flightSyllabiPercent} 
                />
            }
            {
                syllabiData && syllabiData.data?.groundHandlingSyllabi?.length > 0 &&
                <DropDownSyllabiData 
                title={t("myCourses.aCourseDetails.syllabi.ground")} 
                data={syllabiData.data?.groundHandlingSyllabi} 
                percent={syllabiData.data?.groundHandlingSyllabiPercent} 
                />
            }
        </div>
    );
};

export default CourseStudentSyllabiDetails;