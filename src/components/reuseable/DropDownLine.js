import React from 'react';

// mui
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const DropDownLine = ({title, isActive, onClick, icon, textWidth}) => {
    return (
        <div className='flex justify-between w-full'>
            
            <div  className={`flex w-full h-10 items-center justify-between gap-x-4`}>

                <div className='flex gap-x-3 justify-center'>
                    {icon ? 
                    <>
                        <span className='w-4'>
                            <img src={icon} alt='icon' />
                        </span>
                        <p className='text-sm font-light w-16 '> 
                            {title}
                        </p>
                    </>
                    :
                    <p className='text-xs font-light whitespace-nowrap' > 
                        {title}
                    </p>
                    }
                </div>

                <div className='w-full'>
                    <div className='w-full h-[1px]' style={{ background:'var(--soft-white)'}}></div>
                </div>

                <span onClick={onClick} className={`transition-transform duration-300 transform ${isActive ? 'rotate-90 mt-2' : 'rotate-[-90deg] mt-[-10px]'}`}>
                    <ArrowBackIosIcon />
                </span>

            </div>

        </div>
    );
};

export default DropDownLine;

// <DropDownLine  title='' icon={} dropDown={DropDown} isActive={DropDown === 'dropDown3'} onClick={() => setDropDown(DropDown === 'dropDown3' ? '' : 'dropDown3')} />
