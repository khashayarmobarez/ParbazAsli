import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// styles
import ButtonStyles from '../../../styles/Buttons/ButtonsBox.module.css'

const NotifVersionStudentFlightForm = ({notif}) => {

    const navigate = useNavigate()

    const [ shortDescription, setShortDescription ] = useState()

    useEffect(() => {
        if(notif.description) {
            const shortingDescription = notif.description.substring(0,30)
            setShortDescription(shortingDescription)
        }
    }, [notif])

    return (
        <div className=' w-full h-20 rounded-3xl flex items-center justify-between px-4' style={{background:'var(--about-us-box-color)', boxShadow:'var(--about-us-box-shodow)', color:'var(--soft-white) ' }}>

            <div className='text-xs flex flex-col justify-center items-start space-y-2'>

                <div className=' flex'>
                    <p className='text-base'>{notif.title}</p>
                </div>

                {
                    shortDescription &&
                        <div className=' '>
                            <p className='text-start text-xs'>{shortDescription} ...</p>
                        </div>
                }

            </div>
            
            <div>
                <button 
                onClick={() => navigate(`/addFlight/ReviewStudentsFlight/${notif.externalId}`)}
                className={`${ButtonStyles.normalButton} w-7 h-10`} >مشاهده</button>
            </div>

        </div>
    );
};

export default NotifVersionStudentFlightForm;