import React, { useState } from 'react';

// mui
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

// components

const DropDownLineStyle = (props) => {

    const{title, dataText, level, id} = props

    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpanded = () => {
        setIsExpanded(!isExpanded);
    };

    return (
    <div className='flex flex-col gap-y-3'>

        <div onClick={toggleExpanded} className={`flex w-[100%] h-10 items-center justify-between px-3`}>
            {/* style={{
                borderColor: isExpanded ? 'var(--yellow-border-button)' : 'var(--light-border-button-collapsed)',
                color: isExpanded ? 'var(--yellow-border-button)' : 'var(--light-border-button-collapsed)',
            }} */}

            <p> 
                {level}
            </p>

            <div className='border-t border-gray-300 w-3/5'></div>

            <span className={`transition-transform duration-300 transform ${isExpanded ? 'rotate-90 mt-2' : 'rotate-[-90deg] mt-[-10px]'}`}>
                <ArrowBackIosIcon />
            </span>

        </div>

        <div className={`${isExpanded ? 'flex' : 'hidden'} h-11 items-center justify-between px-4 rounded-2xl text-[10px]`}
        style={{backgroundColor: 'var(--syllabus-data-boxes-bg)'}} >
            
            <div className='flex w-3/5 justify-between'>
                <p>{id}</p>
                <p>عنوان سیلابس لورم ایپسوم متن ساختگی</p>
            </div>

        </div>

    </div>
    );
};

export default DropDownLineStyle;