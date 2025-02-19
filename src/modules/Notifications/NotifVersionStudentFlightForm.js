import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// styles
import ButtonStyles from '../../styles/ButtonsBox.module.css'

// context
import { useTranslation } from '../../Utilities/context/TranslationContext';

const NotifVersionStudentFlightForm = ({notif, handleActivatePopUp}) => {

    // language
    const { t } = useTranslation();

    const navigate = useNavigate()


    return (
        <div className=' w-full h-auto rounded-2xl flex flex-col items-start justify-between px-4 py-4 gap-y-2'
        style={{background:'var(--bg-output-default)', boxShadow:'var(--shadow-all)', color:'var(--text-default)', border: notif.status === 'Pending' ? '1px solid var(--text-accent)' : '' }}>

            <div className='w-full text-xs h-full flex flex-col justify-between items-start gap-y-2'
            onClick={handleActivatePopUp}>

                <div className='w-full flex justify-start items-center gap-x-2'>
                    {
                        !notif.isRead &&
                        <div className='w-[10px] h-[10px] rounded-full' style={{background:'var(--text-error)'}} />
                    }
                    <p className=' text-start text-base max-w-[90%]'>{notif.title}</p>
                </div>

            </div>
            
            {
                notif.status === 'Expired' ?
                <div className='flex w-full h-full justify-between items-center gap-y-2'>

                    <p className='text-end ml-2 text-xs'>{notif.createdDateTime}</p>

                    <button 
                    className={` w-auto text-textDisabled text-xs`} >
                        {t('notifications.tandemPassengerSurvey.setStatus')}
                    </button>

                </div>
                :
                <div className='flex w-full h-full justify-between items-center gap-y-2'>

                    <p className='text-end ml-2 text-xs'>{notif.createdDateTime}</p>

                    <button
                    onClick={() => navigate(`/addFlight/ReviewStudentsFlight/${notif.externalId}`)}
                    className={` w-auto text-textAccent text-xs`} >
                        {t('notifications.tandemPassengerSurvey.setStatus')}
                    </button>
                                        
                </div>
            }

        </div>
    );
};

export default NotifVersionStudentFlightForm;