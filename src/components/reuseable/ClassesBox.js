import React, { useState } from 'react';

// styles
import gradients from '../../styles/gradients/Gradient.module.css'
import boxStyles from '../../styles/Boxes/DataBox.module.css'

// mui
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';

// assets
import clipboard from '../../assets/icons/clipboard.svg'

// redux
import { useSelector } from 'react-redux';
import { selectUser } from '../../Utilities/ReduxToolKit/features/userData/userSlice';


const ClassesBox = (props) => {

    // imported directly here from redux to prevent props drilling
    const {userRole} = useSelector(selectUser)

    const [isExpanded, setIsExpanded] = useState(false)
    const [extraData, setExtraData] = useState(false)

    const {title} = props

    const handleClick = () => {
        setIsExpanded(!isExpanded);
    }

    const handleClickExtraData = () =>{
        setExtraData(!extraData);
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
                        <img src={clipboard} alt='icon' />
                    </button>
                </div>

                {isExpanded &&
                    <form className={` ${boxStyles.classDetails} w-full rounded-xl flex flex-col pt-10 pb-8`}>

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
    
    
                    <div className='flex flex-col items-start gap-y-2 mx-4 mt-7'>
                            <p className=' text-sm'>مباحث مطرح شده</p>
                            <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                <p>لورم ایپسوم</p>
                            </div>
                    </div>
    

                    {
                        userRole === 'coach' && !extraData &&
                        <div className='w-full flex justify-center px-4 mt-12'>
                            <button onClick={handleClickExtraData} className='underline underline-offset-4 text-xs' style={{color:'var(--yellow-text'}} >اطلاعات بیشتر...</button>
                        </div>
                    }
    
                    {   userRole === 'coach' && extraData &&
                        <div id='no grid list' className='flex flex-col gap-y-5 mt-6'>
    
    
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
    
                    </div>}

                    {
                        userRole === 'coach' && extraData &&
                        <div className='w-full flex justify-center px-4 mt-12'>
                            <button onClick={handleClickExtraData} className='underline underline-offset-4 text-xs' style={{color:'var(--yellow-text'}} >بستن اطلاعات بیشتر</button>
                        </div>
                    }
    
    
                </form>
                }

                
                


        </div>
    );
};

export default ClassesBox;