import React from 'react';

// components
import PageTitle from '../../reuseable/PageTitle';

const FlightsAdvancedFilter = () => {
    return (
        <div className='w-full flex flex-col justify-center items-center'>

            <div className='w-full md:w-[75%] py-14 flex flex-col justify-center items-center'>

            <PageTitle title={'سوابق پرواز'} navigateTo={-1} />

            </div>
            
        </div>
    );
};

export default FlightsAdvancedFilter;