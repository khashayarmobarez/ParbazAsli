import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

// styles
import GradientStyles from '../styles/gradients/Gradient.module.css'

// assets
import pencil from '../assets/icons/pencil-alt.svg'

// use club status
import { useClubStatus } from '../Utilities/Services/clubQueries';


// components
import ClubData from '../components/pages/Club/ClubData';
import AddClub from '../components/pages/Club/AddClub';
import PendingClubSubmission from '../components/pages/Club/PendingClubSubmission';
// import ClubMemberCoach from '../components/pages/Club/ClubMemberCoach';
// import StudentClubs from '../components/pages/Club/StudentClubs';

const Club = () => {

    // clubstatus could be NotAdded, Pending, Accepted
    const {data:clubStatus , loading: clubStatusLoading, error} = useClubStatus();


    return (
        <div className='pt-14 flex justify-center w-full'>
            <div className='w-full md:w-[75%] flex flex-col items-center'>

                {clubStatus && clubStatus.data === 'NotAdded' && <AddClub />}

                {clubStatus && clubStatus.data === 'Pending' && <PendingClubSubmission /> }

                {clubStatus && clubStatus.data === 'Accepted' && 
                    <div className=' flex flex-col items-center w-[90%] gap-y-6 mt-6'>

                        <ClubData />

                        <div className='w-full flex justify-around'>
                            <Link to='/club/clubEquipment/flightEquipments' className={`${GradientStyles.container2} w-[60px] h-[60px] rounded-2xl flex flex-col justify-between items-center p-3 text-[#A5E65E] text-xs`} >
                                <img src={pencil} alt='icon' className='w-[56%]'/>
                                <p>تجهیزات</p>
                            </Link>
                            
                            <Link to='/club/clubCourses' className={`${GradientStyles.container2} w-[60px] h-[60px] rounded-2xl flex flex-col justify-between items-center p-3 text-[#A5E65E] text-xs`} >
                                <img src={pencil} alt='icon' className='w-[56%]'/>
                                <p>دوره‌ها</p>
                            </Link>
                            
                            <Link to='/club/clubCoaches' className={`${GradientStyles.container2} w-[60px] h-[60px] rounded-2xl flex flex-col justify-between items-center p-3 text-[#A5E65E] text-xs`} >
                                <img src={pencil} alt='icon' className='w-[56%]'/>
                                <p>مربیان</p>
                            </Link>
                        </div>
                        
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