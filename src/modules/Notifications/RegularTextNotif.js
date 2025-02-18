import React from 'react';


const RegularTextNotif = ({notif, handleActivatePopUp}) => {

    const { description ,title, isRead, createdDateTime} = notif;

    return (
        <div className=' w-full h-auto rounded-2xl flex flex-col items-center justify-between px-4 py-4 gap-y-2'
        style={{background:'var(--bg-output-default)', boxShadow:'var(--shadow-all)', color:'var(--text-default)', border: notif.status === 'Pending' ? '1px solid var(--text-accent)' : '' }}
        onClick={handleActivatePopUp}>

            <div className='w-full flex self-start justify-start text-start items-start gap-x-2'>

                {
                    !isRead &&
                    <div className='w-[10px] h-[10px] rounded-full bg-textError ' />
                }

                {/* <p className='text-base text-start '>{title.slice(0, 42)}{title.length > 42 ? '...' : ''}</p> */}
                <p className='text-base text-start max-w-[90%]'>{title}</p>

            </div>

            <div className='text-xs w-full flex justify-between items-start'>

                <p className=' text-start text-xs self-start'>{createdDateTime}</p>

            </div>

        </div>
    );
};

export default RegularTextNotif;