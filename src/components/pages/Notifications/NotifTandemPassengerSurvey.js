import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// styles
import ButtonStyles from '../../../styles/Buttons/ButtonsBox.module.css'
import { useIsSurveyAvailabe } from '../../../Utilities/Services/notificationAndSurveyQueries';

const NotifTandemPassengerSurvey = ({notif}) => {

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
        <div className=' w-full h-auto rounded-3xl flex items-center justify-between px-4 py-2' 
        style={{background:'var(--Basic-dataBox-bg)', boxShadow:'var(--dark-input-boxShadow)', color:'var(--soft-white)', border: notif.status === 'Pending' ? '1px solid var(--yellow-text)' : '' }}>

            <div className='text-xs flex flex-col justify-center items-start space-y-2'>

                <div className=' flex justify-center items-center gap-x-2'>
                    {
                        !isRead &&
                        <div className='w-[10px] h-[10px] rounded-full' style={{background:'var(--red-text)'}} />
                    }
                    <p className='text-base'>{title}</p>
                </div>

                {
                    shortDescription &&
                        <div className=' pl-2'>
                            <p className='text-start text-xs'>{shortDescription}</p>
                        </div>
                }

                <p className='text-start text-[var(--low-opacity-white)]'>{createdDateTime}</p>

            </div>
            
            <div>
                {
                    status === 'Expired' ?
                    <button 
                    className={`${ButtonStyles.normalButton} w-7 h-10 opacity-55`} >تعیین وضعیت</button>
                    :
                    <button 
                    onClick={() => navigate(`/survey/${externalId}`)}
                    className={`${ButtonStyles.normalButton} w-7 h-10 text-sm`} >تعیین وضعیت</button>
                }
            </div>

        </div>
    );
};


export default NotifTandemPassengerSurvey;
