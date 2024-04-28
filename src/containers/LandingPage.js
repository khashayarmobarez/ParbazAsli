import React, { useEffect } from 'react';

// assets
import iphone from '../assets/ApiData Temporary/mobile-mk 3.png'
import coachView from '../assets/ApiData Temporary/Coach final 1.png'
import logo from '../assets/ApiData Temporary/Digilogbook -1401 12.png'

const LandingPage = () => {

    useEffect(() => {
        // Function to handle scroll event
        const handleScroll = (event) => {
            const scrollDirection = event.deltaY > 0 ? 'next' : 'prev'; // Determine scroll direction
            const scrollAmount = window.innerWidth; // Scroll by the width of the window

            if (scrollDirection === 'next') {
                window.scrollBy({ left: scrollAmount, behavior: 'smooth' }); // Scroll to the next section
            } else {
                window.scrollBy({ left: -scrollAmount, behavior: 'smooth' }); // Scroll to the previous section
            }
        };

        // Event listener for scroll events
        window.addEventListener('wheel', handleScroll);

        // Clean up the event listener on component unmount
        return () => {
            window.removeEventListener('wheel', handleScroll);
        };
    }, []); // Empty dependency array to run the effect only once when the component mounts


    return (
        <div className='w-full flex flex-col mt-14 py-4'>
            <div className='w-full flex flex-col items-center'>

                {/* first slide */}
                <div className='w-full h-[90vh] flex flex-col items-center justify-center'>

                    <div className='flex flex-col items-center justify-center h-[40%]'>

                        <img alt='logo' src={logo}/>

                        <div className='flex items-center justify-center mt-[-20vh]'>
                            <img alt='phone model' src={iphone} className='absolute'/>
                            <img alt='phone model' src={coachView} />
                        </div>

                    </div>
                        
                    <div className='flex flex-col items-center justify-start gap-y-8 h-[40%] px-4' >

                        <h1 className=' text-xl font-bold'>سامانه ثبت اطلاعات و پروازهای روزانه</h1>

                        <p>در کادر زیر هر متنی را که دوست دارید تایپ کنید تا ما آن را برایتان نگه داریم و همیشه در دسترس شما قرار دهیم؛ از این طریق می‌توانید متن آزمایشی و متن تستی خودتان را تایپ کرده و در طرح‌هایتان از این متن استفاده کنید... تایپ کنید، به صورت خودکار ذخیره می‌شود.</p>

                    </div>
                    
                </div>

            </div>
        </div>
    );
};

export default LandingPage;