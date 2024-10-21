import React from 'react';

import RemoveIcon from '@mui/icons-material/Remove';

const MinusButton = ({backgroundColor}) => {
    return (
        <div className={` w-6 h-6 p-1 rounded flex justify-center items-center bg-${backgroundColor}`}>
            <RemoveIcon />
        </div>
    );
};

export default MinusButton;