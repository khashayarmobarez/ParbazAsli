import React from 'react';

import {MapComponent, MapTypes} from "@neshan-maps-platform/mapbox-gl-react";
import '@neshan-maps-platform/mapbox-gl/dist/NeshanMapboxGl.css';

const SelectLocationNeshanMap = () => {

    const mapKey = process.env.REACT_APP_NESHAN_MAP_API_KEY

    
    return (
        <div className='w-full h-72'>
            <MapComponent options={{
                mapKey: mapKey,
                mapType: MapTypes.neshanVector,
                isTouchPlatform: true
            }}
            />
        </div>
    );
};

export default SelectLocationNeshanMap;