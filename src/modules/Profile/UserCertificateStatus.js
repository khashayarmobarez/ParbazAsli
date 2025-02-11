import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

// assets
import Attention from '../../components/icons/Attention';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import DoNotDisturbRoundedIcon from '@mui/icons-material/DoNotDisturbRounded';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { useNavigate } from 'react-router-dom';

// context
import { useTranslation } from '../../Utilities/context/TranslationContext';

const UserCertificateStatus = ({userCertificateStatus, daysToCertificateExpiration }) => {
    
    // language
    const { t } = useTranslation();
    const dir = Cookies.get('dir') || 'ltr';

    const navigate = useNavigate()

    const [closeBox, setCloseBox] = useState(() => {
        // Initialize state from sessionStorage
        return JSON.parse(sessionStorage.getItem('closeBox')) || false;
    });

    useEffect(() => {
        // Update sessionStorage whenever closeBox changes
        sessionStorage.setItem('closeBox', JSON.stringify(closeBox));
    }, [closeBox]);

    const handleRenewalClick = () => {
        navigate('/editProfile/changeCertificate')
    }


    return (
        <div className={`w-full ${(!userCertificateStatus || closeBox) && 'hidden'}`}>

            {
            userCertificateStatus === 'Expired' &&
            <div className={`w-full h-20 mt-2 rounded-3xl flex justify-start gap-x-1 bg-textError px-4 text-[#eee] relative`}>

                <div className='h-full mt-[18px]'>
                    <DoNotDisturbRoundedIcon sx={{width:'20px', height:'20px'}} />
                </div>

                <div className='h-full flex flex-col justify-center gap-y-2 py-4 items-start'>

                    <div className='flex items-start justify-center'>
                        <p className='mt-1 text-sm font-semibold'>{t("profile.userDashboard.UserCertificateStatus.expiredMessage")}</p>
                    </div>

                    <p className='text-xs'>{t("profile.userDashboard.UserCertificateStatus.limitedAccess")}</p>

                </div>

                <div className={`${dir === 'ltr' ? 'right-4' : 'left-4'} absolute h-full bottom-0 flex flex-col items-end justify-between pb-4 pt-3`}>
                    <CloseOutlinedIcon 
                    sx={{width:'18px', height:'18px'}}
                    onClick={() => setCloseBox(true)}
                    />
                    <p className='text-xs underline underline-offset-4'
                        onClick={handleRenewalClick}>{t("profile.userDashboard.UserCertificateStatus.renewCertificate")}</p>
                </div>

            </div>
            }

            {
            userCertificateStatus === 'AdminPending' && 
            <div className={`w-full h-20 mt-2 rounded-3xl flex justify-start gap-x-1 bg-[#17a2bb]  px-4 text-[#eee] relative`}>

                <div className=' mt-[18px] w-5 h-5'>
                    <Attention customColor={'var(--text-default)'} />
                </div>


                <div className='h-full flex flex-col justify-center gap-y-2 py-4 items-start'>

                    <div className='flex items-start justify-center'>
                        <p className='mt-1 text-sm font-semibold'>{t("profile.userDashboard.UserCertificateStatus.adminPendingMessage")}</p>
                    </div>

                    <p className='text-xs'>{t("profile.userDashboard.UserCertificateStatus.limitedAccessPending")}</p>

                </div>

                <div className={`absolute h-full bottom-0 flex flex-col items-end justify-between pb-4 pt-3
                ${dir === 'ltr' ? 'right-4' : 'left-4'}`}>

                    <CloseOutlinedIcon 
                    sx={{width:'18px', height:'18px'}}
                    onClick={() => setCloseBox(true)}
                    />
                    
                    <div/>
                    
                </div>
                
            </div>
            }

            {
            userCertificateStatus === 'ExpireSoon' && 
            <div className={`w-full h-20 mt-2 rounded-3xl flex justify-start gap-x-1 bg-textWarning px-4 text-[#eee] relative`}>

                <div className=' mt-[10px] md:mt-[18px] w-5 h-5'>
                    <WarningAmberRoundedIcon sx={{width:'20px', height:'20px'}} />
                </div>

                <div className='h-full flex flex-col justify-center gap-y-2 py-4 items-start'>

                    <div className='flex items-start justify-center'>
                        <p className='mt-1 text-xs text-left font-semibold'>{t("profile.userDashboard.UserCertificateStatus.expireSoonMessage", { daysToCertificateExpiration })}</p>
                    </div>

                    <p className='text-xs text-left w-44 md:w-auto'>{t("profile.userDashboard.UserCertificateStatus.limitedAccessSoon")}</p>

                </div>

                <div className={`absolute left-4 h-full bottom-0 flex flex-col items-end justify-between pb-4 pt-3
                ${dir === 'ltr' ? 'right-4' : 'left-4'}`}>

                    <CloseOutlinedIcon 
                    sx={{width:'18px', height:'18px'}}
                    onClick={() => setCloseBox(true)}
                    />
                    
                    <p className='text-xs underline underline-offset-4'
                    onClick={handleRenewalClick}>{t("profile.userDashboard.UserCertificateStatus.renewCertificate")}</p>
                    
                </div>
                
            </div>
            }

        </div>
    );
};

export default UserCertificateStatus;
// ${!userCertificateStatus && 'hidden'}