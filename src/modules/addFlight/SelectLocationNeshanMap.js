import React from 'react';

import {MapComponent, MapTypes} from "@neshan-maps-platform/mapbox-gl-react";
import '@neshan-maps-platform/mapbox-gl/dist/NeshanMapboxGl.css';

const SelectLocationNeshanMap = () => {

    
    
    return (
        <div className='w-full h-72'>
            <MapComponent options={{
                mapKey: 'web.0c16316379464287963fe67abab701a1',
                mapType: MapTypes.neshanVector,
                isTouchPlatform: true
            }}
            />
        </div>
    );
};

export default SelectLocationNeshanMap;