import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

// styles
import boxStyles from '../../../styles/Boxes/DataBox.module.css'
import ButtonStyles from '../../../styles/Buttons/ButtonsBox.module.css'

// queries
import { useAUserFlight } from '../../../Utilities/Services/flightHistoriesQueries';

// components
import PageTitle from '../../reuseable/PageTitle';
import DropDownLine from '../../reuseable/DropDownLine';

const FlightHistoryPage = () => {
    
    const { id } = useParams()

    const [DropDown, setDropDown] = useState('')
    
    const { data: fullFlightData, isLoading: fullFlightDataLoading } = useAUserFlight(id);

    // dropDown onClick
    const handleDropDownClick = (dropDown) => {
        setDropDown(DropDown === dropDown ? '' : dropDown)
    }
    
    return (
        <div className='w-full flex flex-col items-center py-14'>

            <PageTitle title={'جزئیات پرواز'} />

            <div className='w-[90%] md:w-[75%] flex flex-col justify-center items-center gap-y-0'>

                { fullFlightData &&
                        <div className='w-full flex flex-col items-center justify-center gap-y-2' >

                            <div className={` w-full rounded-xl flex flex-col py-10 gap-y-8`}>

                                <div className=' grid grid-cols-2 gap-x-4 gap-y-4 w-full px-4 text-sm'>

                                    {
                                    fullFlightData.data.status &&
                                        <div className='flex flex-col col-span-2 items-start gap-y-3'>
                                            <p className=' text-xs pr-2'>وضعیت پرواز</p>
                                            <div className= {`${boxStyles.classDetailsData} flex justify-center items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                                <p className=' text-xs pr-2 text-[var(--low-opacity-white)]'>وضعیت:&nbsp;</p>
                                                {
                                                    fullFlightData.data.status === 'Accepted' && 
                                                    <>
                                                        <p> تایید شده </p>
                                                    </>
                                                }
                                                {fullFlightData.data.status === 'Pending' &&
                                                    <>
                                                        <p> در انتظار تایید </p>
                                                    </>
                                                }
                                                {fullFlightData.data.status === 'Rejected' &&
                                                    <>
                                                        <p> رد شده </p>
                                                    </>
                                                }
                                            </div>
                                        </div>
                                    }

                                    {
                                    fullFlightData.data.coachName &&
                                        <div className='flex flex-col items-start gap-y-3'>
                                            <p className=' text-xs pr-2'>نام مربی</p>
                                            <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                                <p>{fullFlightData.data.coachName}</p>
                                            </div>
                                        </div>
                                    }

                                    { 
                                        fullFlightData.data.courseName &&
                                        <div className='flex flex-col items-start gap-y-3'>
                                            <p className=' text-xs pr-2'>نام دوره</p>
                                            <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                                <p>{fullFlightData.data.courseName}</p>
                                            </div>
                                        </div>
                                    }

                                    {
                                        fullFlightData.data.flightDurationInMinutes &&
                                            <div className='flex flex-col items-start gap-y-3'>
                                                <p className=' text-xs pr-2'>مدت زمان پرواز</p>
                                                <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                                    <p>{fullFlightData.data.flightDurationInMinutes}</p>
                                                </div>
                                            </div>
                                    }

                                    {
                                        fullFlightData.data.dateTime &&
                                            <div className='flex flex-col items-start gap-y-3'>
                                                <p className=' text-xs pr-2'>تاریخ پرواز</p>
                                                <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                                    <p>{fullFlightData.data.dateTime}</p>
                                                </div>
                                            </div>
                                    }

                                    <div className='w-full flex col-span-2'>
                                        <DropDownLine 
                                            className='col-span-2'
                                            onClickActivation={() => handleDropDownClick('Equipment')}
                                            title={'مشخصات وسیله پروازی'} 
                                            dropDown={DropDown} 
                                            isActive={DropDown === `Equipment`}  
                                        />
                                    </div>

                                    {
                                        DropDown === `Equipment` &&
                                        <>
                                            {
                                                fullFlightData.data.wing &&
                                                    <div className='flex flex-col items-start gap-y-3 col-span-2 mt-[-10px]'>
                                                        <p className=' text-xs pr-2'>بال</p>
                                                        <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                                            <p>{fullFlightData.data.wing}</p>
                                                        </div>
                                                    </div>
                                            }
        
                                            {
                                                fullFlightData.data.harness &&
                                                    <div className='flex flex-col items-start gap-y-3 col-span-2'>
                                                        <p className=' text-xs pr-2'>هارنس</p>
                                                        <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                                            <p>{fullFlightData.data.harness}</p>
                                                        </div>
                                                    </div>
                                            }
        
                                            {
                                                fullFlightData.data.parachute &&
                                                    <div className='flex flex-col items-start gap-y-3 col-span-2'>
                                                        <p className=' text-xs pr-2'>چتر</p>
                                                        <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                                            <p>{fullFlightData.data.parachute}</p>
                                                        </div>
                                                    </div>
                                            }
                                        </>
                                    }
                                    
                                    {
                                        fullFlightData.data.takeOffWindSpeedInKmh &&
                                        <div className='flex flex-col items-start gap-y-3'>
                                            <p className=' text-xs pr-2'>سرعت باد Takeoff</p>
                                            <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                                <p>{fullFlightData.data.takeOffWindSpeedInKmh}</p>
                                            </div>
                                        </div>
                                    }


                                    {
                                        fullFlightData.data.takeOffWindDirection &&
                                        <div className='flex flex-col items-start gap-y-3'>
                                            <p className=' text-xs pr-2'>جهت باد Takeoff</p>
                                            <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                                <p>{fullFlightData.data.takeOffWindDirection}</p>
                                            </div>
                                        </div>
                                    }

                                    {
                                        fullFlightData.data.takeOffType &&
                                        <div className='flex flex-col items-start gap-y-3'>
                                            <p className=' text-xs pr-2'>شیوه Takeoff</p>
                                            <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                                <p>{fullFlightData.data.takeOffType}</p>
                                            </div>
                                        </div>
                                    }

                                    {
                                        fullFlightData.data.takeOffTime &&
                                            <div className='flex flex-col items-start gap-y-3'>
                                                <p className=' text-xs pr-2'>زمان Takeoff</p>
                                                <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                                    <p>{fullFlightData.data.takeOffTime}</p>
                                                </div>
                                            </div>
                                    }

                                    {
                                        fullFlightData.data.landingWindSpeedInKmh &&
                                            <div className='flex flex-col items-start gap-y-3'>
                                                <p className=' text-xs pr-2'>سرعت باد Landing</p>
                                                <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                                    <p>{fullFlightData.data.landingWindSpeedInKmh}</p>
                                                </div>
                                            </div>
                                    }

                                    {
                                        fullFlightData.data.landingWindDirection &&
                                            <div className='flex flex-col items-start gap-y-3'>
                                                <p className=' text-xs pr-2'>جهت باد Landing</p>
                                                <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                                    <p>{fullFlightData.data.landingWindDirection}</p>
                                                </div>
                                            </div>
                                    }

                                    {
                                        fullFlightData.data.landingTime &&
                                            <div className='flex flex-col items-start gap-y-3'>
                                                <p className=' text-xs pr-2'>زمان Landing</p>
                                                <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                                    <p>{fullFlightData.data.landingTime}</p>
                                                </div>
                                            </div>
                                    }

                                    {
                                        fullFlightData.data.cloudCoverType &&
                                            <div className='flex flex-col items-start gap-y-3'>
                                                <p className=' text-xs pr-2'>نوع پوشش ابری</p>
                                                <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                                    <p>{fullFlightData.data.cloudCoverType}</p>
                                                </div>
                                            </div>
                                    }



                                </div>

                                {   
                                    fullFlightData.data.syllabi &&
                                    fullFlightData.data.syllabi.length > 0 &&
                                        <div className=' grid grid-cols-1 gap-x-4 gap-y-2 w-full px-4 text-sm'>
                                            <p className=' text-xs pr-2 text-right'>سر فصل های پرواز</p>
                                            {
                                                fullFlightData.data.syllabi.map((syllabus, index) => (
                                                <div key={index} className='flex flex-col items-start gap-y-3'>
                                                    <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                                        <p>{syllabus.description}</p>
                                                    </div>
                                                </div>
                                                ))
                                            }
                                        </div>
                                }

                                {/* 
                                <div className='w-full flex flex-col items-start gap-y-4 p-4'>
                                    <h1>توضیحات و مانورها</h1>
                                    <p className=' border border-[#EBEEF3] text-sm px-3 py-5 rounded-3xl text-start'>لورم ایپسوم در کادر زیر هر متنی را که دوست دارید تایپ کنید تا ما آن را برایتان نگه داریم و همیشه در  را تایپ کرده و در طرح‌هایتان از این متن استفاده کنید... تایپ کنید، به صورت خودکار ذخیره می‌شود.</p>
                                </div> */}


                            </div>

                            {fullFlightData.data.igcFile &&
                                <div className='w-full'>
                                    <button onClick={() => window.open(fullFlightData.data.igcFile.path, '_blank')} className={`${ButtonStyles.normalButton} text-sm`}>مشاهده IGC</button>
                                </div>
                            }

                        </div>

                    }
            </div>
        </div>
    );
};

export default FlightHistoryPage;