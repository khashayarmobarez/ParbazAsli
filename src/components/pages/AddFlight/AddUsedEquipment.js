import React from 'react';

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
import { updateWing, updateHarness, updateParachute } from '../../../Utilities/ReduxToolKit/features/AddFlight/addFlightSlice';


const AddUsedEquipment = () => {

    // redux
    const {wing, harness, parachute} = useSelector(selectAddFlight)
    const dispatch = useDispatch()

    // react router dom
    const navigate= useNavigate('')


    const handleSelectSetWing = (event) => {
        dispatch(updateWing(event.target.value));
      };

    const handleSelectSetHarness = (event) => {
        dispatch(updateHarness(event.target.value));
      };

    const handleSelectSetParachute = (event) => {
        dispatch(updateParachute(event.target.value));
        console.log({wing,harness,parachute})
      };



    // Determine if the next button should be disabled
    

    const handleNextPageButton = () => {

        if(wing && harness && parachute) {
            navigate('/addFlight')
        } else {

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
                    <DropdownInput name={'بال'} options={flightHourOptionData} selectedOption={wing} handleSelectChange={handleSelectSetWing} />

                    <DropdownInput name={'هارنس'} options={flightHourOptionData} selectedOption={harness} handleSelectChange={handleSelectSetHarness} />

                    <DropdownInput name={'چتر'} options={flightHourOptionData} selectedOption={parachute} handleSelectChange={handleSelectSetParachute} />
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