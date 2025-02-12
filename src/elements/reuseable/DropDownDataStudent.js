import React, { useState } from 'react';

// styles
import dataStyles from '../../styles/DataBox.module.css'

// mui
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const DropDownDataStudent = (props) => {

    const{title, dataText, id} = props

    const [isExpanded, setIsExpanded] = useState(false);

    const [isCourseFinished, setIsCourseFinished] = useState(true)

    const toggleExpanded = () => {
        setIsExpanded(!isExpanded);
    };

    return (
    <div className='flex flex-col gap-y-10'>

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

            <span className={`transition-transform duration-300 transform ${isExpanded ? 'rotate-90 mt-2' : 'rotate-[-90deg] mt-[-10px]'}`}>
                <ArrowBackIosIcon />
            </span>

        </div>


        {/* classes info section */}
        <div className='flex flex-col gap-y-5'>
            
            <div
            className={`${isExpanded ? 'flex' : 'hidden'} justify-between h-12 items-center px-4 rounded-2xl text-xs`}
            style={{backgroundColor: 'var(--syllabus-data-boxes-bg)'}} >
                
                <div className='flex w-3/4 justify-between'>
                    <p>{id}</p>
                    <p>عنوان سیلابس لورم ایپسوم متن ساختگی</p>
                </div>
                {isCourseFinished ?
                <span>
                    <CheckOutlinedIcon sx={{color: 'yellow', width:'1.2rem'}} />
                </span> :
                <p style={{ color: 'var(--yellow-border-button)'}} >58%</p>
                }
            </div>

            <div
            className={`${isExpanded ? 'flex' : 'hidden'} justify-between h-12 items-center px-4 rounded-2xl text-xs`}
            style={{backgroundColor: 'var(--syllabus-data-boxes-bg)'}} >
                
                <div className='flex w-3/4 justify-between'>
                    <p>{id}</p>
                    <p>عنوان سیلابس لورم ایپسوم متن ساختگی</p>
                </div>
                {isCourseFinished ?
                <span>
                    <CheckOutlinedIcon sx={{color: 'yellow', width:'1.2rem'}} />
                </span> :
                <p style={{ color: 'var(--yellow-border-button)'}} >58%</p>
                }
            </div>

        </div>

    </div>
    );
};

export default DropDownDataStudent;