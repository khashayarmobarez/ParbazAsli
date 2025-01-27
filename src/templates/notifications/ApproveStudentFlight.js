import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';

// styles
import boxStyles from '../../styles/DataBox.module.css'
import ButtonStyles from '../../styles/ButtonsBox.module.css'

// queries
import { useDeclineUserFlight, useUserCourseFlight } from '../../Utilities/Services/coursesQueries';

// mui
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';


// comps
import PageTitle from '../../components/reuseable/PageTitle';
import { toast } from 'react-toastify';
import { usePracticalActivity } from '../../Utilities/Services/flightHistoriesQueries';
import DropDownLine from '../../components/reuseable/DropDownLine';
import SelectLocationGoogle from '../../modules/addFlight/SelectLocationGoogle';

// context
import { useTranslation } from '../../Utilities/context/TranslationContext';


const ApproveStudentFlight = () => {

    // language
    const { t } = useTranslation();
    const dir = Cookies.get('dir') || 'ltr';

    const { id } = useParams()
    const appTheme = Cookies.get('themeApplied') || 'dark';
    
    const [DropDownEquipment, setDropDownEquipment] = useState(true)
    const [DropDownSituation, setDropDownSituation] = useState(true)
    const [DropDownTakeoff, setDropDownTakeoff] = useState(true)
    const [DropDownLanding, setDropDownLanding] = useState(true)

    const [selectedLocation, setSelectedLocation] = useState(); 

    const [courseId, setCourseId] = useState('')

    const navigate = useNavigate()

    const {  data: UserCourseFlightData } = useUserCourseFlight(id);
    const { data: fullPracticalActivityData } = usePracticalActivity(id);
    const { mutate: mutateDecline } = useDeclineUserFlight();

    const isForFlight = UserCourseFlightData?.data?.flight   // it could be for ground training

    useEffect(() => {
        if(UserCourseFlightData) {
            setCourseId(UserCourseFlightData.data.courseId)
        }
    },[UserCourseFlightData])

    const handleSubmit = () => {
        navigate(`/addFlight/ReviewStudentsFlight/${id}/syllabuses/${courseId}`)
    } 

    const handleDecline = (event) => {

        event.preventDefault();

        mutateDecline(id, {
            onSuccess: (data) => {
                // Handle success, e.g., show a notification, reset the form, etc.
                toast(t('notifications.approveStudentFlight.success'), {
                    type: 'success', // Specify the type of toast (e.g., 'success', 'error', 'info', 'warning')
                    position: 'top-right', // Set the position (e.g., 'top-left', 'bottom-right')
                    autoClose: 3000,
                    theme: appTheme,
                    style: { width: "350px" }
                });
                navigate(`/notifications`)
            },
            onError: (error) => {
                let errorMessage = t('notifications.approveStudentFlight.errorOccurred');
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
            }
        })
    } 

    return (

        <div className='pt-14 flex flex-col justify-center items-center gap-y-2 '>

            <div className='flex flex-col lg:py-6 justify-center items-center w-full gap-y-4 md:w-[60%] lg:w-[55%]'>

                <PageTitle title={isForFlight ? t('notifications.approveStudentFlight.confirmFlight') : t('notifications.approveStudentFlight.confirmGroundTraining')} />

                {
                    UserCourseFlightData && fullPracticalActivityData &&
                        <form className={`  w-[90%] rounded-xl flex flex-col items-center pb-10 pt-4 gap-y-8 `}>

                                <div className=' grid grid-cols-6 gap-x-4 gap-y-4 w-full text-sm'>

                                    {
                                        fullPracticalActivityData.data.studentName &&
                                        <div className='flex flex-col items-start col-span-3 gap-y-3'>
                                            <p className='text-xs pr-2'>{t('notifications.approveStudentFlight.studentName')}</p>
                                            <div className={`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`} id='data'>
                                                <p>{fullPracticalActivityData.data.studentName}</p>
                                            </div>
                                        </div>
                                    }
                                    {
                                        fullPracticalActivityData.data.courseName &&
                                        <div className='flex flex-col items-start col-span-3 gap-y-3'>
                                            <p className='text-xs pr-2'>{t('notifications.approveStudentFlight.courseName')}</p>
                                            <div className={`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`} id='data'>
                                                <p>{fullPracticalActivityData.data.courseName}</p>
                                            </div>
                                        </div>
                                    }
                                    {
                                        fullPracticalActivityData.data.index >= 0 && isForFlight &&
                                        <div className='flex flex-col items-start col-span-1 gap-y-3'>
                                            <p className='text-xs pr-2'>{t('notifications.approveStudentFlight.flightNumber')}</p>
                                            <div className={`${boxStyles.classDetailsData} flex justify-start items-center px-3 w-full h-12 rounded-xl`} id='data'>
                                                <p>{fullPracticalActivityData.data.index}</p>
                                            </div>
                                        </div>
                                    }
                                    {
                                        fullPracticalActivityData.data.dateTime &&
                                        <div className='flex flex-col items-start col-span-3 gap-y-3'>
                                            <p className='text-xs pr-2'>{t('notifications.approveStudentFlight.date')}</p>
                                            <div className={`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`} id='data'>
                                                <p>{fullPracticalActivityData.data.dateTime}</p>
                                            </div>
                                        </div>
                                    }
                                    {
                                        fullPracticalActivityData.data.durationInMinutes &&
                                        <div className={`flex flex-col items-start ${isForFlight ? 'col-span-2' : 'col-span-3'} gap-y-3`}>
                                            <p className='text-xs pr-2'>{t('notifications.approveStudentFlight.duration')}</p>
                                            <div className={`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`} id='data'>
                                                <p>{fullPracticalActivityData.data.durationInMinutes}min</p>
                                            </div>
                                        </div>
                                    }
                                    {
                                        fullPracticalActivityData.data.clubName &&
                                        <div className='flex flex-col items-start col-span-6 gap-y-3'>
                                            <p className='text-xs pr-2'>{t('notifications.approveStudentFlight.clubName')}</p>
                                            <div className={`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`} id='data'>
                                                <p>{fullPracticalActivityData.data.clubName}</p>
                                            </div>
                                        </div>
                                    }

                                    {/* equipment */}
                                    <div className='w-full flex col-span-6'>
                                        <DropDownLine
                                            onClickActivation={() => setDropDownEquipment(!DropDownEquipment)}
                                            title={t('notifications.approveStudentFlight.equipmentDetails')}
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
                                                    <p className='text-xs pr-2'>{t('notifications.approveStudentFlight.wing')}</p>
                                                    <div className={`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`} id='data'>
                                                        <p>{fullPracticalActivityData.data.wing}</p>
                                                    </div>
                                                </div>
                                            }
                                            {
                                                fullPracticalActivityData.data.harness &&
                                                <div className='flex flex-col items-start gap-y-3 col-span-6'>
                                                    <p className='text-xs pr-2'>{t('notifications.approveStudentFlight.harness')}</p>
                                                    <div className={`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`} id='data'>
                                                        <p>{fullPracticalActivityData.data.harness}</p>
                                                    </div>
                                                </div>
                                            }
                                            {
                                                fullPracticalActivityData.data.parachute &&
                                                <div className='flex flex-col items-start gap-y-3 col-span-6'>
                                                    <p className='text-xs pr-2'>{t('notifications.approveStudentFlight.parachute')}</p>
                                                    <div className={`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`} id='data'>
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
                                            title={t('notifications.approveStudentFlight.situation')}
                                            dropDown={DropDownSituation}
                                            isActive={DropDownSituation}
                                        />
                                    </div>
                                    {
                                        DropDownSituation &&
                                        <>
                                            {
                                                fullPracticalActivityData.data?.groundHandling &&
                                                <div className='col-span-6'>
                                                    <SelectLocationGoogle
                                                        selectedLocation={{ lat: fullPracticalActivityData.data.groundHandling.locationLatitude, lng: fullPracticalActivityData.data.groundHandling.locationLongitude }}
                                                        setSelectedLocation={setSelectedLocation}
                                                    />
                                                </div>
                                            }
                                            {
                                                fullPracticalActivityData.data.flight?.country &&
                                                <div className='flex flex-col items-start gap-y-3 col-span-3'>
                                                    <p className='text-xs pr-2'>{t('notifications.approveStudentFlight.country')}</p>
                                                    <div className={`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`} id='data'>
                                                        <p>{fullPracticalActivityData.data.flight.country}</p>
                                                    </div>
                                                </div>
                                            }
                                            {
                                                fullPracticalActivityData.data.flight?.province &&
                                                <div className='flex flex-col items-start gap-y-3 col-span-3'>
                                                    <p className='text-xs pr-2'>{t('notifications.approveStudentFlight.province')}</p>
                                                    <div className={`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`} id='data'>
                                                        <p>{fullPracticalActivityData.data.flight.province}</p>
                                                    </div>
                                                </div>
                                            }
                                            {
                                                fullPracticalActivityData.data.flight?.site &&
                                                <div className='flex flex-col items-start gap-y-3 col-span-3'>
                                                    <p className='text-xs pr-2'>{t('notifications.approveStudentFlight.site')}</p>
                                                    <div className={`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`} id='data'>
                                                        <p>{fullPracticalActivityData.data.flight.site}</p>
                                                    </div>
                                                </div>
                                            }
                                            {
                                                fullPracticalActivityData.data.cloudCoverType &&
                                                <div className='flex flex-col items-start gap-y-3 col-span-3'>
                                                    <p className='text-xs pr-2'>{t('notifications.approveStudentFlight.cloudType')}</p>
                                                    <div className={`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`} id='data'>
                                                        <p>{fullPracticalActivityData.data.cloudCoverType}</p>
                                                    </div>
                                                </div>
                                            }
                                            {
                                                fullPracticalActivityData.data.startTime && !isForFlight &&
                                                <div className='flex flex-col items-start gap-y-3 col-span-3'>
                                                    <p className='text-xs pr-2'>{t('notifications.approveStudentFlight.startTime')}</p>
                                                    <div className={`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`} id='data'>
                                                        <p>{fullPracticalActivityData.data.startTime}</p>
                                                    </div>
                                                </div>
                                            }
                                            {
                                                fullPracticalActivityData.data.finishTime && !isForFlight &&
                                                <div className='flex flex-col items-start gap-y-3 col-span-3'>
                                                    <p className='text-xs pr-2'>{t('notifications.approveStudentFlight.finishTime')}</p>
                                                    <div className={`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`} id='data'>
                                                        <p>{fullPracticalActivityData.data.finishTime}</p>
                                                    </div>
                                                </div>
                                            }
                                            {
                                                fullPracticalActivityData.data?.groundHandling?.windDirection &&
                                                <div className='flex flex-col items-start gap-y-3 col-span-3'>
                                                    <p className='text-xs pr-2'>{t('notifications.approveStudentFlight.windDirection')}</p>
                                                    <div className={`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`} id='data'>
                                                        <p>{fullPracticalActivityData.data.groundHandling.windDirection}</p>
                                                    </div>
                                                </div>
                                            }
                                            {
                                                fullPracticalActivityData.data?.groundHandling?.windSpeedInKmh &&
                                                <div className='flex flex-col items-start gap-y-3 col-span-3'>
                                                    <p className='text-xs pr-2'>{t('notifications.approveStudentFlight.windSpeedKmh')}</p>
                                                    <div className={`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`} id='data'>
                                                        <p>{fullPracticalActivityData.data.groundHandling.windSpeedInKmh}</p>
                                                    </div>
                                                </div>
                                            }
                                        </>
                                    }

                                    {/* takeoff */}
                                    {
                                        isForFlight &&
                                        <>
                                            <div className='w-full flex col-span-6'>
                                                <DropDownLine
                                                    onClickActivation={() => setDropDownTakeoff(!DropDownTakeoff)}
                                                    title={t('notifications.approveStudentFlight.takeoff')}
                                                    dropDown={DropDownTakeoff}
                                                    isActive={DropDownTakeoff}
                                                />
                                            </div>
                                            {
                                                DropDownTakeoff &&
                                                <>
                                                    {
                                                        fullPracticalActivityData.data.flight?.takeOffType &&
                                                        <div className='flex flex-col items-start gap-y-3 col-span-3'>
                                                            <p className='text-xs pr-2'>{t('notifications.approveStudentFlight.takeoffType')}</p>
                                                            <div className={`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`} id='data'>
                                                                <p>{fullPracticalActivityData.data.flight.takeOffType}</p>
                                                            </div>
                                                        </div>
                                                    }
                                                    {
                                                        fullPracticalActivityData.data.startTime &&
                                                        <div className='flex flex-col items-start gap-y-3 col-span-3'>
                                                            <p className='text-xs pr-2'>{t('notifications.approveStudentFlight.takeoffTime')}</p>
                                                            <div className={`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`} id='data'>
                                                                <p>{fullPracticalActivityData.data.startTime}</p>
                                                            </div>
                                                        </div>
                                                    }
                                                    {
                                                        fullPracticalActivityData.data.flight?.takeOffWindSpeedInKmh &&
                                                        <div className='flex flex-col items-start gap-y-3 col-span-3'>
                                                            <p className='text-xs pr-2'>{t('notifications.approveStudentFlight.takeoffWindSpeed')}</p>
                                                            <div className={`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`} id='data'>
                                                                <p>{fullPracticalActivityData.data.flight?.takeOffWindSpeedInKmh}</p>
                                                            </div>
                                                        </div>
                                                    }
                                                    {
                                                        fullPracticalActivityData.data.flight?.takeOffWindDirection &&
                                                        <div className='flex flex-col items-start gap-y-3 col-span-3'>
                                                            <p className='text-xs pr-2'>{t('notifications.approveStudentFlight.takeoffWindDirection')}</p>
                                                            <div className={`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`} id='data'>
                                                                <p>{fullPracticalActivityData.data.flight?.takeOffWindDirection}</p>
                                                            </div>
                                                        </div>
                                                    }
                                                </>
                                            }
                                        </>
                                    }

                                    {
                                        isForFlight &&
                                        <>
                                            {/* landing */}
                                            <div className='w-full flex col-span-6'>
                                                <DropDownLine
                                                    onClickActivation={() => setDropDownLanding(!DropDownLanding)}
                                                    title={t('notifications.approveStudentFlight.landing')}
                                                    dropDown={DropDownLanding}
                                                    isActive={DropDownLanding}
                                                />
                                            </div>
                                            {
                                                DropDownLanding &&
                                                <>
                                                    {
                                                        fullPracticalActivityData.data.flight?.landingWindSpeedInKmh &&
                                                        <div className='flex flex-col items-start gap-y-3 col-span-3'>
                                                            <p className='text-xs pr-2'>{t('notifications.approveStudentFlight.landingWindSpeed')}</p>
                                                            <div className={`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`} id='data'>
                                                                <p>{fullPracticalActivityData.data.flight.landingWindSpeedInKmh}</p>
                                                            </div>
                                                        </div>
                                                    }
                                                    {
                                                        fullPracticalActivityData.data.flight?.landingWindDirection &&
                                                        <div className='flex flex-col items-start gap-y-3 col-span-3'>
                                                            <p className='text-xs pr-2'>{t('notifications.approveStudentFlight.landingWindDirection')}</p>
                                                            <div className={`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`} id='data'>
                                                                <p>{fullPracticalActivityData.data.flight.landingWindDirection}</p>
                                                            </div>
                                                        </div>
                                                    }
                                                    {
                                                        fullPracticalActivityData.data.finishTime &&
                                                        <div className='flex flex-col items-start gap-y-3 col-span-3'>
                                                            <p className='text-xs pr-2'>{t('notifications.approveStudentFlight.landingTime')}</p>
                                                            <div className={`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`} id='data'>
                                                                <p>{fullPracticalActivityData.data.finishTime}</p>
                                                            </div>
                                                        </div>
                                                    }
                                                </>
                                            }
                                        </>
                                    }
                                </div>
                                
                                <div className='w-full flex justify-between gap-x-[6%]'>

                                    <button type="submit" onClick={handleDecline} className={`${ButtonStyles.normalButton} w-full`}>{t('notifications.approveStudentFlight.declineFlight')}</button>
                                    
                                    <div className='w-full flex items-center flex-row-reverse relative'>
                                        <button type="submit" onClick={handleSubmit} className={`${ButtonStyles.addButton} w-full flex`}>{t('notifications.approveStudentFlight.confirm')}</button>
                                    </div>

                                </div>


                            </form>
                }

            </div>

        </div>
    );
};

export default ApproveStudentFlight;