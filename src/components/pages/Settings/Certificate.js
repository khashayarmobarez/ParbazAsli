import React from 'react';

//  assets
import CertificateIcon from '../../../components/icons/CertificateIcon'


const Certificate = ({certificateData}) => {

    return (
        <div className=' w-full min-h-16 rounded-[2rem] flex flex-col justify-between pr-4 pl-3 py-4 ' 
        style={{background:'var(--bg-card)', boxShadow:'var(--shadow-all)', color:'var(--text-default) ' }}>
            
            <div className=' w-full text-xs flex justify-between items-center gap-x-2'>

                <div className=' flex gap-x-1 '>
                    <span className='w-7'>
                        <CertificateIcon/>
                    </span>
                    <p className='flex-wrap text-xs' >{certificateData.organization} / {certificateData.level}</p>
                </div>
                <div className='flex flex-col items-start gap-y-2 text-start'>
                    <p className='text-textDisabled '>
                        وضعیت:
                        {certificateData.status === 'Active' && <span style={{color:'var(--text-accent)'}}> فعال</span>}
                        {certificateData.status === 'Pending' && <span style={{color:'var(--text-default)'}}> در انتظار تایید</span>}
                        {certificateData.status === 'Expired' && <span style={{color:'var(--text-error)'}}> منقضی شده</span>}
                        {certificateData.status === 'Rejected' && <span style={{color:'var(--text-error)'}}> رد شده</span>}
                    </p>
                    <p className='text-xs'>تاریخ انقضا {certificateData.expirationDate}</p>
                </div>

            </div>

            {certificateData.status === 'Rejected' &&
                <div className='w-full flex items-center gap-x-2  mt-4'>
                    <p className='text-sm text-textError font-medium'>دلیل رد شدن: {certificateData.rejectReason}</p>
                </div>
            }

        </div>
    );
};

export default Certificate;