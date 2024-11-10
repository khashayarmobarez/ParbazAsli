import React from 'react';

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

const ArrowButton = ({isRight, isDisable}) => {
    return (
        <div className={`${isDisable ? `bg-bgButtonSecondaryDisabled` :  `bg-bgButtonSecondaryDefault`} w-full h-full rounded-full pl-[4px] pr-[2px] flex justify-center items-center`}
        style={{boxShadow:!isDisable && 'var(--shadow-button-white),var(--shadow-button-dark)'}}>
            {
                isRight ?
                <ArrowForwardIosIcon sx={{color: isDisable ? 'var(--text-disabled)' : 'var(--text-default)', width:'75%', height:'75%'}} />
                :
                <ArrowBackIosNewIcon sx={{color: isDisable ? 'var(--text-disabled)' : 'var(--text-default)', width:'75%', height:'75%', marginLeft:'-0.2rem'}} />
            }
        </div>
    );
};

export default ArrowButton;