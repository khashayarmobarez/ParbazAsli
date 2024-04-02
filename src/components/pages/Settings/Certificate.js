import React from 'react';
import { useNavigate } from 'react-router';

import ButtonStyles from '../../../styles/Buttons/ButtonsBox.module.css'

//  assets
import certifiacte from '../../../assets/icons/certificate-Vector.svg'


const Certificate = () => {

    // react-router-dom
    const navigate = useNavigate()

    return (
        <div className=' w-full h-24 rounded-3xl flex items-center justify-between px-6' style={{background:'var(--class-details-bg)', boxShadow:'var(--class-details-boxShadow)', color:'var(--soft-white) ' }}>

            <div className='text-xs flex flex-col justify-center items-start space-y-2'>

                <div className=' flex'>
                    <img src={certifiacte} alt='icon' />
                    <p>هواپیما کشوری/پیشرفته</p>
                </div>
                <div>
                    <p>تاریخ 12/1/1403</p>
                </div>

            </div>
            
            <div>
                <button onClick={() => navigate('/Settings/certificate')} type="submit" className={`${ButtonStyles.normalButton} w-32 h-12`} >تمدید/ارتقاء</button>
            </div>

        </div>
    );
};

export default Certificate;