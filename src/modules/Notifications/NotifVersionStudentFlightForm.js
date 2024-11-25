import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// styles
import ButtonStyles from '../../styles/Buttons/ButtonsBox.module.css'

const NotifVersionStudentFlightForm = ({notif, handleActivatePopUp}) => {

    const navigate = useNavigate()

    const [ shortDescription, setShortDescription ] = useState()

    useEffect(() => {
        if(notif.description) {
            const shortingDescription = notif.description.substring(0,30)
            setShortDescription(shortingDescription)
        }
    }, [notif])

    return (
        <div className=' w-full h-auto rounded-2xl flex items-center justify-between px-4 py-2'
        style={{background:'var(--bg-output-default)', boxShadow:'var(--shadow-all)', color:'var(--text-default)', border: notif.status === 'Pending' ? '1px solid var(--text-accent)' : '' }}>

            <div className='text-xs flex flex-col justify-center items-start space-y-2'
            onClick={handleActivatePopUp}>

                <div className=' flex justify-center items-center gap-x-2'>
                    {
                        !notif.isRead &&
                        <div className='w-[10px] h-[10px] rounded-full' style={{background:'var(--text-error)'}} />
                    }
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
                {
                    notif.status === 'Expired' ?
                    <div className='flex flex-col w-45% h-full justify-around items-end gap-y-2'>

                        <button 
                        className={`${ButtonStyles.normalButtonDisable} w-7 h-10`} >
                            تعیین وضعیت
                        </button>

                        <p className='text-end ml-2 text-xs'>{notif.createdDateTime}</p>

                    </div>
                    :
                    <div className='flex flex-col w-45% h-full justify-around items-end gap-y-2'>

                        <button 
                        onClick={() => navigate(`/addFlight/ReviewStudentsFlight/${notif.externalId}`)}
                        className={`${ButtonStyles.normalButton} w-7 h-10 text-sm`} >تعیین وضعیت
                        </button>

                        <p className='text-end ml-2 text-xs'>{notif.createdDateTime}</p>                       
                    </div>
                }
            </div>

        </div>
    );
};

export default NotifVersionStudentFlightForm;