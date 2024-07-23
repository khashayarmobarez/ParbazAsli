import React, { useEffect, useRef, useState } from 'react';

// styles
import ButtonStyles from '../../../styles/Buttons/ButtonsBox.module.css'

// mui
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';

// components
import PageTitle from '../../reuseable/PageTitle';
import SearchInput from '../../inputs/SearchInput';
import WorldMapFlightHistory from '../../pages/FlightHistory/WorldMapFlightHistory';

const PilotsHistory = () => {

    // to set which button is active and style it
    const [activeLink, setActiveLink] = useState('entertaiment'); // State to track active link

    // Ref to the button element
    const buttonRef = useRef(null);

    // Effect to click the button when the page is mounted
  useEffect(() => {
    // Check if the button ref exists and it has a current property
    if (buttonRef.current) {
      // Programmatically click the button
      buttonRef.current.click();
    }
  }, []);

    return (
        <div className=' pt-16 flex justify-center'>
            <div className='w-full flex flex-col items-center md:w-[75%]'>

                <PageTitle title={'سوابق پروازی رضا نظری'} navigateTo={'/organizationPilots'} paddingRight={'28%'} /> 

                <div className={`${ButtonStyles.ThreeStickedButtonCont}`}>
                    <button  className={`${ButtonStyles.ThreeStickedButtonButton} rounded-r-xl ${activeLink === 'entertaiment' ? ButtonStyles.activeYellow : ''}`} onClick={() => setActiveLink('entertaiment')}>پرواز تفریحی</button> 
                    <button ref={buttonRef}  className={`${ButtonStyles.ThreeStickedButtonButton} rounded-l-xl  ${activeLink === 'freeFlight' ? ButtonStyles.activeYellow : ''}`} onClick={() => setActiveLink('freeFlight')} >پرواز آزاد</button>
                </div>

                <div className='w-[90%] mt-6 flex flex-col gap-y-8'>
                        <div className='w-full flex flex-col justify-center items-center px-1 gap-y-4'>
                            
                            <div className='w-full flex flex-col gap-y-2 mb-[-2rem]'>

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

                            </div>


                            <div className='w-full flex flex-col gap-y-6'>
                                
                                <SearchInput />

                                
                            </div>

                        </div>
                </div>

            </div>
        </div>
    );
};

export default PilotsHistory;