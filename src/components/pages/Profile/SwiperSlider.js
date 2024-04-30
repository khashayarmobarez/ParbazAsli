import React, { useEffect, useRef } from 'react';

// mui
import useMediaQuery from '@mui/material/useMediaQuery';

import SpeedoMeter from '../../reuseable/SpeedoMeter';

import { register } from "swiper/element/bundle";
register();


const SwiperSlider = ({remainingDays, data}) => {

    const isDesktop = useMediaQuery('(min-width:768px)');

    const swiperRef = useRef(null);

    useEffect(() => {
        const swiperContainer = swiperRef.current;
        const params = {
        navigation: true,
        pagination: true,
        centeredSlides: !isDesktop,
        spaceBetween: isDesktop ? '20' : '50',
        slidesPerView: isDesktop ? '2' : '1',
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
              ${
                isDesktop
                  ? `.swiper-slide {
                    width: 45% !important; // Set slide width to 45% on desktop
                  }`
                  : ''
              }
          `,
          ],
        };

    Object.assign(swiperContainer, params);
    swiperContainer.initialize();
  }, [isDesktop]);

    return (
        <div className='w-full h-64'>
            <div className='w-full h-full py-2'>
            <swiper-container
                        style={{ height:'15rem',...(!isDesktop && { marginRight: '3%' }), }}
                        ref={swiperRef}
                        init="false"
                        >
                        {/* map later */}
                        <swiper-slide style={{...(isDesktop && { paddingLeft: '0.5rem' }),}} >
                            <SpeedoMeter remaining={remainingDays} data={data} className='z-10' />
                        </swiper-slide>
                        <swiper-slide style={{...(isDesktop && { paddingLeft: '0.5rem' }),}}><SpeedoMeter remaining={remainingDays} data={data} className='z-50 mt-10' /></swiper-slide>
                        <swiper-slide style={{...(isDesktop && { paddingLeft: '0.5rem' }),}}><SpeedoMeter remaining={remainingDays} data={data} className='z-10 mt-10' /></swiper-slide>
                        <swiper-slide style={{...(isDesktop && { paddingLeft: '0.5rem' }),}}><SpeedoMeter remaining={remainingDays} data={data} className='z-10 mt-10' /></swiper-slide>
                </swiper-container>
            </div>
        </div>
    );
};

export default SwiperSlider;