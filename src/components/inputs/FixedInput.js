import React from 'react';

// styles
import inputStyles from '../../styles/Inputs/Inputs.module.css'

// mui
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';

const FixedInput = ({test}) => {
    return (
        <div className='w-full'>
            <div className='flex relative w-[100%] h-12 px-2'>
                <span style={{color:'var(--disabled-button-text)'}}> 
                    <PersonOutlineOutlinedIcon sx={{ position: 'absolute', margin: '10px 5px 0 0' }} />
                </span>
                <input type="text" id="aircraft" disabled placeholder={test} className={`${inputStyles.fixedInput} w-[100%] text-sm font-medium`}  />
            </div>
        </div>
    );
};

export default FixedInput;