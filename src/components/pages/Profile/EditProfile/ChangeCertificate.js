import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// styles
import ButtonStyles from '../../../../styles/Buttons/ButtonsBox.module.css'

// queries
import { useAllUserCertificates } from '../../../../Utilities/Services/userQueries';

// mui and assets
import ArrowButton from '../../../../components/icons/ArrowButton';
import AddIcon from '@mui/icons-material/Add';

// components
import Certificate from '../../Settings/Certificate';


const ChangeCertificate = () => {

    const navigate = useNavigate()

    const [pageNumber, setPageNumber] = useState(1)

    const { data: userCertificates, isLoading, error } = useAllUserCertificates(pageNumber,5);

    const handleNextPageNumber = () => {
        setPageNumber(prev => prev + 1)
    }

    const handleLastPageNumber = () => {
        setPageNumber(prev => prev - 1)
    }


    return (
            <div className='w-[90%] flex flex-col items-center gap-y-6 mt-4'>
                {
                        userCertificates && userCertificates.data.map((certificate, index) => (

                            <Certificate key={index} certificateData={certificate} />

                        ))
                }

                {userCertificates && userCertificates.totalPagesCount > 1 &&
                    <div className={`w-full flex justify-between px-14 items-center mt-2 `}>
                        <button
                            className='transform  w-6 h-6 justify-self-end'
                            disabled={userCertificates.totalPagesCount === 1 || userCertificates.totalPagesCount === pageNumber}
                            onClick={handleNextPageNumber}
                        >
                            <ArrowButton isRight={true} isDisable={userCertificates.totalPagesCount === 1 || userCertificates.totalPagesCount === pageNumber}/>
                        </button>

                        <p className='text-sm justify-self-center' style={{ color: 'var(--text-accent)' }}>
                            صفحه ی {pageNumber}
                        </p>

                        <button
                            className={`w-6 h-6 justify-self-start `}
                            isDisable={pageNumber === 1}
                            onClick={handleLastPageNumber}
                        >
                            <ArrowButton  isDisable={pageNumber === 1}/>
                        </button>
                    </div>
                }

                <div onClick={() => navigate('/Settings/certificate')} className='fixed bottom-[4.5rem] w-[90%] bg-bgCard rounded-xl md:w-96 md:relative md:bottom-0 md:top-4  '>
                    <button className={`${ButtonStyles.addButton} w-[100%]`} >
                        <AddIcon />
                        <p>افزودن گواهینامه</p>
                    </button>
                </div>

            </div>
    );
};

export default ChangeCertificate;