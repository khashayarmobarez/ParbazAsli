import React, { useEffect, useState, useRef } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';

// styles and assets
import ButtonStyles from '../../../styles/Buttons/ButtonsBox.module.css'

// comps
import PageTitle from '../../../components/reuseable/PageTitle';

const ClubEquipment = () => {

    const location = useLocation();


     // Empty dependency array ensures the effect runs only once after initial render


    return (
        <div className=' flex flex-col mt-14 items-center '>

            <div className='w-full flex flex-col items-center gap-y-6 md:w-[80%] md:gap-y-6'>

                <PageTitle title={'تجهیزات'} navigateTo={'/club'} />  
                
                {/* buttons */}
                <div className={`${ButtonStyles.ThreeStickedButtonCont} sticky top-[6.6rem] z-50`}>
                    <Link to='/club/clubEquipment/flightEquipments' className={`${ButtonStyles.ThreeStickedButtonButton} rounded-r-xl ${location.pathname === '/club/clubEquipment/flightEquipments' ? ButtonStyles.activeYellow : ''}`} >بال</Link> 
                    <Link to='/club/clubEquipment/parachutes' className={`${ButtonStyles.ThreeStickedButtonButton}  ${location.pathname === '/club/clubEquipment/parachutes' ? ButtonStyles.activeYellow : ''}`}  >چتر کمکی</Link> 
                    <Link to='/club/clubEquipment/harnesses'     className={`${ButtonStyles.ThreeStickedButtonButton} rounded-l-xl  ${location.pathname === '/club/clubEquipment/harnesses' ? ButtonStyles.activeYellow : ''}`}  >هارنس</Link> 
                </div>


                <div className='w-[90%] flex flex-col'>
                    
                    <Outlet />

                </div>

            </div>

        </div>
    );
};

export default ClubEquipment;



