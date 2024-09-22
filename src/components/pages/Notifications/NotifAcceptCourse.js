import React from 'react';
import ButtonStyles from '../../../styles/Buttons/ButtonsBox.module.css'

// queries
import { useTriggerCourseStatus } from '../../../Utilities/Services/coursesQueries';
import { toast } from 'react-toastify';

const NotifAcceptCourse = ({notif}) => {

    const {description ,externalId ,title, status, isRead, createdDateTime} = notif;

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

    return (
        <div className=' w-full h-auto rounded-3xl flex items-center justify-between px-6 py-2'
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
                        disabled={triggerCourseStatusLoading} 
                        onClick={(event) => handleTriggerCourseStatus( 'active', externalId, event) } 
                        className='text-[var(--yellow-text)] font-medium'>
                            تایید
                        </button>
                        
                        <button 
                        disabled={triggerCourseStatusLoading} 
                        onClick={(event) => handleTriggerCourseStatus( 'rejected', externalId, event) } 
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

export default NotifAcceptCourse;