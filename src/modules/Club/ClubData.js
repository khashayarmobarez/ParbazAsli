import React, { useState } from 'react';

// styles
import boxStyles from '../../styles/DataBox.module.css'

// assets
import UserIcon from '../../elements/icons/UserIcon'
import UsersIcon from '../../elements/icons/UsersIcon'


// mui
import { Avatar } from '@mui/material';

// components
import ChangeClubPicPopUp from './components/ChangeClubPicPopUp';
import PlusWithCircularBorderIcon from '../../elements/icons/PlusWithCircularBorderIcon';

// context
import { useTranslation } from '../../Utilities/context/TranslationContext';


const ClubData = ({data}) => {

    // language
    const { t } = useTranslation();

    const [showPopUp,setShowPopup] = useState(false)

    return (
        <div className='flex flex-col items-center w-full h-full gap-y-6'>

            {/* club data box  */}
           { 
            data &&
                <div className={`${boxStyles.containerDarkmode} flex w-full items-start min-h-5 justify-between p-4 rounded-3xl md:py-4 md:px-2 md:h-full`}>

                    <div className='flex flex-col w-[55%] justify-between items-center gap-y-2 md:flex-row  md:justify-between md:h-[8rem] md:px-8'>

                        <div onClick={() => setShowPopup(true)} className='w-[99px] h-[99px] flex flex-col items-center justify-center' >
                            <Avatar alt={data.data.name} src={data.data.file?.path ? data.data.file.path : '/'} sx={{height:'99px', width:'100px', zIndex:'0'}}/>
                            <div className='w-[105px] h-[105px] mt-[-99px] z-10 rounded-full' style={{border: '2px solid var(--text-accent)',}}></div>
                            <span className='w-7 absolute mt-20 ml-16 z-20' >
                                <PlusWithCircularBorderIcon />
                            </span>
                        </div>
                        <p className=' font-normal text-base'>{data.data.name}</p>

                    </div>

                    <div className='w-[45%] h-full flex flex-col items-start justify-between  py-2 gap-y-2 md:pl-[5vw]  md:gap-y-4 md:pt-4 '>

                        <div className=' flex justify-center items-center' >
                            <span className='w-5'>
                                <UserIcon/>
                            </span>
                            <p className=' font-normal text-xs mx-2  text-start'>{t("club.profile.clubId")} {data.data.id}</p>
                        </div>

                        <div className=' flex justify-center items-center' >
                            <span className='w-5'>
                            <UserIcon/>
                            </span>
                            <p className=' font-normal text-xs mx-2  text-start'>{data.data.activeCoachesCount} {t("club.profile.activeCoaches")}</p>
                        </div>

                        <div className=' flex justify-between items-center' >
                            <span className='w-5 h-5'>
                            <UsersIcon/>
                            </span>
                            <p className=' font-normal text-xs mx-2  text-start'>{data.data.activeStudentsCount} {t("club.profile.activeStudents")}</p>
                        </div>

                    </div>
            

                </div>
            }

            <ChangeClubPicPopUp showPopup={showPopUp} setShowPopup={setShowPopup} />

        </div>
    );
};

export default ClubData;