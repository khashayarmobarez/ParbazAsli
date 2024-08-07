import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// styles
import ButtonStyles from '../../../styles/Buttons/ButtonsBox.module.css'
import { useIsSurveyAvailabe } from '../../../Utilities/Services/notificationAndSurveyQueries';

const NotifTandemPassengerSurvey = ({notif}) => {

    const navigate = useNavigate()

    const {isRead, title, status , description, externalId} = notif;

    const {  data: isSurveyAvailable, isLoading: availablityLoading, error: availablityError } = useIsSurveyAvailabe(externalId);

    const [ shortDescription, setShortDescription ] = useState()

    useEffect(() => {
        if(description) {
            const shortingDescription = description.substring(0,60)
            setShortDescription(shortingDescription)
        }
    }, [description])

    return (
        <div className=' w-full h-20 rounded-3xl flex items-center justify-between px-4' style={{background:'var(--about-us-box-color)', boxShadow:'var(--about-us-box-shodow)', color:'var(--soft-white) ' }}>

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

            </div>
            
            <div>
                {
                    status === 'Expired' ?
                    <button 
                    className={`${ButtonStyles.normalButton} w-7 h-10 opacity-55`} >منقضی شده</button>
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