import React from 'react';
import ButtonStyles from '../../styles/Buttons/ButtonsBox.module.css'
import Cookies from 'js-cookie';

// queries
import { useTriggerCourseStatus } from '../../Utilities/Services/coursesQueries';
import { toast } from 'react-toastify';

const NotifAcceptCourse = ({notif, handleActivatePopUp}) => {

    const appTheme = Cookies.get('themeApplied') || 'dark';

    const {description ,externalId ,title, status, isRead, createdDateTime} = notif;

    const { mutate: triggerCourseStatus, isLoading: triggerCourseStatusLoading } = useTriggerCourseStatus();

    const handleTriggerCourseStatus = (status ,id, event) => {

        event.preventDefault();

        const triggerStatusForm = {
            courseId: id,
            status: status
        }

        triggerCourseStatus(triggerStatusForm, {
            onSuccess: () => {
            // Handle success, e.g., show a notification, reset the form, etc.
            if (status === 'active') {
                toast('دوره تایید شد', {
                type: 'success', // Specify the type of toast (e.g., 'success', 'error', 'info', 'warning')
                position: 'top-right', // Set the position (e.g., 'top-left', 'bottom-right')
                autoClose: 3000,
                theme: appTheme,
                style: { width: "350px" }
                });
            } else if(status === 'rejected') {
                toast('دوره رد شد', {
                type: 'success', // Specify the type of toast (e.g., 'success', 'error', 'info', 'warning')
                position: 'top-right', // Set the position (e.g., 'top-left', 'bottom-right')
                autoClose: 3000,
                theme: appTheme,
                style: { width: "350px" }
                });
            }
            window.location.reload();
            },
            onError: () => {
            toast('خطایی رخ داده است', {
                type: 'error', // Specify the type of toast (e.g., 'success', 'error', 'info', 'warning')
                position: 'top-right', // Set the position (e.g., 'top-left', 'bottom-right')
                autoClose: 3000,
                theme: appTheme,
                style: { width: "350px" }
            });
            }
        });
    }

    return (
        <div className=' w-full h-auto rounded-2xl flex items-center justify-between px-4 py-4'
        style={{background:'var(--bg-output-default)', boxShadow:'var(--shadow-all)', color:'var(--text-default)', border: notif.status === 'Pending' ? '1px solid var(--text-accent)' : '' }}>

            <div className='text-xs flex flex-col justify-center items-start space-y-2'
            onClick={handleActivatePopUp}>

                <div className=' flex justify-center items-center gap-x-2'>
                    {
                        !isRead &&
                        <div className='w-[10px] h-[10px] rounded-full' style={{background:'var(--text-error)'}} />
                    }
                    <p className='text-base'> {title}</p>
                </div>

                <div className=' '>
                    <p className='text-start'>{description.slice(0, 32)}{description.length > 0 ? ' ...' : ''}</p>
                </div>


            </div>
            
            {
                status === 'Expired' ?
                <div className='flex flex-col w-45% h-full justify-around items-end'>
                    <div className='flex w-20 justify-between'>

                        <button 
                        type="submit" 
                        disabled={true} 
                        className='text-textButtonMainDisabled font-medium' >
                            تایید
                        </button>
                        
                        <button 
                        disabled={true} 
                        className='text-textButtonMainDisabled font-medium'>
                            رد
                        </button>

                    </div>

                    <p className='text-end ml-2 text-xs'>{createdDateTime}</p>
                </div>
                :
                <div className='flex flex-col w-45% h-full justify-around items-end'>
                    <div className='flex w-20 justify-between'>

                        <button 
                        type="submit" 
                        disabled={triggerCourseStatusLoading} 
                        onClick={(event) => handleTriggerCourseStatus( 'active', externalId, event) } 
                        className='text-textAccent font-medium'>
                            تایید
                        </button>
                        
                        <button 
                        disabled={triggerCourseStatusLoading} 
                        onClick={(event) => handleTriggerCourseStatus( 'rejected', externalId, event) } 
                        className='text-textError font-medium'>
                            رد
                        </button>

                    </div>
                    
                    <p className='text-end ml-2 text-xs'>{createdDateTime}</p>
                
                </div>

            }

        </div>
    );
};

export default NotifAcceptCourse;