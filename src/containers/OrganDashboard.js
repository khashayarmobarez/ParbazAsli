import React from 'react';

// components
import DashBoardFlightQuantity from '../components/pages/Organization/DashBoardFlightQuantity';
import DashboardPilotsQuantiy from '../components/pages/Organization/DashboardPilotsQuantiy';
import FlightSitesData from '../components/pages/Organization/FlightSitesData';



const OrganDashboard = () => {
    return (
        <div className='pt-20 flex flex-col w-full items-center'>
            <div className='flex flex-col w-full md:w-[75%] items-center '>

                <FlightSitesData />

                <DashBoardFlightQuantity />

                <DashboardPilotsQuantiy />
                
            </div>
        </div>
    );
};

export default OrganDashboard;