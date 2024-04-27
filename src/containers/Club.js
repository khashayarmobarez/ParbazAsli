import React, { useEffect, useRef, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

// styles
import ButtonStyles from '../styles/Buttons/ButtonsBox.module.css'

// redux
import { useSelector } from 'react-redux';
import { selectUser } from '../Utilities/ReduxToolKit/features/userData/userSlice';

// components
import ClubData from '../components/pages/Club/ClubData';
import ClubMemberCoach from '../components/pages/Club/ClubMemberCoach';
import StudentClubs from '../components/pages/Club/StudentClubs';

const Club = () => {

    const {club, userRole, manager} = useSelector(selectUser)

    // to set which button is active and style it
    const [activeLink, setActiveLink] = useState('clubStudents'); // State to track active link


    // Ref to the button element
    const buttonRef = useRef(null);


    // Effect to click the button when the page is mounted
  useEffect(() => {
    // Check if the button ref exists and it has a current property
    if (buttonRef.current) {
      // Programmatically click the button
      buttonRef.current.click();
    }
  }, []);

    return (
        <div className='pt-14 flex justify-center'>
            <div className='w-full md:w-[75%] flex flex-col'>

                {   
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
                }
            </div>
        </div>
    );
};

export default Club;