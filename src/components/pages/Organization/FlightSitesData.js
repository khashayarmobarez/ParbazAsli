import React, { useState } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

// components
import CitiesDropdownInput from './CitiesDropDownInput';
import IranMap from './iranMap/components/IranMap';


const useCitiesData = () => {
    return useQuery(['user'], () => axios.get(`https://raw.githubusercontent.com/premier213/json-list-iran-cities/main/provinces_cities.json`));
};


const FlightSitesData = () => {

    const [city, setCity] = useState('')

    const { data, isLoading, error, isFetching } = useCitiesData();


    const handleSelectedCity = (selectedCity) => {
        setCity(selectedCity);
    };


    return (
        <div className='flex justify-center items-center w-[90%] min-h-20 rounded-2xl px-5 py-7 my-4 gap-x-6' style={{backgroundColor:'var(--organs-coachData-bg)', boxShadow:'var(--organs-coachData-boxShadow)'}}>
            
            <div className=' flex flex-col w-full h-full justify-between gap-x-6 md:flex-row'>

                
                {data &&
                    <div className=' w-full h-full'>

                        <CitiesDropdownInput name={'شهر خود را انتخاب کنید'} options={data.data} selectedOption={city} handleSelectChange={handleSelectedCity} />
                    
                    </div> }

                
                {/* map */}
                <div className=' w-full flex flex-row-reverse justify-start items-start lg:flex lg:flex-col-reverse'>
                    <IranMap />
                </div>

            </div>
    
        </div>
    );
};

export default FlightSitesData;