import React from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import SpeedoMeterProvider from '../../Utilities/Providers/SpeedoMeterProvider';

import boxStyles from '../../styles/Boxes/DataBox.module.css'

import { useNavigate } from 'react-router-dom';


// SpeedoMeter Component: Displays the remaining time for parachute renewal with a circular progress bar
const SpeedoMeter = (props) => {

  const navigate = useNavigate()


    // Props:
    // - remaining: The remaining time (in days) until parachute renewal
    // - data: The data object containing user information
    const { remaining, data } = props;

  // Function to calculate the color of the progress bar based on the percentage value
  const calcColor = (percent, start, end) => {
    let a = percent / 100,
      b = (end - start) * a,
      c = b + start;

    // return an CSS hsl color string
    return 'hsl(' + c + ', 100%, 50%)';
  };

  return (

    <div className={`${boxStyles.containerDarkmode} rounded-3xl z-0 w-[95%] md:w-[47%] flex justify-between items-center px-2 py-5 mr-1 mt-1`}>

        <div className='flex flex-col justify-center items-center space-y-5'>
            <p className=' font-normal text-sm mr-2 '>آخرین بسته بندی چتر کمکی</p>
            <p className=' font-normal text-sm mr-2 '>{data.data.title.slice(0, 5)}</p>
            <p className=' font-normal text-sm mr-2 '>{data.data.title.slice(0, 5)} روز تا تمدید مجدد</p>
        </div>

        <div className='w-[143px] h-[143px] flex flex-col justify-center items-center'>

                    <SpeedoMeterProvider valueStart={0} valueEnd={remaining}>
                    {(value) => (
                        <CircularProgressbar
                        value={remaining}
                        //   text={`${remaining} % تمدید زود هنگام`}
                        circleRatio={0.7} /* Make the circle only 0.7 of the full diameter */
                        // Styles for the circular progress bar and its text
                        styles={{
                            trail: {
                            strokeLinecap: 'round',
                            transform: 'rotate(-126deg)',
                            transformOrigin: 'center center',
                            stroke: '#353A65'
                            },
                            path: {
                            strokeLinecap: 'round',
                            transform: 'rotate(-126deg)',
                            transformOrigin: 'center center',
                            stroke: 'url(#gradient)',
                            },
                            text: {
                            fill: '#A5E65E',
                            fontSize:'10px'
                            },
                        }}
                        strokeWidth={4}
                        />
                    )}
                    </SpeedoMeterProvider>

    
                {/* the circle behind the text */}
            <div onClick={() => navigate('/ParachuteRenewal')} className={` absolute w-[111px] h-[111px] rounded-full flex justify-center items-center`} 
            style={{background:'var(--speedometer-background)',
            boxShadow: 'var(--speedometer-boxShadow)',
            }}>
                <p className=' text-[#A5E65E] text-xs'>تمدید زود هنگام</p>
            </div>

        </div>

        <svg style={{ height: 0,width: 0,position:'absolute' }}>
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="100%" x2="0%" y2="0%">
                    <stop offset="52.92%" stop-color="#A5E65E" />
                    <stop offset="77.14%" stop-color="rgba(199, 3, 15, 0.1)" />
                  </linearGradient>
                </defs>
            </svg>

    </div>
  );
};

export default SpeedoMeter;