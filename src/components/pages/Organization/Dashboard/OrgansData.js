import React from 'react';

// styles
import boxStyles from '../../../../styles/Boxes/DataBox.module.css'
import FlightSitesData from '../FlightSitesData';

const OrgansData = () => {
    return (
        <div className={`w-full min-h-10 rounded-2xl py-8 px-6 ${boxStyles.containerDarkmode} `} >
            
            <FlightSitesData />

            
        </div>
    );
};

export default OrgansData;