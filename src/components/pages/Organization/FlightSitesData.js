import React, { useState } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

// queries
import { useCountries, useProvincesByCountryId, useSitesByProvinceId } from '../../../Utilities/Services/addFlightQueries';
import { useCitiesByProvinceId } from '../../../Utilities/Services/organQueries';

// components
import IranMap from './iranMap/components/IranMap';
import DropdownInput from '../../inputs/DropDownInput';
import SearchInputWithDropdown from '../../inputs/SearchInputWithDropdown';


const FlightSitesData = () => {

    const [country, setCountry] = useState('')
    const [province, setProvince] = useState('')
    const [city, setCity] = useState('')
    const [site, setSite] = useState('')

    const { data: countriesData, loading:countriesLoading, error:countriesError } = useCountries()
    const { data: provincesData, loading:provincesLoading, error:provincesError, refetch: refetchProvinces } = useProvincesByCountryId(country ? country.id : '')
    const { data: flightCitiesData, loading:flightCitiesLoading, error:flightCitiesError, refetch: refetchCities } = useCitiesByProvinceId(province  && province.id)
    const { data: flightSitesData, loading:flightSitesLoading, error:flightSitesError, refetch: refetchSites } = useSitesByProvinceId(province  && province.id, country && country.id)

    const handleSelectSetCountry = (selectedCountry) => {
        setCountry(selectedCountry)
        setProvince('')
        setSite('')
    }

    const handleSelectSetProvince = (selectedProvince) => {
        setProvince(selectedProvince)
        setSite('')
    }

    const handleSelectSetCity = (selectedCity) => {
        setCity(selectedCity)
    }

    const handleSelectSetSite = (selectedSite) => {
        setSite(selectedSite)
    }

    return (
            <div className=' flex flex-col w-full h-auto justify-between gap-x-6 md:flex-row'>

                <div className=' w-full h-full flex flex-col items-center gap-y-4'>

                        <p className='text-lg text-[var(--yellow-text)] self-start'>آمار پرواز در سایت‌ها</p>

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
    );
};

export default FlightSitesData;