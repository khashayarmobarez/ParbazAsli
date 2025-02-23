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
import WatchLaterOutlinedIcon from '@mui/icons-material/WatchLaterOutlined';

// styles
import styles from './ArticleSwiper.module.css';
import ButtonStyles from '../../styles/ButtonsBox.module.css'

// Queries
import { useBlogs } from '../../Utilities/Services/queries';

  const ArticleSwiper = () => {

  const navigate = useNavigate()

  const [activeSlideIndex, setActiveSlideIndex] = useState(0); // State to track active slide index
  
  const isDesktop = useMediaQuery('(min-width:768px)');

  const { data: blogData, isLoading, isError, error } = useBlogs(10, 1);

  // Handle slide change event
  const handleSlideChange = (swiper) => {
    const nextSlideIndex = swiper.activeIndex + 1; // Calculate index of the slide following the active one
    setActiveSlideIndex(nextSlideIndex); // Update active slide index on slide change
  };

  // Extract a limited number of words from HTML content
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
    <div className='w-full md:pl-[8%] md:pr-[11%]'>

      <Swiper
        modules={[Navigation,]}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        // navigation={{
        //   nextEl: `.${styles.swiperButtonNext}`,
        //   prevEl: `.${styles.swiperButtonPrev}`,
        // }}
        centeredSlides={!isDesktop} // Center slides in non-desktop view
        spaceBetween={isDesktop ? 60 : 0} // Space between slides
        slidesPerView={isDesktop ? 3 : 1} // Number of slides per view
        initialSlide={1} // Start at the first slide
        onSlideChange={handleSlideChange} // Handle slide change
        autoplay={{ delay: 2000 }} // Autoplay with a delay of 2000ms
      >

        {blogData.data.map((blog,index) => (
          <SwiperSlide
            key={blog.id}
            className={`${styles.swiperSlide} `} // Apply active slide style conditionally
            style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}
          >

            <div className={`${styles.productCard} ${index === activeSlideIndex  ? 'w-full' : 'md:w-[85%] md:mt-12 w-[75%]'} `}>

            {/* conditions to set active styling for desktop mode */}
            {/* Display read time in minutes */}
            {
              isDesktop ? 
                ( index === activeSlideIndex &&
                  <p className='absolute top-3 py-1 px-2 text-sm self-end z-30 rounded-r-3xl' style={{background:'var(--dark-blue-bg)'}} >
                    <WatchLaterOutlinedIcon  /> در {blog.timeToReadInMinutes} دقیقه بخوانید
                  </p>
                )
                :
                <p className='absolute top-3 py-1 px-2 text-sm self-end z-30 rounded-r-3xl' style={{background:'var(--dark-blue-bg)'}} >
                    <WatchLaterOutlinedIcon  /> در {blog.timeToReadInMinutes} دقیقه بخوانید
                </p>
            }

              <img src={blog.image.path} alt={blog.title} className={` w-full  object-cover mb-4 z-10 ${index === activeSlideIndex  ? ' h-72' : 'h-56'}`} />

              {/* conditions to set active styling for desktop mode */}
              {
                isDesktop ? 
                  ( index === activeSlideIndex &&
                  <>
                    <h3 className=' text-xl' style={{color:'var(--text-accent)'}}>{blog.title}</h3>
                    <p className=' mb-4' style={{color:'var(--softer-white)'}}>{blog.authorName}</p>
                    <p className=' mb-8' style={{color:'var(--softer-white)'}}>
                      { blog.blogSections && blog.blogSections.length > 0 && blog.blogSections[0].htmlContent
                        ? extractWordsFromHtml(blog.blogSections[0].htmlContent, 30)
                        : 'No content available'
                      } ...
                    </p>
                    <button onClick={() => navigate(`/blog/${blog.id}`)} className={`${ButtonStyles.addButton} w-36 `}>خواندن مقاله</button>
                  </>
                  ) 
                  :
                  <>
                    <h3 className=' text-xl' style={{color:'var(--text-accent)'}}>{blog.title}</h3>
                    <p className=' mb-4' style={{color:'var(--softer-white)'}}>{blog.authorName}</p>
                    <p className=' mb-8' style={{color:'var(--softer-white)'}}>
                      { blog.blogSections && blog.blogSections.length > 0 && blog.blogSections[0].htmlContent
                        ? extractWordsFromHtml(blog.blogSections[0].htmlContent, 30)
                        : 'No content available'
                      } ...
                    </p>
                    <button onClick={() => navigate(`/blog/${blog.id}`)} className={`${ButtonStyles.addButton} w-36 `}>خواندن مقاله</button>
                  </>
              }

            </div>

          </SwiperSlide>
        ))}

        {/* Navigation buttons */}
        <div className="swiper-button-next"></div>
        <div className="swiper-button-prev"></div>

      </Swiper>

    </div>
  );
};

export default ArticleSwiper;