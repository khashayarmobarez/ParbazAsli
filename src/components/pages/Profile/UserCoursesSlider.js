import React, { useEffect, useRef } from 'react';

// mui
import useMediaQuery from '@mui/material/useMediaQuery';

// components
import CourseSlide from './EditProfile/CourseSlide';

import { register } from "swiper/element/bundle";
register();



const UserCoursesSlider = ({coursesData}) => {

    const isDesktop = useMediaQuery('(min-width:768px)');

    const swiperRef = useRef(null);

    useEffect(() => {
        const swiperContainer = swiperRef.current;
        const params = {
        navigation: true,
        centeredSlides: !isDesktop,
        spaceBetween: isDesktop ? '20' : '50',
        slidesPerView: isDesktop ? '2' : '1',
        pagination:{
          dynamicBullets: true,
        },
        autoplay: {
          delay: 3500, // 3 seconds
          disableOnInteraction: true,
        },
        injectStyles: [
            `
              .swiper-button-next,
              .swiper-button-prev {
                margin-top:5.5rem;
                background-color: var(--bg-button-secondary-default);
                box-shadow:var(--shadow-button-dark),var(--shadow-button-white);
                padding: 5px;
                width:14px;
                height:14px;
                border-radius: 100%;
                color: var(--text-default);
                z-index: 50;
              }
              .swiper-button-next {
                margin-left: 30%;
              }
              .swiper-button-prev {
                margin-right: 30%;
              }

              .swiper-pagination-bullet{
                width: 6px;
                height: 6px;
                background-color: var(--text-default);
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
        <div className='w-full h-60'>
          <div className='w-full h-full py-2 md:pt-0'>
            
              <swiper-container
                style={{ height:'14.6rem',...(!isDesktop && { marginRight: '0' }), }}
                ref={swiperRef}
                init="false"
                >

                  {/* map later */}
                  {
                    coursesData.map( course => 

                      <swiper-slide key={course.id} style={{...(isDesktop && { paddingLeft: '0.5rem' }),}} >
                          <CourseSlide courseData={course} className='z-10' />
                      </swiper-slide>

                    )
                  }

              </swiper-container>
            
          </div>
        </div>
    );
};

export default UserCoursesSlider;