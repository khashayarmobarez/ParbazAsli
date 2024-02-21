import React, { useState } from 'react';
import dataStyles from '../../styles/Boxes/DataBox.module.css'

import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const DropDownDataBox = (props) => {

    const{title, dataText} = props

    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpanded = () => {
        setIsExpanded(!isExpanded);
    };

    return (
    <div className='flex flex-col gap-y-3'>

        <div onClick={toggleExpanded} className={`${dataStyles.Container2} w-[100%] h-12 items-center justify-between px-3 ${isExpanded ? 'border-2 border-green-500 border-opacity-50' : 'border-2 border-gray-300 border-opacity-50'}`}>

            <div className='flex' >
                <span> 
                    <InsertDriveFileOutlinedIcon sx={{ position: 'relative' }} />
                </span>
                <h3 className='text-base'>{title}</h3>
            </div>

            <span className={`transition-transform duration-300 transform ${isExpanded ? 'rotate-90 mt-2' : 'rotate-[-90deg] mt-[-10px]'}`}>
                <ArrowBackIosIcon />
            </span>

        </div>

        <p className={`${isExpanded ? 'block' : 'hidden'}`} >{dataText}</p>

    </div>
    );
};

export default DropDownDataBox;