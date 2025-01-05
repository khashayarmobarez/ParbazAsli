import React, { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';

// queries
import { useACourseSyllabi } from '../../../Utilities/Services/coursesQueries';

// components
import DropDownDataBox from '../../../components/reuseable/DropDownDataBox';
import { Box, CircularProgress } from '@mui/material';


const CourseSyllabi = () => {
    
    const { id } = useParams();
    const location = useLocation();

    const isForClub = location.pathname.includes('/club')

    
    const {  data: syllabiDataTheory, isLoading: syllabiDataTheoryLoading } = useACourseSyllabi(id,1);
    const {  data: syllabiDataFlight, isLoading: syllabiDataFlightLoading } = useACourseSyllabi(id,2);
    const {  data: syllabiDataGround, isLoading: syllabiDataGroundLoading } = useACourseSyllabi(id,3);

    
    return (
        <div className=' w-full flex flex-col gap-y-4 pb-14'>
            {
                (syllabiDataTheoryLoading || syllabiDataFlightLoading || syllabiDataGroundLoading) &&
                <Box sx={{ display: 'flex', width:'full' , justifyContent:'center', marginTop:'4rem' }}>
                    <CircularProgress /> 
                </Box>
            }
            {
                syllabiDataTheory && syllabiDataFlight && syllabiDataGround && syllabiDataTheory?.data.length < 1 && syllabiDataFlight?.data.length < 1 && syllabiDataGround?.data.length < 1 &&
                <p className='w-full text-center'>سیلابسی برای این دوره ثبت نشده</p>
            }
            {
                syllabiDataTheory && syllabiDataFlight && syllabiDataGround && syllabiDataTheory?.data.length > 0 &&
                <DropDownDataBox
                title={"سرفصل‌های تئوری"}
                data={syllabiDataTheory.data}
                />
            }
            {
                syllabiDataTheory && syllabiDataFlight && syllabiDataGround && syllabiDataFlight?.data.length > 0 &&
                <DropDownDataBox
                title={"سرفصل‌های پرواز"}
                data={syllabiDataFlight.data}
                />
            }
            {
                syllabiDataTheory && syllabiDataFlight && syllabiDataGround && syllabiDataGround?.data.length > 0 &&
                <DropDownDataBox
                title={"سرفصل‌های تمرین زمینی"}
                data={syllabiDataGround.data}
                />
            }
        </div>
    );
};

export default CourseSyllabi;