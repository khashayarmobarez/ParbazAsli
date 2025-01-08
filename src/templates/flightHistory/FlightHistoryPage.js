import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

// styles
import boxStyles from '../../styles/Boxes/DataBox.module.css'
import ButtonStyles from '../../styles/Buttons/ButtonsBox.module.css'

// queries
import { usePracticalActivity } from '../../Utilities/Services/flightHistoriesQueries';

// components
import PageTitle from '../../components/reuseable/PageTitle';
import DropDownLine from '../../components/reuseable/DropDownLine';

const FlightHistoryPage = () => {
    
    const { id } = useParams()

    const [DropDownEquipment, setDropDownEquipment] = useState(true)
    const [DropDownSituation, setDropDownSituation] = useState(true)
    const [DropDownTakeoff, setDropDownTakeoff] = useState(true)
    const [DropDownLanding, setDropDownLanding] = useState(true)
    const [DropDownPassenger, setDropDownPassenger] = useState(true)
    
    const { data: fullPracticalActivityData } = usePracticalActivity(id);
    
    return (
        <div className='w-full flex flex-col items-center pt-14 '>

            <div className='w-full md:w-[75%] flex flex-col justify-center items-center gap-y-0 mb-[-10px] lg:gap-y-12 lg:w-[55%] '>

                <PageTitle title={'جزئیات پرواز'} />

                <div className='w-[90%] flex flex-col gap-y-6'>

                    { fullPracticalActivityData &&
                        <div className='w-full flex flex-col items-center justify-center gap-y-2' >

                            <div className={` w-full rounded-xl flex flex-col py-4 gap-y-8`}>

                                <div className=' grid grid-cols-6 gap-x-4 gap-y-4 w-full text-sm'>

                                    {
                                    fullPracticalActivityData.data.status &&
                                        <div className='flex flex-col col-span-6 items-start gap-y-3'>
                                            <div className= {`${boxStyles.classDetailsData} flex justify-center items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                                <p className=' text-xs pr-2 text-textDisabled'>وضعیت:&nbsp;</p>
                                                {
                                                    fullPracticalActivityData.data.status === 'Accepted' && 
                                                    <>
                                                        <p className='text-textAccent'> تایید شده </p>
                                                    </>
                                                }
                                                {fullPracticalActivityData.data.status === 'Pending' &&
                                                    <>
                                                        <p className='text-textWarning'> در انتظار تایید </p>
                                                    </>
                                                }
                                                {fullPracticalActivityData.data.status === 'Rejected' &&
                                                    <>
                                                        <p className='text-textError'> رد شده </p>
                                                    </>
                                                }
                                            </div>
                                        </div>
                                    }

                                    {
                                    fullPracticalActivityData.data.coachName &&
                                        <div className='flex flex-col items-start col-span-3 gap-y-3'>
                                            <p className=' text-xs pr-2'>نام مربی</p>
                                            <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                                <p>{fullPracticalActivityData.data.coachName}</p>
                                            </div>
                                        </div>
                                    }

                                    { 
                                        fullPracticalActivityData.data.courseName &&
                                        <div className='flex flex-col items-start col-span-3 gap-y-3'>
                                            <p className=' text-xs pr-2'>نام دوره</p>
                                            <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                                <p>{fullPracticalActivityData.data.courseName}</p>
                                            </div>
                                        </div>
                                    }

                                    {
                                        fullPracticalActivityData.data.index &&
                                            <div className='flex flex-col items-start col-span-1 gap-y-3'>
                                                <p className=' text-xs pr-2'> پرواز</p>
                                                <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-3 w-full h-12 rounded-xl`}  id='data' >
                                                    <p>{fullPracticalActivityData.data.index}</p>
                                                </div>
                                            </div>
                                    }

                                    {
                                        fullPracticalActivityData.data.dateTime &&
                                            <div className='flex flex-col items-start col-span-3 gap-y-3'>
                                                <p className=' text-xs pr-2'>تاریخ پرواز</p>
                                                <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                                    <p>{fullPracticalActivityData.data.dateTime}</p>
                                                </div>
                                            </div>
                                    }
                                    
                                    {
                                        fullPracticalActivityData.data.flightDurationInMinutes &&
                                            <div className='flex flex-col items-start col-span-2 gap-y-3'>
                                                <p className=' text-xs pr-2'>زمان پرواز</p>
                                                <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                                    <p>{fullPracticalActivityData.data.flightDurationInMinutes}min</p>
                                                </div>
                                            </div>
                                    }

                                    {
                                        fullPracticalActivityData.data.clubName &&
                                            <div className='flex flex-col items-start col-span-2 gap-y-3'>
                                                <p className=' text-xs pr-2'>نام باشگاه</p>
                                                <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                                    <p>{fullPracticalActivityData.data.clubName}</p>
                                                </div>
                                            </div>
                                    }

                                    {/* equipment */}
                                    <div className='w-full flex col-span-6'>
                                        <DropDownLine 
                                            onClickActivation={() => setDropDownEquipment(!DropDownEquipment)}
                                            title={'مشخصات وسیله پروازی'} 
                                            dropDown={DropDownEquipment} 
                                            isActive={DropDownEquipment}  
                                        />
                                    </div>

                                    {
                                        DropDownEquipment &&
                                        <>
                                            {
                                                fullPracticalActivityData.data.wing &&
                                                    <div className='flex flex-col items-start gap-y-3 col-span-6 mt-[-10px]'>
                                                        <p className=' text-xs pr-2'>بال</p>
                                                        <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                                            <p>{fullPracticalActivityData.data.wing}</p>
                                                        </div>
                                                    </div>
                                            }
        
                                            {
                                                fullPracticalActivityData.data.harness &&  
                                                    <div className='flex flex-col items-start gap-y-3 col-span-6'>
                                                        <p className=' text-xs pr-2'>هارنس</p>
                                                        <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                                            <p>{fullPracticalActivityData.data.harness}</p>
                                                        </div>
                                                    </div>
                                            }
        
                                            {
                                                fullPracticalActivityData.data.parachute &&
                                                    <div className='flex flex-col items-start gap-y-3 col-span-6'>
                                                        <p className=' text-xs pr-2'>چتر</p>
                                                        <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                                            <p>{fullPracticalActivityData.data.parachute}</p>
                                                        </div>
                                                    </div>
                                            }
                                        </>
                                    }
                                    
                                    {/* situation */}
                                    <div className='w-full flex col-span-6'>
                                        <DropDownLine 
                                            onClickActivation={() => setDropDownSituation(!DropDownSituation)}
                                            title={'موقعیت و شرایط پرواز'} 
                                            dropDown={DropDownSituation} 
                                            isActive={DropDownSituation}  
                                        />
                                    </div>

                                    {
                                        DropDownSituation && 
                                        <>
                                            {
                                            fullPracticalActivityData.data.country &&
                                                <div className='flex flex-col items-start gap-y-3 col-span-3'>
                                                    <p className=' text-xs pr-2'>کشور</p>
                                                    <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                                        <p>{fullPracticalActivityData.data.country}</p>
                                                    </div>
                                                </div>
                                            }
                                            {
                                            fullPracticalActivityData.data.province &&
                                                <div className='flex flex-col items-start gap-y-3 col-span-3'>
                                                    <p className=' text-xs pr-2'>استان</p>
                                                    <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                                        <p>{fullPracticalActivityData.data.province}</p>
                                                    </div>
                                                </div>
                                            }
                                            {
                                            fullPracticalActivityData.data.site &&
                                                <div className='flex flex-col items-start gap-y-3 col-span-3'>
                                                    <p className=' text-xs pr-2'>سایت</p>
                                                    <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                                        <p>{fullPracticalActivityData.data.site}</p>
                                                    </div>
                                                </div>
                                            }
                                            {
                                            fullPracticalActivityData.data.cloudCoverType &&
                                                <div className='flex flex-col items-start gap-y-3 col-span-3'>
                                                    <p className=' text-xs pr-2'>نوع پوشش ابری</p>
                                                    <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                                        <p>{fullPracticalActivityData.data.cloudCoverType}</p>
                                                    </div>
                                                </div>
                                            }
                                        </>
                                    }

                                    {/* takeoff */}
                                    <div className='w-full flex col-span-6'>
                                        <DropDownLine 
                                            onClickActivation={() => setDropDownTakeoff(!DropDownTakeoff)}
                                            title={'Takeoff'} 
                                            dropDown={DropDownTakeoff} 
                                            isActive={DropDownTakeoff}  
                                        />
                                    </div>

                                    {
                                        DropDownTakeoff && 
                                        <>
                                            {
                                                fullPracticalActivityData.data.takeOffTime &&
                                                    <div className='flex flex-col items-start gap-y-3 col-span-3'>
                                                        <p className=' text-xs pr-2'>ساعت Takeoff</p>
                                                        <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                                            <p>{fullPracticalActivityData.data.takeOffTime}</p>
                                                        </div>
                                                    </div>
                                            }

                                            {
                                                fullPracticalActivityData.data.takeOffType &&
                                                <div className='flex flex-col items-start gap-y-3 col-span-3'>
                                                    <p className=' text-xs pr-2'>شیوه Takeoff</p>
                                                    <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                                        <p>{fullPracticalActivityData.data.takeOffType}</p>
                                                    </div>
                                                </div>        
                                            }
                                            
                                            {
                                                fullPracticalActivityData.data.takeOffWindSpeedInKmh &&
                                                <div className='flex flex-col items-start gap-y-3 col-span-3'>
                                                    <p className=' text-xs pr-2'>سرعت باد Takeoff</p>
                                                    <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                                        <p>{fullPracticalActivityData.data.takeOffWindSpeedInKmh}</p>
                                                    </div>
                                                </div>
                                            }


                                            {
                                                fullPracticalActivityData.data.takeOffWindDirection &&
                                                <div className='flex flex-col items-start gap-y-3 col-span-3'>
                                                    <p className=' text-xs pr-2'>جهت باد Takeoff</p>
                                                    <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                                        <p>{fullPracticalActivityData.data.takeOffWindDirection}</p>
                                                    </div>
                                                </div>
                                            }
                                        </>
                                    }

                                    {/* landing */}
                                    <div className='w-full flex col-span-6'>
                                        <DropDownLine 
                                            onClickActivation={() => setDropDownLanding(!DropDownLanding)}
                                            title={'Landing'} 
                                            dropDown={DropDownLanding} 
                                            isActive={DropDownLanding}  
                                        />
                                    </div>

                                    {
                                        DropDownLanding &&
                                        <>
                                        
                                            {
                                                fullPracticalActivityData.data.landingTime &&
                                                <div className='flex flex-col items-start gap-y-3 col-span-3'>
                                                    <p className=' text-xs pr-2'>ساعت Landing</p>
                                                    <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                                        <p>{fullPracticalActivityData.data.landingTime}</p>
                                                    </div>
                                                </div>
                                            }


                                            {
                                                fullPracticalActivityData.data.landingWindDirection &&
                                                <div className='flex flex-col items-start gap-y-3 col-span-3'>
                                                    <p className=' text-xs pr-2'>جهت باد Landing</p>
                                                    <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                                        <p>{fullPracticalActivityData.data.landingWindDirection}</p>
                                                    </div>
                                                </div>
                                            }

                                            {
                                                fullPracticalActivityData.data.landingWindSpeedInKmh &&
                                                <div className='flex flex-col items-start gap-y-3 col-span-3'>
                                                    <p className=' text-xs pr-2'>سرعت باد Landing</p>
                                                    <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                                        <p>{fullPracticalActivityData.data.landingWindSpeedInKmh}</p>
                                                    </div>
                                                </div>
                                            }

                                            {
                                                fullPracticalActivityData.data.landingType &&
                                                <div className='flex flex-col items-start gap-y-3 col-span-3'>
                                                    <p className=' text-xs pr-2'>شیوه Landing</p>
                                                    <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                                        <p>{fullPracticalActivityData.data.landingType}</p>
                                                    </div>
                                                </div>
                                            }

                                        </>
                                    }

                                    {/* passenger data */}
                                    {
                                        fullPracticalActivityData.data.passengerHarness && fullPracticalActivityData.data.passengerPhoneNumber &&
                                        <>
                                            <div className='w-full flex col-span-6'>
                                                <DropDownLine 
                                                    onClickActivation={() => setDropDownPassenger(!DropDownPassenger)}
                                                    title={'اطلاعات مسافر'} 
                                                    dropDown={DropDownPassenger} 
                                                    isActive={DropDownPassenger}  
                                                />
                                            </div>
    
                                            {
                                                DropDownPassenger &&
                                                <>
                                                
                                                    {
                                                        fullPracticalActivityData.data.landingTime &&
                                                        <div className='flex flex-col items-start gap-y-3 col-span-6'>
                                                            <p className=' text-xs pr-2'>هارنس مسافر</p>
                                                            <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                                                <p>{fullPracticalActivityData.data.passengerHarness}</p>
                                                            </div>
                                                        </div>
                                                    }
    
    
                                                    {
                                                        fullPracticalActivityData.data.landingWindDirection &&
                                                        <div className='flex flex-col items-start gap-y-3 col-span-6'>
                                                            <p className=' text-xs pr-2'>تلفن مسافر</p>
                                                            <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                                                <p>{fullPracticalActivityData.data.passengerPhoneNumber}</p>
                                                            </div>
                                                        </div>
                                                    }
    
                                                </>
                                            }
                                        </>
                                    }

                                </div>

                                {   
                                    fullPracticalActivityData.data.syllabi &&
                                    fullPracticalActivityData.data.syllabi.length > 0 &&
                                        <div className=' grid grid-cols-1 gap-x-4 gap-y-2 w-full text-sm'>
                                            <p className=' text-sm pr-2 text-right'>سر فصل های پرواز</p>
                                            {
                                                fullPracticalActivityData.data.syllabi.map((syllabus, index) => (
                                                <div key={index} className='flex flex-col items-start gap-y-3'>
                                                    <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                                        <p className='text-start text-xs'>{syllabus.description}</p>
                                                    </div>
                                                </div>
                                                ))
                                            }
                                        </div>
                                }


                                <div className='w-full flex flex-col items-start gap-y-4 -mt-2'>
                                    <h1>توضیحات</h1>
                                    <p className={`${boxStyles.classDetailsData} w-full  text-sm p-4 rounded-3xl text-start`}>{fullPracticalActivityData.data.description ||'توضیحی نوشته نشده!'}</p>
                                </div>


                            </div>

                            {
                            !fullPracticalActivityData.data.igcFile &&
                                <div className='w-full'>
                                    <button onClick={() => window.open(fullPracticalActivityData.data.igcFile.path, '_blank')} className={`${ButtonStyles.normalButton} text-base w-32`}>مشاهده IGC</button>
                                </div>
                            }

                        </div>

                    }
                    </div>
            </div>
        </div>
    );
};

export default FlightHistoryPage;