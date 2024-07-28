import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// styles
import ButtonStyles from '../../../styles/Buttons/ButtonsBox.module.css'

// mui 
import AddIcon from '@mui/icons-material/Add';

// queries
import { useAllUserCertificates } from '../../../Utilities/Services/userQueries';

// components
import Certificate from './Certificate';

const CertificateSettings = () => {

    const [pageSize, setPageSize] = useState(5)

    const { data: userCertificates, isLoading, error } = useAllUserCertificates(1,pageSize);

    return (
        <div className='w-full flex flex-col items-center gap-y-6 mt-4'>
                {
                    userCertificates && userCertificates.data.map((certificate) => (

                        <Certificate certificateData={certificate} />

                    ))
                }

                {   
                    userCertificates && userCertificates.totalCount >= pageSize &&
                    <p 
                    onClick={() => setPageSize(pageSize + 5)}
                    className='w-full' style={{color:'var(--yellow-text)'}}>
                        مشاهده بیشتر ...
                    </p>
                }

                <Link to='/Settings/certificate' className='flex w-full bg-[#131423] rounded-xl mt-4 '>
                    <button className={`${ButtonStyles.addButton} w-[100%]`} >
                        <AddIcon />
                        <p>افزودن گواهینامه</p>
                    </button>
                </Link>

            </div>
    );
};

export default CertificateSettings;