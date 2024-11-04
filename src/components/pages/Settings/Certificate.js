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
                    <p className='flex-wrap text-xs text-start' >{certificateData.organization} / {certificateData.level}</p>
                </div>
                <div className='flex flex-col items-start gap-y-2 text-start'>
                    <p className='text-textButtonMainDisabled '>
                        وضعیت:
                        {certificateData.status === 'Active' && <span className='text-textAccent'> فعال</span>}
                        {certificateData.status === 'Pending' && <span className='text-textWarning'> در انتظار تایید</span>}
                        {certificateData.status === 'Expired' && <span className='text-textError'> منقضی شده</span>}
                        {certificateData.status === 'Rejected' && <span className='text-textError'> رد شده</span>}
                    </p>
                    <p className='text-xs'>تاریخ انقضا {certificateData.expirationDate}</p>
                </div>

            </div>

            {certificateData.status === 'Rejected' &&
                <div className='w-full flex items-center gap-x-2  mt-4'>
                    <p className='text-sm text-textWarning font-medium'>دلیل رد شدن: {certificateData.rejectReason}</p>
                </div>
            }

        </div>
    );
};

export default Certificate;