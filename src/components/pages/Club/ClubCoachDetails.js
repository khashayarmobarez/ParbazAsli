import React from 'react';
import { useParams } from 'react-router-dom';
import PageTitle from '../../reuseable/PageTitle';

const ClubCoachDetails = () => {

    const { id } = useParams();

    return (
        <div className='w-full flex flex-col items-center pt-20'>
            <div className='w-[90%] flex flex-col items-center'>

                {id}
            </div>
        </div>
    );
};

export default ClubCoachDetails;