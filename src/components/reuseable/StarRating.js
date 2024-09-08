import React from 'react';

// assets
import yellowStar from '../../assets/icons/starIconYellow.svg'
import whiteStar from '../../assets/icons/starIconWhite.svg'

const StarRating = ({rate, setRate}) => {


    return (
        <div className='w-full flex flex-row-reverse justify-between px-4 items-center'>
            
            {
                rate > 0 ?
                <img src={yellowStar} alt='star' className='w-6' onClick={() => setRate(1)} />
                :
                <img src={whiteStar} alt='star' className='w-6' onClick={() => setRate(1)} />
            }

            {
                rate > 1 ?
                <img src={yellowStar} alt='star' className='w-6' onClick={() => setRate(2)} />
                :
                <img src={whiteStar} alt='star' className='w-6' onClick={() => setRate(2)} />
            }

            {
                rate > 2 ?
                <img src={yellowStar} alt='star' className='w-6' onClick={() => setRate(3)} />
                :
                <img src={whiteStar} alt='star' className='w-6' onClick={() => setRate(3)} />
            }

            {
                rate > 3 ?
                <img src={yellowStar} alt='star' className='w-6' onClick={() => setRate(4)} />
                :
                <img src={whiteStar} alt='star' className='w-6' onClick={() => setRate(4)} />
            }

            {
                rate > 4 ?
                <img src={yellowStar} alt='star' className='w-6' onClick={() => setRate(5)} />
                :
                <img src={whiteStar} alt='star' className='w-6' onClick={() => setRate(5)} />
            }

        </div>
    );
};

export default StarRating;