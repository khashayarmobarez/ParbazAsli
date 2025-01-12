import React from 'react';

// mui
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const DropDownLine = ({title, isActive, onClick, icon, textWidth, onClickActivation, hasNoArrow}) => {
    return (
        <div className='flex justify-between w-full' onClick={onClickActivation}>
            
            <div  className={`flex w-full h-10 items-center justify-between gap-x-4`}>

                <div className={`flex gap-x-2 justify-center  ${isActive ? 'text-textAccent' : 'text-bgDropdownDefault'}`}>
                    {icon ? 
                    <>
                        <span className='w-6'>
                            {icon}
                        </span>
                        <p className='text-base font-light w-16 '> 
                            {title}
                        </p>
                    </>
                    :
                    <p className='text-base font-light whitespace-nowrap' > 
                        {title}
                    </p>
                    }
                </div>

                <div className='w-full'>
                    <div className={`w-full h-[1px] ${isActive ? 'bg-bgDropdownActive' : 'bg-bgDropdownDefault'}`} ></div>
                </div>

                {
                    !hasNoArrow &&
                    <span onClick={onClick} className={`transition-transform duration-300 transform ${isActive ? 'rotate-90 mt-2' : 'rotate-[-90deg] mt-[-10px]'}`}>
                        <ArrowBackIosIcon sx={{ color: isActive ? 'var(--text-accent)' : 'var(--bg-dropdown-default)' }} />
                    </span>
                }

            </div>

        </div>
    );
};

export default DropDownLine;

// <DropDownLine  title='' icon={} dropDown={DropDown} isActive={DropDown === 'dropDown3'} onClick={() => setDropDown(DropDown === 'dropDown3' ? '' : 'dropDown3')} />
