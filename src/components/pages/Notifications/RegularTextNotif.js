import React from 'react';


const RegularTextNotif = ({notif}) => {

    const {description ,title, isRead} = notif;



    return (
        <div className=' w-full h-20 rounded-3xl flex items-center justify-between px-6' style={{background:'var(--about-us-box-color)', boxShadow:'var(--about-us-box-shodow)', color:'var(--soft-white) ' }}>

            <div className='text-xs flex flex-col justify-center items-start space-y-2'>

                <div className=' flex justify-center items-center gap-x-2'>
                    {
                        !isRead &&
                        <div className='w-[10px] h-[10px] rounded-full' style={{background:'var(--red-text)'}} />
                    }
                    <p className='text-base'> {title.slice(0, 42)}{title.length > 42 ? '...' : ''}</p>
                </div>

                <div className=' '>
                    <p className='text-start'>{description.slice(0, 102)}{description.length > 0 ? ' ...' : ''}</p>
                </div>

            </div>

        </div>
    );
};

export default RegularTextNotif;