import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

// styles
import ButtonStyles from '../../styles/ButtonsBox.module.css'

// provider
import { useNavigate } from 'react-router-dom';

// assets
import ArrowButton from '../../components/icons/ArrowButton'
import WindIcon from '../../components/icons/WindIcon'
import WindDirectionCock from '../../components/icons/WindDirectionCock'
import PhoneIcon from '../../components/icons/PhoneIcon'
import ColorTagsIcon from '../../components/icons/ColorTagsIcon'

// react-toastify
import { toast } from 'react-toastify';

// provider
import { windDirectionOptions } from '../../Utilities/Providers/dropdownInputOptions';

// react-query
import { useAddCourseFlight, useAddCourseGroundHandling, useAddSoloFlight, useAddSoloGroundHandling, useAddTandemFlight, useAddTandemGroundHandling, useLandingTypes } from '../../Utilities/Services/addFlightQueries';

// redux
import { useSelector, useDispatch } from 'react-redux';
import { selectAddFlight } from '../../Utilities/ReduxToolKit/features/AddFlight/addFlightSlice';
import { updateLandingTime, updateLandingWindSpeed, updateLandingWindDirection, updatePassengerPhoneNumber, updateDescription, updateLandingType } from '../../Utilities/ReduxToolKit/features/AddFlight/addFlightSlice';

// mui
import { CircularProgress } from '@mui/material';

// components
import DropdownInput from '../../components/inputs/DropDownInput';
import TextInput from '../../components/inputs/textInput';
import SubmitForm from '../../components/reuseable/SubmitForm';
import TimeInput from '../../components/inputs/TimeInput';
import NumberInput from '../../components/inputs/NumberInput';
import DescriptionInput from '../../components/inputs/DescriptionInput';
import { PHONE_REGEX } from '../../Utilities/Providers/regexProvider';
import { TimePicker } from '../../components/inputs/TimePicker';
import DropDownLine from '../../components/reuseable/DropDownLine';
import SelectLocationNeshanMap from '../../modules/addFlight/SelectLocationNeshanMap';

