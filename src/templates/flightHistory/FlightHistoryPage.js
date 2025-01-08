import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

// styles
import boxStyles from '../../styles/DataBox.module.css'
import ButtonStyles from '../../styles/ButtonsBox.module.css'

// queries
import { usePracticalActivity } from '../../Utilities/Services/flightHistoriesQueries';

// components
import PageTitle from '../../components/reuseable/PageTitle';
import DropDownLine from '../../components/reuseable/DropDownLine';
import { useStudentPracticalActivity } from '../../Utilities/Services/coursesQueries';

const FlightHistoryPage = () => {
    
    const { id } = useParams()
    const location = useLocation()
    
    const [flightData, setFlightData] = useState('')

    const [DropDownEquipment, setDropDownEquipment] = useState(true)
    const [DropDownSituation, setDropDownSituation] = useState(true)
    const [DropDownTakeoff, setDropDownTakeoff] = useState(true)
    const [DropDownLanding, setDropDownLanding] = useState(true)
    const [DropDownPassenger, setDropDownPassenger] = useState(true)
    
    const { data: fullPracticalActivityData } = usePracticalActivity(id);
    const { data: studentFlightData } = useStudentPracticalActivity(id);
    
    const isForStudent = location.pathname.includes('/aStudentFlight')
    const isForFlight = flightData?.data?.flight
    

    useEffect(() => {
        
        if(isForStudent && studentFlightData) {
            setFlightData(studentFlightData)
        } 
        else if(!isForStudent && fullPracticalActivityData) {
            setFlightData(fullPracticalActivityData)
        }

    },[fullPracticalActivityData, studentFlightData, location])

    
    return (
        <div className='w-full flex flex-col items-center pt-14 '>

            <div className='w-full md:w-[75%] flex flex-col justify-center items-center gap-y-0 mb-[-10px] lg:gap-y-12 lg:w-[55%] '>

                {
                flightData &&
                    <PageTitle title={isForFlight ? 'جزئیات پرواز' : 'جزئیات تمرین زمینی'} />
                }

                <div className='w-[90%] flex flex-col gap-y-6'>

                    { flightData &&
                        <div className='w-full flex flex-col items-center justify-center gap-y-2' >

                            <div className={` w-full rounded-xl flex flex-col py-4 gap-y-8`}>

                                <div className=' grid grid-cols-6 gap-x-4 gap-y-4 w-full text-sm'>

                                    {
                                    flightData.data.status &&
                                        <div className='flex flex-col col-span-6 items-start gap-y-3'>
                                            <div className= {`${boxStyles.classDetailsData} flex justify-center items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                                <p className=' text-xs pr-2 text-textDisabled'>وضعیت:&nbsp;</p>
                                                {
                                                    flightData.data.status === 'Accepted' && 
                                                    <>
                                                        <p className='text-textAccent'> تایید شده </p>
                                                    </>
                                                }
                                                {flightData.data.status === 'Pending' &&
                                                    <>
                                                        <p className='text-textWarning'> در انتظار تایید </p>
                                                    </>
                                                }
                                                {flightData.data.status === 'Rejected' &&
                                                    <>
                                                        <p className='text-textError'>رد شده</p>
                                                    </>
                                                }
                                            </div>
                                        </div>
                                    }

                                    {
                                    flightData.data.coachName &&
                                        <div className='flex flex-col items-start col-span-3 gap-y-3'>
                                            <p className=' text-xs pr-2'>نام مربی</p>
                                            <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                                <p>{flightData.data.coachName}</p>
                                            </div>
                                        </div>
                                    }

                                    { 
                                        flightData.data.courseName &&
                                        <div className='flex flex-col items-start col-span-3 gap-y-3'>
                                            <p className=' text-xs pr-2'>نام دوره</p>
                                            <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                                <p>{flightData.data.courseName}</p>
                                            </div>
                                        </div>
                                    }

                                    {
                                        flightData.data?.index >= 0 && isForFlight &&
                                            <div className='flex flex-col items-start col-span-1 gap-y-3'>
                                                <p className=' text-xs pr-2'> پرواز</p>
                                                <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-3 w-full h-12 rounded-xl`}  id='data' >
                                                    <p>{flightData.data.index}</p>
                                                </div>
                                            </div>
                                    }

                                    {
                                        flightData.data.dateTime &&
                                            <div className='flex flex-col items-start col-span-3 gap-y-3'>
                                                {
                                                    isForFlight ?
                                                    <p className=' text-xs pr-2'>تاریخ پرواز</p>
                                                    :
                                                    <p className=' text-xs pr-2'>تاریخ</p>
                                                }
                                                <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                                    <p>{flightData.data.dateTime}</p>
                                                </div>
                                            </div>
                                    }
                                    
                                    {
                                        flightData.data.durationInMinutes &&
                                            <div className={`flex flex-col items-start ${isForFlight ? 'col-span-2' : 'col-span-3'} gap-y-3`}>
                                                <p className=' text-xs pr-2'>زمان پرواز</p>
                                                <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                                    <p>{flightData.data.durationInMinutes}min</p>
                                                </div>
                                            </div>
                                    }

                                    {
                                        flightData.data.clubName &&
                                            <div className='flex flex-col items-start col-span-2 gap-y-3'>
                                                <p className=' text-xs pr-2'>نام باشگاه</p>
                                                <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                                    <p>{flightData.data.clubName}</p>
                                                </div>
                                            </div>
                                    }

                                    {/* equipment */}
                                    <div className='w-full flex col-span-6'>
                                        <DropDownLine 
                                            onClickActivation={() => setDropDownEquipment(!DropDownEquipment)}
                                            title={isForFlight ? 'مشخصات وسیله پروازی' : "مشخصات وسیله تمرین زمینی"} 
                                            dropDown={DropDownEquipment} 
                                            isActive={DropDownEquipment}
                                        />
                                    </div>

                                    {
                                        DropDownEquipment &&
                                        <>
                                            {
                                                flightData.data.wing &&
                                                    <div className='flex flex-col items-start gap-y-3 col-span-6 mt-[-10px]'>
                                                        <p className=' text-xs pr-2'>بال</p>
                                                        <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                                            <p>{flightData.data.wing}</p>
                                                        </div>
                                                    </div>
                                            }
        
                                            {
                                                flightData.data.harness &&  
                                                    <div className='flex flex-col items-start gap-y-3 col-span-6'>
                                                        <p className=' text-xs pr-2'>هارنس</p>
                                                        <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                                            <p>{flightData.data.harness}</p>
                                                        </div>
                                                    </div>
                                            }
        
                                            {
                                                flightData.data.parachute &&
                                                    <div className='flex flex-col items-start gap-y-3 col-span-6'>
                                                        <p className=' text-xs pr-2'>چتر</p>
                                                        <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                                            <p>{flightData.data.parachute}</p>
                                                        </div>
                                                    </div>
                                            }
                                        </>
                                    }
                                    

                                    {/* situation */}
                                    <div className='w-full flex col-span-6'>
                                        <DropDownLine 
                                            onClickActivation={() => setDropDownSituation(!DropDownSituation)}
                                            title={isForFlight ? 'موقعیت و شرایط پرواز' : 'موقعیت‌ و شرایط تمرین زمینی'} 
                                            dropDown={DropDownSituation} 
                                            isActive={DropDownSituation} 
                                        />
                                    </div>

                                    {
                                        DropDownSituation && 
                                        <>
                                            {
                                            flightData.data.flight?.country &&
                                                <div className='flex flex-col items-start gap-y-3 col-span-3'>
                                                    <p className=' text-xs pr-2'>کشور</p>
                                                    <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                                        <p>{flightData.data.flight?.country}</p>
                                                    </div>
                                                </div>
                                            }
                                            {
                                            flightData.data.flight?.province &&
                                                <div className='flex flex-col items-start gap-y-3 col-span-3'>
                                                    <p className=' text-xs pr-2'>استان</p>
                                                    <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                                        <p>{flightData.data.flight?.province}</p>
                                                    </div>
                                                </div>
                                            }
                                            {
                                            flightData.data.flight?.site &&
                                                <div className='flex flex-col items-start gap-y-3 col-span-3'>
                                                    <p className=' text-xs pr-2'>سایت</p>
                                                    <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                                        <p>{flightData.data.flight?.site}</p>
                                                    </div>
                                                </div>
                                            }
                                            {
                                                flightData.data.cloudCoverType &&
                                                <div className='flex flex-col items-start gap-y-3 col-span-3'>
                                                    <p className=' text-xs pr-2'>نوع پوشش ابری</p>
                                                    <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                                        <p>{flightData.data.cloudCoverType}</p>
                                                    </div>
                                                </div>
                                            }
                                            {/* ground handling datas */}
                                            {
                                                flightData.data.startTime && flightData.data.groundHandling &&
                                                    <div className='flex flex-col items-start gap-y-3 col-span-3'>
                                                        <p className=' text-xs pr-2'>زمان شروع</p>
                                                        <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                                            <p>{flightData.data.startTime}</p>
                                                        </div>
                                                    </div>
                                            }
                                            {
                                                flightData.data.finishTime && flightData.data.groundHandling &&
                                                    <div className='flex flex-col items-start gap-y-3 col-span-3'>
                                                        <p className=' text-xs pr-2'>زمان پایان</p>
                                                        <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                                            <p>{flightData.data.finishTime}</p>
                                                        </div>
                                                    </div>
                                            }
                                            {
                                                flightData.data.groundHandling?.windSpeedInKmh &&
                                                    <div className='flex flex-col items-start gap-y-3 col-span-3'>
                                                        <p className=' text-xs pr-2'>سرعت باد به km/h</p>
                                                        <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                                            <p>{flightData.data.groundHandling.windSpeedInKmh}</p>
                                                        </div>
                                                    </div>
                                            }
                                            {
                                                flightData.data.groundHandling?.windDirection &&
                                                    <div className='flex flex-col items-start gap-y-3 col-span-3'>
                                                        <p className=' text-xs pr-2'>جهت باد</p>
                                                        <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                                            <p>{flightData.data.groundHandling.windDirection}</p>
                                                        </div>
                                                    </div>
                                            }
                                        </>
                                    }

                                    {
                                    flightData?.data.flight &&
                                        <>
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
                                                        flightData.data.startTime &&
                                                            <div className='flex flex-col items-start gap-y-3 col-span-3'>
                                                                <p className=' text-xs pr-2'>ساعت Takeoff</p>
                                                                <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                                                    <p>{flightData.data.startTime}</p>
                                                                </div>
                                                            </div>
                                                    }

                                                    {
                                                        flightData.data.flight.takeOffType &&
                                                        <div className='flex flex-col items-start gap-y-3 col-span-3'>
                                                            <p className=' text-xs pr-2'>شیوه Takeoff</p>
                                                            <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                                                <p>{flightData.data.flight.takeOffType}</p>
                                                            </div>
                                                        </div>        
                                                    }
                                                    
                                                    {
                                                        flightData.data.flight.takeOffWindSpeedInKmh &&
                                                        <div className='flex flex-col items-start gap-y-3 col-span-3'>
                                                            <p className=' text-xs pr-2'>سرعت باد Takeoff</p>
                                                            <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                                                <p>{flightData.data.flight.takeOffWindSpeedInKmh}</p>
                                                            </div>
                                                        </div>
                                                    }


                                                    {
                                                        flightData.data.flight.takeOffWindDirection &&
                                                        <div className='flex flex-col items-start gap-y-3 col-span-3'>
                                                            <p className=' text-xs pr-2'>جهت باد Takeoff</p>
                                                            <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                                                <p>{flightData.data.flight.takeOffWindDirection}</p>
                                                            </div>
                                                        </div>
                                                    }
                                                </>
                                            }
                                        </>
                                    }

                                    
                                    {
                                    flightData?.data.flight &&
                                    <>
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
                                                    flightData.data.finishTime &&
                                                    <div className='flex flex-col items-start gap-y-3 col-span-3'>
                                                        <p className=' text-xs pr-2'>ساعت Landing</p>
                                                        <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                                            <p>{flightData.data.finishTime}</p>
                                                        </div>
                                                    </div>
                                                }


                                                {
                                                    flightData.data.flight.landingWindDirection &&
                                                    <div className='flex flex-col items-start gap-y-3 col-span-3'>
                                                        <p className=' text-xs pr-2'>جهت باد Landing</p>
                                                        <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                                            <p>{flightData.data.flight.landingWindDirection}</p>
                                                        </div>
                                                    </div>
                                                }

                                                {
                                                    flightData.data.flight.landingWindSpeedInKmh &&
                                                    <div className='flex flex-col items-start gap-y-3 col-span-3'>
                                                        <p className=' text-xs pr-2'>سرعت باد Landing</p>
                                                        <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                                            <p>{flightData.data.flight.landingWindSpeedInKmh}</p>
                                                        </div>
                                                    </div>
                                                }

                                                {
                                                    flightData.data.flight.landingType &&
                                                    <div className='flex flex-col items-start gap-y-3 col-span-3'>
                                                        <p className=' text-xs pr-2'>شیوه Landing</p>
                                                        <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                                            <p>{flightData.data.flight.landingType}</p>
                                                        </div>
                                                    </div>
                                                }

                                            </>
                                        }
                                    </>
                                    }

                                    {/* passenger data */}
                                    {
                                        flightData.data.passengerHarness && flightData.data.passengerPhoneNumber &&
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
                                                        flightData.data.landingTime &&
                                                        <div className='flex flex-col items-start gap-y-3 col-span-6'>
                                                            <p className=' text-xs pr-2'>هارنس مسافر</p>
                                                            <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                                                <p>{flightData.data.passengerHarness}</p>
                                                            </div>
                                                        </div>
                                                    }
    
    
                                                    {
                                                        flightData.data.landingWindDirection &&
                                                        <div className='flex flex-col items-start gap-y-3 col-span-6'>
                                                            <p className=' text-xs pr-2'>تلفن مسافر</p>
                                                            <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                                                <p>{flightData.data.passengerPhoneNumber}</p>
                                                            </div>
                                                        </div>
                                                    }
    
                                                </>
                                            }
                                        </>
                                    }

                                </div>

                                {   
                                    flightData.data.syllabi &&
                                    flightData.data.syllabi.length > 0 &&
                                        <div className=' grid grid-cols-1 gap-x-4 gap-y-2 w-full text-sm'>
                                            <p className=' text-sm pr-2 text-right'>سر فصل های پرواز</p>
                                            {
                                                flightData.data.syllabi.map((syllabus, index) => (
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
                                    <p className={`${boxStyles.classDetailsData} w-full  text-sm p-4 rounded-3xl text-start`}>{flightData.data.description ||'توضیحی داده نشده!'}</p>
                                </div>


                            </div>

                            {
                            !flightData.data.igcFile &&
                                <div className='w-full'>
                                    <button onClick={() => window.open(flightData.data.igcFile.path, '_blank')} className={`${ButtonStyles.normalButton} text-base w-32`}>مشاهده IGC</button>
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