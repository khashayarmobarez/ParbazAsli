import React from 'react';
import { useNavigate } from 'react-router';

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

const PageTitle = (props) => {

    const {title, navigateTo, paddingRight} = props;

    const navigate = useNavigate();

    return (
        <>
            <div className={`sticky top-9 z-10 bg-[#1B253B] w-[90%] h-20 flex justify-between items-end p-3 pr-[${paddingRight}] rounded-b-2xl `}>
                <p className=' font-medium'>{title}</p>
                <ArrowBackIosNewIcon onClick={() => navigate(-1)} sx={{ width:'26px', height:'26px', padding:'5px', backgroundColor:'', borderRadius:'10rem', background: 'linear-gradient(195.31deg, #353A65 -84.63%, rgba(42, 46, 81, 0) 100.99%)', boxShadow: '-3px 4px 5.800000190734863px 5px rgba(0, 0, 0, 0.27), 3px -4px 4px 0px rgba(179, 170, 170, 0.18)'}} />
            </div>
        </>
    );
};

export default PageTitle;

// <PageTitle title={''} navigateTo={''} paddingRight={''} />  