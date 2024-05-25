import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';

// mui
import useMediaQuery from '@mui/material/useMediaQuery';

// styles
import styles from './ArticleSwiper.module.css';
import ButtonStyles from '../../../styles/Buttons/ButtonsBox.module.css'

// Queries
import { useBlogs } from '../../../Utilities/Services/queries';

  const ArticleSwiper = () => {

  const navigate = useNavigate()

  const [activeSlideIndex, setActiveSlideIndex] = useState(0); // State to track active slide index
  
  const isDesktop = useMediaQuery('(min-width:768px)');

  const { data: blogData, isLoading, isError, error } = useBlogs(10, 1);


  const handleSlideChange = (swiper) => {
    const nextSlideIndex = swiper.activeIndex + 1; // Calculate index of the slide following the active one
    setActiveSlideIndex(nextSlideIndex); // Update active slide index on slide change
  };

  const extractWordsFromHtml = (html, wordLimit) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    const textContent = tempDiv.textContent || tempDiv.innerText || "";
    const words = textContent.split(' ').slice(0, wordLimit).join(' ');
    return words;
  };  


  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className='w-full md:pl-[8%] md:pr-[10%]'>
      <Swiper
        modules={[Navigation, Pagination]}
        navigation={{
          nextEl: `.${styles.swiperButtonNext}`,
          prevEl: `.${styles.swiperButtonPrev}`,
        }}
        pagination={{
          clickable: true,
          bulletClass: styles.swiperPaginationBullet,
        }}
        centeredSlides={!isDesktop}
        spaceBetween={isDesktop ? 50 : 0}
        slidesPerView={isDesktop ? 3 : 1}
        initialSlide={0}
        onSlideChange={handleSlideChange} 
        autoplay={{ delay: 4000 }}
      >

        {blogData.data.map((blog,index) => (
          <SwiperSlide
            key={blog.id}
            className={`${styles.swiperSlide} ${index === activeSlideIndex  ? styles.activeSlide : ''}`} // Apply active slide style conditionally
            style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}
          >

            <div className={`${styles.productCard} `}>

              <img src={blog.image.path} alt={blog.title} className={styles.productImage} />
              <h3 className=' text-xl' style={{color:'var(--yellow-text)'}}>{blog.title}</h3>
              <p className=' mb-4' style={{color:'var(--softer-white)'}}>{blog.authorName}</p>
              <p className=' mb-8' style={{color:'var(--softer-white)'}}>
                { blog.blogSections && blog.blogSections.length > 0 && blog.blogSections[0].htmlContent
                  ? extractWordsFromHtml(blog.blogSections[0].htmlContent, 30)
                  : 'No content available'
                } ...
              </p>
              <button onClick={() => navigate(`/blog/${blog.id}`)} className={`${ButtonStyles.addButton} w-36 `}>خواندن مقاله</button>
            </div>

          </SwiperSlide>
        ))}

      </Swiper>

    </div>
  );
};

export default ArticleSwiper;