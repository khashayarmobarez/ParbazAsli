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
                    <span  style={{ color: 'var(--text-input-default)' }} 
                    className={`absolute mt-4 w-5
                    ${dir === 'ltr' ? 'ml-2' : 'mr-2'}`}>
                        {userIcon}
                    </span>
                :
                    <span style={{ color: 'var(--text-input-default)' }}>
                        <PersonOutlineOutlinedIcon sx={{ position: 'absolute', margin: dir === 'ltr' ? '10px 0px 5px 5px' : '10px 5px 0px 5px' }} />
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
