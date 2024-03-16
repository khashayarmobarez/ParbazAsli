import React from 'react';

// components
import PageTitle from '../components/reuseable/PageTitle';

const Notifications = () => {
    return (
        <div className='w-full flex flex-col items-center'>

            <div className='flex flex-col py-14 justify-center items-center w-full gap-y-8 md:w-[80%]'>

                <PageTitle title={'اعلانات'} paddingRight={'40%'} />
                
            </div>
            
        </div>
    );
};

export default Notifications;