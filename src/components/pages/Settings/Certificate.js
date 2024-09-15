import React from 'react';

//  assets
import certifiacte from '../../../assets/icons/certificate-Vector.svg'


const Certificate = ({certificateData}) => {


    return (
        <div className=' w-full min-h-16 rounded-[2rem] flex flex-col justify-between p-4 ' 
        style={{background:'var(--organs-coachData-bg)', boxShadow:'var(--organs-coachData-boxShadow)', color:'var(--soft-white) ' }}>
            
            <div className=' w-full text-xs flex justify-between items-center gap-x-4'>

                <div className=' flex gap-x-2 '>
                    <img src={certifiacte} alt='icon' />
                    <p className='flex-wrap' >{certificateData.organization} / {certificateData.level}</p>
                </div>
                <div className='flex flex-col items-start gap-y-2'>
                    <p className='text-[var(--low-opacity-white)] '>
                        وضعیت:
                        {certificateData.status === 'Active' && <span style={{color:'var(--yellow-text)'}}> فعال</span>}
                        {certificateData.status === 'Pending' && <span style={{color:'var(--primary-light)'}}> در انتظار تایید</span>}
                        {certificateData.status === 'Expired' && <span style={{color:'var(--red-text)'}}> منقضی شده</span>}
                        {certificateData.status === 'Rejected' && <span style={{color:'var(--notification-red)'}}> رد شده</span>}
                    </p>
                    <p>تاریخ {certificateData.expirationDate}</p>
                </div>

            </div>

            {certificateData.status === 'Rejected' &&
                <div className='w-full flex items-center gap-x-2  mt-4'>
                    <p className='text-sm text-[var(--notification-red)] font-medium'>دلیل رد شدن: {certificateData.rejectReason}</p>
                </div>
            }

        </div>
    );
};

export default Certificate;