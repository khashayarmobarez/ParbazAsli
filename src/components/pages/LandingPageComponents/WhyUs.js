import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// utlities
import NumberToPersian from '../../../Utilities/Services/NumberToPersian';

// queries
import { useSection } from '../../../Utilities/Services/queries';

// mui
import CircularProgress from '@mui/material/CircularProgress';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

// components
import DigilogbookLoading from '../../Loader/DigilogbookLoading';

const WhyUs = () => {
    
    const navigate = useNavigate()

    const [loadingS2, setLoadingS2] = useState(true);

    const { data, isLoading, error, isFetching, isError } = useSection('WhyDigiLogBook');

    return (
        
        <div className='w-full flex flex-col mt-14'>
            
            <div className='w-full min-h-[85vh] flex flex-col items-center'> 

                <div className={`sticky top-12 md:top-2 z-10 bg-[#1B253B] w-[90%] md:w-3/4 h-20 md:h-28 flex flex-col items-between justify-end pt-3 pb-2 rounded-b-2xl `}>
                    <p className=' text-lg font-semibold'>چرا دیجی‌ لاگ‌بوک</p>
                    <ArrowBackIosNewIcon onClick={() => navigate(-1)} sx={{position:'absolute',left:'1rem' , width:'26px', height:'26px', padding:'5px', backgroundColor:'', borderRadius:'10rem', background: 'linear-gradient(195.31deg, #353A65 -84.63%, rgba(42, 46, 81, 0) 100.99%)', boxShadow: '-3px 4px 5.8px 5px rgba(0, 0, 0, 0.27), 3px -4px 4px 0px rgba(179, 170, 170, 0.18)'}} />
                </div>

                {
                isLoading && isFetching && 
                    <DigilogbookLoading />
                }

                {
                isError && <h3 className='flex w-full h-[95vh] items-center justify-center'>{error.message}</h3>
                }

                {
                data &&
                <div className='w-[90%] md:w-4/5 py-10 flex flex-col items-center gap-y-6'>


                    {/* loading for picture in the second section */}
                    {loadingS2 &&
                        <CircularProgress sx={{marginBottom:'2rem', color:'var(--softer-white)'}} />   
                    }
                    <img className={`${loadingS2 ? 'hidden' : 'block'} w-full h-[20rem] md:h-[30rem] object-cover object-bottom rounded-3xl`} onLoad={() => setLoadingS2(false)} src={data.data.data.image.path} alt='mountain' />

                    <div className=' text-right' dangerouslySetInnerHTML={{ __html: data.data.data.description }} />

                    {
                    data.data.data.landingSectionItems.map(item =>(
                        <div key={item.order} className='flex justify-around w-full md:justify-start gap-x-4 md:gap-x-6'>

                            <p className='w-[53px] h-[53px] text-center rounded-full md:w-[67px] md:h-[67px] grid place-content-center' 
                            style={{
                            color:'var(--yellow-text)',
                            background: 'var(--landing-page-titles-bg)',
                            boxShadow: 'var(--landing-page-titles-boxShadow)'}} 
                            >
                                <NumberToPersian number={item.order} />
                            </p>

                            <p
                            className='rounded-3xl w-full px-3 text-sm md:text-lg flex items-center text-center'
                            style={{
                                color:'var(--yellow-text)',
                                background: 'var(--landing-page-titles-bg)',
                                boxShadow: 'var(--landing-page-titles-boxShadow)',}}
                            >
                                {item.content}
                            </p>

                        </div>
                    ))
                    }  

                </div>
                }  

            </div>
        </div>
    );
};

export default WhyUs;