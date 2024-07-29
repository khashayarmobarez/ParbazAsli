import React from 'react';

// queries
import {  useTriggerStudentStatus } from '../../../Utilities/Services/coursesQueries';
import { toast } from 'react-toastify';

const NotifAcceptStudent = ({notif}) => {

    const {description ,externalId ,title, status, isRead} = notif;

    const { mutate: triggerStudentStatus, isLoading: triggerStudentStatusLoading } = useTriggerStudentStatus();

    const handleTriggerClubStatus = (status ,id, event) => {

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
        <div className=' w-full h-20 rounded-3xl flex items-center justify-between px-6' style={{background:'var(--about-us-box-color)', boxShadow:'var(--about-us-box-shodow)', color:'var(--soft-white) ' }}>

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
                <p style={{color:'var(--yellow-text) '}}>منقضی شده</p>
                :
                <div className='flex w-20 justify-between'>
                    <button type="submit" onClick={(event) => handleTriggerClubStatus( 'active', externalId, event) } style={{color:'var(--yellow-text) '}} >تایید</button>
                    <button onClick={(event) => handleTriggerClubStatus( 'rejected', externalId, event) } style={{ color: 'var(--notification-red)' }}>رد</button>
                </div>

            }

        </div>
    );
};

export default NotifAcceptStudent;