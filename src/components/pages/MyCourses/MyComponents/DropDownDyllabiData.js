import React, { useState } from 'react';

// styles
import dataStyles from '../../../../styles/Boxes/DataBox.module.css'

import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const DropDownSyllabiData = (props) => {

    const{title, data, percent} = props

    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpanded = () => {
        setIsExpanded(!isExpanded);
    };

    return (
    <div className='flex flex-col gap-y-3'>

        <div onClick={toggleExpanded} className={`${dataStyles.Container2} w-[100%] h-12 items-center justify-between px-3 border-2 border-opacity-50`}
        style={{
            borderColor: isExpanded ? 'var(--yellow-border-button)' : 'var(--light-border-button-collapsed)',
            color: isExpanded ? 'var(--yellow-border-button)' : 'var(--light-border-button-collapsed)',
        }}>

            <div className='flex' >
                <span> 
                    <InsertDriveFileOutlinedIcon sx={{ position: 'relative' }} />
                </span>
                <h3 className='text-base'>{title}</h3>
            </div>

            <div className='flex gap-x-3 justify-center'>
                {percent !== null && <p className={`${isExpanded && 'mt-2'} text-xs`}>{percent}%</p>}
                <span className={`transition-transform duration-300 transform ${isExpanded ? 'rotate-90 mt-2' : 'rotate-[-90deg] mt-[-10px]'}`}>
                    <ArrowBackIosIcon />
                </span>
            </div>

        </div>

        {
            data && isExpanded &&
            data.map((data,index) => (
                <div key={data.id}>
                    <p className={`${isExpanded ? 'block' : 'hidden'} text-right`} >{data.order}. {data.description}</p>
                    {index !== data.length - 1 && <hr className='w-full border-[1px] border-opacity-50 mt-2' />}
                </div>
            ))

        }

    </div>
    );
};

export default DropDownSyllabiData;