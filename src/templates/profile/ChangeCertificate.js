import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// styles
import ButtonStyles from '../../styles/ButtonsBox.module.css'

// queries
import { useAllUserCertificates } from '../../Utilities/Services/userQueries';

// mui and assets
import ArrowButton from '../../elements/icons/ArrowButton';
import AddIcon from '@mui/icons-material/Add';

// components
import Certificate from '../../modules/Settings/Certificate';

// context
import { useTranslation } from '../../Utilities/context/TranslationContext';
import Pagination from '../../elements/reuseable/Pagination';


const ChangeCertificate = () => {

    // language
    const { t } = useTranslation();

    const navigate = useNavigate()

    const [pageNumber, setPageNumber] = useState(1)

    const { data: userCertificates, refetch: refetchCertificates } = useAllUserCertificates(pageNumber,5);


    return (
        <div className='w-[90%] flex flex-col items-center gap-y-6 mt-4'>
            {
                userCertificates && userCertificates.data.map((certificate, index) => (
                    <Certificate key={index} certificateData={certificate} />
                ))
            }


            <Pagination
                totalPagesCount={userCertificates?.totalPagesCount} 
                totalCount={userCertificates?.totalCount}
                setPageNumber={setPageNumber}
                PageNumber={pageNumber}
                refetch={refetchCertificates}
            />

            <div className='fixed bottom-[4rem] w-[90%] rounded-xl md:w-96 md:relative md:bottom-0 md:top-4 z-30'>
                <div className="relative z-10">
                    <button
                    className={`${ButtonStyles.addButton} w-full`}
                    onClick={() => navigate('/Settings/AddNewCertificate')}
                    >
                        <AddIcon />
                        <p>{t('settings.certificate.addCertificate')}</p>
                    </button>
                </div>
                <div className="bg-bgPageMain opacity-90 h-10 w-full -mt-4 relative z-0" />
            </div>

        </div>
    );
};

export default ChangeCertificate;