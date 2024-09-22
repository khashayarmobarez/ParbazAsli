import React from 'react';

// queries
import { useTriggerClubStatus } from '../../../Utilities/Services/coursesQueries';
import { toast } from 'react-toastify';

const NotifAcceptClub = ({notif}) => {

    const {description ,externalId ,title, status, isRead, createdDateTime} = notif;

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

    return (
        <div className=' w-full h-auto rounded-3xl flex items-center justify-between px-6 py-2' 
        style={{background:'var(--Basic-dataBox-bg)', boxShadow:'var(--dark-input-boxShadow)', color:'var(--soft-white)', border: notif.status === 'Pending' ? '1px solid var(--yellow-text)' : '' }}>

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

                <p className='text-start text-[var(--low-opacity-white)]'>{createdDateTime}</p>
            </div>
            
            {
                status === 'Expired' ?
                <div className='flex flex-col w-45% h-full justify-around items-end'>
                    <div className='flex w-20 justify-between'>

                        <button 
                        type="submit" 
                        disabled={true} 
                        className='text-[var(--low-opacity-white)] font-medium' >
                            تایید
                        </button>
                        
                        <button 
                        disabled={true} 
                        className='text-[var(--low-opacity-white)] font-medium'>
                            رد
                        </button>

                    </div>

                    <p className='text-end text-[var(--low-opacity-white)] text-xs'>{createdDateTime}</p>
                </div>
                :
                <div className='flex flex-col w-45% h-full justify-around items-end'>
                    <div className='flex w-20 justify-between'>

                        <button 
                        type="submit" 
                        disabled={triggerClubStatusLoading} 
                        onClick={(event) => handleTriggerClubStatus( 'active', externalId, event) } 
                        className='text-[var(--yellow-text)] font-medium' >
                            تایید
                        </button>
                        
                        <button 
                        disabled={triggerClubStatusLoading} 
                        onClick={(event) => handleTriggerClubStatus( 'rejected', externalId, event) } 
                        className='text-[var(--red-text)] font-medium'>
                            رد
                        </button>

                    </div>
                    
                    <p className='text-end text-[var(--low-opacity-white)] text-xs'>{createdDateTime}</p>
                
                </div>

            }

        </div>
    );
};

export default NotifAcceptClub;