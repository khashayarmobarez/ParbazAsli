import React, { useState } from 'react';

// mui
import { Avatar } from '@mui/material';

// assets
import arrowDown from '../../../assets/icons/Right Arrow Button.svg'
import arrowUpYellow from '../../../assets/icons/yellow-Up-Arrow-Button.svg'
import students from '../../../assets/icons/users-Icon.svg'
import hour from '../../../assets/icons/flightHour.svg'
import StudentBox from '../../reuseable/StudentBox';

const ClubCoachesDetails = () => {

    
    const [expanded, setExpanded] = useState(false)

    const clickHandler = () => {
        setExpanded(!expanded)
        console.log(expanded)
    }

    return (
        <>
            { expanded ?
            <div className='flex flex-col w-full items-center rounded-2xl text-sm pt-3 pb-7 px-3 h-auto gap-y-6' 
            style={{background:'var(--coachesDetails-bg)', boxShadow:'var(--coachesDetails-BoxShadow)'}}>

                <div className='flex w-full justify-between items-center text-sm' style={{color:'var(--yellow-text) '}} >
                    <p>محمود شیرازی نیا</p>
                    <p>کد عضویت:23456</p>
                    <img onClick={clickHandler} alt='arrow-down' src={arrowUpYellow} className='w-10' />
                </div>

                <div className='w-full flex justify-between items-center px-3'>
                    <Avatar alt="Remy Sharp" sx={{height:'100px', width:'100px', zIndex:'0'}} />
                    <div className='h-[55%] flex flex-col justify-between pr-10'>
                        <div className=' flex justify-center items-start' >
                                <img src={students} alt='icon' className='w-5'/>
                                <p className=' font-normal text-sm mr-2 w-36 text-start'>112 تعداد هنرجویان</p>
                        </div>
                        <div className=' flex justify-center items-start' >
                                <img src={hour} alt='icon' className='w-5'/>
                                <p className=' font-normal text-sm mr-2 w-36 text-start'>98 ساعت مربیگری</p>
                        </div>
                    </div>
                </div>

                <div className='w-full flex flex-col gap-y-4'>
                    <StudentBox title={'بگینر'} />
                    <StudentBox title={'نوایس'} />
                </div>

            </div>

            :

            <div className='flex w-full justify-between items-center rounded-2xl text-sm h-16 px-2' 
            style={{background:'var(--coachesDetails-bg)', boxShadow:'var(--coachesDetails-BoxShadow)'}} >
                <Avatar alt="Remy Sharp" sx={{height:'40px', width:'40px', zIndex:'0'}} />
                <p>محمود شیرازی نیا</p>
                <p>کد عضویت:23456</p>
                <img onClick={clickHandler} alt='arrow-down' src={arrowDown} className='w-9 rotate-90 mb-2' />
            </div>

            }
        </>
    );
};

export default ClubCoachesDetails;
