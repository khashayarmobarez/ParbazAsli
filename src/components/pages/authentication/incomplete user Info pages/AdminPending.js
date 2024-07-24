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
        }, 60000); // 10000 milliseconds = 10 seconds

        // Cleanup function to clear the interval
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className='flex flex-col items-center pt-20 pb-[4rem]'>
            <div className='flex flex-col items-center justify-center gap-y-8 md:mt-4 w-[90%] md:w-[65%]'>
                
                <UserDataBox />


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
                <p className=' text-base'>کاربر گرامی گواهینامه شما ثبت شد و در انتظار تایید میباشد و طی 24 ساعت آینده وضعیت آن مشخص خواهد شد<br/>از صبوری شما سپاسگزاریم</p>

            </div>
        </div>
    );
};

export default AdminPending;