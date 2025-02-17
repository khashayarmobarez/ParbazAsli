import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

// mui
import ArrowButton from '../icons/ArrowButton';


const Pagination = ({totalCount, PageNumber, setPageNumber, totalPagesCount, refetch}) => {

    // language and direction
    const dir = Cookies.get('dir') || 'ltr';

    const [temporaryPageNumber, setTemporaryPageNumber] = useState(1)

    useEffect(()=> {
        setTemporaryPageNumber(PageNumber)
    },[PageNumber])

    const handleNextPageNumber = () => {
        setPageNumber(prev => prev + 1)
    }

    const handleLastPageNumber = () => {
        setPageNumber(prev => prev - 1)
    }

    const handlePageChange = (e) => {
        const value = e.target.value;
        if (!isNaN(value)) {
            setTemporaryPageNumber(value);
        }
        
        if (value > 0 && value <= totalPagesCount && !isNaN(value)) {
            setTimeout(() => {
                setPageNumber(value);
                refetch();
            }, 1000);
        }
    }

    if(totalPagesCount && totalPagesCount > 1) return (
        <div className='w-full flex justify-center items-center'>
            <div className='bg-bgCard w-40 h-11 rounded-[34px] flex justify-between items-center px-4'>

                <button
                    className={`transform w-6 h-6 justify-self-end `}
                    disabled={PageNumber === 1}
                    onClick={handleLastPageNumber}
                >
                    <ArrowButton isRight={dir !== 'ltr' && true} isDisable={PageNumber === 1}/>
                </button>

                <div className='w-16 flex gap-x-1 justify-center items-center text-xs'>

                    <p>{totalPagesCount} / </p>

                    <input 
                        type='text' 
                        value={temporaryPageNumber} 
                        className='w-6 h-6 text-center text-sm rounded-md border border-textDefault bg-bgButtonSecondaryDefault'
                        onChange={handlePageChange}
                    />

                </div>

                <button
                    className={`w-6 h-6 justify-self-start `}
                    disabled={totalPagesCount === 1 || totalPagesCount === PageNumber}
                    onClick={handleNextPageNumber}
                >
                    <ArrowButton 
                    isDisable={totalPagesCount === 1 || totalPagesCount === PageNumber}
                    isRight={dir === 'ltr' && true}/>
                </button>


            </div>
        </div>
    );
};

export default Pagination;


// example of usage
// <Pagination 
//     totalPagesCount={notificationsData?.totalPagesCount} 
//     totalCount={notificationsData?.totalCount}
//     setPageNumber={setPageNumber}
//     PageNumber={PageNumber}
//     refetch={refetchNotifications}
// />