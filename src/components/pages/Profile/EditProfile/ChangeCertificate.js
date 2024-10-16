import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// styles
import ButtonStyles from '../../../../styles/Buttons/ButtonsBox.module.css'

// queries
import { useAllUserCertificates } from '../../../../Utilities/Services/userQueries';

// mui and assets
import arrowIcon from '../../../../assets/icons/Right Arrow Button.svg';
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
                        userCertificates && userCertificates.data.map((certificate) => (

                            <Certificate certificateData={certificate} />

                        ))
                }

                {userCertificates && userCertificates.totalPagesCount > 1 &&
                    <div className='w-full flex justify-between px-14 items-center mt-2'>
                        <button
                            className='transform  w-10 justify-self-end'
                            disabled={pageNumber === 1}
                            onClick={handleLastPageNumber}
                        >
                            <img
                                src={arrowIcon}
                                alt='arrow'
                                className={`mt-2 ${pageNumber === 1 && 'opacity-60'}`}
                            />
                        </button>

                        <p className='text-sm justify-self-center' style={{ color: 'var(--text-accent)' }}>
                            صفحه ی {pageNumber}
                        </p>

                        <button
                            className='w-10 rotate-180 justify-self-start'
                            disabled={userCertificates.totalPagesCount === 1 || userCertificates.totalPagesCount === pageNumber}
                            onClick={handleNextPageNumber}
                        >
                            <img
                                src={arrowIcon}
                                alt='arrow'
                                className={`${(userCertificates.totalPagesCount === 1 || userCertificates.totalPagesCount === pageNumber) && 'opacity-60'}`}
                            />
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