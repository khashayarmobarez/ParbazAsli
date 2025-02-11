import React from 'react';

// styles
import ButtonStyles from '../../styles/ButtonsBox.module.css'
import boxStyles from '../../styles/DataBox.module.css'

// context
import { useTranslation } from '../../Utilities/context/TranslationContext';


const MyCourseBoxGuest = ({
    guestClass,
    handleGuestClassDetails
}) => {

    // language
    const { t } = useTranslation();

    return (
        <div className='w-full flex flex-col items-center'>
            <div className={`${boxStyles.containerDarkmode} rounded-3xl h-auto z-0 w-[98%] md:w-full flex flex-col justify-between items-center px-4 py-4 gap-y-4 mr-1 mt-1`}>
                
                <div className='w-full flex justify-between text-sm'>
                    <p className='text-base'>{guestClass.name}</p>
                    <p>
                        <span className=''>
                            {t('myCourses.date')}:&nbsp;
                        </span>
                        {guestClass.dateTime}
                    </p>
                </div>

                <div className='w-full flex justify-between items-center text-start text-sm'>
                    { 
                    guestClass.classDuration &&
                        <p>
                            <span className=''>
                                {t('myCourses.flightDuration')}:&nbsp;
                            </span> 
                            {guestClass.classDuration}
                        </p>
                    }
                    <button onClick={handleGuestClassDetails(guestClass.id)} className={`${ButtonStyles.normalButton} self-end`} >
                        {t('myCourses.details')}  
                    </button>
                </div>


            </div>
        </div>
    );
};

export default MyCourseBoxGuest;