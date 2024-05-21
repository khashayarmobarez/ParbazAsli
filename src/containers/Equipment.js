import React, { useEffect, useState, useRef } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';

// styles and assets
import ButtonStyles from '../styles/Buttons/ButtonsBox.module.css'

// Queries
import { useUserDetails } from '../Utilities/Services/queries';
import PageTitle from '../components/reuseable/PageTitle';

const Equipment = () => {

    const { data, isLoading, error } = useUserDetails();

    const navigate = useNavigate();

    // to set which button is active and style it
    const [activeLink, setActiveLink] = useState('flight'); // State to track active link
    

    // Ref to the button element
    const buttonRef = useRef(null);


    // Effect to click the button when the page is mounted
  useEffect(() => {
    // Check if the button ref exists and it has a current property
    if (buttonRef.current) {
      // Programmatically click the button
      buttonRef.current.click();
    }
  }, []); // Empty dependency array ensures the effect runs only once after initial render


    return (
        <div className=' flex flex-col mt-14 items-center '>

            <div className='w-full flex flex-col items-center md:w-[80%] gap-y-4 md:gap-y-6'>

                <PageTitle title={'تجهیزات'}  />  
                
                {/* buttons */}
                <div className={`${ButtonStyles.ThreeStickedButtonCont}`}>
                    <Link ref={buttonRef} to='/equipment/flightEquipment' className={`${ButtonStyles.ThreeStickedButtonButton} rounded-r-xl ${activeLink === 'flight' ? ButtonStyles.activeYellow : ''}`} onClick={() => setActiveLink('flight')}>وسیله پروازی</Link> 
                    <Link to='/equipment/parachute' className={`${ButtonStyles.ThreeStickedButtonButton}  ${activeLink === 'parachute' ? ButtonStyles.activeYellow : ''}`} onClick={() => setActiveLink('parachute')} >چتر کمکی</Link> 
                    <Link to='/equipment/harness' className={`${ButtonStyles.ThreeStickedButtonButton} rounded-l-xl  ${activeLink === 'harness' ? ButtonStyles.activeYellow : ''}`} onClick={() => setActiveLink('harness')} >هارنس</Link> 
                </div>


                <div className='w-[90%] mt-6 flex flex-col gap-y-8'>

                    {
                        isLoading && <h2 className='text-white mt-32'>is loading</h2>
                    }

                    {
                        error && <h3>{error.message}</h3>
                    }
                    {
                    data && 
                    <Outlet />
                    // <FlightEquipment key={data} data={data} />
                    // data && data.data.map(data => (<FlightEquipment key={data} data={data} />))
                    }

                </div>

            </div>

        </div>
    );
};

export default Equipment;



