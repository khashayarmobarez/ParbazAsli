import React from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import SpeedoMeterProvider from '../../Utilities/Providers/SpeedoMeterProvider';

import boxStyles from '../../styles/DataBox.module.css'

import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../../Utilities/context/TranslationContext';


// SpeedoMeter Component: Displays the remaining time for parachute renewal with a circular progress bar
const SpeedoMeter = (props) => {

  // language
  const { t } = useTranslation();

  const navigate = useNavigate()


  // Props:
  // - remaining: The remaining time (in days) until parachute renewal
  // - data: The data object containing user information
  const { remaining, parachuteData, isForClub } = props;

  // Function to calculate the color of the progress bar based on the percentage value
  const calcColor = (percent, start, end) => {
    let a = percent / 100,
      b = (end - start) * a,
      c = b + start;

    // return an CSS hsl color string
    return 'hsl(' + c + ', 100%, 50%)';
  };

  const handleEditParachute = (id) => () => {
    if(isForClub) navigate(`/EditClubEquipment/${id}`);
    else  navigate(`/EditEquipment/${id}`);
  };

  return (

    <div className={`${boxStyles.containerDarkmode} rounded-3xl z-0 w-[98%] md:w-full flex justify-between items-center px-2 py-3 mr-1 mt-1`}>

        <div className='flex flex-col justify-center items-center gap-y-4'>
            <p className=' font-normal text-sm mr-2 truncate max-w-[150px]'>{t("profile.userDashboard.parachuteCard.brandModel", { brand: parachuteData.brand, model: parachuteData.model })}</p>
            <p className=' font-light text-xs mr-2'>{t("profile.userDashboard.parachuteCard.lastPackingDate", { lastPackingDate: parachuteData.lastPackingDateTime })}</p>
            <p className=' font-normal text-xs mr-2 text-textInputDefault'>{t("profile.userDashboard.parachuteCard.remainingDaysToRepack", { days: parachuteData.remainingTimeToRepackInDays })}</p> 
        </div>

        <div className='w-[143px] h-[143px] flex flex-col justify-center items-center mb-[-0.5rem]'>

            <SpeedoMeterProvider valueStart={0} valueEnd={remaining}>
            {(value) => (
                <CircularProgressbar
                value={parachuteData.remainingTimeToRepackPercent}
                //   text={`${remaining} % تمدید زود هنگام`}
                circleRatio={0.7} /* Make the circle only 0.7 of the full diameter */
                // Styles for the circular progress bar and its text
                styles={{
                    trail: {
                    strokeLinecap: 'round',
                    transform: 'rotate(-126deg)',
                    transformOrigin: 'center center',
                    stroke: 'var(--progress-bar-bg)'
                    },
                    path: {
                    strokeLinecap: 'round',
                    transform: 'rotate(-126deg)',
                    transformOrigin: 'center center',
                    stroke: 'url(#gradient)',
                    },
                    text: {
                    fill: 'var(--text-accent)',
                    fontSize:'10px'
                    },
                }}
                strokeWidth={4}
                />
            )}
            </SpeedoMeterProvider>

    
                {/* the circle behind the text */}
            <div onClick={handleEditParachute(parachuteData.id)} className={` absolute w-[111px] h-[111px] rounded-full flex justify-center items-center`} 
            style={{background:'var(--bg-button-secondary-default)',
            boxShadow: 'var(--shadow-button-dark),var(--shadow-button-white)',
            }}>
                <p className=' text-textAccent text-xs'>{t("profile.userDashboard.parachuteCard.earlyRenewal")}</p>
            </div>

        </div>

        <svg style={{ height: 0, width: 0, position: 'absolute' }}>
          <defs>
            <linearGradient id="gradient" x1="0%" y1="100%" x2="70%" y2="0%">
              <stop offset="10%" stopColor="rgba(35, 188, 124, 1)"></stop>
              <stop offset="50%" stopColor="rgba(255, 153, 0, 1)"></stop>
              <stop offset="90%" stopColor="rgba(220, 53, 69, 1)"></stop>
            </linearGradient>
          </defs>
        </svg>

    </div>
  );
};

export default SpeedoMeter;