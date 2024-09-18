import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// styles
import gradients from '../../../styles/gradients/Gradient.module.css'

// mui
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

// queries
import { useDeclineUserFlight } from '../../../Utilities/Services/coursesQueries';

// assets
import timer from '../../../assets/icons/timer.svg'
import check from '../../../assets/icons/checkGreen.svg'


const PracticalFlightHistoryBox = (props) => {

    const navigate = useNavigate()
    const { flightBaseData, isForClubCourseStudent, isForEducationCourseStudent } = props;

    const { mutate: mutateDecline , isLoading: declineLoading} = useDeclineUserFlight();

    // for changing the color of the texts when user clicked and expand it  


    const handleClick = (id) => {
        !isForClubCourseStudent && !isForEducationCourseStudent && navigate(`/flightHistory/${id}`)
        isForClubCourseStudent && navigate(`/club/courseDetails/studentDetails/aStudentFlight/${flightBaseData.id}`)
        isForEducationCourseStudent && navigate(`/education/courseDetails/studentDetails/aStudentFlight/${flightBaseData.id}`)
    }

    const handleDecline = (event, id) => {

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
    <div className='flex flex-col gap-y-4'>

        {/* the below part should be mapped when data is recieved from server */}
                {/* classesInput */}
                {
                    flightBaseData &&
                    <div className='w-full flex flex-col items-center'>
                        <div onClick={() => handleClick(flightBaseData.id)} className={`${gradients.container} flex w-full justify-between items-center h-12 pl-3 rounded-2xl text-xs z-10`} >
                            <button className={`${gradients.clipboardButtonBackgroundGradient} w-14 h-full flex items-center justify-center rounded-r-xl`}>
                                <p>{flightBaseData.index}</p>
                            </button>
                            <p>{flightBaseData.takeOffDateAndFlightDuration && flightBaseData.takeOffDateAndFlightDuration}</p>
                            <p>{flightBaseData.city && flightBaseData.city.slice(0, 10)}</p>
                            <p>{flightBaseData.site && flightBaseData.site.slice(0, 14)}</p>
                            { flightBaseData.status === 'Pending' &&
                                <img src={timer} alt='timer' />
                            }
                            { flightBaseData.status === 'Accepted' &&
                                <img src={check} alt='check' />
                            }
                        </div>
                        {/* Trigger flight status */}
                        {flightBaseData.status === 'Pending' &&
                            <div className='w-full min-h-16 rounded-b-2xl z-0 mt-[-1rem] pt-5 flex justify-between px-4' 
                            style={{background: 'var(--syllabus-data-boxes-bg)',
                                boxShadow: 'var(--organs-coachData-boxShadow)'}}>

                                <div className='flex justify-center text-xs gap-x-2 items-center gap-y-10'>
                                    <div className='w-2 h-2 rounded-full' style={{backgroundColor:'var(--notification-red)'}}></div>
                                    <p >آیا این دوره مورد تایید شما است؟</p>
                                </div>

                                <div className='flex gap-x-6 items-center px-2'>

                                    {declineLoading && 
                                        <Box sx={{ display: 'flex', width:'full' , justifyContent:'center' }}>
                                            <CircularProgress sx={{width:'1rem'}} /> 
                                        </Box>
                                    }
                                    
                                    <p onClick={() => navigate(`/addFlight/ReviewStudentsFlight/${flightBaseData.id}`)} disabled={declineLoading} className='text-[var(--yellow-text)] text-sm font-medium'  >
                                        تایید
                                    </p>

                                    <p onClick={(event) => handleDecline(event, flightBaseData.id)} disabled={declineLoading} className='text-[var(--red-text)] text-sm font-medium' >
                                        رد
                                    </p>

                                </div>
                            </div>
                        } 
                    </div>
                }
        

    </div>
    );
};

export default PracticalFlightHistoryBox;