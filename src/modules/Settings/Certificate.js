import React from 'react';
import { useNavigate } from 'react-router-dom';

// styles
import ButtonStyles from '../../styles/ButtonsBox.module.css'

//  assets
import CertificateIcon from '../../elements/icons/CertificateIcon'

// 
import { useTranslation } from '../../Utilities/context/TranslationContext';


const Certificate = ({certificateData}) => {

    // language
    const { t } = useTranslation();

    const navigate = useNavigate();

    const handleRenewal = () => {
        navigate(`/Settings/RenewCertificate/${certificateData.id}`)
    }

    return (
        <div className='w-full min-h-16 rounded-[2rem] flex flex-col justify-between p-4'
        style={{ background: 'var(--bg-card)', boxShadow: 'var(--shadow-all)', color: 'var(--text-default)' }}>

            <div className='w-full text-xs grid grid-cols-10 gap-x-1'>
                <div className='flex gap-x-2 items-center col-span-6'>
                    <span className='w-7'>
                        <CertificateIcon />
                    </span>
                    <p className='flex-wrap text-xs text-start'>{certificateData.organization} / {certificateData.level}</p>
                </div>
                <div className='flex flex-col items-end gap-y-2 text-start col-span-4'>
                    <p className='text-textButtonMainDisabled'>
                        {t('editUser.certificate.card.status')}:
                        {certificateData.status === 'Active' && <span className='text-textAccent'>{t('editUser.certificate.card.statusActive')}</span>}
                        {certificateData.status === 'Pending' && <span className='text-textWarning'>{t('editUser.certificate.card.statusPending')}</span>}
                        {certificateData.status === 'Expired' && <span className='text-textError'>{t('editUser.certificate.card.statusExpired')}</span>}
                        {certificateData.status === 'Rejected' && <span className='text-textError'>{t('editUser.certificate.card.statusRejected')}</span>}
                    </p>
                    <p className='text-xs'>{t('editUser.certificate.card.expirationDate')}: {certificateData.expirationDate}</p>
                </div>
            </div>

            {certificateData.status === 'Rejected' &&
                <div className='w-full flex items-center gap-x-2 mt-4'>
                    <p className='text-sm text-textWarning'>{t('editUser.certificate.card.rejectionReason')}: {certificateData.rejectReason}</p>
                </div>
            }

            {
                (certificateData.status === 'Active' || certificateData.status === 'Expired') &&
                <button
                className={`${ButtonStyles.normalButton} self-center mt-5 text-xs h-10`}
                style={{ minHeight: '0' }}
                onClick={handleRenewal}
                >
                    {t('editUser.certificate.card.renew')}
                </button>
            }
        </div>
    );
};

export default Certificate;