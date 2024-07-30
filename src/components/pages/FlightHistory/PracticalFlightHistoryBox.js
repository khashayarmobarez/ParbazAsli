import React, { useState } from 'react';

// styles
import gradients from '../../../styles/gradients/Gradient.module.css'
import boxStyles from '../../../styles/Boxes/DataBox.module.css'
import ButtonStyles from '../../../styles/Buttons/ButtonsBox.module.css'


// assets
import clipboard from '../../../assets/icons/clipboard.svg'

// queries
import { useAUserFlight } from '../../../Utilities/Services/flightHistoriesQueries';


const PracticalFlightHistoryBox = (props) => {

    const { flightBaseData } = props;

    const [isClicked, setIsClicked] = useState(false);

    const [isExpanded, setIsExpanded] = useState(false);
    
    const { data: fullFlightData, isLoading: fullFlightDataLoading } = useAUserFlight(flightBaseData.id);

    // for changing the color of the texts when user clicked and expand it


    const handleClick = () => {
        setIsExpanded(!isExpanded);
        // for changing the text color
        setIsClicked(!isClicked);
    }
    return (
    <div className='flex flex-col gap-y-4'>

        {/* the below part should be mapped when data is recieved from server */}
                {/* classesInput */}
                {
                    flightBaseData &&
                    <div onClick={handleClick} className={`${gradients.container} flex w-full justify-between items-center h-12 pr-3 rounded-2xl text-sm`} 
                    style={{ color: isExpanded && fullFlightData ? 'var(--yellow-text)' : '' }}>
                        <p>{flightBaseData.takeOffDateAndFlightDuration && flightBaseData.takeOffDateAndFlightDuration}</p>
                        <p>{flightBaseData.city && flightBaseData.city}</p>
                        <p>{flightBaseData.site && flightBaseData.site}</p>
                        <button className={`${gradients.clipboardButtonBackgroundGradient} w-14 h-full flex items-center justify-center rounded-l-xl`}>
                            <img src={clipboard} alt='icon' />
                        </button>
                    </div>
                }

                {isExpanded && fullFlightData &&
                    <div className='w-full flex flex-col items-center justify-center gap-y-2' >

                        <div className={` ${boxStyles.classDetails} w-full rounded-xl flex flex-col py-10 gap-y-8`}>

                            <div className=' grid grid-cols-2 gap-x-4 gap-y-6 w-full px-4 text-sm'>

                                { 
                                    fullFlightData.data.courseName &&
                                    <div className='flex flex-col items-start gap-y-3'>
                                        <p className=' text-xs pr-2'>نام دوره</p>
                                        <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                            <p>{fullFlightData.data.courseName}</p>
                                        </div>
                                    </div>
                                }

                                {
                                    fullFlightData.data.wing &&
                                        <div className='flex flex-col items-start gap-y-3'>
                                            <p className=' text-xs pr-2'>بال</p>
                                            <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                                <p>{fullFlightData.data.wing}</p>
                                            </div>
                                        </div>
                                }

                                {
                                    fullFlightData.data.harness &&
                                        <div className='flex flex-col items-start gap-y-3'>
                                            <p className=' text-xs pr-2'>هارنس</p>
                                            <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                                <p>{fullFlightData.data.harness}</p>
                                            </div>
                                        </div>
                                }

                                {
                                    fullFlightData.data.parachute &&
                                        <div className='flex flex-col items-start gap-y-3'>
                                            <p className=' text-xs pr-2'>چتر</p>
                                            <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                                <p>{fullFlightData.data.parachute}</p>
                                            </div>
                                        </div>
                                }
                                
                                {
                                    fullFlightData.data.takeOffWindSpeedInKmh &&
                                    <div className='flex flex-col items-start gap-y-3'>
                                        <p className=' text-xs pr-2'>سرعت باد Takeoff</p>
                                        <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                            <p>{fullFlightData.data.takeOffWindSpeedInKmh}</p>
                                        </div>
                                    </div>
                                }


                                {
                                    fullFlightData.data.takeOffWindDirection &&
                                    <div className='flex flex-col items-start gap-y-3'>
                                        <p className=' text-xs pr-2'>جهت باد Takeoff</p>
                                        <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                            <p>{fullFlightData.data.takeOffWindDirection}</p>
                                        </div>
                                    </div>
                                }

                                {
                                    fullFlightData.data.takeOffType &&
                                    <div className='flex flex-col items-start gap-y-3'>
                                        <p className=' text-xs pr-2'>شیوه Takeoff</p>
                                        <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                            <p>{fullFlightData.data.takeOffType}</p>
                                        </div>
                                    </div>
                                }

                                {
                                    fullFlightData.data.takeOffDateTime &&
                                        <div className='flex flex-col items-start gap-y-3'>
                                            <p className=' text-xs pr-2'>زمان Takeoff</p>
                                            <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                                <p>{fullFlightData.data.takeOffDateTime}</p>
                                            </div>
                                        </div>
                                }

                                {
                                    fullFlightData.data.landingWindSpeedInKmh &&
                                        <div className='flex flex-col items-start gap-y-3'>
                                            <p className=' text-xs pr-2'>سرعت باد Landing</p>
                                            <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                                <p>{fullFlightData.data.landingWindSpeedInKmh}</p>
                                            </div>
                                        </div>
                                }

                                {
                                    fullFlightData.data.landingWindDirection &&
                                        <div className='flex flex-col items-start gap-y-3'>
                                            <p className=' text-xs pr-2'>جهت باد Landing</p>
                                            <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                                <p>{fullFlightData.data.landingWindDirection}</p>
                                            </div>
                                        </div>
                                }

                                {
                                    fullFlightData.data.landingDateTime &&
                                        <div className='flex flex-col items-start gap-y-3'>
                                            <p className=' text-xs pr-2'>زمان Landing</p>
                                            <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                                <p>{fullFlightData.data.landingDateTime}</p>
                                            </div>
                                        </div>
                                }

                                {
                                    fullFlightData.data.cloudCoverType &&
                                        <div className='flex flex-col items-start gap-y-3'>
                                            <p className=' text-xs pr-2'>نوع پوشش ابری</p>
                                            <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                                <p>{fullFlightData.data.cloudCoverType}</p>
                                            </div>
                                        </div>
                                }

                                {
                                    fullFlightData.data.flightDurationInMinutes &&
                                        <div className='flex flex-col items-start gap-y-3'>
                                            <p className=' text-xs pr-2'>مدت زمان پرواز</p>
                                            <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                                <p>{fullFlightData.data.flightDurationInMinutes}</p>
                                            </div>
                                        </div>
                                }

                                {
                                fullFlightData.data.coachName &&
                                    <div className='flex flex-col items-start gap-y-3'>
                                        <p className=' text-xs pr-2'>نام مربی</p>
                                        <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                            <p>{fullFlightData.data.coachName}</p>
                                        </div>
                                    </div>
                                }

                                {
                                fullFlightData.data.status &&
                                    <div className='flex flex-col items-start gap-y-3'>
                                        <p className=' text-xs pr-2'>وضعیت پرواز</p>
                                        <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                            {
                                                fullFlightData.data.status === 'Active' && 
                                                <>
                                                    <p>فعال</p>
                                                    <div className='w-3 h-3 rounded-full ' style={{backgroundColor:'var(--dark-green)'}}></div>
                                                </>
                                            }
                                            {fullFlightData.data.status === 'Pending' &&
                                                <>
                                                    <p>در انتظار تایید</p>
                                                    <div className='w-3 h-3 rounded-full' style={{backgroundColor:'var(--red-text)'}}></div>
                                                </>
                                            }
                                            {fullFlightData.data.status === 'Disable' &&
                                                <>
                                                    <p>غیرفعال</p>
                                                    <div className='w-3 h-3 rounded-full' style={{backgroundColor:'var(--red-text)'}}></div>
                                                </>
                                            }
                                        </div>
                                    </div>
                                }


                            </div>

                            {   
                                fullFlightData.data.syllabi &&
                                fullFlightData.data.syllabi.length > 0 &&
                                    <div className=' grid grid-cols-1 gap-x-4 gap-y-2 w-full px-4 text-sm'>
                                        <p className=' text-xs pr-2 text-right'>سر فصل های پرواز</p>
                                        {
                                            fullFlightData.data.syllabi.map((syllabus, index) => (
                                            <div key={index} className='flex flex-col items-start gap-y-3'>
                                                <div className= {`${boxStyles.classDetailsData} flex justify-start items-center px-4 w-full h-12 rounded-xl`}  id='data' >
                                                    <p>{syllabus.description}</p>
                                                </div>
                                            </div>
                                            ))
                                        }
                                    </div>
                            }

                            {/* 
                            <div className='w-full flex flex-col items-start gap-y-4 p-4'>
                                <h1>توضیحات و مانورها</h1>
                                <p className=' border border-[#EBEEF3] text-sm px-3 py-5 rounded-3xl text-start'>لورم ایپسوم در کادر زیر هر متنی را که دوست دارید تایپ کنید تا ما آن را برایتان نگه داریم و همیشه در  را تایپ کرده و در طرح‌هایتان از این متن استفاده کنید... تایپ کنید، به صورت خودکار ذخیره می‌شود.</p>
                            </div> */}


                        </div>

                        {fullFlightData.data.igcFile &&
                            <div className='w-full'>
                                <button onClick={() => window.open(fullFlightData.data.igcFile, '_blank')} className={`${ButtonStyles.normalButton} text-sm`}>مشاهده IGC</button>
                            </div>
                        }

                    </div>

                }
        

    </div>
    );
};

export default PracticalFlightHistoryBox;