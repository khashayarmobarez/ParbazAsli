import React from 'react';
import { useNavigate } from 'react-router-dom';

// styles
import gradients from '../../../styles/gradients/Gradient.module.css'


// assets
import timer from '../../../assets/icons/timer.svg'
import check from '../../../assets/icons/checkGreen.svg'


const PracticalFlightHistoryBox = (props) => {

    const navigate = useNavigate()
    const { flightBaseData } = props;

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
                    <div onClick={() => handleClick(flightBaseData.id)} className={`${gradients.container} flex w-full justify-between items-center h-12 pl-3 rounded-2xl text-xs`} >
                        <button className={`${gradients.clipboardButtonBackgroundGradient} w-14 h-full flex items-center justify-center rounded-r-xl`}>
                            <p>{flightBaseData.index}</p>
                        </button>
                        <p>{flightBaseData.takeOffDateAndFlightDuration && flightBaseData.takeOffDateAndFlightDuration}</p>
                        <p>{flightBaseData.city && flightBaseData.city.slice(0, 10)}</p>
                        <p>{flightBaseData.site && flightBaseData.site.slice(0, 14)}</p>
                        { flightBaseData.status === 'Pending' &&
                            <img src={timer} alt='timer' />
                        }
                        { flightBaseData.status === 'Accepted' &&
                            <img src={check} alt='check' />
                        }
                    </div>
                }
        

    </div>
    );
};

export default PracticalFlightHistoryBox;