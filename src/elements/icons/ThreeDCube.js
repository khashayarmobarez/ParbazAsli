import React from 'react';

const ThreeDCube = ({customColor}) => {

    const color = customColor || "var(--text-default)" 

    return (
        <svg width="100%" height="100%" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.6667 5.83333L10 2.5L3.33337 5.83333M16.6667 5.83333L10 9.16667M16.6667 5.83333V14.1667L10 17.5M10 9.16667L3.33337 5.83333M10 9.16667L10 17.5M3.33337 5.83333L3.33337 14.1667L10 17.5" 
            stroke={color}
            strokeLinejoin="round"/>
        </svg>
    );
};

export default ThreeDCube;