import React from 'react';

// queries
import { useTriggerEquipmentStatus } from '../../../Utilities/Services/equipmentQueries';
import { toast } from 'react-toastify';

const NotifAcceptEquipment = ({notif,equipmentForUserOrClub}) => {

    const { description ,externalId ,title, status, isRead, createdDateTime } = notif;

    const { mutate: mutateTriggerEquipmentStatus, isLoading:loadingTriggerEquipmentStatus } = useTriggerEquipmentStatus()

    const handleSubmittingTranfer = (action, id, event) => {

        event.preventDefault();

        if(action === 'accept') {
            // accept
            const formBody = {
                equipmentId: id,
                status: 'Accepted',
                isForClub: equipmentForUserOrClub === 'AcceptClubEquipment' ? true : false
            }
            
            mutateTriggerEquipmentStatus(formBody, {
                onSuccess: () => {
                    toast('وسیله پروازی با موفقیت تایید شد', {
                        type: 'success',
                        position: 'top-right',
                        autoClose: 5000,
                        theme: 'dark',
                        style: { width: "90%" }
                    });
                }
            }, { onError: (error) => {
                let errorMessage = 'خطایی رخ داده است';
                if (error.response && error.response.data && error.response.data.ErrorMessages) {
                    errorMessage = error.response.data.ErrorMessages[0].ErrorMessage;
                }
                toast(errorMessage, {
                    type: 'error',
                    position: 'top-right',
                    autoClose: 5000,
                    theme: 'dark',
                    style: { width: "90%" }
                });
                }
            })
        } else {
            // decline
            const formBody = {
                equipmentId: id,
                status: 'Rejected',
                isForClub: false
            }

            mutateTriggerEquipmentStatus(formBody, {
                onSuccess: () => {
                    toast('وسیله پروازی با موفقیت رد شد', {
                        type: 'success',
                        position: 'top-right',
                        autoClose: 5000,
                        theme: 'dark',
                        style: { width: "90%" }
                    });
                }
            }, { onError: (error) => {
                console.log(error)
                let errorMessage = 'خطایی رخ داده است';
                if (error.response && error.response.data && error.response.data.ErrorMessages) {
                    errorMessage = error.response.data.ErrorMessages[0].ErrorMessage;
                }
                toast(errorMessage, {
                    type: 'error',
                    position: 'top-right',
                    autoClose: 5000,
                    theme: 'dark',
                    style: { width: "90%" }
                });
                }
            })
        }
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

                    <p className='text-end ml-2 text-xs'>{createdDateTime}</p>
                </div>
                :
                <div className='flex flex-col w-45% h-full justify-around items-end'>
                    <div className='flex w-20 justify-between'>

                        <button 
                        type="submit" 
                        disabled={loadingTriggerEquipmentStatus} 
                        onClick={(event) => handleSubmittingTranfer( 'active', externalId, event) } 
                        className='text-[var(--yellow-text)] font-medium' >
                            تایید
                        </button>
                        
                        <button 
                        disabled={loadingTriggerEquipmentStatus} 
                        onClick={(event) => handleSubmittingTranfer( 'rejected', externalId, event) } 
                        className='text-[var(--red-text)] font-medium'>
                            رد
                        </button>

                    </div>
                    
                    <p className='text-end ml-2 text-xs'>{createdDateTime}</p>
                
                </div>

            }

        </div>
    );
};

export default NotifAcceptEquipment;