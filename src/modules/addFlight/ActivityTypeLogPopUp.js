import React from 'react';
import Cookies from 'js-cookie';

// mui
import CloseIcon from '@mui/icons-material/Close';

// styles
import boxStyles from '../../styles/DataBox.module.css'

// context
import { useTranslation } from '../../Utilities/context/TranslationContext';


const ActivityTypeLogPopUp = ({ showPopup, setShowPopup, handleClick }) => {

    // language and direction
    const dir = Cookies.get('dir') || 'ltr';
    const { t } = useTranslation();

    return (
        <div className={` w-[100vw] h-[100vh] backdrop-blur ${showPopup ? 'absolute ' : 'hidden' }   `}>
            <div className={` ${boxStyles.containerChangeOwnership} fixed z-20 py-10 w-[90%] md:w-[354px] min-h-[280px] gap-y-6 flex flex-col justify-around items-center top-52 right-[5%] md:right-[40%]`} >

                <CloseIcon onClick={() => setShowPopup(false)} sx={{position:'absolute', top:'1rem', right:'1rem'  }} />

                <h3 className=' text-base '>{t("addFlight.addFlightType.chooseTheLogType")}</h3>

                <div className='w-full flex flex-col  justify-center px-4 items-center gap-y-4'>
                    <button
                    type="reset"
                    className={` text-start w-full border border-1 border-textDefault text-textDefault rounded-2xl py-3 active:border-textAccent active:text-textAccent
                    ${dir === 'ltr' ? 'pl-8' : 'pr-8'}`}
                    onClick={() => handleClick('flight')}>
                        {t("addFlight.addFlightType.flight")}
                    </button>
                    <button
                    type="submit"
                    className={` text-start w-full border border-1 border-textDefault text-textDefault rounded-2xl py-3 active:border-textAccent active:text-textAccent
                    ${dir === 'ltr' ? 'pl-8' : 'pr-8'}`}
                    onClick={() => handleClick('groundHandling')}>
                        {t("addFlight.addFlightType.groundHandling")}
                    </button>
                </div>

            </div>
        </div>
    );
};

export default ActivityTypeLogPopUp;