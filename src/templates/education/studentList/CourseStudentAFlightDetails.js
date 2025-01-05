import React, { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

// styles
import boxStyles from '../../../styles/Boxes/DataBox.module.css'
import ButtonStyles from '../../../styles/Buttons/ButtonsBox.module.css'

// queries
import { useStudentPracticalActivity } from '../../../Utilities/Services/coursesQueries';

// components
import PageTitle from '../../../components/reuseable/PageTitle';
import DropDownLine from '../../../components/reuseable/DropDownLine';

const CourseStudentAFlightDetails = () => {
    
    const { flightId } = useParams()
    const location = useLocation()

    const isForClub = location.pathname.includes('/club')

    const [DropDown, setDropDown] = useState('')
    const [DropDownEquipment, setDropDownEquipment] = useState(true)
    const [DropDownSituation, setDropDownSituation] = useState(true)
    const [DropDownTakeoff, setDropDownTakeoff] = useState(true)
    const [DropDownLanding, setDropDownLanding] = useState(true)
    
    const { data: fullFlightData, isLoading: fullFlightDataLoading } = useStudentPracticalActivity(flightId);

    // dropDown onClick
    const handleDropDownClick = (dropDown) => {
        setDropDown(DropDown === dropDown ? '' : dropDown)
    }
    
    return (
        <div className='w-full flex flex-col items-center pt-14'>

            <div className='w-full md:w-[75%] flex flex-col justify-center items-center gap-y-0'>

                <PageTitle title={'جزئیات پرواز'} />

                <div className='w-[90%] flex flex-col gap-y-6'>

                    { fullFlightData &&
                            <div className='w-full flex flex-col items-center justify-center gap-y-2' >

                                <div className={` w-full rounded-xl flex flex-col py-4 gap-y-4`}>

                                    <div className=' grid grid-cols-6 gap-x-4 gap-y-4 w-full text-sm'>

                                        {
                                        fullFlightData.data.status &&
                                            <div className='flex flex-col col-span-6 items-start gap-y-3'>
                                                <div className= {`${boxStyles.classDetailsData} flex justify-center items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                                    <p className=' text-xs pr-2 text-textDisabled'>وضعیت:&nbsp;</p>
                                                    {
                                                        fullFlightData.data.status === 'Accepted' && 
                                                        <>
                                                            <p className='text-textAccent'> تایید شده </p>
                                                        </>
                                                    }
                                                    {fullFlightData.data.status === 'Pending' &&
                                                        <>
                                                            <p className='text-textWarning'> در انتظار تایید </p>
                                                        </>
                                                    }
                                                    {fullFlightData.data.status === 'Rejected' &&
                                                        <>
                                                            <p className='text-textError'> رد شده </p>
                                                        </>
                                                    }
                                                </div>
                                            </div>
                                        }

                                        {
                                        fullFlightData.data.coachName &&
                                            <div className='flex flex-col items-start col-span-3 gap-y-2'>
                                                <p className=' text-xs pr-2'>نام مربی</p>
                                                <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                                    <p>{fullFlightData.data.coachName}</p>
                                                </div>
                                            </div>
                                        }

                                        { 
                                            fullFlightData.data.courseName &&
                                            <div className='flex flex-col items-start col-span-3 gap-y-2'>
                                                <p className=' text-xs pr-2'>نام دوره</p>
                                                <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                                    <p>{fullFlightData.data.courseName}</p>
                                                </div>
                                            </div>
                                        }

                                        {
                                            fullFlightData.data.index &&
                                                <div className='flex flex-col items-start col-span-1 gap-y-2'>
                                                    <p className=' text-xs pr-2'> پرواز</p>
                                                    <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-3 w-full h-12 rounded-xl`}  id='data' >
                                                        <p>{fullFlightData.data.index}</p>
                                                    </div>
                                                </div>
                                        }

                                        {
                                            fullFlightData.data.dateTime &&
                                                <div className='flex flex-col items-start col-span-3 gap-y-2'>
                                                    <p className=' text-xs pr-2'>تاریخ پرواز</p>
                                                    <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                                        <p>{fullFlightData.data.dateTime}</p>
                                                    </div>
                                                </div>
                                        }
                                        
                                        {
                                            fullFlightData.data.flightDurationInMinutes &&
                                                <div className='flex flex-col items-start col-span-2 gap-y-2'>
                                                    <p className=' text-xs pr-2'>زمان پرواز</p>
                                                    <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                                        <p>{fullFlightData.data.flightDurationInMinutes}min</p>
                                                    </div>
                                                </div>
                                        }

                                        {
                                            fullFlightData.data.clubName &&
                                                <div className='flex flex-col items-start col-span-2 gap-y-2'>
                                                    <p className=' text-xs pr-2'>نام باشگاه</p>
                                                    <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                                        <p>{fullFlightData.data.clubName}</p>
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
                                                    fullFlightData.data.wing &&
                                                        <div className='flex flex-col items-start gap-y-2 col-span-6 mt-[-10px]'>
                                                            <p className=' text-xs pr-2'>بال</p>
                                                            <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                                                <p>{fullFlightData.data.wing}</p>
                                                            </div>
                                                        </div>
                                                }
            
                                                {
                                                    fullFlightData.data.harness &&
                                                        <div className='flex flex-col items-start gap-y-2 col-span-6'>
                                                            <p className=' text-xs pr-2'>هارنس</p>
                                                            <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                                                <p>{fullFlightData.data.harness}</p>
                                                            </div>
                                                        </div>
                                                }
            
                                                {
                                                    fullFlightData.data.parachute &&
                                                        <div className='flex flex-col items-start gap-y-2 col-span-6'>
                                                            <p className=' text-xs pr-2'>چتر</p>
                                                            <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                                                <p>{fullFlightData.data.parachute}</p>
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
                                                fullFlightData.data.country &&
                                                    <div className='flex flex-col items-start gap-y-2 col-span-3'>
                                                        <p className=' text-xs pr-2'>کشور</p>
                                                        <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                                            <p>{fullFlightData.data.country}</p>
                                                        </div>
                                                    </div>
                                                }
                                                {
                                                fullFlightData.data.province &&
                                                    <div className='flex flex-col items-start gap-y-2 col-span-3'>
                                                        <p className=' text-xs pr-2'>استان</p>
                                                        <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                                            <p>{fullFlightData.data.province}</p>
                                                        </div>
                                                    </div>
                                                }
                                                {
                                                fullFlightData.data.site &&
                                                    <div className='flex flex-col items-start gap-y-2 col-span-3'>
                                                        <p className=' text-xs pr-2'>سایت</p>
                                                        <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                                            <p>{fullFlightData.data.site}</p>
                                                        </div>
                                                    </div>
                                                }
                                                {
                                                fullFlightData.data.cloudCoverType &&
                                                    <div className='flex flex-col items-start gap-y-2 col-span-3'>
                                                        <p className=' text-xs pr-2'>نوع پوشش ابری</p>
                                                        <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                                            <p>{fullFlightData.data.cloudCoverType}</p>
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
                                                    fullFlightData.data.takeOffType &&
                                                    <div className='flex flex-col items-start gap-y-2 col-span-3'>
                                                        <p className=' text-xs pr-2'>شیوه Takeoff</p>
                                                        <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                                            <p>{fullFlightData.data.takeOffType}</p>
                                                        </div>
                                                    </div>
                                                }
                                                
                                                {
                                                    fullFlightData.data.takeOffTime &&
                                                        <div className='flex flex-col items-start gap-y-2 col-span-3'>
                                                            <p className=' text-xs pr-2'>ساعت Takeoff</p>
                                                            <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                                                <p>{fullFlightData.data.takeOffTime}</p>
                                                            </div>
                                                        </div>
                                                }

                                                {
                                                    fullFlightData.data.takeOffWindSpeedInKmh &&
                                                    <div className='flex flex-col items-start gap-y-2 col-span-3'>
                                                        <p className=' text-xs pr-2'>سرعت باد Takeoff</p>
                                                        <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                                            <p>{fullFlightData.data.takeOffWindSpeedInKmh}</p>
                                                        </div>
                                                    </div>
                                                }


                                                {
                                                    fullFlightData.data.takeOffWindDirection &&
                                                    <div className='flex flex-col items-start gap-y-2 col-span-3'>
                                                        <p className=' text-xs pr-2'>جهت باد Takeoff</p>
                                                        <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                                            <p>{fullFlightData.data.takeOffWindDirection}</p>
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
                                                    fullFlightData.data.landingWindSpeedInKmh &&
                                                    <div className='flex flex-col items-start gap-y-2 col-span-3'>
                                                        <p className=' text-xs pr-2'>سرعت باد Landing</p>
                                                        <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                                            <p>{fullFlightData.data.landingWindSpeedInKmh}</p>
                                                        </div>
                                                    </div>
                                                }

                                                {
                                                    fullFlightData.data.landingWindDirection &&
                                                    <div className='flex flex-col items-start gap-y-2 col-span-3'>
                                                        <p className=' text-xs pr-2'>جهت باد Landing</p>
                                                        <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                                            <p>{fullFlightData.data.landingWindDirection}</p>
                                                        </div>
                                                    </div>
                                                }

                                                {
                                                    fullFlightData.data.landingTime &&
                                                    <div className='flex flex-col items-start gap-y-2 col-span-3'>
                                                        <p className=' text-xs pr-2'>زمان Landing</p>
                                                        <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                                            <p>{fullFlightData.data.landingTime}</p>
                                                        </div>
                                                    </div>
                                                }

                                                {
                                                    fullFlightData.data.landingType &&
                                                    <div className='flex flex-col items-start gap-y-2 col-span-3'>
                                                        <p className=' text-xs pr-2'>شیوه Landing</p>
                                                        <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                                            <p>{fullFlightData.data.landingType}</p>
                                                        </div>
                                                    </div>
                                                }
                                            </>
                                        }

                                    </div>

                                    {   
                                        fullFlightData.data.syllabi &&
                                        fullFlightData.data.syllabi.length > 0 &&
                                            <div className=' grid grid-cols-1 gap-x-4 gap-y-2 w-full text-sm'>
                                                <p className=' text-sm pr-2 text-right'>سر فصل های پرواز</p>
                                                {
                                                    fullFlightData.data.syllabi.map((syllabus, index) => (
                                                    <div key={index} className='flex flex-col items-start gap-y-3'>
                                                        <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                                            <p className='text-start text-xs'>{syllabus.description}</p>
                                                        </div>
                                                    </div>
                                                    ))
                                                }
                                            </div>
                                    }


                                    <div className='w-full flex flex-col items-start gap-y-2'>
                                        <h1>توضیحات</h1>
                                        <p className={`w-full ${boxStyles.classDetailsData} text-sm px-3 py-5 rounded-3xl text-start`}>{fullFlightData.data.description ||'توضیحی نوشته نشده!'}</p>
                                    </div>


                                </div>

                                {fullFlightData.data.igcFile &&
                                    <div className='w-full'>
                                        <button onClick={() => window.open(fullFlightData.data.igcFile.path, '_blank')} className={`${ButtonStyles.normalButton} text-sm -mb-2`}>مشاهده IGC</button>
                                    </div>
                                }

                            </div>

                        }
                </div>
            </div>
        </div>
    );
};

export default CourseStudentAFlightDetails;