import React from 'react';
import { useNavigate } from 'react-router';

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

const PageTitle = (props) => {

    const {title} = props;

    const navigate = useNavigate();

    return (
        <>
            <div className={`sticky top-9 md:top-2 z-10 bg-[#1B253B] w-[90%] h-20 md:h-32 flex justify-center items-end py-3 rounded-b-2xl `}>
                <p className=' font-medium'>{title}</p>
                <ArrowBackIosNewIcon onClick={() => navigate(-1)} sx={{position:'absolute',left:'1rem' , width:'26px', height:'26px', padding:'5px', backgroundColor:'', borderRadius:'10rem', background: 'linear-gradient(195.31deg, #353A65 -84.63%, rgba(42, 46, 81, 0) 100.99%)', boxShadow: '-3px 4px 5.8px 5px rgba(0, 0, 0, 0.27), 3px -4px 4px 0px rgba(179, 170, 170, 0.18)'}} />
            </div>
        </>
    );
};

export default PageTitle;


// navigate to should be coded
// <PageTitle title={''} navigateTo={''}  />  