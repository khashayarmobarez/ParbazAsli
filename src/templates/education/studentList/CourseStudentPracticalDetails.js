import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';

// mui
import { Box, CircularProgress } from '@mui/material';

// queries
import { useStudentPracticalActivities } from '../../../Utilities/Services/coursesQueries';

// components
import PracticalFlightHistoryBox from '../../../modules/FlightHistory/PracticalFlightHistoryBox';
import ArrowButton from '../../../components/icons/ArrowButton';
import { useTranslation } from '../../../Utilities/context/TranslationContext';

const CourseStudentPracticalDetails = () => {

    // language
    const { t } = useTranslation();
    const dir = Cookies.get('dir') || 'ltr';

    const location = useLocation();
    const { studentId } = useParams();
    const isForClub = location.pathname.includes('/club')

    const [pageNumber, setPageNumber] = useState(1)
    const pageSize = 10

    const { data: userFlights, isLoading: userFlightsLoading } = useStudentPracticalActivities(studentId && studentId,pageNumber,pageSize);


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

            {userFlights && userFlights.totalPagesCount > 1 && (
                <div className='w-full flex justify-between px-10 items-center'>
                    <button
                    className={`w-6 h-6 justify-self-start `}
                    disabled={userFlights.totalPagesCount === 1 || userFlights.totalPagesCount === pageNumber}
                    onClick={handleNextPage}
                    >
                        <ArrowButton isRight={dir !== 'ltr' && true} isDisable={userFlights.totalPagesCount === 1 || userFlights.totalPagesCount === pageNumber}/>
                    </button>

                    <p className='text-sm justify-self-center' style={{ color: 'var(--text-accent)' }}>
                        {t("education.StudentCourseDetails.practicalPage.page")} {pageNumber}
                    </p>

                    <button
                    className={`transform w-6 h-6 justify-self-end ${pageNumber === 1 && 'opacity-60'}`}
                    disabled={pageNumber === 1}
                    onClick={handlePrevPage}
                    >

                        <ArrowButton isRight={dir === 'ltr' && true} isDisable={pageNumber === 1}/>

                    </button>
                    
                </div>
            )}
        </div>
    );
};

export default CourseStudentPracticalDetails;