import React from 'react';

import SearchInput from '../../inputs/SearchInput'

const DashboardPilotsQuantiy = () => {
    return (
        <div className='flex justify-center w-[90%] min-h-20 rounded-2xl px-5 py-7 my-4 gap-x-6' style={{backgroundColor:'var(--organs-coachData-bg)', boxShadow:'var(--organs-coachData-boxShadow)'}}>
            
            <div className=' flex flex-col w-[90%] items-center space-y-6'>

                        <SearchInput />

                        <div className='w-full flex justify-start text-xl' style={{color:'var(--yellow-text) '}}>
                            <p>تعداد خلبان‌ها</p>
                        </div>

            </div>

        </div>
    );
};

export default DashboardPilotsQuantiy;