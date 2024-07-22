import React from 'react';

// queries
import { useTriggerClubStatus } from '../../../Utilities/Services/coursesQueries';
import { toast } from 'react-toastify';

const NotifAcceptClub = ({notif}) => {

    const {description ,externalId ,title, status, isRead} = notif;

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
                toast('باشگاه تایید شد', {
                    type: 'success', // Specify the type of toast (e.g., 'success', 'error', 'info', 'warning')
                    position: 'top-right', // Set the position (e.g., 'top-left', 'bottom-right')
                    autoClose: 3000,
                    theme: 'dark',
                    style: { width: "350px" }
                });
            },
        });
    }

    return (
        <div className=' w-full h-20 rounded-3xl flex items-center justify-between px-6' style={{background:'var(--about-us-box-color)', boxShadow:'var(--about-us-box-shodow)', color:'var(--soft-white) ' }}>

            <div className='text-xs flex flex-col justify-center items-start space-y-2'>

                <div className=' flex items-center justify-center gap-x-2'>
                    {
                        !isRead &&
                        <div className='w-[10px] h-[10px] rounded-full' style={{background:'var(--red-text)'}} />
                    }
                    <p className='text-base'>{title}</p>
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
                    <button type="submit" onClick={(event) => handleTriggerClubStatus( 'active', externalId, event) } style={{color:'var(--yellow-text)'}} >تایید</button>
                    <button onClick={(event) => handleTriggerClubStatus( 'rejected', externalId, event) } style={{ color: 'var(--red-text)' }}>رد</button>
                </div>

            }

        </div>
    );
};

export default NotifAcceptClub;