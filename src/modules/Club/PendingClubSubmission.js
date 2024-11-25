import React from 'react';

// assets
import Attention from '../../components/icons/Attention';

// components
import PageTitle from '../../components/reuseable/PageTitle';

const PendingClubSubmission = () => {
    return (
        <>
            <PageTitle title='باشگاه' />

            <div className='w-[90%] h-[60vh] flex flex-col justify-center items-center'>
                <span className='w-14 h-14 mx-auto'>
                    <Attention />
                </span>
                <p className='mt-4'>در انتظار تایید...</p>
                <p className='mt-6'>درخواست شما برای ثبت باشگاه در انتظار تایید است.
                از صبوری شما سپاسگزاریم.</p>
            </div>
        </>
    );
};

export default PendingClubSubmission;