import React, { useEffect } from 'react';
import dayjs from 'dayjs';
import jalaali from 'jalaali-js';

// components
import PageTitle from '../../components/reuseable/PageTitle';

// style
import boxStyles from '../../styles/DataBox.module.css'
import { Outlet } from 'react-router-dom';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { selectAddFlight, updateFlightDuration } from '../../Utilities/ReduxToolKit/features/AddFlight/addFlightSlice';

// context
import { useTranslation } from '../../Utilities/context/TranslationContext';

const AddFlight = () => {

    // language
    const { t } = useTranslation();

    const dispatch = useDispatch()

    const { flightCount, flightDuration, clubName, coachName , takeoffTime, landingTime, flightType, courseName, activityType, groundHandlingCount } = useSelector(selectAddFlight)

    const today = new Date();
    const formattedDate = `${today.getFullYear()}/${today.getMonth() + 1}/${today.getDate()}`;


    // calculate the flight duration
    useEffect(() => {
        if(takeoffTime && landingTime) {

            // turn the startSelectedTime and end selected time into HH:mm format
            const landingHour = landingTime.split(':')[0];
            const landingMinute = landingTime.split(':')[1];

            const takeoffHour = takeoffTime.split(':')[0];
            const takeoffMinute = takeoffTime.split(':')[1];

            const landing = dayjs().hour(landingHour).minute(landingMinute);
            const takeoff = dayjs().hour(takeoffHour).minute(takeoffMinute);

            const flightDurationInMinutes = landing.diff(takeoff, 'minute');

            dispatch(updateFlightDuration(flightDurationInMinutes));

        }
    },[takeoffTime, landingTime, dispatch])


    function gregorianToShamsi(dateString) {
        if (!dateString) return '';
    
        // Persian numerals map
        const persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    
        // Function to convert regular numbers to Persian numerals
        const toPersianNumber = (num) => num.toString().split('').map(digit => persianNumbers[digit]).join('');
    
        // Split the date and convert to numbers
        const [year, month, day] = dateString.split('/').map(Number);
        
        // Convert to Shamsi (Jalali) date
        const { jy, jm, jd } = jalaali.toJalaali(year, month, day);
    
        // Convert the Jalali date to Persian numerals
        const persianDay = toPersianNumber(jd);
        const persianMonth = toPersianNumber(jm);
        const persianYear = toPersianNumber(jy);
    
        // Return the Persian date in dd/mm/yyyy format
        return `${persianYear}/${persianMonth}/${persianDay}`;
    }

    const shamsiFlightData = formattedDate ? gregorianToShamsi(formattedDate) : '';
    


    return (
        <div className='flex flex-col items-center pt-12 pb-4'>
            <div className=' w-full md:w-[75%] flex flex-col items-center gap-y-8 md:gap-y-10 lg:w-[55%]'>

            <PageTitle 
            title={
            activityType === 'flight' 
                ? t('addFlight.addFlight')
                : activityType === 'groundHandling' 
                ? t('addFlight.addGroundHandling')
                : t('addFlight.default')
            }
            navigateTo={-1}
            />

            <form className={` ${boxStyles.classDetails} w-[90%] rounded-xl flex flex-col gap-y-8`}>

                    <div className=' grid grid-cols-12 gap-4 w-full p-4 md:grid-cols-12 md:gap-y-4'>

                        <div className='flex w-full flex-col items-start gap-y-2 col-span-4 md:col-span-4'>
                            <p className=' text-xs '>{activityType === 'flight' ? t('addFlight.addFlightType.flight') : t('addFlight.addFlightType.groundHandling')}</p>
                            <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl text-sm`}  id='data' >
                                <p>{activityType === 'flight' ? flightCount : groundHandlingCount}</p>
                            </div>
                        </div>
                        

                        <div className='flex flex-col items-start gap-y-2 col-span-4 md:col-span-4'>
                            <p className=' text-xs '>{t('addFlight.flightDate')}</p>
                            <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-2 w-full h-12 rounded-xl text-sm`}  id='data' >
                                <p className=' text-end'>{ shamsiFlightData}</p>
                            </div>
                        </div>

                        <div className='flex flex-col items-start gap-y-2 col-span-4 md:col-span-4'>
                            <p className=' text-xs '>{t('addFlight.flightTime')}</p>
                            <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl text-sm`}  id='data' >
                                <p>{ flightDuration ? flightDuration : '0' } min</p>
                            </div>
                        </div> 

                        {
                            coachName && flightType === 'Course' &&
                            <div className='flex flex-col items-start gap-y-2 col-span-12 md:col-span-12'>
                                <p className=' text-xs '>{t('addFlight.coachName')}</p>
                                <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl text-sm`}  id='data' >
                                    <p>{coachName}</p>
                                </div>
                            </div>
                        }

                        {
                            courseName && 
                            <div className='flex flex-col items-start gap-y-2 col-span-6 md:col-span-6'>
                                <p className=' text-xs '>{t('addFlight.courseName')}</p>
                                <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl text-sm`}  id='data' >
                                    <p>{courseName}</p> 
                                </div>
                            </div>
                        }
                        
                        {
                            clubName &&
                            <div className='flex flex-col items-start gap-y-2 col-span-6 md:col-span-6'>
                                <p className=' text-xs '>{t('addFlight.clubName')}</p>
                                <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl text-xs`}  id='data' >
                                    <p>{clubName}</p>
                                </div>
                            </div>
                        }

                        {
                            flightType && flightType !== 'Course' &&
                            <div className='flex flex-col items-start gap-y-2 col-span-12 md:col-span-14'>
                                <p className=' text-xs '>{t('addFlight.flightType')}</p>
                                <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl text-sm`}  id='data' >
                                    <p>{flightType === 'Tandem' && t('addFlight.tandem')}</p>
                                    <p>{flightType === 'Solo' && t('addFlight.solo')}</p>
                                </div>
                            </div>
                        }

                        
                    </div>


                </form>

                <Outlet />
          
            </div>

        </div>
    );
};

export default AddFlight;