import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// styles
import ButtonStyles from '../../styles/ButtonsBox.module.css'
import { useIsSurveyAvailabe } from '../../Utilities/Services/notificationAndSurveyQueries';

// context
import { useTranslation } from '../../Utilities/context/TranslationContext';

const NotifTandemPassengerSurvey = ({notif, handleActivatePopUp}) => {

    // language
    const { t } = useTranslation();

    const navigate = useNavigate()

    const {isRead, title, status , description, externalId, createdDateTime} = notif;

    const {  data: isSurveyAvailable, isLoading: availablityLoading, error: availablityError } = useIsSurveyAvailabe(externalId);



    return (
        <div className=' w-full h-auto rounded-2xl flex flex-col items-start justify-between px-4 py-4 gap-y-2' 
        style={{background:'var(--bg-output-default)', boxShadow:'var(--shadow-all)', color:'var(--text-default)', border: notif.status === 'Pending' ? '1px solid var(--text-accent)' : '' }}>

            <div className='w-full text-xs flex flex-col justify-center items-start space-y-2'
            onClick={handleActivatePopUp}>

                <div className='w-full flex justify-start items-center gap-x-2'>
                    {
                        !isRead &&
                        <div className='w-[10px] h-[10px] rounded-full' style={{background:'var(--text-error)'}} />
                    }
                    <p className='text-base text-start max-w-[90%]'>{title}</p>
                </div>


            </div>
            
            {
                status === 'Expired' ?
                <div className='flex w-full h-full justify-between items-center gap-y-2'>
                    <p className='text-end  text-xs'>{createdDateTime}</p>
                    <button
                    className={`w-auto text-textDisabled text-xs`} >
                        {t('notifications.tandemPassengerSurvey.setStatus')}
                    </button>
                </div>
                :
                <div className='flex w-full h-full justify-between items-center gap-y-2'>
                    <p className='text-end  text-xs'>{createdDateTime}</p>
                    <button
                    onClick={() => navigate(`/survey/${externalId}`)}
                    className={` w-auto text-textAccent text-xs`} >
                        {t('notifications.tandemPassengerSurvey.setStatus')}
                    </button>
                </div>
            }

        </div>
    );
};


export default NotifTandemPassengerSurvey;
