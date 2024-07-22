import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// styles
import boxStyles from '../../../styles/Boxes/DataBox.module.css'
import ButtonStyles from '../../../styles/Buttons/ButtonsBox.module.css'

// queries
import { useDeclineUserFlight, useUserCourseFlight } from '../../../Utilities/Services/coursesQueries';

// comps
import PageTitle from '../../reuseable/PageTitle';
import { toast } from 'react-toastify';

const ApproveStudentFlight = () => {

    const { id } = useParams()

    const [courseId, setCourseId] = useState('')

    const navigate = useNavigate()

    const {  data: UserCourseFlightData, isLoading: UserCourseFlightLoading, error: UserCourseFlightError } = useUserCourseFlight(id);
    const { mutate: mutateDecline , isLoading: declineLoading, error: declineError} = useDeclineUserFlight();

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
                    theme: 'dark',
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
                    theme: 'dark',
                    style: { width: "350px" }
                });
            }
        })
    } 

    return (

        <div className='pt-14 flex flex-col justify-center items-center gap-y-2'>

            <PageTitle title={'تایید پرواز'} />  

            {
                UserCourseFlightData &&
                    <form className={`  w-[90%] rounded-xl flex flex-col items-center py-10 gap-y-8`}>

                            <div className=' grid grid-cols-2 gap-x-4 gap-y-7 w-full px-4'>

                                {/* <div className='flex flex-col items-start gap-y-3'>
                                    <p className=' text-xs pr-2'>مدل/ کلاس</p>
                                    <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                        <p>{UserCourseFlightData.data.}</p>
                                    </div>
                                </div> */}
                                {
                                    UserCourseFlightData.data.takeOffWindSpeedInKmh &&
                                        <div className='flex flex-col items-start gap-y-3'>
                                            <p className=' text-xs pr-2'>سرعت باد Takeoff</p>
                                            <div className={`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`} id='data' >
                                                <p>{UserCourseFlightData.data.takeOffWindSpeedInKmh} kmh</p>
                                            </div>
                                        </div>
                                }

                                {
                                    UserCourseFlightData.data.takeOffWindDirection &&
                                        <div className='flex flex-col items-start gap-y-3'>
                                            <p className=' text-xs pr-2'>جهت باد Takeoff</p>
                                            <div className={`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`} id='data' >
                                                <p>{UserCourseFlightData.data.takeOffWindDirection}</p>
                                            </div>
                                        </div>
                                }

                                {
                                    UserCourseFlightData.data.takeOffType &&
                                        <div className='flex flex-col items-start gap-y-3'>
                                            <p className=' text-xs pr-2'>شیوه Takeoff</p>
                                            <div className={`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`} id='data' >
                                                <p>{UserCourseFlightData.data.takeOffType}</p>
                                            </div>
                                        </div>
                                }

                                {
                                    UserCourseFlightData.data.takeOffDateTime &&
                                        <div className='flex flex-col items-start gap-y-3'>
                                            <p className=' text-xs pr-2'>زمان Takeoff</p>
                                            <div className={`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`} id='data' >
                                                <p>{UserCourseFlightData.data.takeOffDateTime}</p>
                                            </div>
                                        </div>
                                }

                                {
                                    UserCourseFlightData.data.landingWindSpeedInKmh &&
                                        <div className='flex flex-col items-start gap-y-3'>
                                            <p className=' text-xs pr-2'>سرعت باد Landing</p>
                                            <div className={`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`} id='data' >
                                                <p>{UserCourseFlightData.data.landingWindSpeedInKmh} kmh</p>
                                            </div>
                                        </div>
                                }

                                {
                                    UserCourseFlightData.data.landingWindDirection &&
                                        <div className='flex flex-col items-start gap-y-3'>
                                            <p className=' text-xs pr-2'>جهت باد Landing</p>
                                            <div className={`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`} id='data' >
                                                <p>{UserCourseFlightData.data.landingWindDirection}</p>
                                            </div>
                                        </div>
                                }

                                {
                                    UserCourseFlightData.data.landingDateTime &&
                                        <div className='flex flex-col items-start gap-y-3'>
                                            <p className=' text-xs pr-2'>زمان Landing</p>
                                            <div className={`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`} id='data' >
                                                <p>{UserCourseFlightData.data.landingDateTime}</p>
                                            </div>
                                        </div>
                                }

                                {
                                    UserCourseFlightData.data.cloudCoverType &&
                                        <div className='flex flex-col items-start gap-y-3'>
                                            <p className=' text-xs pr-2'>نوع پوشش ابری</p>
                                            <div className={`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`} id='data' >
                                                <p>{UserCourseFlightData.data.cloudCoverType}</p>
                                            </div>
                                        </div>
                                }

                                {
                                    UserCourseFlightData.data.flightDurationInMinutes &&
                                        <div className='flex flex-col items-start gap-y-3'>
                                            <p className=' text-xs pr-2'>مدت زمان پرواز</p>
                                            <div className={`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`} id='data' >
                                                <p>{UserCourseFlightData.data.flightDurationInMinutes}</p>
                                            </div>
                                        </div>
                                }

                                {
                                    UserCourseFlightData.data.coachName &&
                                        <div className='flex flex-col items-start gap-y-3'>
                                            <p className=' text-xs pr-2'>نام مربی</p>
                                            <div className={`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`} id='data' >
                                                <p>{UserCourseFlightData.data.coachName}</p>
                                            </div>
                                        </div>
                                }

                                {
                                    UserCourseFlightData.data.wing &&
                                        <div className='flex flex-col items-start gap-y-3'>
                                            <p className=' text-xs pr-2'>بال</p>
                                            <div className={`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`} id='data' >
                                                <p>{UserCourseFlightData.data.wing}</p>
                                            </div>
                                        </div>
                                }

                                {
                                    UserCourseFlightData.data.harness &&
                                        <div className='flex flex-col items-start gap-y-3'>
                                            <p className=' text-xs pr-2'>هارنس</p>
                                            <div className={`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`} id='data' >
                                                <p>{UserCourseFlightData.data.harness}</p>
                                            </div>
                                        </div>
                                }

                                {
                                    UserCourseFlightData.data.passengerHarness &&
                                        <div className='flex flex-col items-start gap-y-3'>
                                            <p className=' text-xs pr-2'>چتر مسافر</p>
                                            <div className={`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`} id='data' >
                                                <p>{UserCourseFlightData.data.passengerHarness}</p>
                                            </div>
                                        </div>
                                }

                                {
                                    UserCourseFlightData.data.parachute &&
                                        <div className='flex flex-col items-start gap-y-3'>
                                            <p className=' text-xs pr-2'>چتر</p>
                                            <div className={`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`} id='data' >
                                                <p>{UserCourseFlightData.data.parachute}</p>
                                            </div>
                                        </div>
                                }

                                {
                                    UserCourseFlightData.data.site &&
                                        <div className='flex flex-col items-start gap-y-3'>
                                            <p className=' text-xs pr-2'>سایت</p>
                                            <div className={`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`} id='data' >
                                                <p>{UserCourseFlightData.data.site}</p>
                                            </div>
                                        </div>
                                }

                                {
                                    UserCourseFlightData.data.status &&
                                        <div className='flex flex-col items-start gap-y-3'>
                                            <p className=' text-xs pr-2'>وضعیت</p>
                                            <div className={`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`} id='data' >
                                                <p>{UserCourseFlightData.data.status}</p>
                                            </div>
                                        </div>
                                }

                            </div>
                            
                            <div className='w-full flex justify-around'>

                                <button type="submit" onClick={handleSubmit} className={`${ButtonStyles.addButton} w-36 `}>نایید</button>

                                <button type="submit" onClick={handleDecline} className={`${ButtonStyles.normalButton} w-36 `}>رد پرواز</button>

                            </div>




                        </form>
            }


        </div>
    );
};

export default ApproveStudentFlight;