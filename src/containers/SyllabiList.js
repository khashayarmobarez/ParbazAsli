import React from 'react';
import PageTitle from '../components/reuseable/PageTitle';

const SyllabiList = () => {
    return (
        <div className='flex flex-col mt-14 items-center pb-14'>

            <div  className='w-full flex flex-col items-center gap-y-4 md:w-[70%]'>

                <PageTitle title={'سرفصل ها'} navigateTo={'/profile'} /> 

            </div>
            
        </div>
    );
};

export default SyllabiList;