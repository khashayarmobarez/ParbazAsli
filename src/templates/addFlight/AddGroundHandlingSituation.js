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


const AddGroundHandlingSituation = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const appTheme = Cookies.get('themeApplied') || 'dark';

    const [submitted, setSubmitted] = useState(false);

    // redux
    const {wing, harness, parachute, passengerHarness,
    flightType, wingType} = useSelector(selectAddFlight)

    console.log(wingType)
    
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
            toast('لطفا اطلاعات صفحات قبل را اول کامل کنید', {
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
            toast('هارنس شما نمی تواند با هارنس مسافر یکی باشد', {
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
            toast('هارنس مسافر نمی تواند با هارنس شما یکی باشد', {
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

        if(wing.id && harness.id && parachute.id && (flightType === 'Tandem' ? passengerHarness.id : true)) {
            navigate('/addFlight/AddSituation')
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
                
                <DropDownLine
                hasNoArrow={true}
                title='موقعیت و شرایط تمرین زمینی'
                />

                <form className='w-full flex flex-col items-center justify-center gap-y-4'>

                    {
                        (userParachuteLoading || userWingsLoading || userHarnessLoading) &&
                        <Box sx={{ display: 'flex', width:'100%' , justifyContent:'center', marginTop:'4rem'}} >
                            <CircularProgress />
                        </Box >
                    }

                    {
                        userParachuteError && userWingsError && userHarnessError &&
                            <p style={{color:'var(--text-error)'}}>مشکلی پیش امده دوباره تلاش کنید</p>
                    }

                    {
                        userWingsData && userHarnessData && userParachuteData && 
                        <>
                            <DropdownInput 
                                id={'ddi3'} 
                                icon={<WingIcon customColor = {!wing && submitted && 'var(--text-error)'}/>} 
                                name={'بال'} 
                                options={userWingsData.data} 
                                selectedOption={wing} 
                                handleSelectChange={handleSelectSetWing} 
                                IsEmptyAfterSubmit={submitted && !wing} 
                                isSubmitted={submitted}
                                ErrorCondition={!wing}
                                ErrorText={'انتخاب بال الزامی است'}
                            />
                                

                            <DropdownInput 
                                id={'ddi4'} 
                                icon={<HarnessIcon customColor = {!harness && submitted && 'var(--text-error)'}/>} 
                                name={'هارنس'} 
                                options={userHarnessData.data} 
                                selectedOption={harness} 
                                handleSelectChange={handleSelectSetHarness} 
                                IsEmptyAfterSubmit={submitted && !harness} 
                                isSubmitted={submitted}
                                ErrorCondition={!harness}
                                ErrorText={'انتخاب هارنس الزامی است'}
                            />

                            {
                                flightType === 'Tandem' &&
                                <DropdownInput 
                                    id={'ddi5'} 
                                    icon={<HarnessIcon customColor = {!passengerHarness && submitted && 'var(--text-error)'}/>} 
                                    name={'هارنس مسافر'} 
                                    options={userHarnessData.data} 
                                    selectedOption={passengerHarness} 
                                    handleSelectChange={handleSelectSetPassengerHarness} 
                                    IsEmptyAfterSubmit={submitted && !passengerHarness} 
                                    isSubmitted={submitted}
                                    ErrorCondition={!passengerHarness}
                                    ErrorText={'انتخاب هارنس مسافر الزامی است'}
                                />
                            }
                            
                            <DropdownInput 
                                id={'ddi6'} 
                                icon={<ParachuteIcon anotherColor = {!parachute && submitted && 'var(--text-error)'}/>} 
                                name={'چتر کمکی'} 
                                options={userParachuteData.data} 
                                selectedOption={parachute}
                                handleSelectChange={handleSelectSetParachute}
                                IsEmptyAfterSubmit={submitted && !parachute} 
                                isSubmitted={submitted}
                                ErrorCondition={!parachute}
                                ErrorText={'انتخاب چتر کمکی الزامی است'}
                            />
                        </>
                    }
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

export default AddGroundHandlingSituation;