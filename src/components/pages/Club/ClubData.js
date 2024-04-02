import React from 'react';

// box
import boxStyles from '../../../styles/Boxes/DataBox.module.css'
import GradientStyles from '../../../styles/gradients/Gradient.module.css'

// assets
import clubCoaches from '../../../assets/icons/user-Icon.svg'
import clubStudents from '../../../assets/icons/users-Icon.svg'

// mui
import { Avatar } from '@mui/material';
import { Link } from 'react-router-dom';

const ClubData = () => {
    return (
        <div className='flex flex-col items-center w-[90%]'>
            {/* club data box  */}
            <div className={`${boxStyles.containerDarkmode} flex items-center min-h-5 justify-around p-6 rounded-3xl md:py-5 md:px-2`}>

                <div className='flex flex-col justify-center items-center ml-[6%] space-y-1 md:flex-row md:w-[38%] md:justify-between md:ml-0'>

                    <Avatar alt="Remy Sharp" src='/' sx={{height:'99px', width:'100px', zIndex:'0'}}/> 
                    <div className=' space-y-2 md:space-y-5' >
                        <p className=' font-normal text-xl w-36'>فلای کلاب</p>
                        <p className=' font-normal text-xs w-36' style={{color:'var(--softer-white)'}}>کد باشگاه: 2413</p>
                    </div>

                </div>

                <div className=' flex flex-col justify-center items-center space-y-8 mt-4 md:flex-row md:w-[38%] md:justify-between md:space-y-0'>

                    <div className=' space-y-3 flex flex-col items-start md:space-y-5'>

                        <div className=' flex justify-center items-start' >
                            <img src={clubCoaches} alt='icon'/>
                            <p className=' font-normal text-sm mr-2 w-36 text-start'>78 مربی فعال</p>
                        </div> 
                        <div className=' flex justify-between items-start' >
                            <img src={clubStudents} alt='icon'/>
                            <p className=' font-normal text-sm mr-2 w-36 text-start'>112 هنرجو آموزشی</p>
                        </div>

                    </div>

                    <Link to='/' className={`${GradientStyles.container2} w-[130px] h-[48px] flex items-center justify-center rounded-full text-sm ml-[-5%] `} >ویرایش پروفایل</Link>

                </div>
        

            </div>

        </div>
    );
};

export default ClubData;