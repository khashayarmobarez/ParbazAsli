import React, { useEffect, useRef } from 'react';

// mui
import useMediaQuery from '@mui/material/useMediaQuery';

import SpeedoMeter from '../../reuseable/SpeedoMeter';

import { register } from "swiper/element/bundle";
register();


const ParachutesSwiperSlider = ({parachutesData, isForClub}) => {

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
        autoplay: {
          delay: 3500, // 3 seconds
          disableOnInteraction: true,
        },
        injectStyles: [
            `
              .swiper-button-next,
              .swiper-button-prev {
                margin-top:4.6rem;
                background-color: var(--bg-button-secondary-default);
                box-shadow:var(--shadow-button-dark),var(--shadow-button-white);
                padding: 5px;
                width:12px;
                height:12px;
                border-radius: 100%;
                color: var(--text-disabled);
                z-index: 50;
              }
              .swiper-button-next {
                margin-left: 33%;
              }
              .swiper-button-prev {
                margin-right: 33%;
              }

              .swiper-pagination-bullet{
                width: 6px;
                height: 6px;
                background-color: var(--text-disabled);
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
        <div className='w-full h-52'>
          <div className='w-full h-full py-2'>

            
              <swiper-container
                style={{ height:'12.4rem',...(!isDesktop && { marginRight: '0' }), }}
                ref={swiperRef}
                init="false"
                >

                  {/* map later */}
                  {
                    parachutesData.map( parachute => 

                      <swiper-slide key={parachute.id} style={{...(isDesktop && { paddingLeft: '0.5rem' }),}} >
                          <SpeedoMeter parachuteData={parachute} isForClub={isForClub} className='z-10' />
                      </swiper-slide>

                    )
                  }

              </swiper-container>
            
          </div>
        </div>
    );
};

export default ParachutesSwiperSlider;