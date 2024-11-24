import React, { useEffect } from 'react';
import dayjs from 'dayjs';
import jalaali from 'jalaali-js';

// components
import PageTitle from '../components/reuseable/PageTitle';

// style
import boxStyles from '../styles/Boxes/DataBox.module.css'
import { Outlet } from 'react-router-dom';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { selectAddFlight, updateFlightDuration } from '../Utilities/ReduxToolKit/features/AddFlight/addFlightSlice';

const AddFlight = () => {

    const dispatch = useDispatch()

    const { flightCount, flightDuration, clubName, coachName , takeoffTime, landingTime, flightType, courseName } = useSelector(selectAddFlight)

    const today = new Date();
    const formattedDate = `${today.getFullYear()}/${today.getMonth() + 1}/${today.getDate()}`;

    // calculate the flight duration
    useEffect(() => {
        if(takeoffTime && landingTime) {

            // turn the startSelectedTime and end selected time into HH:mm format
            const landingHour = landingTime.$d.getHours();
            const landingMinute = landingTime.$d.getMinutes();

            const takeoffHour = takeoffTime.$d.getHours();
            const takeoffMinute = takeoffTime.$d.getMinutes();

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
        <div className='flex flex-col items-center pt-14 pb-8'>
            <div className=' w-full md:w-[75%] flex flex-col items-center gap-y-8 md:gap-y-10'>

            <PageTitle title={'ثبت پرواز'} navigateTo={-1} />

            <form className={` ${boxStyles.classDetails} w-[90%] rounded-xl flex flex-col py-10 gap-y-8 md:py-8`}>

                    <div className=' grid grid-cols-12 gap-x-4 gap-y-4 w-full px-4 md:grid-cols-12 md:gap-y-4'>

                        <div className='flex w-full flex-col items-start gap-y-1 col-span-4 md:col-span-4'>
                            <p className=' text-xs pr-2'>پرواز</p>
                            <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl text-sm`}  id='data' >
                                <p>{flightCount && flightCount}</p>
                            </div>
                        </div>
                        

                        <div className='flex flex-col items-start gap-y-1 col-span-4 md:col-span-4'>
                            <p className=' text-xs pr-2'>تاریخ پرواز</p>
                            <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-2 w-full h-12 rounded-xl text-sm`}  id='data' >
                                <p className=' text-end'>{ shamsiFlightData}</p>
                            </div>
                        </div>

                        <div className='flex flex-col items-start gap-y-1 col-span-4 md:col-span-4'>
                            <p className=' text-xs pr-2'>زمان پرواز</p>
                            <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl text-sm`}  id='data' >
                                <p>{ flightDuration ? flightDuration : '0' } min</p>
                            </div>
                        </div> 

                        {
                            coachName && flightType === 'Course' &&
                            <div className='flex flex-col items-start gap-y-1 col-span-12 md:col-span-12'>
                                <p className=' text-xs pr-2'>نام مربی</p>
                                <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl text-sm`}  id='data' >
                                    <p>{coachName}</p>
                                </div>
                            </div>
                        }

                        {
                            courseName && 
                            <div className='flex flex-col items-start gap-y-1 col-span-6 md:col-span-6'>
                                <p className=' text-xs pr-2'>نام دوره</p>
                                <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl text-sm`}  id='data' >
                                    <p>{courseName}</p> 
                                </div>
                            </div>
                        }
                        
                        {
                            clubName &&
                            <div className='flex flex-col items-start gap-y-1 col-span-6 md:col-span-6'>
                                <p className=' text-xs pr-2'>نام باشگاه</p>
                                <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl text-xs`}  id='data' >
                                    <p>{clubName}</p>
                                </div>
                            </div>
                        }

                        {
                            flightType && flightType !== 'Course' &&
                            <div className='flex flex-col items-start gap-y-1 col-span-12 md:col-span-14'>
                                <p className=' text-xs pr-2'>نوع پرواز</p>
                                <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl text-sm`}  id='data' >
                                    <p>{flightType === 'Tandem' && 'تندم'}</p>
                                    <p>{flightType === 'Solo' && 'سینگل'}</p>
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