import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// mui
import { Avatar } from '@mui/material';

const ClubCoachBox = ({ coachData }) => {

    const navigate = useNavigate();

    const clickHandler = (id) => () => {
        if(coachData.status === 'Active' || coachData.status === 'Disable') {
            navigate(`/club/coachDetails/${id}`)
        } else if(coachData.status === 'Pending') {
            toast('مربی هنوز تایید نشده است', {
                type: 'error',
                position: 'top-right',
                autoClose: 5000,
                theme: 'dark',
                style: { width: "90%" }
            });
        } else if(coachData.status === 'Rejected') {
            toast('مربی عضویت در باشگاه را رد کرده است', {
                type: 'error',
                position: 'top-right',
                autoClose: 5000,
                theme: 'dark',
                style: { width: "90%" }
            });
        }
    }

    return (
        <>
            {
                coachData && 
                <div
                onClick={clickHandler(coachData.id)} 
                className='flex w-full justify-between items-center rounded-2xl text-xs h-16 px-2' 
                style={{background:'var(--coachesDetails-bg)', boxShadow:'var(--coachesDetails-BoxShadow)'}} >
                    <Avatar src={coachData.profilePicture.path || ''} alt="Remy Sharp" sx={{height:'40px', width:'40px', zIndex:'0'}} />
                    <p>{coachData.name}</p>
                    {/* <p>کد عضویت: {coachData.id}</p> */}
                    <p>
                        وضعیت:
                        {coachData.status === 'Active' && <span style={{color:'var(--yellow-text)'}}> فعال</span>}
                        {coachData.status === 'Pending' && <span style={{color:'var(--red-text)'}}> در انتظار تایید</span>}
                        {coachData.status === 'Disable' && <span style={{color:'var(--low-opacity-white)'}}> غیر فعال</span>}
                        {coachData.status === 'Rejected' && <span style={{color:'var(--notification-red)'}}> رد شده</span>}
                    </p>
                </div>
            }
        </>
    );
};

export default ClubCoachBox;
