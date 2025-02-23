import React from 'react';

const KeyIcon = ({customColor, className}) => {

    const color = customColor || 'var(--text-default)';

    return (
        <svg width="100%" height="100%" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
            <path d="M10.5 3.83333C11.4205 3.83333 12.1667 4.57953 12.1667 5.5M15.5 5.5C15.5 8.26142 13.2614 10.5 10.5 10.5C9.99486 10.5 9.50721 10.4251 9.04756 10.2858L7.16667 12.1667H5.5V13.8333H3.83333V15.5H1.33333C0.873096 15.5 0.5 15.1269 0.5 14.6667V12.5118C0.5 12.2908 0.587797 12.0789 0.744077 11.9226L5.71423 6.95244C5.57491 6.49279 5.5 6.00514 5.5 5.5C5.5 2.73858 7.73858 0.5 10.5 0.5C13.2614 0.5 15.5 2.73858 15.5 5.5Z" 
            stroke={color} strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );
};

export default KeyIcon;