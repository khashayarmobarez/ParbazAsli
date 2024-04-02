import React from 'react';
import { useNavigate } from 'react-router';

// styles
import dataBox from '../../../styles/Boxes/DataBox.module.css'
import ButtonStyles from '../../../styles/Buttons/ButtonsBox.module.css'

// assets
import clubCoaches from '../../../assets/icons/user-Icon.svg'

// mui
import { Avatar } from '@mui/material';

const StudentClubs = () => {

    const navigate = useNavigate();

    return (
        <div className='w-full flex flex-col items-center mt-10 gap-y-6'>


            <div className={`${dataBox.containerDarkmode} w-[90%] flex justify-between items-center py-4 px-5 h-22 rounded-[34px]`}>

                <div className='flex w-[55%] items-center gap-x-[10%]'>
                    
                    <Avatar alt="Remy Sharp" src='/' sx={{height:'60px', width:'60px', zIndex:'0'}}/> 
                
                    <div className=' text-xs flex flex-col items-start gap-y-1'>

                        <p className=' text-xl'>فلای کلاب</p>

                        <div className=' flex justify-center items-center' >
                            <img src={clubCoaches} alt='icon'/>
                            <p className=' font-normal text-xs mr-2 w-36 text-start'>78 هم‌ پروازی</p>
                        </div> 

                    </div>

                </div>

                <button className={`${ButtonStyles.normalButton}`} onClick={() => navigate('/club/clubHistory')}  > مشاهده</button>
            </div>

            <div className={`${dataBox.containerDarkmode} w-[90%] flex justify-between items-center py-4 px-5 h-22 rounded-[34px]`}>

                <div className='flex w-[55%] items-center gap-x-[10%]'>
                    
                    <Avatar alt="Remy Sharp" src='/' sx={{height:'60px', width:'60px', zIndex:'0'}}/> 
                
                    <div className=' text-xs flex flex-col items-start gap-y-1'>

                        <p className=' text-xl'>فلای کلاب</p>

                        <div className=' flex justify-center items-center' >
                            <img src={clubCoaches} alt='icon'/>
                            <p className=' font-normal text-xs mr-2 w-36 text-start'>78 هم‌ پروازی</p>
                        </div> 

                    </div>

                </div>

                <button className={`${ButtonStyles.normalButton}`} onClick={() => navigate('/club/clubHistory')} > مشاهده</button>

            </div>


        </div>
    );
};

export default StudentClubs;