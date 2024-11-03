import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

// styles
import GradientStyles from '../styles/gradients/Gradient.module.css'

// assets
import pencil from '../assets/icons/pencil-alt.svg'
import ParachuteIcon from '../components/icons/ParachuteIcon'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ClassOutlinedIcon from '@mui/icons-material/ClassOutlined';

// use club status
import { useClubStatus } from '../Utilities/Services/clubQueries';
import { useUserEquipments } from '../Utilities/Services/equipmentQueries';


// components
import ClubData from '../components/pages/Club/ClubData';
import AddClub from '../components/pages/Club/AddClub';
import PendingClubSubmission from '../components/pages/Club/PendingClubSubmission';
import CircularProgressLoader from '../components/Loader/CircularProgressLoader';
import ParachutesSwiperSlider from '../components/pages/Profile/ParachutesSwiperSlider';
// import ClubMemberCoach from '../components/pages/Club/ClubMemberCoach';
// import StudentClubs from '../components/pages/Club/StudentClubs';

const Club = () => {

    // clubstatus could be NotAdded, Pending, Accepted
    const {data:clubStatus , isLoading: clubStatusLoading, error} = useClubStatus();

    const { data: userEquipmentsData, isLoading, error: equipmentError, refetch: refetchUserEquipmentsData } = useUserEquipments(1, true)


    return (
        <div className='pt-14 flex justify-center w-full'>

            <div className='w-full md:w-[75%] flex flex-col items-center'>
                {
                    clubStatusLoading && 
                    <CircularProgressLoader/>
                }

                {clubStatus && clubStatus.data === 'NotAdded' && <AddClub />}

                {clubStatus && clubStatus.data === 'Pending' && <PendingClubSubmission /> }

                {clubStatus && clubStatus.data === 'Accepted' && 
                    <div className=' flex flex-col items-center w-[90%] gap-y-6 mt-6'>

                        <ClubData />

                        <div className='w-full flex justify-around'>
                            <Link to='/club/clubEquipment/flightEquipments' className={`${GradientStyles.container2} w-[60px] h-[60px] rounded-2xl flex flex-col justify-between items-center p-3 text-xs`} >
                                <span className='w-[18px]'>
                                    <ParachuteIcon anotherColor={'var(--text-accent)'} />
                                </span>
                                <p>تجهیزات</p>
                            </Link>
                            
                            <Link to='/club/clubCourses' className={`${GradientStyles.container2} w-[60px] h-[60px] rounded-2xl flex flex-col justify-between items-center p-3 text-xs`} >
                                <ClassOutlinedIcon sx={{width:'18px', height:'18px'}} />
                                <p>دوره‌ها</p>
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


                {/* {   
                    userRole === 'coach' ? 

                    // return for coach
                    (
                    club ?

                        // return for coach with club
                        (
                        manager ?

                            // club manager 
                            (<div className=' flex flex-col items-center w-[100%] gap-y-6 mt-10'>

                                <ClubData />

                                <div className={`${ButtonStyles.ThreeStickedButtonCont}`}>
                                    <Link to='/club/clubEquipment' className={`${ButtonStyles.ThreeStickedButtonButton} rounded-r-xl ${activeLink === 'clubEquipment' ? ButtonStyles.activeYellow : ''}`} onClick={() => setActiveLink('clubEquipment')}>وسایل باشگاه</Link> 
                                    <Link to='/club/clubCoaches' className={`${ButtonStyles.ThreeStickedButtonButton}  ${activeLink === 'clubCoaches' ? ButtonStyles.activeYellow : ''}`} onClick={() => setActiveLink('clubCoaches')} >مربیان باشگاه</Link> 
                                    <Link ref={buttonRef} to='/club/clubStudents' className={`${ButtonStyles.ThreeStickedButtonButton} rounded-l-xl  ${activeLink === 'clubStudents' ? ButtonStyles.activeYellow : ''}`} onClick={() => setActiveLink('clubStudents')} >هنرجویان</Link>
                                </div>


                                <Outlet />
                                
                            </div>)

                            :

                            // coach who is part of a club
                            <ClubMemberCoach />
                        )

                        :

                        // return for coach without club 
                        <StudentClubs />
                    )

                    :

                    // return for student
                    <StudentClubs />
                } */}
            </div>
        </div>
    );
};

export default Club;