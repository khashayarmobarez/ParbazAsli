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


const AddUsedEquipment = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const appTheme = Cookies.get('themeApplied') || 'dark';

    const [submitted, setSubmitted] = useState(false);

    // user equipments data
    const { data: userParachuteData, isLoading:userParachuteLoading, error:userParachuteError } = useUserEquipmentsForDropDown(1)
    const { data: userWingsData, isLoading:userWingsLoading, error:userWingsError } = useUserEquipmentsForDropDown(2)
    const { data: userHarnessData, isLoading:userHarnessLoading, error:userHarnessError } = useUserEquipmentsForDropDown(3)


    // redux
    const {wing, harness, parachute, passengerHarness,
    flightType, wingType} = useSelector(selectAddFlight)

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

                    <div className='flex items-center justify-between w-full text-xs'>

                        <p className='' style={{color:'var(--text-accent)'}}>IGC</p>

                        <p className='' style={{color:'var(--text-accent)'}}>وسیله پروازی</p>

                        <p className='' style={{color:'var(--icon-disable)'}}>شرایط پرواز</p>

                        <p className='' style={{color:'var(--icon-disable)'}}>Takeoff</p>

                        <p className='' style={{color:'var(--icon-disable)'}}>Landing</p>

                    </div>
                    
                </div>


                <form className='w-full flex flex-col items-center justify-center gap-y-4'>

                    {
                        (userParachuteLoading || userWingsLoading || userHarnessLoading) &&
                        <Box sx={{ display: 'flex', width:'100%' , justifyContent:'center', marginTop:'4rem' }}>
                            <CircularProgress /> 
                        </Box>
                    }

                    {
                        userParachuteError && userWingsError && userHarnessError &&
                        <p style={{color:'var(--text-error)'}}>مشکلی پیش امده دوباره تلاش کنید</p>
                    }

                    {
                        userWingsData && userWingsData.data === null && !userWingsLoading &&
                        <p>
                            شما وسیله پروازی ثبت نکرده اید 
                        </p>
                    }

                    {
                        userParachuteData && userParachuteData.data === null && !userParachuteLoading &&
                        <p>
                            شما چتر پروازی ثبت نکرده اید 
                        </p>
                    }

                    {
                        userHarnessData && userHarnessData.data === null && !userHarnessLoading &&
                        <p>
                            شما هارنسی ثبت نکرده اید 
                        </p>
                    }

                    {
                        userWingsData && userHarnessData && userParachuteData && 
                        <>
                            {   
                            wingType === 'Tandem' ?
                                <DropdownInput id={'ddi1'} icon={<WingIcon/>} name={'بال'} options={userWingsData.data.filter((wing) => wing.wingType === 'Tandem')} selectedOption={wing} handleSelectChange={handleSelectSetWing} IsEmptyAfterSubmit={submitted && !wing} />
                                :
                                wingType === 'Single' ?
                                <DropdownInput id={'ddi2'} icon={<WingIcon/>} name={'بال'} options={userWingsData.data.filter((wing) => wing.wingType === 'Single')} selectedOption={wing} handleSelectChange={handleSelectSetWing} IsEmptyAfterSubmit={submitted && !wing} />
                                :
                                <DropdownInput id={'ddi3'} icon={<WingIcon/>} name={'بال'} options={userWingsData.data} selectedOption={wing} handleSelectChange={handleSelectSetWing} IsEmptyAfterSubmit={submitted && !wing} />
                                
                            }

                            <DropdownInput id={'ddi4'} icon={<HarnessIcon/>} name={'هارنس'} options={userHarnessData.data} selectedOption={harness} handleSelectChange={handleSelectSetHarness} IsEmptyAfterSubmit={submitted && !harness} />

                            {
                                flightType === 'Tandem' &&
                                <DropdownInput id={'ddi5'} icon={<HarnessIcon/>} name={'هارنس مسافر'} options={userHarnessData.data} selectedOption={passengerHarness} handleSelectChange={handleSelectSetPassengerHarness} IsEmptyAfterSubmit={submitted && !passengerHarness} />
                            }
                            
                            <DropdownInput id={'ddi6'} icon={<ParachuteIcon/>} name={'چتر کمکی'} options={userParachuteData.data} selectedOption={parachute} handleSelectChange={handleSelectSetParachute} IsEmptyAfterSubmit={submitted && !parachute} />
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

export default AddUsedEquipment;