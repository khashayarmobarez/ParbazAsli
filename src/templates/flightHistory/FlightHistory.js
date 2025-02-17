import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';


// redux
import { useDispatch, useSelector } from 'react-redux';
import { selectFlightFilter, resetAllFilters } from '../../Utilities/ReduxToolKit/features/flightHistoryAdvancedFilter/flightFilterSlice';

// styles
import ButtonStyles from '../../styles/ButtonsBox.module.css';

// assets 
import ArrowButton from '../../elements/icons/ArrowButton';
import Eraser from '../../elements/icons/Eraser1Icon';

// mui
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

// queries
import { usePracticalActivities } from '../../Utilities/Services/flightHistoriesQueries';

// components
import PageTitle from '../../elements/reuseable/PageTitle';
import PracticalFlightHistoryBox from '../../modules/FlightHistory/PracticalFlightHistoryBox';
import FilterVariables from '../../modules/FlightHistory/FilterVariables';

// context
import { useTranslation } from '../../Utilities/context/TranslationContext';
import Pagination from '../../elements/reuseable/Pagination';


const FlightHistory = () => {

    // language
    const { t } = useTranslation();
    const dir = Cookies.get('dir') || 'ltr';

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const filterData = useSelector(selectFlightFilter);
    const {
        courseFilter = {},
        wingFilter = {},
        harnessFilter = {},
        countryFilter = {},
        provinceFilter = {},
        siteFilter = {},
        flightTypeFilter = {},
        coachNameFilter = {},
        flightStatusFilter = {},
        fromDateFilter,
        toDateFilter,
        groundHandlingTypeFilter,
        activityType
    } = filterData || {};

    const [pageNumber, setPageNumber] = useState(1);

    const { data: userFlights, isLoading: userFlightsLoading, refetch: refetchFlights } = usePracticalActivities(
        pageNumber,
        8,
        courseFilter?.id || '',
        wingFilter?.id || '',
        harnessFilter?.id || '',
        siteFilter?.id || '',
        flightTypeFilter?.id || '',
        fromDateFilter || '',
        toDateFilter || '',
        coachNameFilter?.id || '',
        flightStatusFilter?.id || '',
        countryFilter?.id || '',
        provinceFilter?.id || '',
        groundHandlingTypeFilter?.id || '',
        activityType?.id || '',
    );


    const handleResetData = () => {
        dispatch(resetAllFilters());
    }

    return (
        <div className='w-full flex flex-col justify-center items-center'>
            <div className='w-full md:w-[75%] py-14 flex flex-col justify-center items-center gap-y-0 lg:gap-y-12 lg:w-[55%]'>
                <PageTitle title={t("flightHistory.logbook")} navigateTo={'/profile'} />
                <div className='w-[90%] mt-6 flex flex-col'>
                    <div className='w-full flex flex-col justify-center items-center px-1 gap-y-8'>

                        <div className='w-full flex justify-between gap-x-2'>
                            <button
                                className={`w-full ${ButtonStyles.normalButton}`}
                                onClick={() => navigate('/flightHistory/advancedFilter')}
                            >
                                {t("flightHistory.searchFilterButton")}
                            </button>
                            <button className={`w-16 rounded-2xl flex justify-center items-center bg-bgButtonSecondaryDefault`}
                            style={{
                                boxShadow: 'var(--shadow-button-dark),var(--shadow-button-white)'
                            }}
                            onClick={handleResetData}>
                                <span className='w-5' >
                                    <Eraser/>
                                </span>
                            </button>
                        </div>
 
                        <FilterVariables />
                        {/* {(courseFilter.id || wingFilter.id || harnessFilter.id || (countryFilter && countryFilter.id) || provinceFilter.id || siteFilter.id || flightTypeFilter.id || coachNameFilter.id || flightStatusFilter.id || fromDateFilter || toDateFilter) && (
                        )} */}

                        {userFlightsLoading && (
                            <Box sx={{ display: 'flex', width: 'full', justifyContent: 'center', marginTop: '10rem' }}>
                                <CircularProgress />
                            </Box>
                        )}

                        {userFlights && userFlights.data.length === 0 && (
                            <p className='text-base text-center font-medium mt-6 text-textWarning'>
                                {t("flightHistory.noFlightsFound")}
                            </p>
                        )}

                        {userFlights && userFlights.data.length > 0 && (
                            <div className='w-full flex flex-col gap-y-6'>
                                {userFlights.data.map((flight) => (
                                    <PracticalFlightHistoryBox key={flight.id} flightBaseData={flight} />
                                ))}
                            </div>
                        )}

                        <Pagination
                            totalPagesCount={userFlights?.totalPagesCount} 
                            totalCount={userFlights?.totalCount}
                            setPageNumber={setPageNumber}
                            PageNumber={pageNumber}
                            refetch={refetchFlights}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FlightHistory;
