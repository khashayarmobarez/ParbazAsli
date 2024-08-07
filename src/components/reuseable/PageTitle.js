import React from 'react';
import { useNavigate } from 'react-router';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const PageTitle = (props) => {

    const {title, navigateTo} = props;

    const navigate = useNavigate();

    return (
        <>
            <div className={`sticky top-6 md:top-2 z-30 bg-[#1B253B] w-[90%] h-20 md:h-32 flex justify-center items-end py-2 rounded-b-2xl `}>
                <p className=' text-base font-medium'>{title}</p>
                <ArrowBackIcon onClick={() => navigate(navigateTo ? navigateTo : -1)} sx={{position:'absolute',left:'1rem' , width:'24px', height:'24px', padding:'0px', backgroundColor:'', borderRadius:'10rem', background: 'linear-gradient(195.31deg, #353A65 -84.63%, rgba(42, 46, 81, 0) 100.99%)', boxShadow: '-3px 4px 5.8px 5px rgba(0, 0, 0, 0.27), 3px -4px 4px 0px rgba(179, 170, 170, 0.18)'}} />
            </div>
        </>
    );
};

export default PageTitle;

// first one redirects to the previous page
// <PageTitle title={''}  />
//  or  
// <PageTitle title={''} navigateTo={''}  />  