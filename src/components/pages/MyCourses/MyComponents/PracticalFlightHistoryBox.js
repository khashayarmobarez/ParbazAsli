import React, { useState } from 'react';

// styles
import gradients from '../../../../styles/gradients/Gradient.module.css'
import boxStyles from '../../../../styles/Boxes/DataBox.module.css'
import ButtonStyles from '../../../../styles/Buttons/ButtonsBox.module.css'


// assets
import clipboard from '../../../../assets/icons/clipboard.svg'




const PracticalFlightHistoryBox = (props) => {

    // for changing the color of the texts when user clicked and expand it
    const [isClicked, setIsClicked] = useState(false);

    const [isExpanded, setIsExpanded] = useState(false)

    const {title} = props

    const handleClick = () => {
        setIsExpanded(!isExpanded);
        // for changing the text color
        setIsClicked(!isClicked);
    }

    return (
    <div className='flex flex-col gap-y-5'>

         {/* group name of data */}
        <div className='flex justify-between items-center'>
            <h2 >{title}</h2>
            <div id='line' className='w-[75%] h-[1px] rounded-xl bg-[#D9D9D9]'></div>
        </div>


        {/* the below part should be mapped when data is recieved from server */}
                {/* classesInput */}
                <div className={`${gradients.container}  text-${isClicked ? 'border-button-yellow' : ''} flex w-full justify-between items-center h-12 pr-3 rounded-2xl text-sm`}>
                    <p>16/3/96</p>
                    <p>تهران</p>
                    <p>vardavard 812m</p>
                    <button onClick={handleClick} className={`${gradients.clipboardButtonBackgroundGradient} w-14 h-full flex items-center justify-center rounded-l-xl`}>
                        <img src={clipboard} alt='icon' />
                    </button>
                </div>

                {isExpanded &&
                    <div className='w-full flex flex-col items-center justify-center gap-y-8' >

                        <div className={` ${boxStyles.classDetails} w-full rounded-xl flex flex-col py-10 gap-y-8`}>

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

                                {/* <div className='flex flex-col items-start gap-y-3'>
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
                                </div> */}

                            </div>

                            <div className='w-full flex flex-col items-start gap-y-4 p-4'>
                                <h1>توضیحات و مانورها</h1>
                                <p className=' border border-[#EBEEF3] text-sm px-3 py-5 rounded-3xl text-start'>لورم ایپسوم در کادر زیر هر متنی را که دوست دارید تایپ کنید تا ما آن را برایتان نگه داریم و همیشه در  را تایپ کرده و در طرح‌هایتان از این متن استفاده کنید... تایپ کنید، به صورت خودکار ذخیره می‌شود.</p>
                            </div>


                        </div>

                        <div className='w-full'>
                            <button className={ButtonStyles.normalButton}>مشاهده IGC</button>
                        </div>

                    </div>

                }
        

    </div>
    );
};

export default PracticalFlightHistoryBox;