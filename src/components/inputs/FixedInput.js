import React from 'react';
import Cookies from 'js-cookie';

// styles
import inputStyles from '../../styles/Inputs.module.css'

// mui
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';

const FixedInput = ({ textData, userIcon }) => {

    // language and direction
    const dir = Cookies.get('dir') || 'ltr';

    return (
        <div className='w-full'>
            <div className='flex relative w-[100%] h-12 '>
                {
                userIcon ?
                    <span  style={{ color: 'var(--text-input-default)' }} className=' absolute mt-4 mr-2 w-5'>
                        {userIcon}
                    </span>
                :
                    <span style={{ color: 'var(--text-input-default)' }}>
                        <PersonOutlineOutlinedIcon sx={{ position: 'absolute', margin: '10px 5px 0 5px' }} />
                    </span>
                }
                <input 
                    type="text" 
                    id={textData} 
                    disabled 
                    placeholder={textData} 
                    className={`${inputStyles.fixedInput} w-[100%] text-sm `}  
                />
            </div>
        </div>
    );
};

export default FixedInput;
