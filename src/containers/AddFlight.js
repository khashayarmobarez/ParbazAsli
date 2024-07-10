import React from 'react';
import PageTitle from '../components/reuseable/PageTitle';

// style
import boxStyles from '../styles/Boxes/DataBox.module.css'
import { Outlet } from 'react-router-dom';

const AddFlight = ({userRole}) => {
    return (
        <div className='flex flex-col items-center pt-14 pb-24'>
            <div className=' w-full md:w-[75%] flex flex-col items-center gap-y-8 md:gap-y-10'>

            <PageTitle title={'ثبت پرواز'} navigateTo={'/profile'} />

            <form className={` ${boxStyles.classDetails} w-[90%] rounded-xl flex flex-col py-10 gap-y-8`}>

                    <div className=' grid grid-cols-10 gap-x-4 gap-y-7 w-full px-4 md:grid-cols-14 md:gap-y-0'>

                        <div className='flex flex-col items-start gap-y-3 col-span-3 md:col-span-1'>
                            <p className=' text-xs pr-2'>تعداد پرواز</p>
                            <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl text-sm`}  id='data' >
                                <p>12</p>
                            </div>
                        </div>

                        <div className='flex flex-col items-start gap-y-3 col-span-3 md:col-span-2'>
                            <p className=' text-xs pr-2'>تاریخ پرواز</p>
                            <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-2 w-full h-12 rounded-xl text-sm`}  id='data' >
                                <p className=' text-end'>1402/11/24</p>
                            </div>
                        </div>

                        <div className='flex flex-col items-start gap-y-3 col-span-4 md:col-span-2'>
                            <p className=' text-xs pr-2'>مقطع گواهینامه</p>
                            <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl text-sm`}  id='data' >
                                <p>خلبان آزاد</p>
                            </div>
                        </div>

                        <div className='flex flex-col items-start gap-y-3 col-span-3 md:col-span-1'>
                            <p className=' text-xs pr-2'>زمان پرواز</p>
                            <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl text-sm`}  id='data' >
                                <p>24min</p>
                            </div>
                        </div>

                    { userRole === 'coach' ?

                        <div className='flex flex-col items-start col-span-7 gap-y-3 md:col-span-4'>
                            <p className=' text-xs pr-2'>نام باشگاه</p>
                            <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl text-sm`}  id='data' >
                                <p>فلای کلاب</p>
                            </div>
                        </div>
                        :
                        <>
                            <div className='flex flex-col items-start gap-y-3 col-span-3 md:col-span-2'>
                                <p className=' text-xs pr-2'>نام باشگاه</p>
                                <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl text-xs`}  id='data' >
                                    <p>فلای کلاب</p>
                                </div>
                            </div>

                            <div className='flex flex-col items-start gap-y-3 col-span-4 md:col-span-2'>
                                <p className=' text-xs pr-2'>نام مربی</p>
                                <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl text-xs`}  id='data' >
                                    <p>محمود شیرازی‌نیا</p>
                                </div>
                            </div>
                        </>
                    }

                        
                    </div>


                </form>

                <Outlet />
          
            </div>

        </div>
    );
};

export default AddFlight;