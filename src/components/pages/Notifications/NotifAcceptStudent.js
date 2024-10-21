import React from 'react';
import ButtonStyles from '../../../styles/Buttons/ButtonsBox.module.css'

// queries
import {  useTriggerStudentStatus } from '../../../Utilities/Services/coursesQueries';
import { toast } from 'react-toastify';

const NotifAcceptStudent = ({notif, handleActivatePopUp}) => {

    const {description ,externalId ,title, status, isRead, createdDateTime} = notif;

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
        <div className=' w-full h-auto rounded-2xl flex items-center justify-between px-6 py-2' 
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
                        className='text-textDisabled font-medium' >
                            تایید
                        </button>
                        
                        <button 
                        disabled={true} 
                        className='text-textDisabled font-medium'>
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
                        disabled={triggerStudentStatusLoading} 
                        onClick={(event) => handleTriggerStudentStatus( 'active', externalId, event) } 
                        className='text-textAccent font-medium'>
                            تایید
                        </button>
                        
                        <button 
                        disabled={triggerStudentStatusLoading} 
                        onClick={(event) => handleTriggerStudentStatus( 'coachRejected', externalId, event) } 
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

export default NotifAcceptStudent;