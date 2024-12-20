import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

// mui
import { Box, CircularProgress } from '@mui/material';

// queries
import { useCourseStudentFlights } from '../../../Utilities/Services/coursesQueries';

// components
import PracticalFlightHistoryBox from '../../../modules/FlightHistory/PracticalFlightHistoryBox';

const CourseStudentPracticalDetails = () => {

    const { studentId } = useParams();

    const { data: userFlights, isLoading: userFlightsLoading } = useCourseStudentFlights(studentId && studentId,1,10);

    useEffect(() => {
        if(userFlights) {
            console.log(userFlights)
        }
    }, [userFlights])

    return (
        <div className=' w-full flex flex-col gap-y-7 pb-14'>
            {userFlightsLoading &&
            <Box sx={{ display: 'flex', width:'100%' , justifyContent:'center', marginTop:'4rem' }}>
                <CircularProgress /> 
            </Box>
            }
            {
            userFlights && userFlights.totalCount === 0 &&
                <p className='text-textWarning py-4'> هنوز پروازی برای این دوره ثبت نشده است</p>
            }
            {
                userFlights && userFlights.totalCount > 0 &&
                <div className='flex flex-col gap-y-6'>

                    <div className='w-full flex flex-col gap-y-6'>
                        {userFlights.data.map((flight) => (
                            <PracticalFlightHistoryBox key={flight.id} flightBaseData={flight} isForEducationCourseStudent={true} />
                        ))}
                    </div>

                </div>
            }
        </div>
    );
};

export default CourseStudentPracticalDetails;