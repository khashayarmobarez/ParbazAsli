import React from 'react';


const RegularTextNotif = ({notif, handleActivatePopUp}) => {

    const {description ,title, isRead, createdDateTime} = notif;



    return (
        <div className=' w-full h-auto rounded-3xl flex flex-col items-center justify-between px-6 py-2 gap-y-2'
        style={{background:'var(--Basic-dataBox-bg)', boxShadow:'var(--dark-input-boxShadow)', color:'var(--soft-white)', border: notif.status === 'Pending' ? '1px solid var(--yellow-text)' : '' }}
        onClick={handleActivatePopUp}>

            <div className=' flex self-start justify-start text-start items-start gap-x-2'>

                {
                    !isRead &&
                    <div className='w-[10px] h-[10px] rounded-full ' style={{background:'var(--red-text)'}} />
                }

                <p className='text-base text-start '>{title.slice(0, 42)}{title.length > 42 ? '...' : ''}</p>

            </div>

            <div className='text-xs flex justify-between items-center'>


                <div className=' w-full'>
                    <p className='text-start'>{description.slice(0, 48)}{description.length > 0 ? ' ...' : ''}</p>
                </div>

                <p className='w-full text-end text-xs self-end'>{createdDateTime}</p>

            </div>

        </div>
    );
};

export default RegularTextNotif;