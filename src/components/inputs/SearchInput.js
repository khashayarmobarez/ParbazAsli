import React from 'react';

import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

import inputStyles from '../../styles/Inputs/Inputs.module.css'

const SearchInput = () => {
    return (
        <>
            <div>
                <div className={`${inputStyles.searchContainer} relative flex justify-center items-center`}>
                    <div className=" absolute right-1">
                        <SearchOutlinedIcon sx={{ color: 'white'}} />
                    </div>

                    <input  type="text" className={`${inputStyles.searchInput} w-full py-3 px-8 rounded-xl`} placeholder="جست‌وجو کنید" id=""/>
                    
                    <input className={`${inputStyles.searchedBaseOnButton} absolute left-0 h-full w-[94px] rounded-l-lg text-sm`} type="button" value="بر اساس"/>

                </div>
            </div>
        </>
    );
};

export default SearchInput;