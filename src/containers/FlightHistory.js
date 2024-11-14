import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { selectFlightFilter, resetAllFilters } from '../Utilities/ReduxToolKit/features/flightHistoryAdvancedFilter/flightFilterSlice';

// styles
import ButtonStyles from '../styles/Buttons/ButtonsBox.module.css';

// assets 
import ArrowButton from '../components/icons/ArrowButton';
import Eraser from '../components/icons/Eraser1Icon';

// mui
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

// queries
import { useUserFlights } from '../Utilities/Services/flightHistoriesQueries';

// components
import PageTitle from '../components/reuseable/PageTitle';
import PracticalFlightHistoryBox from '../components/pages/FlightHistory/PracticalFlightHistoryBox';
import FilterVariables from '../components/pages/FlightHistory/FilterVariables';

const FlightHistory = () => {

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
        toDateFilter    
    } = filterData || {};

    const [pageNumber, setPageNumber] = useState(1);

    const { data: userFlights, isLoading: userFlightsLoading } = useUserFlights(
        pageNumber,
        10,
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
        provinceFilter?.id || ''
    );

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

    const handleResetData = () => {
        dispatch(resetAllFilters());
    }

    return (
        <div className='w-full flex flex-col justify-center items-center'>
            <div className='w-full md:w-[75%] py-14 flex flex-col justify-center items-center gap-y-0'>
                <PageTitle title={'سوابق پرواز'} navigateTo={'/profile'} />
                <div className='w-[90%] mt-6 flex flex-col'>
                    <div className='w-full flex flex-col justify-center items-center px-1 gap-y-8'>

                        <div className='w-full flex justify-between gap-x-2'>
                            <button
                                className={`w-full ${ButtonStyles.normalButton}`}
                                onClick={() => navigate('/flightHistory/advancedFilter')}
                            >
                                فیلتر جست‌وجو
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
                                هیچ پروازی یافت نشد
                            </p>
                        )}

                        {userFlights && userFlights.data.length > 0 && (
                            <div className='w-full flex flex-col gap-y-6'>
                                {userFlights.data.map((flight) => (
                                    <PracticalFlightHistoryBox key={flight.id} flightBaseData={flight} />
                                ))}
                            </div>
                        )}

                        {userFlights && userFlights.data.length > 0 && (
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
                </div>
            </div>
        </div>
    );
};

export default FlightHistory;
