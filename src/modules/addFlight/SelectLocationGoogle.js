// import React from 'react';
// import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';



// const SelectLocationGoogle = ({selectedLocation, setSelectedLocation}) => {

//     const mapKey = process.env.REACT_APP_GOOGLE_MAP_API_KEY

//     const handleMapClick = (event) => {
//         setSelectedLocation({ lat: event.latLng.lat(), lng: event.latLng.lng() });
//     };
    
//     return (
//         <div className='w-full h-72'>
//             <LoadScript googleMapsApiKey={''}> 
//                 <GoogleMap 
//                     mapContainerStyle={{ height: '280px', width: '100%', borderRadius: '24px' }} 
//                     center={selectedLocation} // Initial center (e.g., tehran)
//                     zoom={13} 
//                     onClick={handleMapClick} // Handle map clicks
//                 >
//                     {selectedLocation && (
//                         <Marker 
//                         position={selectedLocation} 
//                         />
//                     )}
//                 </GoogleMap>
//             </LoadScript>
//         </div>
//     );
// };

// export default SelectLocationGoogle;



import React, { useState, useEffect, useRef } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';


const SelectLocationGoogle = ({ selectedLocation, setSelectedLocation }) => {
  const mapKey = process.env.REACT_APP_GOOGLE_MAP_API_KEY;
  const [map, setMap] = useState(null);
  const markerRef = useRef(null);

  const handleMapClick = (event) => {
    const newLocation = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };
    setSelectedLocation(newLocation);
  };

  const handleOnLoad = (mapInstance) => {
    setMap(mapInstance);
  };

  // Create or update the AdvancedMarkerElement when map or location changes
  useEffect(() => {
    // Make sure map, selectedLocation, and the Google Maps API are available.
    if (!map || !selectedLocation || !window.google) return;

    // If the marker already exists, update its position
    if (markerRef.current) {
      markerRef.current.position = selectedLocation;
    } else {
      // Create a new AdvancedMarkerElement
      markerRef.current = new window.google.maps.marker.AdvancedMarkerElement({
        position: selectedLocation,
        map: map,
      });
    }
  }, [map, selectedLocation]);

  // Cleanup the marker when the component unmounts
  useEffect(() => {
    return () => {
      if (markerRef.current) {
        markerRef.current.map = null;
        markerRef.current = null;
      }
    };
  }, []);

  return (
    <div className="w-full h-72">
      <LoadScript googleMapsApiKey={mapKey} libraries={['marker']}>
        <GoogleMap
          mapContainerStyle={{
            height: '280px',
            width: '100%',
            borderRadius: '24px',
          }}
          center={selectedLocation}
          zoom={13}
          onClick={handleMapClick}
          onLoad={handleOnLoad}
        >
          {/* The marker is handled by the effect and AdvancedMarkerElement */}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default SelectLocationGoogle;
