import React from 'react';
import PageTitle from '../components/reuseable/PageTitle';

// style
import boxStyles from '../styles/Boxes/DataBox.module.css'
import { Outlet } from 'react-router-dom';

// redux
import { useSelector } from 'react-redux';
import { selectAddFlight } from '../Utilities/ReduxToolKit/features/AddFlight/addFlightSlice';

const AddFlight = ({userRole}) => {

    const { flightCount, flightDuration, courseLevel, clubName, coachName } = useSelector(selectAddFlight)

    const today = new Date();
    const formattedDate = `${today.getFullYear()}/${today.getMonth() + 1}/${today.getDate()}`;

    return (
        <div className='flex flex-col items-center pt-14 pb-24'>
            <div className=' w-full md:w-[75%] flex flex-col items-center gap-y-8 md:gap-y-10'>

            <PageTitle title={'ثبت پرواز'} navigateTo={-1} />

            <form className={` ${boxStyles.classDetails} w-[90%] rounded-xl flex flex-col py-10 gap-y-8`}>

                    <div className=' grid grid-cols-12 gap-x-4 gap-y-4 w-full px-4 md:grid-cols-14 md:gap-y-0'>

                        <div className='flex w-full flex-col items-start gap-y-1 col-span-4 md:col-span-1'>
                            <p className=' text-xs pr-2'>تعداد پرواز</p>
                            <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl text-sm`}  id='data' >
                                <p>{flightCount && flightCount}</p>
                            </div>
                        </div>
                        

                        <div className='flex flex-col items-start gap-y-1 col-span-4 md:col-span-2'>
                            <p className=' text-xs pr-2'>تاریخ پرواز</p>
                            <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-2 w-full h-12 rounded-xl text-sm`}  id='data' >
                                <p className=' text-end'>{formattedDate}</p>
                            </div>
                        </div>

                        <div className='flex flex-col items-start gap-y-1 col-span-4 md:col-span-1'>
                            <p className=' text-xs pr-2'>زمان پرواز</p>
                            <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl text-sm`}  id='data' >
                                <p>{ flightDuration ? flightDuration : '0' } min</p>
                            </div>
                        </div> 

                        {
                            courseLevel && 
                            <div className='flex flex-col items-start gap-y-1 col-span-6 md:col-span-2'>
                                <p className=' text-xs pr-2'>مقطع گواهینامه</p>
                                <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl text-sm`}  id='data' >
                                    <p>{courseLevel}</p> 
                                </div>
                            </div>
                        }
                        
                        {
                            clubName &&
                            <div className='flex flex-col items-start gap-y-1 col-span-6 md:col-span-2'>
                                <p className=' text-xs pr-2'>نام باشگاه</p>
                                <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl text-xs`}  id='data' >
                                    <p>{clubName}</p>
                                </div>
                            </div>
                        }

                        {
                            coachName &&
                            <div className='flex flex-col items-start gap-y-1 col-span-12 md:col-span-14'>
                                <p className=' text-xs pr-2'>نام مربی</p>
                                <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl text-sm`}  id='data' >
                                    <p>{coachName}</p>
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