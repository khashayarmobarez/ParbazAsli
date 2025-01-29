import React from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

// queries
import { useTriggerClubStatus, useTriggerCourseStatus, useTriggerStudentStatus } from '../../Utilities/Services/coursesQueries';

// mui
import CloseIcon from '@mui/icons-material/Close';

// styles
import boxStyles from '../../styles/DataBox.module.css';
import ButtonStyles from '../../styles/ButtonsBox.module.css';
import { toast } from 'react-toastify';
import { useTriggerEquipmentStatus } from '../../Utilities/Services/equipmentQueries';

// context
import { useTranslation } from '../../Utilities/context/TranslationContext';

const PopupForNotif = ({popUpData, setPopUpData}) => {

    // language
    const { t } = useTranslation();

    const navigate = useNavigate()
    
    const appTheme = Cookies.get('themeApplied') || 'dark';

    const { mutate: triggerClubStatus, isLoading: triggerClubStatusLoading } = useTriggerClubStatus();

    const handleTriggerClubStatus = (status ,id, event) => {

        event.preventDefault();

        const triggerStatusForm = {
            coachId: id,
            status: status
        }

        triggerClubStatus(triggerStatusForm,{
            onSuccess: (data) => {
                // Handle success, e.g., show a notification, reset the form, etc.
                if(status === 'Active') {
                    toast(t('notifications.popup.clubApproved'), {
                        type: 'success', // Specify the type of toast (e.g., 'success', 'error', 'info', 'warning')
                        position: 'top-right', // Set the position (e.g., 'top-left', 'bottom-right')
                        autoClose: 3000,
                        theme: appTheme,
                        style: { width: "350px" }
                    });
                } else {
                    toast(t('notifications.popup.clubRejected'), {
                        type: 'success', // Specify the type of toast (e.g., 'success', 'error', 'info', 'warning')
                        position: 'top-right', // Set the position (e.g., 'top-left', 'bottom-right')
                        autoClose: 3000,
                        theme: appTheme,
                        style: { width: "350px" }
                    });
                }
                window.location.reload();
            },
        });
    }

    const { mutate: triggerCourseStatus, isLoading: triggerCourseStatusLoading } = useTriggerCourseStatus();

    const handleTriggerCourseStatus = (status ,id, event) => {

        event.preventDefault();

        const triggerStatusForm = {
            courseId: id,
            status: status
        }

        triggerCourseStatus(triggerStatusForm,{
            onSuccess: () => {
                // Handle success, e.g., show a notification, reset the form, etc.
                window.location.reload();
                if(status === 'active') {
                    toast(t('notifications.popup.courseApproved'), {
                        type: 'success', // Specify the type of toast (e.g., 'success', 'error', 'info', 'warning')
                        position: 'top-right', // Set the position (e.g., 'top-left', 'bottom-right')
                        autoClose: 3000,
                        theme: appTheme,
                        style: { width: "350px" }
                    });
                } else {
                    toast(t('notifications.popup.courseRejected'), {
                        type: 'success', // Specify the type of toast (e.g., 'success', 'error', 'info', 'warning')
                        position: 'top-right', // Set the position (e.g., 'top-left', 'bottom-right')
                        autoClose: 3000,
                        theme: appTheme,
                        style: { width: "350px" }
                    });
                }
                window.location.reload();
            },
        });
    }

    const { mutate: triggerStudentStatus, isLoading: triggerStudentStatusLoading } = useTriggerStudentStatus();

    const handleTriggerStudentStatus = (status ,id, event) => {

        event.preventDefault();

        const triggerStatusForm = {
            userCourseId: id,
            status: status
        }

        triggerStudentStatus(triggerStatusForm,{
            onSuccess: (data) => {
                if(status === 'active') {
                    toast(t('notifications.popup.studentApproved'), {
                        type: 'success', // Specify the type of toast (e.g., 'success', 'error', 'info', 'warning')
                        position: 'top-right', 
                        autoClose: 3000,
                        theme: appTheme,
                        style: { width: "350px" }
                    });
                } else {
                    toast(t('notifications.popup.studentRejected'), {
                        type: 'success', // Specify the type of toast (e.g., 'success', 'error', 'info', 'warning')
                        position: 'top-right',
                        autoClose: 3000,
                        theme: appTheme,
                        style: { width: "350px" }
                    });
                }
                window.location.reload();
            },
        });
    }



    const { mutate: mutateTriggerEquipmentStatus, isLoading:loadingTriggerEquipmentStatus } = useTriggerEquipmentStatus()

    const handleSubmittingTransfer = (action, id, event) => {

        event.preventDefault();

        if(action === 'Accepted') {
            // accept
            const formBody = {
                equipmentId: id,
                status: 'Accepted',
            }
            
            mutateTriggerEquipmentStatus(formBody, {
                onSuccess: () => {
                    toast(t('notifications.popup.equipmentApproved'), {
                        type: 'success',
                        position: 'top-right',
                        autoClose: 5000,
                        theme: appTheme,
                        style: { width: "90%" }
                    });
                    // reload
                    setTimeout(() => {
                        window.location.reload();
                    }, 1000);
                }
            }, { onError: (error) => {
                let errorMessage = t('notifications.popup.errorOccurred');
                if (error.response && error.response.data && error.response.data.ErrorMessages) {
                    errorMessage = error.response.data.ErrorMessages[0].ErrorMessage;
                }
                toast(errorMessage, {
                    type: 'error',
                    position: 'top-right',
                    autoClose: 5000,
                    theme: appTheme,
                    style: { width: "90%" }
                });
                }
            })
        } else {
            // decline
            const formBody = {
                equipmentId: id,
                status: 'Rejected',
            }

            mutateTriggerEquipmentStatus(formBody, {
                onSuccess: () => {
                    toast(t('notifications.popup.equipmentRejected'), {
                        type: 'success',
                        position: 'top-right',
                        autoClose: 5000,
                        theme: appTheme,
                        style: { width: "90%" }
                    });
                    // reload
                    setTimeout(() => {
                        window.location.reload();
                    }, 1000);
                }
            }, { onError: (error) => {
                console.log(error)
                let errorMessage =  t('notifications.popup.errorOccurred');
                if (error.response && error.response.data && error.response.data.ErrorMessages) {
                    errorMessage = error.response.data.ErrorMessages[0].ErrorMessage;
                }
                toast(errorMessage, {
                    type: 'error',
                    position: 'top-right',
                    autoClose: 5000,
                    theme: appTheme,
                    style: { width: "90%" }
                });
                }
            })
        }
    }

    return (
        <div className={`z-30 w-full fixed inset-0 flex items-center justify-center backdrop-blur-sm ${popUpData ? 'visible' : 'invisible'}`}>
            <form
            className={`${boxStyles.containerChangeOwnership} w-[90%] md:w-[454px] h-auto flex flex-col justify-around items-center relative bg-white p-4 rounded-lg shadow-lg gap-y-4`}>

            <CloseIcon
                sx={{ cursor: 'pointer', position: 'absolute', top: 16, right: 16 }}
                onClick={() => setPopUpData(null)}
            />

            {
                popUpData &&
                <>
                    <h1 className='text-xl text-textAccent my-4'>{t('notifications.popup.title')}</h1>
                    <p className='text-sm md:text-base'>{popUpData.description}</p>
                    {popUpData.type === 'StudentFlightForm' &&
                        (
                            popUpData.status === 'Expired' ?
                            <button
                                className={`${ButtonStyles.normalButtonDisable} w-7 h-10`}>
                                {t('notifications.popup.setStatus')}
                            </button>
                            :
                            <button
                                onClick={() => navigate(`/addFlight/ReviewStudentsFlight/${parseInt(popUpData.externalId)}`)}
                                className={`${ButtonStyles.normalButton} w-7 h-10 text-sm`}>
                                {t('notifications.popup.setStatus')}
                            </button>
                        )
                    }
                    {popUpData.type === 'TandemPassenger' &&
                        (
                            popUpData.status === 'Expired' ?
                            <button
                                className={`${ButtonStyles.normalButtonDisable} w-7 h-10`}>
                                {t('notifications.popup.setStatus')}
                            </button>
                            :
                            <button
                                onClick={() => navigate(`/addFlight/ReviewStudentsFlight/${parseInt(popUpData.externalId)}`)}
                                className={`${ButtonStyles.normalButton} w-7 h-10 text-sm`}>
                                {t('notifications.popup.setStatus')}
                            </button>
                        )
                    }
                    {popUpData.type === 'AcceptClub' &&
                        <>
                            {
                                popUpData.status === 'Expired' ?
                                <div className='flex w-full justify-between gap-x-2'>
                                    <button
                                        type="submit"
                                        disabled={true}
                                        className={`${ButtonStyles.normalButtonDisable} w-28`}>
                                        {t('notifications.popup.approve')}
                                    </button>
                                    <button
                                        disabled={true}
                                        className={`${ButtonStyles.normalButtonDisable}`}>
                                        {t('notifications.popup.reject')}
                                    </button>
                                </div>
                                :
                                <div className='flex w-full justify-between gap-x-2'>
                                    <button
                                        type="submit"
                                        disabled={triggerStudentStatusLoading}
                                        onClick={(event) => handleTriggerClubStatus('active', parseInt(popUpData.externalId), event)}
                                        className={`${ButtonStyles.addButton} w-28`}>
                                        {t('notifications.popup.approve')}
                                    </button>
                                    <button
                                        disabled={triggerStudentStatusLoading}
                                        onClick={(event) => handleTriggerClubStatus('rejected', parseInt(popUpData.externalId), event)}
                                        className={`${ButtonStyles.normalButton}`}>
                                        {t('notifications.popup.reject')}
                                    </button>
                                </div>
                            }
                        </>
                    }
                    {popUpData.type === 'AcceptStudentInCourse' &&
                        <>
                            {
                                popUpData.status === 'Expired' ?
                                <div className='flex w-full justify-between gap-x-2'>
                                    <button
                                        type="submit"
                                        disabled={true}
                                        className={`${ButtonStyles.normalButtonDisable} w-28`}>
                                        {t('notifications.popup.approve')}
                                    </button>
                                    <button
                                        disabled={true}
                                        className={`${ButtonStyles.normalButtonDisable}`}>
                                        {t('notifications.popup.reject')}
                                    </button>
                                </div>
                                :
                                <div className='flex w-full justify-between gap-x-2'>
                                    <button
                                        type="submit"
                                        disabled={triggerStudentStatusLoading}
                                        onClick={(event) => handleTriggerStudentStatus('active', parseInt(popUpData.externalId), event)}
                                        className={`${ButtonStyles.addButton} w-28`}>
                                        {t('notifications.popup.approve')}
                                    </button>
                                    <button
                                        disabled={triggerStudentStatusLoading}
                                        onClick={(event) => handleTriggerStudentStatus('rejected', parseInt(popUpData.externalId), event)}
                                        className={`${ButtonStyles.normalButton}`}>
                                        {t('notifications.popup.reject')}
                                    </button>
                                </div>
                            }
                        </>
                    }
                    {popUpData.type === 'AcceptCourse' &&
                        <>
                            {
                                popUpData.status === 'Expired' ?
                                null
                                :
                                <div className='flex w-full justify-between gap-x-2'>
                                    <button
                                        type="submit"
                                        disabled={triggerCourseStatusLoading}
                                        onClick={(event) => handleTriggerCourseStatus('active', parseInt(popUpData.externalId), event)}
                                        className={`${ButtonStyles.normalButtonDisable} w-28`}>
                                        {t('notifications.popup.approve')}
                                    </button>
                                    <button
                                        disabled={triggerCourseStatusLoading}
                                        onClick={(event) => handleTriggerCourseStatus('rejected', parseInt(popUpData.externalId), event)}
                                        className={`${ButtonStyles.normalButtonDisable}`}>
                                        {t('notifications.popup.reject')}
                                    </button>
                                </div>
                            }
                        </>
                    }
                    {(popUpData.type === 'AcceptUserEquipment' || popUpData.type === 'AcceptClubEquipment') &&
                        <>
                            {
                                popUpData.status === 'Expired' ?
                                <div className='flex w-full justify-between gap-x-2'>
                                    <button
                                        type="submit"
                                        disabled={true}
                                        className={`${ButtonStyles.normalButtonDisable} w-28`}>
                                        {t('notifications.popup.approve')}
                                    </button>
                                    <button
                                        disabled={true}
                                        className={`${ButtonStyles.normalButtonDisable}`}>
                                        {t('notifications.popup.reject')}
                                    </button>
                                </div>
                                :
                                <div className='flex w-full justify-between gap-x-2'>
                                    <button
                                        type="submit"
                                        disabled={triggerCourseStatusLoading}
                                        onClick={(event) => handleSubmittingTransfer('Accepted', parseInt(popUpData.externalId), event)}
                                        className={`${ButtonStyles.addButton} w-28`}>
                                        {t('notifications.popup.approve')}
                                    </button>
                                    <button
                                        disabled={triggerCourseStatusLoading}
                                        onClick={(event) => handleSubmittingTransfer('Rejected', parseInt(popUpData.externalId), event)}
                                        className={`${ButtonStyles.normalButton}`}>
                                        {t('notifications.popup.reject')}
                                    </button>
                                </div>
                            }
                        </>
                    }
                </>
            }
        </form>
        </div>
    );

};

export default PopupForNotif;
