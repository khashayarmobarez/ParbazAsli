import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { selectFlightFilter, resetAllFilters } from '../Utilities/ReduxToolKit/features/flightHistoryAdvancedFilter/flightFilterSlice';

// styles
import ButtonStyles from '../styles/Buttons/ButtonsBox.module.css';

// assets 
import arrowIcon from '../assets/icons/Right Arrow Button.svg';
import eraser from '../assets/icons/eraser 1.svg';

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
                            <button className={`w-12 rounded-xl flex justify-center items-center`}
                            style={{
                                background:  'var(--profile-buttons-background),var(--bg-color)',
                                boxShadow: 'var(--profile-buttons-boxShadow)'
                            }}
                            onClick={handleResetData}>
                                <img src={eraser} alt='eraser' />
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
                            <p className='text-base text-center font-medium mt-6' style={{ color: 'var(--red-text)' }}>
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
                                    className='w-10 justify-self-start'
                                    disabled={userFlights.totalPagesCount === 1 || userFlights.totalPagesCount === pageNumber}
                                    onClick={handleNextPage}
                                >
                                    <img
                                        src={arrowIcon}
                                        alt='arrow'
                                        className={`${(userFlights.totalPagesCount === 1 || userFlights.totalPagesCount === pageNumber) && 'opacity-60'}`}
                                    />
                                </button>

                                <p className='text-sm justify-self-center' style={{ color: 'var(--yellow-text)' }}>
                                    صفحه ی {pageNumber}
                                </p>

                                <button
                                    className='transform rotate-180 w-10 justify-self-end'
                                    disabled={pageNumber === 1}
                                    onClick={handlePrevPage}
                                >

                                <img
                                    src={arrowIcon}
                                    alt='arrow'
                                    className={`mt-2 ${pageNumber === 1 && 'opacity-60'}`}
                                />

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
