import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';

// styles
import gradients from '../../styles/Gradient.module.css'

// mui
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

// queries
import { useDeclineUserFlight } from '../../Utilities/Services/coursesQueries';

// assets
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import CheckIcon from '@mui/icons-material/Check';
import NotInterestedIcon from '@mui/icons-material/NotInterested';
import GroundHandlingIcon from '../../elements/icons/GroundHandlingIcon';
import { useTranslation } from '../../Utilities/context/TranslationContext';


const PracticalFlightHistoryBox = (props) => {

    // language
    const dir = Cookies.get('dir') || 'ltr';
    const { t } = useTranslation();

    const appTheme = Cookies.get('themeApplied') || 'dark';

    const navigate = useNavigate()
    const location = useLocation()
    const { flightBaseData, isForClubCourseStudent, isForEducationCourseStudent } = props;

    const { mutate: mutateDecline , isLoading: declineLoading} = useDeclineUserFlight();

    
    const isForGroundHandling = flightBaseData.type === 'GroundHandling'


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
                toast(t("flightHistory.notifications.declineSuccess"), {
                    type: 'success', // Specify the type of toast (e.g., 'success', 'error', 'info', 'warning')
                    position: 'top-center', // Set the position (e.g., 'top-left', 'bottom-right')
                    autoClose: 3000,
                    theme: appTheme,
                    style: { width: "350px" }
                });
            },
            onError: (error) => {
                let errorMessage = t("flightHistory.notifications.declineError");
                if (error.response && error.response.data && error.response.data.ErrorMessages) {
                    errorMessage = error.response.data.ErrorMessages[0].ErrorMessage;
                }
                toast(errorMessage, {
                    type: 'error', // Specify the type of toast (e.g., 'success', 'error', 'info', 'warning')
                    position: 'top-center', // Set the position (e.g., 'top-left', 'bottom-right')
                    autoClose: 3000,
                    theme: appTheme,
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
                        <div onClick={() => handleClick(flightBaseData.id)} className={`${gradients.container} flex w-full justify-between items-center h-12 rounded-2xl text-xs z-10
                        ${dir === 'ltr' ? 'pr-4' : 'pl-4'}`} >
                            <button className={`${gradients.clipboardButtonBackgroundGradient} w-[52px] h-full flex items-center justify-center 
                            ${dir === 'ltr' ? 'rounded-l-2xl' : 'rounded-r-2xl'}`}>
                                {
                                    isForGroundHandling ?
                                    <div className='w-full h-full p-3.5'>
                                        <GroundHandlingIcon customColor={'var(--text-accent)'} />
                                    </div>
                                    :
                                    <p>{flightBaseData.index}</p>
                                }
                            </button>
                            <p>
                                {flightBaseData.startDateAndDuration && flightBaseData.startDateAndDuration}
                            </p>
                            <p>
                                {flightBaseData.province && flightBaseData.province.slice(0, 10)}
                            </p>
                            {
                                isForGroundHandling ?
                                    <p className='text-textAccent'>{t("flightHistory.labels.groundHandling")}</p>
                                    :
                                    <p>
                                        {flightBaseData.site && flightBaseData.site.slice(0, 14)}
                                    </p>
                            }
                            {
                            flightBaseData.status === 'Pending' &&
                                <TimerOutlinedIcon sx={{width:'20px',height:'20px', color:'var(--text-warning)'}} />
                            }
                            {
                            flightBaseData.status === 'Accepted' &&
                                <CheckIcon sx={{width:'20px',height:'20px', color:'var(--text-accent)'}} />
                            }
                            {
                            flightBaseData.status === 'Rejected' &&
                                <NotInterestedIcon sx={{width:'20px',height:'20px', color:'var(--text-error)'}} />
                            }
                        </div>
                        {/* Trigger flight status */}
                        {flightBaseData.status === 'Pending' && location.pathname.includes('/education/courseDetails/studentDetails') &&
                            <div className='w-full min-h-14 rounded-b-2xl z-0 mt-[-1rem] pt-4 flex justify-between px-4' 
                            style={{background: 'var(--bg-output-selected-option)',
                            boxShadow: 'var(--shadow-all)'}}>

                                <div className='flex justify-center text-xs gap-x-2 items-center gap-y-10'>
                                    <div className='w-2 h-2 rounded-full' style={{backgroundColor:'var(--text-error)'}}></div>
                                    <p>{t("flightHistory.messages.confirmActivity")}</p>
                                </div>

                                <div className='flex gap-x-6 items-center px-2'>

                                    {
                                    declineLoading && 
                                        <Box sx={{ display: 'flex', width:'full' , justifyContent:'center' }}>
                                            <CircularProgress sx={{width:'1rem'}} /> 
                                        </Box>
                                    }
                                    
                                    <p onClick={() => navigate(`/addFlight/ReviewStudentsFlight/${flightBaseData.id}`)} disabled={declineLoading} className='text-[var(--text-accent)] text-sm font-medium'  >
                                        {t("flightHistory.buttons.approve")}
                                    </p>

                                    <p onClick={(event) => handleDecline(event, flightBaseData.id)} disabled={declineLoading} className='text-[var(--text-error)] text-sm font-medium' >
                                        {t("flightHistory.buttons.decline")}
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