import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

// styles
import GradientStyles from '../../styles/Gradient.module.css'

// assets
import ParachuteIcon from '../../elements/icons/ParachuteIcon'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';

// use club status
import { useClubStatus, useGetClub } from '../../Utilities/Services/clubQueries';
import { useUserEquipments } from '../../Utilities/Services/equipmentQueries';


// components
import ClubData from '../../modules/Club/ClubData';
import AddClub from '../../modules/Club/AddClub';
import PendingClubSubmission from '../../modules/Club/PendingClubSubmission';
import CircularProgressLoader from '../../elements/Loader/CircularProgressLoader';
import ParachutesSwiperSlider from '../../modules/Profile/ParachutesSwiperSlider';
import PageTitle from '../../elements/reuseable/PageTitle';

// context
import { useTranslation } from '../../Utilities/context/TranslationContext';
// import ClubMemberCoach from '../elements/modules/Club/ClubMemberCoach';
// import StudentClubs from '../elements/modules/Club/StudentClubs';

const Club = () => {

    // language
    const { t } = useTranslation();

    // clubstatus could be NotAdded, Pending, Accepted
    const {data:clubStatus , isLoading: clubStatusLoading} = useClubStatus();

    const { data: userEquipmentsData, } = useUserEquipments(1, true)

    const { data: clubData } = useGetClub();


    return (
        <div className='pt-14 flex flex-col items-center justify-center w-full'>

            <div className='w-full md:w-[75%] flex flex-col items-center lg:w-[55%]'>

            <PageTitle title={t("club.profile.clubProfile")} navigateTo={'/profile'} />

                {
                    clubStatusLoading && 
                    <CircularProgressLoader/>
                }

                {
                    clubStatus && clubStatus.data === 'NotAdded' && <AddClub />
                }

                {
                    clubStatus && clubStatus.data === 'Pending' && <PendingClubSubmission />
                }

                {clubStatus && clubStatus.data === 'Accepted' && 
                    <div className=' flex flex-col items-center w-[90%] gap-y-5 mt-5 lg:mt-16'>

                        <ClubData data={clubData} />

                        <div className='w-full flex justify-around'>
                            <Link to='/club/clubEquipment/flightEquipments' className={`${GradientStyles.container2} w-[65px] h-[65px] rounded-2xl flex flex-col justify-between items-center p-3 text-xs`} >
                                <span className='w-[18px]'>
                                    <ParachuteIcon anotherColor={'var(--text-accent)'} />
                                </span>
                                {t("club.profile.equipment")}
                            </Link>
                            
                            <Link to='/club/clubCourses' className={`${GradientStyles.container2} w-[65px] h-[65px] rounded-2xl flex flex-col justify-between items-center p-3 text-xs`} >
                                <AutoStoriesOutlinedIcon sx={{width:'18px', height:'18px'}} />
                                {t("club.profile.education")}
                            </Link>
                            
                            <Link to='/club/clubCoaches' className={`${GradientStyles.container2} w-[65px] h-[65px] rounded-2xl flex flex-col justify-between items-center p-3 text-xs`} >
                                <AccountCircleOutlinedIcon sx={{width:'18px', height:'18px'}} />
                                {t("club.profile.coaches")}
                            </Link>
                        </div>
                        
                        {
                        userEquipmentsData &&
                            <ParachutesSwiperSlider isForClub={true} parachutesData={userEquipmentsData.data} />
                            // <ParachutesSwiperSlider isForClub={true} parachutesData={clubData.data.parachutes} />
                        }
                        
                    </div>
                }

            </div>
            
        </div>
    );
};

export default Club;