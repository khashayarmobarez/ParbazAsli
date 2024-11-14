import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

// mui
import { Box, CircularProgress } from '@mui/material';

// queries
import { useClubCourseStudentFlights } from '../../../../Utilities/Services/clubQueries';

// components
import PracticalFlightHistoryBox from '../../FlightHistory/PracticalFlightHistoryBox';

const ClubCourseStudentPracticalDetails = () => {

    const { studentId } = useParams();

    const { data: userFlights, isLoading: userFlightsLoading } = useClubCourseStudentFlights(studentId,1,10);

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
                <p className='text-textWarning'> هنوز پروازی برای این دوره ثبت نشده است</p>
            }
            {
                userFlights && userFlights.totalCount > 0 &&
                <div className='flex flex-col gap-y-6'>

                    <div className='w-full flex flex-col gap-y-6'>
                        {userFlights.data.map((flight) => (
                            <div key={flight.id} className='w-full'>
                                <PracticalFlightHistoryBox key={flight.id} flightBaseData={flight} isForClubCourseStudent={true} />
                                {/* <div className='bg-light-yellow w-full h-10'>
                                    test
                                </div> */}
                            </div>
                        ))}
                    </div>

                </div>
            }
        </div>
    );
};

export default ClubCourseStudentPracticalDetails;