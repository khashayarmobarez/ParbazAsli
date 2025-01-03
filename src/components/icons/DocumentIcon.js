import React from 'react';

const DocumentIcon = () => {

    const color = 'var(--text-default)';

    return (
        <svg width="100%" height="100%" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.83366 17.5H14.167C15.0875 17.5 15.8337 16.7538 15.8337 15.8333V7.84518C15.8337 7.62416 15.7459 7.4122 15.5896 7.25592L11.0777 2.74408C10.9215 2.5878 10.7095 2.5 10.4885 2.5H5.83366C4.91318 2.5 4.16699 3.24619 4.16699 4.16667V15.8333C4.16699 16.7538 4.91318 17.5 5.83366 17.5Z" 
            stroke={color} strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );
};

export default DocumentIcon;