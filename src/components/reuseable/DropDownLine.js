import React from 'react';

// mui
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const DropDownLine = ({title, isActive, onClick, icon}) => {
    return (
        <div className='flex justify-between w-full'>
            
            <div  className={`flex w-[100%] h-10 items-center justify-between px-3`}>

            <div className='flex gap-x-3'>
                <span className='w-4'>
                    <img src={icon} alt='icon' />
                </span>
                <p className='text-sm font-light w-16'> 
                    {title}
                </p>
            </div>

            <div className='w-3/6 h-[1px] ' style={{ background:'var(--soft-white)'}}></div>

            <span onClick={onClick} className={`transition-transform duration-300 transform ${isActive ? 'rotate-90 mt-2' : 'rotate-[-90deg] mt-[-10px]'}`}>
                <ArrowBackIosIcon />
            </span>

        </div>

        </div>
    );
};

export default DropDownLine;

// <DropDownLine  title='test' icon={} isExpanded={} />