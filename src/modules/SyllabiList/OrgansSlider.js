import React from 'react';
import Cookies from 'js-cookie';

import ArrowButton from '../../components/icons/ArrowButton';

const OrgansSlider = ({organs, setOrgan, theOrgan}) => {

    const dir = Cookies.get('dir') || 'ltr';

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
            <button onClick={handlePrevOrgan} className='w-6 h-6 active:w-6 hover:h-6'>
                <ArrowButton isRight={dir !== 'ltr' && true} />
            </button>

            {theOrgan && (
                <h1 className='text-sm font-medium text-textAccent'>{theOrgan.name}</h1>
            )}

            <button onClick={handleNextOrgan} className='w-6 h-6'>
                <ArrowButton isRight={dir === 'ltr' && true} />
            </button>
        </div>
    );
};

export default OrgansSlider;