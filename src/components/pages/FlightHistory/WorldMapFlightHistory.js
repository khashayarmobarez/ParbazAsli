import React from 'react';
import { ComposableMap, Geographies, Geography, Marker, Annotation, ZoomableGroup } from 'react-simple-maps';

import geoMap from '../../../assets/map/ne_50m_land.topojson'


const mapWidth = 800;
const mapHeight = 600;


const WorldMapFlightHistory = () => {

   
    const markers = [
        {
            id:1,
            markerOffset:-15,
            name:'sao paolo',
            coordinates:[
                -58.3816,
                -34.6037
            ]
        }
    ]

    return (
        <div  className='w-full  flex flex-col md:max-h-[80vh]'>
            <ComposableMap width={mapWidth}
      height={mapHeight} >
                <ZoomableGroup zoom={1}
                    maxZoom={10}
                    translateExtent={[
                        [0, 0],
                        [mapWidth, mapHeight]
                      ]}>
                    <Geographies geography={geoMap} >

                        {
                            ({ geographies }) =>
                            geographies.map((geo) => (
                            <Geography key={geo.rsmKey} geography={geo} fill='var(--text-color)' />
                            ))
                        }

                    </Geographies>

                    {
                        markers.map(
                            (marker) => <Marker key={marker.id} coordinates={marker.coordinates} >
                                <circle r={7} fill='var(--bg-color)' stroke='var(--yellow-border-button)' strokeWidth={2}/>
                            </Marker>
                            )
                    }

                    <Annotation 
                    subject={[2.3522, 48.8566]}
                    dx={-90}
                    dy={-30}
                    connectorProps={{
                        stroke: 'var(--yellow-border-button)',
                        strokeWidth: '1',
                        strokeLinecap:'round'
                    }}
                    >
                        <text
                        y='-8'
                        x='-8'
                        textAnchor='end'
                        alignmentBaseline='middle'
                        fill='var(--yellow-border-button)'>
                            {'paris'}
                        </text>
                    </Annotation>

                </ZoomableGroup>
            </ComposableMap>
        </div>
    );
};

export default WorldMapFlightHistory;