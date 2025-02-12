import React from 'react';

// assets
import Attention from '../../elements/icons/Attention';

// components
import PageTitle from '../../elements/reuseable/PageTitle';

// context
import { useTranslation } from '../../Utilities/context/TranslationContext';

const PendingClubSubmission = () => {

    // language
    const { t } = useTranslation();

    return (
        <>

            <div className='w-[90%] h-[60vh] flex flex-col justify-center items-center'>
                <span className='w-14 h-14 mx-auto'>
                    <Attention />
                </span>
                <p className='mt-4'>{t("club.pendingClub.waitingForApproval")}</p>
                <p className='mt-6'>{t("club.pendingClub.requestPending")}</p>
            </div>
        </>
    );
};

export default PendingClubSubmission;