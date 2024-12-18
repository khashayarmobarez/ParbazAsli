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
            <div className={`w-full h-20 mt-2 rounded-3xl flex justify-between bg-textError px-4 text-[#eee]`}>

                <div className='h-full flex flex-col justify-between py-4'>

                    <div className='flex gap-x-2 items-center justify-center'>
                        
                        <DoNotDisturbRoundedIcon sx={{width:'20px', height:'20px'}} />

                        <p className='mt-1 text-sm font-semibold'>گواهینامه شما منقضی شده است!</p>

                    </div>

                    <p className='mr-6 text-xs'>دسترسی شما به پنل محدود می‌باشد.</p>

                </div>

                <div className='flex flex-col items-end justify-between pb-4 pt-2'>

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
            <div className={`w-full h-20 mt-2 rounded-3xl flex justify-between bg-[#17a2bb] pl-2 text-[#eee]`}>

                <div className='h-full flex flex-col justify-between py-4'>

                    <div className='flex gap-x-2 items-center justify-center'>
                        
                        <div className='w-6'>
                            <Attention customColor={'var(--text-default)'} />
                        </div>

                        <p className='mt-1 text-sm font-semibold'>گواهینامه شما در انتظار تایید است</p>

                    </div>

                    <p className='mr-12 text-xs'>تا زمان تایید دسترسی شما محدود می‌باشد.</p>

                </div>

                <div className='flex flex-col items-end justify-between pb-4 pt-2'>

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
            <div className={`w-full h-20 mt-2 rounded-3xl flex justify-between bg-textWarning px-4 text-[#eee]`}>

                <div className='h-full flex flex-col justify-between py-4'>

                    <div className='flex gap-x-2 items-center justify-center'>
                        
                        <WarningAmberRoundedIcon sx={{width:'20px', height:'20px'}} />

                        <p className='mt-1 text-xs font-semibold text-start text-nowrap'>اخطار! {daysToCertificateExpiration} روز مانده تا انقضاء گواهینامه.</p>

                    </div>

                    <p className='mr-4 text-xs'>دسترسی شما به پنل محدود خواهد شد.</p>

                </div>

                <div className='flex flex-col items-end justify-between pb-4 pt-2'>

                    <CloseOutlinedIcon 
                    sx={{width:'18px', height:'18px'}}
                    onClick={() => setCloseBox(true)}
                    />
                    
                    <p className='text-xs underline underline-offset-4'
                    onClick={handleRenewalClick}>تمدید گواهینامه</p>
                    
                </div>
                
            </div>
            }

        </div>
    );
};

export default UserCertificateStatus;
// ${!userCertificateStatus && 'hidden'}