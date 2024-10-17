import React from 'react';

import loadStyle from './DigilogbookLoading.module.css';

import digilogbook from '../../assets/loading/digilogbookSvg.svg';
import feather from '../../assets/loading/featherSvg.svg';

const DigilogbookLoading = () => {
    return (
        <div className=' fixed w-full h-[110%] flex flex-col justify-center items-center px-10 z-[1000] mt-[-10rem] backdrop-blur-2xl' 
        // style={{background:'var(--bg-page-main)'}}
        >
            <img src={digilogbook} alt='digilogbook' className={`${loadStyle.digilogbook}`}/>
            <img src={feather} alt='feather' className={`${loadStyle.feather}`}/>
        </div>
    );
};

export default DigilogbookLoading;