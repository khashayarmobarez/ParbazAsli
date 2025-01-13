import React from 'react';

const RadioButton = ({ isChecked, buttonText }) => {
    return (
        <div className='w-full flex gap-x-4 items-center justify-start'>
            <div className={`w-6 h-6 flex items-center justify-center border-2 ${isChecked ? 'border-textAccent' : 'border-textDefault'} hover:border-textAccent rounded-full `}>
                {
                    isChecked &&
                    <div className='w-4 h-4 bg-textAccent rounded-full' />
                }
            </div>
            <p>{buttonText || 'فعال'}</p>
        </div>
    );
};

export default RadioButton;