import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';

// mui
import useMediaQuery from '@mui/material/useMediaQuery';

import { register } from "swiper/element/bundle";
register();


const ArticleSwiper = () => {
    
    const [products, setProducts] = useState([]);

    const isDesktop = useMediaQuery('(min-width:768px)');

    const swiperRef = useRef(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('https://dummyjson.com/products?limit=10');
                setProducts(response.data.products);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        
        fetchProducts();
    }, []);

    useEffect(() => {
        const swiperContainer = swiperRef.current;
        const params = {
        navigation: true,
        pagination: true,
        centeredSlides: !isDesktop,
        spaceBetween: isDesktop ? '20' : '50',
        slidesPerView: isDesktop ? '3' : '1',
        initialSlide:'0',
        injectStyles: [
            `
              .swiper-button-next,
              .swiper-button-prev {
                margin-top:0rem;
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
                margin-left: 0%;
              }
              .swiper-button-prev {
                margin-right: 0%;
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
    <div className='w-full md:px-[8%]'>
      <swiper-container
      ref={swiperRef}
      init="false"
      >
        {products.map((product) => (
          <swiper-slide
            key={product.id}
            style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}
          >
            <div className="bg-gray-200 rounded-lg p-4 flex flex-col justify-center items-center">
              <img src={product.images[0]} alt={product.title} className='w-[80%] h-56 object-cover rounded-lg mb-4' />
              <h3 className="text-xl font-semibold mb-2">{product.title}</h3>
              <p className="text-gray-700">{product.description}</p>
            </div>
          </swiper-slide>
        ))}
      </swiper-container>

      <style jsx>{`
        .swiper-slide-active {
          /* Your styles for the active slide here */
          border: 5px solid red;
        }
      `}</style>
    </div>
  );
};

export default ArticleSwiper;