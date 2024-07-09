import React, { useState } from 'react';

// styles
import dataStyles from '../../../../styles/Boxes/DataBox.module.css'

// mui
import CheckIcon from '@mui/icons-material/Check';

import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const DropDownSyllabiData = (props) => {

    // const { id } = usePa

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
            data.map((data, index) => (
                <div className={`${isExpanded ? 'block' : 'hidden'} flex justify-between items-center px-4 py-2 rounded-2xl`}
                key={data.id}
                style={{background:'var(--syllabus-data-boxes-bg)'}}>
                    <p className={` text-center self-center`} >{index + 1}</p>
                    <p className={` text-center self-center text-sm`} >{data.description}</p>
                    {
                        data.percent === 100 ?
                        <CheckIcon sx={{color:'var(--yellow-text)', width:'1.2rem', height:'1.2rem'}} />
                        :
                        <p className={` text-center self-center text-sm`} >{data.percent}%</p>

                    }
                </div>
            ))

        }

    </div>
    );
};

export default DropDownSyllabiData;