import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';

// mui
import { Avatar } from '@mui/material';
import { useTranslation } from '../../Utilities/context/TranslationContext';

const ClubCoachBox = ({ coachData }) => {

    // language
    const { t } = useTranslation();
    const dir = Cookies.get('dir') || 'ltr';

    const navigate = useNavigate();
    const appTheme = Cookies.get('themeApplied') || 'dark';

    const clickHandler = (id) => () => {
        if (coachData.status === 'Active' || coachData.status === 'Disable') {
            navigate(`/club/coachDetails/${id}`);
        } else if (coachData.status === 'Pending') {
            toast(t("club.coach.coachPending"), {
                type: 'error',
                position: 'top-center',
                autoClose: 5000,
                theme: appTheme,
                style: { width: "90%" }
            });
        } else if (coachData.status === 'Rejected') {
            toast(t("club.coach.coachRejected"), {
                type: 'error',
                position: 'top-center',
                autoClose: 5000,
                theme: appTheme,
                style: { width: "90%" }
            });
        }
    };
    
    return (
        <>
            {coachData &&
                <div
                    onClick={clickHandler(coachData.id)}
                    className='flex w-full justify-between items-center rounded-2xl text-xs h-16 px-4 py-5'
                    style={{ background: 'var(--bg-output-default)', boxShadow: 'var(--shadow-all)' }}
                >
                    <div className='flex items-center justify-start gap-x-2'>
                        <Avatar src={coachData.profilePicture?.path || ''} alt="Remy Sharp" sx={{ height: '34px', width: '34px', zIndex: '0' }} />
                        <p>{coachData.name}</p>
                    </div>
                    <p className='text-textButtonMainDisabled'>
                        {t("club.coach.status")}:
                        {coachData.status === 'Active' && <span style={{ color: 'var(--text-accent)' }}> {t("club.coach.active")}</span>}
                        {coachData.status === 'Pending' && <span style={{ color: 'var(--text-warning)' }}> {t("club.coach.pending")}</span>}
                        {coachData.status === 'Disable' && <span className='text-textButtonMainDisabled'> {t("club.coach.disabled")}</span>}
                        {coachData.status === 'Rejected' && <span style={{ color: 'var(--text-error)' }}> {t("club.coach.rejected")}</span>}
                    </p>
                    <div />
                </div>
            }
        </>
    );
};

export default ClubCoachBox;
