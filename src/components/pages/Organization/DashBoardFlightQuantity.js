import React from 'react';

// assets
import CalenderIcon from '../../../components/icons/CalenderIcon'

const DashBoardFlightQuantity = () => {
    return (
        <div className='flex justify-center w-[90%] min-h-20 rounded-2xl px-5 py-7 my-4 gap-x-6' style={{backgroundColor:'var(--organs-coachData-bg)', boxShadow:'var(--organs-coachData-boxShadow)'}}>
                        
                    <div className=' flex flex-col w-[90%] items-center space-y-6'>

                        <div className='w-[90%] flex justify-start text-xl' style={{color:'var(--text-accent) '}}>
                            <p>تعداد پروازهای انجام شده</p>
                        </div>

                        <div className='w-full flex flex-col space-y-4'>

                            <div className=' h-16 w-full rounded-xl flex justify-between' style={{backgroundColor:'var(--Basic-dataBox-bg)', border:' 1px solid var(--text-disabled)'}}>
                                <div className='flex w-[65%] md:w-[40%] justify-between items-center' >
                                    <div className=' right-0 h-full w-3 rounded-r-xl' style={{backgroundImage:'var(--boxes-yellow-side)', boxShadow:'var(--boxes-yellow-side-boxshadow) '}}></div>
                                    <p style={{color:'var(--text-accent) '}}>روزانه</p>
                                    <div className='flex items-center justify-center gap-x-3'>
                                        <CalenderIcon />
                                        <p className='mt-1'>15 آدر 1402</p>
                                    </div>
                                </div>

                                <div className='w-[15%] md:w-[10%] flex justify-center items-center text-base' style={{color:'var(--text-accent) '}}>
                                    <p>9</p>
                                </div>
                            </div>

                            <div className=' h-16 w-full rounded-xl flex justify-between' style={{backgroundColor:'var(--Basic-dataBox-bg)', border:' 1px solid var(--text-disabled)'}}>
                                <div className='flex w-[65%] md:w-[40%] justify-between items-center' >
                                    <div className=' right-0 h-full w-3 rounded-r-xl' style={{backgroundImage:'var(--boxes-yellow-side)', boxShadow:'var(--boxes-yellow-side-boxshadow) '}}></div>
                                    <p style={{color:'var(--text-accent) '}}>هفتگی</p>
                                    <div className='flex items-center justify-center gap-x-3'>
                                        <img  src={calender} alt='icon' />
                                        <p className='mt-1'>15 آذر 1402</p>
                                    </div>
                                </div>

                                <div className='w-[15%] md:w-[10%] flex justify-center items-center text-base' style={{color:'var(--text-accent) '}}>
                                    <p>9</p>
                                </div>
                            </div>

                            <div className=' h-16 w-full rounded-xl flex justify-between' style={{backgroundColor:'var(--Basic-dataBox-bg)', border:' 1px solid var(--text-disabled)'}}>
                                <div className='flex w-[65%] md:w-[40%] justify-between items-center' >
                                    <div className=' right-0 h-full w-3 rounded-r-xl' style={{backgroundImage:'var(--boxes-yellow-side)', boxShadow:'var(--boxes-yellow-side-boxshadow) '}}></div>
                                    <p style={{color:'var(--text-accent) '}}>ماهانه</p>
                                    <div className='flex items-center justify-center gap-x-3'>
                                        <img  src={calender} alt='icon' />
                                        <p className='mt-1'>15 آدر 1402</p>
                                    </div>
                                </div>

                                <div className='w-[15%] md:w-[10%] flex justify-center items-center text-base' style={{color:'var(--text-accent) '}}>
                                    <p>9</p>
                                </div>
                            </div>

                                <div className=' h-16 w-full rounded-xl flex justify-between' style={{backgroundColor:'var(--Basic-dataBox-bg)', border:' 1px solid var(--text-disabled)'}}>
                                    <div className='flex w-[65%] md:w-[40%] justify-between items-center' >
                                        <div className=' right-0 h-full w-3 rounded-r-xl' style={{backgroundImage:'var(--boxes-yellow-side)', boxShadow:'var(--boxes-yellow-side-boxshadow) '}}></div>
                                        <p style={{color:'var(--text-accent) '}}>سالانه</p>
                                        <div className='flex items-center justify-center gap-x-3'>
                                            <img  src={calender} alt='icon' />
                                            <p className='mt-1'>15 آدر 1402</p>
                                        </div>
                                    </div>

                                    <div className='w-[15%] md:w-[10%] flex justify-center items-center text-base' style={{color:'var(--text-accent) '}}>
                                        <p>9</p>
                                    </div>
                                </div>

                        </div>

                    </div>

                </div>
    );
};

export default DashBoardFlightQuantity;