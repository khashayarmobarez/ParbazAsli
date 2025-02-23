import React, { useEffect } from 'react';
import Cookies from 'js-cookie';

// button
import ButtonStyles from '../../styles/ButtonsBox.module.css'

// components
import UserDataBox from '../../modules/Profile/UserDataBox';

// context
import { useTranslation } from '../../Utilities/context/TranslationContext';


const AdminPending = () => {

    // language
    const { t } = useTranslation();

    const isUserAuthenticated = Cookies.get('isUserAuthenticated')

    // useEffect to set up the interval
    useEffect(() => {
        // Set up the interval to refresh the page every 10 seconds
        const intervalId = setInterval(() => {
            console.log('Refreshing page...');
            window.location.reload();
        }, 60000); // 10000 milliseconds = 10 seconds

        // Cleanup function to clear the interval
        return () => clearInterval(intervalId);
    }, []);


    // check the status of the user authentication every 2 seconds
    useEffect(() => {
        const intervalId = setInterval(() => {
            const isUserAuthenticated = Cookies.get('isUserAuthenticated');
            if(isUserAuthenticated !== 'noAdminApprovment') {
                // reload
                window.location.reload();
            }
        }, 3000); // 3000 milliseconds = 3 seconds

        // Cleanup function to clear the interval
        return () => clearInterval(intervalId);
    }, [isUserAuthenticated]);

    return (
        <div className='flex flex-col items-center pt-20 pb-[4rem]'>
            <div className='flex flex-col items-center justify-center gap-y-8 md:mt-4 w-[90%] md:w-[65%]'>
                
                <UserDataBox />

                {/* line and circle of adding flight level */}
                <div className='w-full flex flex-col gap-y-3 justify-center items-center'>

                    <div className='flex items-center justify-center w-full'>
                        
                        <div className='rounded-full w-3 h-3' style={{background:'var(--text-accent)'}}></div>

                        <div className='rounded-full w-[38%] md:w-[45%] h-[2px]' style={{background:'var(--text-accent)'}}></div>

                        <div className='rounded-full w-3 h-3' style={{background:'var(--text-accent)'}}></div>

                        <div className='rounded-full w-[38%] md:w-[45%] h-[2px]' style={{background:'var(--text-accent)'}}></div>

                        <div className='border-2 rounded-full w-5 h-5  border-textAccent flex items-center justify-center'>
                            <div className='rounded-full w-3 h-3' style={{background:'var(--text-accent)'}}></div>
                        </div>

                    </div>

                    <div className='flex items-center justify-between w-[95%] text-xs'>

                        <p className='' style={{color:'var(--text-accent)'}}>{t("RegistrationPages.adminPending.emailVerification")}</p>

                        <p className='mr-2' style={{color:'var(--text-accent)'}}>{t("RegistrationPages.adminPending.certificate")}</p>

                        <p className='' style={{color:'var(--text-accent)'}}>{t("RegistrationPages.adminPending.approval")}</p>

                    </div>

                </div>

                <p className='text-lg -mt-4'>{t("RegistrationPages.adminPending.waitingForApproval")}</p>
                <p className='text-base -mt-2'>{t("RegistrationPages.adminPending.certificateSubmitted")}<br/>{t("RegistrationPages.adminPending.thankYouForPatience")}</p>


                <button className={`${ButtonStyles.normalButton} w-32 self-center md:w-32 `}
                onClick={() => window.location.reload()}>
                    {t("RegistrationPages.adminPending.refresh")}
                </button>


            </div>
        </div>
    );
};

export default AdminPending;