const AddGroundHandlingSituation = () => {

    const dispatch = useDispatch()
    const navigate= useNavigate('')
    const appTheme = Cookies.get('themeApplied') || 'dark';

    // states, submit pop up control
    const [showPopup, setShowPopup] = useState(false); 

    const [submitted, setSubmitted] = useState(false);

    const { data: landingTypesData } = useLandingTypes();

    const { mutate: mutateCourseFlight , isLoading: courseLoading} = useAddCourseGroundHandling();
    const { mutate: mutateSoloFlight , isLoading: SoloLoading} = useAddSoloGroundHandling();
    const { mutate: mutateTandemFlight , isLoading: TandemLoading} = useAddTandemGroundHandling();

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
        if(!wing.id || !harness.id) {
            navigate('/addFlight/AddFlightType')
            toast('لطفا اطلاعات صفحات قبل را اول کامل کنید', {
                type: 'error', // Specify the type of toast (e.g., 'success', 'error', 'info', 'warning')
                position: 'top-right', // Set the position (e.g., 'top-left', 'bottom-right')
                autoClose: 3000,
                theme: appTheme,
                style: { width: "350px" }
              });
        }
    }, [ wing, harness, parachute, country, city , sight , clouds , flightType , takeoffTime, navigate, appTheme])



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
                    theme: appTheme,
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
                    theme: appTheme,
                    style: { width: "350px" }
                  });
            }
        }
        
    };
    

    // handling for sending data
    const handlePost = (event) => {
        
        const formData = new FormData();

        if( wing && harness && parachute && sight && clouds && takeoffType && takeoffWindSpeed && takeoffwindDirection && landingWindSpeed && landingWindDirection && landingTime && takeoffTime) {
            
            // Convert wind speeds from knots to km/h if necessary
            const convertToKmh = (speed) => Math.round(speed * 1.852);
            const takeoffWindSpeedInKmh = takeOffWindUnit.name === 'knots' ? convertToKmh(takeoffWindSpeed) : takeoffWindSpeed;
            const landingWindSpeedInKmh = takeOffWindUnit.name === 'knots' ? convertToKmh(landingWindSpeed) : landingWindSpeed;


            formData.append('wingId', wing.id);
            formData.append('harnessId', harness.id);
            formData.append('parachuteId', parachute.id);
            formData.append('siteId', sight.id);
            formData.append('cloudCoverTypeId', clouds.id);
            formData.append('takeoffTime',takeoffTime);
            formData.append('takeoffTypeId', takeoffType.id);
            formData.append('takeoffWindSpeedInKmh', takeoffWindSpeedInKmh);
            formData.append('takeoffWindDirection', takeoffwindDirection.id);
            formData.append('landingTime', landingTime);
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
                theme: appTheme,
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
                                theme: appTheme,
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
                                theme: appTheme,
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
                                theme: appTheme,
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
                                theme: appTheme,
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
                                theme: appTheme,
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
                                theme: appTheme,
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


                
                <DropDownLine
                    hasNoArrow={true}
                    title='موقعیت و شرایط تمرین زمینی'
                />


                <form className='w-full flex flex-col items-center justify-center gap-y-6'>

                    <div className='w-full flex flex-col gap-y-1'>

                        <SelectLocationNeshanMap />

                        <TimePicker
                        value={landingTime}
                        onChange={handleLandingTimeChange}
                        placeholder="زمان land"
                        />
                            {
                                !landingTime && submitted &&
                                <p className='text-xs text-start self-start text-textError'>زمان land الزامی می باشد</p>
                            }
                            {
                                landingTime && landingTime < takeoffTime && 
                                <p className='text-xs text-start self-start text-textError'>زمان land باید بعد از زمان take off ({takeoffTime}) باشد</p>
                            }
                            {
                                landingTime && landingTime > new Date().getHours() && (
                                    <p className='text-xs text-start self-start text-textError'>زمان land باید قبل از الان باشد</p>
                                )
                            }
                    </div>

                    {
                        landingTypesData &&   
                        <DropdownInput 
                            id={'ddi1'}
                            name={'شیوه'} 
                            icon={<ColorTagsIcon customColor = {!landingType && submitted && 'var(--text-error)'}/>} 
                            options={landingTypesData.data} 
                            selectedOption={landingType} 
                            handleSelectChange={handleSelectSetLandingType} 
                            IsEmptyAfterSubmit={submitted && !landingType}
                            isSubmitted={submitted}
                            ErrorCondition={!landingType}
                            ErrorText={'شیوه الزامی می باشد'}
                        />
                    }

                    <DropdownInput 
                        id={'ddi2'}
                        name={'جهت باد'} 
                        icon={<WindDirectionCock customColor = {!landingWindDirection && submitted && 'var(--text-error)'} />} 
                        options={windDirectionOptions} 
                        selectedOption={landingWindDirection} 
                        handleSelectChange={handleSelectSetLandingWindDirection} 
                        IsEmptyAfterSubmit={submitted && !landingWindDirection}
                        isSubmitted={submitted}
                        ErrorCondition={!landingWindDirection}
                        ErrorText={'جهت باد الزامی می باشد'}
                    />
                    
                    <NumberInput
                        id={'NI1'}
                        icon={<WindIcon customColor={(submitted && !landingWindSpeed) ? 'var(--text-error)' : ''} />}
                        value={landingWindSpeed}
                        onChange={handleSetLandingWindspeedChange}
                        placeholder={`سرعت باد به ${takeOffWindUnit && takeOffWindUnit.name}`}
                        IsEmptyAfterSubmit={submitted && !landingWindSpeed}
                        isSubmitted={submitted}
                        ErrorCondition={!landingWindSpeed}
                        ErrorText={'سرعت باد الزامی می باشد'}
                    />

                    {flightType === 'Tandem' && 
                        <TextInput 
                            id={'TI1'}
                            icon={<PhoneIcon customColor = {!passengerPhoneNumber && submitted && 'var(--text-error)'}/>}
                            value={passengerPhoneNumber} 
                            onChange={handlePassengerPhoneNum} 
                            placeholder='درج شماره تماس مسافر' 
                            IsEmptyAfterSubmit={submitted && !passengerPhoneNumber}
                            isSubmitted={submitted}
                            ErrorCondition={!passengerPhoneNumber}
                            ErrorText={'شماره تماس مسافر الزامی می باشد'}
                            ErrorCondition2={!PHONE_REGEX.test(passengerPhoneNumber)}
                            ErrorText2={'فرمت شماره تماس اشتباه میباشد'}
                        />
                    }

                    {/* description input */}
                    {
                        (flightType === 'Tandem' ||  flightType === 'Solo') &&
                        <div className='w-full flex flex-col gap-y-2'>
                            <DescriptionInput
                                value={description}
                                onChange={handleDescription}
                                placeholder='توضیحات و مانورها'
                            />
                        </div>
                    }

                </form>

                <div className='flex justify-between items-center w-full'>

                    <div onClick={() => navigate(-1)} className='flex items-center justify-between'>
                        <span className='w-8 h-8 flex justify-center items-center ml-2 '>
                            <ArrowButton isRight={true} />
                        </span>
                        <p className=''>قبلی</p>
                    </div>

                    <button type="submit" onClick={handleSubmit} className={`${ButtonStyles.addButton} w-32 `}>ثبت</button>
                
                </div>

                <div className='w-full justify-center items-center'>
                    <SubmitForm text={"در صورت تایید کردن قابل ویرایش نمی‌باشد دقت کنید "}
                    showPopup={showPopup} setShowPopup={setShowPopup} loading={TandemLoading || SoloLoading || courseLoading} handleSubmit={handleSubmit} handlePost={() => handlePost()} />
                </div>  
                
            </div>                                                                                                                                                                                                                                                                                           <p className=' absolute -z-10 text-[#000000]/0'>developed by khashayar mobarez</p>
        </>
    );
};

export default AddGroundHandlingSituation;