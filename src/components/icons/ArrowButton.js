import React from 'react';

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const ArrowButton = () => {
    return (
        <div className='bg-bgButtonSecondaryDefault w-full h-full p-2 rounded-full pr-1 flex justify-center items-center'
        style={{boxShadow: 'var(--shadow-button-white),var(--shadow-button-dark)'}}>
            <ArrowForwardIosIcon sx={{color: 'var(--text-default)'}} />
        </div>
    );
};

export default ArrowButton;