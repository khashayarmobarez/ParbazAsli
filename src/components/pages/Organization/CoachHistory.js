import React, { useEffect, useRef, useState } from 'react';

// styles
import ButtonStyles from '../../../styles/Buttons/ButtonsBox.module.css'

// mui
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';

// queries
import { useUserDetails } from '../../../Utilities/Services/queries';

// components
import PageTitle from '../../reuseable/PageTitle';
import SearchInput from '../../inputs/SearchInput';
import DropDownLineFlightHistory from '../../reuseable/DropDownLineFlightHistory'
import WorldMapFlightHistory from '../../pages/FlightHistory/WorldMapFlightHistory';


const CoachHistory = () => {

    // react query
    const { data, isLoading, error } = useUserDetails();

    // to set which button is active and style it
    const [activeLink, setActiveLink] = useState('entertaiment'); // State to track active link

    // Ref to the button element
    const buttonRef = useRef(null);

    // Effect to click the button when the page is mounted
  useEffect(() => {
    // Check if the button ref exists and it has a current property
    if (buttonRef.current) {
      // Programmatically click the button
      buttonRef.current.click();
    }
  }, []);

    return (
        <div className=' pt-16 flex justify-center'>
            <div className='w-full flex flex-col items-center md:w-[75%] gap-y-2'>

                <PageTitle title={'سوابق پروازی رضا نظری'} navigateTo={'/organizationPilots'} paddingRight={'28%'} /> 

                {/* coach data */}
                <div className='flex justify-center w-[90%] min-h-20 rounded-2xl px-5 py-7 my-4 gap-x-6' style={{backgroundColor:'var(--organs-coachData-bg)', boxShadow:'var(--organs-coachData-boxShadow)'}}>
                    
                    <div className=' flex flex-col w-[90%] items-center space-y-6'>

                        <div className='w-[90%] flex justify-start text-xl' style={{color:'var(--yellow-text) '}}>
                            <p>تعداد شاگردان</p>
                        </div>

                        <div className='w-full flex flex-col space-y-4'>

                            <div className=' h-16 w-full rounded-xl flex justify-between pl-[5%]' style={{backgroundColor:'var(--Basic-dataBox-bg)', border:' 1px solid var(--low-opacity-white)'}}>
                                <div className=' right-0 h-full w-3 rounded-r-xl' style={{backgroundImage:'var(--boxes-yellow-side)', boxShadow:'var(--boxes-yellow-side-boxshadow) '}}></div>
                                <div className='w-[85%] flex justify-between items-center text-base' style={{color:'var(--yellow-text) '}}>
                                    <p>مبتدی</p>
                                    <p>9</p>
                                </div>
                            </div>

                            <div className=' h-16 w-full rounded-xl flex justify-between pl-[5%]' style={{backgroundColor:'var(--Basic-dataBox-bg)', border:' 1px solid var(--low-opacity-white)'}}>
                                <div className=' right-0 h-full w-3 rounded-r-xl' style={{backgroundImage:'var(--boxes-yellow-side)', boxShadow:'var(--boxes-yellow-side-boxshadow) '}}></div>
                                <div className='w-[85%] flex justify-between items-center text-base' style={{color:'var(--yellow-text) '}}>
                                    <p>مقدماتی</p>
                                    <p>9</p>
                                </div>
                            </div>

                            <div className=' h-16 w-full rounded-xl flex justify-between pl-[5%]' style={{backgroundColor:'var(--Basic-dataBox-bg)', border:' 1px solid var(--low-opacity-white)'}}>
                                <div className=' right-0 h-full w-3 rounded-r-xl' style={{backgroundImage:'var(--boxes-yellow-side)', boxShadow:'var(--boxes-yellow-side-boxshadow) '}}></div>
                                <div className='w-[85%] flex justify-between items-center text-base' style={{color:'var(--yellow-text) '}}>
                                    <p>متوسطه</p>
                                    <p>9</p>
                                </div>
                            </div>

                            <div className=' h-16 w-full rounded-xl flex justify-between pl-[5%]' style={{backgroundColor:'var(--Basic-dataBox-bg)', border:' 1px solid var(--low-opacity-white)'}}>
                                <div className=' right-0 h-full w-3 rounded-r-xl' style={{backgroundImage:'var(--boxes-yellow-side)', boxShadow:'var(--boxes-yellow-side-boxshadow) '}}></div>
                                <div className='w-[85%] flex justify-between items-center text-base' style={{color:'var(--yellow-text) '}}>
                                    <p>پیشرفته</p>
                                    <p>9</p>
                                </div>
                            </div>

                        </div>
                    </div>

                    {window.innerWidth > 768 && 
                        <div className=' flex flex-col w-[90%] items-center space-y-6'>

                        <div className='w-[90%] flex justify-start text-xl' style={{color:'var(--yellow-text) '}}>
                            <p>تعداد پروازها</p>
                        </div>

                        <div className='w-full flex flex-col space-y-4'>

                            <div className=' h-16 w-full rounded-xl flex justify-between pl-[5%]' style={{backgroundColor:'var(--Basic-dataBox-bg)', border:' 1px solid var(--low-opacity-white)'}}>
                                <div className=' right-0 h-full w-3 rounded-r-xl' style={{backgroundImage:'var(--boxes-yellow-side)', boxShadow:'var(--boxes-yellow-side-boxshadow) '}}></div>
                                <div className='w-[85%] flex justify-between items-center text-base' style={{color:'var(--yellow-text) '}}>
                                    <p>مبتدی</p>
                                    <p>9</p>
                                </div>
                            </div>

                            <div className=' h-16 w-full rounded-xl flex justify-between pl-[5%]' style={{backgroundColor:'var(--Basic-dataBox-bg)', border:' 1px solid var(--low-opacity-white)'}}>
                                <div className=' right-0 h-full w-3 rounded-r-xl' style={{backgroundImage:'var(--boxes-yellow-side)', boxShadow:'var(--boxes-yellow-side-boxshadow) '}}></div>
                                <div className='w-[85%] flex justify-between items-center text-base' style={{color:'var(--yellow-text) '}}>
                                    <p>مقدماتی</p>
                                    <p>9</p>
                                </div>
                            </div>

                            <div className=' h-16 w-full rounded-xl flex justify-between pl-[5%]' style={{backgroundColor:'var(--Basic-dataBox-bg)', border:' 1px solid var(--low-opacity-white)'}}>
                                <div className=' right-0 h-full w-3 rounded-r-xl' style={{backgroundImage:'var(--boxes-yellow-side)', boxShadow:'var(--boxes-yellow-side-boxshadow) '}}></div>
                                <div className='w-[85%] flex justify-between items-center text-base' style={{color:'var(--yellow-text) '}}>
                                    <p>متوسطه</p>
                                    <p>9</p>
                                </div>
                            </div>

                            <div className=' h-16 w-full rounded-xl flex justify-between pl-[5%]' style={{backgroundColor:'var(--Basic-dataBox-bg)', border:' 1px solid var(--low-opacity-white)'}}>
                                <div className=' right-0 h-full w-3 rounded-r-xl' style={{backgroundImage:'var(--boxes-yellow-side)', boxShadow:'var(--boxes-yellow-side-boxshadow) '}}></div>
                                <div className='w-[85%] flex justify-between items-center text-base' style={{color:'var(--yellow-text) '}}>
                                    <p>پیشرفته</p>
                                    <p>9</p>
                                </div>
                            </div>

                        </div>
                    </div>
                    }

                </div>

                {window.innerWidth < 768 &&
                <div className='flex flex-col items-center justify-between w-[90%] min-h-20 rounded-2xl px-5 py-7 my-4 space-y-7' style={{backgroundColor:'var(--organs-coachData-bg)', boxShadow:'var(--organs-coachData-boxShadow)'}}>
                    <div className='w-[90%] flex justify-start text-xl' style={{color:'var(--yellow-text) '}}>
                        <p>تعداد پروازها</p>
                    </div>

                    <div className='w-full flex flex-col items-center space-y-4'>

                        <div className=' h-16 w-[90%] rounded-xl flex justify-between pl-[5%]' style={{backgroundColor:'var(--Basic-dataBox-bg)', border:' 1px solid var(--low-opacity-white)'}}>
                            <div className=' right-0 h-full w-3 rounded-r-xl' style={{backgroundImage:'var(--boxes-yellow-side)', boxShadow:'var(--boxes-yellow-side-boxshadow) '}}></div>
                            <div className='w-[85%] flex justify-between items-center text-base' style={{color:'var(--yellow-text) '}}>
                                <p>مبتدی</p>
                                <p>9</p>
                            </div>
                        </div>

                        <div className=' h-16 w-[90%] rounded-xl flex justify-between pl-[5%]' style={{backgroundColor:'var(--Basic-dataBox-bg)', border:' 1px solid var(--low-opacity-white)'}}>
                            <div className=' right-0 h-full w-3 rounded-r-xl' style={{backgroundImage:'var(--boxes-yellow-side)', boxShadow:'var(--boxes-yellow-side-boxshadow) '}}></div>
                            <div className='w-[85%] flex justify-between items-center text-base' style={{color:'var(--yellow-text) '}}>
                                <p>مقدماتی</p>
                                <p>9</p>
                            </div>
                        </div>

                        <div className=' h-16 w-[90%] rounded-xl flex justify-between pl-[5%]' style={{backgroundColor:'var(--Basic-dataBox-bg)', border:' 1px solid var(--low-opacity-white)'}}>
                            <div className=' right-0 h-full w-3 rounded-r-xl' style={{backgroundImage:'var(--boxes-yellow-side)', boxShadow:'var(--boxes-yellow-side-boxshadow) '}}></div>
                            <div className='w-[85%] flex justify-between items-center text-base' style={{color:'var(--yellow-text) '}}>
                                <p>متوسطه</p>
                                <p>9</p>
                            </div>
                        </div>

                        <div className=' h-16 w-[90%] rounded-xl flex justify-between pl-[5%]' style={{backgroundColor:'var(--Basic-dataBox-bg)', border:' 1px solid var(--low-opacity-white)'}}>
                            <div className=' right-0 h-full w-3 rounded-r-xl' style={{backgroundImage:'var(--boxes-yellow-side)', boxShadow:'var(--boxes-yellow-side-boxshadow) '}}></div>
                            <div className='w-[85%] flex justify-between items-center text-base' style={{color:'var(--yellow-text) '}}>
                                <p>پیشرفته</p>
                                <p>9</p>
                            </div>
                        </div>

                    </div>

                </div>
                }
                

                <div className={`${ButtonStyles.ThreeStickedButtonCont}`}>
                    <button  className={`${ButtonStyles.ThreeStickedButtonButton} rounded-r-xl ${activeLink === 'entertaiment' ? ButtonStyles.activeYellow : ''}`} onClick={() => setActiveLink('entertaiment')}>پرواز تفریحی</button> 
                    <button ref={buttonRef}  className={`${ButtonStyles.ThreeStickedButtonButton} rounded-l-xl  ${activeLink === 'freeFlight' ? ButtonStyles.activeYellow : ''}`} onClick={() => setActiveLink('freeFlight')} >پرواز آزاد</button>
                </div>

                <div className='w-[90%] mt-6 flex flex-col gap-y-8'>

                    {
                        isLoading && <h2 className='text-white mt-32'>is loading</h2>
                    }

                    {
                        error && <h3>{error.message}</h3>
                    }
                    {
                        data && 
                        <div className='w-full flex flex-col justify-center items-center px-1 gap-y-4'>
                            
                            <div className='w-full flex flex-col gap-y-2 mb-[-2rem]'>

                                <div className='w-full flex justify-between items-center'>
                                    <div className='flex justify-center items-center' >
                                        <MailOutlinedIcon sx={{width:'2.5rem'}} />
                                        <p className='text-sm' >112 تعداد پرواز</p>
                                    </div>
                                    <div className='flex justify-center items-center' >
                                        <MailOutlinedIcon sx={{width:'2.5rem'}} />
                                        <p className='text-sm' >98 ساعت پرواز</p>
                                    </div>
                                </div>

                                <WorldMapFlightHistory  />

                            </div>


                            <div className='w-full flex flex-col gap-y-6'>
                                
                                <SearchInput />

                                <DropDownLineFlightHistory title={'مقطع آزاد'} />

                                
                            </div>

                        </div>
                    }
                </div>

            </div>
        </div>
    );
};

export default CoachHistory;