import React from 'react';

// components
import DropdownInput from '../../inputs/DropDownInput';

// provider
import { flightHourOptionData, flightTypeOptions } from '../../../Utilities/Providers/dropdownInputOptions';
import { useNavigate } from 'react-router-dom';

// assets
import RightArrowButton from '../../../assets/icons/Right Arrow Button.svg'

// reactToastify

import { toast } from 'react-toastify';

// redux
import { useSelector, useDispatch } from 'react-redux';
import { selectAddFlight } from '../../../Utilities/ReduxToolKit/features/AddFlight/addFlightSlice';
import { updateCity, updateSight,updateClouds, updateFlightType } from '../../../Utilities/ReduxToolKit/features/AddFlight/addFlightSlice';


const AddSituation = () => {

    // redux
    const { city, sight, clouds, flightType } = useSelector(selectAddFlight)
    const dispatch = useDispatch()

    // react router dom
    const navigate= useNavigate('')


    const handleSelectSetCity = (event) => {
        dispatch(updateCity(event.target.value));
      };

    const handleSelectSetSight = (event) => {
        dispatch(updateSight(event.target.value));
      };

    const handleSelectSetClouds = (event) => {
        dispatch(updateClouds(event.target.value));
      };

    const handleSelectSetFlightType = (event) => {
        dispatch(updateFlightType(event.target.value));
        console.log({city, sight, clouds, flightType})
      };



    // Determine if the next button should be disabled
    

    const handleNextPageButton = () => {

        if(city && sight && clouds && flightType) {
            navigate('/addFlight/addTakeoff')
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

                        <div className='rounded-full w-3 h-3' style={{background:'var(--soft-white)'}}></div>

                        <div className='rounded-full w-[25%] h-[2px]' style={{background:'var(--soft-white)'}}></div>

                        <div className='rounded-full w-3 h-3' style={{background:'var(--yellow-text)'}}></div>

                        <div className='rounded-full w-[25%] h-[2px]' style={{background:'var(--yellow-text)'}}></div>

                        <div className='rounded-full w-3 h-3' style={{background:'var(--yellow-text)'}}></div>

                    </div>

                    <div className='flex items-center justify-between w-[97%]'>

                        <p className='' style={{color:'var(--soft-white)'}}>Landing</p>

                        <p className='' style={{color:'var(--soft-white)'}}>Takeoff</p>

                        <p className='' style={{color:'var(--yellow-text)'}}>شرایط پرواز</p>

                        <p className='' style={{color:'var(--yellow-text)'}}>وسیله پرواز</p>

                    </div>
                    
                </div>


                <div id='title' className='flex justify-between items-center w-full mt-2' style={{color:'var(--yellow-text'}}  >
                    <h3 className=' text-base '>موقعیت و شرایط پرواز</h3>
                    <div className='h-[1px] w-6/12 mt-2' style={{background: 'var(--yellow-text)' }}></div>
                </div>

                <form className='w-full flex flex-col items-center justify-center gap-y-6'>
                    <DropdownInput name={'شهر'} options={flightHourOptionData} selectedOption={city} handleSelectChange={handleSelectSetCity} />

                    <DropdownInput name={'سایت'} options={flightHourOptionData} selectedOption={sight} handleSelectChange={handleSelectSetSight} />

                    <DropdownInput name={'نوع پوشش ابری'} options={flightHourOptionData} selectedOption={clouds} handleSelectChange={handleSelectSetClouds} />
                    
                    <DropdownInput name={'نوع پرواز'} options={flightTypeOptions} selectedOption={flightType} handleSelectChange={handleSelectSetFlightType} />
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

export default AddSituation;