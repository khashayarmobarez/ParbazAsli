import React from 'react';

// components
import PageTitle from '../components/reuseable/PageTitle';

const AboutUs = () => {
    return (
        <div className='w-full h-[56vh] pt-14 flex justify-center items-center' >
            <div className='w-full h-full flex justify-center'>
                {

                    <PageTitle title={`درباره دیجی لاگ بوک`} />
                }
            </div>
        </div>
    );
};

export default AboutUs;