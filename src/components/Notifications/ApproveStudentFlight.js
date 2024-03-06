import React from 'react';

// styles
import boxStyles from '../../styles/Boxes/DataBox.module.css'
import ButtonStyles from '../../styles/Buttons/ButtonsBox.module.css'

import PageTitle from '../reuseable/PageTitle';

const ApproveStudentFlight = () => {
    return (

        <div className='pt-14 flex flex-col justify-center items-center gap-y-2'>

            <PageTitle title={'تایید پرواز'} navigateTo={'profile'} paddingRight={'40%'} />  

            <form className={`  w-[90%] rounded-xl flex flex-col items-center py-10 gap-y-8`}>

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

                    <div  className={` ${boxStyles.containerChangeOwnership} w-[95%] flex flex-col justify-around items-center px-4 py-5 space-y-5`}>

                        <p className=' text-start text-sm w-full' >در کادر زیر هر متنی را که دوست دارید تایپ کنید تا ما آن را برایتان نگه داریم و همیشه در دسترس شما قرار دهیم؛ از این طریق می‌توانید متن آزمایشی و متن تستی خودتان. </p>

                        <button type="reset" className={`${ButtonStyles.normalButton} w-full`} >سیلابس‌ها</button>

                    </div>


                </form>

        </div>
    );
};

export default ApproveStudentFlight;