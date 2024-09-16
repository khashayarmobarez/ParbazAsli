import React, { useEffect, useState } from 'react';

import { toast } from 'react-toastify';

// components
import DropdownInput from '../../inputs/DropDownInput';

// provider
import { useNavigate } from 'react-router-dom';

// assets
import RightArrowButton from '../../../assets/icons/Right Arrow Button.svg'
import colorTagsIcon from '../../../assets/icons/colorTagsIcon.svg'
import windIcon from '../../../assets/icons/windIcon.svg'
import windDirectionCock from '../../../assets/icons/windDirectionCock.svg'

// provider
import { windDirectionOptions, windSpeedUnits } from '../../../Utilities/Providers/dropdownInputOptions';

// redux
import { useSelector, useDispatch } from 'react-redux';
import { selectAddFlight } from '../../../Utilities/ReduxToolKit/features/AddFlight/addFlightSlice';
import { updateTakeoffTime, updateTakeOfftype, updateTakeoffWindSpeed, updateTakeOffWindDirection, updateTakeOffWindUnit } from '../../../Utilities/ReduxToolKit/features/AddFlight/addFlightSlice';
import { useTakeoffTypes } from '../../../Utilities/Services/addFlightQueries';
import TimeInput from '../../inputs/TimeInput';
import NumberInput from '../../inputs/NumberInput';


const AddTakeoff = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [submitted, setSubmitted] = useState(false);

    // redux
    const { takeoffTime, takeoffType, takeoffWindSpeed, takeoffwindDirection, takeOffWindUnit,
    wing, harness, parachute, country, city, sight, clouds , flightType
    } = useSelector(selectAddFlight)

    // useTakeOffTypes
    const { data: takeOffTypesData, loading:takeOffTypesLoading, error:takeOffTypesError } = useTakeoffTypes()


    useEffect(() => {
        if(!wing.id || !harness.id || !parachute.id || !country.id || !city.id || !sight.id || !clouds.id || !flightType) {
            navigate('/addFlight/AddFlightType')
            toast('لطفا اطلاعات صفحات قبل را اول کامل کنید', {
                type: 'error', // Specify the type of toast (e.g., 'success', 'error', 'info', 'warning')
                position: 'top-right', // Set the position (e.g., 'top-left', 'bottom-right')
                autoClose: 3000,
                theme: 'dark',
                style: { width: "350px" }
              });
        }
    }, [ wing, harness, parachute, country, city , sight , clouds , flightType , navigate])


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

                        <div className='rounded-full w-3 h-3' style={{background:'var(--yellow-text)'}}></div>

                        <div className='rounded-full w-[25%] h-[2px]' style={{background:'var(--yellow-text)'}}></div>

                        <div className='rounded-full w-3 h-3' style={{background:'var(--yellow-text)'}}></div>

                        <div className='rounded-full w-[25%] h-[2px]' style={{background:'var(--yellow-text)'}}></div>

                        <div className='rounded-full w-3 h-3' style={{background:'var(--yellow-text)'}}></div>

                    </div>

                    <div className='flex items-center justify-between w-[97%]'>

                        <p className='' style={{color:'var(--soft-white)'}}>Landing</p>

                        <p className='' style={{color:'var(--yellow-text)'}}>Takeoff</p>

                        <p className='' style={{color:'var(--yellow-text)'}}>شرایط پرواز</p>

                        <p className='' style={{color:'var(--yellow-text)'}}>وسیله پروازی</p>

                    </div>
                    
                </div>


                <div id='title' className='flex justify-between items-center w-full mt-2' style={{color:'var(--yellow-text'}}  >
                    <h3 className=' text-base '>Takeoff</h3>
                    <div className='h-[1px] w-9/12 mt-2' style={{background: 'var(--yellow-text)' }}></div>
                </div>

                <form className='w-full flex flex-col items-center justify-center gap-y-6'>

                    <div className='w-full flex flex-col gap-y-1'>
                        <p className='text-xs text-start self-start'>زمان take off (ورودی ساعت ۲۴ ساعته می باشد)</p>
                        <TimeInput
                            value={takeoffTime}
                            onChange={handleTakeOffTimeChange}
                            placeholder="Select time"
                        />
                    </div>

                    {/* <DropdownInput name={'زمان'} options={flightHourOptionData} selectedOption={takeoffTime} handleSelectChange={handleSelectSetTakeoffTime} /> */}

                    {
                        takeOffTypesData &&
                        <DropdownInput name={'شیوه'} icon={colorTagsIcon} options={takeOffTypesData.data} selectedOption={takeoffType} handleSelectChange={handleSelectSetTakeoffType} IsEmptyAfterSubmit={submitted && !takeoffType} />
                    }

                    <DropdownInput name={'جهت باد'} icon={windDirectionCock} options={windDirectionOptions} selectedOption={takeoffwindDirection} handleSelectChange={handleSelectSetTakeoffwindDirection} IsEmptyAfterSubmit={submitted && !takeoffwindDirection} />
                    
                    {/* <DropdownInput name={'واحد سرعت باد'} options={windSpeedUnits} selectedOption={takeOffWindUnit} handleSelectChange={handleSelectSetWindUnit} /> */}

                    <NumberInput
                        icon={windIcon}
                        value={takeoffWindSpeed}
                        onChange={handleSetTakeoffWindspeedChange}
                        placeholder={`سرعت باد به ${takeOffWindUnit && takeOffWindUnit.name}`}
                        IsEmptyAfterSubmit={submitted && !takeoffWindSpeed}
                    />

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

export default AddTakeoff;