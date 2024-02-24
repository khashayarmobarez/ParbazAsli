import React from 'react';

import boxStyles from '../../../styles/Boxes/DataBox.module.css'

import PageTitle from '../../reuseable/PageTitle'

const ClassDetails = () => {
    return (
        <div className='flex flex-col justify-center items-center mt-14 w-full gap-y-6'>
            <PageTitle title={'جزئیات کلاس'} navigateTo={'education'} paddingRight={'33%'} /> 

            <div className= {`${boxStyles.basicDataBoxColor} flex justify-center items-center w-52 h-12 rounded-xl`}>  
                <p>کلاس شماره 12</p>
            </div>

            <form className={` ${boxStyles.classDetails} w-[90%] rounded-xl flex flex-col py-10`}>

                <div className=' grid grid-cols-2 gap-x-4 gap-y-7 w-full  px-4'>

                    <div className='flex flex-col items-start gap-y-2'>
                        <p className=' text-sm'>نوع دوره</p>
                        <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                            <p>لورم ایپسوم</p>
                        </div>
                    </div>

                    <div className='flex flex-col items-start gap-y-2'>
                        <p className=' text-sm'>طول دوره</p>
                        <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                            <p>لورم ایپسوم</p>
                        </div>
                    </div>

                    <div className='flex flex-col items-start gap-y-2'>
                        <p className=' text-sm'>زمان شروع</p>
                        <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                            <p>لورم ایپسوم</p>
                        </div>
                    </div>

                    <div className='flex flex-col items-start gap-y-2'>
                        <p className=' text-sm'>زمان پایان</p>
                        <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                            <p>لورم ایپسوم</p>
                        </div>
                    </div>

                    <div className='flex flex-col items-start gap-y-2'>
                        <p className=' text-sm'>تاریخ</p>
                        <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                            <p>لورم ایپسوم</p>
                        </div>
                    </div>

                    <div className='flex flex-col items-start gap-y-2'>
                        <p className=' text-sm'>مقطع</p>
                        <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                            <p>لورم ایپسوم</p>
                        </div>
                    </div>

                </div>

                <div id='no grid list' className='flex flex-col gap-y-5 mt-6'>

                    <div className='flex flex-col items-start gap-y-2 mx-4'>
                            <p className=' text-sm'>مباحث مطرح شده</p>
                            <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                <p>لورم ایپسوم</p>
                            </div>
                    </div>

                    <div className='flex flex-col items-start gap-y-2 mx-4'>
                            <p className=' text-sm'>هنرجویان</p>
                            <div className='w-full flex flex-col gap-y-5'>    
                                <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                    <p>لورم ایپسوم</p>
                                </div>
                                <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                    <p>لورم ایپسوم</p>
                                </div>
                                <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                    <p>لورم ایپسوم</p>
                                </div>
                            </div>
                    </div>

                    <div className='flex flex-col items-start gap-y-2 mx-4'>
                            <p className=' text-sm'>هنرجویان مهمان</p>
                            <div className='w-full flex flex-col gap-y-5'>    
                                <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                    <p>لورم ایپسوم</p>
                                </div>
                                <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                    <p>لورم ایپسوم</p>
                                </div>
                                <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                    <p>لورم ایپسوم</p>
                                </div>
                            </div>
                    </div>

                </div>


            </form>
        </div>
    );
};

export default ClassDetails;