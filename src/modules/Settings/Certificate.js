import React from 'react';
import { useNavigate } from 'react-router-dom';

// styles
import ButtonStyles from '../../styles/Buttons/ButtonsBox.module.css'

//  assets
import CertificateIcon from '../../components/icons/CertificateIcon'


const Certificate = ({certificateData}) => {

    const navigate = useNavigate();

    const handleRenewal = () => {
        navigate(`/Settings/RenewCertificate/${certificateData.id}`)
    }

    return (
        <div className=' w-full min-h-16 rounded-[2rem] flex flex-col justify-between pr-4 pl-3 py-4 ' 
        style={{background:'var(--bg-card)', boxShadow:'var(--shadow-all)', color:'var(--text-default) ' }}>
            
            <div className=' w-full text-xs grid grid-cols-2 gap-x-4'>

                <div className=' flex gap-x-1 '>
                    <span className='w-7'>
                        <CertificateIcon/>
                    </span>
                    <p className='flex-wrap text-xs text-start' >{certificateData.organization} / {certificateData.level}</p>
                </div>
                <div className='flex flex-col items-start gap-y-2 text-start pr-4'>
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
                    <p className='text-sm text-textWarning'>دلیل رد شدن: {certificateData.rejectReason}</p>
                </div>
            }

            {
                ( certificateData.status === 'Active' || certificateData.status === 'Expired' ) &&
                <button 
                className={`${ButtonStyles.normalButton} self-center mt-5 text-xs`}
                onClick={handleRenewal}>
                    تمدید
                </button>
            }

        </div>
    );
};

export default Certificate;