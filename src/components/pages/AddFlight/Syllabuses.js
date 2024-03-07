import React from 'react';

// components
import PageTitle from '../../reuseable/PageTitle';
import DisableCheckbox from '../../inputs/DisableCheckbox';

const Syllabuses = () => {
    return (
        <div className=' py-14 flex flex-col justify-center items-center gap-y-6'>

            <PageTitle title={'سیلابس‌ها'} navigateTo={'addFlight/AddLanding'} paddingRight={'33%'} /> 
            
            {/* mapping syllabuses after getting data from backend */}
            <div className='w-[90%] flex flex-col gap-y-4'>

                <div className={`flex h-11 items-center justify-between px-4 rounded-2xl text-[10px] w-full`}
                style={{backgroundColor: 'var(--syllabus-data-boxes-bg)'}} >
                    
                    <div className='flex w-3/5 justify-between'>
                        <p>1</p>
                        <p>عنوان سیلابس لورم ایپسوم متن ساختگی</p>
                    </div>

                    <div className='h-full flex gap-x-1 items-center'>
                        <DisableCheckbox initialValue={false} />
                        <DisableCheckbox initialValue={false} />
                        <DisableCheckbox initialValue={false} />
                    </div>

                </div>

                <div className={`flex h-11 items-center justify-between px-4 rounded-2xl text-[10px] w-full`}
                style={{backgroundColor: 'var(--syllabus-data-boxes-bg)'}} >
                    
                    <div className='flex w-3/5 justify-between'>
                        <p>1</p>
                        <p>عنوان سیلابس لورم ایپسوم متن ساختگی</p>
                    </div>

                    <div className='h-full flex gap-x-1 items-center'>
                        <DisableCheckbox initialValue={false} />
                        <DisableCheckbox initialValue={false} />
                        <DisableCheckbox initialValue={false} />
                    </div>

                </div>

            </div>


        </div>
    );
};

export default Syllabuses;