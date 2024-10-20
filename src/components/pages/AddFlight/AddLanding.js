import React, { useEffect, useState } from 'react';

// styles
import ButtonStyles from '../../../styles/Buttons/ButtonsBox.module.css'

// provider
import { useNavigate } from 'react-router-dom';

// assets
import RightArrowButton from '../../../assets/icons/Right Arrow Button.svg'
import windIcon from '../../../assets/icons/windIcon.svg'
import windDirectionCock from '../../../assets/icons/windDirectionCock.svg'
import PhoneIcon from '../../../components/icons/PhoneIcon'
import ColorTagsIcon from '../../../components/icons/ColorTagsIcon'

// react-toastify
import { toast } from 'react-toastify';

// provider
import { windDirectionOptions } from '../../../Utilities/Providers/dropdownInputOptions';

// react-query
import { useAddCourseFlight, useAddSoloFlight, useAddTandemFlight, useLandingTypes } from '../../../Utilities/Services/addFlightQueries';

// redux
import { useSelector, useDispatch } from 'react-redux';
import { selectAddFlight } from '../../../Utilities/ReduxToolKit/features/AddFlight/addFlightSlice';
import { updateLandingTime, updateLandingWindSpeed, updateLandingWindDirection, updatePassengerPhoneNumber, updateDescription, updateLandingType } from '../../../Utilities/ReduxToolKit/features/AddFlight/addFlightSlice';

// mui
import { CircularProgress } from '@mui/material';

// components
import DropdownInput from '../../inputs/DropDownInput';
import TextInput from '../../inputs/textInput';
import SubmitForm from '../../reuseable/SubmitForm';
import TimeInput from '../../inputs/TimeInput';
import NumberInput from '../../inputs/NumberInput';
import DescriptionInput from '../../inputs/DescriptionInput';

