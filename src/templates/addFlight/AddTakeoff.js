import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

import { toast } from 'react-toastify';

// components
import DropdownInput from '../../elements/inputs/DropDownInput';

// provider
import { useNavigate } from 'react-router-dom';

// assets
import ArrowButton from '../../elements/icons/ArrowButton'
import ColorTagsIcon from '../../elements/icons/ColorTagsIcon'
import WindIcon from '../../elements/icons/WindIcon'
import WindDirectionCock from '../../elements/icons/WindDirectionCock'

// provider
import { windDirectionOptions, windDirectionOptionsEnglish, windSpeedUnits } from '../../Utilities/Providers/dropdownInputOptions';

// redux
import { useSelector, useDispatch } from 'react-redux';
import { selectAddFlight } from '../../Utilities/ReduxToolKit/features/AddFlight/addFlightSlice';
import { updateTakeoffTime, updateTakeOfftype, updateTakeoffWindSpeed, updateTakeOffWindDirection, updateTakeOffWindUnit } from '../../Utilities/ReduxToolKit/features/AddFlight/addFlightSlice';
import { useTakeoffTypes } from '../../Utilities/Services/addFlightQueries';
import NumberInput from '../../elements/inputs/NumberInput';
import { TimePicker } from '../../elements/inputs/TimePicker';

// context
import { useTranslation } from '../../Utilities/context/TranslationContext';


const AddTakeoff = () => {

    // language and direction
    const dir = Cookies.get('dir') || 'ltr';
    const { t } = useTranslation();

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
            toast(t('addFlight.addTakeOff.incompleteInfo'), {
                type: 'error', // Specify the type of toast (e.g., 'success', 'error', 'info', 'warning')
                position: 'top-center', // Set the position (e.g., 'top-left', 'bottom-right')
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
    // };

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
            toast(t('addFlight.addTakeOff.completeInfo'), {
                type: 'error', // Specify the type of toast (e.g., 'success', 'error', 'info', 'warning')
                position: 'top-center', // Set the position (e.g., 'top-left', 'bottom-right')
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

                    <div className='flex items-center justify-between w-full text-xs md:w-[90%]'>

                        <p className='' style={{color:'var(--text-accent)'}}>{t('addFlight.IGC')}</p>

                        <p className='' style={{color:'var(--text-accent)'}}>{t('addFlight.flightDevice')}</p>

                        <p className='' style={{color:'var(--text-accent)'}}>{t('addFlight.flightConditions')}</p>

                        <p className='' style={{color:'var(--text-accent)'}}>{t('addFlight.takeoff')}</p>

                        <p className='' style={{color:'var(--icon-disable)'}}>{t('addFlight.landing')}</p>

                    </div>
                    
                </div>

                <form className='w-full flex flex-col items-center justify-center gap-y-6'>

                    <div className='w-full flex flex-col gap-y-1'>
                        <TimePicker
                            value={takeoffTime}
                            onChange={handleTakeOffTimeChange}
                            placeholder={t('addFlight.addTakeOff.takeOffTimePlaceholder')}
                        />
                        {
                            !takeoffTime && submitted &&
                            <p className='text-xs text-start self-start text-textError'>{t('addFlight.addTakeOff.takeOffTimeRequired')}</p>
                        }
                        {
                            landingTime < takeoffTime && landingTime &&
                            <p className='text-xs text-start self-start text-textError'>{t('addFlight.addTakeOff.takeOffTimeBeforeLanding', { landingTime })}</p>
                        }
                        {
                            takeoffTime && takeoffTime > new Date().getHours() && (
                                <p className='text-xs text-start self-start text-textError'>{t('addFlight.addTakeOff.takeOffTimeBeforeNow')}</p>
                            )
                        }
                    </div>

                    {
                        takeOffTypesData &&
                        <DropdownInput
                            id={'ddi2'}
                            name={t('addFlight.addTakeOff.takeOffType')}
                            icon={<ColorTagsIcon customColor={!takeoffType && submitted && 'var(--text-error)'}/>}
                            options={takeOffTypesData.data}
                            selectedOption={takeoffType}
                            handleSelectChange={handleSelectSetTakeoffType}
                            IsEmptyAfterSubmit={submitted && !takeoffType}
                            isSubmitted={submitted}
                            ErrorCondition={!takeoffType}
                            ErrorText={t('addFlight.addTakeOff.takeOffTypeRequired')}
                        />
                    }

                    <DropdownInput
                        id={'ddi3'}
                        name={t('addFlight.addTakeOff.windDirection')}
                        icon={<WindDirectionCock customColor={!takeoffwindDirection && submitted && 'var(--text-error)'}/>}
                        options={dir === 'ltr' ? windDirectionOptionsEnglish : windDirectionOptions}
                        selectedOption={takeoffwindDirection}
                        handleSelectChange={handleSelectSetTakeoffwindDirection}
                        IsEmptyAfterSubmit={submitted && !takeoffwindDirection}
                        isSubmitted={submitted}
                        ErrorCondition={!takeoffwindDirection}
                        ErrorText={t('addFlight.addTakeOff.windDirectionRequired')}
                    />

                    <NumberInput
                        id={'NI1'}
                        icon={<WindIcon customColor={!takeoffWindSpeed && submitted && 'var(--text-error)'}/>}
                        value={takeoffWindSpeed}
                        onChange={handleSetTakeoffWindspeedChange}
                        placeholder={`${t('addFlight.addTakeOff.windSpeedPlaceholder')} ${takeOffWindUnit && takeOffWindUnit.name}`}
                        IsEmptyAfterSubmit={submitted && !takeoffWindSpeed}
                        isSubmitted={submitted}
                        ErrorCondition={!takeoffWindSpeed}
                        ErrorText={t('addFlight.addTakeOff.windSpeedRequired')}
                    />

                </form>

                <div className='flex justify-between items-center w-full'>

                    <div onClick={() => navigate(-1)} className='flex items-center justify-between'>
                        <span className={`w-8 h-8 flex justify-center items-center ${dir === 'ltr' ? 'mr-2' : 'ml-2' }`}>
                            <ArrowButton isRight={dir !== 'ltr' && true} />
                        </span>
                        <p className=''>{t('addFlight.addTakeOff.previous')}</p>
                    </div>

                    <div onClick={handleNextPageButton} className='flex items-center justify-between'>
                        <p className=''>{t('addFlight.addTakeOff.next')}</p>
                        <span className={`w-8 h-8 flex justify-center items-center ${dir === 'ltr' ? 'ml-2' : 'mr-2' }`}>
                            <ArrowButton isRight={dir === 'ltr' && true} />
                        </span>
                    </div>
                
                </div>

            </div>
        </>
    );
};

export default AddTakeoff;