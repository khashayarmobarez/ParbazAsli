import React from 'react';

const Attention = ({customColor}) => {
    return (
        <svg width="100%" height="100%" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M28 18.6667V28M28 37.3333H28.0233M49 28C49 39.598 39.598 49 28 49C16.402 49 7 39.598 7 28C7 16.402 16.402 7 28 7C39.598 7 49 16.402 49 28Z" stroke={customColor || "var(--text-accent)"} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    );
};

export default Attention;