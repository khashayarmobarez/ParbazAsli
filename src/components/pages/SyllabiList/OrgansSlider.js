import React, { useEffect, useState } from 'react';

import arrow from '../../../assets/icons/Right Arrow Button.svg'

const OrgansSlider = ({organs, setOrgan, theOrgan}) => {


    // setting the first item from organs on organ state
    useEffect(() => {
        if (organs.length > 0)
        setOrgan(organs[0])
    }, [organs])

    // setting the next organ on organ state
    const handleNextOrgan = () => {
        const index = organs.indexOf(theOrgan)
        if (index < organs.length - 1) {
            setOrgan(organs[index + 1])
        } else {
            setOrgan(organs[0])
        }
    }

    // setting the previous organ on organ state
    const handlePrevOrgan = () => {
        const index = organs.indexOf(theOrgan)
        if (index > 0) {
            setOrgan(organs[index - 1])
        } else {
            setOrgan(organs[organs.length - 1])
        }
    }
    

    return (
        <div className='w-[60%] md:w-[30%] flex justify-between items-center'>

            <button onClick={handlePrevOrgan} className='w-8 h-8 active:w-6 hover:h-6'>
                <img className='w-full' alt='next and prev' src={arrow} />
            </button>

            {theOrgan &&
                <h1 className='text-sm font-medium text-textAccent'>{theOrgan.name}</h1>
            }

            <button onClick={handleNextOrgan} className='w-8 h-8'>
                <img className='transform rotate-180 w-full h-full' alt='next and prev' src={arrow} />
            </button>

        </div>
    );
};

export default OrgansSlider;