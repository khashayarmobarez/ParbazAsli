import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

// mui
import { Box, CircularProgress } from '@mui/material';

// queries
import { usePracticalActivities } from '../../Utilities/Services/flightHistoriesQueries';

// components
import PracticalFlightHistoryBox from '../../modules/FlightHistory/PracticalFlightHistoryBox';

// context
import { useTranslation } from '../../Utilities/context/TranslationContext';
import Pagination from '../../elements/reuseable/Pagination';

const PracticalMyCourse = () => {

    // language
    const { t } = useTranslation();

    const { id } = useParams();

    const [ pageNumber, setPageNumber ] = useState(1)

    const { data: userFlights, isLoading: userFlightsLoading, refetch: refetchFlights } = usePracticalActivities(pageNumber,5,id, '', '', '', '', '', '', '', '', '', '' , '','');

    return (
        <div className=' w-full flex flex-col gap-y-7 pb-14'>
            {userFlightsLoading &&
                <Box sx={{ display: 'flex', width:'100%' , justifyContent:'center', marginTop:'4rem' }}>
                    <CircularProgress /> 
                </Box>
            }
            {
            userFlights && userFlights.totalCount === 0 &&
                <p className='text-textWarning'> {t("myCourses.aCourseDetails.practicalActivity.noActivity")}</p>
            }
            {
                userFlights && userFlights.totalCount > 0 &&
                <div className='flex flex-col gap-y-6'>

                    <div className='w-full flex flex-col gap-y-6'>
                        {userFlights.data.map((flight) => (
                            <PracticalFlightHistoryBox key={flight.id} flightBaseData={flight} />
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

export default PracticalMyCourse;