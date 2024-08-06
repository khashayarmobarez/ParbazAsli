import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// styles
import gradients from '../../../styles/gradients/Gradient.module.css'
import boxStyles from '../../../styles/Boxes/DataBox.module.css'
import ButtonStyles from '../../../styles/Buttons/ButtonsBox.module.css'


// assets
import clipboard from '../../../assets/icons/clipboard.svg'

// queries
import { useAUserFlight } from '../../../Utilities/Services/flightHistoriesQueries';


const PracticalFlightHistoryBox = (props) => {

    const navigate = useNavigate()
    const { flightBaseData } = props;
    
    const { data: fullFlightData, isLoading: fullFlightDataLoading } = useAUserFlight(flightBaseData.id);

    // for changing the color of the texts when user clicked and expand it


    const handleClick = (id) => {
        navigate(`/flightHistory/${id}`)
    }

    return (
    <div className='flex flex-col gap-y-4'>

        {/* the below part should be mapped when data is recieved from server */}
                {/* classesInput */}
                {
                    flightBaseData &&
                    <div onClick={() => handleClick(flightBaseData.id)} className={`${gradients.container} flex w-full justify-between items-center h-12 pl-3 rounded-2xl text-sm`} >
                        <button className={`${gradients.clipboardButtonBackgroundGradient} w-14 h-full flex items-center justify-center rounded-r-xl`}>
                            <img src={clipboard} alt='icon' />
                        </button>
                        <p>{flightBaseData.takeOffDateAndFlightDuration && flightBaseData.takeOffDateAndFlightDuration}</p>
                        <p>{flightBaseData.city && flightBaseData.city}</p>
                        <p>{flightBaseData.site && flightBaseData.site}</p>
                    </div>
                }
        

    </div>
    );
};

export default PracticalFlightHistoryBox;