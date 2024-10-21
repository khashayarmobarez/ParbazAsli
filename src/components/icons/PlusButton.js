import React from 'react';

import AddIcon from '@mui/icons-material/Add';

const PlusButton = ({backgroundColor}) => {
    return (
        <div className={` w-6 h-6 p-1 rounded flex justify-center items-center bg-${backgroundColor}`}>
            <AddIcon />
        </div>
    );
};

export default PlusButton;