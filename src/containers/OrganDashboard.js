import React from 'react';

// components
import DashBoardFlightQuantity from '../components/pages/Organization/DashBoardFlightQuantity';
import DashboardPilotsQuantiy from '../components/pages/Organization/DashboardPilotsQuantiy';



const OrganDashboard = () => {
    return (
        <div className='pt-20 flex flex-col w-full items-center'>
            <div className='flex flex-col w-full md:w-[75%] items-center '>

                <DashBoardFlightQuantity />

                <DashboardPilotsQuantiy />

                
            </div>
        </div>
    );
};

export default OrganDashboard;