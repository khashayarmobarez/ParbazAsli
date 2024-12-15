import React from 'react';

const SearchIcon = ({anotherColor}) => {

    const color = 'var(--text-default)';

    return (
        <svg width="100%" height="100%" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.5 17.5L12.5 12.5M14.1667 8.33333C14.1667 11.555 11.555 14.1667 8.33333 14.1667C5.11167 14.1667 2.5 11.555 2.5 8.33333C2.5 5.11167 5.11167 2.5 8.33333 2.5C11.555 2.5 14.1667 5.11167 14.1667 8.33333Z" 
            stroke={anotherColor || color} stroke-width="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );
};

export default SearchIcon;