import React, { useEffect, useState } from 'react';

// assets
import Attention from '../../components/icons/Attention';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import DoNotDisturbRoundedIcon from '@mui/icons-material/DoNotDisturbRounded';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { useNavigate } from 'react-router-dom';

const UserCertificateStatus = ({userCertificateStatus, daysToCertificateExpiration }) => {

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

                <div className='h-full flex flex-col justify-between py-4 items-start'>
                    <div className='flex items-start justify-center'>
                        <p className='mt-1 text-sm font-semibold'>گواهینامه شما منقضی شده است!</p>
                    </div>
                    <p className='text-xs'>دسترسی شما به پنل محدود می‌باشد.</p>
                </div>

                <div className='absolute left-4 h-full bottom-0 flex flex-col items-end justify-between pb-4 pt-3'>
                    <CloseOutlinedIcon 
                    sx={{width:'18px', height:'18px'}}
                    onClick={() => setCloseBox(true)}
                    />
                    <p className='text-xs underline underline-offset-4'
                        onClick={handleRenewalClick}>تمدید گواهینامه</p>
                </div>

            </div>
            }

            {
            userCertificateStatus === 'AdminPending' && 
            <div className={`w-full h-20 mt-2 rounded-3xl flex justify-start gap-x-1 bg-[#17a2bb]  px-4 text-[#eee] relative`}>

                <div className=' mt-[18px] w-5 h-5'>
                    <Attention customColor={'var(--text-default)'} />
                </div>


                <div className='h-full flex flex-col justify-between py-4 items-start'>
                    <div className='flex items-start justify-center'>
                        <p className='mt-1 text-sm font-semibold'>گواهینامه شما در انتظار تایید است</p>
                    </div>
                    <p className='text-xs'>تا زمان تایید دسترسی شما محدود می‌باشد.</p>
                </div>

                <div className='absolute left-4 h-full bottom-0 flex flex-col items-end justify-between pb-4 pt-3'>

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

                <div className=' mt-[18px] w-5 h-5'>
                    <WarningAmberRoundedIcon sx={{width:'20px', height:'20px'}} />
                </div>

                <div className='h-full flex flex-col justify-between py-4 items-start'>

                    <div className='flex items-start justify-center'>
                        <p className='mt-1 text-sm font-semibold'>اخطار! {daysToCertificateExpiration} روز تا انقضاء گواهینامه.</p>
                    </div>

                    <p className='text-xs'>دسترسی شما به پنل محدود خواهد شد.</p>

                </div>

                <div className='absolute left-4 h-full bottom-0 flex flex-col items-end justify-between pb-4 pt-3'>

                    <CloseOutlinedIcon 
                    sx={{width:'18px', height:'18px'}}
                    onClick={() => setCloseBox(true)}
                    />
                    
                    <p className='text-xs underline underline-offset-4 '
                    onClick={handleRenewalClick}>تمدید گواهینامه</p>
                    
                </div>
                
            </div>
            }

        </div>
    );
};

export default UserCertificateStatus;
// ${!userCertificateStatus && 'hidden'}