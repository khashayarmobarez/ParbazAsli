import React, { useEffect } from 'react';

// components
import DropdownInput from '../../inputs/DropDownInput';

// provider
import { flightHourOptionData, flightTypeOptions } from '../../../Utilities/Providers/dropdownInputOptions';
import { useNavigate } from 'react-router-dom';

// assets
import RightArrowButton from '../../../assets/icons/Right Arrow Button.svg'

// reactToastify

import { toast } from 'react-toastify';

// redux
import { useSelector, useDispatch } from 'react-redux';
import { selectAddFlight } from '../../../Utilities/ReduxToolKit/features/AddFlight/addFlightSlice';
import { updateCity, updateSight,updateClouds,updateCountry } from '../../../Utilities/ReduxToolKit/features/AddFlight/addFlightSlice';
import { useCloudTypes, useCountries, useProvincesByCountryId , useSitesByProvinceId } from '../../../Utilities/Services/addFlightQueries';


const AddSituation = () => {

    const navigate= useNavigate('')
    const dispatch = useDispatch()

    // redux, the first line are this page datas and the second line is for checking the form to be complete
    const { country, city, sight, clouds ,
    wing, harness, parachute, } = useSelector(selectAddFlight)

    const { data: countriesData, loading:countriesLoading, error:countriesError } = useCountries()
    const { data: provincesData, loading:provincesLoading, error:provincesError } = useProvincesByCountryId(country.id)
    const { data: flightSitesData, loading:flightSitesLoading, error:flightSitesError } = useSitesByProvinceId(city.id)
    // useCloudTypes
    const { data: cloudTypesData, loading:cloudTypesLoading, error:cloudTypesError } = useCloudTypes()


    useEffect(() => {
        if(!wing.id || !harness.id || !parachute.id) {
            navigate('/addFlight/AddUsedEquipment')
            toast('لطفا اطلاعات صفحات قبل را اول کامل کنید', {
                type: 'error', // Specify the type of toast (e.g., 'success', 'error', 'info', 'warning')
                position: 'top-right', // Set the position (e.g., 'top-left', 'bottom-right')
                autoClose: 3000,
                theme: 'dark',
                style: { width: "350px" }
              });
        }
    }, [ wing, harness, parachute, navigate])


    const handleSelectSetCountry = (selectedOption) => {
        dispatch(updateCountry(selectedOption));
    };

    const handleSelectSetCity = (selectedOption) => {
        dispatch(updateCity(selectedOption));
    };

    const handleSelectSetSight = (selectedOption) => {
        dispatch(updateSight(selectedOption));
    };

    const handleSelectSetClouds = (selectedOption) => {
        dispatch(updateClouds(selectedOption));
    };


    // flight type moved to another page
    // const handleSelectSetFlightType = (event) => {
    //     dispatch(updateFlightType(event.target.value));
    //     console.log({city, sight, clouds, flightType})
    //   };



    // Determine if the next button should be disabled
    

    const handleNextPageButton = () => {

        if(city && sight && clouds) {
            navigate('/addFlight/addTakeoff')
        } else {
            toast('لطفا اطلاعات را کامل وارد کنید', {
                type: 'error', // Specify the type of toast (e.g., 'success', 'error', 'info', 'warning')
                position: 'top-right', // Set the position (e.g., 'top-left', 'bottom-right')
                autoClose: 3000,
                theme: 'dark',
                style: { width: "350px" }
              });
        }

      };



    
    return (
        <>
            <div className='flex flex-col justify-center items-center w-[90%] gap-y-7'>

                {/* line and circle of adding flight level */}
                <div className='w-full flex flex-col gap-y-3 justify-center items-center'>

                    <div className='flex items-center justify-center w-full'>
                        
                        <div className='rounded-full w-3 h-3' style={{background:'var(--soft-white)'}}></div>

                        <div className='rounded-full w-[25%] h-[2px]' style={{background:'var(--soft-white)'}}></div>

                        <div className='rounded-full w-3 h-3' style={{background:'var(--soft-white)'}}></div>

                        <div className='rounded-full w-[25%] h-[2px]' style={{background:'var(--soft-white)'}}></div>

                        <div className='rounded-full w-3 h-3' style={{background:'var(--yellow-text)'}}></div>

                        <div className='rounded-full w-[25%] h-[2px]' style={{background:'var(--yellow-text)'}}></div>

                        <div className='rounded-full w-3 h-3' style={{background:'var(--yellow-text)'}}></div>

                    </div>

                    <div className='flex items-center justify-between w-[97%]'>

                        <p className='' style={{color:'var(--soft-white)'}}>Landing</p>

                        <p className='' style={{color:'var(--soft-white)'}}>Takeoff</p>

                        <p className='' style={{color:'var(--yellow-text)'}}>شرایط پرواز</p>

                        <p className='' style={{color:'var(--yellow-text)'}}>وسیله پرواز</p>

                    </div>
                    
                </div>


                <div id='title' className='flex justify-between items-center w-full mt-2' style={{color:'var(--yellow-text'}}  >
                    <h3 className=' text-base '>موقعیت و شرایط پرواز</h3>
                    <div className='h-[1px] w-6/12 mt-2' style={{background: 'var(--yellow-text)' }}></div>
                </div>

                <form className='w-full flex flex-col items-center justify-center gap-y-6'>
                    {
                        countriesData &&
                        <DropdownInput name={'کشور'} options={countriesData.data} selectedOption={country} handleSelectChange={handleSelectSetCountry} />
                    }

                    {
                        provincesData &&
                        <DropdownInput name={'شهر'} options={provincesData.data} selectedOption={city} handleSelectChange={handleSelectSetCity} />
                    }

                    {
                        flightSitesData &&
                        <DropdownInput name={'سایت'} options={flightSitesData.data} selectedOption={sight} handleSelectChange={handleSelectSetSight} />
                    }

                    {
                        flightSitesData && cloudTypesData &&
                        <DropdownInput name={'نوع پوشش ابری'} options={cloudTypesData.data} selectedOption={clouds} handleSelectChange={handleSelectSetClouds} />
                    }
                    
                    {/* <DropdownInput name={'نوع پرواز'} options={flightTypeOptions} selectedOption={flightType} handleSelectChange={handleSelectSetFlightType} /> */}
                </form>

                <div className='flex justify-between items-center w-full'>

                    <div onClick={handleNextPageButton} className='flex items-center justify-between'>
                        <span className='w-10'><img alt='icon' className='w-full h-full' src={RightArrowButton}/></span>
                        <p className='mr-2 pb-2'>بعدی</p>
                    </div>

                    <div onClick={() => navigate(-1)} className='flex items-center justify-between'>
                        <p className='ml-2 '>قبلی</p>
                        <span className='w-10'><img alt='icon' className='w-full h-full  rotate-180' src={RightArrowButton}/></span>
                    </div>
                
                </div>

            </div>
        </>
    );
};

export default AddSituation;