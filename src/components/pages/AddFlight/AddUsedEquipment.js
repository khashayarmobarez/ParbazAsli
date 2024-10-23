import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// styles
import { Box, CircularProgress } from '@mui/material';

// assets
import ArrowButton from '../../../components/icons/ArrowButton'
import WingIcon from '../../../components/icons/WingIcon'
import HarnessIcon from '../../../components/icons/HarnessIcon'
import ParachuteIcon from '../../../components/icons/ParachuteIcon'

// queries
import { useUserEquipments } from '../../../Utilities/Services/equipmentQueries';

// redux
import { useSelector, useDispatch } from 'react-redux';
import { selectAddFlight, updatePassengerHarness } from '../../../Utilities/ReduxToolKit/features/AddFlight/addFlightSlice';
import { updateWing, updateHarness, updateParachute } from '../../../Utilities/ReduxToolKit/features/AddFlight/addFlightSlice';

// components
import DropdownInputForEquipment from './Components/DropDownInputForEquipment';


const AddUsedEquipment = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [submitted, setSubmitted] = useState(false);

    // user equipments data
    const { data: userParachuteData, isLoading:userParachuteLoading, error:userParachuteError } = useUserEquipments(1,false)
    const { data: userWingsData, isLoading:userWingsLoading, error:userWingsError } = useUserEquipments(2,false)
    const { data: userHarnessData, isLoading:userHarnessLoading, error:userHarnessError } = useUserEquipments(3,false)


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
                theme: 'dark',
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
                theme: 'dark',
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
                theme: 'dark',
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
                        
                        <div className='rounded-full w-3 h-3' style={{background:'var(--icon-disable)'}}></div>

                        <div className='rounded-full w-[25%] h-[2px]' style={{background:'var(--icon-disable)'}}></div>

                        <div className='rounded-full w-3 h-3' style={{background:'var(--icon-disable)'}}></div>

                        <div className='rounded-full w-[25%] h-[2px]' style={{background:'var(--icon-disable)'}}></div>

                        <div className='rounded-full w-3 h-3' style={{background:'var(--icon-disable)'}}></div>

                        <div className='rounded-full w-[25%] h-[2px]' style={{background:'var(--icon-disable)'}}></div>

                        <div className='rounded-full w-3 h-3' style={{background:'var(--text-accent)'}}></div>

                    </div>

                    <div className='flex items-center justify-between w-[97%]'>

                        <p className='' style={{color:'var(--icon-disable)'}}>Landing</p>

                        <p className='' style={{color:'var(--icon-disable)'}}>Takeoff</p>

                        <p className='' style={{color:'var(--icon-disable)'}}>شرایط پرواز</p>

                        <p className='' style={{color:'var(--text-accent)'}}>وسیله پروازی</p>

                    </div>
                    
                </div>


                <div id='title' className='flex justify-between items-center w-full mt-2' style={{color:'var(--text-accent'}}  >
                    <h3 className=' text-base '>مشخصات وسیله پروازی</h3>
                    <div className='h-[1px] w-6/12 mt-2' style={{background: 'var(--text-accent)' }}></div>
                </div>

                <form className='w-full flex flex-col items-center justify-center gap-y-6'>

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

                            {   wingType === 'Tandem' ?
                                <DropdownInputForEquipment icon={<WingIcon/>} name={'بال'} options={userWingsData.data.filter((wing) => wing.wingType === 'Tandem')} selectedOption={wing} handleSelectChange={handleSelectSetWing} IsEmptyAfterSubmit={submitted && !wing} />
                                :
                                wingType === 'Single' ?
                                <DropdownInputForEquipment icon={<WingIcon/>} name={'بال'} options={userWingsData.data.filter((wing) => wing.wingType === 'Single')} selectedOption={wing} handleSelectChange={handleSelectSetWing} IsEmptyAfterSubmit={submitted && !wing} />
                                :
                                <DropdownInputForEquipment icon={<WingIcon/>} name={'بال'} options={userWingsData.data} selectedOption={wing} handleSelectChange={handleSelectSetWing} IsEmptyAfterSubmit={submitted && !wing} />
                                
                            }

                            <DropdownInputForEquipment icon={<HarnessIcon/>} name={'هارنس'} options={userHarnessData.data} selectedOption={harness} handleSelectChange={handleSelectSetHarness} IsEmptyAfterSubmit={submitted && !harness} />

                            {
                                flightType === 'Tandem' &&
                                <DropdownInputForEquipment icon={<HarnessIcon/>} name={'هارنس مسافر'} options={userHarnessData.data} selectedOption={passengerHarness} handleSelectChange={handleSelectSetPassengerHarness} IsEmptyAfterSubmit={submitted && !passengerHarness} />
                            }
                            
                            <DropdownInputForEquipment icon={<ParachuteIcon/>} name={'چتر کمکی'} options={userParachuteData.data} selectedOption={parachute} handleSelectChange={handleSelectSetParachute} IsEmptyAfterSubmit={submitted && !parachute} />
                        </>
                    }
                </form>

                <div className='flex justify-between items-center w-full'>

                    <div onClick={handleNextPageButton} className='flex items-center justify-between'>
                        <span className='w-6 h-6 flex justify-center items-center'>
                            <ArrowButton isRight={true} />
                        </span>
                        <p className='mr-2'>بعدی</p>
                    </div>

                    <div onClick={() => navigate(-1)} className='flex items-center justify-between'>
                        <p className='ml-2 '>قبلی</p>
                        <span className='w-6 h-6 flex justify-center items-center rotate-180'>
                            <ArrowButton />
                        </span>
                    </div>
                
                </div>

            </div>
        </>
    );
};

export default AddUsedEquipment;