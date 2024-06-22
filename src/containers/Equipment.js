import React, { useEffect, useState, useRef } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';

// styles and assets
import ButtonStyles from '../styles/Buttons/ButtonsBox.module.css'

// comps
import PageTitle from '../components/reuseable/PageTitle';

const Equipment = () => {

    const navigate = useNavigate();

    // to set which button is active and style it
    const [activeLink, setActiveLink] = useState('flight'); // State to track active link
    



     // Empty dependency array ensures the effect runs only once after initial render


    return (
        <div className=' flex flex-col mt-14 items-center '>

            <div className='w-full flex flex-col items-center md:w-[80%] gap-y-4 md:gap-y-6'>

                <PageTitle title={'تجهیزات'}  />  
                
                {/* buttons */}
                <div className={`${ButtonStyles.ThreeStickedButtonCont} sticky top-[7.8rem]`}>
                    <Link  to='/equipment/flightEquipment' className={`${ButtonStyles.ThreeStickedButtonButton} rounded-r-xl ${activeLink === 'flight' ? ButtonStyles.activeYellow : ''}`} onClick={() => setActiveLink('flight')}>بال</Link> 
                    <Link to='/equipment/parachute' className={`${ButtonStyles.ThreeStickedButtonButton}  ${activeLink === 'parachute' ? ButtonStyles.activeYellow : ''}`} onClick={() => setActiveLink('parachute')} >چتر کمکی</Link> 
                    <Link to='/equipment/harness' className={`${ButtonStyles.ThreeStickedButtonButton} rounded-l-xl  ${activeLink === 'harness' ? ButtonStyles.activeYellow : ''}`} onClick={() => setActiveLink('harness')} >هارنس</Link> 
                </div>


                <div className='w-[90%] mt-6 flex flex-col gap-y-8'>
                    
                    <Outlet />

                </div>

            </div>

        </div>
    );
};

export default Equipment;



