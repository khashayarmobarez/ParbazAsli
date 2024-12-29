import React from 'react';

const ClockIcon = ({customColor}) => {

    const color = customColor || 'var(--text-default)';

    return (
        <svg width="100%" height="100%" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 6.66667V10L12.5 12.5M17.5 10C17.5 14.1421 14.1421 17.5 10 17.5C5.85786 17.5 2.5 14.1421 2.5 10C2.5 5.85786 5.85786 2.5 10 2.5C14.1421 2.5 17.5 5.85786 17.5 10Z" 
            stroke={color} strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );
};

export default ClockIcon;