import React, { useState } from 'react';

// styles
import boxStyles from '../../../styles/Boxes/DataBox.module.css'
import ButtonStyles from '../../../styles/Buttons/ButtonsBox.module.css'

// components
import DropdownInput from '../../inputs/DropDownInput';
import TextInput from '../../inputs/textInput';
import SubmitForm from '../../reuseable/SubmitForm';

// provider
import { flightHourOptionData } from '../../../Utilities/Providers/dropdownInputOptions';
import { useNavigate } from 'react-router-dom';

// assets
import RightArrowButton from '../../../assets/icons/Right Arrow Button.svg'

// react-toastify
import { toast } from 'react-toastify';

// redux
import { useSelector, useDispatch } from 'react-redux';
import { selectAddFlight } from '../../../Utilities/ReduxToolKit/features/AddFlight/addFlightSlice';
import { updateLandingTime, updateLandingWindSpeed, updateLandingWindDirection, updatePassengerPhoneNumber } from '../../../Utilities/ReduxToolKit/features/AddFlight/addFlightSlice';


const AddLanding = ({userRole}) => {

    // redux
    const { landingTime, landingWindSpeed, landingWindDirection, flightType , passengerPhoneNumber } = useSelector(selectAddFlight)
    const dispatch = useDispatch()

    // states, submit pop up control
    const [showPopup, setShowPopup] = useState(false); 
    

    // react router dom
    const navigate= useNavigate('')


    const handleSelectSetLandingTime = (event) => {
        dispatch(updateLandingTime(event.target.value));
      };

    const handleSelectSetLandingWindSpeed = (event) => {
        dispatch(updateLandingWindSpeed(event.target.value));
      };

    const handleSelectSetLandingWindDirection = (event) => {
        dispatch(updateLandingWindDirection(event.target.value));
      };

    const handlePassengerPhoneNum = (event) => {
        dispatch(updatePassengerPhoneNumber(event.target.value));
        console.log({passengerPhoneNumber, landingTime, landingWindDirection, landingWindSpeed})
      };



    
    // Event handler for form submission
    const handleSubmit = (event) => {
        if(flightType === 'tandem') {
            if(landingTime && landingWindSpeed && landingWindDirection && passengerPhoneNumber.length > 10) {
                event.preventDefault();
                setShowPopup(true);
                // Here you can handle form submission, such as sending data to a backend server

            } else {
                toast('لطفا اطلاعات را کامل وارد کنید', {
                    type: 'success', // Specify the type of toast (e.g., 'success', 'error', 'info', 'warning')
                    position: 'top-right', // Set the position (e.g., 'top-left', 'bottom-right')
                    autoClose: 3000,
                    theme: 'dark',
                    style: { width: "350px" }
                  });
            }
        } else {
            if(landingTime && landingWindSpeed && landingWindDirection) {
                event.preventDefault();
                setShowPopup(true);
                // Here you can handle form submission, such as sending data to a backend server
                
            } else {
                toast('لطفا اطلاعات را کامل وارد کنید', {
                    type: 'success', // Specify the type of toast (e.g., 'success', 'error', 'info', 'warning')
                    position: 'top-right', // Set the position (e.g., 'top-left', 'bottom-right')
                    autoClose: 3000,
                    theme: 'dark',
                    style: { width: "350px" }
                  });
            }
        }
        
    };

    // handling for sending data
    const handlePost = (event) => {
        if(userRole === 'coach') {
            toast('!پرواز شما ثبت شد', {
                type: 'success', // Specify the type of toast (e.g., 'success', 'error', 'info', 'warning')
                position: 'top-right', // Set the position (e.g., 'top-left', 'bottom-right')
                autoClose: 3000,
                theme: 'dark',
                style: { width: "350px" }
              });
              setShowPopup(false);
        } else if (userRole === 'student') {
            toast('اطلاعات پرواز شما ثبت شد در انتظار تایید مربی باشید', {
                type: 'success', // Specify the type of toast (e.g., 'success', 'error', 'info', 'warning')
                position: 'top-right', // Set the position (e.g., 'top-left', 'bottom-right')
                autoClose: 3000,
                theme: 'dark',
                style: { width: "350px" }
              });
              setShowPopup(false);
        }
    }



    
    return (
        <>
            <div className='flex flex-col justify-center items-center w-[90%] gap-y-7'>

                {/* line and circle of adding flight level */}
                <div className='w-full flex flex-col gap-y-3 justify-center items-center'>

                    <div className='flex items-center justify-center w-full'>
                        
                        <div className='rounded-full w-3 h-3' style={{background:'var(--yellow-text)'}}></div>

                        <div className='rounded-full w-[25%] h-[2px]' style={{background:'var(--yellow-text)'}}></div>

                        <div className='rounded-full w-3 h-3' style={{background:'var(--yellow-text)'}}></div>

                        <div className='rounded-full w-[25%] h-[2px]' style={{background:'var(--yellow-text)'}}></div>

                        <div className='rounded-full w-3 h-3' style={{background:'var(--yellow-text)'}}></div>

                        <div className='rounded-full w-[25%] h-[2px]' style={{background:'var(--yellow-text)'}}></div>

                        <div className='rounded-full w-3 h-3' style={{background:'var(--yellow-text)'}}></div>

                    </div>

                    <div className='flex items-center justify-between w-[97%]'>

                        <p className='' style={{color:'var(--yellow-text)'}}>Landing</p>

                        <p className='' style={{color:'var(--yellow-text)'}}>Takeoff</p>

                        <p className='' style={{color:'var(--yellow-text)'}}>شرایط پرواز</p>

                        <p className='' style={{color:'var(--yellow-text)'}}>وسیله پرواز</p>

                    </div>
                    
                </div>


                <div id='title' className='flex justify-between items-center w-full mt-2' style={{color:'var(--yellow-text'}}  >
                    <h3 className=' text-base '>Landing</h3>
                    <div className='h-[1px] w-9/12 mt-2' style={{background: 'var(--yellow-text)' }}></div>
                </div>

                <form className='w-full flex flex-col items-center justify-center gap-y-6'>

                    <DropdownInput name={'زمان'} options={flightHourOptionData} selectedOption={landingTime} handleSelectChange={handleSelectSetLandingTime} />

                    <DropdownInput name={'شیوه'} options={flightHourOptionData} selectedOption={landingWindSpeed} handleSelectChange={handleSelectSetLandingWindSpeed} />

                    <DropdownInput name={'سرعت باد'} options={flightHourOptionData} selectedOption={landingWindDirection} handleSelectChange={handleSelectSetLandingWindDirection} />

                    { userRole === 'coach' &&
                    <div  className={` ${boxStyles.containerChangeOwnership} w-full flex flex-col justify-around items-center px-4 py-5 space-y-5`}>

                        <p className=' text-start text-sm w-full' >در کادر زیر هر متنی را که دوست دارید تایپ کنید تا ما آن را برایتان نگه داریم و همیشه در دسترس شما قرار دهیم؛ از این طریق می‌توانید متن آزمایشی و متن تستی خودتان. </p>

                        <button onClick={() => navigate('/AddFlight/syllabuses')} type="reset"  className={`${ButtonStyles.normalButton} w-full `} >سیلابس‌ها</button>

                    </div>}

                    {flightType === 'tandem' && 
                    <TextInput value={passengerPhoneNumber} onChange={handlePassengerPhoneNum} placeholder='درج شماره تماس مسافر' />}

                </form>

                <div className='flex justify-between items-center w-full'>

                    <button type="submit" onClick={handleSubmit} className={`${ButtonStyles.addButton} w-36 `}>ثبت</button>

                    <div onClick={() => navigate(-1)} className='flex items-center justify-between'>
                        <p className='ml-2 '>قبلی</p>
                        <span className='w-10'><img alt='icon' className='w-full h-full  rotate-180' src={RightArrowButton}/></span>
                    </div>
                
                </div>

                <div className='w-full justify-center items-center'>
                    <SubmitForm text={"در صورت تایید کردن قابل ویرایش نمی‌باشد دقت کنید "}
                    showPopup={showPopup} setShowPopup={setShowPopup} handleSubmit={handleSubmit} handlePost={handlePost} />
                </div>
                

            </div>
        </>
    );
};

export default AddLanding;