import React from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import SpeedoMeterProvider from '../../Utilities/Providers/SpeedoMeterProvider';

import boxStyles from '../../styles/Boxes/DataBox.module.css'
import GradientStyles from '../../styles/gradients/Gradient.module.css'

import { Link } from 'react-router-dom';


const SpeedoMeter = (props) => {

    const { remaining, data } = props;

  // function for calculating the color
  const calcColor = (percent, start, end) => {
    let a = percent / 100,
      b = (end - start) * a,
      c = b + start;

    // return an CSS hsl color string
    return 'hsl(' + c + ', 100%, 50%)';
  };

  return (

    <div className={`${boxStyles.containerDarkmode} w-[100%] md:w-[47%] flex justify-between items-center px-2 py-5 `}>

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
                            stroke: calcColor(value, 0, 120),
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
            <div className={`${GradientStyles.container2} fixed w-[111px] h-[111px] rounded-full flex justify-center items-center z-10`}>
                <Link className=' text-[#A5E65E] text-xs z-10'>تمدید زود هنگام</Link>
            </div>

        </div>

    </div>
  );
};

export default SpeedoMeter;