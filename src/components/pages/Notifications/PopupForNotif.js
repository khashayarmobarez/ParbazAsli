import React from 'react';
import { useNavigate } from 'react-router-dom';

// queries
import { useTriggerClubStatus, useTriggerCourseStatus, useTriggerStudentStatus } from '../../../Utilities/Services/coursesQueries';

// mui
import CloseIcon from '@mui/icons-material/Close';

// styles
import boxStyles from '../../../styles/Boxes/DataBox.module.css';
import ButtonStyles from '../../../styles/Buttons/ButtonsBox.module.css';
import { toast } from 'react-toastify';

const PopupForNotif = ({popUpData, setPopUpData}) => {

    const navigate = useNavigate()

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
                    toast('باشگاه تایید شد', {
                        type: 'success', // Specify the type of toast (e.g., 'success', 'error', 'info', 'warning')
                        position: 'top-right', // Set the position (e.g., 'top-left', 'bottom-right')
                        autoClose: 3000,
                        theme: 'dark',
                        style: { width: "350px" }
                    });
                } else {
                    toast('باشگاه رد شد', {
                        type: 'success', // Specify the type of toast (e.g., 'success', 'error', 'info', 'warning')
                        position: 'top-right', // Set the position (e.g., 'top-left', 'bottom-right')
                        autoClose: 3000,
                        theme: 'dark',
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
                    toast('دوره تایید شد', {
                        type: 'success', // Specify the type of toast (e.g., 'success', 'error', 'info', 'warning')
                        position: 'top-right', // Set the position (e.g., 'top-left', 'bottom-right')
                        autoClose: 3000,
                        theme: 'dark',
                        style: { width: "350px" }
                    });
                } else {
                    toast('دوره رد شد', {
                        type: 'success', // Specify the type of toast (e.g., 'success', 'error', 'info', 'warning')
                        position: 'top-right', // Set the position (e.g., 'top-left', 'bottom-right')
                        autoClose: 3000,
                        theme: 'dark',
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
                    toast('هنرجو تایید شد', {
                        type: 'success', // Specify the type of toast (e.g., 'success', 'error', 'info', 'warning')
                        position: 'top-right', 
                        autoClose: 3000,
                        theme: 'dark',
                        style: { width: "350px" }
                    });
                } else {
                    toast('هنرجو رد شد', {
                        type: 'success', // Specify the type of toast (e.g., 'success', 'error', 'info', 'warning')
                        position: 'top-right',
                        autoClose: 3000,
                        theme: 'dark',
                        style: { width: "350px" }
                    });
                }
                window.location.reload();
            },
        });
    }

    return (
        <div className={` w-full fixed inset-0 flex items-center justify-center ${popUpData ? 'visible' : 'invisible'}`}>
            <form
            className={`${boxStyles.containerChangeOwnership} 
            w-[90%] md:w-[454px] h-auto flex flex-col justify-around items-center relative bg-white p-5 rounded-lg shadow-lg gap-y-6 py-8`}
            >
                <CloseIcon
                    sx={{ cursor: 'pointer', position: 'absolute', top: 16, right: 16 }}
                    onClick={() => setPopUpData(null)}
                />

                {
                    popUpData &&
                    <>
                        <h1 className='text-xl text-[var(--yellow-text)]' >توضیحات</h1>
                        <p className='text-sm  md:text-base' >{popUpData.description}</p>
                        {   popUpData.type === 'StudentFlightForm' &&
                            (
                                popUpData.status === 'Expired' ?
                                <button 
                                className={`${ButtonStyles.normalButton} w-7 h-10 opacity-45`} >تعیین وضعیت</button>
                                :
                                <button 
                                onClick={() => navigate(`/addFlight/ReviewStudentsFlight/${popUpData.id}`)}
                                className={`${ButtonStyles.normalButton} w-7 h-10 text-sm`} >تعیین وضعیت</button>
                            )
                        }
                        {   popUpData.type === 'TandemPassenger' &&
                            (
                                popUpData.status === 'Expired' ?
                                <button 
                                className={`${ButtonStyles.normalButton} w-7 h-10 opacity-45`} >تعیین وضعیت</button>
                                :
                                <button 
                                onClick={() => navigate(`/addFlight/ReviewStudentsFlight/${popUpData.id}`)}
                                className={`${ButtonStyles.normalButton} w-7 h-10 text-sm`} >تعیین وضعیت</button>
                            )
                        }
                        {   popUpData.type === 'AcceptClub' &&
                            (
                                popUpData.status === 'Expired' ?
                                <button 
                                className={`${ButtonStyles.normalButton} w-7 h-10 opacity-45`} >تعیین وضعیت</button>
                                :
                                <button 
                                onClick={() => navigate(`/addFlight/ReviewStudentsFlight/${popUpData.id}`)}
                                className={`${ButtonStyles.normalButton} w-7 h-10 text-sm`} >تعیین وضعیت</button>
                            )
                        }
                        {   popUpData.type === 'AcceptStudentInCourse' &&
                            <>
                                {
                                    popUpData.status === 'Expired' ?
                                    null
                                    :
                                    <div className='flex w-20 justify-between'>
                                        <button type="submit" disabled={triggerStudentStatusLoading} onClick={(event) => handleTriggerStudentStatus( 'active', popUpData.id, event) } style={{color:'var(--yellow-text) '}} >تایید</button>
                                        <button disabled={triggerStudentStatusLoading} onClick={(event) => handleTriggerStudentStatus( 'coachRejected', popUpData.id, event) } style={{ color: 'var(--notification-red)' }}>رد</button>
                                    </div>
                                }
                            </>
                        }
                        {   popUpData.type === 'AcceptCourse' &&
                            <>
                                {
                                    popUpData.status === 'Expired' ?
                                    null
                                    :
                                    <div className='flex w-20 justify-between'>
                                        <button type="submit" disabled={triggerCourseStatusLoading} onClick={(event) => handleTriggerCourseStatus( 'active', popUpData.id, event) } style={{color:'var(--yellow-text) '}} >تایید</button>
                                        <button disabled={triggerCourseStatusLoading} onClick={(event) => handleTriggerCourseStatus( 'rejected', popUpData.id, event) } style={{ color: 'var(--notification-red)' }}>رد</button>
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