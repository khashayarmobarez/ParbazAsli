import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';



const SelectLocationGoogle = ({selectedLocation, setSelectedLocation}) => {

    const mapKey = process.env.REACT_APP_GOOGLE_MAP_API_KEY

    const handleMapClick = (event) => {
        setSelectedLocation({ lat: event.latLng.lat(), lng: event.latLng.lng() });
    };
    
    return (
        <div className='w-full h-72'>
            <LoadScript googleMapsApiKey=''> 
                <GoogleMap 
                    mapContainerStyle={{ height: '280px', width: '100%', borderRadius: '24px' }} 
                    center={selectedLocation} // Initial center (e.g., tehran)
                    zoom={13} 
                    onClick={handleMapClick} // Handle map clicks
                >
                    {selectedLocation && (
                    <Marker 
                        position={selectedLocation} 
                    />
                    )}
                </GoogleMap>
            </LoadScript>
        </div>
    );
};

export default SelectLocationGoogle;