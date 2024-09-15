import React from 'react';
import ButtonStyles from '../../../styles/Buttons/ButtonsBox.module.css'

// queries
import {  useTriggerStudentStatus } from '../../../Utilities/Services/coursesQueries';
import { toast } from 'react-toastify';

const NotifAcceptStudent = ({notif}) => {

    const {description ,externalId ,title, status, isRead} = notif;

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
        <div className=' w-full h-20 rounded-3xl flex items-center justify-between px-6' 
        style={{background:'var(--Basic-dataBox-bg)', boxShadow:'var(--dark-input-boxShadow)', color:'var(--soft-white)', border: notif.status === 'Pending' ? '1px solid var(--yellow-text)' : '' }}>

            <div className='text-xs flex flex-col justify-center items-start space-y-2'>

                <div className=' flex justify-center items-center gap-x-2'>
                    {
                        !isRead &&
                        <div className='w-[10px] h-[10px] rounded-full' style={{background:'var(--red-text)'}} />
                    }
                    <p className='text-base'> {title}</p>
                </div>

                <div className=' '>
                    <p className='text-start'>{description.slice(0, 32)}{description.length > 0 ? ' ...' : ''}</p>
                </div>

            </div>
            
            {
                status === 'Expired' ?
                null
                :
                <div className='flex w-20 justify-between'>
                    <button type="submit" disabled={triggerStudentStatusLoading} onClick={(event) => handleTriggerStudentStatus( 'active', externalId, event) } className={`${ButtonStyles.addButton} w-6`} >تایید</button>
                    <button disabled={triggerStudentStatusLoading} onClick={(event) => handleTriggerStudentStatus( 'coachRejected', externalId, event) } className={`${ButtonStyles.normalButton} w-6`}>رد</button>
                </div>

            }

        </div>
    );
};

export default NotifAcceptStudent;