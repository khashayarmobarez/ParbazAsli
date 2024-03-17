import React from 'react';

// swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation'; // Import Navigation module styles (optional)
import 'swiper/css/pagination'; // Import Pagination module styles (optional)
import 'swiper/css/scrollbar'; // Import Scrollbar module styles (optional)
import 'swiper/css/a11y' // Import Accessibility module styles (optional)
import 'swiper/css/effect-cards';

import  { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import SpeedoMeter from '../../reuseable/SpeedoMeter';

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, ]); // Optional for using modules


const Slider = ({remainingDays, data}) => {
    return (
        <div className='w-[100%] flex justify-center items-center'>
             <Swiper
                    style={{ paddingRight: '20px', paddingTop:'1rem' , height:'14rem'  }}
                    // install Swiper modules
                    modules={[Navigation, Pagination, A11y]}
                    centeredSlides={true}
                    spaceBetween={50}
                    slidesPerView={1}
                    pagination={{ clickable: true }}
                    // navigation={{
                    //     nextEl: '.swiper-button-next',
                    //     prevEl: '.swiper-button-prev',
                    // }}
                    // pagination={{
                    //     el: '.swiper-pagination',
                    //     clickable: true,
                    // }}
                    onSwiper={(swiper) => console.log(swiper)}
                    onSlideChange={() => console.log('slide change')}
                    >
                    {/* map later */}
                    <SwiperSlide>
                        <SpeedoMeter remaining={remainingDays} data={data} className='z-10' />
                    </SwiperSlide>
                    <SwiperSlide><SpeedoMeter remaining={remainingDays} data={data} className='z-10 mt-10' /></SwiperSlide>
                    <SwiperSlide><SpeedoMeter remaining={remainingDays} data={data} className='z-10 mt-10' /></SwiperSlide>
                    <SwiperSlide><SpeedoMeter remaining={remainingDays} data={data} className='z-10 mt-10' /></SwiperSlide>
            </Swiper>
        </div>
    );
};

export default Slider;