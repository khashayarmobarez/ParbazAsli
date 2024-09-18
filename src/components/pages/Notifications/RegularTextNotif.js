import React from 'react';


const RegularTextNotif = ({notif}) => {

    const {description ,title, isRead, createdDateTime} = notif;



    return (
        <div className=' w-full h-auto rounded-3xl flex items-center justify-between px-6 py-2'
        style={{background:'var(--Basic-dataBox-bg)', boxShadow:'var(--dark-input-boxShadow)', color:'var(--soft-white)', border: notif.status === 'Pending' ? '1px solid var(--yellow-text)' : '' }}>

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

                <p className='text-start text-[var(--low-opacity-white)]'>{createdDateTime}</p>

            </div>

        </div>
    );
};

export default RegularTextNotif;