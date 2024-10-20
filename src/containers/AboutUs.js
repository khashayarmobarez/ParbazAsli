import React from 'react';
import { useNavigate } from 'react-router-dom';

// styles
import ButtonStyles from '../styles/Buttons/ButtonsBox.module.css'

// assets
import davinci from '../assets/ApiData Temporary/picture/davinci.jpg'

// mui
import useMediaQuery from '@mui/material/useMediaQuery';

// components
import PageTitle from '../components/reuseable/PageTitle';

const AboutUs = () => {

    const navigate = useNavigate()

    const isBelow768px = useMediaQuery('(max-width:768px)');

    return (
        <div className='w-full md:h-[50rem] pt-14 pb-8 flex justify-center items-center md:mt-10' style={{ backgroundImage: `url(${davinci})`, backgroundSize: 'cover', backgroundPosition: 'top left' }}>
            <div className='w-full h-full flex flex-col md:mt-14 items-center md:w-[70%] gap-y-6'>
                
                {
                    isBelow768px &&
                    <PageTitle title={`درباره دیجی لاگ بوک`} />
                }

                    <div className='w-[90%] flex flex-col rounded-3xl py-8 px-4 text-right md:w-[50%] md:self-start gap-y-8 mt-6 mb-4' style={{background:'var(--bg-card)', boxShadow:'var(--shadow-all)'}}>

                    {
                    !isBelow768px &&
                        <h1 className='text-xl'><span style={{color:'var(--text-accent)'}}>درباره</span> دیجی لاگ بوک</h1>
                    }

                        <p>
                            یک لاگ بوک دیجیتال طراحی کرده ایم تا شما بتوانید به راحتی با ثبت پروازهای خود طبق سیلابس های آموزشی به آموزشتان نظم بیشتری دهید و دسترسی سریع به سوابق خود برای آگاهی از پیشرفتتان داشته باشید. علاوه بر این ، به شما امکان این را می دهد که بدانید از چه مرحله ایی آغاز کرده اید ، تا بتوانید برای خود دقیق تر و راحت تر هدف گذاری کنید ، همچنین نقاط قوت و ضعف خود را یادداشت کرده و در راستای بهبود آن ها تلاش بیشتری کنید.<br/>
                             ما اینجا با توجه به نیاز های جامعه ی هوشمند ، دیجی لاگ بوک را طراحی کردیم تا نه تنها هزینه های خرید و چاپ را حذف کنیم ، بلکه از مصرف کاغذ کاسته ایم تا آسیب به محیط زیست را کاهش و از آن محافظت کنیم.
                             به امید پرواز های ایمن ، رشد و پیشرفت این رشته جذاب در میهن عزیزمان ایران
                             و این فقط بخشی از خدمات دیجی لاگ بوک است …
                            همراه ما باشید.
                        </p>

                        <button onClick={() => navigate('/contactUs')} className={`${ButtonStyles.addButton} w-36 self-end mb-[-3rem] ml-4`}>تماس با ما</button>

                    </div>
                
            </div>
        </div>
    );
};

export default AboutUs;