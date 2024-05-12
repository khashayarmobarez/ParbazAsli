import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

// styles
import ButtonStyles from '../styles/Buttons/ButtonsBox.module.css'

// mui
import PersonAddIcon from '@mui/icons-material/PersonAdd';

// assets
import iphone from '../assets/ApiData Temporary/mobile-mk 3.png'
import coachView from '../assets/ApiData Temporary/Coach.png'
import logo from '../assets/ApiData Temporary/Digilogbook -1401 12.png'
import mountain from '../assets/ApiData Temporary/mountains.png'
import howDigi from '../assets/ApiData Temporary/howDigilogbook.png'


// queries 
import { useLandingPage } from '../Utilities/Services/queries';

// components 
import ArticleSwiper from '../components/pages/LandingPageComponents/ArticleSwiper';

const LandingPage = () => {

    
    const { data, isLoading, error, isFetching } = useLandingPage();




    return (
        <div className='w-full flex flex-col mt-14 py-4 '>

            {
                isLoading && isFetching && <h2 className=' text-white h-[100vh] w-full text-center'>is loading...</h2>
            }

            {
                error && <h3>{error.message}</h3>
            }
            {
                data &&
                <div className='w-full flex flex-col items-center'>

                    {/* first slide */}
                    <div className='w-full h-[94vh] flex flex-col items-center justify-between gap-y-[4vh] py-20 md:flex-row-reverse md:justify-between md:px-4'>

                        <div className='flex flex-col items-center justify-center h-[40%] w-full mt-12 md:w-[45%]' style={{background: 'radial-gradient(50% 50% at 50% 50%, #3B4B6C -20%, rgba(39, 39, 41, 0) 95%)'}}>

                            {/* <img alt='logo' src={logo} className='w-[664px] md:mb-[-15vh]'/> */}

                            <div className='flex items-center justify-center mt-[-4rem]'>
                                <img alt='phone model' src={iphone} className='absolute md:w-[235px]'/>
                                <img alt='digilogbook app' src={coachView} className=' w-[7.4rem] md:w-[195px]' />
                            </div>

                        </div>
                            
                        <div className='flex flex-col items-center justify-start gap-y-8 h-[40%] px-4 md:w-[50%]' >

                            <h1 className=' text-xl font-bold md:text-3xl'>سامانه ثبت اطلاعات و پروازهای روزانه</h1>

                            <p>در کادر زیر هر متنی را که دوست دارید تایپ کنید تا ما آن را برایتان نگه داریم و همیشه در دسترس شما قرار دهیم؛ از این طریق می‌توانید متن آزمایشی و متن تستی خودتان را تایپ کرده و در طرح‌هایتان از این متن استفاده کنید... تایپ کنید، به صورت خودکار ذخیره می‌شود.</p>

                            <Link to='/equipment/addFlightEquipment' className='relative w-[90%] bg-[#131423] rounded-xl md:w-96 md:relative md:top-4  '>
                                <button className={`${ButtonStyles.addButton} w-[100%] gap-x-2`} >
                                    <PersonAddIcon />
                                    <p>ثبت نام در سامانه</p>
                                </button>
                            </Link>

                        </div>
                        
                    </div>

                    {/* second slide */}
                    <div className='w-full md:h-[94vh] flex flex-col items-center justify-between py-10 gap-y-16 md:gap-y-[4vh] md:flex-row' style={{background:'var(--Basic-dataBox-bg)'}}>

                        <div className='w-full flex justify-center items-center h-[40%]  px-4'>
                            <img src={mountain} alt='mountain' />
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

                            <p className='text-center text-xs px-6 md:w-[55%] md:text-base md:text-start md:self-start md:mr-[8vw]'>چرا باید لاگ بوک داشته باشیم ؟
                                <br/>
                                در هنگام یادگیری پرواز، هر خلبان ملزم به نوشتن یادداشتی از ساعات پرواز خود در یک لاگ بوک به منظور ثبت  تجربه خود است. بسیاری از خلبانان خیلی زود از نوشتن  لاگ بوک خود منصرف میشوند ، چرا که بعد از مدتی این کار بیهوده به نظر میرسد ، اما این یک اشتباه است. پس چرا نگه داشتن  لاگ بوک ایده خوبی است؟
                            </p>

                            <div className='flex flex-col w-full items-center gap-y-6'>

                                <div className='flex justify-around w-full px-4 md:w-[65%] md:px-6 md:justify-start md:gap-x-6'>

                                    <p className='w-[53px] h-[53px] text-center rounded-full md:w-[67px] md:h-[67px] grid place-content-center' 
                                    style={{
                                    color:'var(--yellow-text)',
                                    background: 'var(--landing-page-titles-bg)',
                                    boxShadow: 'var(--landing-page-titles-boxShadow)'}} 
                                    >&#1777;</p>

                                    <p
                                    className='rounded-3xl px-3 text-sm md:text-lg grid place-content-center'
                                    style={{
                                        color:'var(--yellow-text)',
                                        background: 'var(--landing-page-titles-bg)',
                                        boxShadow: 'var(--landing-page-titles-boxShadow)',}}
                                    >امکان محاسبه ساعات پرواز و وسیله پروازی</p>

                                </div>

                                <div className='flex justify-around w-full px-4 md:w-[65%] md:px-6 md:justify-start md:gap-x-6'>

                                    <p className='w-[53px] h-[53px] text-center rounded-full md:w-[67px] md:h-[67px] grid place-content-center' 
                                    style={{
                                    color:'var(--yellow-text)',
                                    background: 'var(--landing-page-titles-bg)',
                                    boxShadow: 'var(--landing-page-titles-boxShadow)'}} 
                                    >&#1778;</p>

                                    <p
                                    className='rounded-3xl px-3 text-sm md:text-lg grid place-content-center'
                                    style={{
                                        color:'var(--yellow-text)',
                                        background: 'var(--landing-page-titles-bg)',
                                        boxShadow: 'var(--landing-page-titles-boxShadow)',}}
                                    >امکان محاسبه ساعات پرواز و وسیله پروازی</p>

                                </div>

                                <div className='flex justify-around w-full px-4 md:w-[65%] md:px-6 md:justify-start md:gap-x-6'>

                                    <p className='w-[53px] h-[53px] text-center rounded-full md:w-[67px] md:h-[67px] grid place-content-center' 
                                    style={{
                                    color:'var(--yellow-text)',
                                    background: 'var(--landing-page-titles-bg)',
                                    boxShadow: 'var(--landing-page-titles-boxShadow)'}} 
                                    >&#1779;</p>

                                    <p
                                    className='rounded-3xl px-3 text-sm md:text-lg grid place-content-center'
                                    style={{
                                        color:'var(--yellow-text)',
                                        background: 'var(--landing-page-titles-bg)',
                                        boxShadow: 'var(--landing-page-titles-boxShadow)',}}
                                    >امکان محاسبه ساعات پرواز و وسیله پروازی</p>

                                </div>


                            </div>


                            <button type="submit" className={`${ButtonStyles.addButton} mt-4 w-32 self-center`} 
                                >مطالعه بیشتر 
                            </button>

                        </div>

                    </div>


                    {/* third slide */}
                    <div className='w-full md:h-[94vh] flex flex-col items-center justify-between py-10 gap-y-16 md:pt-24 md:flex-row-reverse'>

                        <div className='flex flex-col items-center justify-center w-full md:py-[4vh] md:w-[50%] md:mt-20'>

                            <div className='flex items-center justify-center md:w-[560px]'>
                                <img src={howDigi} alt='how digilogbook' className='w-[80%] md:w-full' />
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


                                <div className='flex justify-center gap-x-[5vw] w-full px-4 md:w-full md:px-10 md:gap-x-6  md:justify-end'>

                                    <p className='w-[53px] h-[53px] text-center rounded-full md:w-[67px] md:h-[67px] grid place-content-center' 
                                    style={{
                                    color:'var(--yellow-text)',
                                    background: 'var(--landing-page-titles-bg)',
                                    boxShadow: 'var(--landing-page-titles-boxShadow)'}} 
                                    >&#1777;</p>

                                    <p
                                    className='rounded-3xl w-[90%] text-sm md:text-lg md:w-[65%] grid place-content-center'
                                    style={{
                                        color:'var(--yellow-text)',
                                        background: 'var(--landing-page-titles-bg)',
                                        boxShadow: 'var(--landing-page-titles-boxShadow)',}}
                                    >امکان محاسبه ساعات پرواز و وسیله پروازی</p>

                                </div>

                                <div className='flex justify-center gap-x-[5vw] w-full px-4 md:w-full md:px-10 md:gap-x-6  md:justify-end'>

                                    <p className='w-[53px] h-[53px] text-center rounded-full md:w-[67px] md:h-[67px] grid place-content-center' 
                                    style={{
                                    color:'var(--yellow-text)',
                                    background: 'var(--landing-page-titles-bg)',
                                    boxShadow: 'var(--landing-page-titles-boxShadow)'}} 
                                    >&#1777;</p>

                                    <p
                                    className='rounded-3xl w-[90%] text-sm md:text-lg md:w-[65%] grid place-content-center'
                                    style={{
                                        color:'var(--yellow-text)',
                                        background: 'var(--landing-page-titles-bg)',
                                        boxShadow: 'var(--landing-page-titles-boxShadow)',}}
                                    >امکان محاسبه ساعات پرواز و وسیله پروازی</p>

                                </div>

                                <div className='flex justify-center gap-x-[5vw] w-full px-4 md:w-full md:px-10 md:gap-x-6  md:justify-end'>

                                    <p className='w-[53px] h-[53px] text-center rounded-full md:w-[67px] md:h-[67px] grid place-content-center' 
                                    style={{
                                    color:'var(--yellow-text)',
                                    background: 'var(--landing-page-titles-bg)',
                                    boxShadow: 'var(--landing-page-titles-boxShadow)'}} 
                                    >&#1777;</p>

                                    <p
                                    className='rounded-3xl w-[90%] text-sm md:text-lg md:w-[65%] grid place-content-center'
                                    style={{
                                        color:'var(--yellow-text)',
                                        background: 'var(--landing-page-titles-bg)',
                                        boxShadow: 'var(--landing-page-titles-boxShadow)',}}
                                    >امکان محاسبه ساعات پرواز و وسیله پروازی</p>

                                </div>

                                <div className='flex justify-center gap-x-[5vw] w-full px-4 md:w-full md:px-10 md:gap-x-6  md:justify-end'>

                                    <p className='w-[53px] h-[53px] text-center rounded-full md:w-[67px] md:h-[67px] grid place-content-center' 
                                    style={{
                                    color:'var(--yellow-text)',
                                    background: 'var(--landing-page-titles-bg)',
                                    boxShadow: 'var(--landing-page-titles-boxShadow)'}} 
                                    >&#1777;</p>

                                    <p
                                    className='rounded-3xl w-[90%] text-sm md:text-lg md:w-[65%] grid place-content-center'
                                    style={{
                                        color:'var(--yellow-text)',
                                        background: 'var(--landing-page-titles-bg)',
                                        boxShadow: 'var(--landing-page-titles-boxShadow)',}}
                                    >امکان محاسبه ساعات پرواز و وسیله پروازی</p>

                                </div>

                                <div className='flex justify-center gap-x-[5vw] w-full px-4 md:w-full md:px-10 md:gap-x-6  md:justify-end'>

                                    <p className='w-[53px] h-[53px] text-center rounded-full md:w-[67px] md:h-[67px] grid place-content-center' 
                                    style={{
                                    color:'var(--yellow-text)',
                                    background: 'var(--landing-page-titles-bg)',
                                    boxShadow: 'var(--landing-page-titles-boxShadow)'}} 
                                    >&#1777;</p>

                                    <p
                                    className='rounded-3xl w-[90%] text-sm md:text-lg md:w-[65%] grid place-content-center'
                                    style={{
                                        color:'var(--yellow-text)',
                                        background: 'var(--landing-page-titles-bg)',
                                        boxShadow: 'var(--landing-page-titles-boxShadow)',}}
                                    >امکان محاسبه ساعات پرواز و وسیله پروازی</p>

                                </div>

                                <div className='flex justify-center gap-x-[5vw] w-full px-4 md:w-full md:px-10 md:gap-x-6  md:justify-end'>

                                    <p className='w-[53px] h-[53px] text-center rounded-full md:w-[67px] md:h-[67px] grid place-content-center' 
                                    style={{
                                    color:'var(--yellow-text)',
                                    background: 'var(--landing-page-titles-bg)',
                                    boxShadow: 'var(--landing-page-titles-boxShadow)'}} 
                                    >&#1777;</p>

                                    <p
                                    className='rounded-3xl w-[90%] text-sm md:text-lg md:w-[65%] grid place-content-center'
                                    style={{
                                        color:'var(--yellow-text)',
                                        background: 'var(--landing-page-titles-bg)',
                                        boxShadow: 'var(--landing-page-titles-boxShadow)',}}
                                    >امکان محاسبه ساعات پرواز و وسیله پروازی</p>

                                </div>

                                

                            </div>

                        </div>
                        
                    </div>


                    {/* fourth slide */}
                    <div className='w-full md:h-[94vh] flex flex-col items-center justify-between py-10 gap-y-16 md:pt-24'>

                        <div className='w-full flex justify-start items-center'>

                            <p className='w-[60%] h-14 rounded-l-full text-right text-2xl font-semibold pt-3 pr-[3.5%] md:h-20 md:pt-7 md:text-left md:pl-8'
                            style={{
                                background: 'var(--landing-page-titles-bg)',
                                boxShadow: 'var(--landing-page-titles-boxShadow)'
                                }}>
                            وبلاگ <span style={{color:'var(--yellow-text)'}}>دیجی‌ لاگ‌بوک</span>
                            </p>

                            <div className=' w-[40%] h-full flex justify-center items-center md:justify-end md:pl-10'>
                                <button className={`${ButtonStyles.normalButton} h-14 w-28 md:h-[68px] md:w-56 md:font-semibold`}>مشاهده بیشتر</button>
                            </div>

                        </div>

                        <div className='w-full h-[50vh] flex flex-col justify-center items-center'>

                                <ArticleSwiper />

                        </div>

                    </div>

                </div>
            }
        </div>
    );
};

export default LandingPage;