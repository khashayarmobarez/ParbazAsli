import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// components 
import PageTitle from '../components/reuseable/PageTitle';

// styles
import ButtonStyles from '../styles/Buttons/ButtonsBox.module.css'

// assets
import arrowIcon from '../assets/icons/Right Arrow Button.svg';

// mui

//  Queries
import { useUserFlights } from '../Utilities/Services/flightHistoriesQueries';

// components
import PracticalFlightHistoryBox from '../components/pages/FlightHistory/PracticalFlightHistoryBox';


const FlightHistory = () => {

    const navigate = useNavigate();

    const [pageNumber, setPageNumber] = useState(1);

    useEffect(() => {
        console.log('page number:', pageNumber)
    }, [pageNumber])

    // react query
    const { data: userFlights, isLoading: userFlightsLoading } = useUserFlights(pageNumber,10, '','', '', '', '', '', '', '', '', '' , '' , '');

    // increase the page number by 1 
    const handleNextPage= () => {
        pageNumber < userFlights.totalPagesCount && setPageNumber(pageNumber + 1);
    }

    const handlePrevPage = () => {
        pageNumber > 1 && setPageNumber(pageNumber - 1);
    }



    return (
        
        <div className='w-full flex flex-col justify-center items-center'>

            <div className='w-full md:w-[75%] py-14 flex flex-col justify-center items-center gap-y-0'>

                <PageTitle title={'سوابق پرواز'} navigateTo={'profile'} /> 

                <div className='w-[90%] mt-6 flex flex-col'>

                        <div className='w-full flex flex-col justify-center items-center px-1 gap-y-8'>
                            
                            {/* removed from this page */}
                            {/* <div className='w-full flex flex-col gap-y-2 mb-[-2rem]'>

                                <div className='w-full flex justify-between items-center'>
                                    <div className='flex justify-center items-center' >
                                        <MailOutlinedIcon sx={{width:'2.5rem'}} />
                                        <p className='text-sm' >112 تعداد پرواز</p>
                                    </div>
                                    <div className='flex justify-center items-center' >
                                        <MailOutlinedIcon sx={{width:'2.5rem'}} />
                                        <p className='text-sm' >98 ساعت پرواز</p>
                                    </div>
                                </div>

                                <WorldMapFlightHistory  />

                            </div> */}


                            {/* Advanced filter */}
                            <button
                            className={`w-full ${ButtonStyles.normalButton} `}
                            onClick={() => navigate('/flightHistory/advancedFilter')}>
                                فیلتر جست‌وجو 
                            </button>


                            {/* flight history */}
                            {
                                userFlights &&
                                <div className='w-full flex flex-col gap-y-6'>
                                    {userFlights.data.map((flight) => (
                                        <PracticalFlightHistoryBox key={flight.id} flightBaseData={flight} />
                                    ))}
                                </div>
                            }

                            {/* pagination buttons */}
                            {userFlights &&
                            <div className='w-full flex justify-between px-10 items-center'>

                                <button className={`w-10 justify-self-start`} 
                                disabled={userFlights.totalPagesCount === 1 || userFlights.totalPagesCount === pageNumber} 
                                onClick={handleNextPage}>
                                    <img src={arrowIcon} alt='arrow' 
                                    className={ `${(userFlights.totalPagesCount === 1 || userFlights.totalPagesCount === pageNumber) && 'opacity-60' } `} />
                                </button>

                                <p className='text-sm justify-self-center' style={{color:'var(--yellow-text)'}}>صفحه ی {pageNumber}</p>
                                
                                <button 
                                    className={`transform rotate-180 w-10 justify-self-end`}
                                    disabled={pageNumber === 1}
                                    onClick={ handlePrevPage}>
                                    <img src={arrowIcon} alt='arrow' className={`mt-2 ${ pageNumber === 1 && 'opacity-60'}`} />
                                </button>

                            </div>
                            }

                        </div>
                </div>
            
            </div>

        </div>
    );
};

export default FlightHistory;
