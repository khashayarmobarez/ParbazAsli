import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';

// styles
import { Box, CircularProgress } from '@mui/material';

// assets
import ArrowButton from '../../components/icons/ArrowButton'
import WingIcon from '../../components/icons/WingIcon'
import HarnessIcon from '../../components/icons/HarnessIcon'
import ParachuteIcon from '../../components/icons/ParachuteIcon'

// queries
import { useUserEquipmentsForDropDown } from '../../Utilities/Services/equipmentQueries';

// redux
import { useSelector, useDispatch } from 'react-redux';
import { selectAddFlight, updatePassengerHarness } from '../../Utilities/ReduxToolKit/features/AddFlight/addFlightSlice';
import { updateWing, updateHarness, updateParachute } from '../../Utilities/ReduxToolKit/features/AddFlight/addFlightSlice';

// components
import DropdownInput from '../../components/inputs/DropDownInput';
import DropDownLine from '../../components/reuseable/DropDownLine';

// context
import { useTranslation } from '../../Utilities/context/TranslationContext';


const AddUsedEquipment = () => {

    // language and direction
    const dir = Cookies.get('dir') || 'ltr';
    const { t } = useTranslation();

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const appTheme = Cookies.get('themeApplied') || 'dark';

    const [submitted, setSubmitted] = useState(false);

    // redux
    const {wing, harness, parachute, passengerHarness,
    flightType, wingType, activityType} = useSelector(selectAddFlight)
    
    const isForFlight = activityType === 'flight'
    
    // user equipments data
    const { data: userParachuteData, isLoading:userParachuteLoading, error:userParachuteError } = useUserEquipmentsForDropDown(1)
    const { data: userWingsData, isLoading:userWingsLoading, error:userWingsError } = useUserEquipmentsForDropDown(2, wingType)
    const { data: userHarnessData, isLoading:userHarnessLoading, error:userHarnessError } = useUserEquipmentsForDropDown(3)


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
        if(!flightType) {
            navigate('/addFlight/AddFlightType')
            toast(t('addFlight.addUsedEquipment.notifs.completePreviousPages'), {
                type: 'error', // Specify the type of toast (e.g., 'success', 'error', 'info', 'warning')
                position: 'top-right', // Set the position (e.g., 'top-left', 'bottom-right')
                autoClose: 3000,
                theme: appTheme,
                style: { width: "350px" }
              });
        }
    }, [ flightType , navigate])



    const handleSelectSetWing = (selectedOption) => {
        dispatch(updateWing(selectedOption));
    };

    const handleSelectSetHarness = (selectedOption) => {
        if(selectedOption === passengerHarness) {
            toast(t('addFlight.addUsedEquipment.notifs.wingCannotMatchPassengerHarness'), {
                type: 'error', // Specify the type of toast (e.g., 'success', 'error', 'info', 'warning')
                position: 'top-right', // Set the position (e.g., 'top-left', 'bottom-right')
                autoClose: 3000,
                theme: appTheme,
                style: { width: "350px" }
                });
            return;
        }
        dispatch(updateHarness(selectedOption));
    };

    const handleSelectSetPassengerHarness = (selectedOption) => {
        if(selectedOption === harness) {
            toast(t('addFlight.addUsedEquipment.notifs.passengerHarnessCannotMatchWing'), {
                type: 'error', // Specify the type of toast (e.g., 'success', 'error', 'info', 'warning')
                position: 'top-right', // Set the position (e.g., 'top-left', 'bottom-right')
                autoClose: 3000,
                theme: appTheme,
                style: { width: "350px" }
                });
            return;
        }

        dispatch(updatePassengerHarness(selectedOption));
    };

    const handleSelectSetParachute = (selectedOption) => {
        dispatch(updateParachute(selectedOption));
    };



    // Determine if the next button should be disabled
    

    const handleNextPageButton = () => {

        setSubmitted(true);

        if(wing.id && harness.id && (!isForFlight || (parachute.id && (flightType === 'Tandem' ? passengerHarness.id : true)))) {
            isForFlight ?
                navigate('/addFlight/AddSituation')
                :
                navigate('/addFlight/AddGroundHandlingSituation')
        } else {
            toast(t('addFlight.addUsedEquipment.notifs.completeInfo'), {
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

                {
                    isForFlight ?
                        <>
                            {/* line and circle of adding flight level */}
                            <div className='w-full flex flex-col gap-y-3 justify-center items-center'>

                                <div className='flex items-center justify-center w-[100%]'>
                                    
                                    <div className='rounded-full w-3 h-3' style={{background:'var(--text-accent)'}}></div>

                                    <div className='rounded-full w-[20%] h-[2px]' style={{background:'var(--text-accent)'}}></div>

                                    <div className='border-2 rounded-full w-5 h-5  border-textAccent flex items-center justify-center'>
                                        <div className='rounded-full w-3 h-3 mr-[0.3px]' style={{background:'var(--text-accent)'}}></div>
                                    </div>

                                    <div className='rounded-full w-[20%] h-[2px]' style={{background:'var(--icon-disable)'}}></div>

                                    <div className='rounded-full w-3 h-3' style={{background:'var(--icon-disable)'}}></div>

                                    <div className='rounded-full w-[20%] h-[2px]' style={{background:'var(--icon-disable)'}}></div>

                                    <div className='rounded-full w-3 h-3' style={{background:'var(--icon-disable)'}}></div>

                                    <div className='rounded-full w-[20%] h-[2px]' style={{background:'var(--icon-disable)'}}></div>

                                    <div className='rounded-full w-3 h-3' style={{background:'var(--icon-disable)'}}></div>

                                </div>

                                <div className='flex items-center justify-between w-full text-xs md:w-[90%]'>

                                    <p className='' style={{color:'var(--text-accent)'}}>{t('addFlight.IGC')}</p>

                                    <p className='' style={{color:'var(--text-accent)'}}>{t('addFlight.flightDevice')}</p>

                                    <p className='' style={{color:'var(--icon-disable)'}}>{t('addFlight.flightConditions')}</p>

                                    <p className='' style={{color:'var(--icon-disable)'}}>{t('addFlight.takeoff')}</p>

                                    <p className='' style={{color:'var(--icon-disable)'}}>{t('addFlight.landing')}</p>

                                </div>
                                
                            </div>
                        </>
                        :
                        <DropDownLine
                            hasNoArrow={true}
                            title={t('addFlight.addUsedEquipment.groundTrainingEquipment')}
                        />
                }


                <form className='w-full flex flex-col items-center justify-center gap-y-4'>

                    {
                        (userParachuteLoading || userWingsLoading || userHarnessLoading) &&
                        <Box sx={{ display: 'flex', width:'100%' , justifyContent:'center', marginTop:'4rem' }}>
                            <CircularProgress /> 
                        </Box>
                    }

                    {
                        userParachuteError && userWingsError && userHarnessError &&
                        <p style={{color:'var(--text-error)'}}>{t('addFlight.addUsedEquipment.generalError')}</p>
                    }

                    {
                        userWingsData && userWingsData.data === null && !userWingsLoading &&
                        <p>
                            {t('addFlight.addUsedEquipment.noWingsRegistered')}
                        </p>
                    }

                    {
                        userParachuteData && userParachuteData.data === null && !userParachuteLoading &&
                        <p>
                            {t('addFlight.addUsedEquipment.noParachuteRegistered')}
                        </p>
                    }

                    {
                        userHarnessData && userHarnessData.data === null && !userHarnessLoading &&
                        <p>
                            {t('addFlight.addUsedEquipment.noHarnessRegistered')}
                        </p>
                    }

                    {
                        userWingsData && userHarnessData && userParachuteData && 
                        <>
                            <DropdownInput 
                            id={'ddi3'} 
                            icon={<WingIcon customColor = {!wing && submitted && 'var(--text-error)'}/>} 
                            name={t('addFlight.addUsedEquipment.wing')} 
                            options={userWingsData.data} 
                            selectedOption={wing} 
                            handleSelectChange={handleSelectSetWing} 
                            IsEmptyAfterSubmit={submitted && !wing} 
                            isSubmitted={submitted}
                            ErrorCondition={!wing}
                            ErrorText={t('addFlight.addUsedEquipment.wingSelectionRequired')}
                            />
                                

                            <DropdownInput 
                            id={'ddi4'} 
                            icon={<HarnessIcon customColor = {!harness && submitted && 'var(--text-error)'}/>} 
                            name={t('addFlight.addUsedEquipment.harness')} 
                            options={userHarnessData.data} 
                            selectedOption={harness} 
                            handleSelectChange={handleSelectSetHarness} 
                            IsEmptyAfterSubmit={submitted && !harness} 
                            isSubmitted={submitted}
                            ErrorCondition={!harness}
                            ErrorText={t('addFlight.addUsedEquipment.harnessRequired')}
                            />

                            {
                                flightType === 'Tandem' &&
                                <DropdownInput 
                                id={'ddi5'} 
                                icon={<HarnessIcon customColor = {!passengerHarness && submitted && 'var(--text-error)'}/>} 
                                name={t('addFlight.addUsedEquipment.passengerHarness')} 
                                options={userHarnessData.data} 
                                selectedOption={passengerHarness} 
                                handleSelectChange={handleSelectSetPassengerHarness} 
                                IsEmptyAfterSubmit={submitted && !passengerHarness} 
                                isSubmitted={submitted}
                                ErrorCondition={!passengerHarness}
                                ErrorText={t('addFlight.addUsedEquipment.passengerHarnessRequired')}
                                />
                            }
                            
                            <DropdownInput 
                            id={'ddi6'} 
                            icon={<ParachuteIcon anotherColor = {!parachute && submitted && 'var(--text-error)'}/>} 
                            name={isForFlight ? t('addFlight.addUsedEquipment.parachute') : t('addFlight.addUsedEquipment.optionalParachute')} 
                            options={userParachuteData.data} 
                            selectedOption={parachute}
                            handleSelectChange={handleSelectSetParachute}
                            IsEmptyAfterSubmit={submitted && !parachute && isForFlight} 
                            isSubmitted={submitted}
                            ErrorCondition={!parachute && isForFlight}
                            ErrorText={t('addFlight.addUsedEquipment.parachuteRequired')}
                            />
                        </>
                    }
                </form>

                <div className='flex justify-between items-center w-full'>

                    <div onClick={() => navigate(-1)} className='flex items-center justify-between'>
                        <span className={`w-8 h-8 flex justify-center items-center ml-2
                        ${dir === 'ltr' ? 'mr-2' : 'ml-2' }`}>
                            <ArrowButton isRight={dir !== 'ltr' && true} />
                        </span>
                        <p className=' '>{t('addFlight.addUsedEquipment.previousButton')}</p>
                    </div>

                    <div onClick={handleNextPageButton} className='flex items-center justify-between'>
                        <p className=''>{t('addFlight.addUsedEquipment.nextButton')}</p>
                        <span className={`w-8 h-8 flex justify-center items-center
                            ${dir === 'ltr' ? 'ml-2' : 'mr-2' }`}>
                            <ArrowButton isRight={dir === 'ltr' && true}  />
                        </span>
                    </div>
                
                </div>

            </div>
        </>
    );
};

export default AddUsedEquipment;