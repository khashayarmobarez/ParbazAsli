import React from 'react';

// components
import PageTitle from '../../reuseable/PageTitle';
import SearchInput from '../../inputs/SearchInput';
import ClassesBox from '../../reuseable/ClassesBox';

// styles
import boxStyles from '../../../styles/Boxes/DataBox.module.css'
import ButtonStyles from '../../../styles/Buttons/ButtonsBox.module.css'




const StudentDetails = () => {
    return (
        <div className='  mt-14 w-full flex flex-col items-center gap-y-7 pb-40'>

            <PageTitle title={'سوابق  رضا نظری'} navigateTo={'education'} paddingRight={'33%'} />

            <div className='w-[90%] flex flex-col gap-y-7'>
                
                <SearchInput />

                <ClassesBox title={'مقطع مبتدی'} />
                
                <form className={` ${boxStyles.classDetails} w-full rounded-xl flex flex-col py-10 gap-y-8`}>

                    <div className=' grid grid-cols-2 gap-x-4 gap-y-7 w-full px-4'>

                        <div className='flex flex-col items-start gap-y-3'>
                            <p className=' text-xs pr-2'>مقطع</p>
                            <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                <p>لورم ایپسوم</p>
                            </div>
                        </div>

                        <div className='flex flex-col items-start gap-y-3'>
                            <p className=' text-xs pr-2'>برند</p>
                            <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                <p>لورم ایپسوم</p>
                            </div>
                        </div>

                        <div className='flex flex-col items-start gap-y-3'>
                            <p className=' text-xs pr-2'>مدل/ کلاس</p>
                            <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                <p>لورم ایپسوم</p>
                            </div>
                        </div>

                        <div className='flex flex-col items-start gap-y-3'>
                            <p className=' text-xs pr-2'>سرعت باد Takeoff</p>
                            <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                <p>لورم ایپسوم</p>
                            </div>
                        </div>

                        <div className='flex flex-col items-start gap-y-3'>
                            <p className=' text-xs pr-2'>جهت باد Takeoff</p>
                            <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                <p>لورم ایپسوم</p>
                            </div>
                        </div>

                        <div className='flex flex-col items-start gap-y-3'>
                            <p className=' text-xs pr-2'>شیوه Takeoff</p>
                            <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                <p>لورم ایپسوم</p>
                            </div>
                        </div>

                        <div className='flex flex-col items-start gap-y-3'>
                            <p className=' text-xs pr-2'>ساعت Takeoff</p>
                            <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                <p>لورم ایپسوم</p>
                            </div>
                        </div>

                        <div className='flex flex-col items-start gap-y-3'>
                            <p className=' text-xs pr-2'>سرعت باد Landing</p>
                            <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                <p>لورم ایپسوم</p>
                            </div>
                        </div>

                        <div className='flex flex-col items-start gap-y-3'>
                            <p className=' text-xs pr-2'>جهت باد Landing</p>
                            <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                <p>لورم ایپسوم</p>
                            </div>
                        </div>

                        <div className='flex flex-col items-start gap-y-3'>
                            <p className=' text-xs pr-2'>ساعت Landing</p>
                            <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                <p>لورم ایپسوم</p>
                            </div>
                        </div>

                        <div className='flex flex-col items-start gap-y-3'>
                            <p className=' text-xs pr-2'>نوع پوشش ابری</p>
                            <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                <p>لورم ایپسوم</p>
                            </div>
                        </div>

                        <div className='flex flex-col items-start gap-y-3'>
                            <p className=' text-xs pr-2'>مدت زمان پرواز</p>
                            <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                <p>لورم ایپسوم</p>
                            </div>
                        </div>

                        <div className='flex flex-col items-start gap-y-3'>
                            <p className=' text-xs pr-2'>نام مربی</p>
                            <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                <p>لورم ایپسوم</p>
                            </div>
                        </div>

                        <div className='flex flex-col items-start gap-y-3'>
                            <p className=' text-xs pr-2'>نام باشگاه</p>
                            <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                <p>لورم ایپسوم</p>
                            </div>
                        </div>

                    </div>

                    <div className='w-full flex flex-col items-start gap-y-4 p-4'>
                        <h1>توضیحات و مانورها</h1>
                        <p className=' border border-[#EBEEF3] text-sm px-3 py-5 rounded-3xl text-start'>لورم ایپسوم در کادر زیر هر متنی را که دوست دارید تایپ کنید تا ما آن را برایتان نگه داریم و همیشه در  را تایپ کرده و در طرح‌هایتان از این متن استفاده کنید... تایپ کنید، به صورت خودکار ذخیره می‌شود.</p>
                    </div>


                </form>

                <div className='w-full'>
                    <button className={ButtonStyles.normalButton}>مشاهده IGC</button>
                </div>
                

            </div>


        </div>
        );
    };
    
    export default StudentDetails;