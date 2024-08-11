import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

// styles
import buttonStyles from '../styles/Buttons/ButtonsBox.module.css'

// components
import DashBoardFlightQuantity from '../components/pages/Organization/DashBoardFlightQuantity';
import DashboardPilotsQuantiy from '../components/pages/Organization/DashboardPilotsQuantiy';
import FlightSitesData from '../components/pages/Organization/FlightSitesData';



const OrganDashboard = () => {

    const location = useLocation()

    return (
        <div className='py-20 flex flex-col w-full items-center'>
            <div className='flex flex-col w-[90%] md:w-[75%] items-center '>

                <div className={` sticky top-[6.7rem] bg-white z-10 w-full flex justify-between gap-x-2`}>
                    <Link
                    to={`/organization/OrgansData`} 
                    className={` ${location.pathname === `/organization/OrgansData` ? buttonStyles.activeYellow : 'border border-[var(--yellow-text)] text-[var(--yellow-text)]'}
                    rounded-xl w-full h-12 text-center flex justify-center items-center`} >
                        داشبورد انجمن
                    </Link> 
                    <Link
                    to={`/organization/OrgansUsersData`}
                    className={` ${location.pathname === `/organization/OrgansUsersData` ? buttonStyles.activeYellow : 'border border-[var(--yellow-text)] text-[var(--yellow-text)]'}
                    rounded-xl w-full h-12 text-center flex justify-center items-center`} >
                        کاربران
                    </Link> 
                </div>

                <div className='w-full'>
                    <Outlet />
                </div>

                {/* <FlightSitesData />

                <DashBoardFlightQuantity />

                <DashboardPilotsQuantiy /> */}
                
            </div>
        </div>
    );
};

export default OrganDashboard;