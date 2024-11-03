import React from 'react';

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

const ArrowButton = ({isRight}) => {
    return (
        <div className='bg-bgButtonSecondaryDefault w-full h-full rounded-full pl-[4px] pr-[2px] flex justify-center items-center'
        style={{boxShadow: 'var(--shadow-button-white),var(--shadow-button-dark)'}}>
            {
                isRight ?
                <ArrowForwardIosIcon sx={{color: 'var(--text-default)', width:'100%', height:'100%'}} />
                :
                <ArrowBackIosNewIcon sx={{color: 'var(--text-default)', width:'100%', height:'100%'}} />
            }
        </div>
    );
};

export default ArrowButton;