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

    const [ shortDescription, setShortDescription ] = useState()

    useEffect(() => {
        if(description) {
            const shortingDescription = description.substring(0,60)
            setShortDescription(shortingDescription)
        }
    }, [description])

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
                    <p className='text-base'>{title}</p>
                </div>

                {
                    shortDescription &&
                        <div className=' pl-2'>
                            <p className='text-start text-xs'>{shortDescription}</p>
                        </div>
                }


            </div>
            
            <div>
                {
                    status === 'Expired' ?
                    <div className='flex flex-col w-45% h-full justify-between items-end gap-y-2'>
                        <button
                        className={`${ButtonStyles.normalButtonDisable} w-7 h-10`} >
                            {t('notifications.tandemPassengerSurvey.setStatus')}
                        </button>
                        <p className='text-end ml-2 text-xs'>{createdDateTime}</p>
                    </div>
                    :
                    <div className='flex flex-col w-45% h-full justify-between items-end gap-y-2'>
                        <button
                        onClick={() => navigate(`/survey/${externalId}`)}
                        className={`${ButtonStyles.normalButton} w-7 h-10 text-sm`} >
                            {t('notifications.tandemPassengerSurvey.setStatus')}
                        </button>
                        <p className='text-end ml-2 text-xs'>{createdDateTime}</p>
                    </div>
                }
            </div>

        </div>
    );
};


export default NotifTandemPassengerSurvey;
