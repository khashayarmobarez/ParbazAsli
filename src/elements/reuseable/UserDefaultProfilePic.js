import React from 'react';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';

const UserDefaultProfilePic = () => {
    return (
        <div className={`w-full h-full relative rounded-full flex items-center justify-center overflow-hidden bg-bgPageMain`}>
            <PersonRoundedIcon sx={{color: 'var(--bg-button-secondary-default)', height:'120%', width:'120%', zIndex:'0', borderRadius:'9999px', marginTop:'20%',}} />
        </div>
    );
};

export default UserDefaultProfilePic;