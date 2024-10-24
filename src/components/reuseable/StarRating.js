import React from 'react';

// assets
import yellowStar from '../../assets/icons/starIconYellow.svg'
import StarRateDisable from '../icons/StarRateDisable';

const StarRating = ({rate, setRate}) => {


    return (
        <div className='w-full flex flex-row-reverse justify-between px-4 items-center'>
            
            {
                rate > 0 ?
                <img src={yellowStar} alt='star' className='w-6' onClick={() => setRate(1)} />
                :
                <span className='w-6 h-6' onClick={() => setRate(1)}>
                    <StarRateDisable />
                </span>
            }

            {
                rate > 1 ?
                <img src={yellowStar} alt='star' className='w-6' onClick={() => setRate(2)} />
                :
                <span className='w-6 h-6' onClick={() => setRate(2)}>
                    <StarRateDisable />
                </span>
            }

            {
                rate > 2 ?
                <img src={yellowStar} alt='star' className='w-6' onClick={() => setRate(3)} />
                :
                <span className='w-6 h-6' onClick={() => setRate(3)}>
                    <StarRateDisable />
                </span>
            }

            {
                rate > 3 ?
                <img src={yellowStar} alt='star' className='w-6' onClick={() => setRate(4)} />
                :
                <span className='w-6 h-6' onClick={() => setRate(4)}>
                    <StarRateDisable />
                </span>
            }

            {
                rate > 4 ?
                <img src={yellowStar} alt='star' className='w-6' onClick={() => setRate(5)} />
                :
                <span className='w-6 h-6' onClick={() => setRate(5)}>
                    <StarRateDisable />
                </span>
            }

        </div>
    );
};

export default StarRating;