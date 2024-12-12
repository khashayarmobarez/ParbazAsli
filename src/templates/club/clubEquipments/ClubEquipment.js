import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

// styles and assets
import ButtonStyles from '../../../styles/Buttons/ButtonsBox.module.css'

// comps
import PageTitle from '../../../components/reuseable/PageTitle';
import LowOpacityBackForStickedButtons from '../../../components/reuseable/LowOpacityBackForStickedButtons';

const ClubEquipment = () => {

    const location = useLocation();


    return (
        <div className=' flex flex-col mt-14 items-center '>

            <div className='w-full flex flex-col items-center gap-y-6 md:w-[80%] md:gap-y-6 lg:gap-y-12'>

                <PageTitle title={'تجهیزات'} navigateTo={'/club'} />  

                <LowOpacityBackForStickedButtons />
                
                {/* buttons */}
                <div className={`${ButtonStyles.ThreeStickedButtonCont} sticky top-[8.2rem] lg:top-[9rem] z-50`}>
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



