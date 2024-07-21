import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// styles
import { Box, CircularProgress } from '@mui/material';

// assets
import RightArrowButton from '../../../assets/icons/Right Arrow Button.svg'

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

    // user equipments data
    const { data: userParachuteData, loading:userParachuteLoading, error:userParachuteError } = useUserEquipments(1,false)
    const { data: userWingsData, loading:userWingsLoading, error:userWingsError } = useUserEquipments(2,false)
    const { data: userHarnessData, loading:userHarnessLoading, error:userHarnessError } = useUserEquipments(3,false)


    // redux
    const {wing, harness, parachute, passengerHarness,
    flightType} = useSelector(selectAddFlight)


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
        dispatch(updateHarness(selectedOption));
      };

    const handleSelectSetPassengerHarness = (selectedOption) => {
        dispatch(updatePassengerHarness(selectedOption));
      };

    const handleSelectSetParachute = (selectedOption) => {
        dispatch(updateParachute(selectedOption));
      };



    // Determine if the next button should be disabled
    

    const handleNextPageButton = () => {

        if(wing.id && harness.id && parachute.id) {
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
                        
                        <div className='rounded-full w-3 h-3' style={{background:'var(--soft-white)'}}></div>

                        <div className='rounded-full w-[25%] h-[2px]' style={{background:'var(--soft-white)'}}></div>

                        <div className='rounded-full w-3 h-3' style={{background:'var(--soft-white)'}}></div>

                        <div className='rounded-full w-[25%] h-[2px]' style={{background:'var(--soft-white)'}}></div>

                        <div className='rounded-full w-3 h-3' style={{background:'var(--soft-white)'}}></div>

                        <div className='rounded-full w-[25%] h-[2px]' style={{background:'var(--soft-white)'}}></div>

                        <div className='rounded-full w-3 h-3' style={{background:'var(--yellow-text)'}}></div>

                    </div>

                    <div className='flex items-center justify-between w-[97%]'>

                        <p className='' style={{color:'var(--soft-white)'}}>Landing</p>

                        <p className='' style={{color:'var(--soft-white)'}}>Takeoff</p>

                        <p className='' style={{color:'var(--soft-white)'}}>شرایط پرواز</p>

                        <p className='' style={{color:'var(--yellow-text)'}}>وسیله پرواز</p>

                    </div>
                    
                </div>


                <div id='title' className='flex justify-between items-center w-full mt-2' style={{color:'var(--yellow-text'}}  >
                    <h3 className=' text-base '>مشخصات وسیله پروازی</h3>
                    <div className='h-[1px] w-6/12 mt-2' style={{background: 'var(--yellow-text)' }}></div>
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
                        <p style={{color:'var(--red-text)'}}>مشکلی پیش امده دوباره تلاش کنید</p>
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
                            <DropdownInputForEquipment name={'بال'} options={userWingsData.data} selectedOption={wing} handleSelectChange={handleSelectSetWing} />

                            <DropdownInputForEquipment name={'هارنس'} options={userHarnessData.data} selectedOption={harness} handleSelectChange={handleSelectSetHarness} />

                            {
                                flightType === 'Tandem' &&
                                <DropdownInputForEquipment name={'هارنس مسافر'} options={userHarnessData.data} selectedOption={passengerHarness} handleSelectChange={handleSelectSetPassengerHarness} />
                            }
                            
                            <DropdownInputForEquipment name={'چتر'} options={userParachuteData.data} selectedOption={parachute} handleSelectChange={handleSelectSetParachute} />
                        </>
                    }
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

export default AddUsedEquipment;