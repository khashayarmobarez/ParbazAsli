import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

import { toast } from 'react-toastify';

// components
import DropdownInput from '../../components/inputs/DropDownInput';

// provider
import { useNavigate } from 'react-router-dom';

// assets
import ArrowButton from '../../components/icons/ArrowButton'
import ColorTagsIcon from '../../components/icons/ColorTagsIcon'
import WindIcon from '../../components/icons/WindIcon'
import WindDirectionCock from '../../components/icons/WindDirectionCock'

// provider
import { windDirectionOptions, windSpeedUnits } from '../../Utilities/Providers/dropdownInputOptions';

// redux
import { useSelector, useDispatch } from 'react-redux';
import { selectAddFlight } from '../../Utilities/ReduxToolKit/features/AddFlight/addFlightSlice';
import { updateTakeoffTime, updateTakeOfftype, updateTakeoffWindSpeed, updateTakeOffWindDirection, updateTakeOffWindUnit } from '../../Utilities/ReduxToolKit/features/AddFlight/addFlightSlice';
import { useTakeoffTypes } from '../../Utilities/Services/addFlightQueries';
import TimeInput from '../../components/inputs/TimeInput';
import NumberInput from '../../components/inputs/NumberInput';


const AddTakeoff = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const appTheme = Cookies.get('themeApplied') || 'dark';

    const [submitted, setSubmitted] = useState(false);

    // redux
    const { takeoffTime, takeoffType, takeoffWindSpeed, takeoffwindDirection, takeOffWindUnit,
    wing, harness, parachute, country, city, sight, clouds , flightType, landingTime
    } = useSelector(selectAddFlight)

    // useTakeOffTypes
    const { data: takeOffTypesData, loading:takeOffTypesLoading, error:takeOffTypesError } = useTakeoffTypes()


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
        if(!wing.id || !harness.id || !parachute.id || !country.id || !city.id || !sight.id || !clouds.id || !flightType) {
            navigate('/addFlight/AddFlightType')
            toast('لطفا اطلاعات صفحات قبل را اول کامل کنید', {
                type: 'error', // Specify the type of toast (e.g., 'success', 'error', 'info', 'warning')
                position: 'top-right', // Set the position (e.g., 'top-left', 'bottom-right')
                autoClose: 3000,
                theme: appTheme,
                style: { width: "350px" }
              });
        }
    }, [ wing, harness, parachute, country, city , sight , clouds , flightType , navigate, appTheme ]);


    const handleTakeOffTimeChange = (newTime) => {
        dispatch(updateTakeoffTime(newTime));
      };

    const handleSelectSetTakeoffType = (selectedOption) => {
        dispatch(updateTakeOfftype(selectedOption));
      };

    // const handleSelectSetWindUnit = (selectedOption) => {
    //     dispatch(updateTakeOffWindUnit(selectedOption));
    //   };

    const handleSetTakeoffWindspeedChange = (event) => {
        dispatch(updateTakeoffWindSpeed(event.target.value));
      };

    const handleSelectSetTakeoffwindDirection = (selectedOption) => {
        dispatch(updateTakeOffWindDirection(selectedOption));
      };



    // Determine if the next button should be disabled
    

    const handleNextPageButton = () => {

        setSubmitted(true);

        if(takeoffTime && takeoffType && takeoffWindSpeed && takeoffwindDirection && takeOffWindUnit) {
            navigate('/addFlight/AddLanding')
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

                        <div className='rounded-full w-3 h-3' style={{background:'var(--text-accent)'}}></div>

                        <div className='rounded-full w-[20%] h-[2px]' style={{background:'var(--text-accent)'}}></div>

                        <div className='border-2 rounded-full w-5 h-5  border-textAccent flex items-center justify-center'>
                            <div className='rounded-full w-3 h-3' style={{background:'var(--text-accent)'}}></div>
                        </div>

                        <div className='rounded-full w-[20%] h-[2px]' style={{background:'var(--icon-disable)'}}></div>

                        <div className='rounded-full w-3 h-3' style={{background:'var(--icon-disable)'}}></div>

                    </div>

                    <div className='flex items-center justify-between w-full text-xs'>

                        <p className='' style={{color:'var(--text-accent)'}}>IGC</p>

                        <p className='' style={{color:'var(--text-accent)'}}>وسیله پروازی</p>

                        <p className='' style={{color:'var(--text-accent)'}}>شرایط پرواز</p>

                        <p className='' style={{color:'var(--text-accent)'}}>Takeoff</p>

                        <p className='' style={{color:'var(--icon-disable)'}}>Landing</p>

                    </div>
                    
                </div>

                <form className='w-full flex flex-col items-center justify-center gap-y-6'>

                    <div className='w-full flex flex-col gap-y-1'>
                        <p className='text-xs text-start self-start'>زمان take off (ورودی ساعت ۲۴ ساعته می باشد)</p>
                        <TimeInput
                            value={takeoffTime}
                            onChange={handleTakeOffTimeChange}
                            placeholder="Select time"
                        />
                        {
                            !takeoffTime && submitted &&
                            <p className='text-xs text-start self-start text-textError'>زمان take off الزامی می باشد</p>
                        }
                        {
                            landingTime < takeoffTime && landingTime &&
                            <p className='text-xs text-start self-start text-textError'>زمان take off باید قبل از زمان land ( {landingTime?.$d?.getHours()}:{landingTime?.$d?.getMinutes()} ) باشد</p>
                        }
                        {
                            takeoffTime && takeoffTime.$d.getHours() > new Date().getHours() && (
                                <p className='text-xs text-start self-start text-textError'>زمان land باید قبل از الان باشد</p>
                            )
                        }
                    </div>

                    {/* <DropdownInput id={'ddi1'} name={'زمان'} options={flightHourOptionData} selectedOption={takeoffTime} handleSelectChange={handleSelectSetTakeoffTime} /> */}

                    {
                        takeOffTypesData &&
                        <DropdownInput 
                            id={'ddi2'} 
                            name={'شیوه'} 
                            icon={<ColorTagsIcon/>} 
                            options={takeOffTypesData.data} 
                            selectedOption={takeoffType} 
                            handleSelectChange={handleSelectSetTakeoffType} 
                            IsEmptyAfterSubmit={submitted && !takeoffType} 
                            isSubmitted={submitted}
                            ErrorCondition={!takeoffType}
                            ErrorText={'شیوه take off الزامی می باشد'}
                        />
                    } 

                    <DropdownInput 
                        id={'ddi3'} 
                        name={'جهت باد'} 
                        icon={<WindDirectionCock/>} 
                        options={windDirectionOptions} 
                        selectedOption={takeoffwindDirection} 
                        handleSelectChange={handleSelectSetTakeoffwindDirection} 
                        IsEmptyAfterSubmit={submitted && !takeoffwindDirection} 
                        isSubmitted={submitted}
                        ErrorCondition={!takeoffwindDirection}
                        ErrorText={'جهت باد الزامی می باشد'}
                    />
                    
                    {/* <DropdownInput id={'ddi4'} name={'واحد سرعت باد'} options={windSpeedUnits} selectedOption={takeOffWindUnit} handleSelectChange={handleSelectSetWindUnit} /> */}

                    <NumberInput
                        id={'NI1'}
                        icon={<WindIcon/>}
                        value={takeoffWindSpeed}
                        onChange={handleSetTakeoffWindspeedChange}
                        placeholder={`سرعت باد به ${takeOffWindUnit && takeOffWindUnit.name}`}
                        IsEmptyAfterSubmit={submitted && !takeoffWindSpeed}
                        isSubmitted={submitted}
                        ErrorCondition={!takeoffWindSpeed}
                        ErrorText={'سرعت باد الزامی می باشد'}
                    />

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

export default AddTakeoff;