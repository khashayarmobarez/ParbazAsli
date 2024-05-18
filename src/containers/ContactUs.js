import React from 'react';

// assets
import contactUs from '../assets/ApiData Temporary/picture/contacUs.jpg'
import mailIcon from '../assets/icons/mail-Icon (Stroke).svg'

// styles
import ButtonStyles from '../styles/Buttons/ButtonsBox.module.css'

// mui
import useMediaQuery from '@mui/material/useMediaQuery';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import XIcon from '@mui/icons-material/X';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import PageTitle from '../components/reuseable/PageTitle';
import TextInput from '../components/inputs/textInput';
import LongTextInput from '../components/inputs/LongTextInput';

const ContactUs = () => {

    const isBelow768px = useMediaQuery('(max-width:768px)');

    return (
        <div className='mt-10 w-full flex flex-col items-center'>
            
            <div className='w-full flex flex-col items-center mt-6 min-h-[60vh] pb-6 gap-y-10' 
             style={{ backgroundImage: `url(${contactUs})`, backgroundSize: 'cover', backgroundPosition: 'top left' }}>

                {
                isBelow768px &&
                <PageTitle title={'راه‌های ارتباطی'} />
                }

                <div className='w-[90%] flex flex-col rounded-3xl py-6 px-8 gap-y-6 mb-8' style={{background:'var(--about-us-box-color)', boxShadow:'var(--about-us-box-shodow)'}}>

                    <div className='w-full flex justify-between gap-y-8' >

                        <div className='flex flex-col gap-y-10 py-4'>
                            <div className='flex gap-x-4'><EmailOutlinedIcon /><p>info@digilogbook.ir</p></div>
                            <div className='flex gap-x-4'><LocalPhoneOutlinedIcon /><p>021-77788899</p></div>
                        </div>

                        <div className='flex flex-col gap-y-4'>

                            <div className='w-[53px] h-[53px] rounded-full flex items-center justify-center' style={{background: 'var(--landing-page-titles-bg)',boxShadow: 'var(--landing-page-titles-boxShadow)'}}>
                                <XIcon sx={{width:'50px', color:'var(--yellow-text)'}} />
                            </div>
                            <div className='w-[53px] h-[53px] rounded-full flex items-center justify-center' style={{background: 'var(--landing-page-titles-bg)',boxShadow: 'var(--landing-page-titles-boxShadow)'}}>
                                <InstagramIcon sx={{width:'50px', color:'var(--yellow-text)'}} />
                            </div>
                            <div className='w-[53px] h-[53px] rounded-full flex items-center justify-center' style={{background: 'var(--landing-page-titles-bg)',boxShadow: 'var(--landing-page-titles-boxShadow)'}}>
                                <WhatsAppIcon sx={{width:'50px', color:'var(--yellow-text)'}} />
                            </div>

                        </div>


                    </div>

                    <form className='flex flex-col w-full gap-y-6 mb-4'>

                        <h1 className=' text-right'>نظرات خود را با ما در میان بگذارید</h1>

                        <TextInput  placeholder='نام'  />

                        <TextInput  placeholder='ایمیل' icon={mailIcon} />

                        <LongTextInput placeholder='نظر شما...' />

                        <button className={`${ButtonStyles.addButton} w-[100%]`} >
                            <p>ارسال</p>
                        </button>
                        
                    </form>

                </div>

                
                
            </div>
            
        </div>
    );
};

export default ContactUs;