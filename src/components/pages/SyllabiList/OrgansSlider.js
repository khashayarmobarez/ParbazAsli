import React, { useEffect, useState } from 'react';

import arrow from '../../../assets/icons/Right Arrow Button.svg'

const OrgansSlider = ({organs}) => {

    const [organ, setOrgan] = useState()

    // setting the first item from organs on organ state
    

    return (
        <div className='w-[50%] md:w-[30%] flex justify-between'>

            <button className='w-8 h-8'>
                <img className='w-full' alt='next and prev' src={arrow} />
            </button>

            { organ &&
                <h1>{organ.name}</h1>
            }

            <button className='w-8 h-8'>
                <img className='transform rotate-180 w-full h-full' alt='next and prev' src={arrow} />
            </button>

        </div>
    );
};

export default OrgansSlider;