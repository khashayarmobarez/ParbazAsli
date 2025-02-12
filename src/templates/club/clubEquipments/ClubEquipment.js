import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';

// styles and assets
import ButtonStyles from '../../../styles/ButtonsBox.module.css'

// comps
import PageTitle from '../../../elements/reuseable/PageTitle';
import LowOpacityBackForStickedButtons from '../../../elements/reuseable/LowOpacityBackForStickedButtons';

// context
import { useTranslation } from '../../../Utilities/context/TranslationContext';

const ClubEquipment = () => {

    // language
    const { t } = useTranslation();
    const dir = Cookies.get('dir') || 'ltr';
    

    const location = useLocation();


    return (
        <div className=' flex flex-col mt-14 items-center '>

            <div className='w-full flex flex-col items-center gap-y-6 md:w-[80%] md:gap-y-6 lg:gap-y-12 lg:w-[55%]'>

                <PageTitle title={t('equipment.equipment')} navigateTo={'/club'} />  

                <LowOpacityBackForStickedButtons />
                
                {/* buttons */}
                <div dir='rtl'  className={`${ButtonStyles.ThreeStickedButtonCont} sticky top-[8.2rem] lg:top-[9rem] z-50`}>

                    <Link 
                    to='/club/clubEquipment/flightEquipments' 
                    className={`${ButtonStyles.ThreeStickedButtonButton} rounded-r-xl ${location.pathname === '/club/clubEquipment/flightEquipments' ? ButtonStyles.activeYellow : ''}`} 
                    >
                        {t('equipment.flightEquipment')}
                    </Link> 

                    <Link 
                    to='/club/clubEquipment/parachutes' 
                    className={`${ButtonStyles.ThreeStickedButtonButton}  ${location.pathname === '/club/clubEquipment/parachutes' ? ButtonStyles.activeYellow : ''}`}  
                    >
                        {t('equipment.parachute')}
                    </Link> 

                    <Link 
                    to='/club/clubEquipment/harnesses'     
                    className={`${ButtonStyles.ThreeStickedButtonButton} rounded-l-xl  ${location.pathname === '/club/clubEquipment/harnesses' ? ButtonStyles.activeYellow : ''}`}  
                    >
                        {t('equipment.harness')}
                    </Link> 

                </div>



                <div className='w-[90%] flex flex-col'>
                    
                    <Outlet />

                </div>

            </div>

        </div>
    );
};

export default ClubEquipment;



