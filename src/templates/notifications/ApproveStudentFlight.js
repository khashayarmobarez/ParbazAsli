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

const ApproveStudentFlight = () => {

    const { id } = useParams()
    const appTheme = Cookies.get('themeApplied') || 'dark';
    
    const [DropDownEquipment, setDropDownEquipment] = useState(true)
    const [DropDownSituation, setDropDownSituation] = useState(true)
    const [DropDownTakeoff, setDropDownTakeoff] = useState(true)
    const [DropDownLanding, setDropDownLanding] = useState(true)

    const [courseId, setCourseId] = useState('')

    const navigate = useNavigate()

    const {  data: UserCourseFlightData } = useUserCourseFlight(id);
    const { data: fullPracticalActivityData } = usePracticalActivity(id);
    const { mutate: mutateDecline } = useDeclineUserFlight();

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
                toast('پرواز رد صلاحیت شد', {
                    type: 'success', // Specify the type of toast (e.g., 'success', 'error', 'info', 'warning')
                    position: 'top-right', // Set the position (e.g., 'top-left', 'bottom-right')
                    autoClose: 3000,
                    theme: appTheme,
                    style: { width: "350px" }
                });
                navigate(`/notifications`)
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
            }
        })
    } 

    return (

        <div className='pt-14 flex flex-col justify-center items-center gap-y-2'>

            <PageTitle title={'تایید پرواز'} />  

            {
                UserCourseFlightData && fullPracticalActivityData &&
                    <form className={`  w-[90%] rounded-xl flex flex-col items-center pb-10 pt-4 gap-y-8`}>

                            <div className=' grid grid-cols-6 gap-x-4 gap-y-4 w-full text-sm'>

                                {
                                fullPracticalActivityData.data.studentName &&
                                    <div className='flex flex-col items-start col-span-3 gap-y-3'>
                                        <p className=' text-xs pr-2'>نام هنرجو</p>
                                        <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                            <p>{fullPracticalActivityData.data.studentName}</p>
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
                                    fullPracticalActivityData.data.index >= 0 &&
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
                                    fullPracticalActivityData.data.durationInMinutes &&
                                        <div className='flex flex-col items-start col-span-2 gap-y-3'>
                                            <p className=' text-xs pr-2'>زمان پرواز</p>
                                            <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                                <p>{fullPracticalActivityData.data.durationInMinutes}min</p>
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
                                        fullPracticalActivityData.data.flight?.country &&
                                            <div className='flex flex-col items-start gap-y-3 col-span-3'>
                                                <p className=' text-xs pr-2'>کشور</p>
                                                <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                                    <p>{fullPracticalActivityData.data.flight.country}</p>
                                                </div>
                                            </div>
                                        }
                                        {
                                        fullPracticalActivityData.data.flight?.province &&
                                            <div className='flex flex-col items-start gap-y-3 col-span-3'>
                                                <p className=' text-xs pr-2'>استان</p>
                                                <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                                    <p>{fullPracticalActivityData.data.flight.province}</p>
                                                </div>
                                            </div>
                                        }
                                        {
                                        fullPracticalActivityData.data.flight?.site &&
                                            <div className='flex flex-col items-start gap-y-3 col-span-3'>
                                                <p className=' text-xs pr-2'>سایت</p>
                                                <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                                    <p>{fullPracticalActivityData.data.flight.site}</p>
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
                                            fullPracticalActivityData.data.flight?.takeOffType &&
                                            <div className='flex flex-col items-start gap-y-3 col-span-3'>
                                                <p className=' text-xs pr-2'>شیوه Takeoff</p>
                                                <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                                    <p>{fullPracticalActivityData.data.flight.takeOffType}</p>
                                                </div>
                                            </div>
                                        }
                                        
                                        {
                                            fullPracticalActivityData.data.startTime &&
                                                <div className='flex flex-col items-start gap-y-3 col-span-3'>
                                                    <p className=' text-xs pr-2'>ساعت Takeoff</p>
                                                    <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                                        <p>{fullPracticalActivityData.data.startTime}</p>
                                                    </div>
                                                </div>
                                        }

                                        {
                                            fullPracticalActivityData.data.flight?.takeOffWindSpeedInKmh &&
                                            <div className='flex flex-col items-start gap-y-3 col-span-3'>
                                                <p className=' text-xs pr-2'>سرعت باد Takeoff</p>
                                                <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                                    <p>{fullPracticalActivityData.data.flight?.takeOffWindSpeedInKmh}</p>
                                                </div>
                                            </div>
                                        }


                                        {
                                            fullPracticalActivityData.data.flight?.takeOffWindDirection &&
                                            <div className='flex flex-col items-start gap-y-3 col-span-3'>
                                                <p className=' text-xs pr-2'>جهت باد Takeoff</p>
                                                <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                                    <p>{fullPracticalActivityData.data.flight?.takeOffWindDirection}</p>
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
                                                fullPracticalActivityData.data.flight?.landingWindSpeedInKmh &&
                                                <div className='flex flex-col items-start gap-y-3 col-span-3'>
                                                    <p className=' text-xs pr-2'>سرعت باد Landing</p>
                                                    <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                                        <p>{fullPracticalActivityData.data.flight.landingWindSpeedInKmh}</p>
                                                    </div>
                                                </div>
                                            }

                                            {
                                                fullPracticalActivityData.data.flight?.landingWindDirection &&
                                                <div className='flex flex-col items-start gap-y-3 col-span-3'>
                                                    <p className=' text-xs pr-2'>جهت باد Landing</p>
                                                    <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                                        <p>{fullPracticalActivityData.data.flight.landingWindDirection}</p>
                                                    </div>
                                                </div>
                                            }

                                            {
                                                fullPracticalActivityData.data.startTime &&
                                                <div className='flex flex-col items-start gap-y-3 col-span-3'>
                                                    <p className=' text-xs pr-2'>زمان Landing</p>
                                                    <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                                        <p>{fullPracticalActivityData.data.startTime}</p>
                                                    </div>
                                                </div>
                                            }
                                        </>
                                    }
                            </div>
                            
                            <div className='w-full flex justify-between gap-x-[6%]'>

                                <button type="submit" onClick={handleDecline} className={`${ButtonStyles.normalButton} w-full `}>رد پرواز</button>

                                <div className='w-full flex items-center flex-row-reverse'>
                                    <ArrowBackIosNewIcon sx={{position:'absolute', marginLeft:'20px'}} />
                                    <button type="submit" onClick={handleSubmit} className={`${ButtonStyles.addButton} w-full flex`}>تایید</button>
                                </div>

                            </div>


                        </form>
            }


        </div>
    );
};

export default ApproveStudentFlight;