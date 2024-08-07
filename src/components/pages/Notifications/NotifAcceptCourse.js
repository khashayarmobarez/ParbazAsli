import React from 'react';

// queries
import { useTriggerCourseStatus } from '../../../Utilities/Services/coursesQueries';
import { toast } from 'react-toastify';

const NotifAcceptCourse = ({notif}) => {

    const {description ,externalId ,title, status, isRead} = notif;

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
                    <button type="submit" disabled={triggerCourseStatusLoading} onClick={(event) => handleTriggerCourseStatus( 'active', externalId, event) } style={{color:'var(--yellow-text) '}} >تایید</button>
                    <button disabled={triggerCourseStatusLoading} onClick={(event) => handleTriggerCourseStatus( 'rejected', externalId, event) } style={{ color: 'var(--notification-red)' }}>رد</button>
                </div>

            }

        </div>
    );
};

export default NotifAcceptCourse;