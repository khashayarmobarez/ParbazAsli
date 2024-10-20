import React from 'react';

// assets
import Attention from '../../../components/icons/Attention';

// components
import PageTitle from '../../reuseable/PageTitle';

const PendingClubSubmission = () => {
    return (
        <>
            <PageTitle title='باشگاه' />

            <div className='w-[90%] h-[60vh] flex flex-col justify-center items-center'>
                <span className='w-20 h-20 mx-auto'>
                    <Attention />
                </span>
                <p>در انتظار تایید...</p>
                <p className='mt-10'>درخواست شما برای ثبت باشگاه در انتظار تایید است.
                از صبوری شما سپاسگزاریم.</p>
            </div>
        </>
    );
};

export default PendingClubSubmission;