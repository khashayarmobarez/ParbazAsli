import React from 'react';
import { useNavigate } from 'react-router';

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';  

const PageTitle = (props) => {

    const {title, navigateTo} = props;

    const navigate = useNavigate();

    return (
        <>
            <div className={`sticky top-6 md:top-2 z-50  0 bg-bgHeader w-[90%] h-20 md:h-32 flex justify-center items-end py-2 rounded-b-2xl `}>
                <p className=' text-base font-medium'>{title}</p>
                <ArrowBackIosNewIcon onClick={() => navigate(navigateTo ? navigateTo : -1)} 
                sx={{position:'absolute',left:'1rem' , width:'24px', height:'24px', padding:'2px', backgroundColor:'', borderRadius:'10rem', background: 'var(--bg-button-secondary-default)', boxShadow: 'var(--shadow-button-dark),var(--shadow-button-white)'}} />
            </div>
        </>
    );
};

export default PageTitle;

// first one redirects to the previous page
// <PageTitle title={''}  />
//  or  
// <PageTitle title={''} navigateTo={''}  />  