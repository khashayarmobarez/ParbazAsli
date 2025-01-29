import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// styles
import ButtonStyles from '../../styles/ButtonsBox.module.css'

// mui 
import AddIcon from '@mui/icons-material/Add';

// queries
import { useAllUserCertificates } from '../../Utilities/Services/userQueries';

// components
import Certificate from './Certificate';
import CircularProgressLoader from '../../components/Loader/CircularProgressLoader';

// context
import { useTranslation } from '../../Utilities/context/TranslationContext';

const CertificateSettings = () => {

    // language
    const { t } = useTranslation();

    const navigate = useNavigate();

    const [pageSize, setPageSize] = useState(3)

    const { data: userCertificates, isLoading } = useAllUserCertificates(1,3);

    return (
        <div className='w-full flex flex-col items-center gap-y-6 mt-4'>
                {
                    userCertificates && userCertificates.data.map((certificate, index) => (

                        <Certificate key={index} certificateData={certificate} />

                    ))
                }

                {
                    isLoading &&
                    <CircularProgressLoader />
                }

                {
                    userCertificates && userCertificates.totalCount >= pageSize &&
                    <p
                        onClick={() => navigate(`/editProfile/changeCertificate`)}
                        className='w-full'
                        style={{ color: 'var(--text-accent)' }}
                    >
                        {t('settings.certificate.viewAll')}
                    </p>
                }

                <Link to='/Settings/AddNewCertificate' className='flex w-full rounded-xl mt-4'>
                    <button className={`${ButtonStyles.addButton} w-[100%]`}>
                        <AddIcon />
                        <p>{t('settings.certificate.addCertificate')}</p>
                    </button>
                </Link>

            </div>
    );
};

export default CertificateSettings;