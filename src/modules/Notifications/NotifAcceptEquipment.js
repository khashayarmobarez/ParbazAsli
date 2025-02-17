import React from 'react';
import Cookies from 'js-cookie';

// queries
import { useTriggerEquipmentStatus } from '../../Utilities/Services/equipmentQueries';
import { toast } from 'react-toastify';
import { useTranslation } from '../../Utilities/context/TranslationContext';

const NotifAcceptEquipment = ({notif, isForClub, handleActivatePopUp}) => {

    // language
    const { t } = useTranslation();

    const appTheme = Cookies.get('themeApplied') || 'dark';

    const { description ,externalId ,title, status, isRead, createdDateTime } = notif;

    const { mutate: mutateTriggerEquipmentStatus, isLoading:loadingTriggerEquipmentStatus } = useTriggerEquipmentStatus()

    const handleSubmittingTranfer = (action, id, event) => {

        event.preventDefault();

        if (action === 'Accepted') {
            // accept
            const formBody = {
              equipmentId: id,
              status: 'Accepted',
            };
          
            mutateTriggerEquipmentStatus(formBody, {
              onSuccess: () => {
                toast(t('notifications.acceptEquipment.equipmentAccepted'), {
                  type: 'success',
                  position: 'top-center',
                  autoClose: 5000,
                  theme: appTheme,
                  style: { width: "90%" }
                });
                // reload
                setTimeout(() => {
                  window.location.reload();
                }, 1000);
              }
            }, {
              onError: (error) => {
                let errorMessage = t('notifications.acceptEquipment.errorOccurred');
                if (error.response && error.response.data && error.response.data.ErrorMessages) {
                  errorMessage = error.response.data.ErrorMessages[0].ErrorMessage;
                }
                toast(errorMessage, {
                  type: 'error',
                  position: 'top-center',
                  autoClose: 5000,
                  theme: appTheme,
                  style: { width: "90%" }
                });
              }
            });
        } else {
            // decline
            const formBody = {
              equipmentId: id,
              status: 'Rejected',
            };
          
            mutateTriggerEquipmentStatus(formBody, {
              onSuccess: () => {
                toast(t('notifications.acceptEquipment.equipmentRejected'), {
                  type: 'success',
                  position: 'top-center',
                  autoClose: 5000,
                  theme: appTheme,
                  style: { width: "90%" }
                });
                // reload
                setTimeout(() => {
                  window.location.reload();
                }, 1000);
              }
            }, {
              onError: (error) => {
                console.log(error);
                let errorMessage = t('notifications.acceptEquipment.errorOccurred');
                if (error.response && error.response.data && error.response.data.ErrorMessages) {
                  errorMessage = error.response.data.ErrorMessages[0].ErrorMessage;
                }
                toast(errorMessage, {
                  type: 'error',
                  position: 'top-center',
                  autoClose: 5000,
                  theme: appTheme,
                  style: { width: "90%" }
                });
              }
            });
        }
    }

    return (
        <div className=' w-full h-auto rounded-2xl flex flex-col items-start justify-between px-4 py-4 gap-y-2' 
        style={{background:'var(--bg-output-default)', boxShadow:'var(--shadow-all)', color:'var(--text-default)', border: notif.status === 'Pending' ? '1px solid var(--text-accent)' : '' }}>

            <div className='text-xs flex flex-col justify-center items-start space-y-2'
            onClick={handleActivatePopUp}>

                <div className=' flex items-center justify-center gap-x-2'>
                    {
                        !isRead &&
                        <div className='w-[10px] h-[10px] rounded-full bg-textError' />
                    }
                    <p className='text-start text-base'>{title}</p>
                </div>

            </div>
            
            {
                status === 'Expired' ?
                <div className='flex  w-full h-full justify-between items-end'>
                    
                    <p className='text-end  text-xs'>{createdDateTime}</p>
                    
                    <div className='flex w-20 justify-between'>

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
                <div className='flex  w-full h-full justify-between items-end'>
                    
                    <p className='text-end text-xs'>{createdDateTime}</p>

                    <div className='flex w-20 justify-between'>
                        <button 
                        type="submit" 
                        disabled={loadingTriggerEquipmentStatus} 
                        onClick={(event) => handleSubmittingTranfer( 'Accepted', externalId, event) } 
                        className='text-textAccent font-medium' >
                            {t('notifications.accept')}
                        </button>
                        
                        <button 
                        disabled={loadingTriggerEquipmentStatus} 
                        onClick={(event) => handleSubmittingTranfer( 'rejected', externalId, event) } 
                        className='text-textError font-medium'>
                            {t('notifications.decline')}
                        </button>

                    </div>
                    
                
                </div>

            }

        </div>
    );
};

export default NotifAcceptEquipment;