import React, { useEffect, useRef } from 'react';

import SpeedoMeter from '../../reuseable/SpeedoMeter';

import arrow from '../../../assets/icons/Right Arrow Button.svg'

import { register } from "swiper/element/bundle";
register();


const SwiperSlider = ({remainingDays, data}) => {

    const swiperRef = useRef(null);

    useEffect(() => {
        const swiperContainer = swiperRef.current;
        const params = {
        navigation: true,
        pagination: true,
        centeredSlides: true,
        spaceBetween:'50',
        slidesPerView:'1',
        injectStyles: [
            `
              .swiper-button-next,
              .swiper-button-prev {
                margin-top:5.7rem;
                background-color: var(--profile-buttons-background);
                box-shadow:var(--profile-buttons-boxShadow);
                padding: 5px;
                width:12px;
                height:12px;
                border-radius: 100%;
                color: var(--softer-white);
                z-index: 50;
              }
              .swiper-button-next {
                margin-left: 31%;
              }
              .swiper-button-prev {
                margin-right: 31%;
              }

              .swiper-pagination-bullet{
                width: 8px;
                height: 8px;
                background-color: var(--softer-white);
              }
              /* Custom pagination style (add to your CSS) */
                .swiper-pagination.custom-pagination {
                    position: absolute;
                    bottom: 1rem; /* Adjust the bottom position as needed */
                    left: 50%;
                    transform: translateX(-50%); /* Center the pagination horizontally */
                }
          `,
          ],
        };

    Object.assign(swiperContainer, params);
    swiperContainer.initialize();
  }, []);

    return (
        <div className='w-full h-64'>
            <div className='w-full h-full py-2'>
            <swiper-container
                        style={{  marginRight: '20px' , height:'15rem', }}
                        ref={swiperRef}
                        init="false"
                        >
                        {/* map later */}
                        <swiper-slide>
                            <SpeedoMeter remaining={remainingDays} data={data} className='z-10' />
                        </swiper-slide>
                        <swiper-slide><SpeedoMeter remaining={remainingDays} data={data} className='z-50 mt-10' /></swiper-slide>
                        <swiper-slide><SpeedoMeter remaining={remainingDays} data={data} className='z-10 mt-10' /></swiper-slide>
                        <swiper-slide><SpeedoMeter remaining={remainingDays} data={data} className='z-10 mt-10' /></swiper-slide>
                </swiper-container>
            </div>
            <div className="swiper-pagination custom-pagination"></div>
        </div>
    );
};

export default SwiperSlider;