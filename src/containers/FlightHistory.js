import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// redux
import { useSelector } from 'react-redux';
import { selectFlightFilter } from '../Utilities/ReduxToolKit/features/flightHistoryAdvancedFilter/flightFilterSlice';

// styles
import ButtonStyles from '../styles/Buttons/ButtonsBox.module.css'

// assets
import arrowIcon from '../assets/icons/Right Arrow Button.svg';

// mui
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';


//  Queries
import { useUserFlights } from '../Utilities/Services/flightHistoriesQueries';

// components
import PageTitle from '../components/reuseable/PageTitle';
import PracticalFlightHistoryBox from '../components/pages/FlightHistory/PracticalFlightHistoryBox';
import FilterVariables from '../components/pages/FlightHistory/FilterVariables';


const FlightHistory = () => {

    const navigate = useNavigate();

    // redux
    const { 
        courseFilter,
        wingFilter,
        harnessFilter,
        countryFilter,
        provinceFilter,
        siteFilter,
        flightTypeFilter,
        coachNameFilter,
        flightStatusFilter,
        fromDateFilter,
        toDateFilter
    } = useSelector(selectFlightFilter)

    const [pageNumber, setPageNumber] = useState(1);

    // react query
    const { 
        data: userFlights, isLoading: userFlightsLoading
    } = useUserFlights(pageNumber,10, courseFilter && courseFilter.id , wingFilter && wingFilter.id, harnessFilter && harnessFilter.id, siteFilter && siteFilter.id, flightTypeFilter && flightTypeFilter.id, fromDateFilter && fromDateFilter, toDateFilter, coachNameFilter && coachNameFilter.id, flightStatusFilter && flightStatusFilter.id , countryFilter && countryFilter.id , provinceFilter && provinceFilter.id);


    // increase the page number by 1 
    const handleNextPage= () => {
        pageNumber < userFlights.totalPagesCount && setPageNumber(pageNumber + 1);
    }

    const handlePrevPage = () => {
        pageNumber > 1 && setPageNumber(pageNumber - 1);
    }



    return (
        
        <div className='w-full flex flex-col justify-center items-center'>

            <div className='w-full md:w-[75%] py-14 flex flex-col justify-center items-center gap-y-0'>

                <PageTitle title={'سوابق پرواز'} navigateTo={'profile'} /> 

                <div className='w-[90%] mt-6 flex flex-col'>

                        <div className='w-full flex flex-col justify-center items-center px-1 gap-y-8'>
                            
                            {/* removed from this page */}
                            {/* <div className='w-full flex flex-col gap-y-2 mb-[-2rem]'>

                                <div className='w-full flex justify-between items-center'>
                                    <div className='flex justify-center items-center' >
                                        <MailOutlinedIcon sx={{width:'2.5rem'}} />
                                        <p className='text-sm' >112 تعداد پرواز</p>
                                    </div>
                                    <div className='flex justify-center items-center' >
                                        <MailOutlinedIcon sx={{width:'2.5rem'}} />
                                        <p className='text-sm' >98 ساعت پرواز</p>
                                    </div>
                                </div>

                                <WorldMapFlightHistory  />

                            </div> */}


                            {/* Advanced filter */}
                            <button
                            className={`w-full ${ButtonStyles.normalButton} `}
                            onClick={() => navigate('/flightHistory/advancedFilter')}>
                                فیلتر جست‌وجو 
                            </button>

                            {
                                (courseFilter.id !== '' ||
                                wingFilter.id !== '' ||
                                harnessFilter.id !== '' ||
                                countryFilter.id !== '' ||
                                provinceFilter.id !== '' ||
                                siteFilter.id !== '' ||
                                flightTypeFilter.id !== '' ||
                                coachNameFilter.id !== '' ||
                                flightStatusFilter.id !== '' ||
                                fromDateFilter !== '' ||
                                toDateFilter !== '' ) &&
                                <FilterVariables />
                            }

                            {
                                userFlightsLoading &&
                                <Box sx={{ display: 'flex', width:'full' , justifyContent:'center', marginTop:'10rem' }}>
                                    <CircularProgress /> 
                                </Box>
                            }

                            {
                                userFlights && userFlights.data.length === 0 &&
                                <p className='text-base text-center font-medium mt-6' style={{color:'var(--red-text)'}}>هیچ پروازی یافت نشد</p>
                            }


                            {/* flight history */}
                            {
                                userFlights && userFlights.data.length > 0 &&
                                <div className='w-full flex flex-col gap-y-6'>
                                    {userFlights.data.map((flight) => (
                                        <PracticalFlightHistoryBox key={flight.id} flightBaseData={flight} />
                                    ))}
                                </div>
                            }

                            {/* pagination buttons */}
                            {userFlights && userFlights.data.length > 0 &&
                            <div className='w-full flex justify-between px-10 items-center'>

                                <button className={`w-10 justify-self-start`} 
                                disabled={userFlights.totalPagesCount === 1 || userFlights.totalPagesCount === pageNumber} 
                                onClick={handleNextPage}>
                                    <img src={arrowIcon} alt='arrow' 
                                    className={ `${(userFlights.totalPagesCount === 1 || userFlights.totalPagesCount === pageNumber) && 'opacity-60' } `} />
                                </button>

                                <p className='text-sm justify-self-center' style={{color:'var(--yellow-text)'}}>صفحه ی {pageNumber}</p>
                                
                                <button 
                                    className={`transform rotate-180 w-10 justify-self-end`}
                                    disabled={pageNumber === 1}
                                    onClick={ handlePrevPage}>
                                    <img src={arrowIcon} alt='arrow' className={`mt-2 ${ pageNumber === 1 && 'opacity-60'}`} />
                                </button>

                            </div>
                            }

                        </div>
                </div>
            
            </div>

        </div>
    );
};

export default FlightHistory;
