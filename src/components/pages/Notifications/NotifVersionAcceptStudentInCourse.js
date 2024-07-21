import React from 'react';

const NotifVersionAcceptStudentInCourse = () => {
    return (
        <div className=' w-full h-24 rounded-3xl flex items-center justify-between px-6' style={{background:'var(--about-us-box-color)', boxShadow:'var(--about-us-box-shodow)', color:'var(--soft-white) ' }}>

            <div className='text-xs flex flex-col justify-center items-start space-y-2'>

                <div className=' flex'>
                    <p className='text-base'> عنوان اصلی اعلان</p>
                </div>

                <div className=' '>
                    <p className='text-start'>لورم ایپسوم توضیحات فرعی اعلان </p>
                </div>

            </div>
            
            <div className='flex w-20 justify-between'>
                <button type="submit" className={``} style={{color:'var(--yellow-text) '}} >تایید</button>
                <button type="" style={{ color: 'var(--red-text)' }}>رد</button>
            </div>

        </div>
    );
};

export default NotifVersionAcceptStudentInCourse;