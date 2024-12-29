import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

// styles
import GradientStyles from '../../styles/gradients/Gradient.module.css'

// assets
import ParachuteIcon from '../../components/icons/ParachuteIcon'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';

// use club status
import { useClubStatus } from '../../Utilities/Services/clubQueries';
import { useUserEquipments } from '../../Utilities/Services/equipmentQueries';


// components
import ClubData from '../../modules/Club/ClubData';
import AddClub from '../../modules/Club/AddClub';
import PendingClubSubmission from '../../modules/Club/PendingClubSubmission';
import CircularProgressLoader from '../../components/Loader/CircularProgressLoader';
import ParachutesSwiperSlider from '../../modules/Profile/ParachutesSwiperSlider';
import PageTitle from '../../components/reuseable/PageTitle';
// import ClubMemberCoach from '../components/modules/Club/ClubMemberCoach';
// import StudentClubs from '../components/modules/Club/StudentClubs';

const Club = () => {

    // clubstatus could be NotAdded, Pending, Accepted
    const {data:clubStatus , isLoading: clubStatusLoading} = useClubStatus();

    const { data: userEquipmentsData, } = useUserEquipments(1, true)


    return (
        <div className='pt-14 flex flex-col items-center justify-center w-full'>

            <div className='w-full md:w-[75%] flex flex-col items-center lg:w-[55%]'>

            <PageTitle title={'پروفایل باشگاه'} navigateTo={'/profile'} />

                {
                    clubStatusLoading && 
                    <CircularProgressLoader/>
                }

                {
                    clubStatus && clubStatus.data !== 'NotAdded' && <AddClub />
                }

                {
                    clubStatus && clubStatus.data === 'Pending' && <PendingClubSubmission /> 
                }

                {clubStatus && clubStatus.data === 'Accepted' && 
                    <div className=' flex flex-col items-center w-[90%] gap-y-5 mt-5 lg:mt-16'>

                        <ClubData />

                        <div className='w-full flex justify-around'>
                            <Link to='/club/clubEquipment/flightEquipments' className={`${GradientStyles.container2} w-[60px] h-[60px] rounded-2xl flex flex-col justify-between items-center p-3 text-xs`} >
                                <span className='w-[18px]'>
                                    <ParachuteIcon anotherColor={'var(--text-accent)'} />
                                </span>
                                <p>تجهیزات</p>
                            </Link>
                            
                            <Link to='/club/clubCourses' className={`${GradientStyles.container2} w-[60px] h-[60px] rounded-2xl flex flex-col justify-between items-center p-3 text-xs`} >
                                <AutoStoriesOutlinedIcon sx={{width:'18px', height:'18px'}} />
                                <p>آموزش</p>
                            </Link>
                            
                            <Link to='/club/clubCoaches' className={`${GradientStyles.container2} w-[60px] h-[60px] rounded-2xl flex flex-col justify-between items-center p-3 text-xs`} >
                                <AccountCircleOutlinedIcon sx={{width:'18px', height:'18px'}} />
                                <p>مربیان</p>
                            </Link>
                        </div>
                        
                        {
                        userEquipmentsData &&
                            <ParachutesSwiperSlider isForClub={true} parachutesData={userEquipmentsData.data} />
                        }
                        
                    </div>
                }

            </div>
            
        </div>
    );
};

export default Club;