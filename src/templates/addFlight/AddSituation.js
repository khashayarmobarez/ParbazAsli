import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

// provider
import { useNavigate } from 'react-router-dom';

// assets
import ArrowButton from '../../components/icons/ArrowButton'

// reactToastify

import { toast } from 'react-toastify';

// queries
import { useCloudTypes, useCountries, useProvincesByCountryId , useSitesByProvinceId } from '../../Utilities/Services/addFlightQueries';

// redux
import { useSelector, useDispatch } from 'react-redux';
import { selectAddFlight } from '../../Utilities/ReduxToolKit/features/AddFlight/addFlightSlice';
import { updateCity, updateSight,updateClouds,updateCountry } from '../../Utilities/ReduxToolKit/features/AddFlight/addFlightSlice';

// components
import DropdownInput from '../../components/inputs/DropDownInput';
import SearchInputWithDropdown from '../../components/inputs/SearchInputWithDropdown';

const AddSituation = () => {

    const navigate= useNavigate('')
    const dispatch = useDispatch()
    const appTheme = Cookies.get('themeApplied') || 'dark';

    const [submitted, setSubmitted] = useState(false);

    // redux, the first line are this page datas and the second line is for checking the form to be complete
    const { country, city, sight, clouds ,
    wing, harness, parachute, flightType } = useSelector(selectAddFlight)

    const { data: countriesData, } = useCountries()
    const { data: provincesData, } = useProvincesByCountryId(country && country.id)
    const { data: flightSitesData } = useSitesByProvinceId(city && city.id, country && country.id)
    // useCloudTypes
    const { data: cloudTypesData, } = useCloudTypes()


    // function to start from the bottom of the page
    useEffect(() => {
        setTimeout(() => {
            window.scrollTo({
                top: document.documentElement.scrollHeight, 
                behavior: 'smooth',  // 'auto' if you don't want smooth scrolling
              });
        }, 300);
    }, []);

    useEffect(() => {
        if(!wing.id || !harness.id || !parachute.id || !flightType) {
            navigate('/addFlight/AddFlightType')
            toast('لطفا اطلاعات صفحات قبل را اول کامل کنید', {
                type: 'error', // Specify the type of toast (e.g., 'success', 'error', 'info', 'warning')
                position: 'top-right', // Set the position (e.g., 'top-left', 'bottom-right')
                autoClose: 3000,
                theme: appTheme,
                style: { width: "350px" }
            });
        }
    }, [ wing, harness, parachute, flightType , navigate])


    const handleSelectSetCountry = (selectedOption) => {
        dispatch(updateCountry(selectedOption));
        dispatch(updateCity(''));
        dispatch(updateSight(''));
    };

    const handleSelectSetCity = (selectedOption) => {
        dispatch(updateCity(selectedOption));
        dispatch(updateSight(''));
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

    setSubmitted(true);

    if(city && sight && clouds) {
            navigate('/addFlight/addTakeoff')
        } else {
            toast('لطفا اطلاعات را کامل وارد کنید', {
                type: 'error', // Specify the type of toast (e.g., 'success', 'error', 'info', 'warning')
                position: 'top-right', // Set the position (e.g., 'top-left', 'bottom-right')
                autoClose: 3000,
                theme: appTheme,
                style: { width: "350px" }
                });
        }

    };


    

    
    return (
        <>
            <div className='flex flex-col justify-center items-center w-[90%] gap-y-7'>

                {/* line and circle of adding flight level */}
                <div className='w-full flex flex-col gap-y-3 justify-center items-center'>

                    <div className='flex items-center justify-center w-[100%]'>
                        
                        <div className='rounded-full w-3 h-3' style={{background:'var(--text-accent)'}}></div>

                        <div className='rounded-full w-[20%] h-[2px]' style={{background:'var(--text-accent)'}}></div>

                        <div className='rounded-full w-3 h-3' style={{background:'var(--text-accent)'}}></div>

                        <div className='rounded-full w-[20%] h-[2px]' style={{background:'var(--text-accent)'}}></div>

                        <div className='border-2 rounded-full w-5 h-5  border-textAccent flex items-center justify-center'>
                            <div className='rounded-full w-3 h-3' style={{background:'var(--text-accent)'}}></div>
                        </div>

                        <div className='rounded-full w-[20%] h-[2px]' style={{background:'var(--icon-disable)'}}></div>

                        <div className='rounded-full w-3 h-3' style={{background:'var(--icon-disable)'}}></div>

                        <div className='rounded-full w-[20%] h-[2px]' style={{background:'var(--icon-disable)'}}></div>

                        <div className='rounded-full w-3 h-3' style={{background:'var(--icon-disable)'}}></div>

                    </div>

                    <div className='flex items-center justify-between w-full text-xs'>

                        <p className='' style={{color:'var(--text-accent)'}}>IGC</p>

                        <p className='' style={{color:'var(--text-accent)'}}>وسیله پروازی</p>

                        <p className='' style={{color:'var(--text-accent)'}}>شرایط پرواز</p>

                        <p className='' style={{color:'var(--icon-disable)'}}>Takeoff</p>

                        <p className='' style={{color:'var(--icon-disable)'}}>Landing</p>

                    </div>
                    
                </div>


                <form className='w-full flex flex-col items-center justify-center gap-y-6'>
                    {
                        countriesData &&
                        <DropdownInput id={'ddi1'} name={'کشور'} options={countriesData.data} selectedOption={country} handleSelectChange={handleSelectSetCountry} IsEmptyAfterSubmit={submitted && !country} />
                    }

                    {
                        provincesData && country && country.id &&
                        <SearchInputWithDropdown
                            options={provincesData.data}
                            selectedOption={city}
                            handleSelectChange={handleSelectSetCity}
                            name="استان"
                            IsEmptyAfterSubmit={submitted && !city}
                        />
                    }

                    {
                        flightSitesData && city && city.id &&
                        <DropdownInput id={'ddi2'} name={'سایت'} options={flightSitesData.data} selectedOption={sight} handleSelectChange={handleSelectSetSight}
                        IsEmptyAfterSubmit={submitted && !sight} />
                    }

                    {
                        flightSitesData && cloudTypesData &&
                        <DropdownInput id={'ddi3'} name={'نوع پوشش ابری'} options={cloudTypesData.data} selectedOption={clouds} handleSelectChange={handleSelectSetClouds} IsEmptyAfterSubmit={submitted && !clouds}/>
                    }
                    
                    {/* <DropdownInput id={'ddi4'} name={'نوع پرواز'} options={flightTypeOptions} selectedOption={flightType} handleSelectChange={handleSelectSetFlightType} /> */}
                </form>

                <div className='flex justify-between items-center w-full'>

                    <div onClick={() => navigate(-1)} className='flex items-center justify-between'>
                        <span className='w-8 h-8 flex justify-center items-center ml-2'>
                            <ArrowButton isRight={true} />
                        </span>
                        <p className=' '>قبلی</p>
                    </div>

                    <div onClick={handleNextPageButton} className='flex items-center justify-between'>
                        <p className=''>بعدی</p>
                        <span className='w-8 h-8 flex justify-center items-center mr-2'>
                            <ArrowButton  />
                        </span>
                    </div>
                
                </div>

            </div>
        </>
    );
};

export default AddSituation;