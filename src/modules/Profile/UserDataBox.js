import React, { useState } from 'react';
import Cookies from 'js-cookie';

// react router dom
import { Link } from 'react-router-dom';

// styles
import boxStyles from '../../styles/DataBox.module.css'
import buttonStyles from '../../styles/ButtonsBox.module.css'

// mui
import { Avatar } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

// context
import { useTranslation } from '../../Utilities/context/TranslationContext';

// assets
import ClockIcon from '../../elements/icons/ClockIcon'
import FlightQuantity from '../../elements/icons/FlightQuantity'

// queries 
import { useUserData } from '../../Utilities/Services/userQueries';

// components
import ChangePicPopUp from './EditProfile/ChangePicPopUp'
import PlusWithCircularBorderIcon from '../../elements/icons/PlusWithCircularBorderIcon';
import UserDefaultProfilePic from '../../elements/reuseable/UserDefaultProfilePic'



const UserDataBox = ({hasCoach}) => {

    // language
    const { t } = useTranslation();
    const dir = Cookies.get('dir') || 'ltr';

    const { data, isLoading, error } = useUserData();

    const [showPopUp,setShowPopup] = useState(false)

    return (
        <>
            {
                isLoading && 
                <Box sx={{ display: 'flex', width: 'full' , justifyContent:'center' }}>
                    <CircularProgress /> 
                </Box>
            }

            {
                error && <h3>{error.message}</h3>
            }
            
            {
                data && 
                <div className={`${boxStyles.containerDarkmode} flex items-center w-full h-[210px] justify-between p-4 rounded-3xl md:h-[200px] md:py-5 md:px-2 `}>

                    {/* picture, name and code  */}
                    <div className='w-full flex flex-col justify-center items-center gap-y-2 md:flex-row md:justify-around'>

                        <div onClick={() => setShowPopup(true)} className='w-[99px] h-[99px] flex flex-col items-center justify-center' >
                            {
                                data.data?.image?
                                <Avatar alt={data.data.firstName} src={data.data.image?.path ? data.data.image.path : '/'} sx={{height:'99px', width:'100px', zIndex:'0'}}/>
                                :
                                <UserDefaultProfilePic />
                            }
                            <div className='w-[105px] h-[105px] mt-[-99px] z-10 rounded-full' style={{border: '1px solid var(--text-accent)',}}></div>
                            <span className='w-[24px] absolute mt-20 ml-16 z-20' >
                                <PlusWithCircularBorderIcon />
                            </span>
                        </div>

                        <div className=' gap-y-2 md:space-y-5 flex flex-col items-center' >
                            <p className=' font-light text-base w-36'>{data.data.firstName} {data.data.lastName}</p>
                            { data?.data.levelName &&
                                <p className=' text-xs w-36' >{!data.data.isStarter && t("RegistrationPages.userDataBox.certificate")} {data.data.levelName} </p>
                            }
                            <p className=' text-xs w-36'>{t("RegistrationPages.userDataBox.userId")} {data.data.userId}</p>
                        </div>

                    </div>

                    {/* the bug is here below */}
                    <div className='w-full h-full flex flex-col items-center justify-between md:pb-0 md:flex-row md:self-center md:w-full md:justify-around md:items-center md:space-y-0'>

                        <div className=' h-full gap-y-2 flex flex-col items-start md:justify-center md:space-y-5 '>

                            <div className=' flex justify-center items-center' >
                                <span className='w-5 h-5'>
                                    <FlightQuantity />
                                </span>
                                <p className={` font-normal text-xs ${dir === 'ltr' ? 'ml-2' : 'mr-2'} text-start`}>{t("RegistrationPages.userDataBox.flightCount")} {data?.data.flightCount}</p>
                            </div> 

                            <div className=' flex justify-between items-center ' >
                                <span className='w-5 h-5'>
                                    <ClockIcon/>
                                </span>
                                <p className={` font-normal text-xs ${dir === 'ltr' ? 'ml-2' : 'mr-2'} mr-2 text-start`}>{t("RegistrationPages.userDataBox.flightHours")} {data?.data.flightHours}</p>
                            </div>
                            
                            {/* condition based on coach  */}
                            { hasCoach ?
                                <div className=' flex justify-between items-center ' >
                                    <span className='w-5 h-5'>
                                        <ClockIcon/>
                                    </span>
                                    <p className={` font-normal text-xs ${dir === 'ltr' ? 'ml-2' : 'mr-2'} text-start`}>{t("RegistrationPages.userDataBox.coachingHours")} {data?.data.coachingHours}</p>
                                </div>
                                :
                                <div/>
                            }

                        </div>

                        <Link to='/editProfile/changeProfile' className={`${buttonStyles.normalButton} w-[130px] h-[48px] flex items-center justify-center rounded-full text-base ml-[5%] `} >{t("RegistrationPages.userDataBox.editProfile")}</Link>

                    </div>

                </div>
            }
            <ChangePicPopUp isUserPhotoAvailable={data?.data.image} showPopup={showPopUp} setShowPopup={setShowPopup} />
        </>
    );
};

export default UserDataBox;