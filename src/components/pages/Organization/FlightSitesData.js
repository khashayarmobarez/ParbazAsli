import React, { useState } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

// utilities
import useDateFormat from '../../../Utilities/Hooks/useDateFormat';

// queries
import { useCountries, useProvincesByCountryId, useSitesByProvinceId } from '../../../Utilities/Services/addFlightQueries';
import { useCitiesByProvinceId, useFlightCounts } from '../../../Utilities/Services/organQueries';

// assets
import Eraser from '../../../components/icons/Eraser1Icon';

// components
import IranMap from './iranMap/components/IranMap';
import DropdownInput from '../../inputs/DropDownInput';
import SearchInputWithDropdown from '../../inputs/SearchInputWithDropdown';
import DateButtonInput from './OrganInputs/DateButtonInput';


const FlightSitesData = () => {

    const { formatDate } = useDateFormat();

    const [country, setCountry] = useState('')
    const [province, setProvince] = useState('')
    const [city, setCity] = useState('')
    const [site, setSite] = useState('')
    const [fromDate, setFromDate] = useState('')
    const [toDate, setToDate] = useState('')

    // here i'm writing some dirty code cause there was no solution
    // state to stop rendering the dateInput when date changes
    const [showDateInput, setShowDateInput] = useState(true)

    const { data: countriesData, loading:countriesLoading, error:countriesError } = useCountries()
    const { data: provincesData, loading:provincesLoading, error:provincesError, refetch: refetchProvinces } = useProvincesByCountryId(country ? country.id : '')
    const { data: flightCitiesData, loading:flightCitiesLoading, error:flightCitiesError, refetch: refetchCities } = useCitiesByProvinceId(province  && province.id)
    const { data: flightSitesData, loading:flightSitesLoading, error:flightSitesError, refetch: refetchSites } = useSitesByProvinceId(province  && province.id, country && country.id)
    const { data: flightCountsData, loading:flightCountsLoading, error:flightCountsError, refetch: refetchCounts } = useFlightCounts(site && site?.id, province && province?.id, fromDate && fromDate, toDate && toDate)

    const handleSelectSetCountry = (selectedCountry) => {
        setCountry(selectedCountry)
        setProvince('')
        setCity('')
        setSite('')
    }

    const handleSelectSetProvince = (selectedProvince) => {
        setProvince(selectedProvince)
        setCity('')
        setSite('')
    }

    const handleSelectSetCity = (selectedCity) => {
        setCity(selectedCity)
    }

    const handleSelectSetSite = (selectedSite) => {
        setSite(selectedSite)
    }

    // function to rerender the component
    const handleResetData = () => {
        setCountry('')
        setProvince('')
        setCity('')
        setSite('')
        setFromDate('')
        setToDate('')
        setShowDateInput(false)
        // timeout to stop render and rerender the component
        setTimeout(() => {
            setShowDateInput(true)
        }, 100);
    }

    const handleFlightFromDateFilterChange = (value) => {

        const formattedFromDate = formatDate(value);
        setFromDate(formattedFromDate)

        // function to close the datePicker
        clickOnRightSide()
    }

    const handleFlightToDateFilterChange = (value) => {
        const formattedToDate = formatDate(value);
        setToDate(formattedToDate)

        // function to close the datePicker
        clickOnRightSide()
    }

    // function to close the datePicker
    const clickOnRightSide = () => {
        // Create a new mouse event
        const clickEvent = new MouseEvent('mousedown', {
            view: window,
            bubbles: true,
            cancelable: true,
            clientX: window.innerWidth - 1, // Right edge of the screen
            clientY: window.innerHeight / 2 // Middle of the screen vertically
        });

        // Dispatch the event to the document
        document.dispatchEvent(clickEvent);
    };

    return (
            <div className=' flex flex-col w-full gap-y-8 '>

                <div className=' flex flex-col w-full h-auto justify-between gap-x-6 lg:flex-row'>

                    <div className=' w-full h-full flex flex-col items-center gap-y-4 lg:mt-6'>

                            <p className='text-lg text-[var(--text-accent)] self-start'>آمار پرواز در سایت‌ها</p>

                            {
                                countriesData && 
                                <DropdownInput name={'کشور'} options={countriesData.data} selectedOption={country} handleSelectChange={handleSelectSetCountry} />
                            }

                            {
                                provincesData && !provincesLoading && (country && country.id) &&
                                (<SearchInputWithDropdown name={'استان'} options={provincesData.data} selectedOption={province} handleSelectChange={handleSelectSetProvince} />)
                            }

                            {
                                flightCitiesData && !flightCitiesLoading && province && province.id &&
                                (<SearchInputWithDropdown name={'شهر'} options={flightCitiesData.data} selectedOption={city} handleSelectChange={handleSelectSetCity} />)
                            }

                            {
                                flightSitesData && !flightSitesLoading && province && province.id &&
                                (<SearchInputWithDropdown name={'سایت'} options={flightSitesData.data} selectedOption={site} handleSelectChange={handleSelectSetSite} />)
                            }
                        
                    </div>

                    
                    {/* map */}
                    <div className=' w-full flex flex-row-reverse justify-start items-start lg:flex lg:flex-col-reverse'>
                        <IranMap />
                    </div>

                </div>

                <div className=' w-full flex flex-col justify-between gap-4 '>
                    
                    <div className='w-full flex gap-x-2'>
                        { showDateInput &&
                            <>
                                <DateButtonInput name={'از تاریخ ...'} value={fromDate} onChange={handleFlightFromDateFilterChange} placeH={'از تاریخ ...'} />
                                <DateButtonInput name={'تا تاریخ ...'} value={toDate} onChange={handleFlightToDateFilterChange} placeH={'تا تاریخ ...'} />
                            </>
                        }
                        <button className={`w-24 rounded-2xl flex justify-center items-center`}
                            style={{
                                background:  'var(--profile-buttons-background)',
                                boxShadow: 'var(--profile-buttons-boxShadow)'
                            }}
                            onClick={handleResetData}>
                                <Eraser />
                        </button>
                    </div>

                    <div className=' bg-[var(--Basic-dataBox-bg)] rounded-3xl h-12 flex justify-between items-center px-6 border border-textDisabled text-xs lg:text-base'>
                        <p className='text-[var(--text-accent)]'>تعداد پروازهای انجام شده</p>
                        <p className='text-[var(--text-accent)]'>{flightCountsData && flightCountsData.data}</p>
                        <>
                            {
                                !toDate && !fromDate ?
                                'از تاریخ ابتدا تا کنون'
                                :
                                <p>
                                    {fromDate && `از ${fromDate}`} {toDate && `تا ${toDate}`}
                                </p>
                            }
                        </>
                    </div>

                </div>
            </div>
    );
};

export default FlightSitesData;