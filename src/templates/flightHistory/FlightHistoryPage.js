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
import SelectLocationGoogle from '../../modules/addFlight/SelectLocationGoogle';
import { useTranslation } from '../../Utilities/context/TranslationContext';

const FlightHistoryPage = () => {

    // language
    const { t } = useTranslation();
    
    const { id } = useParams()
    const location = useLocation()
    
    const [flightData, setFlightData] = useState('')
    const [selectedLocation, setSelectedLocation] = useState(); 

    const [DropDownEquipment, setDropDownEquipment] = useState(true)
    const [DropDownSituation, setDropDownSituation] = useState(true)
    const [DropDownTakeoff, setDropDownTakeoff] = useState(true)
    const [DropDownLanding, setDropDownLanding] = useState(true)
    const [DropDownPassenger, setDropDownPassenger] = useState(true)
    
    const { data: fullPracticalActivityData } = usePracticalActivity(id);
    const { data: studentFlightData } = useStudentPracticalActivity(id);
    
    const isForStudent = location.pathname.includes('/aStudentFlight')
    const isForFlight = flightData?.data?.flight   // it could be for ground training
    

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
                    <PageTitle title={isForFlight ? t("flightHistory.flightDetails.flight") : t("flightHistory.flightDetails.groundTraining")} />
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
                                                <p className=' text-xs pr-2 text-textDisabled'>{t("flightHistory.flightDetails.status")}&nbsp;</p>
                                                {
                                                    flightData.data.status === 'Accepted' && 
                                                    <>
                                                        <p className='text-textAccent'> {t("flightHistory.flightDetails.accepted")} </p>
                                                    </>
                                                }
                                                {flightData.data.status === 'Pending' &&
                                                    <>
                                                        <p className='text-textWarning'>{t("flightHistory.flightDetails.pending")}</p>
                                                    </>
                                                }
                                                {flightData.data.status === 'Rejected' &&
                                                    <>
                                                        <p className='text-textError'>{t("flightHistory.flightDetails.rejected")}</p>
                                                    </>
                                                }
                                            </div>
                                        </div>
                                    }

                                    {
                                    flightData.data.coachName &&
                                        <div className='flex flex-col items-start col-span-3 gap-y-3'>
                                            <p className=' text-xs pr-2'>{t("flightHistory.flightDetails.coachName")}</p>
                                            <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                                <p>{flightData.data.coachName}</p>
                                            </div>
                                        </div>
                                    }

                                    { 
                                        flightData.data.courseName &&
                                        <div className='flex flex-col items-start col-span-3 gap-y-3'>
                                            <p className=' text-xs pr-2'>{t("flightHistory.flightDetails.courseName")}</p>
                                            <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                                <p>{flightData.data.courseName}</p>
                                            </div>
                                        </div>
                                    }

                                    {
                                        flightData.data?.index >= 0 && isForFlight &&
                                            <div className='flex flex-col items-start col-span-1 gap-y-3'>
                                                <p className=' text-xs pr-2'>{t("flightHistory.flightDetails.flightCount")}</p>
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
                                                    <p className=' text-xs pr-2'>{t("flightHistory.flightDetails.date")}</p>
                                                    :
                                                    <p className=' text-xs pr-2'>{t("flightHistory.flightDetails.date")}</p>
                                                }
                                                <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                                    <p>{flightData.data.dateTime}</p>
                                                </div>
                                            </div>
                                    }
                                    
                                    {
                                        flightData.data.durationInMinutes &&
                                            <div className={`flex flex-col items-start ${isForFlight ? 'col-span-2' : 'col-span-3'} gap-y-3`}>
                                                <p className=' text-xs pr-2'>{t("flightHistory.flightDetails.flightTime")}</p>
                                                <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                                    <p>{flightData.data.durationInMinutes}min</p>
                                                </div>
                                            </div>
                                    }

                                    {
                                        flightData.data.clubName &&
                                            <div className='flex flex-col items-start col-span-2 gap-y-3'>
                                                <p className=' text-xs pr-2'>{t("flightHistory.flightDetails.clubName")}</p>
                                                <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                                    <p>{flightData.data.clubName}</p>
                                                </div>
                                            </div>
                                    }

                                    {/* equipment */}
                                    <div className='w-full flex col-span-6'>
                                        <DropDownLine 
                                            onClickActivation={() => setDropDownEquipment(!DropDownEquipment)}
                                            title={isForFlight ? t("flightHistory.flightDetails.equipment") : t("flightHistory.flightDetails.groundTrainingEquipment")} 
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
                                                        <p className=' text-xs pr-2'>{t("flightHistory.flightDetails.wing")}</p>
                                                        <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                                            <p>{flightData.data.wing}</p>
                                                        </div>
                                                    </div>
                                            }
        
                                            {
                                                flightData.data.harness &&  
                                                    <div className='flex flex-col items-start gap-y-3 col-span-6'>
                                                        <p className=' text-xs pr-2'>{t("flightHistory.flightDetails.harness")}</p>
                                                        <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                                            <p>{flightData.data.harness}</p>
                                                        </div>
                                                    </div>
                                            }
        
                                            {
                                                flightData.data.parachute &&
                                                    <div className='flex flex-col items-start gap-y-3 col-span-6'>
                                                        <p className=' text-xs pr-2'>{t("flightHistory.flightDetails.parachute")}</p>
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
                                            title={isForFlight ? t("flightHistory.flightDetails.flightSituation") : t("flightHistory.flightDetails.groundTrainingSituation")} 
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
                                                    <p className=' text-xs pr-2'>{t("flightHistory.flightDetails.country")}</p>
                                                    <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                                        <p>{flightData.data.flight?.country}</p>
                                                    </div>
                                                </div>
                                            }
                                            {
                                            flightData.data.flight?.province &&
                                                <div className='flex flex-col items-start gap-y-3 col-span-3'>
                                                    <p className=' text-xs pr-2'>{t("flightHistory.flightDetails.province")}</p>
                                                    <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                                        <p>{flightData.data.flight?.province}</p>
                                                    </div>
                                                </div>
                                            }
                                            {
                                            flightData.data.flight?.site &&
                                                <div className='flex flex-col items-start gap-y-3 col-span-3'>
                                                    <p className=' text-xs pr-2'>{t("flightHistory.flightDetails.site")}</p>
                                                    <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                                        <p>{flightData.data.flight?.site}</p>
                                                    </div>
                                                </div>
                                            }

                                            {
                                                flightData.data?.groundHandling &&
                                                <div className='col-span-6'>
                                                    <SelectLocationGoogle
                                                    selectedLocation={{lat:flightData.data.groundHandling.locationLatitude, lng:flightData.data.groundHandling.locationLongitude }}
                                                    setSelectedLocation={setSelectedLocation}
                                                    />
                                                </div>
                                            }
                                            {
                                                flightData.data.cloudCoverType &&
                                                <div className='flex flex-col items-start gap-y-3 col-span-3'>
                                                    <p className=' text-xs pr-2'>{t("flightHistory.flightDetails.cloudCoverType")}</p>
                                                    <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                                        <p>{flightData.data.cloudCoverType}</p>
                                                    </div>
                                                </div>
                                            }

                                            {/* ground handling datas */}
                                            {
                                                flightData.data.startTime && flightData.data.groundHandling &&
                                                    <div className='flex flex-col items-start gap-y-3 col-span-3'>
                                                        <p className=' text-xs pr-2'>{t("flightHistory.flightDetails.startTime")}</p>
                                                        <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                                            <p>{flightData.data.startTime}</p>
                                                        </div>
                                                    </div>
                                            }
                                            {
                                                flightData.data.finishTime && flightData.data.groundHandling &&
                                                    <div className='flex flex-col items-start gap-y-3 col-span-3'>
                                                        <p className=' text-xs pr-2'>{t("flightHistory.flightDetails.finishTime")}</p>
                                                        <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                                            <p>{flightData.data.finishTime}</p>
                                                        </div>
                                                    </div>
                                            }
                                            {
                                                flightData.data.groundHandling?.windSpeedInKmh &&
                                                    <div className='flex flex-col items-start gap-y-3 col-span-3'>
                                                        <p className=' text-xs pr-2'>{t("flightHistory.flightDetails.windSpeed")}</p>
                                                        <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                                            <p>{flightData.data.groundHandling.windSpeedInKmh}</p>
                                                        </div>
                                                    </div>
                                            }
                                            {
                                                flightData.data.groundHandling?.windDirection &&
                                                    <div className='flex flex-col items-start gap-y-3 col-span-3'>
                                                        <p className=' text-xs pr-2'>{t("flightHistory.flightDetails.windDirection")}</p>
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
                                                                <p className=' text-xs pr-2'>{t("flightHistory.flightDetails.takeoffStartTime")}</p>
                                                                <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                                                    <p>{flightData.data.startTime}</p>
                                                                </div>
                                                            </div>
                                                    }

                                                    {
                                                        flightData.data.flight.takeOffType &&
                                                        <div className='flex flex-col items-start gap-y-3 col-span-3'>
                                                            <p className=' text-xs pr-2'>{t("flightHistory.flightDetails.takeOffType")}</p>
                                                            <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                                                <p>{flightData.data.flight.takeOffType}</p>
                                                            </div>
                                                        </div>        
                                                    }
                                                    
                                                    {
                                                        flightData.data.flight.takeOffWindSpeedInKmh &&
                                                        <div className='flex flex-col items-start gap-y-3 col-span-3'>
                                                            <p className=' text-xs pr-2'>{t("flightHistory.flightDetails.takeoffWindSpeed")}</p>
                                                            <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                                                <p>{flightData.data.flight.takeOffWindSpeedInKmh}</p>
                                                            </div>
                                                        </div>
                                                    }


                                                    {
                                                        flightData.data.flight.takeOffWindDirection &&
                                                        <div className='flex flex-col items-start gap-y-3 col-span-3'>
                                                            <p className=' text-xs pr-2'>{t("flightHistory.flightDetails.takeoffWindDirection")}</p>
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
                                                        <p className=' text-xs pr-2'>{t("flightHistory.flightDetails.landing")}</p>
                                                        <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                                            <p>{flightData.data.finishTime}</p>
                                                        </div>
                                                    </div>
                                                }


                                                {
                                                    flightData.data.flight.landingWindDirection &&
                                                    <div className='flex flex-col items-start gap-y-3 col-span-3'>
                                                        <p className=' text-xs pr-2'>{t("flightHistory.flightDetails.landingWindDirection")}</p>
                                                        <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                                            <p>{flightData.data.flight.landingWindDirection}</p>
                                                        </div>
                                                    </div>
                                                }

                                                {
                                                    flightData.data.flight.landingWindSpeedInKmh &&
                                                    <div className='flex flex-col items-start gap-y-3 col-span-3'>
                                                        <p className=' text-xs pr-2'>{t("flightHistory.flightDetails.landingWindSpeed")}</p>
                                                        <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                                            <p>{flightData.data.flight.landingWindSpeedInKmh}</p>
                                                        </div>
                                                    </div>
                                                }

                                                {
                                                    flightData.data.flight.landingType &&
                                                    <div className='flex flex-col items-start gap-y-3 col-span-3'>
                                                        <p className=' text-xs pr-2'>{t("flightHistory.flightDetails.landingType")}</p>
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
                                                    title={t("flightHistory.flightDetails.passenger")} 
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
                                                            <p className=' text-xs pr-2'>{t("flightHistory.flightDetails.passengerHarness")}</p>
                                                            <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                                                <p>{flightData.data.passengerHarness}</p>
                                                            </div>
                                                        </div>
                                                    }
    
    
                                                    {
                                                        flightData.data.landingWindDirection &&
                                                        <div className='flex flex-col items-start gap-y-3 col-span-6'>
                                                            <p className=' text-xs pr-2'>{t("flightHistory.flightDetails.passengerPhoneNumber")}</p>
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
                                            <p className=' text-sm pr-2 text-right'>{t("flightHistory.flightDetails.syllabi")}</p>
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
                                    <h1>{t("flightHistory.flightDetails.description")}</h1>
                                    <p className={`${boxStyles.classDetailsData} w-full  text-sm p-4 rounded-3xl text-start`}>{flightData.data.description || t("flightHistory.flightDetails.noDescription")}</p>
                                </div>


                            </div>

                            {
                            !flightData.data.igcFile &&
                                <div className='w-full'>
                                    <button onClick={() => window.open(flightData.data.igcFile.path, '_blank')} className={`${ButtonStyles.normalButton} text-base w-32`}>{t("flightHistory.flightDetails.viewIGC")}</button>
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