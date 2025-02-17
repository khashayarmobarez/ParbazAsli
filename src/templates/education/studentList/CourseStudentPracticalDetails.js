import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';

// mui
import { Box, CircularProgress } from '@mui/material';

// queries
import { useStudentPracticalActivities } from '../../../Utilities/Services/coursesQueries';

// components
import PracticalFlightHistoryBox from '../../../modules/FlightHistory/PracticalFlightHistoryBox';
import ArrowButton from '../../../elements/icons/ArrowButton';
import { useTranslation } from '../../../Utilities/context/TranslationContext';
import Pagination from '../../../elements/reuseable/Pagination';

const CourseStudentPracticalDetails = () => {

    // language
    const { t } = useTranslation();
    const dir = Cookies.get('dir') || 'ltr';

    const location = useLocation();
    const { studentId } = useParams();
    const isForClub = location.pathname.includes('/club')

    const [pageNumber, setPageNumber] = useState(1)
    const pageSize = 10

    const { data: userFlights, isLoading: userFlightsLoading, refetch: refetchFlights } = useStudentPracticalActivities(studentId && studentId,pageNumber,pageSize);

    return (
        <div className=' w-full flex flex-col gap-y-7 pb-14'>
            {userFlightsLoading &&
            <Box sx={{ display: 'flex', width:'100%' , justifyContent:'center', marginTop:'4rem' }}>
                <CircularProgress /> 
            </Box>
            }
            {
            userFlights && userFlights.totalCount === 0 &&
                <p className='text-textWarning py-4'> {t("education.StudentCourseDetails.practicalPage.noFlights")}</p>
            }
            {
                userFlights && userFlights.totalCount > 0 &&
                <div className='flex flex-col gap-y-6'>

                    <div className='w-full flex flex-col gap-y-4'>
                        {userFlights.data.map((flight) => (
                            <PracticalFlightHistoryBox key={flight.id} flightBaseData={flight} isForEducationCourseStudent={true} />
                        ))}
                    </div>

                </div>
            }

            <Pagination
                totalPagesCount={userFlights?.totalPagesCount} 
                totalCount={userFlights?.totalCount}
                setPageNumber={setPageNumber}
                PageNumber={pageNumber}
                refetch={refetchFlights}
            />
        </div>
    );
};

export default CourseStudentPracticalDetails;