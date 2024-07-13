import React, { useEffect, useRef, useState } from 'react';

// components 
import PageTitle from '../components/reuseable/PageTitle';

// styles
import ButtonStyles from '../styles/Buttons/ButtonsBox.module.css'


// mui

//  Queries
import { useUserFlights } from '../Utilities/Services/flightHistoriesQueries';

// components
import PracticalFlightHistoryBox from '../components/pages/FlightHistory/PracticalFlightHistoryBox';


const FlightHistory = () => {

    // react query
    const { data: userFlights, isLoading: userFlightsLoading } = useUserFlights(1,20);


    return (
        
        <div className='w-full flex flex-col justify-center items-center'>

            <div className='w-full md:w-[75%] py-14 flex flex-col justify-center items-center gap-y-2'>

                <PageTitle title={'سوابق پرواز'} navigateTo={'profile'} /> 

                <div className='w-[90%] mt-6 flex flex-col gap-y-8'>

                        <div className='w-full flex flex-col justify-center items-center px-1 gap-y-4'>
                            
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

                            {
                                userFlights &&
                                <div className='w-full flex flex-col gap-y-6'>
                                    {userFlights.data.map((flight) => (
                                        <PracticalFlightHistoryBox key={flight.id} flightBaseData={flight} />
                                    ))}
                                </div>
                            }

                        </div>
                    {/* } */}
                </div>
            
            </div>

        </div>
    );
};

export default FlightHistory;
