import React, { useEffect } from 'react';

// components
import UserDataBox from '../../Profile/UserDataBox';

const AdminPending = () => {

    // useEffect to set up the interval
    useEffect(() => {
        // Set up the interval to refresh the page every 10 seconds
        const intervalId = setInterval(() => {
            console.log('Refreshing page...');
            window.location.reload();
        }, 15000); // 10000 milliseconds = 10 seconds

        // Cleanup function to clear the interval
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className='flex flex-col items-center pt-20 pb-[4rem]'>
            <div className='flex flex-col items-center justify-center gap-y-8 md:mt-4 w-[90%] md:w-[65%]'>
                
                <UserDataBox />

                <div className='w-full flex flex-col gap-y-2'>
                    <p style={{color:'var(--red-text)'}}>برای دسترسی به پنل کاربری اهراز موارد زیر الزامی است.</p>
                    <p className='text-sm text-right' style={{color:'var(--yellow-text)'}}>اول ارگان خود را انتخاب کرده سپس اطلاعات گواهینامه ی خود را کامل کنید.</p>
                </div>


                {/* line and circle of adding flight level */}
                <div className='w-full flex flex-col gap-y-3 justify-center items-center'>

                    <div className='flex items-center justify-center w-full'>
                        
                        <div className='rounded-full w-3 h-3' style={{background:'var(--yellow-text)'}}></div>

                        <div className='rounded-full w-[38%] md:w-[45%] h-[2px]' style={{background:'var(--yellow-text)'}}></div>

                        <div className='rounded-full w-3 h-3' style={{background:'var(--yellow-text)'}}></div>

                        <div className='rounded-full w-[38%] md:w-[45%] h-[2px]' style={{background:'var(--yellow-text)'}}></div>

                        <div className='rounded-full w-3 h-3' style={{background:'var(--yellow-text)'}}></div>

                    </div>

                    <div className='flex items-center justify-between w-[98%]'>

                        <p className='' style={{color:'var(--yellow-text)'}}>تاییدیه</p>

                        <p className='mr-3 md:mr-0' style={{color:'var(--yellow-text)'}}>گواهینامه</p>

                        <p className='' style={{color:'var(--yellow-text)'}}>احراز ایمیل</p>

                    </div>

                </div>

                <p className=' text-xl'>در انتظار تایید...</p>
                <p className=' text-base'>کمی صبر کرده تا اطلاعات شما بازدید و صحت ان توسط همکاران ما تایید شود </p>

            </div>
        </div>
    );
};

export default AdminPending;