import React, { useState } from 'react';
import { Link, Outlet, useLocation, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';

// styles and assets
import ButtonStyles from '../../styles/ButtonsBox.module.css'

// comps
import PageTitle from '../../elements/reuseable/PageTitle';
import LowOpacityBackForStickedButtons from '../../elements/reuseable/LowOpacityBackForStickedButtons';
import { useTranslation } from '../../Utilities/context/TranslationContext';

const Equipment = () => {

    // language
    const { t } = useTranslation();
    const dir = Cookies.get('dir') || 'ltr';

    const location = useLocation();

    return (
        <div className=' flex flex-col mt-14 items-center '>

            <div className='w-full flex flex-col items-center gap-y-4 md:w-[65%] lg:gap-y-8 lg:w-[55%]'>

                <PageTitle title={t('equipment.equipment')} navigateTo={'/profile'} /> 

                <LowOpacityBackForStickedButtons />
                
                {/* buttons */}
                <div 
                className={`${ButtonStyles.ThreeStickedButtonCont} sticky top-[8.2rem] lg:top-[9rem] z-50`}
                >

                    <Link
                    to='/equipment/flightEquipment'
                    className={`${ButtonStyles.ThreeStickedButtonButton}
                    ${dir === 'ltr' ? 'rounded-l-xl' : 'rounded-r-xl'}
                    ${location.pathname === '/equipment/flightEquipment' ? ButtonStyles.activeYellow : ''}`}
                    style={{fontSize: dir === 'ltr' ? '12px' : '14px'}}
                    >
                        {t('equipment.flightEquipment')}
                    </Link> 

                    <Link
                    to='/equipment/parachute'
                    className={`${ButtonStyles.ThreeStickedButtonButton}
                    ${location.pathname === '/equipment/parachute' ? ButtonStyles.activeYellow : ''}`}
                    >
                        {t('equipment.parachute')}
                    </Link> 

                    <Link
                    to='/equipment/harness' 
                    className={`${ButtonStyles.ThreeStickedButtonButton} 
                    ${dir === 'ltr' ? 'rounded-r-xl' : 'rounded-l-xl'}
                    ${location.pathname === '/equipment/harness' ? ButtonStyles.activeYellow : ''}`}  
                    >
                        {t('equipment.harness')}
                    </Link> 

                </div>


                <div className='w-[90%] flex flex-col z-40'>
                    
                    <Outlet />

                </div>

            </div>

        </div>
    );
};

export default Equipment;



