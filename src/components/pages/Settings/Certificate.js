import React from 'react';
import { useNavigate } from 'react-router';

import ButtonStyles from '../../../styles/Buttons/ButtonsBox.module.css'

//  assets
import certifiacte from '../../../assets/icons/certificate-Vector.svg'


const Certificate = ({certificateData}) => {

    // react-router-dom
    const navigate = useNavigate()

    return (
        <div className=' w-full h-16 rounded-full flex items-center justify-between px-6' style={{background:'var(--about-us-box-color)', boxShadow:'var(--about-us-box-shodow)', color:'var(--soft-white) ' }}>
            
            <div className=' w-full text-xs flex justify-between items-center'>

                <div className=' flex'>
                    <img src={certifiacte} alt='icon' />
                    <p>{certificateData.organization}</p>
                </div>
                <div>
                    <p>تاریخ {certificateData.issueDate}</p>
                </div>

            </div>

        </div>
    );
};

export default Certificate;