const AddLanding = () => {

    const dispatch = useDispatch()
    const navigate= useNavigate('')

    // states, submit pop up control
    const [showPopup, setShowPopup] = useState(false); 

    const [submitted, setSubmitted] = useState(false);

    const { data: landingTypesData , isLoading: landngTypesLoading} = useLandingTypes();

    const { mutate: mutateCourseFlight , isLoading: courseLoading} = useAddCourseFlight();
    const { mutate: mutateSoloFlight , isLoading: SoloLoading} = useAddSoloFlight();
    const { mutate: mutateTandemFlight , isLoading: TandemLoading} = useAddTandemFlight();

    // redux
    const { landingTime, landingWindSpeed, landingWindDirection , passengerPhoneNumber
    ,takeOffWindUnit , wing, harness, parachute, takeoffType , takeoffWindSpeed, takeoffwindDirection , passengerHarness , country, city, sight, clouds, takeoffTime, flightType, courseId, description, landingType
    } = useSelector(selectAddFlight)


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
        if(!wing.id || !harness.id || !parachute.id || !country.id || !city.id || !sight.id || !clouds.id || !flightType || !takeoffTime) {
            navigate('/addFlight/AddFlightType')
            toast('لطفا اطلاعات صفحات قبل را اول کامل کنید', {
                type: 'error', // Specify the type of toast (e.g., 'success', 'error', 'info', 'warning')
                position: 'top-right', // Set the position (e.g., 'top-left', 'bottom-right')
                autoClose: 3000,
                theme: 'dark',
                style: { width: "350px" }
              });
        }
    }, [ wing, harness, parachute, country, city , sight , clouds , flightType , takeoffTime, navigate])

    useEffect(() => {
        if(landingTypesData) {console.log(landingTypesData)}
    },[landingTypesData])


    const handleLandingTimeChange = (newTime) => {
        dispatch(updateLandingTime(newTime));
       };

    const handleSetLandingWindspeedChange = (event) => {
        dispatch(updateLandingWindSpeed(event.target.value));
      };

    const handleSelectSetLandingType = (selectedOption) => {
        dispatch(updateLandingType(selectedOption));
      };

    const handleSelectSetLandingWindDirection = (selectedOption) => {
        dispatch(updateLandingWindDirection(selectedOption));
      };

    const handlePassengerPhoneNum = (event) => {
        dispatch(updatePassengerPhoneNumber(event.target.value));
      };

    // handle Description input state
    const handleDescription = (event) => {
        dispatch(updateDescription(event.target.value))
    };




    



    
    // Event handler for form submission
    const handleSubmit = (event) => {

        setSubmitted(true);

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
            } else {
                toast('لطفا اطلاعات را کامل وارد کنید', {
                    type: 'error', // Specify the type of toast (e.g., 'success', 'error', 'info', 'warning')
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
        
        const formData = new FormData();

        if( wing && harness && parachute && sight && clouds && takeoffType && takeoffWindSpeed && takeoffwindDirection && landingWindSpeed && landingWindDirection && landingTime && takeoffTime) {
    
            // turn the startSelectedTime and end selected time into HH:mm format
            const landingHour = landingTime.$d.getHours();
            const landingMinute = landingTime.$d.getMinutes();
            const formatedLandingTime = `${landingHour}:${landingMinute}`;

            const takeoffHour = takeoffTime.$d.getHours();
            const takeoffMinute = takeoffTime.$d.getMinutes();
            const formatedTakeOffTime = `${takeoffHour}:${takeoffMinute}`;

            
            // Convert wind speeds from knots to km/h if necessary
            const convertToKmh = (speed) => Math.round(speed * 1.852);
            const takeoffWindSpeedInKmh = takeOffWindUnit.name === 'knots' ? convertToKmh(takeoffWindSpeed) : takeoffWindSpeed;
            const landingWindSpeedInKmh = takeOffWindUnit.name === 'knots' ? convertToKmh(landingWindSpeed) : landingWindSpeed;


            formData.append('wingId', wing.id);
            formData.append('harnessId', harness.id);
            formData.append('parachuteId', parachute.id);
            formData.append('siteId', sight.id);
            formData.append('cloudCoverTypeId', clouds.id);
            formData.append('takeoffTime',formatedTakeOffTime);
            formData.append('takeoffTypeId', takeoffType.id);
            formData.append('takeoffWindSpeedInKmh', takeoffWindSpeedInKmh);
            formData.append('takeoffWindDirection', takeoffwindDirection.id);
            formData.append('landingTime', formatedLandingTime);
            formData.append('landingWindSpeedInKmh', landingWindSpeedInKmh);
            formData.append('landingWindDirection', landingWindDirection.id);
            formData.append('landingTypeId', landingType.id);
            if(flightType === 'Solo') {
                formData.append('description', description);
            }
            if(flightType === 'Course') {
                formData.append('userCourseId', courseId);
            }
            if(flightType === 'Tandem') {
                formData.append('passengerPhoneNumber', passengerPhoneNumber);
                formData.append('passengerHarnessId', passengerHarness.id);
                formData.append('description', description);
            }

        } else {
            toast('لطفا اطلاعات را کامل وارد کنید', {
                type: 'error', // Specify the type of toast 
                position: 'top-right', // Set the position (e.g., 'top-left', 'bottom-right')
                autoClose: 3000,
                theme: 'dark',
                style: { width: "350px" }
            });
            setShowPopup(false);
            return;
        }
        


        if(flightType === 'Solo') {

                mutateSoloFlight(formData,
                    {
                        onSuccess: () => {
                            toast('!پرواز شما ثبت شد', {
                                type: 'success', // Specify the type of toast (e.g., 'success', 'error', 'info', 'warning')
                                position: 'top-right', // Set the position (e.g., 'top-left', 'bottom-right')
                                autoClose: 3000,
                                theme: 'dark',
                                style: { width: "350px" }
                            });
                            setShowPopup(false);
                            navigate('/flightHistory')
                        },
                        onError: (error) => {
                            let errorMessage = 'خطایی رخ داده است';
                            if (error.response && error.response.data && error.response.data.ErrorMessages) {
                                errorMessage = error.response.data.ErrorMessages[0].ErrorMessage;
                            }
                            toast(errorMessage, {
                                type: 'error', // Specify the type of toast (e.g., 'success', 'error', 'info', 'warning')
                                position: 'top-right', // Set the position (e.g., 'top-left', 'bottom-right')
                                autoClose: 3000,
                                theme: 'dark',
                                style: { width: "350px" }
                            });
                            setShowPopup(false);
                        }
                    }
                );

            } 
        else if (flightType === 'Course') 
            {
                
                mutateCourseFlight(formData,
                    {
                        onSuccess: () => {
                            toast('!اطلاعات پرواز شما ثبت شد در انتظار تایید مربی باشید', {
                                type: 'success', // Specify the type of toast (e.g., 'success', 'error', 'info', 'warning')
                                position: 'top-right', // Set the position (e.g., 'top-left', 'bottom-right')
                                autoClose: 3000,
                                theme: 'dark',
                                style: { width: "350px" }
                            });
                            setShowPopup(false);
                            navigate('/flightHistory')
                        },
                        onError: (error) => {
                            let errorMessage = 'خطایی رخ داده است';
                            if (error.response && error.response.data && error.response.data.ErrorMessages) {
                                errorMessage = error.response.data.ErrorMessages[0].ErrorMessage;
                            }
                            toast(errorMessage, {
                                type: 'error', // Specify the type of toast (e.g., 'success', 'error', 'info', 'warning')
                                position: 'top-right', // Set the position (e.g., 'top-left', 'bottom-right')
                                autoClose: 3000,
                                theme: 'dark',
                                style: { width: "350px" }
                            });
                            setShowPopup(false);
                        }
                    }
                );

            } 
        else if (flightType === 'Tandem') 
            {

                mutateTandemFlight(formData,
                    {
                        onSuccess: () => {
                            toast('!پرواز شما ثبت شد', {
                                type: 'success', // Specify the type of toast (e.g., 'success', 'error', 'info', 'warning')
                                position: 'top-right', // Set the position (e.g., 'top-left', 'bottom-right')
                                autoClose: 3000,
                                theme: 'dark',
                                style: { width: "350px" }
                            });
                            setShowPopup(false);
                            navigate('/flightHistory')
                        },
                        onError: (error) => {
                            let errorMessage = 'خطایی رخ داده است';
                            if (error.response && error.response.data && error.response.data.ErrorMessages) {
                                errorMessage = error.response.data.ErrorMessages[0].ErrorMessage;
                            }
                            toast(errorMessage, {
                                type: 'error', // Specify the type of toast (e.g., 'success', 'error', 'info', 'warning')
                                position: 'top-right', // Set the position (e.g., 'top-left', 'bottom-right')
                                autoClose: 3000,
                                theme: 'dark',
                                style: { width: "350px" }
                            });
                            setShowPopup(false);
                        }
                    }
                );

            }

    }



    
    return (
        <>
            {
            (SoloLoading || TandemLoading || courseLoading) &&
                <div className='fixed w-[100svh] h-[100svh] z-[110] backdrop-blur-sm flex flex-col justify-center items-center gap-y-2'>
                    <CircularProgress sx={{ color:'var(--text-accent) '}} /> 
                    <p>در حال ثبت اطلاعات</p>
                </div>
            }

            <div className='flex flex-col justify-center items-center w-[90%] gap-y-7'>


                {/* line and circle of adding flight level */}
                <div className='w-full flex flex-col gap-y-3 justify-center items-center'>

                    <div className='flex items-center justify-center w-full'>
                        
                        <div className='rounded-full w-3 h-3' style={{background:'var(--text-accent)'}}></div>

                        <div className='rounded-full w-[25%] h-[2px]' style={{background:'var(--text-accent)'}}></div>

                        <div className='rounded-full w-3 h-3' style={{background:'var(--text-accent)'}}></div>

                        <div className='rounded-full w-[25%] h-[2px]' style={{background:'var(--text-accent)'}}></div>

                        <div className='rounded-full w-3 h-3' style={{background:'var(--text-accent)'}}></div>

                        <div className='rounded-full w-[25%] h-[2px]' style={{background:'var(--text-accent)'}}></div>

                        <div className='rounded-full w-3 h-3' style={{background:'var(--text-accent)'}}></div>

                    </div>

                    <div className='flex items-center justify-between w-[97%]'>

                        <p className='' style={{color:'var(--text-accent)'}}>Landing</p>

                        <p className='' style={{color:'var(--text-accent)'}}>Takeoff</p>

                        <p className='' style={{color:'var(--text-accent)'}}>شرایط پرواز</p>

                        <p className='' style={{color:'var(--text-accent)'}}>وسیله پروازی</p>

                    </div>
                    
                </div>


                <div id='title' className='flex justify-between items-center w-full mt-2' style={{color:'var(--text-accent'}}  >
                    <h3 className=' text-base '>Landing</h3>
                    <div className='h-[1px] w-9/12 mt-2' style={{background: 'var(--text-accent)' }}></div>
                </div>


                <form className='w-full flex flex-col items-center justify-center gap-y-6'>

                    <div className='w-full flex flex-col gap-y-1'>
                        <p className='text-xs text-start self-start'>زمان land (ورودی ساعت ۲۴ ساعته می باشد)</p>
                        <TimeInput
                            value={landingTime}
                            onChange={handleLandingTimeChange}
                            placeholder="Select time"
                        />
                    </div>

                    {
                        landingTypesData &&   
                        <DropdownInput 
                            name={'شیوه'} 
                            icon={<ColorTagsIcon/>} 
                            options={landingTypesData.data} 
                            selectedOption={landingType} 
                            handleSelectChange={handleSelectSetLandingType} 
                            IsEmptyAfterSubmit={submitted && !landingType}
                        />
                    }

                    <DropdownInput 
                        name={'جهت باد'} 
                        icon={windDirectionCock} 
                        options={windDirectionOptions} 
                        selectedOption={landingWindDirection} 
                        handleSelectChange={handleSelectSetLandingWindDirection} 
                        IsEmptyAfterSubmit={submitted && !landingWindDirection}
                    />
                    
                    <NumberInput
                        icon={windIcon}
                        value={landingWindSpeed}
                        onChange={handleSetLandingWindspeedChange}
                        placeholder={`سرعت باد به ${takeOffWindUnit && takeOffWindUnit.name}`}
                        IsEmptyAfterSubmit={submitted && !landingWindSpeed}
                    />

                    {flightType === 'Tandem' && 
                        <TextInput 
                            icon={<PhoneIcon/>}
                            value={passengerPhoneNumber} 
                            onChange={handlePassengerPhoneNum} 
                            placeholder='درج شماره تماس مسافر' 
                            IsEmptyAfterSubmit={submitted && !passengerPhoneNumber}
                        />
                    }

                    {/* description input */}
                    {
                        (flightType === 'Tandem' ||  flightType === 'Solo') &&
                        <div className='w-full flex flex-col gap-y-2'>
                            <h1 className=' self-start'>توضیحات و مانورها</h1>
                            <DescriptionInput
                                value={description}
                                onChange={handleDescription}
                                placeholder='توضیحات پرواز را اینجا بنویسید ...'
                            />
                        </div>
                    }

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
                    showPopup={showPopup} setShowPopup={setShowPopup} loading={TandemLoading || SoloLoading || courseLoading} handleSubmit={handleSubmit} handlePost={() => handlePost()} />
                </div>
                

            </div>                                                                                                                                                                                                                                                                                           <p className=' absolute -z-10 text-[#000000]/0'>developed by khashayar mobarez</p>
        </>
    );
};

export default AddLanding;