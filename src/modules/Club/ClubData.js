import React, { useState } from 'react';

// styles
import boxStyles from '../../styles/Boxes/DataBox.module.css'

// assets
import UserIcon from '../../components/icons/UserIcon'
import UsersIcon from '../../components/icons/UsersIcon'

// queries 
import { useGetClub } from '../../Utilities/Services/clubQueries';

// mui
import { Avatar } from '@mui/material';

// components
import ChangeClubPicPopUp from './components/ChangeClubPicPopUp';
import PlusWithCircularBorderIcon from '../../components/icons/PlusWithCircularBorderIcon';


const ClubData = () => {

    const { data } = useGetClub();

    const [showPopUp,setShowPopup] = useState(false)

    return (
        <div className='flex flex-col items-center w-full gap-y-6'>

            {/* club data box  */}
           { 
            data &&
                <div className={`${boxStyles.containerDarkmode} flex w-full items-start min-h-5 justify-around p-4 rounded-3xl md:py-5 md:px-2`}>

                    <div className='flex flex-col justify-center items-center ml-[6%] space-y-4 md:flex-row md:w-[38%] md:justify-between md:ml-0'>

                        <div onClick={() => setShowPopup(true)} className='w-[99px] h-[99px] flex flex-col items-center justify-center' >
                            <Avatar alt={data.data.name} src={data.data.file?.path ? data.data.file.path : '/'} sx={{height:'99px', width:'100px', zIndex:'0'}}/>
                            <div className='w-[105px] h-[105px] mt-[-99px] z-10 rounded-full' style={{border: '2px solid var(--text-accent)',}}></div>
                            <span className='w-7 absolute mt-20 ml-16 z-20' >
                                <PlusWithCircularBorderIcon />
                            </span>
                        </div>
                        <p className=' font-normal text-base w-36'>{data.data.name}</p>

                    </div>

                    <div className='w-full h-full flex flex-col items-start justify-between py-2 pb-12 gap-y-2 md:space-y-5 md:w-[50%] md:items-center'>

                        <div className=' flex justify-center items-center' >
                            <span className='w-5'>
                                <UserIcon/>
                            </span>
                            <p className=' font-normal text-sm mr-2 w-36 text-start'>کد باشگاه: {data.data.id}</p>
                        </div> 
                        <div className=' flex justify-center items-center' >
                            <span className='w-5'>
                            <UserIcon/>
                            </span>
                            <p className=' font-normal text-sm mr-2 w-36 text-start'>{data.data.activeCoachesCount} مربی فعال</p>
                        </div> 
                        <div className=' flex justify-between items-center' >
                            <span className='w-5 h-5'>
                            <UsersIcon/>
                            </span>
                            <p className=' font-normal text-sm mr-2 w-36 text-start'>{data.data.activeStudentsCount} هنرجو فعال</p>
                        </div>

                    </div>
            
                    <ChangeClubPicPopUp showPopup={showPopUp} setShowPopup={setShowPopup} />

                </div>
            }

        </div>
    );
};

export default ClubData;