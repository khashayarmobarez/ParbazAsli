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
            toast.error('مربی هنوز تایید نشده است')
        } else if(coachData.status === 'Rejected') {
            toast.error('مربی عضویت در باشگاه را رد کرده است')
        }
    }

    return (
        <>
            <div
            onClick={clickHandler(coachData.id)} 
            className='flex w-full justify-between items-center rounded-2xl text-xs h-16 px-2' 
            style={{background:'var(--coachesDetails-bg)', boxShadow:'var(--coachesDetails-BoxShadow)'}} >
                <Avatar src={coachData.profilePicture.path} alt="Remy Sharp" sx={{height:'40px', width:'40px', zIndex:'0'}} />
                <p>{coachData.name}</p>
                {/* <p>کد عضویت: {coachData.id}</p> */}
                <p>
                    وضعیت:
                    {coachData.status === 'Active' && <span style={{color:'var(--yellow-text)'}}> فعال</span>}
                    {coachData.status === 'Pending' && <span style={{color:'var(--yellow-text)'}}> در انتظار تایید</span>}
                    {coachData.status === 'Disable' && <span style={{color:'var(--low-opacity-white)'}}> غیر فعال</span>}
                    {coachData.status === 'Rejected' && <span style={{color:'var(--red-text)'}}> رد شده</span>}
                </p>
            </div>
        </>
    );
};

export default ClubCoachBox;
