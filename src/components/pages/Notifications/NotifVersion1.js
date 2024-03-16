import React from 'react';

import ButtonStyles from '../../../styles/Buttons/ButtonsBox.module.css'

const NotifVersion1 = () => {
    return (
        <div className=' w-full h-24 rounded-3xl flex items-center justify-between px-6' style={{background:'var(--class-details-bg)', boxShadow:'var(--class-details-boxShadow)', color:'var(--soft-white) ' }}>

            <div className='text-xs flex flex-col justify-center items-start space-y-2'>

                <div className=' flex'>
                    <p className='text-base'> عنوان اصلی اعلان</p>
                </div>

                <div className=' '>
                    <p className='text-start'>لورم ایپسوم توضیحات فرعی اعلان </p>
                </div>

            </div>
            
            <div>
                <button type="submit" className={`${ButtonStyles.normalButton} w-7 h-12`} >مشاهده</button>
            </div>

        </div>
    );
};

export default NotifVersion1;