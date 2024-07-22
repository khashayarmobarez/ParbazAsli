import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// styles
import ButtonStyles from '../../../../styles/Buttons/ButtonsBox.module.css'

// queries
import { useAllUserCertificates } from '../../../../Utilities/Services/userQueries';

// mui 
import AddIcon from '@mui/icons-material/Add';

// components
import Certificate from '../../Settings/Certificate';


const ChangeCertificate = () => {

    const [pageSize, setPageSize] = useState(5)

    const { data: userCertificates, isLoading, error } = useAllUserCertificates(1,pageSize);


    return (
            <div className='w-[90%] flex flex-col items-center gap-y-6 mt-4'>
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

                <Link to='/Settings/certificate' className='fixed bottom-[4.5rem] w-[90%] bg-[#131423] rounded-xl md:w-96 md:relative md:bottom-0 md:top-4  '>
                    <button className={`${ButtonStyles.addButton} w-[100%]`} >
                        <AddIcon />
                        <p>افزودن گواهینامه</p>
                    </button>
                </Link>

            </div>
    );
};

export default ChangeCertificate;