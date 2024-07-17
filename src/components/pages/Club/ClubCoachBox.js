import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// mui
import { Avatar } from '@mui/material';

const ClubCoachBox = ({ coachData }) => {

    const navigate = useNavigate();

    const clickHandler = (id) => () => {
        navigate(`/club/coachDetails/${id}`)
    }

    return (
        <>
            <div
            onClick={(coachData.status === 'Active' || coachData.status === 'Disable') && clickHandler(coachData.id)} 
            className='flex w-full justify-between items-center rounded-2xl text-xs h-16 px-2' 
            style={{background:'var(--coachesDetails-bg)', boxShadow:'var(--coachesDetails-BoxShadow)'}} >
                <Avatar alt="Remy Sharp" sx={{height:'40px', width:'40px', zIndex:'0'}} />
                <p>{coachData.fullName}</p>
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
