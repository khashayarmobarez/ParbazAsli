import React from 'react';

import { toast } from 'react-toastify';

// components
import DropdownInput from '../../inputs/DropDownInput';

// provider
import { flightHourOptionData } from '../../../Utilities/Providers/dropdownInputOptions';
import { useNavigate } from 'react-router-dom';

// assets
import RightArrowButton from '../../../assets/icons/Right Arrow Button.svg'

// redux
import { useSelector, useDispatch } from 'react-redux';
import { selectAddFlight } from '../../../Utilities/ReduxToolKit/features/AddFlight/addFlightSlice';
import { updateTakeoffTime, updateTakeOfftype, updateTakeoffWindSpeed, updateTakeOffWindDirection, } from '../../../Utilities/ReduxToolKit/features/AddFlight/addFlightSlice';


const AddTakeoff = () => {

    // redux
    const { takeoffTime, takeoffType, takeoffWindSpeed, takeoffwindDirection } = useSelector(selectAddFlight)
    const dispatch = useDispatch()

    // react router dom
    const navigate= useNavigate('')


    const handleSelectSetTakeoffTime = (event) => {
        dispatch(updateTakeoffTime(event.target.value));
      };

    const handleSelectSetTakeoffType = (event) => {
        dispatch(updateTakeOfftype(event.target.value));
      };

    const handleSelectSetTakeoffWindspeed = (event) => {
        dispatch(updateTakeoffWindSpeed(event.target.value));
      };

    const handleSelectSetTakeoffwindDirection = (event) => {
        dispatch(updateTakeOffWindDirection(event.target.value));
      };



    // Determine if the next button should be disabled
    

    const handleNextPageButton = () => {

        if(takeoffTime && takeoffType && takeoffWindSpeed && takeoffwindDirection) {
            navigate('/addFlight/AddLanding')
        } else {
            toast('لطفا اطلاعات را کامل وارد کنید', {
                type: 'success', // Specify the type of toast (e.g., 'success', 'error', 'info', 'warning')
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

                        <p className='' style={{color:'var(--yellow-text)'}}>وسیله پرواز</p>

                    </div>
                    
                </div>


                <div id='title' className='flex justify-between items-center w-full mt-2' style={{color:'var(--yellow-text'}}  >
                    <h3 className=' text-base '>Takeoff</h3>
                    <div className='h-[1px] w-9/12 mt-2' style={{background: 'var(--yellow-text)' }}></div>
                </div>

                <form className='w-full flex flex-col items-center justify-center gap-y-6'>
                    <DropdownInput name={'زمان'} options={flightHourOptionData} selectedOption={takeoffTime} handleSelectChange={handleSelectSetTakeoffTime} />

                    <DropdownInput name={'شیوه'} options={flightHourOptionData} selectedOption={takeoffType} handleSelectChange={handleSelectSetTakeoffType} />

                    <DropdownInput name={'سرعت باد'} options={flightHourOptionData} selectedOption={takeoffWindSpeed} handleSelectChange={handleSelectSetTakeoffWindspeed} />
                    
                    <DropdownInput name={'جهت باد'} options={flightHourOptionData} selectedOption={takeoffwindDirection} handleSelectChange={handleSelectSetTakeoffwindDirection} />
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