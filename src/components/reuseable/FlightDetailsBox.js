import React, { useState } from 'react';

// styles
import gradients from '../../styles/Gradient.module.css'
import boxStyles from '../../styles/DataBox.module.css'

// mui
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';

// assets
import ClipboardIcon from '../../components/icons/ClipboardIcon'

// redux
import { useSelector } from 'react-redux';
import { selectUser } from '../../Utilities/ReduxToolKit/features/userData/userSlice';


const FlightDetailsBox = (props) => {

    // imported directly here from redux to prevent props drilling
    const {userRole} = useSelector(selectUser)

    const [isExpanded, setIsExpanded] = useState(false)

    const {title} = props

    const handleClick = () => {
        setIsExpanded(!isExpanded);
    }


    return (
        <div className='flex flex-col space-y-4'>

                {/* group name of data */}
                <div className='flex justify-between items-center'>
                    <h2 >{title}</h2>
                    <div id='line' className='w-[75%] h-[1px] rounded-xl bg-[#D9D9D9]'></div>
                </div>

                {/* the below part should be mapped when data is recieved from server */}
                {/* classesInput */}
                <div className={`${gradients.container} flex w-full justify-between items-center h-12 pr-3 rounded-2xl`}>
                    <span>
                        <AutoStoriesOutlinedIcon />
                    </span>
                    <p>مقدماتی</p>
                    <p>ساعت</p>
                    <button onClick={handleClick} className={`${gradients.clipboardButtonBackgroundGradient} w-14 h-full flex items-center justify-center rounded-l-xl`}>
                        <ClipboardIcon/>
                    </button>
                </div>

                {isExpanded &&
                    <form className={` ${boxStyles.classDetails} w-full rounded-xl flex flex-col pt-10 pb-2 gap-y-4`}>

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
                }

                
                


        </div>
    );
};

export default FlightDetailsBox;