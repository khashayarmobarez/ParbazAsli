import React, {  useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// utlities
import NumberToPersian from '../Utilities/Services/NumberToPersian';

// styles
import ButtonStyles from '../styles/Buttons/ButtonsBox.module.css'

// mui
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import CircularProgress from '@mui/material/CircularProgress';


// assets
import iphone from '../assets/ApiData Temporary/mobile-mk 3.png'
import parbazLogo from '../assets/Logo/parbazLogo.svg'


// queries 
import { useLandingPage } from '../Utilities/Services/queries';

// components 
import ArticleSwiper from '../components/pages/LandingPageComponents/ArticleSwiper';
import Loader from '../components/Loader/Loader';

const LandingPage = () => {

    const navigate = useNavigate()

    // number of the image shown on the 'how to log flight' section
    const [ howToLogPictureNumber, setHowToLogPictureNumber ] = useState(0)
    
    const { data, isLoading, error, isFetching, isError } = useLandingPage();

    const [loadingS1, setLoadingS1] = useState(true);
    const [loadingS2, setLoadingS2] = useState(true);
    const [loadingS3, setLoadingS3] = useState(true);


    return (
        <div className='w-full flex flex-col mt-14 py-4 '>

            {
                isLoading && isFetching && 
                <div className='flex w-full h-[95vh] items-center justify-center'>
                    <Loader />
                </div>
                // <h2 className=' text-white h-[100vh] w-full text-center'>is loading...</h2>
            }

            {
                isError && <h3 className='flex w-full h-[95vh] items-center justify-center'>{error.message}</h3>
            }
            {
                data &&
                <div className='w-full flex flex-col items-center'>

                    {/* first slide */}
                    <div className='w-full h-[94vh] flex flex-col items-center justify-between gap-y-[4vh] py-20 md:flex-row-reverse md:justify-between md:px-4'>

                        <div className='flex flex-col items-center justify-center h-[40%] w-full mt-12 md:w-[45%]' style={{background: 'radial-gradient(50% 50% at 50% 50%, #3B4B6C -20%, rgba(39, 39, 41, 0) 95%)'}}>

                            {/* loading for picture in the first section */}
                            {loadingS1 &&
                                <CircularProgress sx={{marginBottom:'2rem', color:'var(--softer-white)'}} />   
                            }
                            
                            {/* logo behind the iphone */}
                            {/* <img alt='logo' src={logo} className='w-[664px] md:mb-[-15vh]'/> */}
                            <div className='flex items-center justify-center mt-[-4rem]'>
                                {!loadingS1 &&
                                <img alt='phone model' src={iphone} className='absolute md:w-[235px]'/>
                                }
                                <img alt='digilogbook app' onLoad={() => setLoadingS1(false)} src={data.data.data[0].image.path} className={`${loadingS1 ? 'hidden' : 'block'} w-[7.4rem] md:w-[195px]`} />
                            </div>
                            
                        </div>
                            
                        <div className='flex flex-col items-center justify-start gap-y-8 h-[40%] px-4 md:w-[50%]' >

                            <h1 className=' text-xl font-bold md:text-3xl'>{data.data.data[0].title}</h1>

                            <p className='text-sm'>{data.data.data[0].summary}</p>

                            <Link to='/signUpLogin' className='relative w-[90%] bg-[#131423] rounded-xl md:w-96 md:relative md:top-4  '>
                                <button className={`${ButtonStyles.addButton} w-[100%] gap-x-2`} >
                                    <PersonAddIcon />
                                    <p>ثبت نام در سامانه</p>
                                </button>
                            </Link>

                        </div>
                        
                    </div>

                    {/* second slide */}
                    <div className='w-full md:h-[94vh] flex flex-col items-center justify-between py-10 gap-y-16 md:gap-y-[4vh] md:flex-row' style={{background:'var(--Basic-dataBox-bg)'}}>

                        <div className='w-full h-[15rem] flex justify-end items-center md:h-[28rem]  px-4'>

                            {/* loading for picture in the second section */}
                            {loadingS2 &&
                                <CircularProgress sx={{marginBottom:'2rem', color:'var(--softer-white)'}} />   
                            }
                            <img className={`${loadingS2 ? 'hidden' : 'block'} w-full md:w-4/5 h-full object-cover object-bottom rounded-3xl`} onLoad={() => setLoadingS2(false)} src={data.data.data[1].image.path} alt='mountain' />

                        </div>

                        <div className='w-full h-1/2 flex flex-col justify-around items-center gap-y-8 md:h-full'>

                            <div className='w-full flex justify-end items-center'>
                                <p className='w-[80%] h-14 rounded-r-full text-right text-2xl font-semibold pt-3 pr-6 md:h-20 md:pt-7'
                                style={{
                                    background: 'var(--landing-page-titles-bg)',
                                    boxShadow: 'var(--landing-page-titles-boxShadow)'
                                }}>
                                چرا <span style={{color:'var(--yellow-text)'}}>دیجی‌ لاگ‌بوک</span>
                                </p>
                            </div>

                            <p className='text-center text-sm px-6 md:w-[55%] md:text-base md:text-start md:self-start md:mr-[8vw]'>چرا باید لاگ بوک داشته باشیم ؟
                                <br/>
                                در هنگام یادگیری پرواز، هر خلبان ملزم به نوشتن یادداشتی از ساعات پرواز خود در یک لاگ بوک به منظور ثبت  تجربه خود است. بسیاری از خلبانان خیلی زود از نوشتن  لاگ بوک خود منصرف میشوند ، چرا که بعد از مدتی این کار بیهوده به نظر میرسد ، اما این یک اشتباه است. پس چرا نگه داشتن  لاگ بوک ایده خوبی است؟
                            </p>

                            <div className='flex flex-col w-full items-center gap-y-6'>
                                
                            {
                            data.data.data[1].landingSectionItems.map(item =>(
                                <div key={item.order} className='flex justify-around w-full px-4 md:w-[65%] md:px-6 md:justify-start md:gap-x-6'>

                                    <p className='w-[53px] h-[53px] text-center rounded-full md:w-[67px] md:h-[67px] grid place-content-center' 
                                    style={{
                                    color:'var(--yellow-text)',
                                    background: 'var(--landing-page-titles-bg)',
                                    boxShadow: 'var(--landing-page-titles-boxShadow)'}} 
                                    >
                                        <NumberToPersian number={item.order} />
                                    </p>

                                    <p
                                    className='rounded-3xl w-[70vw] md:w-[20vw] px-3 text-sm md:text-lg grid place-content-center'
                                    style={{
                                        color:'var(--yellow-text)',
                                        background: 'var(--landing-page-titles-bg)',
                                        boxShadow: 'var(--landing-page-titles-boxShadow)',}}
                                    >{item.content}</p>

                                </div>
                            ))
                            }      


                            </div>


                            <button onClick={() => navigate('/whyUs') } className={`${ButtonStyles.addButton} mt-4 w-32 self-center`} 
                                >مطالعه بیشتر 
                            </button>

                        </div>

                    </div>


                    {/* third slide */}
                    <div className='w-full md:h-[94vh] flex flex-col items-center justify-between py-10 gap-y-16 md:pt-24 md:flex-row-reverse'>

                        <div className='flex flex-col items-center justify-center w-full md:py-[4vh] md:w-[50%] md:mt-20'>

                            <div className='flex items-center justify-center md:w-[560px]'>
                                {/* loading for picture in the second section */}
                                {loadingS3 &&
                                    <CircularProgress sx={{marginBottom:'2rem', color:'var(--softer-white)'}} />   
                                }
                                <img onLoad={() => setLoadingS3(false)} src={data.data.data[2].landingSectionItems[howToLogPictureNumber].image.path} alt='how digilogbook' className={`${loadingS3 ? 'hidden' : 'block'} w-[80%] md:w-full`} />
                            </div>

                        </div>

                        <div className=' flex flex-col w-full gap-y-10 md:w-1/2'>
                            <div className='w-full flex justify-start items-center'>

                                <p className='w-[95%] h-20 rounded-l-3xl text-right text-lg font-semibold pt-3 pl-14 pr-20 md:h-24 md:pt-4 md:text-2xl md:pr-[55%] md:pl-0'
                                style={{
                                    background: 'var(--landing-page-titles-bg)',
                                    boxShadow: 'var(--landing-page-titles-boxShadow)'
                                }}>
                                    
                                    چه طور با <span style={{color:'var(--yellow-text)'}}>دیجی لاگ بوک</span> پروازهامون رو بخاطر بسپاریم
                                
                                </p>

                            </div>

                            <div className='flex flex-col gap-y-4 md:gap-y-6' >

                            {
                                data.data.data[2].landingSectionItems.map(item =>(
                                <div key={item.order}  className='flex justify-center gap-x-[5vw] w-full px-4 md:w-full md:px-10 md:gap-x-6  md:justify-end'
                                 onClick={() => setHowToLogPictureNumber(item.order - 1)}> 

                                    <p className='w-[53px] h-[53px] text-center rounded-full md:w-[67px] md:h-[67px] grid place-content-center' 
                                    style={{
                                    color:'var(--yellow-text)',
                                    background: 'var(--landing-page-titles-bg)',
                                    boxShadow: 'var(--landing-page-titles-boxShadow)'}} 
                                    ><NumberToPersian number={item.order} /></p>

                                    <p
                                    className='rounded-3xl w-[90%] text-sm md:text-lg md:w-[65%] grid place-content-center'
                                    style={{
                                        color:'var(--yellow-text)',
                                        background: 'var(--landing-page-titles-bg)',
                                        boxShadow: 'var(--landing-page-titles-boxShadow)',}}
                                    >{item.content}</p>

                                </div>
                                ))
                            }

                            </div>

                        </div>
                        
                    </div>


                    {/* fourth slide */}
                    <div className='w-full flex flex-col items-center justify-between py-10 gap-y-24 sm:gap-y-18 md:pt-24'>

                        <div className='w-full flex justify-start items-center'>

                            <p className='w-[70%] h-14 rounded-l-full text-right text-2xl font-semibold pt-3 pr-[3.5%] md:h-20 md:pt-7 md:text-left md:pl-8'
                            style={{
                                background: 'var(--landing-page-titles-bg)',
                                boxShadow: 'var(--landing-page-titles-boxShadow)'
                                }}>
                            وبلاگ <span style={{color:'var(--yellow-text)'}}>دیجی‌ لاگ‌بوک</span>
                            </p>

                        </div>

                        <div className='w-full h-[50vh] flex flex-col justify-center items-center md:mt-10'>

                                <ArticleSwiper />

                        </div>

                        <div className=' w-[95%] h-[25rem] flex justify-center items-end pb-4 mt-[-24.5rem] md:mt-[-20.5rem]' style={{backgroundColor:'var(--syllabus-data-boxes-bg)'}}>
                                <button onClick={() => navigate('/blogs')} className={` underline underline-offset-8 font-medium`}>مشاهده بیشتر ...</button>
                        </div>

                        <div className='w-full flex flex-col justify-center items-center gap-y-6'>
                            <img src={parbazLogo} alt='compnay logo' className='w-[80%] md:w-[20%]'/>
                            <p>پیشتازان پرباز</p>
                        </div>

                    </div>

                </div>
            }
        </div>
    );
};

export default LandingPage;