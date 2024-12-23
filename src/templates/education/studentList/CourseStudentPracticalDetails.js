import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// mui
import { Box, CircularProgress } from '@mui/material';

// queries
import { useCourseStudentFlights } from '../../../Utilities/Services/coursesQueries';

// components
import PracticalFlightHistoryBox from '../../../modules/FlightHistory/PracticalFlightHistoryBox';
import ArrowButton from '../../../components/icons/ArrowButton';

const CourseStudentPracticalDetails = () => {

    const { studentId } = useParams();

    const [pageNumber, setPageNumber] = useState(1)
    const pageSize = 10

    const { data: userFlights, isLoading: userFlightsLoading } = useCourseStudentFlights(studentId && studentId,pageNumber,pageSize);


    const handleNextPage = () => {
        if (pageNumber < userFlights?.totalPagesCount) {
            setPageNumber(pageNumber + 1);
        }
    };

    const handlePrevPage = () => {
        if (pageNumber > 1) {
            setPageNumber(pageNumber - 1);
        }
    };

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

                    <div className='w-full flex flex-col gap-y-4'>
                        {userFlights.data.map((flight) => (
                            <PracticalFlightHistoryBox key={flight.id} flightBaseData={flight} isForEducationCourseStudent={true} />
                        ))}
                    </div>

                </div>
            }

            {userFlights && userFlights.totalPagesCount > 1 && (
                <div className='w-full flex justify-between px-10 items-center'>
                    <button
                    className={`w-6 h-6 justify-self-start `}
                    disabled={userFlights.totalPagesCount === 1 || userFlights.totalPagesCount === pageNumber}
                    onClick={handleNextPage}
                    >
                        <ArrowButton isRight={true} isDisable={userFlights.totalPagesCount === 1 || userFlights.totalPagesCount === pageNumber}/>
                    </button>

                    <p className='text-sm justify-self-center' style={{ color: 'var(--text-accent)' }}>
                        صفحه ی {pageNumber}
                    </p>

                    <button
                    className={`transform w-6 h-6 justify-self-end ${pageNumber === 1 && 'opacity-60'}`}
                    disabled={pageNumber === 1}
                    onClick={handlePrevPage}
                    >

                        <ArrowButton isDisable={pageNumber === 1}/>

                    </button>
                    
                </div>
            )}
        </div>
    );
};

export default CourseStudentPracticalDetails;