import React, { useEffect, useState } from 'react';
import Attention from '../../components/icons/Attention';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import DoNotDisturbRoundedIcon from '@mui/icons-material/DoNotDisturbRounded';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

const UserCertificateStatus = ({userCertificateStatus, daysToCertificateExpiration }) => {

    const [closeBox, setCloseBox] = useState(() => {
        // Initialize state from sessionStorage
        return JSON.parse(sessionStorage.getItem('closeBox')) || false;
    });

    useEffect(() => {
        // Update sessionStorage whenever closeBox changes
        sessionStorage.setItem('closeBox', JSON.stringify(closeBox));
    }, [closeBox]);

    return (
        <div className={`w-full relative ${(!userCertificateStatus || closeBox) && 'hidden'}`}>


            {userCertificateStatus === 'Expired' && 
            <div className={`w-full h-20 mt-2 rounded-3xl flex justify-between bg-textError px-4 text-[#eee]`}>

                <div className='h-full flex flex-col justify-between py-4'>

                    <div className='flex gap-x-2 items-center justify-center'>
                        
                        <DoNotDisturbRoundedIcon sx={{width:'20px', height:'20px'}} />

                        <p className='mt-1 text-sm font-semibold'>گواهینامه شما منقضی شده است!</p>

                    </div>

                    <p className='mr-8 text-xs'>دسترسی شما به پنل محدود می‌باشد.</p>

                </div>

                <div className='flex flex-col items-end justify-between pb-4 pt-2'>

                    <CloseOutlinedIcon 
                    sx={{width:'18px', height:'18px'}}
                    onClick={() => setCloseBox(true)}
                    />
                    
                    <p className='text-xs underline underline-offset-4'>تمدید گواهینامه</p>
                    
                </div>
                
            </div>
            }
        </div>
    );
};

export default UserCertificateStatus;
// ${!userCertificateStatus && 'hidden'}