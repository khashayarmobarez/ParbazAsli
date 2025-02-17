import React from 'react';
import Cookies from 'js-cookie';

// queries
import { useTriggerClubStatus } from '../../Utilities/Services/coursesQueries';
import { toast } from 'react-toastify';

// context
import { useTranslation } from '../../Utilities/context/TranslationContext';

const NotifAcceptClub = ({notif,handleActivatePopUp}) => {

    // language
    const { t } = useTranslation();

    const appTheme = Cookies.get('themeApplied') || 'dark';

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
                if(status === 'active') {
                    toast(t('notifications.notifAcceptClub.clubAccepted'), {
                        type: 'success', // Specify the type of toast (e.g., 'success', 'error', 'info', 'warning')
                        position: 'top-center', // Set the position (e.g., 'top-left', 'bottom-right')
                        autoClose: 3000,
                        theme: appTheme,
                        style: { width: "350px" }
                    });
                } else {
                    toast(t('notifications.notifAcceptClub.clubDeclined'), {
                        type: 'success', // Specify the type of toast (e.g., 'success', 'error', 'info', 'warning')
                        position: 'top-center', // Set the position (e.g., 'top-left', 'bottom-right')
                        autoClose: 3000,
                        theme: appTheme,
                        style: { width: "350px" }
                    });
                }
                window.location.reload();
            },
        });
    }

    return (
        <div className=' w-full h-auto rounded-2xl flex flex-col items-start justify-between px-4 py-4' 
        style={{background:'var(--bg-output-default)', boxShadow:'var(--shadow-all)', color:'var(--text-default)', border: notif.status === 'Pending' ? '1px solid var(--text-accent)' : '' }}>

            <div className='text-xs flex flex-col justify-center items-start space-y-2'
            onClick={handleActivatePopUp}>

                <div className=' flex items-center justify-center gap-x-2'>
                    {
                        !isRead &&
                        <div className='w-[10px] h-[10px] rounded-full' style={{background:'var(--text-error)'}} />
                    }
                    <p className='text-base text-start'>{title}</p>
                </div>

            </div>
            
            {
                status === 'Expired' ?
                <div className='flex  w-full h-full justify-between items-end'>

                    <p className='text-end ml-2 text-xs'>{createdDateTime}</p>

                    <div className='flex w-[70px] justify-between'>

                        <button 
                        type="submit" 
                        disabled={true} 
                        className='text-textButtonMainDisabled font-medium' >
                            {t('notifications.accept')}
                        </button>
                        
                        <button 
                        disabled={true} 
                        className='text-textButtonMainDisabled font-medium'>
                            {t('notifications.decline')}
                        </button>

                    </div>

                </div>
                :
                <div className='flex w-full h-full justify-between items-end'>

                    <p className='text-end ml-2 text-xs'>{createdDateTime}</p>
                    
                    <div className='flex w-[70px] justify-between'>

                        <button 
                        type="submit" 
                        disabled={triggerClubStatusLoading} 
                        onClick={(event) => handleTriggerClubStatus( 'active', externalId, event) } 
                        className='text-textAccent font-medium' >
                            {t('notifications.accept')}
                        </button>
                        
                        <button 
                        disabled={triggerClubStatusLoading} 
                        onClick={(event) => handleTriggerClubStatus( 'rejected', externalId, event) } 
                        className='text-textError font-medium'>
                            {t('notifications.decline')}
                        </button>

                    </div>
                
                </div>

            }

        </div>
    );
};

export default NotifAcceptClub;