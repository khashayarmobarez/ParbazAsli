import React, { useState } from 'react';
import { Link, Outlet, useLocation, useParams } from 'react-router-dom';

// styles and assets
import ButtonStyles from '../../styles/Buttons/ButtonsBox.module.css'

// comps
import PageTitle from '../../components/reuseable/PageTitle';
import LowOpacityBackForStickedButtons from '../../components/reuseable/LowOpacityBackForStickedButtons';

const Equipment = () => {

    const location = useLocation();

    return (
        <div className=' flex flex-col mt-14 items-center '>

            <div className='w-full flex flex-col items-center gap-y-4 md:w-[65%] lg:gap-y-8 lg:w-[55%]'>

                <PageTitle title={'تجهیزات'} navigateTo={'/profile'} /> 

                <LowOpacityBackForStickedButtons />
                
                {/* buttons */}
                <div dir='rtl' className={`${ButtonStyles.ThreeStickedButtonCont} sticky top-[8.2rem] lg:top-[9rem] z-50`}>
                    <Link to='/equipment/flightEquipment' className={`${ButtonStyles.ThreeStickedButtonButton} rounded-r-xl ${location.pathname === '/equipment/flightEquipment' ? ButtonStyles.activeYellow : ''}`} >بال</Link> 
                    <Link to='/equipment/parachute' className={`${ButtonStyles.ThreeStickedButtonButton}  ${location.pathname === '/equipment/parachute' ? ButtonStyles.activeYellow : ''}`}  >چتر کمکی</Link> 
                    <Link to='/equipment/harness' className={`${ButtonStyles.ThreeStickedButtonButton} rounded-l-xl  ${location.pathname === '/equipment/harness' ? ButtonStyles.activeYellow : ''}`}  >هارنس</Link> 
                </div>


                <div className='w-[90%] flex flex-col z-40'>
                    
                    <Outlet />

                </div>

            </div>

        </div>
    );
};

export default Equipment;



